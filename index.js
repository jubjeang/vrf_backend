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
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors')
const ActiveDirectory = require('activedirectory2');
const { format } = require('date-fns')
// var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
const ExcelJS = require('exceljs');
require('dotenv').config()
const moment = require('moment-timezone');

app.use(cors({
    origin: process.env.CLIENT_URL,//'https://localhost:84', // replace with your Vue app domain
    credentials: true
}));
// app.use(cors())
const server = http.createServer(app);

// ตั้งค่า Socket.IO กับ HTTP server และกำหนด CORS option
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        credentials: true
    }
});
io.on('connection', (socket) => {

    socket.on('disconnect', () => {
        ////console.log('Client disconnected');
    });

    // สามารถเพิ่ม handlers อื่นๆ ที่นี่
});
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        ////console.log('storage filename req.body.reason: ', req.body.reason)     
        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        const extension = path.extname(file.originalname);
        fileName = `${originalName}_${Date.now()}${extension}`;
        cb(null, fileName)
    },
    destination: function (req, file, cb) {
        cb(null, './uploads')
    }
})

const upload = multer({

    // dest: './uploads'
    storage: storage
})
const adjustDate = (inputDate) => {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + 1);
    return date;
};
app.post('/set_add_user_vrf', upload.single('file'), async (req, res) => {
    try {

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
            console.error('set_add_user_vrf error: ', err);

            res.json({ error: err.message });
        }

    } catch (error) {
     
        res.json({ error: 'set_add_user_vrf error' });
    }
});
app.post('/set_manual_add_vrf_trans', upload.single('file'), async (req, res) => {
    try {
        //----area 20240906
        let data_ = req.body
        // Check if area and controlarea have data before parsing
        let area = [];
        let controlarea = [];
        let Id
        if (data_.area && data_.area !== '[]') {
            area = JSON.parse(data_.area);
        }
        if (data_.controlarea && data_.controlarea !== '[]') {
            controlarea = JSON.parse(data_.controlarea);
        }
        //---end area
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
            // area: req.body.area,
            templete_id: req.body.templete_id,
            createby: req.body.user_id,
            date_from: adjustDate(req.body.date_from),
            date_to: adjustDate(req.body.date_to),
        };
        try {
            const result = await dboperations.set_manual_add_vrf_trans(data, io);
            Id = result
            dboperations.set_vrf_area(area, controlarea, Id, req.body.user_id, 'vrf').then((result) => {
                //console.log('/set_manual_add_vrf_trans: ', result)
            }).catch((err) => {
                
                console.error('set_manual_add_vrf_template Id error: ', err);
                res.json({ error: err })
            })

            res.json(result);
        }
        catch (err) {
            console.error('Database error: ', err);
            res.json({ error: err.message });
        }
    } catch (error) {
        console.error('General error: ', error);
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
        
        try {
            const result = await dboperations.set_manual_update_vrf_trans(data);
            if (old_file !== '') {
                try {
                    await fs.stat('./uploads/' + old_file);
                    await fs.unlink('./uploads/' + old_file);                
                } catch (err) {
                    console.error(`ไม่พบไฟล์: ${old_file}`);
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
const e = require('express');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.post('/downloadExcel', bodyParser.json(), async (req, res) => {
    try {
        const data = req.body;
        let workbook = new ExcelJS.Workbook();
        //----------------------------------------------------VRF by Status
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
        let dateF;
        let dateT;

        // สร้าง row จากข้อมูลและกำหนด style
        data.forEach(item => {
            dateF = new Date(item.date_from)
            dateT = new Date(item.date_to)
            item.date_from = `${String(dateF.getUTCDate()).padStart(2, '0')}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${dateF.getUTCFullYear()}`;//format(new Date(item.date_from), 'dd-MM-yyyy');
            item.date_to = `${String(dateT.getUTCDate()).padStart(2, '0')}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${dateT.getUTCFullYear()}`;//format(new Date(item.date_to), 'dd-MM-yyyy');
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
        
        res.status(500).send(error);
    }
});

app.get('/get_vrf_reports', async (req, res) => {
   
    try {
        // ดึงข้อมูลจากฐานข้อมูล
        const [by_approve
            , by_department
            , by_meeting_area
            , by_count_all
            , by_checkinout_is_not_null
            , by_checkinout_is_null] = await Promise.all([
                dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_approve'),
                dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_department'),
                dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_meeting_area'),
                dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_count_all'),
                dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_checkinout_is_not_null'),
                dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_checkinout_is_null')
            ]);
        let workbook = new ExcelJS.Workbook();
        const sheet1 = workbook.addWorksheet('Sheet1');
        const sheet2 = workbook.addWorksheet('Sheet2');
        const sheet3 = workbook.addWorksheet('Sheet3');
        let dateF;
        let dateT;
        dateF = new Date(req.query['tbDateF'])
        dateT = new Date(req.query['tbDateT'])
        // เติมข้อมูลใน Sheet1
        //sheet1.addRow([`รายละเอียด VRF ช่วงวันที่ ${String(dateF.getUTCDate()).padStart(2, '0')}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${dateF.getUTCFullYear()} - ${String(dateT.getUTCDate()).padStart(2, '0')}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${dateT.getUTCFullYear()}`]);
        sheet1.addRow([`รายละเอียด VRF ช่วงวันที่ ${String(dateF.getDate()).padStart(2, '0')}-${String(dateF.getMonth() + 1).padStart(2, '0')}-${dateF.getFullYear()} - ${String(dateT.getDate()).padStart(2, '0')}-${String(dateT.getMonth() + 1).padStart(2, '0')}-${dateT.getFullYear()}`]);
        sheet1.addRow([]);
        sheet1.addRow(['สรุปจำนวน VRF ทั้งหมดคือ ' + by_count_all[0].allvrf + ' รายการ']);
        sheet1.addRow([]);
        sheet1.addRow(['สรุปจำนวน VRF by สถานะ']);
        sheet1.addRow([]);
        const headerRow0 = sheet1.addRow(['no', 'จำนวน', 'แผนก']);
        headerRow0.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        //sheet1.addRow(['no', 'จำนวน', 'สถานะ']);
        by_approve.forEach((item) => {
            //sheet1.addRow([item.no, item.amount, item.approve_status]);
            const row = sheet1.addRow([item.no, item.amount, item.approve_status]);
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });

        });
        sheet1.addRow([]);
        sheet1.addRow(['สรุปจำนวน VRF by แผนก']);
        sheet1.addRow([]);
        const headerRow1 = sheet1.addRow(['no', 'จำนวน', 'แผนก']);
        headerRow1.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        //sheet1.addRow(['no', 'จำนวน', 'แผนก']);
        by_department.forEach((item) => {
            //sheet1.addRow([item.no, item.amount, item.department]);
            const row = sheet1.addRow([item.no, item.amount, item.department]);
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });
        sheet1.addRow([]);
        sheet1.addRow(['สรุปจำนวน VRF by พื้นที่']);
        sheet1.addRow([]);
        const headerRow2 = sheet1.addRow(['no', 'จำนวน', 'พื้นที่']);
        headerRow2.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        //sheet1.addRow(['no', 'จำนวน', 'พื้นที่']);
        by_meeting_area.forEach((item) => {
            //sheet1.addRow([item.no, item.amount, item.meeting_area]);
            const row = sheet1.addRow([item.no, item.amount, item.meeting_area]);
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        sheet2.addRow([]);
        sheet2.addRow(['รายชื่อคนที่ไม่เข้าพื้นที่']);
        sheet2.addRow([]);
        const headerRow3 = sheet2.addRow(['no'
            , 'ชื่อ-นามสกุล'
            , 'Check In'
            , 'Check Out'
            , 'จากวันที่'
            , 'ถึงวันที่'
            , 'เหตุผลในการเข้าพื้นที่'
            , 'Contactor'
            , 'Requestor'
            , 'Position'
            , 'Department'
            , 'Phone'
            , 'Navigator'
            , 'พื้นที่ทั่วไป'
            , 'พื้นที่ความมั่นคง'
            , 'ผู้สร้าง VRF'
            , 'สถานะการอนุมัติ'
            , 'อนุมัติโดย'
        ]);
        headerRow3.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        by_checkinout_is_null.forEach((item) => {
            //sheet2.addRow([item.no
            //  , item.fullname, item['check in'], item['check out'],item.date_from,item.date_to,item.reason,item.contactor,item.requestor,item.position,item.department,item.requestor_phone,item.navigator,item['พื้นที่'],item['ประเภทพื้นที่'],item['คนสร้าง'],item.approve_status,item.ApproveBy]);
            const row = sheet2.addRow([item.no
                , item.fullname, item['check in'], item['check out'], item.date_from, item.date_to, item.reason, item.contactor, item.requestor, item.position, item.department, item.requestor_phone, item.navigator, item['พื้นที่ทั่วไป'], item['พื้นที่ความมั่นคง'], item['คนสร้าง'], item.approve_status, item.ApproveBy]);
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });

        sheet3.addRow([]);
        sheet3.addRow(['รายชื่อคนที่เข้าพื้นที่']);
        sheet3.addRow([]);
        const headerRow4 = sheet3.addRow(['no'
            , 'ชื่อ-นามสกุล'
            , 'Check In'
            , 'Check Out'
            , 'จากวันที่'
            , 'ถึงวันที่'
            , 'เหตุผลในการเข้าพื้นที่'
            , 'Contactor'
            , 'Requestor'
            , 'Position'
            , 'Department'
            , 'Phone'
            , 'Navigator'
            , 'พื้นที่ทั่วไป'
            , 'พื้นที่ความมั่นคง'
            , 'ผู้สร้าง VRF'
            , 'สถานะการอนุมัติ'
            , 'อนุมัติโดย'
        ]);
        headerRow4.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        by_checkinout_is_not_null.forEach((item) => {
            //sheet3.addRow([item.no
            //  , item.fullname, item['check in'], item['check out'],item.date_from,item.date_to,item.reason,item.contactor,item.requestor,item.position,item.department,item.requestor_phone,item.navigator,item['พื้นที่'],item['ประเภทพื้นที่'],item['คนสร้าง'],item.approve_status,item.ApproveBy]);
            const row = sheet3.addRow([item.no
                , item.fullname, item['check in'], item['check out'], item.date_from, item.date_to, item.reason, item.contactor, item.requestor, item.position, item.department, item.requestor_phone, item.navigator, item['พื้นที่ทั่วไป'], item['พื้นที่ความมั่นคง'], item['คนสร้าง'], item.approve_status, item.ApproveBy]);
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.border = {
                    top: { style: 'thin' },
                    left: { style: 'thin' },
                    bottom: { style: 'thin' },
                    right: { style: 'thin' }
                };
            });
        });
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=report.xlsx');
        // เขียนข้อมูลลงใน response และจบการทำงาน
        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('error: ', error);
        res.status(500).send('Error generating Excel file');
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
app.get('/get_prefix', urlencodedParser, (req, res) => {
    handleDatabaseOperation(
        res,
        dboperations.get_prefix,
        'get_prefix'
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
                return res.status(500).json({ error: err });
            }
            if (auth) {
                return res.json({ success: true, message: 'Authentication successful' });
            } else {
                return res.status(401).json({ success: false, message: 'Authentication failed' });
            }
        });
    } catch (e) {
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
        let data_ = obj_json['data_'].split(':')
        let customer = ''
        customer = checkcustomer(obj_json['customerID'])
        // obj_json['customerID'] === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
        var path = req.query['JobDate'] + '/' + req.query['CCT_Data']
            + '/' + customer
        var file = __dirname + '/reports/' + data_[0] + '/' + data_[1] + '/' + customer + '/' + data_[2] + '/' + data_[3];
        res.setHeader("Content-Type", "text/csv; charset=Windows-874;")
        res.setHeader('Content-Disposition', contentDisposition(file))
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
        onFinished(res, () => {
            destroy(filestream)
        })
    } catch (error) {
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
        dboperations.getuserinfo(data_all).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
        obj_json['type'] === 'Deposit' ? filename = 'BranchtoCCTTemplate_deposit.xls' : filename = 'CCTToBranchTemplate_withdraw.xls'

        var file = __dirname + '/template/' + filename
        res.setHeader("Content-Type", "application/vnd.ms-excel; charset=Windows-874;")
        res.setHeader('Content-Disposition', contentDisposition(file))
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
        onFinished(res, () => {
            destroy(filestream)
        })
    } catch (error) {
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
        let data_ = obj_json['data_'].split(':')
        let customer = ''
        customer = checkcustomer(obj_json['customerID'])
        var path = req.query['JobDate'] + '/' + req.query['CCT_Data']
            + '/' + customer
        var file = __dirname + '/reports/' + data_[0] + '/' + data_[1] + '/' + customer + '/' + data_[2] + '/' + data_[4]
        res.setHeader("Content-Type", "application/vnd.ms-excel; charset=Windows-874;")
        res.setHeader('Content-Disposition', contentDisposition(file))
        var filestream = fs.createReadStream(file);
        filestream.pipe(res);
        onFinished(res, () => {
            destroy(filestream)
        })
    } catch (error) {
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
                res.json({ error: err });
            });
    } catch (error) {          
        res.status(500).send('Internal Server Error');
    }
});
//------------getrole 
app.get('/set_sendmail', urlencodedParser, async (req, res) => {
    // let id = req.body['id']
    let output
    let MeetingAreas_selectedItems = await getFilteredAreas(req.query['id_'], 'พื้นที่ทั่วไป');
    let MeetingAreas_selectedControlItems = await getFilteredAreas(req.query['id_'], 'พื้นที่ความมั่นคง');
    try {
        if (req.query['role_id'] !== '8') {
            let email_recipient = await getEmail_recipient(null
                ,null
                ,null
                ,req.query['Id']
                ,null);
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_next_approver(req.query['id_']
                        , recipient.email
                        , recipient.user_id
                        , ''
                        ,MeetingAreas_selectedItems
                        ,MeetingAreas_selectedControlItems);
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        if (req.query['role_id'] === '8') {
            let email_recipient = await getEmail_recipient(null
                ,null
                ,null
                ,req.query['Id']
                ,null);            
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_final_approve(
                        req.query['id_']
                        , recipient.email
                        , recipient.user_id
                        , ''
                        ,MeetingAreas_selectedItems
                        ,MeetingAreas_selectedControlItems
                    );
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        res.json({ success: true });

    } catch (err) {
        console.error('error: ', err);
        res.json({ error: err.message || err });
    }
})
app.get('/getrole', urlencodedParser, (req, res) => {
    try {
        dboperations.getRole(req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
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
    try {
        dboperations.getactivity_authen(req.query['approve_setting_id'], req.query['approve_setting_version']).then((result) => {
            res.json(result)
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/getuser', urlencodedParser, (req, res) => {
    try {
        dboperations.getUser(req.query['user_id'], req.query['CustomerID']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/getuserEdit', urlencodedParser, (req, res) => {
    try {
        dboperations.getuserEdit(req.query['user_id'], req.query['CustomerID']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_all_vrf_info', urlencodedParser, (req, res) => {
    try {
        dboperations.get_all_vrf_info(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_all_vrf_list', urlencodedParser, (req, res) => {
    try {
        dboperations.get_all_vrf_list(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_vrf_list', urlencodedParser, (req, res) => {
    try {
        dboperations.get_vrf_list(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['user_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_vrf_lst_for_security', urlencodedParser, (req, res) => {
    try {
        dboperations.get_vrf_lst_for_security(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['role_id']
            , req.query['division_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_vrf_approve_list', urlencodedParser, (req, res) => {

    try {
        dboperations.get_vrf_approve_list(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['role_id']
            , req.query['division_id']
            , req.query['user_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_data_approve_list', urlencodedParser, (req, res) => {

    try {
        dboperations.get_data_approve_list(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['role_id']
            , req.query['division_id']
            , req.query['Id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_data_approve_list_for_security', urlencodedParser, (req, res) => {
    try {
        dboperations.get_data_approve_list_for_security(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['role_id']
            , req.query['division_id']
            , req.query['Id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_templete_vrf_list', urlencodedParser, (req, res) => {
    try {
        dboperations.get_templete_vrf_list(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
// ตัวอย่างการเพิ่ม endpoint ใน Express.js
app.get('/get_area_names', async (req, res) => {
    const vrfId = req.query.vrf_id;
    try {
        let pool = await sql.connect(config);
        const request = pool.request();
        request.input('vrfId', sql.Int, vrfId);
        const result = await request.query("SELECT *,area_name as [name] FROM selected_areas WHERE vrf_id = @vrfId and [Status] = '1'");
        res.json(result.recordset);
    } catch (error) {
        console.error('Error fetching area names:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/get_categoryControlAreas', urlencodedParser, (req, res) => {
    try {
        dboperations.get_categoryControlAreas(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_categoryAreas', urlencodedParser, (req, res) => {
    try {
        dboperations.get_categoryAreas(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_Group_MeetingAreas', urlencodedParser, (req, res) => {
    try {
        dboperations.get_group_categoryAreas(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_Group_MeetingControlAreas', urlencodedParser, (req, res) => {
    try {
        dboperations.get_Group_MeetingControlAreas(
            req.query['department_id']
            , req.query['branch_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_vrf_for_guard', urlencodedParser, (req, res) => {
    try {
        dboperations.get_search_vrf_for_guard(
            req.query['tbDateF']
            , req.query['tbDateT']
            , req.query['requestor_id']
            , req.query['area_id']
            , req.query['requestor_dept_id']
            , req.query['department_id']
            , req.query['branch_id']
            , req.query['checkin_status']
            , req.query['role_id']
            , req.query['approve_status']
            , req.query['contactor']
            , req.query['requestor']
            , req.query['card_no']
        ).then((result) => {
            res.json(result)
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_vrf_approve_trans', urlencodedParser, (req, res) => {
    try {
        dboperations.get_search_vrf_approve_trans(
            req.query['tbDateF']
            , req.query['tbDateT']
            , req.query['requestor_id']
            , req.query['area_id']
            , req.query['requestor_dept_id']
            , req.query['department_id']
            , req.query['branch_id']
            , req.query['checkin_status']
            , req.query['role_id']
            , req.query['approve_status']
        ).then((result) => {
            res.json(result)
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_vrf_list', urlencodedParser, (req, res) => {
    try {
        dboperations.get_search_vrf_list(
            req.query['tbDateF']
            , req.query['tbDateT']
            , req.query['requestor_id']
            , req.query['area_id']
            , req.query['requestor_dept_id']
            , req.query['branch_id']
            , req.query['approve_status']
            , req.query['contactor']
        ).then((result) => {
            ////console.log('result: ', result)
            res.json(result)
        }).catch((err) => {
            
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
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_vrf_templete', urlencodedParser, (req, res) => {
    try {
        dboperations.get_search_vrf_templete(
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
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/approvelist', urlencodedParser, (req, res) => {
    try {
        dboperations.getApproveList(req.query['RoleId']
            , req.query['CustomerID']
            , req.query['user_id']
            , req.query['approve_setting_id']
            , req.query['approve_setting_version']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
        dboperations.getApproveNList(req.query['RoleId']
            , req.query['CustomerID']
            , req.query['user_id']
            , req.query['approve_setting_id']
            , req.query['approve_setting_version']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/getdownloadlink', urlencodedParser, (req, res) => {
    try {

        dboperations.getDownloadLink(req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
        dboperations.add_approveProc(obj_json).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.post('/set_vrf_area', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        // Check if area and controlarea have data before parsing
        let area = [];
        let controlarea = [];
        if (obj_json.area && obj_json.area !== '[]') { 
            area = JSON.parse(obj_json.area);
        } else {
            //console.log('No area data provided.');
        }
        if (obj_json.controlarea && obj_json.controlarea !== '[]') {
            controlarea = JSON.parse(obj_json.controlarea);
            if (controlarea.length === 0) {
                //console.log('No controlarea data provided.');
            } else {
                //console.log('/set_vrf_area Parsed controlarea: ', controlarea);
            }
        } else {
            //console.log('No controlarea data provided.');
        }
        // res.json({ success: "success" })
        dboperations.set_vrf_area(area, controlarea).then((result) => {
            res.json(result)
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.post('/set_reject_vrf', bodyParser.json(), (req, res) => {
    try {
        dboperations.set_reject_vrf(req.body.vrf_id_for_reject
            , req.body.reject_reason
            , req.body.RejectBy).then((result) => {
                res.json({ message: 'success' })
            }).catch((err) => {
                
                res.json({ error: err })
            })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
});
app.post('/set_su_cancel_vrf', bodyParser.json(), (req, res) => {
    try {
        dboperations.set_su_cancel_vrf(req.body.vrf_id_for_reject
            , req.body.cancel_reason
            , req.body.CancelBy).then((result) => {
                res.json({ message: 'success' })
            }).catch((err) => {
                
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
        let newid = obj_json.newid;
        let role_id = obj_json.role_id;
        let MeetingAreas_selectedItems = [];
        let MeetingAreas_selectedControlItems = [];
        if (obj_json.area && obj_json.area !== '[]') {
            //const decodedControlData = decodeURIComponent(req.query['MeetingAreas_selectedControlItems']);
            MeetingAreas_selectedItems = JSON.parse(obj_json.area);
        }
        if (obj_json.controlarea && obj_json.controlarea !== '[]') {
            //const decodedControlData = decodeURIComponent(req.query['MeetingAreas_selectedItems']);
             MeetingAreas_selectedControlItems = JSON.parse(obj_json.controlarea);
        }
        dboperations.set_manual_add_vrf_trans_det(obj_json).then(async (result) => {
            if (role_id !== '8') {
                let email_recipient = await getEmail_Manager(newid);
                //console.log('/set_manual_add_vrf_trans_det email_recipient: ',email_recipient);
                for (const recipient of email_recipient) {
                    try {
                        let result_sendmail = await setSendMail_next_approver(newid, recipient.email, recipient.user_id, '',MeetingAreas_selectedItems,MeetingAreas_selectedControlItems);
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }
            }
            if (role_id === '8') {
                let email_recipient = await getEmail_Manager(newid);
                for (const recipient of email_recipient) {
                    try {
                        let result_sendmail = await setSendMail_final_approve(newid, recipient.email, recipient.user_id, '',MeetingAreas_selectedItems,MeetingAreas_selectedControlItems);
                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }
            }
            res.json(result)
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
// จัดการกับ uncaughtException ที่ระดับแอปพลิเคชัน
process.on('uncaughtException', (err) => {
    console.error('There was an uncaught error', err);
    // ทำการ log ข้อผิดพลาดและอาจจะรีสตาร์ทการทำงานหรือทำการแก้ไขอื่นๆ
});
app.post('/update_urgentcase_vrf_det', urlencodedParser, async (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        //Type_: 'send_approve',
        let newid = obj_json[0].vrf_id;
        let role_id = obj_json[0].role_id;
        let MeetingAreas_selectedItems = await getFilteredAreas(newid, 'พื้นที่ทั่วไป');
        let MeetingAreas_selectedControlItems = await getFilteredAreas(newid, 'พื้นที่ความมั่นคง');
        dboperations.set_update_urgentcase_vrf_det(obj_json).then(async (result) => {
            let updateResult = await updateVrfTransApproveStatus(obj_json, io);
            if (role_id !== '8') {
                let email_recipient = await getEmail_recipient(null
                    ,null
                    ,null
                    ,newid
                    ,null);
                for (const recipient of email_recipient) {
                    try {
                        let result_sendmail = await setSendMail_next_approver(
                            newid
                            , recipient.email
                            , recipient.user_id
                            , 'urgentcase'
                            ,MeetingAreas_selectedItems
                            ,MeetingAreas_selectedControlItems                        
                        );
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }
            }
            if (role_id === '8') {
                let email_recipient = await getEmail_recipient(null
                    ,null
                    ,null
                    ,newid
                    ,null);
                for (const recipient of email_recipient) {
                    try {
                        let result_sendmail = await setSendMail_final_approve(
                            newid
                            , recipient.email
                            , recipient.user_id
                            , 'urgentcase'
                            ,MeetingAreas_selectedItems
                            ,MeetingAreas_selectedControlItems
                        );
                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }
            }
            res.json(updateResult)
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
// สร้างฟังก์ชันใหม่ด้วย arrow function
const updateVrfTransApproveStatus = async (queryParams, io) => {
    try {
        const result = await dboperations.update_vrf_trans_approve_status(
            queryParams[0].vrf_id,//vrf_id
            'send_approve',
            queryParams[0].user_id,
            queryParams[0].role_id,
            queryParams[0].work_flow_id,
            queryParams[0].department_id,
            queryParams[0].branch_id,
            queryParams[0].division_id,
            io
        );
        let MeetingAreas_selectedItems = await getFilteredAreas(queryParams[0].vrf_id, 'พื้นที่ทั่วไป');
        let MeetingAreas_selectedControlItems = await getFilteredAreas(queryParams[0].vrf_id, 'พื้นที่ความมั่นคง');
        // ... โค้ดส่วนที่เหลือสำหรับการส่งอีเมล
        if (queryParams[0].role_id !== '8') {
            let email_recipient = await getEmail_recipient(null
                ,null
                ,null
                ,queryParams[0].vrf_id
                ,null);
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_next_approver(
                        queryParams[0].vrf_id
                        , recipient.email
                        , recipient.user_id
                        , ''
                        ,MeetingAreas_selectedItems
                        ,MeetingAreas_selectedControlItems                    
                    );
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        if (queryParams[0].role_id === '8') {
            let email_recipient = await getEmail_recipient(null
                ,null
                ,null
                ,queryParams[0].vrf_id
                ,null);
              for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_final_approve(
                        queryParams[0].vrf_id
                        , recipient.email
                        , recipient.user_id
                        , ''
                        ,MeetingAreas_selectedItems
                        ,MeetingAreas_selectedControlItems
                    );
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        return result[0];
    } catch (err) {
        console.error('error: ', err);
        throw err;
    }
};

app.post('/set_update_urgentcase_vrf', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        dboperations.set_update_urgentcase_vrf(obj_json).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
        let obj_json = JSON.parse(obj)
        dboperations.set_manual_update_vrf_det_trans(obj_json).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.post('/set_update_vrf_template', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        let area = [];
        let controlarea = [];
        let Id
        if (obj_json.area && obj_json.area !== '[]') {
            area = JSON.parse(obj_json.area);
        } else {
            //console.log('No area data provided.');
        }
        if (obj_json.controlarea && obj_json.controlarea !== '[]') {
            controlarea = JSON.parse(obj_json.controlarea);
            if (controlarea.length === 0) {
                //console.log('No controlarea data provided.');
            } else {
                //console.log('/set_update_vrf_template controlarea: ', controlarea);
            }
        } else {
            //console.log('No controlarea data provided.');
        }
        //update vrf_template and vrf_area
        dboperations.set_update_vrf_template(obj_json).then((result) => {
            dboperations.set_update_vrf_area(area, controlarea, obj_json.id, obj_json.user_id, 'template').then((result) => {
            //
            }).catch((err) => {
                
                res.json({ error: err })
            })
            // res.json(Id)
            res.json({ success: "success" })
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.post('/set_update_vrf_template_det', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        dboperations.set_update_vrf_template_det(obj_json).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
//20240805
app.post('/set_manual_add_vrf_template', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        // Check if area and controlarea have data before parsing
        let area = [];
        let controlarea = [];
        let Id
        if (obj_json.area && obj_json.area !== '[]') {
            area = JSON.parse(obj_json.area);
        } else {
            //console.log('No area data provided.');
        }
        if (obj_json.controlarea && obj_json.controlarea !== '[]') {
            controlarea = JSON.parse(obj_json.controlarea);
            if (controlarea.length === 0) {
                //console.log('No controlarea data provided.');
            } else {
                //console.log('/set_manual_add_vrf_template Parsed controlarea: ', controlarea);
            }
        } else {
            //console.log('No controlarea data provided.');
        }
        //add vrf_template and vrf_area
        dboperations.set_manual_add_vrf_template(obj_json).then((result) => {
            Id = result
            dboperations.set_vrf_area(area, controlarea, Id, obj_json.user_id, 'template').then((result) => { 
                //
            }).catch((err) => {
                
                console.error('set_manual_add_vrf_template Id error: ', err);
                res.json({ error: err })
            })
            res.json(Id)
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.post('/set_manual_add_vrf_template_det', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        // res.json({ success: "success" })
        dboperations.set_manual_add_vrf_template_det(obj_json).then((result) => {
            res.json(result)
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_templete_vrf', urlencodedParser, (req, res) => {
    try {
        dboperations.get_templete_vrf(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_MeetingAreas_selectedItems', urlencodedParser, (req, res) => {

    try {
        dboperations.get_MeetingAreas_selectedItems(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_vrf_apprve_page', urlencodedParser, (req, res) => {
    try {
        dboperations.get_vrf_apprve_page(req.query['Id'], req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_vrf', urlencodedParser, (req, res) => {
    try {
        dboperations.get_vrf(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_uservrf_info', urlencodedParser, (req, res) => {
    try {
        dboperations.get_uservrf_info(req.query['user_id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
app.get('/get_currentDateTime', urlencodedParser, (req, res) => {
    try {
        dboperations.get_currentDateTime(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_vrf_security_det', urlencodedParser, (req, res) => {
    try {
        dboperations.get_vrf_security_det(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_vrf_det', urlencodedParser, (req, res) => {
    try {
        dboperations.get_vrf_det(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_templete_vrf_det', urlencodedParser, (req, res) => {
    try {
        dboperations.get_templete_vrf_det(req.query['Id']).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
                
                res.json({ error: err })
            })
        })

        res.json(output)

    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/update_vrf_requester_trans_status_all', urlencodedParser, (req, res) => {
    let output = []
    let type_ = req.query['Type_']
    //---tpe_ = 'approve' หรือ 'cancel'
    try {
        req.query['Id'].forEach((item) => {
            dboperations.update_vrf_requester_trans_status_all(parseInt(item)
                , req.query['Type_']
                , req.query['user_id']
                , req.query['role_id']
                , req.query['work_flow_id']
                , io
            ).then((result) => {
                if (result && result.length > 0) {
                    // output = result[0]
                    output.push(result[0]);
                } else {
                    output.push({ message: "No data found for item " });
                }

            }).catch((err) => {
                
                res.json({ error: err })
            })

            if (type_ === 'cancel') {
                dboperations.get_upload_filename(parseInt(item)).then((result, err) => {
                    if (err) {
                        
                    }
                    else {
                        if ((result[0][0].attach_file !== '')
                            && (result[0][0].attach_file !== null)
                            && (result[0][0].attach_file !== undefined)
                            && (result[0][0].attach_file !== 'undefined')
                        ) {
                            // ใช้ fs.stat
                            fs.stat('./uploads/' + result[0][0].attach_file, (err, stats) => {
                                if (err) {
                                    //console.log(`ไม่พบไฟล์: ${result[0][0].attach_file}`);
                                } else {
                                    fs.unlink('./uploads/' + result[0][0].attach_file, (err) => {
                                        if (err) throw err;                                        
                                    });
                                }
                            });
                        }
                        if (result && result.length > 0 && result[0].length > 0) {
                            // output = result[0]
                            output.push(result[0]);
                        }
                        else {
                            output.push({ message: "No data found for item " })
                        }
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
//--------for approve all func in approve page
app.get('/update_vrf_trans_status_all', urlencodedParser, (req, res) => {
    let output = null
    let type_ = req.query['Type_']
    let ids = req.query['Id']; // สมมติว่า 'Id' เป็นอาร์เรย์
    let totalItems = ids.length; // รับจำนวนรวมขององค์ประกอบในอาร์เรย์
    let lastrow = false
    try {
        req.query['Id'].forEach((item, index) => {
            if (index === totalItems - 1) {
                //console.log('รอบสุดท้าย');
                lastrow = true
            }
            else {
                lastrow = false
            }
            dboperations.update_vrf_trans_status(parseInt(item)
                , req.query['Type_']
                , req.query['user_id']
                , req.query['role_id']
                , req.query['work_flow_id']
                , req.query['department_id']
                , req.query['branch_id']
                , req.query['division_id']
                , lastrow
                , io
            ).then((result) => {
                output = result[0]                 
            }).catch((err) => {                 
                res.json({ error: err })
            })
            if (type_ === 'cancel') {
                dboperations.get_upload_filename(parseInt(item)).then((result, err) => {
                    if (err) {
                        //----------
                    }
                    else {
                        if ((result[0][0].attach_file !== '')
                            && (result[0][0].attach_file !== null)
                            && (result[0][0].attach_file !== undefined)
                            && (result[0][0].attach_file !== 'undefined')
                        ) {
                            // ใช้ fs.stat
                            fs.stat('./uploads/' + result[0][0].attach_file, (err, stats) => {
                                if (err) {
                                    //console.log(`ไม่พบไฟล์: ${result[0][0].attach_file}`);
                                } else {
                                    fs.unlink('./uploads/' + result[0][0].attach_file, (err) => {
                                        if (err) throw err;
                                        //console.log(result[0][0].attach_file + ' ถูกลบแล้ว');
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
    let output = null
    try {
        req.query['Id'].forEach((item) => {
            dboperations.update_vrfstatus(parseInt(item), req.query['Type_'], req.query['user_id']).then((result) => {
                output = result[0]
            }).catch((err) => {
                
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
    //         
    //     }
    //     else {
    //         res.json(result[0])
    //     }
    // })
})
app.get('/update_vrf_approve_status_from_mail', urlencodedParser, async (req, res) => {
    //---update status
    try {
        const result = await dboperations.update_vrf_approve_status_from_mail(req.query['user_id']
            , req.query['vrf_id']
            , req.query['type']
            , io
        );
        let type_ = req.query['req_urgentcase_by'] ? 'urgentcase' : ''
        if (result[0][0].role_id_approver) {
            if (result[0][0].approve_status !== 'approved') {
                let role_id_approver = result[0][0].role_id_approver;
                let MeetingAreas_selectedItems = await getFilteredAreas(req.query['Id'], 'พื้นที่ทั่วไป');
                let MeetingAreas_selectedControlItems = await getFilteredAreas(req.query['Id'], 'พื้นที่ความมั่นคง');
                //for (let i = 0; i < getSelected_areas_all_flat.length; i++) { ////////หาพื้นที่
                for (let i = 0; i < MeetingAreas_selectedControlItems.length; i++) { ////////หาพื้นที่
                    try {
                        const getSelected_areas_all_= MeetingAreas_selectedControlItems[i];
                        if( result[0][0].approve_status > 2 && i===0 )
                        {
                            if (role_id_approver !== '8') { 
                                let email_recipient = await getEmail_recipient(getSelected_areas_all_.area_id
                                    ,getSelected_areas_all_.area_type
                                    ,getSelected_areas_all_.is_area_group
                                    ,req.query['vrf_id']
                                    ,getSelected_areas_all_.area_name);//หาอีเมล์ผู้รับผิดชอบในพื้นที่นั้นๆ                                
                                if(email_recipient)//พบอีเมล์ไหม
                                    {
                                        for (let j = 0; j < email_recipient.length; j++) {
                                           const recipient = email_recipient[j];
                                            try { 
                                                if(recipient.email)
                                                { 
                                                    if( result[0][0].approve_status > 2 && j===0 )
                                                        {
                                                            let result_sendmail = await setSendMail_next_approver(req.query['vrf_id'], recipient.email
                                                                , recipient.user_id
                                                                , type_
                                                                ,MeetingAreas_selectedItems
                                                                ,MeetingAreas_selectedControlItems
                                                            );
                                                        }                                                         
                                                }                                                
                                            } catch (err) {
                                                console.error('Error sending email:', err);
                                            }
                                        }
                                    }   
                            }
                            if (role_id_approver === '8') {
                                let email_recipient = await getEmail_recipient(null
                                    ,null
                                    ,null
                                    ,req.query['vrf_id']
                                    ,null);                                
                                for (const recipient of email_recipient) {
                                    try {
                                        let result_sendmail = await setSendMail_final_approve(
                                            req.query['vrf_id']
                                            , recipient.email
                                            , recipient.user_id
                                            , type_
                                            ,MeetingAreas_selectedItems
                                            ,MeetingAreas_selectedControlItems                                        
                                        );
                                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                                    } catch (err) {
                                        console.error('Error sending email:', err);
                                    }
                                }
                            }
                        }
                        if( result[0][0].approve_status === 2 )
                        {
                            if (role_id_approver !== '8') { 
                                let email_recipient = await getEmail_recipient(getSelected_areas_all_.area_id
                                    ,getSelected_areas_all_.area_type
                                    ,getSelected_areas_all_.is_area_group
                                    ,req.query['vrf_id']
                                    ,getSelected_areas_all_.area_name);//หาอีเมล์ผู้รับผิดชอบในพื้นที่นั้นๆ                                    
                                if(email_recipient)//พบอีเมล์ไหม
                                    {
                                        for (const recipient of email_recipient) {
                                            try { 
                                                if(recipient.email)
                                                { 
                                                    if( result[0][0].approve_status <= 2 )
                                                    {
                                                        let result_sendmail = await setSendMail_next_approver(req.query['vrf_id'], recipient.email
                                                            , recipient.user_id
                                                            , type_
                                                            ,MeetingAreas_selectedItems
                                                            ,MeetingAreas_selectedControlItems
                                                        );
                                                    }
                                                }                                                
                                            } catch (err) {
                                                console.error('Error sending email:', err);
                                            }
                                        }
                                    }   
                            }
                            if (role_id_approver === '8') {
                                let email_recipient = await getEmail_recipient(null
                                    ,null
                                    ,null
                                    ,req.query['vrf_id']
                                    ,null);                                
                                for (const recipient of email_recipient) {
                                    try {
                                        let result_sendmail = await setSendMail_final_approve(
                                            req.query['vrf_id']
                                            , recipient.email
                                            , recipient.user_id
                                            , type_
                                            ,MeetingAreas_selectedItems
                                            ,MeetingAreas_selectedControlItems
                                        );
                                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                                    } catch (err) {
                                        console.error('Error sending email:', err);
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }/////////////////
            }
            res.json(result[0])
        }
        else {
            res.json({ error: 'error' })
        }
    } catch (err) {
        console.error('error: ', err);
        res.json({ error: err.message || err });
    }
});
app.get('/update_vrf_approve_status_from_mail_20250102', urlencodedParser, async (req, res) => {
    //---update status
    try {
        const result = await dboperations.update_vrf_approve_status_from_mail(req.query['user_id']
            , req.query['vrf_id']
            , req.query['type']
            , io
        );
        let type_ = req.query['req_urgentcase_by'] ? 'urgentcase' : ''
        if (result[0][0].role_id_approver) {
            if (result[0][0].approve_status !== 'approved') {
                let role_id_approver = result[0][0].role_id_approver;
                let MeetingAreas_selectedItems = await getFilteredAreas(req.query['Id'], 'พื้นที่ทั่วไป');
                let MeetingAreas_selectedControlItems = await getFilteredAreas(req.query['Id'], 'พื้นที่ความมั่นคง');
                for (let i = 0; i < getSelected_areas_all_flat.length; i++) { ////////หาพื้นที่
                    try {
                        const getSelected_areas_all_= getSelected_areas_all_flat[i];
                        if( result[0][0].approve_status > 2 && i===0 )
                        {
                            if (role_id_approver !== '8') { 
                                let email_recipient = await getEmail_recipient(getSelected_areas_all_.area_id
                                    ,getSelected_areas_all_.area_type
                                    ,getSelected_areas_all_.is_area_group
                                    ,req.query['vrf_id']
                                    ,getSelected_areas_all_.area_name);//หาอีเมล์ผู้รับผิดชอบในพื้นที่นั้นๆ                                
                                if(email_recipient)//พบอีเมล์ไหม
                                    {
                                        for (let j = 0; j < email_recipient.length; j++) {
                                           const recipient = email_recipient[j];
                                            try { 
                                                if(recipient.email)
                                                { 
                                                    if( result[0][0].approve_status > 2 && j===0 )
                                                        {
                                                            let result_sendmail = await setSendMail_next_approver(req.query['vrf_id'], recipient.email
                                                                , recipient.user_id
                                                                , type_
                                                                ,MeetingAreas_selectedItems
                                                                ,MeetingAreas_selectedControlItems
                                                            );
                                                        }                                                         
                                                }                                                
                                            } catch (err) {
                                                console.error('Error sending email:', err);
                                            }
                                        }
                                    }   
                            }
                            if (role_id_approver === '8') {
                                let email_recipient = await getEmail_recipient(null
                                    ,null
                                    ,null
                                    ,req.query['vrf_id']
                                    ,null);                                
                                for (const recipient of email_recipient) {
                                    try {
                                        let result_sendmail = await setSendMail_final_approve(
                                            req.query['vrf_id']
                                            , recipient.email
                                            , recipient.user_id
                                            , type_
                                            ,MeetingAreas_selectedItems
                                            ,MeetingAreas_selectedControlItems                                        
                                        );
                                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                                    } catch (err) {
                                        console.error('Error sending email:', err);
                                    }
                                }
                            }
                        }
                        if( result[0][0].approve_status === 2 )
                        {
                            if (role_id_approver !== '8') { 
                                let email_recipient = await getEmail_recipient(getSelected_areas_all_.area_id
                                    ,getSelected_areas_all_.area_type
                                    ,getSelected_areas_all_.is_area_group
                                    ,req.query['vrf_id']
                                    ,getSelected_areas_all_.area_name);//หาอีเมล์ผู้รับผิดชอบในพื้นที่นั้นๆ                                    
                                if(email_recipient)//พบอีเมล์ไหม
                                    {
                                        for (const recipient of email_recipient) {
                                            try { 
                                                if(recipient.email)
                                                { 
                                                    if( result[0][0].approve_status <= 2 )
                                                    {
                                                        let result_sendmail = await setSendMail_next_approver(req.query['vrf_id'], recipient.email
                                                            , recipient.user_id
                                                            , type_
                                                            ,MeetingAreas_selectedItems
                                                            ,MeetingAreas_selectedControlItems
                                                        );
                                                    }
                                                }                                                
                                            } catch (err) {
                                                console.error('Error sending email:', err);
                                            }
                                        }
                                    }   
                            }
                            if (role_id_approver === '8') {
                                let email_recipient = await getEmail_recipient(null
                                    ,null
                                    ,null
                                    ,req.query['vrf_id']
                                    ,null);                                
                                for (const recipient of email_recipient) {
                                    try {
                                        let result_sendmail = await setSendMail_final_approve(
                                            req.query['vrf_id']
                                            , recipient.email
                                            , recipient.user_id
                                            , type_
                                            ,MeetingAreas_selectedItems
                                            ,MeetingAreas_selectedControlItems
                                        );
                                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                                    } catch (err) {
                                        console.error('Error sending email:', err);
                                    }
                                }
                            }
                        }
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }/////////////////
            }
            res.json(result[0])
        }
        else {
            res.json({ error: 'error' })
        }
    } catch (err) {
        console.error('error: ', err);
        res.json({ error: err.message || err });
    }
});
app.get('/update_vrf_trans_approve_status', urlencodedParser, async (req, res) => { 
    const update_vrf_trans_approve_status_result = await dboperations.update_vrf_trans_approve_status(req.query['Id']
        , req.query['Type_']
        , req.query['user_id']
        , req.query['role_id']
        , req.query['work_flow_id']
        , req.query['department_id']
        , req.query['branch_id']
        , req.query['division_id']
        , io
    );
    //console.log('/update_vrf_trans_approve_status update_vrf_trans_approve_status_result: ', update_vrf_trans_approve_status_result);
    const approveStatus = update_vrf_trans_approve_status_result[0][0].approve_status;
    console.log('approve_status:', approveStatus); // จะได้ค่า 2
    let MeetingAreas_selectedItems = [];
    let MeetingAreas_selectedControlItems = [];
    try {       
        if (req.query['MeetingAreas_selectedItems'] && req.query['MeetingAreas_selectedItems'] !== '[]') {
            const decodedControlData = decodeURIComponent(req.query['MeetingAreas_selectedItems']);
            MeetingAreas_selectedItems = JSON.parse(decodedControlData);
        } 
        if (req.query['MeetingAreas_selectedControlItems'] && req.query['MeetingAreas_selectedControlItems'] !== '[]') {
            const decodedControlData = decodeURIComponent(req.query['MeetingAreas_selectedControlItems']);
            MeetingAreas_selectedControlItems = JSON.parse(decodedControlData);
        }
        
        let index = 0; // ตัวนับสำหรับตรวจสอบแถวแรก
        let result;
        for (const MeetingControlArea of MeetingAreas_selectedControlItems) {
            if (index === 0 && approveStatus > 2) {
                // Logic สำหรับแถวแรกที่ต้องการ
                result = await setSearch_and_send_email(
                    req.query['role_id'],
                    MeetingControlArea.area_id,
                    MeetingControlArea.area_type,
                    MeetingControlArea.is_area_group,
                    MeetingControlArea.vrf_id,
                    MeetingControlArea.name,
                    MeetingAreas_selectedItems,
                    MeetingAreas_selectedControlItems
                );        
                break; // ออกจาก loop ทันที
            } else {
                result = await setSearch_and_send_email(
                    req.query['role_id'],
                    MeetingControlArea.area_id,
                    MeetingControlArea.area_type,
                    MeetingControlArea.is_area_group,
                    MeetingControlArea.vrf_id,
                    MeetingControlArea.name,
                    MeetingAreas_selectedItems,
                    MeetingAreas_selectedControlItems
                );
            }
            index++; // เพิ่มตัวนับสำหรับแถวถัดไป
        }
        //---เมื่อมี พ.ท. ทั่วไปอย่างเดียว
        if (MeetingAreas_selectedControlItems.length === 0 && MeetingAreas_selectedItems.length > 0 && approveStatus >= 2 ) { 
            for (const area of MeetingAreas_selectedItems) { 
                result = await setSearch_and_send_email(
                    req.query['role_id'],
                    area.area_id, // ใช้ข้อมูลจาก MeetingAreas_selectedItems
                    area.area_type,
                    area.is_area_group,
                    area.vrf_id,
                    area.name,
                    MeetingAreas_selectedItems,
                    MeetingAreas_selectedControlItems
                );
                break; // ออกจาก loop ทันที
            }
        }         
        res.json({ approve_status: update_vrf_trans_approve_status_result[0][0].approve_status })
        // res.json({ approve_status: 'approved' })
    } catch (err) {
        console.error('error: ', err);
        res.json({ error: err.message || err });
    }
});
const setSearch_and_send_email = async (role_id, area_id, area_type, is_area_group, vrf_id,name,MeetingAreas_selectedItems
    ,MeetingAreas_selectedControlItems) => { 
    //req.query['role_id'],req.query['Id']
    try {
        //------role = 8 = SU/NCC Manager     
        if (role_id !== '8') { //--no SU/NCC Manager
            //--หาอีเมล์ผู้อนุมัติ
             let email_recipient = await getEmail_recipient( area_id, area_type, is_area_group, vrf_id,name );
            for (const recipient of email_recipient) {
                try { //VRFszaam@guardforcecash.co.th,VRFszaam@guardforcecash.co.th
                    let result_sendmail = await setSendMail_next_approver(
                        vrf_id
                        , recipient.email
                        , recipient.user_id
                        , ''
                        ,MeetingAreas_selectedItems
                        ,MeetingAreas_selectedControlItems
                    );
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        if (role_id === '8') { // SU/NCC Manager
            let email_recipient = await getEmail_recipient( area_id, area_type, is_area_group, vrf_id,name  );
            //--หาอีเมล์ผู้อนุมัติgetEmail_recipient
            for (const recipient of email_recipient) {
                try {
                    console.log('role is 8 recipient.email: ', recipient.email
                        ,'recipient.user_id: ',recipient.user_id
                    );
                    //--ส่งเมล์
                    let result_sendmail = await setSendMail_final_approve(vrf_id
                        , recipient.email
                        , recipient.user_id
                        , ''
                        ,MeetingAreas_selectedItems
                        ,MeetingAreas_selectedControlItems
                    );
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        //return({result:'success'})
        //res.json({ success: 'success' })
    } catch (e) {
        return({result:`fail ${e.message}`})
    }
};
const getFilteredAreas = async (id, areaType) => {
    let getSelected_areas_all = await dboperations.getSelected_areas_all(id); // ดึงข้อมูล
    return getSelected_areas_all
        .flat() // แปลงข้อมูลเป็น flat array
        .filter(area => area.area_type === areaType) // กรองข้อมูลตามประเภท
        .map(area => ({ ...area, name: area.area_name, area_name: area.area_name })); // เพิ่ม property
};
const getEmail_recipient = async ( area_id, area_type, is_area_group, vrf_id,name ) => {
    try {
        const result = await dboperations.getEmail_recipient( area_id, area_type, is_area_group, vrf_id,name ) ;
        return result[0]; // คืนกลับข้อมูลที่ต้องการ
    } catch (error) {
        console.error('error: ', error);
        return { error: error.message }; // คืนกลับข้อผิดพลาด
    }
};
//--20240917
const getEmail_Manager = async (Id) => {
    try {
        const result = await dboperations.getEmail_Manager(Id);
        return result[0]; // คืนกลับข้อมูลที่ต้องการ
    } catch (error) {
        console.error('error: ', error);
        return { error: error.message }; // คืนกลับข้อผิดพลาด
    }
};
// const getEmail_recipient = async (Id) => {
//     try {
//         const result = await dboperations.getEmail_recipient(Id);
//         return result[0]; // คืนกลับข้อมูลที่ต้องการ
//     } catch (error) {
//         console.error('error: ', error);
//         return { error: error.message }; // คืนกลับข้อผิดพลาด
//     }
// };
const setSendMail_next_approver = async (
    id
    , email_next_approver
    , user_id
    , type_
    ,MeetingAreas_selectedItems
    ,MeetingAreas_selectedControlItems
) => {
    try {
          let result = await dboperations.get_mail_info_next_approve(id);
        let output = result[0];
        let tbDateF_, formattedtbDateF, tbDateT_, formattedtbDateT;

        // สร้าง moment object จาก UTC โดยตรงโดยไม่ใช้เวลา
        tbDateF_ = moment.utc(output[0].datefrom).startOf('day').tz('Asia/Bangkok');
        formattedtbDateF = tbDateF_.format('DD-MM-YYYY');

        tbDateT_ = moment.utc(output[0].dateto).startOf('day').tz('Asia/Bangkok');
        formattedtbDateT = tbDateT_.format('DD-MM-YYYY');

        let link = `${process.env.CLIENT_URL}/approvevrfpage?vrf_id=${id}&user_id=${user_id}`;
        let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC ${type_ ? ` (เคสด่วน)` : ``}`;
        let body = `วันที่: ${formattedtbDateF} - ${formattedtbDateT} ${type_ ? ` (เคสด่วน)` : ``}<br>
        ----------------<br>
        พื้นที่ขอเข้าพบ<br>
        พื้นที่ทั่วไป:  ${(MeetingAreas_selectedItems?.length ? MeetingAreas_selectedItems.map(item => item.name).join(', ') : '-')}<br>
        พื้นที่มั่นคง: ${(MeetingAreas_selectedControlItems?.length ? MeetingAreas_selectedControlItems.map(item => item.name).join(', ') : '-')}<br>
        ----------------<br>
        ชื่อบริษัทผู้มาติดต่อ: ${output[0].contactor}<br>
        เหตุผลในการเข้าพบ: ${output[0].reason}<br>
        ผู้ร้องขอ: ${output[0].requestor}<br>
        ตำแหน่งผู้ร้องขอ: ${output[0].position}<br>
        ชื่อผู้นำพา: ${output[0].navigator}<br><br>
        
        กดลิ้งค์ด้านล่างเพื่อดำเนินการ<br><br><br>
        (<a href="${link}" target="_blank">${process.env.CLIENT_URL}</a>)`;

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

        let mailOptions;
        if (output[0].attach_file === '' || output[0].attach_file === null) {
            mailOptions = {
                from: `VRF <${process.env.mail_user_sender}>`,
                to: email_next_approver,
                subject,
                html: body
            };
        } else {
            mailOptions = {
                from: `VRF <${process.env.mail_user_sender}>`,
                to: email_next_approver,
                subject,
                html: body,
                attachments: [
                    {
                        path: `./uploads/${output[0].attach_file}` // Path is now relative to your current directory
                    }
                ]
            };
        }
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Email sent: ',error);
                    reject(error);
                } else {                    
                    resolve(true);
                }
            });
        });
    } catch (err) {
        console.error('setSendMail_next_approver error: ', err);
    }
};
const setSendMail_final_approve = async (id
    , email_next_approver
    , user_id
    , type_
    ,MeetingAreas_selectedItems
    ,MeetingAreas_selectedControlItems) => {
    try {
        let result = await dboperations.get_mail_info_final_approve(id);
        let output = result[0][0];

        let tbDateF_, formattedtbDateF, tbDateT_, formattedtbDateT;

        // ใช้ startOf('day') เพื่อตั้งเวลาเริ่มต้นของวันก่อนแปลงเขตเวลา
        tbDateF_ = moment.utc(output.datefrom).startOf('day').tz('Asia/Bangkok');
        formattedtbDateF = tbDateF_.format('DD-MM-YYYY');

        tbDateT_ = moment.utc(output.dateto).startOf('day').tz('Asia/Bangkok');
        formattedtbDateT = tbDateT_.format('DD-MM-YYYY');

        let link = `${process.env.CLIENT_URL}/requestvrflst?vrf_id=${id}&user_id=${user_id}`;
        let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC อนุมัติแล้ว ${type_ ? ` (เคสด่วน)` : ``}`;
        let body = `วันที่: ${formattedtbDateF} - ${formattedtbDateT} ${type_ ? ` (เคสด่วน)` : ``}<br>
        ----------------<br>
        พื้นที่ขอเข้าพบ<br>
        พื้นที่ทั่วไป:  ${(MeetingAreas_selectedItems?.length ? MeetingAreas_selectedItems.map(item => item.name).join(', ') : '-')}<br>
        พื้นที่มั่นคง: ${(MeetingAreas_selectedControlItems?.length ? MeetingAreas_selectedControlItems.map(item => item.name).join(', ') : '-')}<br>
        ----------------<br>
        ชื่อบริษัทผู้มาติดต่อ: ${output.contactor}<br>
        เหตุผลในการเข้าพบ: ${output.reason}<br>
        ผู้ร้องขอ: ${output.requestor}<br>
        ตำแหน่งผู้ร้องขอ: ${output.position}<br>
        ชื่อผู้นำพา: ${output.navigator}<br>`;

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

        let mailOptions;
        if (output.attach_file === '' || output.attach_file === null) {
            mailOptions = {
                from: `VRF <${process.env.mail_user_sender}>`,
                to: email_next_approver,
                subject,
                html: body
            };
        } else {
            mailOptions = {
                from: `VRF <${process.env.mail_user_sender}>`,
                to: email_next_approver,
                subject,
                html: body, // use html instead of text
                attachments: [
                    {
                        path: `./uploads/${output.attach_file}` // Path is now relative to your current directory
                    }
                ]
            };
        }

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    //console.log(error);
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });

    } catch (err) {
        console.error('setSendMail_final_approve error: ', err);
    }
};
app.get('/setSendMail_next_approver', urlencodedParser, async (req, res) => { 
    try {
        let result = await dboperations.get_vrf(req.query['Id']);
        //console.log('/setSendMail_next_approver result: ', result);
        let MeetingAreas_selectedItems = await getFilteredAreas(req.query['Id'], 'พื้นที่ทั่วไป');
        let MeetingAreas_selectedControlItems = await getFilteredAreas(req.query['Id'], 'พื้นที่ความมั่นคง');
        for (let i = 0; i < MeetingAreas_selectedControlItems.length; i++) { ////////หาพื้นที่
            try {
                const getSelected_areas_all_= MeetingAreas_selectedControlItems[i];
                if( result[0][0].approve_status > 2 && i===0 )
                {
                    if ((req.query['role_id'] !== '3') && (req.query['role_id'] !== '8')) { 
                        let email_recipient = await getEmail_recipient(getSelected_areas_all_.area_id
                            ,getSelected_areas_all_.area_type
                            ,getSelected_areas_all_.is_area_group
                            ,req.query['Id']
                            ,getSelected_areas_all_.area_name);
                        //console.log('setSendMail_next_approver email_recipient: ',email_recipient); 
                        if(email_recipient)
                        { 
                            for (const recipient of email_recipient) {
                                try { 
                                    let result_sendmail = await setSendMail_next_approver(req.query['Id'], recipient.email
                                        , recipient.user_id
                                        , ''
                                        ,MeetingAreas_selectedItems
                                        ,MeetingAreas_selectedControlItems
                                    );
                                } catch (err) {
                                    console.error('Error sending email:', err);
                                }
                            }
                        }
            
                    }
                    if (req.query['role_id'] === '8') {
                        // let email_recipient = await getEmail_recipient(null
                        //     ,null
                        //     ,null
                        //     ,req.query['Id']
                        //     ,null
                        // );
                        let email_recipient = await getEmail_recipient(getSelected_areas_all_.area_id
                            ,getSelected_areas_all_.area_type
                            ,getSelected_areas_all_.is_area_group
                            ,req.query['Id']
                            ,getSelected_areas_all_.area_name);
                        console.log('setSendMail_final_approve email_recipient: ',email_recipient);
                        if(email_recipient)
                            { 
                                for (const recipient of email_recipient) {
                                    try { 

                                        let result_sendmail = await setSendMail_final_approve(req.query['Id']
                                            , recipient.email
                                            , recipient.user_id
                                            , ''
                                            ,MeetingAreas_selectedItems
                                            ,MeetingAreas_selectedControlItems);
                                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                                        console.log('setSendMail_final_approve: ',result_sendmail);
                                    } catch (err) {
                                        console.error('Error sending email:', err);
                                    }
                                }
                            }
                    }
                }
                if( result[0][0].approve_status === 2 )
                {
                    if ((req.query['role_id'] !== '3') && (req.query['role_id'] !== '8')) { 
                        let email_recipient = await getEmail_recipient(getSelected_areas_all_.area_id
                            ,getSelected_areas_all_.area_type
                            ,getSelected_areas_all_.is_area_group
                            ,req.query['Id']
                            ,getSelected_areas_all_.area_name);
                        // let email_recipient = await getEmail_recipient(null
                        //     ,null
                        //     ,null
                        //     ,req.query['Id']
                        //     ,null);
                        console.log('setSendMail_next_approver email_recipient: ',email_recipient); 
                        if(email_recipient)
                        { 
                            for (const recipient of email_recipient) {
                                try { 
                                    let result_sendmail = await setSendMail_next_approver(req.query['Id'], recipient.email
                                        , recipient.user_id
                                        , ''
                                        ,MeetingAreas_selectedItems
                                        ,MeetingAreas_selectedControlItems
                                    );
                                } catch (err) {
                                    console.error('Error sending email:', err);
                                }
                            }
                        }
            
                    }
                    if (req.query['role_id'] === '8') {
                        // let email_recipient = await getEmail_recipient(null
                        //     ,null
                        //     ,null
                        //     ,req.query['Id']
                        //     ,null
                        // );
                        let email_recipient = await getEmail_recipient(getSelected_areas_all_.area_id
                            ,getSelected_areas_all_.area_type
                            ,getSelected_areas_all_.is_area_group
                            ,req.query['Id']
                            ,getSelected_areas_all_.area_name);
                        console.log('setSendMail_final_approve email_recipient: ',email_recipient);
                        if(email_recipient)
                            { 
                                for (const recipient of email_recipient) {
                                    try { 

                                        let result_sendmail = await setSendMail_final_approve(req.query['Id']
                                            , recipient.email
                                            , recipient.user_id
                                            , ''
                                            ,MeetingAreas_selectedItems
                                            ,MeetingAreas_selectedControlItems);
                                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                                        console.log('setSendMail_final_approve: ',result_sendmail);
                                    } catch (err) {
                                        console.error('Error sending email:', err);
                                    }
                                }
                            }
                    }
                } 
            }
            catch (err) {
                        console.error('Error sending email:', err);
            }
        }//for (let i = 0; i < MeetingAreas_selectedControlItems.length; i++) { ////////หาพื้นที่

        //---เมื่อมี พ.ท. ทั่วไปอย่างเดียว
        if (MeetingAreas_selectedControlItems.length === 0 && MeetingAreas_selectedItems.length > 0 && result[0][0].approve_status >= 2 ) { 
            for (const area of MeetingAreas_selectedItems) { 
                result = await setSearch_and_send_email(
                    req.query['role_id'],
                    area.area_id, // ใช้ข้อมูลจาก MeetingAreas_selectedItems
                    area.area_type,
                    area.is_area_group,
                    area.vrf_id,
                    area.name,
                    MeetingAreas_selectedItems,
                    MeetingAreas_selectedControlItems
                );
                break; // ออกจาก loop ทันที
            }
        } 
        //role_id=8 is ncc_manager
        res.json({ message: 'success' })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/set_update_vrf_det_cancelcheckinout', urlencodedParser, (req, res) => {

    try {
        dboperations.set_update_vrf_det_cancelcheckinout(req.query['Id']
            , req.query['Type_']
            , req.query['user_id']
            , req.query['checkincheckout_det_id']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/set_sp_update_vrf_det_checkinout', urlencodedParser, (req, res) => {
    try {
        dboperations.set_sp_update_vrf_det_checkinout(req.query['Id']
            , req.query['Type_']
            , req.query['user_id']
            , req.query['card_no']
            // , req.query['comment']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/set_sp_update_vrf_checkinount', urlencodedParser, (req, res) => {
    try {
        dboperations.set_sp_update_vrf_checkinount(req.query['Id']
            , req.query['Type_']
            , req.query['user_id']
            , req.query['comment']
        ).then((result) => {
            res.json(result[0])
        }).catch((err) => {
            
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
    dboperations.update_vrf_trans_status(req.query['Id']
        , req.query['Type_']
        , req.query['user_id']
        , req.query['attach_file_primitive'])
        .then((result) => {
            try {
                if (attach_file_primitive && attach_file_primitive !== 'undefined') {
                    // ใช้ fs.stat
                    fs.stat('./uploads/' + attach_file_primitive, (err, stats) => {
                        if (err) {

                        } else {
                            fs.unlink('./uploads/' + attach_file_primitive, (err) => {
                                if (err) {
                                    console.error("Error while deleting the file:", err);
                                    res.status(500).send("Error while deleting the file");
                                    return;
                                }
                           
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
            
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})

server.listen(process.env.PORT, () => {
    console.log(`Server running on https://localhost:${process.env.PORT}`);
});