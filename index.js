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
var bodyParser = require('body-parser');
const nodemailer = require("nodemailer");
require('dotenv').config()
app.use(cors())
// const ldap = require('ldapjs');
const setordernumber = (value) => {
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
    //return `${day}${month}${year}${hours}${minutes}${seconds}${milliseconds}`

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
const checkvalue = (value_, type_) => {
    let returnValue
    if (type_ === 'float') {
        if ((value_ === '') || (value_ === null)) {
            returnValue = 0.00
        }
        else {
            returnValue = value_
        }
    }
    if (type_ === 'string') {
        if ((value_ === '') || (value_ === null)) {
            returnValue = ''
        }
        else {
            returnValue = value_ + ''
        }
    }
    return returnValue
}
const upload_add_order = (gfccp_order, type_) => {
    const pool = new sql.ConnectionPool(config);
    console.log('gfccp_order.ordernumber: ', gfccp_order.ordernumber)
    let recordsets_
    if (type_ === 'Deposit') {
        // Connect to the database and execute the stored procedure
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            // Add the input parameters to the request object
            request.input('branchorigin_code', sql.NVarChar, gfccp_order.branchorigin_code)
            request.input('branchorigin_name', sql.NVarChar, gfccp_order.branchorigin_name)
            request.input('branchdest_code', sql.NVarChar, gfccp_order.branchdest_code)
            request.input('branchdest_name', sql.NVarChar, gfccp_order.branchdest_name)
            request.input('note_uncount_1000', sql.Float, gfccp_order.note_uncount_1000)
            request.input('note_uncount_500', sql.Float, gfccp_order.note_uncount_500)
            request.input('note_uncount_100', sql.Float, gfccp_order.note_uncount_100)
            request.input('note_uncount_50', sql.Float, gfccp_order.note_uncount_50)
            request.input('note_uncount_20', sql.Float, gfccp_order.note_uncount_20)
            request.input('note_uncount_10', sql.Float, gfccp_order.note_uncount_10)
            request.input('unit_note_uncount_1000', sql.NVarChar, gfccp_order.unit_note_uncount_1000)
            request.input('unit_note_uncount_500', sql.NVarChar, gfccp_order.unit_note_uncount_500)
            request.input('unit_note_uncount_100', sql.NVarChar, gfccp_order.unit_note_uncount_100)
            request.input('unit_note_uncount_50', sql.NVarChar, gfccp_order.unit_note_uncount_50)
            request.input('unit_note_uncount_20', sql.NVarChar, gfccp_order.unit_note_uncount_20)
            request.input('unit_note_uncount_10', sql.NVarChar, gfccp_order.unit_note_uncount_10)
            request.input('pcs_note_uncount_1000', sql.Float, gfccp_order.pcs_note_uncount_1000)
            request.input('pcs_note_uncount_500', sql.Float, gfccp_order.pcs_note_uncount_500)
            request.input('pcs_note_uncount_100', sql.Float, gfccp_order.pcs_note_uncount_100)
            request.input('pcs_note_uncount_50', sql.Float, gfccp_order.pcs_note_uncount_50)
            request.input('pcs_note_uncount_20', sql.Float, gfccp_order.pcs_note_uncount_20)
            request.input('pcs_note_uncount_10', sql.Float, gfccp_order.pcs_note_uncount_10)
            request.input('coin_fit_10', sql.Float, gfccp_order.coin_fit_10)
            request.input('coin_fit_5', sql.Float, gfccp_order.coin_fit_5)
            request.input('coin_fit_2', sql.Float, gfccp_order.coin_fit_2)
            request.input('coin_fit_1', sql.Float, gfccp_order.coin_fit_1)
            request.input('coin_fit_05', sql.Float, gfccp_order.coin_fit_05)
            request.input('coin_fit_025', sql.Float, gfccp_order.coin_fit_025)
            request.input('unit_coin_fit_10', sql.NVarChar, gfccp_order.unit_coin_fit_10)
            request.input('unit_coin_fit_5', sql.NVarChar, gfccp_order.unit_coin_fit_5)
            request.input('unit_coin_fit_2', sql.NVarChar, gfccp_order.unit_coin_fit_2)
            request.input('unit_coin_fit_1', sql.NVarChar, gfccp_order.unit_coin_fit_1)
            request.input('unit_coin_fit_05', sql.NVarChar, gfccp_order.unit_coin_fit_05)

            request.input('unit_coin_fit_025', sql.NVarChar, gfccp_order.unit_coin_fit_025)

            request.input('pcs_coin_fit_10', sql.Float, gfccp_order.pcs_coin_fit_10)
            request.input('pcs_coin_fit_5', sql.Float, gfccp_order.pcs_coin_fit_5)
            request.input('pcs_coin_fit_2', sql.Float, gfccp_order.pcs_coin_fit_2)
            request.input('pcs_coin_fit_1', sql.Float, gfccp_order.pcs_coin_fit_1)
            request.input('pcs_coin_fit_05', sql.Float, gfccp_order.pcs_coin_fit_05)
            request.input('pcs_coin_fit_025', sql.Float, gfccp_order.pcs_coin_fit_025)

            request.input('total_by_branch', sql.Float, gfccp_order.total_by_branch)
            request.input('remark', sql.NVarChar, gfccp_order.remark)
            request.input('order_date', sql.DateTime, gfccp_order.order_date)
            request.input('order_category', sql.NVarChar, gfccp_order.order_category)
            request.input('servicetype', sql.NVarChar, gfccp_order.servicetype)
            request.input('customer_no', sql.NVarChar, gfccp_order.customer_no)
            request.input('customerID', sql.NVarChar, gfccp_order.customerID)
            request.input('row_type', sql.NVarChar, gfccp_order.row_type)
            request.input('attach_file', sql.NVarChar, gfccp_order.attach_file)
            request.input('attach_file_origin', sql.NVarChar, gfccp_order.attach_file_origin)
            request.input('roleid', sql.Int, gfccp_order.roleid)
            request.input('approve_setting_id', sql.Int, gfccp_order.approve_setting_id)
            request.input('approve_setting_version', sql.Int, gfccp_order.approve_setting_version)
            request.input('createby', sql.NVarChar, gfccp_order.createby)
            request.input('ordernumber', sql.VarChar, gfccp_order.ordernumber)
            request.input('ordernumber_running', sql.Int, gfccp_order.ordernumber_running)
            // Execute the stored procedure
            // setTimeout(() => {
            request.execute('spUpload_add_order_deposit').then(result => {
                // console.log('Stored procedure executed successfully.');
                // console.log(result);
                recordsets_ = request.recordsets;
                pool.close();
            }).catch(err => {
                console.error(err);
                pool.close();
            });
            // }, 10000);

        }).catch(err => {
            console.error(err);
        });
    }
    else if (type_ === 'Withdraw') {
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            // Add the input parameters to the request object
            request.input('branchorigin_code', sql.NVarChar, gfccp_order.branchorigin_code)
            request.input('branchorigin_name', sql.NVarChar, gfccp_order.branchorigin_name)
            request.input('branchdest_code', sql.NVarChar, gfccp_order.branchdest_code)
            request.input('branchdest_name', sql.NVarChar, gfccp_order.branchdest_name)

            request.input('note_new_1000', sql.Float, gfccp_order.note_new_1000)
            request.input('note_fit_1000', sql.Float, gfccp_order.note_fit_1000)
            request.input('note_new_500', sql.Float, gfccp_order.note_new_500)
            request.input('note_fit_500', sql.Float, gfccp_order.note_fit_500)
            request.input('note_new_100', sql.Float, gfccp_order.note_new_100)
            request.input('note_fit_100', sql.Float, gfccp_order.note_fit_100)
            request.input('note_new_50', sql.Float, gfccp_order.note_new_50)
            request.input('note_fit_50', sql.Float, gfccp_order.note_fit_50)
            request.input('note_new_20', sql.Float, gfccp_order.note_new_20)
            request.input('note_fit_20', sql.Float, gfccp_order.note_fit_20)
            request.input('note_new_10', sql.Float, gfccp_order.note_new_10)
            request.input('note_fit_10', sql.Float, gfccp_order.note_fit_10)

            request.input('pcs_note_new_1000', sql.Float, gfccp_order.pcs_note_new_1000)
            request.input('pcs_note_fit_1000', sql.Float, gfccp_order.pcs_note_fit_1000)
            request.input('pcs_note_new_500', sql.Float, gfccp_order.pcs_note_new_500)
            request.input('pcs_note_fit_500', sql.Float, gfccp_order.pcs_note_fit_500)
            request.input('pcs_note_new_100', sql.Float, gfccp_order.pcs_note_new_100)
            request.input('pcs_note_fit_100', sql.Float, gfccp_order.pcs_note_fit_100)
            request.input('pcs_note_new_50', sql.Float, gfccp_order.pcs_note_new_50)
            request.input('pcs_note_fit_50', sql.Float, gfccp_order.pcs_note_fit_50)
            request.input('pcs_note_new_20', sql.Float, gfccp_order.pcs_note_new_20)
            request.input('pcs_note_fit_20', sql.Float, gfccp_order.pcs_note_fit_20)
            request.input('pcs_note_new_10', sql.Float, gfccp_order.pcs_note_new_10)
            request.input('pcs_note_fit_10', sql.Float, gfccp_order.pcs_note_fit_10)

            request.input('unit_note_new_1000', sql.NVarChar, gfccp_order.unit_note_new_1000)
            request.input('unit_note_fit_1000', sql.NVarChar, gfccp_order.unit_note_fit_1000)
            request.input('unit_note_new_500', sql.NVarChar, gfccp_order.unit_note_new_500)
            request.input('unit_note_fit_500', sql.NVarChar, gfccp_order.unit_note_fit_500)
            request.input('unit_note_new_100', sql.NVarChar, gfccp_order.unit_note_new_100)
            request.input('unit_note_fit_100', sql.NVarChar, gfccp_order.unit_note_fit_100)
            request.input('unit_note_new_50', sql.NVarChar, gfccp_order.unit_note_new_50)
            request.input('unit_note_fit_50', sql.NVarChar, gfccp_order.unit_note_fit_50)
            request.input('unit_note_new_20', sql.NVarChar, gfccp_order.unit_note_new_20)
            request.input('unit_note_fit_20', sql.NVarChar, gfccp_order.unit_note_fit_20)
            request.input('unit_note_new_10', sql.NVarChar, gfccp_order.unit_note_new_10)
            request.input('unit_note_fit_10', sql.NVarChar, gfccp_order.unit_note_fit_10)

            request.input('coin_fit_10', sql.Float, gfccp_order.coin_fit_10)
            request.input('coin_fit_5', sql.Float, gfccp_order.coin_fit_5)
            request.input('coin_fit_2', sql.Float, gfccp_order.coin_fit_2)
            request.input('coin_fit_1', sql.Float, gfccp_order.coin_fit_1)
            request.input('coin_fit_05', sql.Float, gfccp_order.coin_fit_05)
            request.input('coin_fit_025', sql.Float, gfccp_order.coin_fit_025)

            request.input('unit_coin_fit_10', sql.NVarChar, gfccp_order.unit_coin_fit_10)
            request.input('unit_coin_fit_5', sql.NVarChar, gfccp_order.unit_coin_fit_5)
            request.input('unit_coin_fit_2', sql.NVarChar, gfccp_order.unit_coin_fit_2)
            request.input('unit_coin_fit_1', sql.NVarChar, gfccp_order.unit_coin_fit_1)
            request.input('unit_coin_fit_05', sql.NVarChar, gfccp_order.unit_coin_fit_05)
            request.input('unit_coin_fit_025', sql.NVarChar, gfccp_order.unit_coin_fit_025)

            request.input('pcs_coin_fit_10', sql.Float, gfccp_order.pcs_coin_fit_10)
            request.input('pcs_coin_fit_5', sql.Float, gfccp_order.pcs_coin_fit_5)
            request.input('pcs_coin_fit_2', sql.Float, gfccp_order.pcs_coin_fit_2)
            request.input('pcs_coin_fit_1', sql.Float, gfccp_order.pcs_coin_fit_1)
            request.input('pcs_coin_fit_05', sql.Float, gfccp_order.pcs_coin_fit_05)
            request.input('pcs_coin_fit_025', sql.Float, gfccp_order.pcs_coin_fit_025)

            request.input('total_by_branch', sql.Float, gfccp_order.total_by_branch)
            request.input('remark', sql.NVarChar, gfccp_order.remark)
            request.input('order_date', sql.DateTime, gfccp_order.order_date)
            request.input('order_category', sql.NVarChar, gfccp_order.order_category)
            request.input('servicetype', sql.NVarChar, gfccp_order.servicetype)
            request.input('customer_no', sql.NVarChar, gfccp_order.customer_no)
            request.input('customerID', sql.NVarChar, gfccp_order.customerID)
            request.input('row_type', sql.NVarChar, gfccp_order.row_type)
            request.input('attach_file', sql.NVarChar, gfccp_order.attach_file)
            request.input('attach_file_origin', sql.NVarChar, gfccp_order.attach_file_origin)
            request.input('roleid', sql.Int, gfccp_order.roleid)
            request.input('approve_setting_id', sql.Int, gfccp_order.approve_setting_id)
            request.input('approve_setting_version', sql.Int, gfccp_order.approve_setting_version)
            request.input('createby', sql.NVarChar, gfccp_order.createby)
            request.input('ordernumber', sql.VarChar, gfccp_order.ordernumber)
            request.input('ordernumber_running', sql.Int, gfccp_order.ordernumber_running)
            // Execute the stored procedure
            // setTimeout(() => {
            request.execute('spUpload_add_order_withdraw').then(result => {
                // console.log('Stored procedure executed successfully.');
                // console.log(result);
                recordsets_ = request.recordsets;
                pool.close();
            }).catch(err => {
                console.error(err);
                pool.close();
            });
            // }, 10000);

        }).catch(err => {
            console.error(err);
        });
    }
    return recordsets_
}
const checkcustomer = (value_) => {
    if (value_ === '2c164463-ef08-4cb6-a200-08e70aece9ae') {
        return 'GSB'
    } else if (value_ === '38bfc1b0-e86e-48b8-9a28-afbeb01770ef') {
        return 'UOB'
    } else if (value_ === 'ea0087c9-4172-4c03-92c5-4cc0cd9ac62d') {
        return 'CIMB'
    }
}
const check_pcs = (value_, type_) => {
    let returnValue
    if (type_ === '1000') {
        // console.log( 'value_: ',value_ )
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 1000 : 0.00
    }
    if (type_ === '500') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 500 : 0.00
    }
    if (type_ === '100') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 100 : 0.00
    }
    if (type_ === '50') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 50 : 0.00
    }
    if (type_ === '20') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 20 : 0.00
    }
    if (type_ === '10') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 10 : 0.00
    }
    if (type_ === '5') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 5 : 0.00
    }
    if (type_ === '2') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 2 : 0.00
    }
    if (type_ === '1') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 1 : 0.00
    }
    if (type_ === '0.50') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 0.5 : 0.00
    }
    if (type_ === '0.25') {
        returnValue = (value_ !== '') && (value_ !== null) ? parseFloat(value_.toString().replaceAll(',', ''), 10) / 1000 / 0.25 : 0.00
    }
    return returnValue
}
app.post('/set_manual_add_vrf_trans', upload.single('file'), (req, res) => {
    console.log('set_manual_add_vrf_trans req.body: ', req.body)
    console.log('req.file : ', req.file)
    let file_originalname_ = req.file === undefined ? '' : req.file.originalname
    let filename_ = req.file === undefined ? '' : req.file.filename
    let data_ = req.body
    // let obj = null
    // for (let x in data_) {
    //     obj = x
    // }
    console.log('file: ', req.file)
    console.log('req.file.originalname: ', file_originalname_)
    console.log('req.body.reason: ', req.body.reason)
    // let obj_json = JSON.parse(obj)
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
        createby: req.body.user_id
    }
    dboperations.set_manual_add_vrf_trans(data).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result)
        }
    })
})
//i want to check filename compare req.body.attach_file_primitive before upload

app.post('/set_manual_update_vrf_trans', upload.single('file'), (req, res) => {
    // console.log(req.file)    
    let originalname = req.file !== undefined ? req.file.originalname : ''
    let filename_ = req.file !== undefined ? req.file.filename : ''
    let old_file = (req.body.attach_file_primitive !== undefined) && (req.body.attach_file_primitive !== '') ? req.body.attach_file_primitive : ''
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
        createby: req.body.user_id
    }
    //console.log('data: ', data)
    dboperations.set_manual_update_vrf_trans(data).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            if (old_file !== '') {
                // ใช้ fs.stat
                fs.stat('./uploads/' + req.body.attach_file_primitive, (err, stats) => {
                    if (err) {
                        console.log(`ไม่พบไฟล์: ${req.body.attach_file_primitive}`);
                    } else {
                        fs.unlink('./uploads/' + req.body.attach_file_primitive, (err) => {
                            if (err) throw err;
                            console.log(req.body.attach_file_primitive + ' ถูกลบแล้ว');
                        });
                    }
                });
            }
            res.json(result[0])
        }
    })
})
app.post('/upload', upload.single('file'), (req, res) => {
    res.json({
        file: req.file,
        OrderCategory: req.body.OrderCategory,
        OrderType: req.body.OrderType,
        BankType: req.body.BankType,
        JobDate: req.body.JobDate
    })
    console.log(req.body.OrderType)//1=Withdraw; 2=Deposit
    const date_ = req.body.JobDate
    console.log('req.body.JobDate: ', req.body.JobDate)
    console.log('file: ', req.file)
    console.log('req.file.originalname: ', req.file.originalname)
    console.log('OrderCategory: ', req.body.OrderCategory)
    console.log('OrderType: ', req.body.OrderType)
    console.log('BankType: ', req.body.BankType)
    console.log('JobDate: ', req.body.JobDate)
    // console.log('JobDate: ', date_)
    const OrderCategory_ = req.body.OrderCategory
    const servicetype_ = req.body.OrderType
    const customer_no_ = req.body.BankType
    const gfc_cct = req.body.gfc_cct
    const gfc_cct_code = req.body.gfc_cct_code
    const user_id = req.body.user_id
    let CustomerID = req.body.CustomerID
    let attach_file_origin = req.file.originalname
    let roleid = req.body.roleid
    let data_ = {}
    let NULL_ = null
    // let rows_ = 0
    xlsxFile('./uploads/' + fileName).then((rows) => {
        // console.log('----------------rows.length: ',rows.length)
        // rows_ = rows.length
        // for (i in rows) {
        for (i in rows) {
            // setTimeout(() => { 
            if (i >= 2) {
                // if (rows[i][2] === '**คอลั่มน์ที่ซ่อนไว้ไม่สามารถลบออกได้') { break }
                if (rows[i][3] !== 'ยอดรวม') {
                    if ((rows[i][3] !== null) && (rows[i][3] !== 'จำนวนมัด')) {
                        if (servicetype_ === 'Deposit') {
                            //console.log('servicetype_ === Deposit', rows[i][4] !== '' && rows[i][4] !== null ? check_pcs( rows[i][4],'1000' ) : null )
                            // dboperations.upload_add_order(data_, 'Deposit').then((result, err) => {
                            //     if (err) {
                            //         console.log('error: ', err)
                            //         res.json({ error: err })
                            //     }
                            //     else {
                            //         // console.log(result)
                            //     }
                            // })
                            data_ = null
                            // let setordernumber_ = ''
                            let setordernumber_ = setordernumber(i)
                            // console.log('setordernumber_: ',setordernumber_)
                            // setTimeout(() => { 
                            data_ = {
                                'branchorigin_code': rows[i][2],
                                'branchorigin_name': rows[i][3],
                                'branchdest_code': gfc_cct_code,
                                'branchdest_name': gfc_cct,
                                'note_uncount_1000': rows[i][4],
                                'note_uncount_500': rows[i][5],
                                'note_uncount_100': rows[i][6],
                                'note_uncount_50': rows[i][7],
                                'note_uncount_20': rows[i][8],
                                'note_uncount_10': rows[i][9],

                                'unit_note_uncount_1000': rows[i][4] !== '' && rows[i][4] !== null ? 'Bundle' : '',
                                'unit_note_uncount_500': rows[i][5] !== '' && rows[i][5] !== null ? 'Bundle' : '',
                                'unit_note_uncount_100': rows[i][6] !== '' && rows[i][6] !== null ? 'Bundle' : '',
                                'unit_note_uncount_50': rows[i][7] !== '' && rows[i][7] !== null ? 'Bundle' : '',
                                'unit_note_uncount_20': rows[i][8] !== '' && rows[i][8] !== null ? 'Bundle' : '',
                                'unit_note_uncount_10': rows[i][9] !== '' && rows[i][9] !== null ? 'Bundle' : '',

                                'pcs_note_uncount_1000': rows[i][4] !== '' && rows[i][4] !== null ? check_pcs(rows[i][4], '1000') : 0,
                                'pcs_note_uncount_500': rows[i][5] !== '' && rows[i][5] !== null ? check_pcs(rows[i][5], '500') : 0,//rows[i][5],
                                'pcs_note_uncount_100': rows[i][6] !== '' && rows[i][6] !== null ? check_pcs(rows[i][6], '100') : 0,//rows[i][6],
                                'pcs_note_uncount_50': rows[i][7] !== '' && rows[i][7] !== null ? check_pcs(rows[i][7], '50') : 0,//rows[i][7],
                                'pcs_note_uncount_20': rows[i][8] !== '' && rows[i][8] !== null ? check_pcs(rows[i][8], '20') : 0,//rows[i][8],
                                'pcs_note_uncount_10': rows[i][9] !== '' && rows[i][9] !== null ? check_pcs(rows[i][9], '10') : 0,//rows[i][9],

                                'coin_fit_10': rows[i][10],
                                'coin_fit_5': checkvalue(rows[i][11], 'float'),
                                'coin_fit_2': rows[i][12],
                                'coin_fit_1': rows[i][13],
                                'coin_fit_05': rows[i][14],
                                'coin_fit_025': rows[i][15],

                                'unit_coin_fit_10': rows[i][10] !== '' && rows[i][10] !== null ? 'Bundle' : '',
                                'unit_coin_fit_5': rows[i][11] !== '' && rows[i][11] !== null ? 'Bundle' : '',
                                'unit_coin_fit_2': rows[i][12] !== '' && rows[i][12] !== null ? 'Bundle' : '',
                                'unit_coin_fit_1': rows[i][13] !== '' && rows[i][13] !== null ? 'Bundle' : '',
                                'unit_coin_fit_05': rows[i][14] !== '' && rows[i][14] !== null ? 'Bundle' : '',
                                'unit_coin_fit_025': rows[i][15] !== '' && rows[i][15] !== null ? 'Bundle' : '',

                                'pcs_coin_fit_10': rows[i][10] !== '' && rows[i][10] !== null ? check_pcs(rows[i][10], '10') : 0, //rows[i][10],
                                'pcs_coin_fit_5': rows[i][11] !== '' && rows[i][11] !== null ? check_pcs(rows[i][11], '5') : 0,//checkvalue(rows[i][11], 'float'),
                                'pcs_coin_fit_2': rows[i][12] !== '' && rows[i][12] !== null ? check_pcs(rows[i][12], '2') : 0,//rows[i][12],
                                'pcs_coin_fit_1': rows[i][13] !== '' && rows[i][13] !== null ? check_pcs(rows[i][13], '1') : 0,//rows[i][13],
                                'pcs_coin_fit_05': rows[i][14] !== '' && rows[i][14] !== null ? check_pcs(rows[i][14], '0.50') : 0,//rows[i][14],
                                'pcs_coin_fit_025': rows[i][15] !== '' && rows[i][15] !== null ? check_pcs(rows[i][15], '0.25') : 0,//rows[i][15],
                                'total_by_branch': rows[i][16],
                                'remark': checkvalue(rows[i][17], 'string') !== undefined ? checkvalue(rows[i][17], 'string') : NULL_,// gfccp_order["refno"] !== undefined ? gfccp_order["refno"] : NULL_
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'customerID': CustomerID,
                                'row_type': 'normal',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'roleid': roleid,
                                'approve_setting_id': req.body.approve_setting_id,
                                'approve_setting_version': req.body.approve_setting_version,
                                'createby': user_id,
                                'ordernumber': setordernumber_,
                                'ordernumber_running': (i - 1),
                            }
                            //console.log( 'if ((rows[i][3] !== null) && (rows[i][3] !== จำนวนมัด)) {if (servicetype_ === Deposit' ) 
                            // console.log('in setimeout data_: ', data_)
                            let output_ = upload_add_order(data_, 'Deposit')
                            //  }, 1000);      
                            //console.log('data_: ', data_) 
                            //console.log('servicetype_: ', servicetype_)
                        }
                        if (servicetype_ === 'Withdraw') {
                            // dboperations.upload_add_order(data_, 'Withdraw').then((result, err) => {
                            //     if (err) {
                            //         console.log('error: ', err)
                            //         res.json({ error: err })
                            //     }
                            //     else {
                            //         // console.log(result)
                            //     }
                            // })
                            // setTimeout(() => { 
                            data_ = null
                            // let setordernumber_ = ''
                            let setordernumber_ = setordernumber(i)
                            data_ = {
                                'branchorigin_code': gfc_cct_code,
                                'branchorigin_name': gfc_cct,
                                'branchdest_code': rows[i][2],
                                'branchdest_name': rows[i][3],

                                'note_new_1000': rows[i][4],
                                'note_fit_1000': rows[i][5],
                                'note_new_500': rows[i][6],
                                'note_fit_500': rows[i][7],
                                'note_new_100': rows[i][8],
                                'note_fit_100': rows[i][9],
                                'note_new_50': rows[i][10],
                                'note_fit_50': rows[i][11],
                                'note_new_20': rows[i][12],
                                'note_fit_20': rows[i][13],
                                'note_new_10': rows[i][14],
                                'note_fit_10': rows[i][15],

                                'pcs_note_new_1000': rows[i][4] !== '' && rows[i][4] !== null ? check_pcs(rows[i][4], '1000') : 0,//rows[i][4],
                                'pcs_note_fit_1000': rows[i][5] !== '' && rows[i][5] !== null ? check_pcs(rows[i][5], '1000') : 0,//rows[i][5],
                                'pcs_note_new_500': rows[i][6] !== '' && rows[i][6] !== null ? check_pcs(rows[i][6], '500') : 0,//rows[i][6],
                                'pcs_note_fit_500': rows[i][7] !== '' && rows[i][7] !== null ? check_pcs(rows[i][7], '500') : 0,//rows[i][7],
                                'pcs_note_new_100': rows[i][8] !== '' && rows[i][8] !== null ? check_pcs(rows[i][8], '100') : 0,//rows[i][8],
                                'pcs_note_fit_100': rows[i][9] !== '' && rows[i][9] !== null ? check_pcs(rows[i][9], '100') : 0,//rows[i][9],
                                'pcs_note_new_50': rows[i][10] !== '' && rows[i][10] !== null ? check_pcs(rows[i][10], '50') : 0,//rows[i][10],
                                'pcs_note_fit_50': rows[i][11] !== '' && rows[i][11] !== null ? check_pcs(rows[i][11], '50') : 0,//rows[i][11],
                                'pcs_note_new_20': rows[i][12] !== '' && rows[i][12] !== null ? check_pcs(rows[i][12], '20') : 0,//rows[i][12],
                                'pcs_note_fit_20': rows[i][13] !== '' && rows[i][13] !== null ? check_pcs(rows[i][13], '20') : 0,//rows[i][13],
                                'pcs_note_new_10': rows[i][14] !== '' && rows[i][14] !== null ? check_pcs(rows[i][14], '10') : 0,//rows[i][14],
                                'pcs_note_fit_10': rows[i][15] !== '' && rows[i][15] !== null ? check_pcs(rows[i][15], '10') : 0,//rows[i][15],                                

                                'unit_note_new_1000': rows[i][4] !== '' && rows[i][4] !== null ? 'Bundle' : '',
                                'unit_note_fit_1000': rows[i][5] !== '' && rows[i][5] !== null ? 'Bundle' : '',
                                'unit_note_new_500': rows[i][6] !== '' && rows[i][6] !== null ? 'Bundle' : '',
                                'unit_note_fit_500': rows[i][7] !== '' && rows[i][7] !== null ? 'Bundle' : '',
                                'unit_note_new_100': rows[i][8] !== '' && rows[i][8] !== null ? 'Bundle' : '',
                                'unit_note_fit_100': rows[i][9] !== '' && rows[i][9] !== null ? 'Bundle' : '',
                                'unit_note_new_50': rows[i][10] !== '' && rows[i][10] !== null ? 'Bundle' : '',
                                'unit_note_fit_50': rows[i][11] !== '' && rows[i][11] !== null ? 'Bundle' : '',
                                'unit_note_new_20': rows[i][12] !== '' && rows[i][12] !== null ? 'Bundle' : '',
                                'unit_note_fit_20': rows[i][13] !== '' && rows[i][13] !== null ? 'Bundle' : '',
                                'unit_note_new_10': rows[i][14] !== '' && rows[i][14] !== null ? 'Bundle' : '',
                                'unit_note_fit_10': rows[i][15] !== '' && rows[i][15] !== null ? 'Bundle' : '',

                                'coin_fit_10': rows[i][16],
                                'coin_fit_5': rows[i][17],
                                'coin_fit_2': rows[i][18],
                                'coin_fit_1': rows[i][19],
                                'coin_fit_05': rows[i][20],
                                'coin_fit_025': rows[i][21],

                                'pcs_coin_fit_10': rows[i][16] !== '' && rows[i][16] !== null ? check_pcs(rows[i][16], '10') : 0, //rows[i][16],
                                'pcs_coin_fit_5': rows[i][17] !== '' && rows[i][17] !== null ? check_pcs(rows[i][17], '5') : 0,//checkvalue(rows[i][17], 'float'),
                                'pcs_coin_fit_2': rows[i][18] !== '' && rows[i][18] !== null ? check_pcs(rows[i][18], '2') : 0,//rows[i][18],
                                'pcs_coin_fit_1': rows[i][19] !== '' && rows[i][19] !== null ? check_pcs(rows[i][19], '1') : 0,//rows[i][19],
                                'pcs_coin_fit_05': rows[i][20] !== '' && rows[i][20] !== null ? check_pcs(rows[i][20], '0.50') : 0,//rows[i][20],
                                'pcs_coin_fit_025': rows[i][21] !== '' && rows[i][21] !== null ? check_pcs(rows[i][21], '0.25') : 0,//rows[i][21],

                                'unit_coin_fit_10': rows[i][16] !== '' && rows[i][16] !== null ? 'Bundle' : '',
                                'unit_coin_fit_5': rows[i][17] !== '' && rows[i][17] !== null ? 'Bundle' : '',
                                'unit_coin_fit_2': rows[i][18] !== '' && rows[i][18] !== null ? 'Bundle' : '',
                                'unit_coin_fit_1': rows[i][19] !== '' && rows[i][19] !== null ? 'Bundle' : '',
                                'unit_coin_fit_05': rows[i][20] !== '' && rows[i][20] !== null ? 'Bundle' : '',
                                'unit_coin_fit_025': rows[i][21] !== '' && rows[i][21] !== null ? 'Bundle' : '',

                                'total_by_branch': rows[i][22],
                                // 'remark': checkvalue(rows[i][23], 'string'),
                                'remark': checkvalue(rows[i][23], 'string') !== undefined ? checkvalue(rows[i][23], 'string') : NULL_,
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'customerID': CustomerID,
                                'row_type': 'normal',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'roleid': roleid,
                                'approve_setting_id': req.body.approve_setting_id,
                                'approve_setting_version': req.body.approve_setting_version,
                                'createby': user_id,
                                'ordernumber': setordernumber_,
                                'ordernumber_running': (i - 1),
                            }
                            let output_ = upload_add_order(data_, 'Withdraw')
                            //  }, 1000);

                            // console.log('data_: ', data_)
                            // console.log('servicetype_: ', servicetype_)
                        }
                    }
                }
                if (rows[i][3] === 'ยอดรวม') {
                    if (rows[i][3] !== null) {
                        if (servicetype_ === 'Deposit') {
                            data_ = null
                            // let setordernumber_ = ''
                            let setordernumber_ = setordernumber(i)
                            // console.log('setordernumber_: ',setordernumber_)                
                            // setTimeout(() => { 
                            data_ = {
                                'branchorigin_code': rows[i][2],
                                'branchorigin_name': rows[i][3],
                                'branchdest_code': gfc_cct_code,
                                'branchdest_name': gfc_cct,

                                'note_uncount_1000': rows[i][4],
                                'note_uncount_500': rows[i][5],
                                'note_uncount_100': rows[i][6],
                                'note_uncount_50': rows[i][7],
                                'note_uncount_20': rows[i][8],
                                'note_uncount_10': rows[i][9],

                                'unit_note_uncount_1000': rows[i][4] !== '' && rows[i][4] !== null ? 'Bundle' : '',
                                'unit_note_uncount_500': rows[i][5] !== '' && rows[i][5] !== null ? 'Bundle' : '',
                                'unit_note_uncount_100': rows[i][6] !== '' && rows[i][6] !== null ? 'Bundle' : '',
                                'unit_note_uncount_50': rows[i][7] !== '' && rows[i][7] !== null ? 'Bundle' : '',
                                'unit_note_uncount_20': rows[i][8] !== '' && rows[i][8] !== null ? 'Bundle' : '',
                                'unit_note_uncount_10': rows[i][9] !== '' && rows[i][9] !== null ? 'Bundle' : '',

                                'pcs_note_uncount_1000': rows[i][4] !== '' && rows[i][4] !== null ? check_pcs(rows[i][4], '1000') : 0,
                                'pcs_note_uncount_500': rows[i][5] !== '' && rows[i][5] !== null ? check_pcs(rows[i][5], '500') : 0,//rows[i][5],
                                'pcs_note_uncount_100': rows[i][6] !== '' && rows[i][6] !== null ? check_pcs(rows[i][6], '100') : 0,//rows[i][6],
                                'pcs_note_uncount_50': rows[i][7] !== '' && rows[i][7] !== null ? check_pcs(rows[i][7], '50') : 0,//rows[i][7],
                                'pcs_note_uncount_20': rows[i][8] !== '' && rows[i][8] !== null ? check_pcs(rows[i][8], '20') : 0,//rows[i][8],
                                'pcs_note_uncount_10': rows[i][9] !== '' && rows[i][9] !== null ? check_pcs(rows[i][9], '10') : 0,//rows[i][9],

                                'coin_fit_10': rows[i][10],
                                'coin_fit_5': checkvalue(rows[i][11], 'float'),
                                'coin_fit_2': rows[i][12],
                                'coin_fit_1': rows[i][13],
                                'coin_fit_05': rows[i][14],
                                'coin_fit_025': rows[i][15],

                                'unit_coin_fit_10': rows[i][10] !== '' && rows[i][10] !== null ? 'Bundle' : '',
                                'unit_coin_fit_5': rows[i][11] !== '' && rows[i][11] !== null ? 'Bundle' : '',
                                'unit_coin_fit_2': rows[i][12] !== '' && rows[i][12] !== null ? 'Bundle' : '',
                                'unit_coin_fit_1': rows[i][13] !== '' && rows[i][13] !== null ? 'Bundle' : '',
                                'unit_coin_fit_05': rows[i][14] !== '' && rows[i][14] !== null ? 'Bundle' : '',
                                'unit_coin_fit_025': rows[i][15] !== '' && rows[i][15] !== null ? 'Bundle' : '',

                                'pcs_coin_fit_10': rows[i][10] !== '' && rows[i][10] !== null ? check_pcs(rows[i][10], '10') : 0, //rows[i][10],
                                'pcs_coin_fit_5': rows[i][11] !== '' && rows[i][11] !== null ? check_pcs(rows[i][11], '5') : 0,//checkvalue(rows[i][11], 'float'),
                                'pcs_coin_fit_2': rows[i][12] !== '' && rows[i][12] !== null ? check_pcs(rows[i][12], '2') : 0,//rows[i][12],
                                'pcs_coin_fit_1': rows[i][13] !== '' && rows[i][13] !== null ? check_pcs(rows[i][13], '1') : 0,//rows[i][13],
                                'pcs_coin_fit_05': rows[i][14] !== '' && rows[i][14] !== null ? check_pcs(rows[i][14], '0.50') : 0,//rows[i][14],
                                'pcs_coin_fit_025': rows[i][15] !== '' && rows[i][15] !== null ? check_pcs(rows[i][15], '0.25') : 0,//rows[i][15],

                                'total_by_branch': rows[i][16],
                                'remark': checkvalue(rows[i][17], 'string') !== undefined ? checkvalue(rows[i][17], 'string') : NULL_,
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'customerID': CustomerID,
                                'row_type': 'summary',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'roleid': roleid,
                                'createby': user_id,
                                'ordernumber': setordernumber_,
                                'ordernumber_running': (i - 1),
                            }
                            let output_ = upload_add_order(data_, 'Deposit')
                            //console.log('if (rows[i][3] === ยอดรวม) {')
                            //  console.log('in setimeout data_: ', data_)
                            //   }, 1000); 

                            // dboperations.upload_add_order(data_, 'Deposit').then((result, err) => {
                            //     if (err) {
                            //         console.log('error: ', err)
                            //         res.json({ error: err })
                            //     }
                            //     else {
                            //         // console.log(result)
                            //     }
                            // })
                            // console.log('data_: ', data_)
                            //console.log('servicetype_: ', servicetype_)
                        }
                        if (servicetype_ === 'Withdraw') {
                            // setTimeout(() => {
                            data_ = null
                            // let setordernumber_ = ''
                            let setordernumber_ = setordernumber(i)
                            data_ = {
                                'branchorigin_code': gfc_cct_code,
                                'branchorigin_name': gfc_cct,
                                'branchdest_code': rows[i][2],
                                'branchdest_name': rows[i][3],

                                'note_new_1000': rows[i][4],
                                'note_fit_1000': rows[i][5],
                                'note_new_500': rows[i][6],
                                'note_fit_500': rows[i][7],
                                'note_new_100': rows[i][8],
                                'note_fit_100': rows[i][9],
                                'note_new_50': rows[i][10],
                                'note_fit_50': rows[i][11],
                                'note_new_20': rows[i][12],
                                'note_fit_20': rows[i][13],
                                'note_new_10': rows[i][14],
                                'note_fit_10': rows[i][15],

                                'pcs_note_new_1000': rows[i][4] !== '' && rows[i][4] !== null ? check_pcs(rows[i][4], '1000') : 0,//rows[i][4],
                                'pcs_note_fit_1000': rows[i][5] !== '' && rows[i][5] !== null ? check_pcs(rows[i][5], '1000') : 0,//rows[i][5],
                                'pcs_note_new_500': rows[i][6] !== '' && rows[i][6] !== null ? check_pcs(rows[i][6], '500') : 0,//rows[i][6],
                                'pcs_note_fit_500': rows[i][7] !== '' && rows[i][7] !== null ? check_pcs(rows[i][7], '500') : 0,//rows[i][7],
                                'pcs_note_new_100': rows[i][8] !== '' && rows[i][8] !== null ? check_pcs(rows[i][8], '100') : 0,//rows[i][8],
                                'pcs_note_fit_100': rows[i][9] !== '' && rows[i][9] !== null ? check_pcs(rows[i][9], '100') : 0,//rows[i][9],
                                'pcs_note_new_50': rows[i][10] !== '' && rows[i][10] !== null ? check_pcs(rows[i][10], '50') : 0,//rows[i][10],
                                'pcs_note_fit_50': rows[i][11] !== '' && rows[i][11] !== null ? check_pcs(rows[i][11], '50') : 0,//rows[i][11],
                                'pcs_note_new_20': rows[i][12] !== '' && rows[i][12] !== null ? check_pcs(rows[i][12], '20') : 0,//rows[i][12],
                                'pcs_note_fit_20': rows[i][13] !== '' && rows[i][13] !== null ? check_pcs(rows[i][13], '20') : 0,//rows[i][13],
                                'pcs_note_new_10': rows[i][14] !== '' && rows[i][14] !== null ? check_pcs(rows[i][14], '10') : 0,//rows[i][14],
                                'pcs_note_fit_10': rows[i][15] !== '' && rows[i][15] !== null ? check_pcs(rows[i][15], '10') : 0,//rows[i][15],                                

                                'unit_note_new_1000': rows[i][4] !== '' && rows[i][4] !== null ? 'Bundle' : '',
                                'unit_note_fit_1000': rows[i][5] !== '' && rows[i][5] !== null ? 'Bundle' : '',
                                'unit_note_new_500': rows[i][6] !== '' && rows[i][6] !== null ? 'Bundle' : '',
                                'unit_note_fit_500': rows[i][7] !== '' && rows[i][7] !== null ? 'Bundle' : '',
                                'unit_note_new_100': rows[i][8] !== '' && rows[i][8] !== null ? 'Bundle' : '',
                                'unit_note_fit_100': rows[i][9] !== '' && rows[i][9] !== null ? 'Bundle' : '',
                                'unit_note_new_50': rows[i][10] !== '' && rows[i][10] !== null ? 'Bundle' : '',
                                'unit_note_fit_50': rows[i][11] !== '' && rows[i][11] !== null ? 'Bundle' : '',
                                'unit_note_new_20': rows[i][12] !== '' && rows[i][12] !== null ? 'Bundle' : '',
                                'unit_note_fit_20': rows[i][13] !== '' && rows[i][13] !== null ? 'Bundle' : '',
                                'unit_note_new_10': rows[i][14] !== '' && rows[i][14] !== null ? 'Bundle' : '',
                                'unit_note_fit_10': rows[i][15] !== '' && rows[i][15] !== null ? 'Bundle' : '',

                                'coin_fit_10': rows[i][16],
                                'coin_fit_5': rows[i][17],
                                'coin_fit_2': rows[i][18],
                                'coin_fit_1': rows[i][19],
                                'coin_fit_05': rows[i][20],
                                'coin_fit_025': rows[i][21],

                                'pcs_coin_fit_10': rows[i][16] !== '' && rows[i][16] !== null ? check_pcs(rows[i][16], '10') : null, //rows[i][16],
                                'pcs_coin_fit_5': rows[i][17] !== '' && rows[i][17] !== null ? check_pcs(rows[i][17], '5') : null,//checkvalue(rows[i][17], 'float'),
                                'pcs_coin_fit_2': rows[i][18] !== '' && rows[i][18] !== null ? check_pcs(rows[i][18], '2') : null,//rows[i][18],
                                'pcs_coin_fit_1': rows[i][19] !== '' && rows[i][19] !== null ? check_pcs(rows[i][19], '1') : null,//rows[i][19],
                                'pcs_coin_fit_05': rows[i][20] !== '' && rows[i][20] !== null ? check_pcs(rows[i][20], '0.50') : null,//rows[i][20],
                                'pcs_coin_fit_025': rows[i][21] !== '' && rows[i][21] !== null ? check_pcs(rows[i][21], '0.25') : null,//rows[i][21],

                                'unit_coin_fit_10': rows[i][16] !== '' && rows[i][16] !== null ? 'Bundle' : '',
                                'unit_coin_fit_5': rows[i][17] !== '' && rows[i][17] !== null ? 'Bundle' : '',
                                'unit_coin_fit_2': rows[i][18] !== '' && rows[i][18] !== null ? 'Bundle' : '',
                                'unit_coin_fit_1': rows[i][19] !== '' && rows[i][19] !== null ? 'Bundle' : '',
                                'unit_coin_fit_05': rows[i][20] !== '' && rows[i][20] !== null ? 'Bundle' : '',
                                'unit_coin_fit_025': rows[i][21] !== '' && rows[i][21] !== null ? 'Bundle' : '',

                                'total_by_branch': rows[i][22],
                                // 'remark': checkvalue(rows[i][23], 'string'),
                                'remark': checkvalue(rows[i][23], 'string') !== undefined ? checkvalue(rows[i][23], 'string') : NULL_,
                                'order_date': date_,
                                'order_category': OrderCategory_,
                                'servicetype': servicetype_,
                                'customer_no': customer_no_,
                                'customerID': CustomerID,
                                'row_type': 'summary',
                                'attach_file': fileName,
                                'attach_file_origin': attach_file_origin,
                                'roleid': roleid,
                                'createby': user_id,
                                'ordernumber': setordernumber_,
                                'ordernumber_running': (i - 1),
                            }
                            // dboperations.upload_add_order(data_, 'Withdraw').then((result, err) => {
                            //     if (err) {
                            //         console.log('error: ', err)
                            //         res.json({ error: err })
                            //     }
                            //     else {
                            //         // console.log(result)
                            //     }
                            // })

                            //let output_ = upload_add_order(data_, 'Withdraw')
                            // }, 1000);                            
                            // console.log('data_: ', data_)
                            //console.log('servicetype_: ', servicetype_)
                        }
                    }
                }
                //console.log(rows[i][16])
            }
            // }, 500); 
        }
    })
})
app.get('/ordertrackinglist', (req, res) => {
    dboperations.getOrdertrackinglist().then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
// create application/x-www-form-urlencoded parser
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.get('/get_complete_word', urlencodedParser, (req, res) => {
   
    dboperations.get_complete_word(req.query['search'], req.query['type']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_meeting_area', urlencodedParser, (req, res) => {
    
    dboperations.get_meeting_area(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_navigator', urlencodedParser, (req, res) => {
    
    dboperations.get_navigator(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_dept', urlencodedParser, (req, res) => {
    
    dboperations.get_dept(req.query['division_id']
        , req.query['branch_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_dept_by_branch', urlencodedParser, (req, res) => {
    
    dboperations.get_dept_by_branch(req.query['division_id']
        , req.query['branch_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_position', urlencodedParser, (req, res) => {
    
    dboperations.get_position().then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_user_by_branch', urlencodedParser, (req, res) => {
    console.log('req.query[branch_id]: ', req.query['branch_id'])
    dboperations.get_user_by_branch(req.query['branch_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_user', urlencodedParser, (req, res) => {
    
    dboperations.get_user(req.query['department_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_templete', urlencodedParser, (req, res) => {
    dboperations.get_templete(req.query['branch_id']
        , req.query['department_id']).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
        })
})
app.get('/get_templete_det', urlencodedParser, (req, res) => {
    dboperations.get_templete_det(req.query['templete_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_vehicle_color', urlencodedParser, (req, res) => {
    dboperations.get_vehicle_color().then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_vehicle_brand', urlencodedParser, (req, res) => {
    dboperations.get_vehicle_brand().then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.post('/authenticate', urlencodedParser, (req, res) => {
    const { username, password } = req.body;
    // console.log('req.body: ',req.body)
    // console.log('username: ',req.body.username,' ,passwore: ',req.body.password)
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    const config = {
        // authenticated: true,
        url: 'ldap://192.168.100.29',
        baseDN: 'dc=guardforcecash,dc=co,dc=th',
        username: 'gfcth\\svc_ldap',
        password: 'Z8-H%p95BR',
        referrals: {
            enabled: false,
        },
        // username: obj_json['jobid']+'@guardforcecash.co.th',
        // password: obj_json['password']
    };
    console.log('config: ', config)
    const ad = new ActiveDirectory(config);
    //************************************* */
    ad.authenticate('gfcth\\' + obj_json['jobid'], obj_json['password'], (err, auth) => {
        if (err) {
            console.log('ERROR: ' + JSON.stringify(err));
            res.status(500).send(err);
            return;
        }
        if (auth) {
            console.log('auth: ', auth)
            console.log('login done: ', auth)
            res.send({ success: true, message: 'Authentication successful' });
        } else {
            res.status(401).send({ success: false, message: 'Authentication failed' });
        }
    });
});

app.get('/get_permission_access', urlencodedParser, (req, res) => {

    dboperations.get_permission_access(req.query['user_id']
        , req.query['user_role_id']
        , req.query['user_role']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.post("/generateCSV", urlencodedParser, async (req, res) => {
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

    //     let data = req.body
    //     let obj = null
    //     for (let x in data) {
    //         obj = x  
    //     }
    //     let obj_json = JSON.parse(obj) 
    //     let data_ = obj_json.data_.split(':')
    //     let customer =''
    //     obj_json.customerID === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
    //    var file = __dirname + '/reports/'+obj_json.JobDate+'/'+obj_json.CCT_Data+'/'+customer+'/'+data_[2]+'/'+data_[3];
    //     //var file = __dirname + '/reports/'+data_[0]+'/'+data_[1]+'/' + customer + '/'+data_[2]+'/'+data_[3]    

    //     var filename = path.basename(file);
    //     var mimetype = mime.lookup(file);
    //     res.setHeader("Content-Type", "text/csv; charset=utf-8;")
    //     res.setHeader('Content-Disposition', contentDisposition(file))
    //     var filestream = fs.createReadStream(file,'utf-8');
    //     console.log('res: ',res) 
    //     filestream.pipe(res)    
    //     onFinished(res, () => {
    //         destroy(filestream) 
    //     })    
})
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
        dboperations.getuserinfo(data_all).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                console.log('output: ', result[0])
                res.json(result[0])
            }
        })
    } catch (error) {
        console.error(error);
        res.json({ error: error })
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
    }

})
app.post("/gettemplatefile", urlencodedParser, async (req, res) => {
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
})
app.post("/generateXLS", urlencodedParser, async (req, res) => {

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
})

app.get('/getActitySelectd', urlencodedParser, async (req, res) => {
    dboperations.getActitySelectd(req.query['user_id'], req.query['customerID']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            //console.log( 'res.json(result[0]): ',res.json( result[0] ) )
            res.json(result[0])
        }
    })
})
app.get('/getdownloadreports', urlencodedParser, async (req, res) => {
    const client = new ftp.Client()
    client.ftp.verbose = true
    var output_data = []
    var output_data0 = {}
    let customer = ''
    //req.query['customerID'] === '2c164463-ef08-4cb6-a200-08e70aece9ae' ? customer = 'GSB' : customer = 'UOB'
    customer = checkcustomer(req.query['customerID'])
    var path = req.query['JobDate'] + '/' + req.query['CCT_Data']
        + '/' + customer
    var dir_ = {}
    var path_ = ""
    try {
        await client.access({
            host: "192.168.100.94",
            port: 21,
            user: "svc-ftp-std",
            password: "mnP9eFP8",
            secure: false
        })
        dir_ = await client.list(path)
        console.log('path: ', path)
        console.log('dir_ : ', dir_)
        console.log('dir_.length : ', dir_.length)
        console.log('dir_.name : ', dir_[0].name)

        if (dir_.length > 0) {
            for (var index = 1; index <= dir_.length; index++) {
                path_ = 'reports/' + path + '/'//--------------------------------------------------------------------------------------------path D:/projects/gfccp_web/public/reports/
                //path_ = 'D:/projects/gfccp_web/public/reports/' + path + '/'//-------------------------------------------------------------path D:/projects/gfccp_web/public/reports/                
                path_ += dir_[index - 1].name
                console.log('path_: ', path_)
                console.log('dir_[ index-1 ].name: ', dir_[index - 1].name)
                if (!fs.existsSync(path_))//---------------------------ยังไม่มีโฟลเดอร์ backend
                {
                    console.log('if (!fs.existsSync(path_))')
                    //----Start Copy file from remote to backend serve
                    fs.mkdirSync(path_, { recursive: true });
                    // client.trackProgress(info => console.log(info.bytesOverall))
                    client.trackProgress(info => console.log('info.fileName: ', info.fileName))
                    //--await client.downloadToDir("local/path", "remote/path")
                    await client.downloadToDir(path_, path + "/" + dir_[index - 1].name)
                    //----End Copy file from remote to backend serve
                    output_data0 = {
                        jobdate: req.query['JobDate'],
                        cctname: req.query['CCT_Data'],
                        typeofreport: dir_[index - 1].name,
                        remotepath: path_,
                        files: getReportFilename(path_),
                        id_: index - 1
                    }
                }
                else//--------------------------------------------------มีโฟลเดอร์ backend                
                {
                    console.log('NO.......if (!fs.existsSync(path_))')
                    output_data0 = {
                        jobdate: req.query['JobDate'],
                        cctname: req.query['CCT_Data'],
                        typeofreport: dir_[index - 1].name,
                        remotepath: path_,
                        files: getReportFilename(path_),
                        id_: index - 1
                    }
                }
                output_data.push(output_data0)
                console.log('output_data in for loop: ', output_data)
            }
        }
        console.log('output_data: ', output_data)
        //return output_data
    }
    catch (err) {
        console.log('err: ', err)
    }
    client.close()
    res.json(output_data)
})
const getReportFilename = (path_) => {
    let output = []
    let countfile = 0
    //let output0={}
    console.log('start getReportFilename path_: ', path_)
    fs.readdirSync(path_).forEach(file => {
        if (file) {
            if (countfile === 0) {
                output.push({ file1: file })
                console.log('file1: ', file)
                countfile++
            }
            else {
                // output0={file2: file}
                output.push({ file2: file })
                console.log('file2: ', file)
                countfile = 0
            }
        }
    })
    // console.log('output0: ',output0)
    // output.push( output0 )
    return output
}
//------------getrole 
app.get('/set_sendmail', urlencodedParser, (req, res) => {
    // let id = req.body['id']
    let output 
    console.log('set_sendmail req.query[id]: ', req.query['id_']
        , 'req.query[department_id]: ', req.query['department_id']
        , 'req.query[branch_id]: ', req.query['branch_id']
        , 'req.query[division_id]: ', req.query['division_id']
    )
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
                let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC`
                let body = `วันที่: ${output[0].CreateDate}<br>
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

})
app.get('/getrole', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    dboperations.getRole(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getactivity_authen', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req: ', req)
    console.log('approve_setting_id: ', req.query['approve_setting_id'])
    console.log('approve_setting_version: ', req.query['approve_setting_version'])
    dboperations.getactivity_authen(req.query['approve_setting_id'], req.query['approve_setting_version']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result)
        }
    })
})
app.get('/getuser', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    console.log('req.query[CustomerID]', req.query['CustomerID'])
    dboperations.getUser(req.query['user_id'], req.query['CustomerID']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/getuserEdit', urlencodedParser, (req, res) => {
    // let type_ = ''
    // type_ = req.query['type_']
    console.log('req.query[user_id]', req.query['user_id'])
    console.log('req.query[CustomerID]', req.query['CustomerID'])
    dboperations.getuserEdit(req.query['user_id'], req.query['CustomerID']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_vrf_list', urlencodedParser, (req, res) => {
    // console.log('/get_vrf_list department_id: ', req.query['department_id']
    //     , 'branch_id: ', req.query['branch_id'])
    dboperations.get_vrf_list(
        req.query['department_id']
        , req.query['branch_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_vrf_lst_for_security', urlencodedParser, (req, res) => {
    console.log('/get_vrf_list department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    dboperations.get_vrf_lst_for_security(
        req.query['department_id']
        , req.query['branch_id']
        , req.query['role_id']
        , req.query['division_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_vrf_approve_list', urlencodedParser, (req, res) => {
    console.log('/get_vrf_approve_list department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id']
        , 'role_id: ', req.query['role_id']
        , 'division_id: ', req.query['division_id'])
    dboperations.get_vrf_approve_list(
        req.query['department_id']
        , req.query['branch_id']
        , req.query['role_id']
        , req.query['division_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.ge
app.get('/get_templete_vrf_list', urlencodedParser, (req, res) => {
    console.log('/get_templete_vrf_list department_id: ', req.query['department_id']
        , 'branch_id: ', req.query['branch_id'])
    dboperations.get_templete_vrf_list(
        req.query['department_id']
        , req.query['branch_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_search_vrf_trans', urlencodedParser, (req, res) => {

    dboperations.get_search_vrf_trans(
        req.query['tbDateF']
        , req.query['tbDateT']
        , req.query['requestor_id']
        , req.query['area_id']
        , req.query['requestor_dept_id']
        , req.query['department_id']
        , req.query['branch_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            console.log('result: ', result)
            res.json(result[0])
        }
    })
})
app.get('/get_search_vrf', urlencodedParser, (req, res) => {

    dboperations.get_search_vrf(
        req.query['tbDateF']
        , req.query['tbDateT']
        , req.query['requestor_id']
        , req.query['area_id']
        , req.query['requestor_dept_id']
        , req.query['department_id']
        , req.query['branch_id']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            console.log('result: ', result)
            res.json(result[0])
        }
    })
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
        ).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
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
        ).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json(result[0])
            }
        })
    } catch (error) {
        res.json({ error: error })
        console.error(error)
    }
})
app.get('/approveProcList', urlencodedParser, (req, res) => {
    dboperations.getApproveProcList(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_approveProcData', urlencodedParser, (req, res) => {
    dboperations.get_approveProcData(req.query['Id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_approveProcDataDet', urlencodedParser, (req, res) => {
    dboperations.get_approveProcDataDet(req.query['approve_setting_id'], req.query['version']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/set_cancel_approve_proc_data', urlencodedParser, (req, res) => {
    dboperations.set_cancel_approve_proc_data(req.query['Id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            console.log('set_cancel_approve_proc_data res.json: ', result[0])
            res.json(result[0])
        }
    })
})
app.get('/get_pbi_url', urlencodedParser, (req, res) => {
    console.log('get_pbi_url pagname:', req.query['pagname'])
    console.log('get_pbi_url CustomerID:', req.query['CustomerID'])
    console.log('get_pbi_url user_id:', req.query['user_id'])
    // dboperations.get_pbi_url(req.query['pagname'], req.query['CustomerID'],req.query['user_id']).then((result, err) => {
    dboperations.get_pbi_url(req.query['pagname'], req.query['CustomerID'], req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})

app.get('/getdownloadlink', urlencodedParser, (req, res) => {
    console.log('req.query[user_id]: ', req.query['user_id'])
    dboperations.getDownloadLink(req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.post('/add_approveProc', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    console.log('obj_json: ', obj_json)
    console.log('data_: ', data_)
    dboperations.add_approveProc(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
// app.post('/set_manual_add_vrf_trans', urlencodedParser, (req, res) => {
//     let data_ = req.body 
//     let obj = null
//     for (let x in data_) {
//         obj = x
//     }
//     let obj_json = JSON.parse(obj)
//    // console.log('obj_json: ', obj_json)
//     dboperations.set_manual_add_vrf_trans(obj_json).then((result, err) => {
//         if (err) {
//             console.log('error: ', err)
//             res.json({ error: err })
//         }
//         else {
//             res.json(result)
//         }
//     })   
// })
app.post('/set_manual_add_vrf', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    // console.log('obj_json: ', obj_json)
    dboperations.set_manual_add_vrf(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result)
        }
    })
})
app.post('/set_reject_vrf', bodyParser.json(), (req, res) => {
    console.log('req.body: ', req.body);
    console.log('req.body[reject_reason]: ', req.body.reject_reason);
    dboperations.set_reject_vrf(req.body.vrf_id_for_reject
        , req.body.reject_reason
        , req.body.RejectBy).then((result, err) => {
            if (err) {
                console.log('error: ', err)
                res.json({ error: err })
            }
            else {
                res.json({ message: 'success' })
            }
        })

});
app.post('/set_manual_add_vrf_trans_det', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    // console.log('obj_json: ', obj_json)
    dboperations.set_manual_add_vrf_trans_det(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result)
        }
    })

})
app.post('/set_manual_add_vrf_det', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    // console.log('obj_json: ', obj_json)
    dboperations.set_manual_add_vrf_det(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result)
        }
    })

})
app.post('/set_manual_update_vrf_det_trans', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    console.log('obj.length: ', obj.length)
    let obj_json = JSON.parse(obj)

    dboperations.set_manual_update_vrf_det_trans(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })

})
app.post('/set_manual_update_vrf_det', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    console.log('obj.length: ', obj.length)
    let obj_json = JSON.parse(obj)

    dboperations.set_manual_update_vrf_det(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })

})
app.post('/set_manual_update_vrf', urlencodedParser, (req, res) => {
    let data_ = req.body
    let obj = null
    for (let x in data_) {
        obj = x
    }
    let obj_json = JSON.parse(obj)
    dboperations.set_manual_update_vrf(obj_json).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })

})

app.get('/get_templete_vrf', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    dboperations.get_templete_vrf(req.query['Id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_vrf', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    dboperations.get_vrf(req.query['Id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_vrf_file/:name', (req, res) => {
    const file = path.resolve(__dirname, 'uploads', req.params.name);
    res.sendFile(file);
});
app.get('/get_vrf_det', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    dboperations.get_vrf_det(req.query['Id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/get_templete_vrf_det', urlencodedParser, (req, res) => {
    //console.log('/getcashorder req.query[Id] :', req.query['Id'])
    dboperations.get_templete_vrf_det(req.query['Id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/update_vrf_trans_status_all', urlencodedParser, (req, res) => {
    let output = null
    let type_ = req.query['Type_']
    req.query['Id'].forEach((item) => {
        dboperations.update_vrf_trans_status(parseInt(item)
            , req.query['Type_']
            , req.query['user_id']
            , req.query['role_id']
            , req.query['work_flow_id']
        ).then((result, err) => {
            if (err) {
                console.log('error: ', err)
            }
            else {
                // res.json(result[0])
                output = result[0]
            }
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
})
app.get('/update_vrfstatus_all', urlencodedParser, (req, res) => {
    console.log('update_vrfstatus_all req.query[Id]:', req.query['Id'])
    console.log('update_vrfstatus_all req.query[Id].length:', req.query['Id'].length)
    console.log('update_vrfstatus_all req.query[Type_]:', req.query['Type_'])
    let output = null
    req.query['Id'].forEach((item) => {
        // console.log(item)
        console.log('update_vrfstatus_all in array Id: ', parseInt(item))
        dboperations.update_vrfstatus(parseInt(item), req.query['Type_'], req.query['user_id']).then((result, err) => {
            if (err) {
                console.log('error: ', err)
            }
            else {
                // res.json(result[0])
                output = result[0]
            }
        })
    })
    res.json(output)
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
            if( (req.query['role_id'] !=='3') && (req.query['role_id'] !=='8') ) { 
                let result_sendmail = await setSendMail_next_approver(req.query['Id'])
                console.log('setSendMail_next_approver result_sendmail: ', result_sendmail)
            }
            res.json(result[0])
        }
    })
})
const setSendMail_next_approver = async (id) => {

    try {
        let result = await dboperations.get_mail_info_next_approve(id)
        let output = result[0]
        console.log(' output[0].email_next_approver: ', output[0].email_next_approver)
        let subject = `[VRF] ขออนุมัติเข้าพื้นที่ GFC`
        let body = `วันที่: ${output[0].CreateDate}<br>
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

    dboperations.set_sp_update_vrf_checkinount(req.query['Id']
        , req.query['Type_']
        , req.query['user_id']
        , req.query['comment']
    ).then((result, err) => {
        if (err) {
            console.log('error: ', err)
        }
        else {

            res.json(result[0])
        }
    })
})
app.get('/update_vrf_trans_status', urlencodedParser, (req, res) => {
    let attach_file_primitive = req.query['attach_file_primitive']
    dboperations.update_vrf_trans_status(req.query['Id']
        , req.query['Type_']
        , req.query['user_id']
        , req.query['attach_file_primitive']).then((result, err) => {
            if (err) {
                console.log('error: ', err)
            }
            else {
                if ((attach_file_primitive !== '')
                    && (attach_file_primitive !== null)
                    && (attach_file_primitive !== undefined)
                    && (attach_file_primitive !== 'undefined')
                ) {
                    // ใช้ fs.stat
                    fs.stat('./uploads/' + attach_file_primitive, (err, stats) => {
                        if (err) {
                            console.log(`ไม่พบไฟล์: ${attach_file_primitive}`);
                        } else {
                            fs.unlink('./uploads/' + attach_file_primitive, (err) => {
                                if (err) throw err;
                                console.log(attach_file_primitive + ' ถูกลบแล้ว');
                            });
                        }
                    });
                }
                res.json(result[0])
            }
        })
})
app.get('/update_vrfstatus', urlencodedParser, (req, res) => {
    // console.log(req.query['Id'])
    // console.log(req.query['Type_'])
    dboperations.update_vrfstatus(req.query['Id'], req.query['Type_'], req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
        }
        else {
            res.json(result[0])
        }
    })
})
app.get('/delete_app_proc_det', urlencodedParser, (req, res) => {
    // let data_ = req.body
    // let obj = null
    // for (let x in data_) {
    //     obj = x
    // }
    // let obj_json = JSON.parse(obj)    
    // console.log('obj_json: ',obj_json)
    dboperations.delete_app_proc_det(req.query['Id'], req.query['user_id']).then((result, err) => {
        if (err) {
            console.log('error: ', err)
            res.json({ error: err })
        }
        else {
            res.json(result[0])
        }
    })
})
app.listen(process.env.PORT, () => console.log(`running on localhost:${process.env.PORT}`))
