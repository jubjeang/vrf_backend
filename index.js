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
    //   console.log('New client connected');

    socket.on('disconnect', () => {
        //console.log('Client disconnected');
    });

    // สามารถเพิ่ม handlers อื่นๆ ที่นี่
});
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

const adjustDate = (inputDate) => {
    const date = new Date(inputDate);
    date.setDate(date.getDate() + 1);
    return date;
};
app.post('/set_add_user_vrf', upload.single('file'), async (req, res) => {
    try {
        console.log('set_add_user_vrf req.body: ', req.body);
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
            const result = await dboperations.set_manual_add_vrf_trans(data,io);
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
        console.log('error: ', error);
        res.status(500).send(error);
    }
});

app.get('/get_vrf_reports', async (req, res) => {
    //console.log('/get_vrf_reports req.query[tbDateF]: ', req.query['tbDateF'], 'req.query[tbDateT]: ', req.query['tbDateT']);
    try {
        // ดึงข้อมูลจากฐานข้อมูล
        const [by_approve
            , by_department
            , by_meeting_area
            ,by_count_all
            ,by_checkinout_is_not_null
            ,by_checkinout_is_null] = await Promise.all([
            dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_approve'),
            dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_department'),
            dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_meeting_area'),
            dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_count_all'),
            dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_checkinout_is_not_null'),
            dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_checkinout_is_null')
        ]);

        //console.log('Data from db:', { by_approve, by_department, by_meeting_area });

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
            , 'พื้นที่เข้าพบ'
            , 'ประเภทพื้นที่เข้าพบ'
            , 'ผู้สร้าง VRF'
            , 'สถานะการอนุมัติ'
            ,'อนุมัติโดย'
        ]);
        headerRow3.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        // sheet2.addRow(['no'
        //     , 'ชื่อ-นามสกุล'
        //     , 'Check In'
        //     , 'Check Out'
        //     , 'จากวันที่'
        //     , 'ถึงวันที่'
        //     , 'เหตุผลในการเข้าพื้นที่'
        //     , 'Contactor'
        //     , 'Requestor'
        //     , 'Position'
        //     , 'Department'
        //     , 'Phone'
        //     , 'Navigator'
        //     , 'พื้นที่เข้าพบ'
        //     , 'ประเภทพื้นที่เข้าพบ'
        //     , 'ผู้สร้าง VRF'
        //     , 'สถานะการอนุมัติ'
        //     ,'อนุมัติโดย'
        // ]);
        by_checkinout_is_null.forEach((item) => {
            //sheet2.addRow([item.no
              //  , item.fullname, item['check in'], item['check out'],item.date_from,item.date_to,item.reason,item.contactor,item.requestor,item.position,item.department,item.requestor_phone,item.navigator,item['พื้นที่'],item['ประเภทพื้นที่'],item['คนสร้าง'],item.approve_status,item.ApproveBy]);
              const row = sheet2.addRow([item.no
                  , item.fullname, item['check in'], item['check out'],item.date_from,item.date_to,item.reason,item.contactor,item.requestor,item.position,item.department,item.requestor_phone,item.navigator,item['พื้นที่'],item['ประเภทพื้นที่'],item['คนสร้าง'],item.approve_status,item.ApproveBy]);
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
            , 'พื้นที่เข้าพบ'
            , 'ประเภทพื้นที่เข้าพบ'
            , 'ผู้สร้าง VRF'
            , 'สถานะการอนุมัติ'
            ,'อนุมัติโดย'
        ]);
        headerRow4.eachCell({ includeEmpty: true }, (cell) => {
            cell.border = {
                top: { style: 'thin' },
                left: { style: 'thin' },
                bottom: { style: 'thin' },
                right: { style: 'thin' }
            };
        });
        // sheet3.addRow(['no'
        //     , 'ชื่อ-นามสกุล'
        //     , 'Check In'
        //     , 'Check Out'
        //     , 'จากวันที่'
        //     , 'ถึงวันที่'
        //     , 'เหตุผลในการเข้าพื้นที่'
        //     , 'Contactor'
        //     , 'Requestor'
        //     , 'Position'
        //     , 'Department'
        //     , 'Phone'
        //     , 'Navigator'
        //     , 'พื้นที่เข้าพบ'
        //     , 'ประเภทพื้นที่เข้าพบ'
        //     , 'ผู้สร้าง VRF'
        //     , 'สถานะการอนุมัติ'
        //     ,'อนุมัติโดย'
        // ]);
        by_checkinout_is_not_null.forEach((item) => {
            //sheet3.addRow([item.no
              //  , item.fullname, item['check in'], item['check out'],item.date_from,item.date_to,item.reason,item.contactor,item.requestor,item.position,item.department,item.requestor_phone,item.navigator,item['พื้นที่'],item['ประเภทพื้นที่'],item['คนสร้าง'],item.approve_status,item.ApproveBy]);
              const row = sheet3.addRow([item.no
                  , item.fullname, item['check in'], item['check out'],item.date_from,item.date_to,item.reason,item.contactor,item.requestor,item.position,item.department,item.requestor_phone,item.navigator,item['พื้นที่'],item['ประเภทพื้นที่'],item['คนสร้าง'],item.approve_status,item.ApproveBy]);
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

// app.get('/get_vrf_reports', urlencodedParser, async (req, res) => {
//     console.log('/get_vrf_reports req.query[tbDateF]: ', req.query['tbDateF']
//         , 'req.query[tbDateT]: ', req.query['tbDateT']        
//     )
//     try {
//         // สร้างตัวแปรและรอผลลัพธ์จากฟังก์ชัน get_search_vrf_trans โดยใช้ Promise.all
//         const [by_approve, by_department, by_meeting_area] = await Promise.all([
//             dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_approve'),
//             dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_department'),
//             dboperations.get_vrf_reports(req.query['tbDateF'], req.query['tbDateT'], 'by_meeting_area')
//         ]);
//         let workbook = new ExcelJS.Workbook();
//         // สร้าง sheet ใหม่และตั้งชื่อ
//         const sheet1 = workbook.addWorksheet('Sheet1');
//         const sheet2 = workbook.addWorksheet('Sheet2');
//         const sheet3 = workbook.addWorksheet('Sheet3');
//         const sheet4 = workbook.addWorksheet('Sheet4');

//         // กำหนดข้อมูลใน Sheet1
//         sheet1.addRow(['สรุปจำนวน VRF ทั้งหมดคือ 449 รายการ']);
//         sheet1.addRow([]);
//         sheet1.addRow(['สรุปจำนวน VRF by Status']);
//         sheet1.addRow([]);
//         sheet1.addRow(['จำนวน', 'สถานะ']);
//         sheet1.addRow(['สรุปจำนวน VRF by แผนก']);
//         sheet1.addRow(['จำนวน', 'แผนก']);

//         // กำหนดข้อมูลใน Sheet2
//         sheet2.addRow(['VRF Phase 2']);
//         sheet2.addRow([]);
//         sheet2.addRow(['1.คำนำหน้าชื่อ']);
//         sheet2.addRow(['2.เลือกเข้าพื้นที่ได้หลายพื้นที่']);

//         // กำหนดข้อมูลใน Sheet3
//         sheet3.addRow(['id', 'fullname', 'checkin_date', 'checkin_by', 'checkout_date', 'checkout_by', 'reason', 'contactor', 'requestor']);
//         sheet3.addRow([210, 'อรุณี คงสาลี', null, null, null, null, 'เข้าปฏิบัติงานในพื้นที่', 'บริษัท วิศวกรรม ซอฟต์แวร์', 'ผู้ร้องขอ']);

//         // กำหนดข้อมูลใน Sheet4
//         sheet4.addRow(['id', 'us_name', 'req_reason', 'access_area', 'time_in', 'time_out', 'approver', 'approval_date']);
//         sheet4.addRow([1, 'John Doe', 'Maintenance', 'Area 1', '2023-06-01 08:00:00', '2023-06-01 17:00:00', 'Jane Smith', '2023-05-31 10:00:00']);

//         // เขียน workbook ลงในไฟล์

//         res.setHeader(
//             'Content-Type',
//             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         );
//         res.setHeader(
//             'Content-Disposition',
//             'attachment; filename=' + 'report.xlsx',
//         );

//         await workbook.xlsx.write(res).then(() => {
//             console.log('File created successfully!');
//             }).catch((error) => {
//                 console.error('Error writing the file:', error);
//             });
//         res.end(); 
        
//         // // ส่งค่าผลลัพธ์กลับไปยัง client
//         // console.log('by_approve: ', by_approve);
//         // console.log('by_department: ', by_department);
//         // console.log('by_meeting_area: ', by_meeting_area);

//         // res.json({
//         //     by_approve: by_approve,
//         //     by_department: by_department,
//         //     by_meeting_area: by_meeting_area,
//         //     // เพิ่มค่าอื่นๆ ที่ต้องการส่งกลับ
//         // });
//         // ส่งค่าผลลัพธ์กลับไปยัง client
//         //res.json(by_approve);
//     } catch (error) {
//         console.error('error: ', error);
//         res.json({ error: error });
//     }
// })
// app.post('/downloadExcel', bodyParser.json(), async (req, res) => {
//     try {
//         const data = req.body;
//         let workbook = new ExcelJS.Workbook();
//         let worksheet = workbook.addWorksheet('Sheet 1');
//         worksheet.columns = [
//             { header: 'No', key: 'no', width: 10 },
//             { header: 'ชื่อผู้มาติดต่อ', key: 'contactor', width: 20 },
//             { header: 'วันที่เริ่มเข้า', key: 'date_from', width: 20 },
//             { header: 'วันที่สุดท้ายที่เข้า', key: 'date_to', width: 20 },
//             { header: 'พื้นที่ที่เข้าพบ', key: 'meeting_area', width: 20 },
//             { header: 'เหตุผลที่เข้าพบ', key: 'reason', width: 20 },
//             { header: 'ผู้นำพา', key: 'navigator', width: 20 },
//             { header: 'สถานะการขอเข้าพื้นที่', key: 'approve_status', width: 20 },
//         ];

//         // กำหนด style ให้กับ header
//         worksheet.getRow(1).eachCell((cell) => {
//             cell.fill = {
//                 type: 'pattern',
//                 pattern: 'solid',
//                 fgColor: { argb: 'FFFFFF00' },
//             };
//             cell.border = {
//                 top: { style: 'thin' },
//                 left: { style: 'thin' },
//                 bottom: { style: 'thin' },
//                 right: { style: 'thin' },
//             };
//         });
//         let dateF;
//         let dateT;

//         // สร้าง row จากข้อมูลและกำหนด style
//         data.forEach(item => {
//             dateF = new Date(item.date_from)
//             dateT = new Date(item.date_to)
//             item.date_from = `${String(dateF.getUTCDate()).padStart(2, '0')}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${dateF.getUTCFullYear()}`;//format(new Date(item.date_from), 'dd-MM-yyyy');
//             item.date_to = `${String(dateT.getUTCDate()).padStart(2, '0')}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${dateT.getUTCFullYear()}`;//format(new Date(item.date_to), 'dd-MM-yyyy');
//             const newRow = worksheet.addRow(item);

//             newRow.eachCell((cell) => {
//                 cell.border = {
//                     top: { style: 'thin' },
//                     left: { style: 'thin' },
//                     bottom: { style: 'thin' },
//                     right: { style: 'thin' },
//                 };
//             });
//         });

//         res.setHeader(
//             'Content-Type',
//             'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         );
//         res.setHeader(
//             'Content-Disposition',
//             'attachment; filename=' + 'report.xlsx',
//         );

//         await workbook.xlsx.write(res);
//         res.end();

//     } catch (error) {
//         console.log('error: ', error);
//         res.status(500).send(error);
//     }
// });
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
                console.log('ERROR: ', JSON.stringify(err));
                console.log('ERROR u: ', jobid, ' pw: ', password);
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
app.get('/set_sendmail', urlencodedParser, async (req, res) => {
    // let id = req.body['id']
    let output
    console.log('set_sendmail req.query[id]: ', req.query['id_']
        , 'req.query[department_id]: ', req.query['department_id']
        , 'req.query[branch_id]: ', req.query['branch_id']
        , 'req.query[division_id]: ', req.query['division_id']
    )
    try {
       
        if (req.query['role_id'] !== '8') { 
            let email_recipient = await getEmail_recipient(req.query['id_']);
            console.log('in role not 3 and 8 email_recipient: ', email_recipient)
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_next_approver(req.query['id_'],recipient.email,recipient.user_id,'');
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        if (req.query['role_id'] === '8') {
            let email_recipient = await getEmail_recipient(req.query['id_']);
            console.log('in role not 3 and 8 email_recipient: ', email_recipient)
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_final_approve(req.query['id_'],recipient.email,recipient.user_id,'');
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
app.get('/get_all_vrf_info', urlencodedParser, (req, res) => {
    // console.log('/get_vrf_list department_id: ', req.query['department_id']
    //     , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_all_vrf_info(
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
app.get('/get_all_vrf_list', urlencodedParser, (req, res) => {
    console.log('/get_all_vrf_list department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_all_vrf_list(
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
app.get('/get_vrf_list', urlencodedParser, (req, res) => {
    // console.log('/get_vrf_list department_id: ', req.query['department_id']
    //     , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_vrf_list(
            req.query['department_id']
            , req.query['branch_id']
            , req.query['user_id']
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
        , 'branch_id: ', req.query['branch_id']
        , 'role_id: ', req.query['role_id']
        , 'division_id: ', req.query['division_id']
    )
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
        , 'division_id: ', req.query['division_id']
        , 'user_id: ', req.query['user_id'])
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
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
app.get('/get_data_approve_list', urlencodedParser, (req, res) => {
    console.log('/get_data_approve_list department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id']
        , 'role_id: ', req.query['role_id']
        , 'division_id: ', req.query['division_id']
        , 'Id: ', req.query['Id'])
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
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_data_approve_list_for_security', urlencodedParser, (req, res) => {
    console.log('get_data_approve_list_for_security department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id']
        , 'role_id: ', req.query['role_id']
        , 'division_id: ', req.query['division_id']
        , 'Id: ', req.query['Id'])
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
app.get('/get_categoryControlAreas', urlencodedParser, (req, res) => {
    console.log('/get_categoryControlAreas: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_categoryControlAreas(
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
app.get('/get_categoryAreas', urlencodedParser, (req, res) => {
    console.log('/get_categoryAreas department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_categoryAreas(
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
app.get('/get_Group_MeetingAreas', urlencodedParser, (req, res) => {
    console.log('/get_Group_MeetingAreas department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_group_categoryAreas(
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
app.get('/get_Group_MeetingControlAreas', urlencodedParser, (req, res) => {
    console.log('/get_Group_MeetingControlAreas department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    try {
        dboperations.get_Group_MeetingControlAreas(
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
app.get('/get_search_vrf_for_guard', urlencodedParser, (req, res) => {
    console.log('/get_search_vrf_for_guard req.query[tbDateF]: ', req.query['tbDateF']
        , 'req.query[tbDateT]: ', req.query['tbDateT']
        , 'req.query[requestor_id]: ', req.query['requestor_id']
        , 'req.query[area_id]: ', req.query['area_id']
        , 'req.query[requestor_dept_id]: ', req.query['requestor_dept_id']
        , 'req.query[department_id]: ', req.query['department_id']
        , 'req.query[branch_id]: ', req.query['branch_id']
        , 'req.query[checkin_status]: ', req.query['checkin_status']
        , 'req.query[approve_status]: ', req.query['approve_status']
        , 'req.query[contactor]: ', req.query['contactor']
        , 'req.query[requestor]: ', req.query['requestor']
        , 'req.query[card_no]: ', req.query['card_no']
    )
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
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_vrf_approve_trans', urlencodedParser, (req, res) => {
    console.log('/get_search_vrf_approve_trans req.query[tbDateF]: ', req.query['tbDateF']
        , 'req.query[tbDateT]: ', req.query['tbDateT']
        , 'req.query[requestor_id]: ', req.query['requestor_id']
        , 'req.query[area_id]: ', req.query['area_id']
        , 'req.query[requestor_dept_id]: ', req.query['requestor_dept_id']
        , 'req.query[department_id]: ', req.query['department_id']
        , 'req.query[branch_id]: ', req.query['branch_id']
        , 'req.query[checkin_status]: ', req.query['checkin_status']
        , 'req.query[approve_status]: ', req.query['approve_status']
    )
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
            console.log('error: ', err)
            res.json({ error: err })
        })
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }

})
app.get('/get_search_vrf_list', urlencodedParser, (req, res) => {
    console.log('/get_search_vrf_list req.query[tbDateF]: ', req.query['tbDateF']
        , 'req.query[tbDateT]: ', req.query['tbDateT']
        , 'req.query[requestor_id]: ', req.query['requestor_id']
        , 'req.query[area_id]: ', req.query['area_id']
        , 'req.query[requestor_dept_id]: ', req.query['requestor_dept_id']
        , 'req.query[branch_id]: ', req.query['branch_id']
        , 'req.query[approve_status]: ', req.query['approve_status']
        ,'req.query[contactor]:', req.query['contactor']
    )
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
            //console.log('result: ', result)
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
app.post('/set_manual_add_vrf_template', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        console.log('set_manual_add_vrf_template obj_json: ', obj_json)
        // Check if area and controlarea have data before parsing
        let area = [];
        let controlarea = [];

        if (obj_json.area && obj_json.area !== '[]') {
            area = JSON.parse(obj_json.area);
            console.log('Parsed area: ', area);
        } else {
            console.log('No area data provided.');
        }

        if (obj_json.controlarea && obj_json.controlarea !== '[]') {
            controlarea = JSON.parse(obj_json.controlarea);
            if (controlarea.length === 0) {
                console.log('No controlarea data provided.');
            } else {
                console.log('Parsed controlarea: ', controlarea);
            }
        } else {
            console.log('No controlarea data provided.');
        }
        res.json({ success: "success" })
        // dboperations.set_manual_add_vrf_template(obj_json).then((result) => {
        //     res.json(result)
        // }).catch((err) => {
        //     console.log('error: ', err)
        //     res.json({ error: err })
        // })

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
app.post('/set_su_cancel_vrf', bodyParser.json(), (req, res) => {
    console.log('req.body: ', req.body);
    console.log('req.body[reject_reason]: ', req.body.cancel_reason);
    try {
        dboperations.set_su_cancel_vrf(req.body.vrf_id_for_reject
            , req.body.cancel_reason
            , req.body.CancelBy).then((result) => {
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
        let newid = obj_json.newid;
        let role_id = obj_json.role_id;
        // console.log('obj_json: ', obj_json)
        dboperations.set_manual_add_vrf_trans_det(obj_json).then(async (result) => { 
            if (role_id !== '8') { 
                let email_recipient = await getEmail_recipient(newid);
                console.log('in role not 3 and 8 email_recipient: ', email_recipient)
                for (const recipient of email_recipient) {
                    try {
                        let result_sendmail = await setSendMail_next_approver(newid,recipient.email,recipient.user_id,'');                    
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }
            }
            if (role_id === '8') {
                let email_recipient = await getEmail_recipient(newid);
                console.log('in role not 3 and 8 email_recipient: ', email_recipient)
                for (const recipient of email_recipient) {
                    try {
                        let result_sendmail = await setSendMail_final_approve(newid,recipient.email,recipient.user_id,'');
                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }
            }
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
app.post('/set_manual_add_vrf_template_det', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }
        let obj_json = JSON.parse(obj)
        console.log('set_manual_add_vrf_template_det obj_json: ', obj_json)
        res.json({ success: "success" })
        // dboperations.set_manual_add_vrf_template_det(obj_json).then((result) => {
        //     res.json(result)
        // }).catch((err) => {
        //     console.log('error: ', err)
        //     res.json({ error: err })
        // })
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
app.post('/update_urgentcase_vrf_det', urlencodedParser, (req, res) => {
    try {
        let data_ = req.body
        let obj = null
        for (let x in data_) {
            obj = x
        }        
        let obj_json = JSON.parse(obj)        
        // console.log('/update_urgentcase_vrf_det obj_json.role_id: ', obj_json[0].role_id)
        //Type_: 'send_approve',
        let newid = obj_json[0].vrf_id;
        let role_id = obj_json[0].role_id;
        dboperations.set_update_urgentcase_vrf_det(obj_json).then(async (result) => {            
            let updateResult = await updateVrfTransApproveStatus(obj_json, io);
            if (role_id !== '8') { 
                let email_recipient = await getEmail_recipient(newid);
                console.log('in role not 3 and 8 email_recipient: ', email_recipient)
                for (const recipient of email_recipient) {
                    try {
                        let result_sendmail = await setSendMail_next_approver(newid,recipient.email,recipient.user_id,'urgentcase');                    
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }
            }
            if (role_id === '8') {
                let email_recipient = await getEmail_recipient(newid);
                console.log('in role not 3 and 8 email_recipient: ', email_recipient)
                for (const recipient of email_recipient) {
                    try {
                        let result_sendmail = await setSendMail_final_approve(newid,recipient.email,recipient.user_id,'urgentcase');
                        // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                    } catch (err) {
                        console.error('Error sending email:', err);
                    }
                }
            }
            res.json(updateResult)
        }).catch((err) => {
            console.log('error: ', err)
            res.json({ error: err })
        })
        
    } catch (error) {
        console.error('error: ', error);
        res.json({ error: error })
    }
})
// สร้างฟังก์ชันใหม่ด้วย arrow function
const updateVrfTransApproveStatus = async (queryParams, io) => {
    console.log('/updateVrfTransApproveStatus queryParams[0].role_id: ', queryParams[0].role_id)
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
        // ... โค้ดส่วนที่เหลือสำหรับการส่งอีเมล
        if (queryParams[0].role_id !== '8') { 
            let email_recipient = await getEmail_recipient(queryParams[0].vrf_id);
            console.log('in role not 3 and 8 email_recipient: ', email_recipient)
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_next_approver(queryParams[0].vrf_id,recipient.email,recipient.user_id,'');
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        if (queryParams[0].role_id === '8') {
            let email_recipient = await getEmail_recipient(queryParams[0].vrf_id);
            console.log('in role not 3 and 8 email_recipient: ', email_recipient)
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_final_approve(queryParams[0].vrf_id,recipient.email,recipient.user_id,'');
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
        //console.log('/set_update_urgentcase_vrf obj: ', obj)
        let obj_json = JSON.parse(obj)
        dboperations.set_update_urgentcase_vrf(obj_json).then((result) => {
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
app.get('/get_vrf_apprve_page', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    try {
        dboperations.get_vrf_apprve_page(req.query['Id'],req.query['user_id']).then((result) => {
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
app.get('/get_currentDateTime', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    try {
        dboperations.get_currentDateTime(req.query['Id']).then((result) => {
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
app.get('/get_vrf_security_det', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    try {
        dboperations.get_vrf_security_det(req.query['Id']).then((result) => {
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
app.get('/update_vrf_requester_trans_status_all', urlencodedParser, (req, res) => {
    let output = []
    let type_ = req.query['Type_']
    //---tpe_ = 'approve' หรือ 'cancel'
    try {
        console.log('req.query: ', req.query)
        req.query['Id'].forEach((item) => { 
            console.log('item: ', item)
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
                                        console.log(result[0][0].attach_file + ' ถูกลบแล้ว')
                                    });
                                }
                            });
                        }
                        if (result && result.length > 0 && result[0].length > 0 ) { 
                            // output = result[0]
                            output.push(result[0]);
                        }
                        else
                        { 
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
                console.log('รอบสุดท้าย');
                lastrow = true
            }
            else
            { 
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
                ,lastrow
                ,io
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
app.get('/update_vrf_approve_status_from_mail', urlencodedParser, async (req, res) => {
    console.log('update_vrf_approve_status_from_mail req.query[userId]:', req.query['user_id']
        , 'req.query[vrf_id]:', req.query['vrf_id']
        , 'req.query[type]:', req.query['type']
    )
    try {
        const result = await dboperations.update_vrf_approve_status_from_mail(req.query['user_id']
            , req.query['vrf_id']
            , req.query['type']
            , io
        );        
        console.log('/update_vrf_approve_status_from_mail result: ', result)
        let type_ = req.query['req_urgentcase_by'] ?  'urgentcase' : ''
        if( result[0][0].role_id_approver )
        { 
            if (result[0][0].approve_status !== 'approved')
            { 
                let role_id_approver = result[0][0].role_id_approver;
                if (role_id_approver !== '8') { 
                    let email_recipient = await getEmail_recipient(req.query['vrf_id']);
                    console.log('in role not 3 and 8 email_recipient: ', email_recipient)
                    for (const recipient of email_recipient) {
                        try {
                            let result_sendmail = await setSendMail_next_approver(req.query['vrf_id'],recipient.email
                            ,recipient.user_id
                            ,type_);
                            // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                        } catch (err) {
                            console.error('Error sending email:', err);
                        }
                    }
                }
                if (role_id_approver === '8') {
                    let email_recipient = await getEmail_recipient(req.query['vrf_id']);
                    console.log('in role not 3 and 8 email_recipient: ', email_recipient)
                    for (const recipient of email_recipient) {
                        try {
                            let result_sendmail = await setSendMail_final_approve(req.query['vrf_id'],recipient.email,recipient.user_id,type_);
                            // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                        } catch (err) {
                            console.error('Error sending email:', err);
                        }
                    }
                }

            }

            res.json(result[0])
        }
        else
        {
            res.json({error: 'error'})
        }


        
    } catch (err) {
        console.error('error: ', err);
        res.json({ error: err.message || err });
    }
});
app.get('/update_vrf_trans_approve_status', urlencodedParser, async (req, res) => {
    console.log('/update_vrf_trans_approve_status req.query[Id]:', req.query['Id']
        , 'req.query[department_id]:', req.query['department_id']
        , 'req.query[branch_id]:', req.query['branch_id']
        , 'req.query[division_id]:', req.query['division_id']
    )
    try {
        const result = await dboperations.update_vrf_trans_approve_status(req.query['Id']
        , req.query['Type_']
        , req.query['user_id']
        , req.query['role_id']
        , req.query['work_flow_id']
        , req.query['department_id']
        , req.query['branch_id']
        , req.query['division_id']
        , io
    );        
        if (req.query['role_id'] !== '8') { 
            let email_recipient = await getEmail_recipient(req.query['Id']);
            console.log('in role not 3 and 8 email_recipient: ', email_recipient)
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_next_approver(req.query['Id'],recipient.email,recipient.user_id,'');                    
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        if (req.query['role_id'] === '8') {
            let email_recipient = await getEmail_recipient(req.query['Id']);
            console.log('in role not 3 and 8 email_recipient: ', email_recipient)
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_final_approve(req.query['Id'],recipient.email,recipient.user_id,'');
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }
        }
        res.json(result[0])
        
    } catch (err) {
        console.error('error: ', err);
        res.json({ error: err.message || err });
    }
});
const getEmail_recipient = async (Id) => {
    try {
        const result = await dboperations.getEmail_recipient(Id);
        return result[0]; // คืนกลับข้อมูลที่ต้องการ
    } catch (error) {
        console.error('error: ', error);
        return { error: error.message }; // คืนกลับข้อผิดพลาด
    }
};
// const setSendMail_next_approver = async (id,email_next_approver,user_id,type_) => {
//     try {
//         let result = await dboperations.get_mail_info_next_approve(id)
//         let output = result[0]
//         console.log('setSendMail_next_approver output[0].email_next_approver: ', email_next_approver)

//         let tbDateF_;
//         let formattedtbDateF;
//         let tbDateT_;
//         let formattedtbDateT;

//         tbDateF_ = moment.tz(output[0].datefrom, 'Asia/Bangkok');
//         formattedtbDateF = tbDateF_.format('DD-MM-YYYY');
//         tbDateT_ = moment.tz(output[0].dateto, 'Asia/Bangkok');
//         formattedtbDateT = tbDateT_.format('DD-MM-YYYY');
//         let link = `${process.env.CLIENT_URL}/approvevrfpage?vrf_id=${id}&user_id=${user_id}`
//         let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC  ${ type_ ? ` (เคสด่วน)` : ``}`
//         let body = `วันที่: ${formattedtbDateF} - ${formattedtbDateT} ${type_ ? ` (เคสด่วน)` : ``}<br>
//         พื้นที่ขอเข้าพบ: ${output[0].meeting_area}<br>
//         ชื่อบริษัทผู้มาติดต่อ: ${output[0].contactor}<br>
//         เหตุผลในการเข้าพบ: ${output[0].reason}<br>
//         ผู้ร้องขอ: ${output[0].requestor}<br>
//         ตำแหน่งผู้ร้องขอ: ${output[0].position}<br>
//         ชื่อผู้นำพา: ${output[0].navigator}<br><br>
        
//         กดลิ้งค์ด้านล่างเพื่อดำเนินการ<br><br><br>
//         (<a href="${link}" target="_blank">${process.env.CLIENT_URL}</a>)`;
//         let transporter = nodemailer.createTransport({
//             host: process.env.smtp_server,
//             port: process.env.smtp_server_port,
//             secure: false,
//             auth: {
//                 user: process.env.mail_user_sender,
//                 pass: process.env.mail_pass_sender,
//             },
//             connectionTimeout: 3000000 // New timeout duration
//         });
//         let mailOptions
//         if (output[0].attach_file === '' || output[0].attach_file === null) {
//             mailOptions = {
//                 from: `VRF <${process.env.mail_user_sender}>`,
//                 to: email_next_approver,
//                 subject,
//                 html: body
//             };
//         }
//         else {
//             mailOptions = {
//                 from: `VRF <${process.env.mail_user_sender}>`,
//                 to: email_next_approver,
//                 subject,
//                 html: body, // use html instead of text
//                 attachments: [
//                     {
//                         // Path is now relative to your current directory
//                         path: `./uploads/${output[0].attach_file}`
//                     }
//                 ]
//             };
//         }
//         return new Promise((resolve, reject) => {
//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.log(error);
//                     reject(error);
//                 } else {
//                     console.log('Email sent: ' + info.response);
//                     resolve(true);
//                 }
//             });
//         });
//     }
//     catch (err) {
//         console.log('error: ', err);
//     }
// }

// const setSendMail_final_approve = async (id,email_next_approver,user_id,type_) => {
//     try {
//         let result = await dboperations.get_mail_info_final_approve(id)
//         console.log('setSendMail_final_approve result: ', result)
//         let output = result[0][0]
//         console.log('setSendMail_final_approve output: ', output)

//         console.log(' email_final_approve: ', email_next_approver)
//         let tbDateF_;
//         let formattedtbDateF;
//         let tbDateT_;
//         let formattedtbDateT;
//         tbDateF_ = moment.tz(output.datefrom, 'Asia/Bangkok');
//         formattedtbDateF = tbDateF_.format('DD-MM-YYYY');
//         tbDateT_ = moment.tz(output.dateto, 'Asia/Bangkok');
//         formattedtbDateT = tbDateT_.format('DD-MM-YYYY');

//         let link = `${process.env.CLIENT_URL}/requestvrflst?vrf_id=${id}&user_id=${user_id}`
//         let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC อนุมัติแล้ว ${ type_ ? ` (เคสด่วน)` : ``}`
//         let body = `วันที่: ${formattedtbDateF} - ${formattedtbDateT} ${ type_ ? ` (เคสด่วน)` : ``}<br>
//         พื้นที่ขอเข้าพบ: ${output.meeting_area}<br>
//         ชื่อบริษัทผู้มาติดต่อ: ${output.contactor}<br>
//         เหตุผลในการเข้าพบ: ${output.reason}<br>
//         ผู้ร้องขอ: ${output.requestor}<br>
//         ตำแหน่งผู้ร้องขอ: ${output.position}<br>
//         ชื่อผู้นำพา: ${output.navigator}<br>`;
//         let transporter = nodemailer.createTransport({
//             host: process.env.smtp_server,
//             port: process.env.smtp_server_port,
//             secure: false,
//             auth: {
//                 user: process.env.mail_user_sender,
//                 pass: process.env.mail_pass_sender,
//             },
//             connectionTimeout: 3000000 // New timeout duration
//         });
//         let mailOptions
//         if (output.attach_file === '' || output.attach_file === null) {
//             mailOptions = {
//                 from: `VRF <${process.env.mail_user_sender}>`,
//                 to: email_next_approver,
//                 subject,
//                 html: body
//             };
//         }
//         else {
//             mailOptions = {
//                 from: `VRF <${process.env.mail_user_sender}>`,
//                 to: email_next_approver,
//                 subject,
//                 html: body, // use html instead of text
//                 attachments: [
//                     {
//                         // Path is now relative to your current directory
//                         path: `./uploads/${output.attach_file}`
//                     }
//                 ]
//             };
//         }
//         return new Promise((resolve, reject) => {
//             transporter.sendMail(mailOptions, function (error, info) {
//                 if (error) {
//                     console.log(error);
//                     reject(error);
//                 } else {
//                     console.log('Email sent: ' + info.response);
//                     resolve(true);
//                 }
//             });
//         });

//     }
//     catch (err) {
//         console.log('error: ', err);
//     }
// }
const setSendMail_next_approver = async (id, email_next_approver, user_id, type_) => {
    try {
        let result = await dboperations.get_mail_info_next_approve(id);
        let output = result[0];
        console.log('setSendMail_next_approver output[0].email_next_approver: ', email_next_approver);

        let tbDateF_, formattedtbDateF, tbDateT_, formattedtbDateT;

        // สร้าง moment object จาก UTC โดยตรงโดยไม่ใช้เวลา
        tbDateF_ = moment.utc(output[0].datefrom).startOf('day').tz('Asia/Bangkok');
        formattedtbDateF = tbDateF_.format('DD-MM-YYYY');

        tbDateT_ = moment.utc(output[0].dateto).startOf('day').tz('Asia/Bangkok');
        formattedtbDateT = tbDateT_.format('DD-MM-YYYY');

        let link = `${process.env.CLIENT_URL}/approvevrfpage?vrf_id=${id}&user_id=${user_id}`;
        let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC ${type_ ? ` (เคสด่วน)` : ``}`;
        let body = `วันที่: ${formattedtbDateF} - ${formattedtbDateT} ${type_ ? ` (เคสด่วน)` : ``}<br>
        พื้นที่ขอเข้าพบ: ${output[0].meeting_area}<br>
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
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        });
    } catch (err) {
        console.log('error: ', err);
    }
};
const setSendMail_final_approve = async (id, email_next_approver, user_id, type_) => {
    try {
        let result = await dboperations.get_mail_info_final_approve(id);
        console.log('setSendMail_final_approve result: ', result);
        let output = result[0][0];
        console.log('setSendMail_final_approve output: ', output);

        let tbDateF_, formattedtbDateF, tbDateT_, formattedtbDateT;

        // ใช้ startOf('day') เพื่อตั้งเวลาเริ่มต้นของวันก่อนแปลงเขตเวลา
        tbDateF_ = moment.utc(output.datefrom).startOf('day').tz('Asia/Bangkok');
        formattedtbDateF = tbDateF_.format('DD-MM-YYYY');

        tbDateT_ = moment.utc(output.dateto).startOf('day').tz('Asia/Bangkok');
        formattedtbDateT = tbDateT_.format('DD-MM-YYYY');

        let link = `${process.env.CLIENT_URL}/requestvrflst?vrf_id=${id}&user_id=${user_id}`;
        let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC อนุมัติแล้ว ${type_ ? ` (เคสด่วน)` : ``}`;
        let body = `วันที่: ${formattedtbDateF} - ${formattedtbDateT} ${type_ ? ` (เคสด่วน)` : ``}<br>
        พื้นที่ขอเข้าพบ: ${output.meeting_area}<br>
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
                    console.log(error);
                    reject(error);
                } else {
                    console.log('Email sent: ' + info.response);
                    resolve(true);
                }
            });
        });

    } catch (err) {
        console.log('error: ', err);
    }
};
app.get('/setSendMail_next_approver', urlencodedParser, async (req, res) => {
    console.log('/setSendMail_next_approver req.query[Id]:', req.query['Id']
        , 'req.query[department_id]:', req.query['department_id']
        , 'req.query[branch_id]:', req.query['branch_id']
        , 'req.query[role_id]:', req.query['role_id']
        , 'req.query[division_id]:', req.query['division_id']
    )
    try {
        let result_sendmail
        if ((req.query['role_id'] !== '3') && (req.query['role_id'] !== '8')) { 

            let email_recipient = await getEmail_recipient(req.query['Id']);
            console.log('in role not 3 and 8 email_recipient: ', email_recipient)
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_next_approver(req.query['Id'],recipient.email,recipient.user_id,'');                    
                } catch (err) {
                    console.error('Error sending email:', err);
                }
            }           
        }
        if (req.query['role_id'] === '8') {
            let email_recipient = await getEmail_recipient(req.query['Id']);
            console.log('in role not 3 and 8 email_recipient: ', email_recipient)
            for (const recipient of email_recipient) {
                try {
                    let result_sendmail = await setSendMail_final_approve(req.query['Id'],recipient.email,recipient.user_id,'');
                    // ทำอะไรก็ตามที่ต้องการกับ result_sendmail
                } catch (err) {
                    console.error('Error sending email:', err);
                }
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
    console.log('req.query[Id] ',req.query['Id']
    ,'req.query[Type_] ',req.query['Type_']
    ,'req.query[user_id] ',req.query['user_id']
    ,'req.query[checkincheckout_det_id] ',req.query['checkincheckout_det_id'])
    try {
        dboperations.set_update_vrf_det_cancelcheckinout(req.query['Id']
            , req.query['Type_']
            , req.query['user_id']
            , req.query['checkincheckout_det_id']
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
            console.log('error: ', err)
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
server.listen(process.env.PORT, () => {
    console.log(`Server running on https://localhost:${process.env.PORT}`);
});


