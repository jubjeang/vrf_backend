const xlsxFile = require('read-excel-file/node');
const dboperations = require('./controllers/dboperations');
const path = require('path');
const express = require('express')
const multer = require('multer')
const app = express()
const ftp = require("basic-ftp")
var fs = require('fs');
var contentDisposition = require('content-disposition')
var destroy = require('destroy')
var onFinished = require('on-finished')
var fileName
var config = require('./server/dbconfig');
const sql = require('mssql');
const cors = require('cors')
const ActiveDirectory = require('activedirectory2');
const { format } = require('date-fns')
// var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const ExcelJS = require('exceljs');
require('dotenv').config()
const moment = require('moment-timezone');
app.use(cors({
    origin: process.env.CLIENT_URL,//'http://localhost:84', // replace with your Vue app domain
    credentials: true
}));
// app.use(cors())
const setordernumber = (value) => {
    try {
        const now = new Date()
        const day = ('0' + now.getDate()).slice(-2)
        const month = ('0' + (now.getMonth() + 1)).slice(-2)
        const year = now.getFullYear()
        const hours = ('0' + now.getHours()).slice(-2)
        const minutes = ('0' + now.getMinutes()).slice(-2)
        // const seconds = ('0' + now.getSeconds()).slice(-2)
        const milliseconds_0 = ('0' + now.getMilliseconds()).slice(-2)
        const milliseconds = ('00' + value).slice(-2)
        console.log('milliseconds: ', milliseconds)
        console.log('value: ', value)
        // const milliseconds = ('00' + now.getMilliseconds()).slice(-3)
        return `${day}${month}${year}${hours}${milliseconds_0}${milliseconds}`
    } catch (error) {
        console.error(error);
        res.json({ error: error })
    }
}
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        //console.log('storage filename req.body.reason: ', req.body.reason)     
        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        const extension = path.extname(file.originalname);
        fileName = `${originalName}_${Date.now()}${extension}`;
        cb(null, fileName)
    },
    destination: function (req, file, cb) {
        cb(null, './uploads')
    }
})
// const storage = multer.diskStorage({
//     filename: function (req, file, cb) {
//         // console.log( req.file.filename ) 
//         fileName = Date.now() + ".xls"
//         cb(null, fileName)
//     },
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     }
// })
const upload = multer({

    // dest: './uploads'
    storage: storage
})
const checkValue = (value_, type_) => {
    try {
        switch (type_) {
            case 'float':
                return value_ === '' || value_ === null ? 0.00 : parseFloat(value_);

            case 'string':
                return value_ === '' || value_ === null ? '' : String(value_);

            default:
                throw new Error(`Invalid type: ${type_}`);
        }
    } catch (error) {
        console.error('checkValue error: ', error);
        // If you intend to send this error to a client, make sure 'res' is defined
        // or handle this differently.
        // res.json({ error: error.message });
        return null;  // Or some default value or behavior
    }
}
const adjustDate = (inputDate) => {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + 1);
    return date;
  };
app.post('/set_add_user_vrf', upload.single('file'), async (req, res) => {
    try {
        console.log('set_manual_add_vrf_trans req.body: ', req.body);
        console.log('req.body.first_name: ', req.body.first_name);

        let data = {
            user_id: req.body.user_id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            position_id: req.body.position_id,
            department_id: req.body.department_id,
            division_id: req.body.division_id,
            branch_id: req.body.branch_id,
            role_id: req.body.role_id,
            email: req.body.email,
            employee_id: req.body.employee_id
        };

        // Since dboperations.set_add_user_vrf() is an async function, 
        // using await to capture result and error
        try {
            const result = await dboperations.set_add_user_vrf(data);
            res.json(result);
        } catch (err) {
            console.log('set_add_user_vrf error: ', err);
            res.json({ error: err.message });
        }

    } catch (error) {
        console.log('/set_add_user_vrf error: ', error);
        res.json({ error: 'set_add_user_vrf error' });
    }
});
app.post('/set_manual_add_vrf_trans', upload.single('file'), async (req, res) => {
    try {
        
        let file_originalname_ = req.file === undefined ? '' : req.file.originalname;
        let filename_ = req.file === undefined ? '' : req.file.filename;
        let data = {
            reason: req.body.reason,
            file_originalname: file_originalname_,
            file_name: filename_,
            contactor: req.body.contactor,
            requestor: req.body.requestor,
            requestor_position: req.body.requestor_position,
            requestor_dept: req.body.requestor_dept,
            requestor_phone: req.body.requestor_phone,
            navigator: req.body.navigator,
            area: req.body.area,
            templete_id: req.body.templete_id,
            createby: req.body.user_id,
            date_from: adjustDate(req.body.date_from),
            date_to: adjustDate(req.body.date_to),
        };
        try {
            const result = await dboperations.set_manual_add_vrf_trans(data);
            res.json(result);
        } catch (err) {
            console.log('Database error: ', err);
            res.json({ error: err.message });
        }
    } catch (error) {
        console.log('General error: ', error);
        res.json({ error: 'An error occurred.' });
    }
});
app.post('/set_update_userinfo_vrf', upload.single('file'), async (req, res) => {
    try {
        let data = {
            user_id: req.body.user_id,
            modify_by: req.body.modify_by,
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            position_id: req.body.position_id,
            department_id: req.body.department_id,
            division_id: req.body.division_id,
            branch_id: req.body.branch_id,
            role_id: req.body.role_id,
            email: req.body.email,
            employee_id: req.body.employee_id
        };

        try {
            const result = await dboperations.set_update_userinfo_vrf(data);
            res.json(result[0]);
        } catch (err) {
            console.error('set_update_userinfo_vrf error: ', err);
            res.status(500).json({ error: 'set_update_userinfo_vrf error' });
        }
    } catch (error) {
        console.error('set_update_userinfo_vrf error: ', error);
        res.status(500).json({ error: 'set_update_userinfo_vrf error' });
    }
});
app.post('/set_manual_update_vrf_trans', upload.single('file'), async (req, res) => {
    try {
        let originalname = req.file !== undefined ? req.file.originalname : '';
        let filename_ = req.file !== undefined ? req.file.filename : '';
        let old_file = (req.body.attach_file_primitive !== undefined) && (req.body.attach_file_primitive !== '') ? req.body.attach_file_primitive : '';
       
        let data = {
            vrf_id: req.body.id,
            attach_file_origin: originalname,
            attach_file: filename_,
            reason: req.body.reason,
            contactor: req.body.contactor,
            requestor: req.body.requestor,
            requestor_position: req.body.requestor_position,
            requestor_dept: req.body.requestor_dept,
            requestor_phone: req.body.requestor_phone,
            navigator: req.body.navigator,
            area: req.body.area,
            createby: req.body.user_id,
            date_from: adjustDate(req.body.date_from),
            date_to: adjustDate(req.body.date_to),
        };
        console.log('/set_manual_update_vrf_trans data: ', data);

        try {
            const result = await dboperations.set_manual_update_vrf_trans(data);
            if (old_file !== '') {
                try {
                    await fs.stat('./uploads/' + old_file);
                    await fs.unlink('./uploads/' + old_file);
                    console.log(old_file + ' ถูกลบแล้ว');
                } catch (err) {
                    console.log(`ไม่พบไฟล์: ${old_file}`);
                }
            }
            res.json(result[0]);
        } catch (err) {
            console.error('set_manual_update_vrf_trans error: ', err);
            res.status(500).json({ error: 'set_manual_update_vrf_trans error' });
        }
    } catch (error) {
        console.error('set_manual_update_vrf_trans error: ', error);
        res.status(500).json({ error: 'set_manual_update_vrf_trans error occurred.' });
    }
});
// create application/x-www-form-urlencoded parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/downloadExcel', bodyParser.json(), async (req, res) => {
    try {
        const data = req.body;
        let workbook = new ExcelJS.Workbook();
        let worksheet = workbook.addWorksheet('Sheet 1');
        worksheet.columns = [
            { header: 'No', key: 'no', width: 10 },
            { header: 'ชื่อผู้มาติดต่อ', key: 'contactor', width: 20 },
            { header: 'วันที่เริ่มเข้า', key: 'date_from', width: 20 },
            { header: 'วันที่สุดท้ายที่เข้า', key: 'date_to', width: 20 },
            { header: 'พื้นที่ที่เข้าพบ', key: 'meeting_area', width: 20 },
            { header: 'เหตุผลที่เข้าพบ', key: 'reason', width: 20 },
            { header: 'ผู้นำพา', key: 'navigator', width: 20 },
            { header: 'สถานะการขอเข้าพื้นที่', key: 'approve_status', width: 20 },
        ];

        // กำหนด style ให้กับ header
        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFF00' },
            };
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' },
            };
        });

        // สร้าง row จากข้อมูลและกำหนด style
        data.forEach(item => {
            item.date_from = format(new Date(item.date_from), 'dd-MM-yyyy');
            item.date_to = format(new Date(item.date_to), 'dd-MM-yyyy');
            const newRow = worksheet.addRow(item);

            newRow.eachCell((cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' },
                };
            });
        });

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        );
        res.setHeader(
            'Content-Disposition',
            'attachment; filename=' + 'report.xlsx',
        );

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.log('error: ', error);
        res.status(500).send(error);
    }
});
app.get('/get_complete_word', urlencodedParser, async (req, res) => {
    try {
        const search = req.query['search'];
        const type = req.query['type'];

        // Optionally, validate 'search' and 'type' here.
        // For example, ensure that they are non-empty strings
        if (!search || !type) {
            return res.status(400).json({ error: "Both 'search' and 'type' parameters are required." });
        }

        const result = await dboperations.get_complete_word(search, type);

        if (!result || !result.length) {
            return res.status(404).json({ error: "No matching words found." });
        }

        return res.json(result[0]);

    } catch (err) {
        console.error('Database operation error:', err);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/get_meeting_area', urlencodedParser, async (req, res) => {
    try {
        const userId = req.query['user_id'];

        // Optionally, validate 'userId' here.
        // For example, ensure that it's a non-empty string or a number.
        if (!userId) {
            return res.status(400).json({ error: "The 'user_id' parameter is required." });
        }

        const result = await dboperations.get_meeting_area(userId);

        if (!result || !result.length) {
            return res.status(404).json({ error: "get_meeting_area error" });
        }

        return res.json(result[0]);

    } catch (err) {
        console.error('get_meeting_area error:', err);
        return res.status(500).json({ error: 'get_meeting_area error' });
    }
});
const handleDatabaseOperation = async (res, operation, function_error, ...params) => {
    try {
        const result = await operation(...params);
        if (!result || !result.length) {
            return res.status(404).json({ error: `${function_error} have error` });
            ret
        }
        return res.json(result[0]);
    } catch (err) {
        console.error(`${operation.toString()} have error: `, err);
        return res.status(500).json({ error: `Internal server error` });
    }
};
app.get('/get_navigator', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_navigator,
        'get_navigator',
        req.query['user_id']
    );
});

app.get('/get_dept_all', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_dept_all,
        'get_dept_all'
    );
});

app.get('/get_division_all', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_division_all,
        'get_division_all'
    );
});

app.get('/get_role_all', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_role_all,
        'get_role_all'
    );
});
app.get('/get_role_by_dept', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_role_by_dept,
        'get_role_all'
    );
});

app.get('/get_branch_all', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_branch_all,
        'get_branch_all'
    );
});

app.get('/get_dept', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_dept,
        'get_dept',
        req.query['division_id'],
        req.query['branch_id']
    );
});

app.get('/get_dept_by_branch', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_dept_by_branch,
        'get_dept_by_branch',
        req.query['division_id'],
        req.query['branch_id']
    );
});

app.get('/get_position', urlencodedParser, (req, res) => {
    handleDatabaseOperation(res, dboperations.get_position, 'get_position');
});

app.get('/get_user_by_branch', urlencodedParser, (req, res) => {
    console.log('req.query[branch_id]: ', req.query['branch_id']);
    handleDatabaseOperation(
        res,
        dboperations.get_user_by_branch,
        'get_user_by_branch',
        req.query['branch_id']
    );
});

app.get('/get_user', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_user,
        'get_user',
        req.query['department_id']
    );
});
app.get('/get_templete', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_templete,
        'get_templete',
        req.query['branch_id'],
        req.query['department_id']
    );
});
app.get('/get_templete_det', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_templete_det,
        'get_templete_det',
        req.query['templete_id']
    );
});
app.get('/get_vehicle_color', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_vehicle_color,
        'get_vehicle_color'
    );
});
app.get('/get_vehicle_brand', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_vehicle_brand,
        'get_vehicle_brand'
    );
});
const handleLDAPAuthentication = (config, jobid, password, res) => {
    try {
        const ad = new ActiveDirectory(config);
        ad.authenticate('gfcth\\' + jobid, password, (err, auth) => {
            if (err) {
                console.log('ERROR: ', JSON.stringify(err));
                return res.status(500).json({ error: err });
            }
            if (auth) {
                console.log('Authentication successful');
                return res.json({ success: true, message: 'Authentication successful' });
            } else {
                return res.status(401).json({ success: false, message: 'Authentication failed' });
            }
        });
    } catch (e) {
        console.log('Unexpected error: ', e);
        return res.status(500).json({ error: 'handleLDAPAuthentication have error' });
    }
};

app.post('/authenticate', urlencodedParser, (req, res) => {
    const { username, password } = req.body;
    let data_ = req.body;
    let obj = Object.keys(data_)[0];
    let obj_json = JSON.parse(obj);
    const config = {
        // authenticated: true,
        url: 'ldap://192.168.100.29',
        baseDN: 'dc=guardforcecash,dc=co,dc=th',
        username: 'gfcth\\svc_ldap',
        password: 'Z8-H%p95BR',
        referrals: {
            enabled: false,
        },
    };
    handleLDAPAuthentication(config, obj_json['jobid'], obj_json['password'], res);
});
app.get('/get_permission_access', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_permission_access,
        'get_permission_access',
        req.query['user_id'], req.query['user_role_id'], req.query['user_role']
    );
});
app.post("/generateCSV", urlencodedParser, async (req, res) => {
    try {
        let data = req.body
        let obj = null
        for (let x in data) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        //console.log('data: ',data)
        let data_ = obj_json['data_'].split(':')
        console.log('obj_json: ', obj_json)
        let customer = ''
        customer = checkcustomer(obj_json['customerID'])
        // obj_json['customerID'] === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
        var path = req.query['JobDate'] + '/' + req.query['CCT_Data']
            + '/' + customer
        console.log('req.query[customerID]: ', req.query['customerID'], 'path: ', path)
        var file = __dirname + '/reports/' + data_[0] + '/' + data_[1] + '/' + customer + '/' + data_[2] + '/' + data_[3];
        res.setHeader("Content-Type", "text/csv; charset=Windows-874;")
        res.setHeader('Content-Disposition', contentDisposition(file))
        var filestream = fs.createReadStream(file);
        console.log('res: ', res)
        filestream.pipe(res);
        onFinished(res, () => {
            destroy(filestream)
        })
    } catch (error) {
        console.log('An error occurred:', error);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/getuserinfo', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        let data_all = {
            'jobid': obj_json['jobid'].toLowerCase(),
            'password': obj_json['password'],
        }
        console.log('data_all: ', data_all)
        dboperations.getuserinfo(data_all).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error(error);
        res.json({ error: error })
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }

})
app.post("/gettemplatefile", urlencodedParser, async (req, res) => {
    try {
        let data = req.body
        let obj = null
        for (let x in data) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        let filename = ''
        console.log('obj_json[type]: ', obj_json['type'])
        obj_json['type'] === 'Deposit' ? filename = 'BranchtoCCTTemplate_deposit.xls' : filename = 'CCTToBranchTemplate_withdraw.xls'

        var file = __dirname + '/template/' + filename
        console.log('file: ', file)
        res.setHeader("Content-Type", "application/vnd.ms-excel; charset=Windows-874;")
        res.setHeader('Content-Disposition', contentDisposition(file))
        var filestream = fs.createReadStream(file);
        console.log('res: ', res)
        filestream.pipe(res);
        onFinished(res, () => {
            destroy(filestream)
        })
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.post("/generateXLS", urlencodedParser, async (req, res) => {
    try {
        let data = req.body
        let obj = null
        for (let x in data) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        //console.log('data: ',data)
        let data_ = obj_json['data_'].split(':')
        console.log('obj_json: ', obj_json)
        let customer = ''
        //obj_json['customerID'] === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
        customer = checkcustomer(obj_json['customerID'])
        var path = req.query['JobDate'] + '/' + req.query['CCT_Data']
            + '/' + customer
        var file = __dirname + '/reports/' + data_[0] + '/' + data_[1] + '/' + customer + '/' + data_[2] + '/' + data_[4]
        console.log('file: ', file)
        res.setHeader("Content-Type", "application/vnd.ms-excel; charset=Windows-874;")
        res.setHeader('Content-Disposition', contentDisposition(file))
        var filestream = fs.createReadStream(file);
        console.log('res: ', res)
        filestream.pipe(res);
        onFinished(res, () => {
            destroy(filestream)
        })
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/getActitySelectd', urlencodedParser, async (req, res) => {
    try {
        dboperations.getActitySelectd(req.query['user_id'], req.query['customerID'])
            .then(result => {
                res.json(result[0]);
            })
            .catch(err => {
                console.log('error: ', err);
                res.json({ error: err });
            });
    } catch (error) {
        console.log('Error:', error);
        res.status(500).send('Internal Server Error');
    }
});
//------------getrole 
app.get('/set_sendmail', urlencodedParser, (req, res) => {
    // let id = req.body['id']
    let output
    console.log('set_sendmail req.query[id]: ', req.query['id_']
        , 'req.query[department_id]: ', req.query['department_id']
        , 'req.query[branch_id]: ', req.query['branch_id']
        , 'req.query[division_id]: ', req.query['division_id']
    )
    try {
        dboperations.get_mail_vrf_info(req.query['id_']
            , req.query['department_id']
            , req.query['branch_id']
            , req.query['division_id']
        ).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                try {
                    //`<div style="text-align: right;">${value}</div>`
                    output = result[0]
                    console.log(' output[0].email: ', output[0].email)
                    let tbDateF_;
                    let formattedtbDateF;
                    let tbDateT_;
                    let formattedtbDateT;

                    tbDateF_ = moment.tz(output[0].datefrom, 'Asia/Bangkok');
                    formattedtbDateF = tbDateF_.format('DD-MM-YYYY');
                    tbDateT_ = moment.tz(output[0].dateto, 'Asia/Bangkok');
                    formattedtbDateT = tbDateT_.format('DD-MM-YYYY');

                    let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC`
                    let body = `วันที่: ${tbDateF_} - ${tbDateT_}<br>
            พื้นที่ขอเข้าพบ: ${output[0].meeting_area}<br>
            ผู้ร้องขอ: ${output[0].requestor}<br>
            ตำแหน่งผู้ร้องขอ: ${output[0].position}<br>
            กดลิงค์ด้านล่างเพื่อ อนุมัติ หรือ ปฏิเสธ<br><br>
            (<a href="http://localhost:443/approvevrflst">link</a>)`;

                    let transporter = nodemailer.createTransport({
                        host: process.env.smtp_server,
                        port: process.env.smtp_server_port,
                        secure: false,
                        auth: {
                            user: process.env.mail_user_sender,
                            pass: process.env.mail_pass_sender,
                        },
                        connectionTimeout: 3000000 // New timeout duration
                    });
                    let mailOptions
                    if (output[0].attach_file === '' || output[0].attach_file === null) {
                        mailOptions = {
                            from: `VRF <${process.env.mail_user_sender}>`,
                            to: output[0].email,
                            subject,
                            html: body
                        };

                    }
                    else {
                        mailOptions = {
                            from: `VRF <${process.env.mail_user_sender}>`,
                            to: output[0].email,
                            subject,
                            html: body, // use html instead of text
                            attachments: [
                                {
                                    // Path is now relative to your current directory
                                    path: `./uploads/${output[0].attach_file}`
                                }
                            ]
                        };
                    }
                    transporter.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                    // res.send("Email sent");            
                    // console.log('set_sendmail output: ', output[0].reason)
                    res.json(result)
                } catch (error) {
                    res.json({ error: error })
                    console.error(error)
                    // Expected output: ReferenceError: nonExistentFunction is not defined
                    // (Note: the exact output may be browser-dependent)
                }
            }
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/getrole', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    try {
        dboperations.getRole(req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/getactivity_authen', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req: ', req)
    console.log('approve_setting_id: ', req.query['approve_setting_id'])
    console.log('approve_setting_version: ', req.query['approve_setting_version'])
    try {
        dboperations.getactivity_authen(req.query['approve_setting_id'], req.query['approve_setting_version']).then((result) => {
            res.json(result)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/getuser', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    console.log('req.query[CustomerID]', req.query['CustomerID'])
    try {
        dboperations.getUser(req.query['user_id'], req.query['CustomerID']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/getuserEdit', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    console.log('req.query[CustomerID]', req.query['CustomerID'])
    try {
        dboperations.getuserEdit(req.query['user_id'], req.query['CustomerID']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_user_list', urlencodedParser, (req, res) => {
    try {
        dboperations.get_user_list(
            //     req.query['department_id']
            //     , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_user_list_by_dept', urlencodedParser, (req, res) => {
    try {
        dboperations.get_user_list_by_dept(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['division_id']

        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_vrf_list', urlencodedParser, (req, res) => {
    // console.log('/get_vrf_list department_id: ', req.query['department_id']
    //     , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_vrf_list(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_vrf_lst_for_security', urlencodedParser, (req, res) => {
    console.log('/get_vrf_list department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_vrf_lst_for_security(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['role_id']
            , req.query['division_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_vrf_approve_list', urlencodedParser, (req, res) => {
    console.log('/get_vrf_approve_list department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id']
        , 'role_id: ', req.query['role_id']
        , 'division_id: ', req.query['division_id'])
    try {
        dboperations.get_vrf_approve_list(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['role_id']
            , req.query['division_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_templete_vrf_list', urlencodedParser, (req, res) => {
    console.log('/get_templete_vrf_list department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_templete_vrf_list(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_vrf_trans', urlencodedParser, (req, res) => { 
    console.log('/get_search_vrf_trans req.query[tbDateF]: ', req.query['tbDateF']
        , 'req.query[tbDateT]: ', req.query['tbDateT']
        , 'req.query[requestor_id]: ', req.query['requestor_id']
        , 'req.query[area_id]: ', req.query['area_id']
        , 'req.query[requestor_dept_id]: ', req.query['requestor_dept_id']
        , 'req.query[department_id]: ', req.query['department_id']
        , 'req.query[branch_id]: ', req.query['branch_id']
        , 'req.query[role_id]: ', req.query['role_id']
    )
    try {
        dboperations.get_search_vrf_trans(
            req.query['tbDateF']
            , req.query['tbDateT']
            , req.query['requestor_id']
            , req.query['area_id']
            , req.query['requestor_dept_id']
            , req.query['department_id']
            , req.query['branch_id']
            , req.query['checkin_status']
            , req.query['role_id']
        ).then((result) => {
            res.json(result)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_user_vrf_by_dept', urlencodedParser, (req, res) => {
    try {
        dboperations.get_search_user_vrf_by_dept(
            req.query['user_id']
            , req.query['first_name']
            , req.query['last_name']
            , req.query['username']
            , req.query['employee_id']
            , req.query['email']
            , req.query['position_id']
            , req.query['department_id']
            , req.query['branch_id']
            , req.query['role_id']
            , req.query['division_id']
        ).then((result) => {
            res.json(result)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_user_vrf', urlencodedParser, (req, res) => {
    try {
        dboperations.get_search_user_vrf(
            req.query['user_id']
            , req.query['first_name']
            , req.query['last_name']
            , req.query['username']
            , req.query['employee_id']
            , req.query['email']
            , req.query['position_id']
            , req.query['department_id']
            , req.query['branch_id']
            , req.query['role_id']
            , req.query['division_id']
        ).then((result) => {
            res.json(result)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_vrf', urlencodedParser, (req, res) => {
    try {
        dboperations.get_search_vrf(
            req.query['tbDateF']
            , req.query['tbDateT']
            , req.query['requestor_id']
            , req.query['area_id']
            , req.query['requestor_dept_id']
            , req.query['department_id']
            , req.query['branch_id']
            , req.query['checkin_status']
        ).then((result) => {
            res.json(result)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
// app.get('/getcctbranch', urlencodedParser, (req, res) => {  
//     dboperations.getCashCenterData( req.query['CustomerID']  ).then((result, err) => {
//         if (err) {
//             console.log('error: ',err)
//         }
//         else {
//             res.json(result[0]) 
//         }
//     })
// })
app.get('/approvelist', urlencodedParser, (req, res) => {
    try {
        console.log('req.query[RoleId]: ', req.query['RoleId']
            , '/approvelist ', req.query['CustomerID']
            , 'req.query[user_id]: ', req.query['user_id']
            , 'req.query[approve_setting_id]: ', req.query['approve_setting_id']
            , 'req.query[approve_setting_version]: ', req.query['approve_setting_version']
        )
        dboperations.getApproveList(req.query['RoleId']
            , req.query['CustomerID']
            , req.query['user_id']
            , req.query['approve_setting_id']
            , req.query['approve_setting_version']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        res.json({ error: error })
        console.error(error)
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }
})
app.get('/approvenlist', urlencodedParser, (req, res) => {
    try {
        console.log('req.query[RoleId]: ', req.query['RoleId']
            , 'req.query[CustomerID]: ', req.query['CustomerID']
            , 'req.query[user_id]: ', req.query['user_id']
            , 'req.query[approve_setting_id]: ', req.query['approve_setting_id']
            , 'req.query[approve_setting_version]: ', req.query['approve_setting_version']
        )
        dboperations.getApproveNList(req.query['RoleId']
            , req.query['CustomerID']
            , req.query['user_id']
            , req.query['approve_setting_id']
            , req.query['approve_setting_version']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        res.json({ error: error })
        console.error(error)
    }
})
app.get('/approveProcList', urlencodedParser, (req, res) => {
    try {
        dboperations.getApproveProcList(req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_approveProcData', urlencodedParser, (req, res) => {
    try {
        dboperations.get_approveProcData(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_approveProcDataDet', urlencodedParser, (req, res) => {
    try {
        dboperations.get_approveProcDataDet(req.query['approve_setting_id'], req.query['version']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/set_cancel_approve_proc_data', urlencodedParser, (req, res) => {
    try {
        dboperations.set_cancel_approve_proc_data(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/getdownloadlink', urlencodedParser, (req, res) => {
    console.log('req.query[user_id]: ', req.query['user_id'])

    try {

        dboperations.getDownloadLink(req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.post('/add_approveProc', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        console.log('obj_json: ', obj_json)
        console.log('data_: ', data_)
        dboperations.add_approveProc(obj_json).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.post('/set_manual_add_vrf', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        // console.log('obj_json: ', obj_json)
        dboperations.set_manual_add_vrf(obj_json).then((result) => {
            res.json(result)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.post('/set_reject_vrf', bodyParser.json(), (req, res) => {
    console.log('req.body: ', req.body);
    console.log('req.body[reject_reason]: ', req.body.reject_reason);
    try {
        dboperations.set_reject_vrf(req.body.vrf_id_for_reject
            , req.body.reject_reason
            , req.body.RejectBy).then((result) => {
                res.json({ message: 'success' })
            }).catch((err) => {
                console.log('error: ', err)
                res.json({ error: err })
            })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }


});
app.post('/set_manual_add_vrf_trans_det', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        // console.log('obj_json: ', obj_json)
        dboperations.set_manual_add_vrf_trans_det(obj_json).then((result) => {
            res.json(result)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.post('/set_manual_add_vrf_det', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        // console.log('obj_json: ', obj_json)
        dboperations.set_manual_add_vrf_det(obj_json).then((result) => {
            res.json(result)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.post('/set_manual_update_vrf_det_trans', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        console.log('/set_manual_update_vrf_det_trans obj: ', obj)
        let obj_json = JSON.parse(obj)
        dboperations.set_manual_update_vrf_det_trans(obj_json).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }


})
app.post('/set_manual_update_vrf_det', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        console.log('obj.length: ', obj.length)
        console.log('obj.length: ', obj)
        let obj_json = JSON.parse(obj)
        console.log('obj_json 0 : ', obj_json)
        dboperations.set_manual_update_vrf_det(obj_json).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }


})
app.post('/set_manual_update_vrf', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        dboperations.set_manual_update_vrf(obj_json).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }


})
app.get('/get_templete_vrf', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    try {
        dboperations.get_templete_vrf(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_vrf', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    try {
        dboperations.get_vrf(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_uservrf_info', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    try {
        dboperations.get_uservrf_info(req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_vrf_file/:name', (req, res) => {
    try {
        const file = path.resolve(__dirname, 'uploads', req.params.name);
        res.sendFile(file);
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

});
app.get('/get_vrf_det', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    try {
        dboperations.get_vrf_det(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_templete_vrf_det', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    try {
        dboperations.get_templete_vrf_det(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/update_user_vrf_status_all', urlencodedParser, (req, res) => {
    let output = null
    try {
        req.query['Id'].forEach((item) => {
            dboperations.update_user_vrf_status(parseInt(item)
                , req.query['Type_']
                , req.query['user_id']
            ).then((result) => {
                output = result[0]
            }).catch((err) => {
                console.log('error: ', err)
                res.json({ error: err })
            })
        })

        res.json(output)

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/update_vrf_trans_status_all', urlencodedParser, (req, res) => {
    let output = null
    let type_ = req.query['Type_']
    try {
        req.query['Id'].forEach((item) => {
            dboperations.update_vrf_trans_status(parseInt(item)
                , req.query['Type_']
                , req.query['user_id']
                , req.query['role_id']
                , req.query['work_flow_id']
            ).then((result) => {
                output = result[0]
            }).catch((err) => {
                console.log('error: ', err)
                res.json({ error: err })
            })

            if (type_ === 'cancel') {
                dboperations.get_upload_filename(parseInt(item)).then((result, err) => {
                    if (err) {
                        console.log('error: ', err)
                    }
                    else {
                        console.log('result[0]: ', result[0][0].attach_file)
                        if ((result[0][0].attach_file !== '')
                            && (result[0][0].attach_file !== null)
                            && (result[0][0].attach_file !== undefined)
                            && (result[0][0].attach_file !== 'undefined')
                        ) {
                            // ใช้ fs.stat
                            fs.stat('./uploads/' + result[0][0].attach_file, (err, stats) => {
                                if (err) {
                                    console.log(`ไม่พบไฟล์: ${result[0][0].attach_file}`);
                                } else {
                                    fs.unlink('./uploads/' + result[0][0].attach_file, (err) => {
                                        if (err) throw err;
                                        console.log(result[0][0].attach_file + ' ถูกลบแล้ว');
                                    });
                                }
                            });
                        }
                        output = result[0]
                    }
                })
            }

        })
        res.json(output)

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/update_vrfstatus_all', urlencodedParser, (req, res) => {
    console.log('update_vrfstatus_all req.query[Id]:', req.query['Id'])
    console.log('update_vrfstatus_all req.query[Id].length:', req.query['Id'].length)
    console.log('update_vrfstatus_all req.query[Type_]:', req.query['Type_'])
    let output = null
    try {
        req.query['Id'].forEach((item) => {
            // console.log(item)
            console.log('update_vrfstatus_all in array Id: ', parseInt(item))
            dboperations.update_vrfstatus(parseInt(item), req.query['Type_'], req.query['user_id']).then((result) => {
                output = result[0]
            }).catch((err) => {
                console.log('error: ', err)
                res.json({ error: err })
            })
        })
        res.json(output)

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }


    // dboperations.update_vrfstatus(req.query['Id'], req.query['Type_'], req.query['user_id']).then((result, err) => {
    //     if (err) {
    //         console.log('error: ', err)
    //     }
    //     else {
    //         res.json(result[0])
    //     }
    // })
})
app.get('/update_vrf_trans_approve_status', urlencodedParser, (req, res) => {
    console.log('/update_vrf_trans_approve_status req.query[Id]:', req.query['Id']
        , 'req.query[department_id]:', req.query['department_id']
        , 'req.query[branch_id]:', req.query['branch_id']
        , 'req.query[division_id]:', req.query['division_id']
    )
    try {
        dboperations.update_vrf_trans_approve_status(req.query['Id']
            , req.query['Type_']
            , req.query['user_id']
            , req.query['role_id']
            , req.query['work_flow_id']
            , req.query['department_id']
            , req.query['branch_id']
            , req.query['division_id']
        ).then(async (result, err) => {
            if (err) {
                console.log('error: ', err)
            }
            else {
                if ((req.query['role_id'] !== '3') && (req.query['role_id'] !== '8')) {
                    let result_sendmail = await setSendMail_next_approver(req.query['Id'])
                    console.log('setSendMail_next_approver result_sendmail: ', result_sendmail)
                }
                if (req.query['role_id'] === '8') {
                    let result_sendmail = await setSendMail_final_approve(req.query['Id'])
                    console.log('setSendMail_final_approve result_sendmail: ', result_sendmail)
                }
                //role_id=8 is ncc_manager
                res.json(result[0])
            }
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
const setSendMail_final_approve = async (id) => {
    try {
        let result = await dboperations.get_mail_info_final_approve(id)
        console.log('setSendMail_final_approve result: ', result)
        let output = result[0][0]
        console.log('setSendMail_final_approve output: ', output)

        console.log(' output.email_final_approve: ', output.email_final_approve)
        let tbDateF_;
        let formattedtbDateF;
        let tbDateT_;
        let formattedtbDateT;
        tbDateF_ = moment.tz(output.datefrom, 'Asia/Bangkok');
        formattedtbDateF = tbDateF_.format('DD-MM-YYYY');
        tbDateT_ = moment.tz(output.dateto, 'Asia/Bangkok');
        formattedtbDateT = tbDateT_.format('DD-MM-YYYY');

        let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC อนุมัติแล้ว`
        let body = `วันที่: ${formattedtbDateF} - ${formattedtbDateT}<br>
        พื้นที่ขอเข้าพบ: ${output.meeting_area}<br>
        ผู้ร้องขอ: ${output.requestor}<br>
        ตำแหน่งผู้ร้องขอ: ${output.position}<br>
        กดลิงค์ด้านล่างเพื่อเข้าไปดูรายละเอียด<br><br>
        (<a href="${process.env.CLIENT_URL}/requestvrflst">link_vrf</a>)`;
        let transporter = nodemailer.createTransport({
            host: process.env.smtp_server,
            port: process.env.smtp_server_port,
            secure: false,
            auth: {
                user: process.env.mail_user_sender,
                pass: process.env.mail_pass_sender,
            },
            connectionTimeout: 3000000 // New timeout duration
        });
        let mailOptions
        if (output.attach_file === '' || output.attach_file === null) {
            mailOptions = {
                from: `VRF <${process.env.mail_user_sender}>`,
                to: output.email_final_approve,
                subject,
                html: body
            };
        }
        else {
            mailOptions = {
                from: `VRF <${process.env.mail_user_sender}>`,
                to: output.email_final_approve,
                subject,
                html: body, // use html instead of text
                attachments: [
                    {
                        // Path is now relative to your current directory
                        path: `./uploads/${output.attach_file}`
                    }
                ]
            };
        }
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        });

    }
    catch (err) {
        console.log('error: ', err);
    }
}
const setSendMail_next_approver = async (id) => {
    try {
        let result = await dboperations.get_mail_info_next_approve(id)
        let output = result[0]
        console.log(' output[0].email_next_approver: ', output[0].email_next_approver)

        let tbDateF_;
        let formattedtbDateF;
        let tbDateT_;
        let formattedtbDateT;

        tbDateF_ = moment.tz(output[0].datefrom, 'Asia/Bangkok');
        formattedtbDateF = tbDateF_.format('DD-MM-YYYY');
        tbDateT_ = moment.tz(output[0].dateto, 'Asia/Bangkok');
        formattedtbDateT = tbDateT_.format('DD-MM-YYYY');

        let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC`
        let body = `วันที่: ${formattedtbDateF} - ${formattedtbDateT}<br>
        พื้นที่ขอเข้าพบ: ${output[0].meeting_area}<br>
        ผู้ร้องขอ: ${output[0].requestor}<br>
        ตำแหน่งผู้ร้องขอ: ${output[0].position}<br>
        กดลิงค์ด้านล่างเพื่อ อนุมัติ หรือ ปฏิเสธ<br><br>
        (<a href="${process.env.CLIENT_URL}/approvevrflst">link_vrf</a>)`;
        let transporter = nodemailer.createTransport({
            host: process.env.smtp_server,
            port: process.env.smtp_server_port,
            secure: false,
            auth: {
                user: process.env.mail_user_sender,
                pass: process.env.mail_pass_sender,
            },
            connectionTimeout: 3000000 // New timeout duration
        });
        let mailOptions
        if (output[0].attach_file === '' || output[0].attach_file === null) {
            mailOptions = {
                from: `VRF <${process.env.mail_user_sender}>`,
                to: output[0].email_next_approver,
                subject,
                html: body
            };

        }
        else {
            mailOptions = {
                from: `VRF <${process.env.mail_user_sender}>`,
                to: output[0].email_next_approver,
                subject,
                html: body, // use html instead of text
                attachments: [
                    {
                        // Path is now relative to your current directory
                        path: `./uploads/${output[0].attach_file}`
                    }
                ]
            };
        }
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        });
        // transporter.sendMail(mailOptions, function (error, info) {
        //     if (error) {
        //         console.log(error);
        //     } else {
        //         console.log('Email sent: ' + info.response);
        //         return true
        //     }
        // });

        // res.send("Email sent");            
        //console.log('set_sendmail output: ', output[0].reason)
        // res.json(result)

    }
    catch (err) {
        console.log('error: ', err);
    }
}
app.get('/set_sp_update_vrf_checkinount', urlencodedParser, (req, res) => {
    try {
        dboperations.set_sp_update_vrf_checkinount(req.query['Id']
            , req.query['Type_']
            , req.query['user_id']
            , req.query['comment']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }


})
app.get('/update_user_vrf_status', urlencodedParser, (req, res) => {

    dboperations.update_user_vrf_status(req.query['Id'], req.query['Type_'], req.query['user_id'])
        .then((result) => {
            try {
                res.json(result[0])
            } catch (error) {
                console.error("Error:", error);
                res.status(500).send("Internal Server Error");
            }
        })
        .catch((err) => {
            console.error('Database operation error: ', err);
            res.status(500).send("Database operation error");
        });
});
app.get('/update_vrf_trans_status', urlencodedParser, (req, res) => {
    let attach_file_primitive = req.query['attach_file_primitive']
    dboperations.update_vrf_trans_status(req.query['Id'], req.query['Type_'], req.query['user_id'], req.query['attach_file_primitive'])
        .then((result) => {
            try {
                if (attach_file_primitive && attach_file_primitive !== 'undefined') {
                    // ใช้ fs.stat
                    fs.stat('./uploads/' + attach_file_primitive, (err, stats) => {
                        if (err) {
                            console.log(`ไม่พบไฟล์: ${attach_file_primitive}`);
                        } else {
                            fs.unlink('./uploads/' + attach_file_primitive, (err) => {
                                if (err) {
                                    console.error("Error while deleting the file:", err);
                                    res.status(500).send("Error while deleting the file");
                                    return;
                                }
                                console.log(attach_file_primitive + ' ถูกลบแล้ว');
                            });
                        }
                    });
                }
                res.json(result[0])
            } catch (error) {
                console.error("Error:", error);
                res.status(500).send("Internal Server Error");
            }
        })
        .catch((err) => {
            console.error('Database operation error: ', err);
            res.status(500).send("Database operation error");
        });
});
app.get('/update_vrfstatus', urlencodedParser, (req, res) => {
    try {
        dboperations.update_vrfstatus(req.query['Id'], req.query['Type_'], req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/delete_app_proc_det', urlencodedParser, (req, res) => {
    try {
        dboperations.delete_app_proc_det(req.query['Id'], req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
// const getReportFilename = (path_) => {
//     let output = []
//     let countfile = 0
//     //let output0={}
//     console.log('start getReportFilename path_: ', path_)
//     try { 
//         fs.readdirSync(path_).forEach(file => {
//             if (file) {
//                 if (countfile === 0) {
//                     output.push({ file1: file })
//                     console.log('file1: ', file)
//                     countfile++
//                 }
//                 else {
//                     // output0={file2: file}
//                     output.push({ file2: file })
//                     console.log('file2: ', file)
//                     countfile = 0
//                 }
//             }
//         })       
//     } catch (error) {
//         console.error('error: ',error);
//         res.json({ error: error })        
//     }
//     // console.log('output0: ',output0)
//     // output.push( output0 )
//     return output
// }
// app.get('/update_vrf_trans_status', urlencodedParser, (req, res) => {
//     let attach_file_primitive = req.query['attach_file_primitive']
//     dboperations.update_vrf_trans_status(req.query['Id']
//         , req.query['Type_']
//         , req.query['user_id']
//         , req.query['attach_file_primitive']).then((result, err) => {
//             if (err) {
//                 console.log('error: ', err)
//             }
//             else {
//                 if ((attach_file_primitive !== '')
//                     && (attach_file_primitive !== null)
//                     && (attach_file_primitive !== undefined)
//                     && (attach_file_primitive !== 'undefined')
//                 ) {
//                     // ใช้ fs.stat
//                     fs.stat('./uploads/' + attach_file_primitive, (err, stats) => {
//                         if (err) {
//                             console.log(`ไม่พบไฟล์: ${attach_file_primitive}`);
//                         } else {
//                             fs.unlink('./uploads/' + attach_file_primitive, (err) => {
//                                 if (err) throw err;
//                                 console.log(attach_file_primitive + ' ถูกลบแล้ว');
//                             });
//                         }
//                     });
//                 }
//                 res.json(result[0])
//             }
//         })
// })
// app.post('/downloadExcel',bodyParser.json(), async (req, res) => {
//     try {

//       const data = req.body; // ข้อมูลที่ส่งมาจาก frontend
//       console.log('req.body: ',req.body)  
//       let workbook = new ExcelJS.Workbook();
//       let worksheet = workbook.addWorksheet('Sheet 1');  
//       worksheet.columns = [
//         { header: 'No', key: 'no' },
//         { header: 'ชื่อผู้มาติดต่อ', key: 'contactor' },        
//         { header: 'วันที่เริ่มเข้า', key: 'date_from' },
//         { header: 'วันที่สุดท้ายที่เข้า', key: 'date_to' },
//         { header: 'พื้นที่ที่เข้าพบ', key: 'meeting_area' },
//         { header: 'เหตุผลที่เข้าพบ', key: 'reason' },
//         { header: 'ผู้นำพา', key: 'navigator' },
//         { header: 'สถานะการขอเข้าพื้นที่', key: 'approve_status' },
//         // ใส่คีย์อื่น ๆ ที่ตรงกับข้อมูลของคุณที่นี่...
//       ];  
//       data.forEach(item => {
//         item.date_from = format(new Date(item.date_from), 'dd-MM-yyyy')
//         item.date_to = format(new Date(item.date_to), 'dd-MM-yyyy')
//         worksheet.addRow(item);
//       });  
//       res.setHeader(
//         'Content-Type',
//         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//       );
//       res.setHeader(
//         'Content-Disposition',
//         'attachment; filename=' + 'report.xlsx',
//       );  
//       await workbook.xlsx.write(res);
//       res.end();
//     } catch (error) {
//         console.log('error: ',error);
//       res.status(500).send(error);
//     }
// });
app.listen(process.env.PORT, () => console.log(`running on localhost:${process.env.PORT}`))


