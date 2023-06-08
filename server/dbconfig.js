require('dotenv').config()
//Local
// const config = {
//     user :'sa',
//     password :'ahost!1234',
//     server:'192.168.100.176',
//     database:'CIT_ReportDB_GFCCP_PROD',
//     options:{
//         validateBulkLoadParameters: false,
//         rowCollectionOnRequestCompletion: true,
//         encrypt: false,
//         trustServerCertificate: true,
//         enableArithAbort: true
//     },
// }
//UAT
// const config = {
//     user :'sa',
//     password :'ahost!1234',
//     server:'192.168.100.176',
//     database:'CIT_ReportDB_GFCCP_PROD',
//     options:{
//         validateBulkLoadParameters: false,
//         rowCollectionOnRequestCompletion: true,
//         encrypt: false,
//         trustServerCertificate: true,
//         enableArithAbort: true
//     },
// }
// PROD
const config = {
    user : process.env.DB_UN,//'sa',
    password : process.env.DB_PW,//'ahost!1234',
    server: process.env.DB_SERVER,
    database:process.env.DB_DATABASE,//'CIT_ReportDB_GFCCP_PROD',
    options:{
        validateBulkLoadParameters: false,
        rowCollectionOnRequestCompletion: true,
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
}
module.exports = config; 