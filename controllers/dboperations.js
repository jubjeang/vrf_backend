var config = require("../server/dbconfig");
const sql = require("mssql");
const moment = require('moment-timezone');

async function set_reject_vrf(vrf_id_for_reject, reject_reason, RejectBy) {
  try {
    let pool = await sql.connect(config);
    let spSet_reject_vrf = await pool
      .request()
      .input("vrf_id_for_reject", sql.Int, vrf_id_for_reject)
      .input("reject_reason", sql.NVarChar, reject_reason)
      .input("RejectBy", sql.NVarChar, RejectBy)
      .execute("spSet_reject_vrf");
    return spSet_reject_vrf.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_complete_word(search, type) {
  try {
    let pool = await sql.connect(config);
    let spGet_complete_word = await pool
      .request()
      .input("search", sql.NVarChar, search)
      .input("type", sql.NVarChar, type)
      .execute("spGet_complete_word");
    return spGet_complete_word.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_meeting_area(user_id) {
  try {
    let pool = await sql.connect(config);
    let spGet_meeting_area = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .execute("spGet_meeting_area");
    return spGet_meeting_area.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_navigator(user_id) {
  try {
    let pool = await sql.connect(config);
    let spGetNavigator = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .execute("spGetNavigator");
    return spGetNavigator.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_dept_by_branch(division_id, branch_id) {
  try {
    let pool = await sql.connect(config);
    let spGetDept_By_Branch = await pool
      .request()
      .input("division_id", sql.Int, division_id)
      .input("branch_id", sql.Int, branch_id)
      .execute("spGetDept_By_Branch");
    return spGetDept_By_Branch.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_dept_all() {
  try {
    let pool = await sql.connect(config);
    let spGetDept_all = await pool
      .request()
      // .input("division_id", sql.Int, division_id)
      // .input("branch_id", sql.Int, branch_id)
      .execute("spGetDept_all");
    return spGetDept_all.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_division_all() {
  try {
    let pool = await sql.connect(config);
    let spGetDivision_all = await pool
      .request()
      // .input("division_id", sql.Int, division_id)
      // .input("branch_id", sql.Int, branch_id)
      .execute("spGetDivision_all");
    return spGetDivision_all.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_branch_all() {
  try {
    let pool = await sql.connect(config);
    let spGetBranch_all = await pool
      .request()
      // .input("division_id", sql.Int, division_id)
      // .input("branch_id", sql.Int, branch_id)
      .execute("spGetBranch_all");
    return spGetBranch_all.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_role_by_dept() {
  try {
    let pool = await sql.connect(config);
    let spGetRole_by_dept = await pool
      .request()
      // .input("division_id", sql.Int, division_id)
      // .input("branch_id", sql.Int, branch_id)
      .execute("spGetRole_by_dept");
    return spGetRole_by_dept.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_role_all() {
  try {
    let pool = await sql.connect(config);
    let spGetRole_all = await pool
      .request()
      // .input("division_id", sql.Int, division_id)
      // .input("branch_id", sql.Int, branch_id)
      .execute("spGetRole_all");
    return spGetRole_all.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_dept(division_id, branch_id) {
  try {
    let pool = await sql.connect(config);
    let spGetDept = await pool
      .request()
      .input("division_id", sql.Int, division_id)
      .input("branch_id", sql.Int, branch_id)
      .execute("spGetDept");
    return spGetDept.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_position() {
  try {

    let pool = await sql.connect(config);
    let spGetPosition = await pool
      .request()
      //.input("department_id", sql.Int, department_id)
      .execute("spGetPosition");
    return spGetPosition.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_user_by_branch(branch_id) {
  try {
    console.log("get_user_by_branch branch_id", branch_id);
    let pool = await sql.connect(config);
    let spGetUser_by_branch = await pool
      .request()
      .input("branch_id", sql.Int, branch_id)
      .execute("spGetUser_by_branch");
    return spGetUser_by_branch.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_user(department_id) {
  try {

    let pool = await sql.connect(config);
    let spGetUser = await pool
      .request()
      .input("department_id", sql.Int, department_id)
      .execute("spGetUser");
    return spGetUser.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vehicle_color() {
  try {
    let pool = await sql.connect(config);
    let spGet_vehicle_color = await pool
      .request()
      .execute("spGet_vehicle_color");
    return spGet_vehicle_color.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_templete_det(templete_id) {
  try {
    let pool = await sql.connect(config);
    let spGet_templete_det = await pool
      .request()
      .input("templete_id", sql.Int, templete_id)
      .execute("spGet_templete_det");
    return spGet_templete_det.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_templete(branch_id, department_id) {
  try {
    let pool = await sql.connect(config);
    let spGet_templete = await pool
      .request()
      .input("branch_id", sql.Int, branch_id)
      .input("department_id", sql.Int, department_id)
      .execute("spGet_templete");
    return spGet_templete.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vehicle_brand() {
  try {
    let pool = await sql.connect(config);
    let spGet_vehicle_brand = await pool
      .request()
      .execute("spGet_vehicle_brand");
    return spGet_vehicle_brand.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_permission_access(user_id, user_role_id, user_role) {
  try {
    let pool = await sql.connect(config);
    let spGet_permission_access = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("user_role_id", sql.Int, user_role_id)
      .input("user_role", sql.NVarChar, user_role)
      .execute("spGet_permission_access");
    return spGet_permission_access.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getactivity_authen(userID) {
  try {
    let pool = await sql.connect(config);
    let spGetRole = await pool
      .request()
      .input("userID", sql.Int, userID)
      .execute("spGetRole");
    return spGetRole.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getRole(userID) {
  try {
    let pool = await sql.connect(config);
    let spGetRole = await pool
      .request()
      .input("userID", sql.Int, userID)
      .execute("spGetRole");
    return spGetRole.recordsets;
  } catch (error) {
    console.log("error: ", error);
  }
}
async function getUser(userID, customerID) {
  try {
    let pool = await sql.connect(config);
    let spGetUser = await pool
      .request()
      .input("userID", sql.Int, userID)
      .input("CustomerID", sql.NVarChar, customerID)
      .execute("spGetUser");
    return spGetUser.recordsets;
  } catch (error) {
    console.log("error: ", error);
  }
}
async function getuserEdit(userID, customerID) {
  try {
    let pool = await sql.connect(config);
    let spGetUser_Edit = await pool
      .request()
      .input("userID", sql.Int, userID)
      .input("CustomerID", sql.NVarChar, customerID)
      .execute("spGetUser_Edit");
    return spGetUser_Edit.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getDownloadLink(userID) {
  try {
    let pool = await sql.connect(config);
    let spDownloadLink = await pool
      .request()
      .input("userID", sql.Int, userID)
      .execute("spDownloadLink");
    return spDownloadLink.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getactivity_authen(approve_setting_id, approve_setting_version) {
  try {
    let output = null;
    console.log("approve_setting_id: ", approve_setting_id);
    console.log("approve_setting_version: ", approve_setting_version);
    let pool = await sql.connect(config);
    let sp_getactivity_authen = await pool
      .request()
      .input("approve_setting_id", sql.Int, approve_setting_id)
      .input("approve_setting_version", sql.Float, approve_setting_version)
      .execute("sp_getactivity_authen");
    output = sp_getactivity_authen.recordsets;
    output = output[0];
    output = output[0];
    console.log("output: ", output);
    return output;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getActitySelectd(user_id, CustomerID) {
  try {
    let output = null;
    console.log("user_id: ", user_id);
    console.log("CustomerID: ", CustomerID);
    let pool = await sql.connect(config);
    let spGetActity = await pool
      .request()
      .input("CustomerID", sql.NVarChar, CustomerID)
      .input("user_id", sql.Int, user_id)
      .execute("spGetActity");
    output = spGetActity.recordsets;
    output = output[0];
    //output = output[0]
    console.log("output: ", output);
    return output;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_search_vrf_templete(
  tbDateF,
  tbDateT,
  requestor_id,
  area_id,
  requestor_dept_id,
  branch_id,
  approve_status
) {
  let tbDateF_;
  let formattedtbDateF;
  let tbDateT_;
  let formattedtbDateT;

  let dateF
  let dateT
  let formattedDateF
  let formattedDateT

  if ((tbDateF !== undefined && tbDateF !== '' && tbDateF !== null)) {
    tbDateF_ = moment.tz(tbDateF, 'Asia/Bangkok');
    formattedtbDateF = tbDateF_.format('YYYY-MM-DD');
    dateF = new Date(formattedtbDateF);
    formattedDateF = `${dateF.getUTCFullYear()}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${String(dateF.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateF_ = '';
    formattedtbDateF = '';
    dateF = '';
    formattedDateF = null;
  }
  //--------------------------------------
  if ((tbDateT !== undefined && tbDateT !== '' && tbDateT !== null)) {
    tbDateT_ = moment.tz(tbDateT, 'Asia/Bangkok');
    formattedtbDateT = tbDateT_.format('YYYY-MM-DD');
    dateT = new Date(formattedtbDateT);
    formattedDateT = `${dateT.getUTCFullYear()}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${String(dateT.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateT_ = '';
    formattedtbDateT = '';
    dateT = '';
    formattedDateT = null;
  }

  approve_status
  console.log('approve_status: ', approve_status);
  let approve_status_ =
    approve_status !== undefined && approve_status !== '' && approve_status !== null ? approve_status : null;
  let requestor_id_ =
    requestor_id !== undefined && requestor_id !== '' && requestor_id !== null && !isNaN(requestor_id)
      ? parseInt(requestor_id)
      : null;
  let area_id_ =
    area_id !== undefined && area_id !== '' && area_id !== null && !isNaN(area_id)
      ? parseInt(area_id)
      : null;
  let requestor_dept_id_ =
    requestor_dept_id !== undefined &&
      requestor_dept_id !== '' &&
      requestor_dept_id !== null &&
      !isNaN(requestor_dept_id)
      ? parseInt(requestor_dept_id)
      : null;

  try {
    let pool = await sql.connect(config);

    console.log('get_search_vrf_templete requestor_id_: ', requestor_id_, 'area_id_: ', area_id_
      , 'requestor_dept_id_: ', requestor_dept_id_
      , 'formattedDateF: ', formattedDateF
      , 'formattedDateT: ', formattedDateT
      , 'approve_status: ', approve_status_
      , 'branch_id: ', branch_id
    );
    // สร้าง request และเพิ่ม input parameters
    let request = pool.request();
    request.input('formattedDateF', sql.Date, formattedDateF);
    request.input('formattedDateT', sql.Date, formattedDateT);
    request.input('requestor_dept_id', sql.Int, requestor_dept_id_);
    request.input('branch_id', sql.Int, branch_id);
    request.input('requestor_id', sql.Int, requestor_id_);
    request.input('area_id', sql.Int, area_id_);

    // เรียกใช้ stored procedure
    let result = await request.execute('spGet_search_templete_vrf_list');
    console.log('result.recordset: ', result.recordset); // Output the result

    return result.recordset;
  } catch (error) {
    console.log('error: ', error);
    return [{ error: error }];
  }
}
async function get_search_vrf(
  tbDateF,
  tbDateT,
  requestor_id,
  area_id,
  requestor_dept_id,
  branch_id,
  approve_status
) {
  let tbDateF_;
  let formattedtbDateF;
  let tbDateT_;
  let formattedtbDateT;

  let dateF
  let dateT
  let formattedDateF
  let formattedDateT

  if ((tbDateF !== undefined && tbDateF !== '' && tbDateF !== null)) {
    tbDateF_ = moment.tz(tbDateF, 'Asia/Bangkok');
    formattedtbDateF = tbDateF_.format('YYYY-MM-DD');
    dateF = new Date(formattedtbDateF);
    formattedDateF = `${dateF.getUTCFullYear()}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${String(dateF.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateF_ = '';
    formattedtbDateF = '';
    dateF = '';
    formattedDateF = null;
  }
  //--------------------------------------
  if ((tbDateT !== undefined && tbDateT !== '' && tbDateT !== null)) {
    tbDateT_ = moment.tz(tbDateT, 'Asia/Bangkok');
    formattedtbDateT = tbDateT_.format('YYYY-MM-DD');
    dateT = new Date(formattedtbDateT);
    formattedDateT = `${dateT.getUTCFullYear()}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${String(dateT.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateT_ = '';
    formattedtbDateT = '';
    dateT = '';
    formattedDateT = null;
  }

  approve_status
  console.log('approve_status: ', approve_status);
  let approve_status_ =
    approve_status !== undefined && approve_status !== '' && approve_status !== null ? approve_status : null;
  let requestor_id_ =
    requestor_id !== undefined && requestor_id !== '' && requestor_id !== null && !isNaN(requestor_id)
      ? parseInt(requestor_id)
      : null;
  let area_id_ =
    area_id !== undefined && area_id !== '' && area_id !== null && !isNaN(area_id)
      ? parseInt(area_id)
      : null;
  let requestor_dept_id_ =
    requestor_dept_id !== undefined &&
      requestor_dept_id !== '' &&
      requestor_dept_id !== null &&
      !isNaN(requestor_dept_id)
      ? parseInt(requestor_dept_id)
      : null;

  try {
    let pool = await sql.connect(config);

    console.log('get_search_vrf_list requestor_id_: ', requestor_id_, 'area_id_: ', area_id_
      , 'requestor_dept_id_: ', requestor_dept_id_
      , 'formattedDateF: ', formattedDateF
      , 'formattedDateT: ', formattedDateT
      , 'approve_status: ', approve_status_
      , 'branch_id: ', branch_id
    );
    // สร้าง request และเพิ่ม input parameters
    let request = pool.request();
    request.input('formattedDateF', sql.Date, formattedDateF);
    request.input('formattedDateT', sql.Date, formattedDateT);
    request.input('requestor_dept_id', sql.Int, requestor_dept_id_);
    request.input('branch_id', sql.Int, branch_id);
    request.input('requestor_id', sql.Int, requestor_id_);
    request.input('area_id', sql.Int, area_id_);
    request.input('approve_status', sql.NVarChar, approve_status_);

    // เรียกใช้ stored procedure
    let result = await request.execute('spGet_search_vrf_list');
    console.log('result.recordset: ', result.recordset); // Output the result

    return result.recordset;
  } catch (error) {
    console.log('error: ', error);
    return [{ error: error }];
  }
}
async function get_search_vrf_trans(
  tbDateF,
  tbDateT,
  requestor_id,
  area_id,
  requestor_dept_id,
  department_id,
  branch_id,
  checkin_status,
  role_id,
  approve_status
) {
  let tbDateF_;
  let formattedtbDateF;
  let tbDateT_;
  let formattedtbDateT;

  let dateF
  let dateT
  let formattedDateF
  let formattedDateT

  if ((tbDateF !== undefined && tbDateF !== '' && tbDateF !== null)) {
    tbDateF_ = moment.tz(tbDateF, 'Asia/Bangkok');
    formattedtbDateF = tbDateF_.format('YYYY-MM-DD');
    dateF = new Date(formattedtbDateF);
    formattedDateF = `${dateF.getUTCFullYear()}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${String(dateF.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateF_ = '';
    formattedtbDateF = '';
    dateF = '';
    formattedDateF = null;
  }
  //--------------------------------------
  if ((tbDateT !== undefined && tbDateT !== '' && tbDateT !== null)) {
    tbDateT_ = moment.tz(tbDateT, 'Asia/Bangkok');
    formattedtbDateT = tbDateT_.format('YYYY-MM-DD');
    dateT = new Date(formattedtbDateT);
    formattedDateT = `${dateT.getUTCFullYear()}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${String(dateT.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateT_ = '';
    formattedtbDateT = '';
    dateT = '';
    formattedDateT = null;
  }
  let checkin_status_ =
    checkin_status !== undefined && checkin_status !== '' && checkin_status !== null && !isNaN(checkin_status)
      ? parseInt(checkin_status)
      : null;
  let approve_status_ =
    approve_status !== undefined && approve_status !== '' && approve_status !== null && !isNaN(approve_status)
      ? approve_status
      : null;
  let requestor_id_ =
    requestor_id !== undefined && requestor_id !== '' && requestor_id !== null && !isNaN(requestor_id)
      ? parseInt(requestor_id)
      : null;
  let area_id_ =
    area_id !== undefined && area_id !== '' && area_id !== null && !isNaN(area_id)
      ? parseInt(area_id)
      : null;
  let requestor_dept_id_ =
    requestor_dept_id !== undefined &&
      requestor_dept_id !== '' &&
      requestor_dept_id !== null &&
      !isNaN(requestor_dept_id)
      ? parseInt(requestor_dept_id)
      : null;

  try {
    let pool = await sql.connect(config);

    console.log('get_search_vrf_trans checkin_status_: ', checkin_status_, 'requestor_id_: ', requestor_id_, 'area_id_: ', area_id_
      , 'requestor_dept_id_: ', requestor_dept_id_
      , 'formattedDateF: ', formattedDateF
      , 'formattedDateT: ', formattedDateT
      , 'approve_status: ', approve_status
      , 'role_id: ', role_id);
    // สร้าง request และเพิ่ม input parameters
    let request = pool.request();
    request.input('formattedDateF', sql.Date, formattedDateF);
    request.input('formattedDateT', sql.Date, formattedDateT);
    request.input('requestor_dept_id', sql.Int, requestor_dept_id_);
    request.input('branch_id', sql.Int, branch_id);
    request.input('requestor_id', sql.Int, requestor_id_);
    request.input('area_id', sql.Int, area_id_);
    request.input('checkin_status', sql.Int, checkin_status_);
    request.input('approve_status', sql.NVarChar, approve_status_);
    request.input('role_id', sql.Int, role_id);

    // เรียกใช้ stored procedure
    let result = await request.execute('spGet_search_approve_vrf');

    return result.recordset;
  } catch (error) {
    console.log('error: ', error);
    return [{ error: error }];
  }

}
async function get_search_vrf_approve_trans(
  tbDateF,
  tbDateT,
  requestor_id,
  area_id,
  requestor_dept_id,
  department_id,
  branch_id,
  checkin_status,
  role_id,
  approve_status
) {
  let tbDateF_;
  let formattedtbDateF;
  let tbDateT_;
  let formattedtbDateT;

  let dateF
  let dateT
  let formattedDateF
  let formattedDateT

  if ((tbDateF !== undefined && tbDateF !== '' && tbDateF !== null)) {
    tbDateF_ = moment.tz(tbDateF, 'Asia/Bangkok');
    formattedtbDateF = tbDateF_.format('YYYY-MM-DD');
    dateF = new Date(formattedtbDateF);
    formattedDateF = `${dateF.getUTCFullYear()}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${String(dateF.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateF_ = '';
    formattedtbDateF = '';
    dateF = '';
    formattedDateF = null;
  }
  //--------------------------------------
  if ((tbDateT !== undefined && tbDateT !== '' && tbDateT !== null)) {
    tbDateT_ = moment.tz(tbDateT, 'Asia/Bangkok');
    formattedtbDateT = tbDateT_.format('YYYY-MM-DD');
    dateT = new Date(formattedtbDateT);
    formattedDateT = `${dateT.getUTCFullYear()}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${String(dateT.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateT_ = '';
    formattedtbDateT = '';
    dateT = '';
    formattedDateT = null;
  }
  let checkin_status_ =
    checkin_status !== undefined && checkin_status !== '' && checkin_status !== null && !isNaN(checkin_status)
      ? parseInt(checkin_status)
      : null;
  let approve_status_ =
    approve_status !== undefined && approve_status !== '' && approve_status !== null && !isNaN(approve_status)
      ? approve_status
      : null;
  let requestor_id_ =
    requestor_id !== undefined && requestor_id !== '' && requestor_id !== null && !isNaN(requestor_id)
      ? parseInt(requestor_id)
      : null;
  let area_id_ =
    area_id !== undefined && area_id !== '' && area_id !== null && !isNaN(area_id)
      ? parseInt(area_id)
      : null;
  let requestor_dept_id_ =
    requestor_dept_id !== undefined &&
      requestor_dept_id !== '' &&
      requestor_dept_id !== null &&
      !isNaN(requestor_dept_id)
      ? parseInt(requestor_dept_id)
      : null;

  try {
    let pool = await sql.connect(config);

    console.log('get_search_vrf_approve_trans checkin_status_: ', checkin_status_, 'requestor_id_: ', requestor_id_, 'area_id_: ', area_id_
      , 'requestor_dept_id_: ', requestor_dept_id_
      , 'formattedDateF: ', formattedDateF
      , 'formattedDateT: ', formattedDateT
      , 'approve_status: ', approve_status
      , 'role_id: ', role_id);
    // สร้าง request และเพิ่ม input parameters
    let request = pool.request();
    request.input('formattedDateF', sql.Date, formattedDateF);
    request.input('formattedDateT', sql.Date, formattedDateT);
    request.input('requestor_dept_id', sql.Int, requestor_dept_id_);
    request.input('branch_id', sql.Int, branch_id);
    request.input('requestor_id', sql.Int, requestor_id_);
    request.input('area_id', sql.Int, area_id_);
    request.input('checkin_status', sql.Int, checkin_status_);
    request.input('approve_status', sql.NVarChar, approve_status_);
    request.input('role_id', sql.Int, role_id);

    // เรียกใช้ stored procedure
    let result = await request.execute('spGet_search_approve_vrf');

    return result.recordset;
  } catch (error) {
    console.log('error: ', error);
    return [{ error: error }];
  }

}
async function get_search_vrf_for_guard(
  tbDateF,
  tbDateT,
  requestor_id,
  area_id,
  requestor_dept_id,
  department_id,
  branch_id,
  checkin_status,
  role_id,
  approve_status,
  contactor,
  requestor,
  card_no
) {
  let tbDateF_;
  let formattedtbDateF;
  let tbDateT_;
  let formattedtbDateT;

  let dateF
  let dateT
  let formattedDateF
  let formattedDateT

  if ((tbDateF !== undefined && tbDateF !== '' && tbDateF !== null)) {
    tbDateF_ = moment.tz(tbDateF, 'Asia/Bangkok');
    formattedtbDateF = tbDateF_.format('YYYY-MM-DD');
    dateF = new Date(formattedtbDateF);
    formattedDateF = `${dateF.getUTCFullYear()}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${String(dateF.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateF_ = '';
    formattedtbDateF = '';
    dateF = '';
    formattedDateF = null;
  }
  //--------------------------------------
  if ((tbDateT !== undefined && tbDateT !== '' && tbDateT !== null)) {
    tbDateT_ = moment.tz(tbDateT, 'Asia/Bangkok');
    formattedtbDateT = tbDateT_.format('YYYY-MM-DD');
    dateT = new Date(formattedtbDateT);
    formattedDateT = `${dateT.getUTCFullYear()}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${String(dateT.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateT_ = '';
    formattedtbDateT = '';
    dateT = '';
    formattedDateT = null;
  }
  let checkin_status_ = checkin_status ? parseInt(checkin_status) : null;    
  // let checkin_status_ =
  //     checkin_status !== undefined && checkin_status !== '' && checkin_status !== null && !isNaN(checkin_status)
  //       ? parseInt(checkin_status)
  //       : null;
  let approve_status_ = approve_status ? approve_status : null;
    
  // let approve_status_ =
  //   approve_status !== undefined && approve_status !== '' && approve_status !== null && !isNaN(approve_status)
  //     ? approve_status
  //     : null;
  let contactor_ = contactor ? contactor : null;
  // let contactor_ =
  //     contactor !== undefined && contactor !== '' && contactor !== null && !isNaN(contactor)
  //       ? contactor
  //       : null;
  let requestor_id_ = requestor_id ? parseInt(requestor_id) : null;
  // let requestor_id_ =
  //   requestor_id !== undefined && requestor_id !== '' && requestor_id !== null && !isNaN(requestor_id)
  //     ? parseInt(requestor_id)
  //     : null;
  let area_id_ =
    area_id ? parseInt(area_id) : null;
  // let area_id_ =
  //     area_id !== undefined && area_id !== '' && area_id !== null && !isNaN(area_id)
  //       ? parseInt(area_id)
  //       : null;    
  let requestor_dept_id_ =
    requestor_dept_id ? parseInt(requestor_dept_id) : null;
      // let requestor_dept_id_ =
      // requestor_dept_id !== undefined &&
      //   requestor_dept_id !== '' &&
      //   requestor_dept_id !== null &&
      //   !isNaN(requestor_dept_id)
      //   ? parseInt(requestor_dept_id)
      //   : null; 
  let requestor_ = requestor ? requestor : null;
  let card_no_ = card_no ? card_no : null;    

  try {
    let pool = await sql.connect(config);

    console.log('get_search_vrf_for_guard checkin_status_: ', checkin_status_, 'requestor_id_: ', requestor_id_, 'area_id_: ', area_id_
      , 'requestor_dept_id_: ', requestor_dept_id_
      , 'formattedDateF: ', formattedDateF
      , 'formattedDateT: ', formattedDateT
      , 'approve_status: ', approve_status
      , 'role_id: ', role_id
      , 'contactor: ', contactor_
      , 'contactor: ', contactor
      , 'branch_id: ', branch_id
      , 'requestor_: ', requestor_
      , 'card_no_: ', card_no_
    );
    // สร้าง request และเพิ่ม input parameters
    let request = pool.request();
    request.input('formattedDateF', sql.Date, formattedDateF);
    request.input('formattedDateT', sql.Date, formattedDateT);
    request.input('requestor_dept_id', sql.Int, requestor_dept_id_);
    request.input('branch_id', sql.Int, branch_id);
    request.input('requestor_id', sql.Int, requestor_id_);
    request.input('area_id', sql.Int, area_id_);
    request.input('checkin_status', sql.Int, checkin_status_);
    request.input('approve_status', sql.NVarChar, approve_status_);
    request.input('contactor', sql.NVarChar, contactor_);
    request.input('requestor', sql.NVarChar, requestor_);
    request.input('card_no', sql.NVarChar, card_no_);


    // เรียกใช้ stored procedure
    let result = await request.execute('spGet_search_vrf_for_guard');

    return result.recordset;
  } catch (error) {
    console.log('error: ', error);
    return [{ error: error }];
  }

}
async function get_search_vrf_list(
  tbDateF,
  tbDateT,
  requestor_id,
  area_id,
  requestor_dept_id,
  branch_id,
  approve_status
) {
  let tbDateF_;
  let formattedtbDateF;
  let tbDateT_;
  let formattedtbDateT;

  let dateF
  let dateT
  let formattedDateF
  let formattedDateT

  if ((tbDateF !== undefined && tbDateF !== '' && tbDateF !== null)) {
    tbDateF_ = moment.tz(tbDateF, 'Asia/Bangkok');
    formattedtbDateF = tbDateF_.format('YYYY-MM-DD');
    dateF = new Date(formattedtbDateF);
    formattedDateF = `${dateF.getUTCFullYear()}-${String(dateF.getUTCMonth() + 1).padStart(2, '0')}-${String(dateF.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateF_ = '';
    formattedtbDateF = '';
    dateF = '';
    formattedDateF = null;
  }
  //--------------------------------------
  if ((tbDateT !== undefined && tbDateT !== '' && tbDateT !== null)) {
    tbDateT_ = moment.tz(tbDateT, 'Asia/Bangkok');
    formattedtbDateT = tbDateT_.format('YYYY-MM-DD');
    dateT = new Date(formattedtbDateT);
    formattedDateT = `${dateT.getUTCFullYear()}-${String(dateT.getUTCMonth() + 1).padStart(2, '0')}-${String(dateT.getUTCDate()).padStart(2, '0')}`;
  } else {
    tbDateT_ = '';
    formattedtbDateT = '';
    dateT = '';
    formattedDateT = null;
  }
  console.log('approve_status: ', approve_status);
  let approve_status_ =
    approve_status !== undefined && approve_status !== '' && approve_status !== null ? approve_status : null;
  let requestor_id_ =
    requestor_id !== undefined && requestor_id !== '' && requestor_id !== null && !isNaN(requestor_id)
      ? parseInt(requestor_id)
      : null;
  let area_id_ =
    area_id !== undefined && area_id !== '' && area_id !== null && !isNaN(area_id)
      ? parseInt(area_id)
      : null;
  let requestor_dept_id_ =
    requestor_dept_id !== undefined &&
      requestor_dept_id !== '' &&
      requestor_dept_id !== null &&
      !isNaN(requestor_dept_id)
      ? parseInt(requestor_dept_id)
      : null;

  try {
    let pool = await sql.connect(config);

    console.log('get_search_vrf_list requestor_id_: ', requestor_id_, 'area_id_: ', area_id_
      , 'requestor_dept_id_: ', requestor_dept_id_
      , 'formattedDateF: ', formattedDateF
      , 'formattedDateT: ', formattedDateT
      , 'approve_status: ', approve_status_
      , 'branch_id: ', branch_id
    );
    // สร้าง request และเพิ่ม input parameters
    let request = pool.request();
    request.input('formattedDateF', sql.Date, formattedDateF);
    request.input('formattedDateT', sql.Date, formattedDateT);
    request.input('requestor_dept_id', sql.Int, requestor_dept_id_);
    request.input('branch_id', sql.Int, branch_id);
    request.input('requestor_id', sql.Int, requestor_id_);
    request.input('area_id', sql.Int, area_id_);
    request.input('approve_status', sql.NVarChar, approve_status_);

    // เรียกใช้ stored procedure
    let result = await request.execute('spGet_search_vrf_list');
    console.log('result.recordset: ', result.recordset); // Output the result

    return result.recordset;
  } catch (error) {
    console.log('error: ', error);
    return [{ error: error }];
  }

}
async function get_search_user_vrf_by_dept(
  user_id,
  first_name,
  last_name,
  username,
  employee_id,
  email,
  position_id,
  department_id,
  branch_id,
  role_id,
  division_id
) {
  try {
    let pool = await sql.connect(config);

    let queryString = `select ROW_NUMBER() OVER(ORDER BY uvf.[user_id] desc) AS [no], * from vUserVRF uvf WHERE uvf.[Status] = '1' `;
    first_name ? (queryString += ` AND uvf.first_name like '%${first_name.trim()}%' `) : (queryString += ``);
    last_name ? (queryString += ` and uvf.last_name like '%${last_name.trim()}%' `) : (queryString += ``);
    username ? (queryString += ` and uvf.username like '%${username.trim()}%' `) : (queryString += ``);
    employee_id ? (queryString += ` and uvf.employee_id = ${employee_id} `) : (queryString += ``);
    email ? (queryString += ` and uvf.email like '%${email.trim()}%' `) : (queryString += ``);
    position_id ? (queryString += ` and uvf.position_id = ${position_id} `) : (queryString += ``);
    queryString += ` and uvf.department_id = ${department_id} `;
    queryString += ` and uvf.branch_id = ${branch_id} `;
    role_id ? (queryString += ` and uvf.role_id = ${role_id} `) : (queryString += ``);
    queryString += ` and uvf.division_id = ${division_id}  `;
    queryString += ` order by uvf.[USER_ID] desc `;
    console.log('queryString: ', queryString);
    let result = await pool.request().query(queryString);
    return result.recordset;
  } catch (error) {
    console.log('error: ', error);
    return [{ error: error }];
  }
}
async function get_search_user_vrf(
  user_id,
  first_name,
  last_name,
  username,
  employee_id,
  email,
  position_id,
  department_id,
  branch_id,
  role_id,
  division_id
) {
  try {
    let pool = await sql.connect(config);

    let queryString = `select ROW_NUMBER() OVER(ORDER BY uvf.[user_id] desc) AS [no], * from vUserVRF uvf WHERE uvf.[Status] = '1' `;
    first_name ? (queryString += ` AND uvf.first_name like '%${first_name.trim()}%' `) : (queryString += ``);
    last_name ? (queryString += ` and uvf.last_name like '%${last_name.trim()}%' `) : (queryString += ``);
    username ? (queryString += ` and uvf.username like '%${username.trim()}%' `) : (queryString += ``);
    employee_id ? (queryString += ` and uvf.employee_id = ${employee_id} `) : (queryString += ``);
    email ? (queryString += ` and uvf.email like '%${email.trim()}%' `) : (queryString += ``);
    position_id ? (queryString += ` and uvf.position_id = ${position_id} `) : (queryString += ``);
    department_id ? (queryString += ` and uvf.department_id = ${department_id} `) : (queryString += ``);
    branch_id ? (queryString += ` and uvf.branch_id = ${branch_id} `) : (queryString += ``);
    role_id ? (queryString += ` and uvf.role_id = ${role_id} `) : (queryString += ``);
    division_id ? (queryString += ` and uvf.division_id = ${division_id}  `) : (queryString += ``);
    queryString += ` order by uvf.[USER_ID] desc `;
    console.log('queryString: ', queryString);
    let result = await pool.request().query(queryString);
    return result.recordset;
  } catch (error) {
    console.log('error: ', error);
    return [{ error: error }];
  }
}
async function get_templete_vrf_list(
  department_id,
  branch_id
) {

  try {
    let pool = await sql.connect(config);
    // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) and o.[status]='Y' order by AutoID desc");
    let spTemplete_vrf_list = await pool
      .request()
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .execute("spTemplete_vrf_list");
    return spTemplete_vrf_list.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vrf_lst_for_security(
  department_id,
  branch_id,
  role_id,
  division_id
) {
  try {
    let pool = await sql.connect(config);
    // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) and o.[status]='Y' order by AutoID desc");
    console.log('get_vrf_lst_for_security department_id: '
    , department_id , 'branch_id: '
    , branch_id , 'role_id: '
    , role_id , 'division_id: ', division_id)       
    let spGet_vrf_lst_for_security = await pool
      .request()
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .input("role_id", sql.Int, role_id)
      .input("division_id", sql.Int, division_id)
      .execute("spGet_vrf_lst_for_security");
    return spGet_vrf_lst_for_security.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vrf_approve_list(
  department_id,
  branch_id,
  role_id,
  division_id
) {
  try {
    let pool = await sql.connect(config);
    // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) and o.[status]='Y' order by AutoID desc");
    let spGet_vrf_approve_list = await pool
      .request()
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .input("role_id", sql.Int, role_id)
      .input("division_id", sql.Int, division_id)
      .execute("spGet_vrf_approve_list");
    return spGet_vrf_approve_list.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_data_approve_list_for_security(
  department_id,
  branch_id,
  role_id,
  division_id,
  Id
) {
  try {
    let pool = await sql.connect(config);
    // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) and o.[status]='Y' order by AutoID desc");
    console.log('get_data_approve_list_for_security department_id: ', department_id
      , 'branch_id: ', branch_id
      , 'role_id: ', role_id
      , 'division_id: ', division_id
      , 'Id: ', Id)
    let spGet_data_approve_list = await pool
      .request()
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .input("role_id", sql.Int, role_id)
      .input("division_id", sql.Int, division_id)
      .input("Id", sql.Int, Id)
      .execute("spGet_data_approve_list_for_security");
    return spGet_data_approve_list.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_data_approve_list(
  department_id,
  branch_id,
  role_id,
  division_id,
  Id
) {
  try {
    let pool = await sql.connect(config);
    // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) and o.[status]='Y' order by AutoID desc");
    console.log('get_data_approve_list department_id: ', department_id
      , 'branch_id: ', branch_id
      , 'role_id: ', role_id
      , 'division_id: ', division_id
      , 'Id: ', Id)
    let spGet_data_approve_list = await pool
      .request()
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .input("role_id", sql.Int, role_id)
      .input("division_id", sql.Int, division_id)
      .input("Id", sql.Int, Id)
      .execute("spGet_data_approve_list");
    return spGet_data_approve_list.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_user_list_by_dept(
  division_id,
  department_id,
  branch_id
) {

  try {
    let pool = await sql.connect(config);
    let sp_UserLst_by_dept = await pool
      .request()
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .input("division_id", sql.Int, division_id)
      .execute("sp_UserLst_by_dept");
    return sp_UserLst_by_dept.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_user_list(
  // department_id,
  // branch_id
) {

  try {
    let pool = await sql.connect(config);
    let sp_UserLst = await pool
      .request()
      // .input("department_id", sql.Int, department_id)
      // .input("branch_id", sql.Int, branch_id)
      .execute("sp_UserLst");
    return sp_UserLst.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_all_vrf_list(
  department_id,
  branch_id
) {
  try {
    let pool = await sql.connect(config);
    // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) and o.[status]='Y' order by AutoID desc");
    let spGet_all_vrf_list = await pool
      .request()
      // .input("department_id", sql.Int, department_id)
      // .input("branch_id", sql.Int, branch_id)
      .execute("spGet_all_vrf_list");
    return spGet_all_vrf_list.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vrf_list(
  department_id,
  branch_id
) {

  try {
    let pool = await sql.connect(config);
    // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) and o.[status]='Y' order by AutoID desc");
    let spGet_vrf_list = await pool
      .request()
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .execute("spGet_vrf_list");
    return spGet_vrf_list.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vrf_det(Id) {
  try {
    let pool = await sql.connect(config);
    let sp_Get_vrf_det_by_selected = await pool
      .request()
      .input("id", sql.Int, Id)
      .execute("sp_Get_vrf_det_by_selected");
    return sp_Get_vrf_det_by_selected.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vrf_security_det(Id) {
  console.log('get_vrf_security_det Id: ', Id)
  try {
    let pool = await sql.connect(config);
    let sp_Get_vrf_security_det_by_selected = await pool
      .request()
      .input("id", sql.Int, Id)
      .execute("sp_Get_vrf_security_det_by_selected");
    return sp_Get_vrf_security_det_by_selected.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_currentDateTime(Id) {
  console.log('get_vrf_security_det Id: ', Id)
  try {
    let pool = await sql.connect(config);
    let sp_Get_CheckInCurrenTime = await pool
      .request()
      //.input("id", sql.Int, Id)
      .execute("sp_Get_CheckInCurrenTime");
    return sp_Get_CheckInCurrenTime.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_templete_vrf_det(Id) {
  try {
    let pool = await sql.connect(config);
    let sp_Get_templete_vrf_det = await pool
      .request()
      .input("id", sql.Int, Id)
      .execute("sp_Get_templete_vrf_det");
    return sp_Get_templete_vrf_det.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vrf(Id) {
  try {
    let pool = await sql.connect(config);
    let sp_Get_vrf_by_selected = await pool
      .request()
      .input("id", sql.Int, Id)
      .execute("sp_Get_vrf_by_selected");
    return sp_Get_vrf_by_selected.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_vrf_apprve_page(Id, user_id) {
  try {
    let pool = await sql.connect(config);
    let sp_Get_vrf_apprve_page = await pool
      .request()
      .input("id", sql.Int, Id)
      .input("user_id", sql.Int, user_id)
      .execute("sp_Get_vrf_apprve_page");
    return sp_Get_vrf_apprve_page.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_uservrf_info(user_id) {
  try {
    let pool = await sql.connect(config);
    let sp_Get_Uservrf_selected = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .execute("sp_Get_Uservrf_selected");
    return sp_Get_Uservrf_selected.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_mail_info_next_approve(Id) {
  try {
    let pool = await sql.connect(config);
    let spGet_mail_info_next_approve = await pool
      .request()
      .input("id", sql.Int, Id)
      .execute("spGet_mail_info_next_approve");
    return spGet_mail_info_next_approve.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_mail_info_final_approve(Id) {
  try {
    let pool = await sql.connect(config);
    let spGet_mail_info_final_approve = await pool
      .request()
      .input("id", sql.Int, Id)
      .execute("spGet_mail_info_final_approve");
    return spGet_mail_info_final_approve.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_mail_vrf_info(Id
  , department_id
  , branch_id
  , division_id) {
  try {
    let pool = await sql.connect(config);
    let spGet_mail_vrf_info = await pool
      .request()
      .input("id", sql.Int, Id)
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .input("division_id", sql.Int, division_id)
      .execute("spGet_mail_vrf_info");
    return spGet_mail_vrf_info.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getEmail_recipient(Id) {
  try {
    let pool = await sql.connect(config);
    let spGetEmail_recipient = await pool
      .request()
      .input("id", sql.Int, Id)
      .execute("spGetEmail_recipient");
    return spGetEmail_recipient.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_templete_vrf(Id) {
  try {
    let pool = await sql.connect(config);
    let sp_Get_templete_vrf = await pool
      .request()
      .input("id", sql.Int, Id)
      .execute("sp_Get_templete_vrf");
    return sp_Get_templete_vrf.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getCashOrder(Id) {
  try {
    let pool = await sql.connect(config);
    let spGetCashOrder = await pool
      .request()
      .input("input_id", sql.Int, Id)
      // .query("select * from [dbo].[gfccp_order] where AutoID = @input_id");
      .execute("spGetCashOrder");
    return spGetCashOrder.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getuserinfo(data_all) {
  let jobid = data_all["jobid"];
  let password = data_all["password"];
  console.log("jobid: ", jobid);
  try {
    let pool = await sql.connect(config);
    let spCheckUser = await pool
      .request()
      .input("username", sql.NVarChar, jobid)
      .input("password", sql.NVarChar, password)
      .execute("spCheckUser");
    return spCheckUser.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function set_add_user_vrf(obj_json) {
  let output_ = null;
  let output = null;
  console.log("set_add_user_vrf obj_json: ", obj_json);
  console.log("set_add_user_vrf obj_json.reason: ", obj_json.reason);
  try {
    let pool = await sql.connect(config);
    let spAdd_user_vrf = await pool
      .request()
      .input("CreateBy", sql.NVarChar, obj_json.user_id)
      .input("employee_id", sql.NVarChar, obj_json.employee_id)
      .input("email", sql.NVarChar, obj_json.email)
      .input("username", sql.NVarChar, obj_json.username)
      .input("first_name", sql.NVarChar, obj_json.first_name)
      .input("last_name", sql.NVarChar, obj_json.last_name)
      .input("division_id", sql.Int, obj_json.division_id)
      .input("department_id", sql.Int, obj_json.department_id)
      .input("position_id", sql.Int, obj_json.position_id)
      .input("role_id", sql.Int, obj_json.role_id)
      .input("branch_id", sql.Int, obj_json.branch_id)
      .execute("spAdd_user_vrf");
    output_ = spAdd_user_vrf.recordsets;
    output_ = output_[0];
    output = output_[0];
    return output[''];
  } catch (err) {
    console.log(err);
  }
}
async function set_manual_add_vrf_trans(obj_json) {
  let output_ = null;
  let output = null;
  console.log("set_manual_add_vrf_trans obj_json: ", obj_json);
  console.log("set_manual_add_vrf_trans obj_json.reason: ", obj_json.reason);
  try {
    let pool = await sql.connect(config);
    let spAdd_vrf = await pool
      .request()
      .input("reason", sql.NVarChar, obj_json.reason)
      .input("contactor", sql.NVarChar, obj_json.contactor)
      .input("requestor", sql.Int, obj_json.requestor)
      .input("requestor_position", sql.Int, obj_json.requestor_position)
      .input("requestor_dept", sql.Int, obj_json.requestor_dept)
      .input("requestor_phone", sql.NVarChar, obj_json.requestor_phone)
      .input("navigator", sql.Int, obj_json.navigator)
      .input("area", sql.Int, obj_json.area)
      .input("attach_file", sql.NVarChar, obj_json.file_name)
      .input("attach_file_origin", sql.NVarChar, obj_json.file_originalname)
      .input("templete_id", sql.NVarChar, obj_json.templete_id)
      .input("createby", sql.NVarChar, obj_json.createby)
      .input("date_from", sql.DateTime, obj_json.date_from)
      .input("date_to", sql.DateTime, obj_json.date_to)
      .execute("spAdd_vrf");
    output_ = spAdd_vrf.recordsets;
    output_ = output_[0];
    output = output_[0];
    return output[''];
  } catch (err) {
    console.log(err);
  }
}
async function set_manual_add_vrf(obj_json) {
  let output_ = null;
  let output = null;
  try {
    let pool = await sql.connect(config);
    let spAdd_vrf_template = await pool
      .request()
      .input("template_name", sql.NVarChar, obj_json.template_name)
      .input("reason", sql.NVarChar, obj_json.reason)
      .input("contactor", sql.NVarChar, obj_json.contactor)
      .input("requestor", sql.Int, obj_json.requestor)
      .input("requestor_position", sql.Int, obj_json.requestor_position)
      .input("requestor_dept", sql.Int, obj_json.requestor_dept)
      .input("requestor_phone", sql.NVarChar, obj_json.requestor_phone)
      .input("navigator", sql.Int, obj_json.navigator)
      .input("area", sql.Int, obj_json.area)
      .input("date_from", sql.DateTime, obj_json.date_from)
      .input("date_to", sql.DateTime, obj_json.date_to)
      .input("createby", sql.NVarChar, obj_json.user_id)
      .execute("spAdd_vrf_template");
    output_ = spAdd_vrf_template.recordsets;
    output_ = output_[0];
    output = output_[0];
    return output[''];
  } catch (err) {
    console.log(err);
  }
}
async function set_manual_add_vrf_trans_det(obj_json) {
  console.log("set_manual_add_vrf_trans_det: obj_json", obj_json);
  let output
  let newid = obj_json.newid;
  try {
    for (let key in obj_json) {
      if (key !== 'newid') {
        // console.log("key: ", key, "value: ", obj_json[key]);
        // console.log("obj_json[key].tbDateF ", obj_json[key].tbDateF);
        let pool = await sql.connect(config);
        let spAdd_vrf_det = await pool
          .request()
          .input("vrf_id", sql.Int, newid)
          .input("fullname", sql.NVarChar, obj_json[key].tbFullName)
          .input("vehicle_registration", sql.NVarChar, obj_json[key].tbVehicle_Registration)
          .input("vehicle_brand", sql.Int, obj_json[key].ddlvehicle_brand)
          .input("vehicle_color", sql.Int, obj_json[key].ddlvehicle_color)
          .input("card_no", sql.NVarChar, obj_json[key].tbCardNo)
          .input("createby", sql.NVarChar, obj_json[key].user_id)
          .execute("spAdd_vrf_det");
        output = spAdd_vrf_det.recordsets;
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    return ({ state: 1 })
  }
  //return({state:1})	 
}
async function set_manual_add_vrf_det(obj_json) {
  // let obj_json = JSON.parse(obj);
  console.log("obj_json.newid: ", obj_json.newid);
  // let length = Object.keys(obj_json).length;
  let output
  let newid = obj_json.newid;
  try {
    for (let key in obj_json) {
      if (key !== 'newid') {
        // console.log("key: ", key, "value: ", obj_json[key]);
        // console.log("obj_json[key].tbDateF ", obj_json[key].tbDateF);
        let pool = await sql.connect(config);
        let spAdd_vrf_template_det = await pool
          .request()
          .input("vrf_id", sql.Int, newid)
          .input("fullname", sql.NVarChar, obj_json[key].tbFullName)
          .input("vehicle_registration", sql.NVarChar, obj_json[key].tbVehicle_Registration)
          .input("vehicle_brand", sql.Int, obj_json[key].ddlvehicle_brand)
          .input("vehicle_color", sql.Int, obj_json[key].ddlvehicle_color)
          .input("card_no", sql.NVarChar, obj_json[key].tbCardNo)
          .input("createby", sql.NVarChar, obj_json[key].user_id)
          .execute("spAdd_vrf_template_det");
        output = spAdd_vrf_template_det.recordsets;
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    return ({ state: 1 })
  }
}
async function add_manual_order(gfccp_order) {
  let NULL_ = null;
  let FLOAT_NULL_ = 0;
  let roleid = gfccp_order["roleid"];
  let approve_setting_id = gfccp_order["approve_setting_id"];
  let approve_setting_version = gfccp_order["approve_setting_version"];
  let customerID = gfccp_order["customerID"];
  let order_category = gfccp_order["order_category"];
  let servicetype = gfccp_order["servicetype"];
  let refno = gfccp_order["refno"] !== undefined ? gfccp_order["refno"] : NULL_;
  let order_date = gfccp_order["order_date"];
  let branchorigin_code = gfccp_order["branchorigin_code"];
  let branchorigin_name = gfccp_order["branchorigin_name"];
  let branchdest_code = gfccp_order["branchdest_code"];
  let branchdest_name = gfccp_order["branchdest_name"];
  let remark =
    gfccp_order["remark"] !== undefined ? gfccp_order["remark"] : NULL_;
  //---note
  let note_new_1000 =
    gfccp_order["note_new_1000"] !== undefined
      ? parseFloat(gfccp_order["note_new_1000"])
      : FLOAT_NULL_;
  let note_new_500 =
    gfccp_order["note_new_500"] !== undefined
      ? parseFloat(gfccp_order["note_new_500"])
      : FLOAT_NULL_;
  let note_new_100 =
    gfccp_order["note_new_100"] !== undefined
      ? parseFloat(gfccp_order["note_new_100"])
      : FLOAT_NULL_;
  let note_new_50 =
    gfccp_order["note_new_50"] !== undefined
      ? parseFloat(gfccp_order["note_new_50"])
      : FLOAT_NULL_;
  let note_new_20 =
    gfccp_order["note_new_20"] !== undefined
      ? parseFloat(gfccp_order["note_new_20"])
      : FLOAT_NULL_;
  let note_new_10 =
    gfccp_order["note_new_10"] !== undefined
      ? parseFloat(gfccp_order["note_new_10"])
      : FLOAT_NULL_;
  let note_fit_1000 =
    gfccp_order["note_fit_1000"] !== undefined
      ? parseFloat(gfccp_order["note_fit_1000"])
      : FLOAT_NULL_;
  let note_fit_500 =
    gfccp_order["note_fit_500"] !== undefined
      ? parseFloat(gfccp_order["note_fit_500"])
      : FLOAT_NULL_;
  let note_fit_100 =
    gfccp_order["note_fit_100"] !== undefined
      ? parseFloat(gfccp_order["note_fit_100"])
      : FLOAT_NULL_;
  let note_fit_50 =
    gfccp_order["note_fit_50"] !== undefined
      ? parseFloat(gfccp_order["note_fit_50"])
      : FLOAT_NULL_;
  let note_fit_20 =
    gfccp_order["note_fit_20"] !== undefined
      ? parseFloat(gfccp_order["note_fit_20"])
      : FLOAT_NULL_;
  let note_fit_10 =
    gfccp_order["note_fit_10"] !== undefined
      ? parseFloat(gfccp_order["note_fit_10"])
      : FLOAT_NULL_;
  let note_uncount_1000 =
    gfccp_order["note_uncount_1000"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_1000"])
      : FLOAT_NULL_;
  let note_uncount_500 =
    gfccp_order["note_uncount_500"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_500"])
      : FLOAT_NULL_;
  let note_uncount_100 =
    gfccp_order["note_uncount_100"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_100"])
      : FLOAT_NULL_;
  let note_uncount_50 =
    gfccp_order["note_uncount_50"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_50"])
      : FLOAT_NULL_;
  let note_uncount_20 =
    gfccp_order["note_uncount_20"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_20"])
      : FLOAT_NULL_;
  let note_uncount_10 =
    gfccp_order["note_uncount_10"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_10"])
      : FLOAT_NULL_;
  let note_unfit_1000 =
    gfccp_order["note_unfit_1000"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_1000"])
      : FLOAT_NULL_;
  let note_unfit_500 =
    gfccp_order["note_unfit_500"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_500"])
      : FLOAT_NULL_;
  let note_unfit_100 =
    gfccp_order["note_unfit_100"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_100"])
      : FLOAT_NULL_;
  let note_unfit_50 =
    gfccp_order["note_unfit_50"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_50"])
      : FLOAT_NULL_;
  let note_unfit_20 =
    gfccp_order["note_unfit_20"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_20"])
      : FLOAT_NULL_;
  let note_unfit_10 =
    gfccp_order["note_unfit_10"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_10"])
      : FLOAT_NULL_;
  //----coin
  let coin_new_10 =
    gfccp_order["coin_new_10"] !== undefined
      ? parseFloat(gfccp_order["coin_new_10"])
      : FLOAT_NULL_;
  let coin_new_5 =
    gfccp_order["coin_new_5"] !== undefined
      ? parseFloat(gfccp_order["coin_new_5"])
      : FLOAT_NULL_;
  let coin_new_2 =
    gfccp_order["coin_new_2"] !== undefined
      ? parseFloat(gfccp_order["coin_new_2"])
      : FLOAT_NULL_;
  let coin_new_1 =
    gfccp_order["coin_new_1"] !== undefined
      ? parseFloat(gfccp_order["coin_new_1"])
      : FLOAT_NULL_;
  let coin_new_05 =
    gfccp_order["coin_new_05"] !== undefined
      ? parseFloat(gfccp_order["coin_new_05"])
      : FLOAT_NULL_;
  let coin_new_025 =
    gfccp_order["coin_new_025"] !== undefined
      ? parseFloat(gfccp_order["coin_new_025"])
      : FLOAT_NULL_;
  let coin_fit_10 =
    gfccp_order["coin_fit_10"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_10"])
      : FLOAT_NULL_;
  let coin_fit_5 =
    gfccp_order["coin_fit_5"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_5"])
      : FLOAT_NULL_;
  let coin_fit_2 =
    gfccp_order["coin_fit_2"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_2"])
      : FLOAT_NULL_;
  let coin_fit_1 =
    gfccp_order["coin_fit_1"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_1"])
      : FLOAT_NULL_;
  let coin_fit_05 =
    gfccp_order["coin_fit_05"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_05"])
      : FLOAT_NULL_;
  let coin_fit_025 =
    gfccp_order["coin_fit_025"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_025"])
      : FLOAT_NULL_;
  let coin_uncount_10 =
    gfccp_order["coin_uncount_10"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_10"])
      : FLOAT_NULL_;
  let coin_uncount_5 =
    gfccp_order["coin_uncount_5"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_5"])
      : FLOAT_NULL_;
  let coin_uncount_2 =
    gfccp_order["coin_uncount_2"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_2"])
      : FLOAT_NULL_;
  let coin_uncount_1 =
    gfccp_order["coin_uncount_1"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_1"])
      : FLOAT_NULL_;
  let coin_uncount_05 =
    gfccp_order["coin_uncount_05"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_05"])
      : FLOAT_NULL_;
  let coin_uncount_025 =
    gfccp_order["coin_uncount_025"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_025"])
      : FLOAT_NULL_;
  let coin_unfit_10 =
    gfccp_order["coin_unfit_10"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_10"])
      : FLOAT_NULL_;
  let coin_unfit_5 =
    gfccp_order["coin_unfit_5"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_5"])
      : FLOAT_NULL_;
  let coin_unfit_2 =
    gfccp_order["coin_unfit_2"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_2"])
      : FLOAT_NULL_;
  let coin_unfit_1 =
    gfccp_order["coin_unfit_1"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_1"])
      : FLOAT_NULL_;
  let coin_unfit_05 =
    gfccp_order["coin_unfit_05"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_05"])
      : FLOAT_NULL_;
  let coin_unfit_025 =
    gfccp_order["coin_unfit_025"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_025"])
      : FLOAT_NULL_;
  //----pcs
  //---pcs note
  let pcs_note_new_1000 =
    gfccp_order["pcs_note_new_1000"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_1000"])
      : FLOAT_NULL_;
  let pcs_note_new_500 =
    gfccp_order["pcs_note_new_500"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_500"])
      : FLOAT_NULL_;
  let pcs_note_new_100 =
    gfccp_order["pcs_note_new_100"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_100"])
      : FLOAT_NULL_;
  let pcs_note_new_50 =
    gfccp_order["pcs_note_new_50"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_50"])
      : FLOAT_NULL_;
  let pcs_note_new_20 =
    gfccp_order["pcs_note_new_20"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_20"])
      : FLOAT_NULL_;
  let pcs_note_new_10 =
    gfccp_order["pcs_note_new_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_10"])
      : FLOAT_NULL_;
  let pcs_note_fit_1000 =
    gfccp_order["pcs_note_fit_1000"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_1000"])
      : FLOAT_NULL_;
  let pcs_note_fit_500 =
    gfccp_order["pcs_note_fit_500"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_500"])
      : FLOAT_NULL_;
  let pcs_note_fit_100 =
    gfccp_order["pcs_note_fit_100"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_100"])
      : FLOAT_NULL_;
  let pcs_note_fit_50 =
    gfccp_order["pcs_note_fit_50"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_50"])
      : FLOAT_NULL_;
  let pcs_note_fit_20 =
    gfccp_order["pcs_note_fit_20"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_20"])
      : FLOAT_NULL_;
  let pcs_note_fit_10 =
    gfccp_order["pcs_note_fit_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_10"])
      : FLOAT_NULL_;
  let pcs_note_uncount_1000 =
    gfccp_order["pcs_note_uncount_1000"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_1000"])
      : FLOAT_NULL_;
  let pcs_note_uncount_500 =
    gfccp_order["pcs_note_uncount_500"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_500"])
      : FLOAT_NULL_;
  let pcs_note_uncount_100 =
    gfccp_order["pcs_note_uncount_100"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_100"])
      : FLOAT_NULL_;
  let pcs_note_uncount_50 =
    gfccp_order["pcs_note_uncount_50"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_50"])
      : FLOAT_NULL_;
  let pcs_note_uncount_20 =
    gfccp_order["pcs_note_uncount_20"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_20"])
      : FLOAT_NULL_;
  let pcs_note_uncount_10 =
    gfccp_order["pcs_note_uncount_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_10"])
      : FLOAT_NULL_;
  let pcs_note_unfit_1000 =
    gfccp_order["pcs_note_unfit_1000"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_1000"])
      : FLOAT_NULL_;
  let pcs_note_unfit_500 =
    gfccp_order["pcs_note_unfit_500"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_500"])
      : FLOAT_NULL_;
  let pcs_note_unfit_100 =
    gfccp_order["pcs_note_unfit_100"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_100"])
      : FLOAT_NULL_;
  let pcs_note_unfit_50 =
    gfccp_order["pcs_note_unfit_50"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_50"])
      : FLOAT_NULL_;
  let pcs_note_unfit_20 =
    gfccp_order["pcs_note_unfit_20"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_20"])
      : FLOAT_NULL_;
  let pcs_note_unfit_10 =
    gfccp_order["pcs_note_unfit_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_10"])
      : FLOAT_NULL_;
  //----pcs coin
  let pcs_coin_new_10 =
    gfccp_order["pcs_coin_new_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_10"])
      : FLOAT_NULL_;
  let pcs_coin_new_5 =
    gfccp_order["pcs_coin_new_5"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_5"])
      : FLOAT_NULL_;
  let pcs_coin_new_2 =
    gfccp_order["pcs_coin_new_2"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_2"])
      : FLOAT_NULL_;
  let pcs_coin_new_1 =
    gfccp_order["pcs_coin_new_1"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_1"])
      : FLOAT_NULL_;
  let pcs_coin_new_05 =
    gfccp_order["pcs_coin_new_05"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_05"])
      : FLOAT_NULL_;
  let pcs_coin_new_025 =
    gfccp_order["pcs_coin_new_025"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_025"])
      : FLOAT_NULL_;
  let pcs_coin_fit_10 =
    gfccp_order["pcs_coin_fit_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_10"])
      : FLOAT_NULL_;
  let pcs_coin_fit_5 =
    gfccp_order["pcs_coin_fit_5"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_5"])
      : FLOAT_NULL_;
  let pcs_coin_fit_2 =
    gfccp_order["pcs_coin_fit_2"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_2"])
      : FLOAT_NULL_;
  let pcs_coin_fit_1 =
    gfccp_order["pcs_coin_fit_1"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_1"])
      : FLOAT_NULL_;
  let pcs_coin_fit_05 =
    gfccp_order["pcs_coin_fit_05"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_05"])
      : FLOAT_NULL_;
  let pcs_coin_fit_025 =
    gfccp_order["pcs_coin_fit_025"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_025"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_10 =
    gfccp_order["pcs_coin_uncount_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_10"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_5 =
    gfccp_order["pcs_coin_uncount_5"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_5"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_2 =
    gfccp_order["pcs_coin_uncount_2"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_2"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_1 =
    gfccp_order["pcs_coin_uncount_1"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_1"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_05 =
    gfccp_order["pcs_coin_uncount_05"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_05"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_025 =
    gfccp_order["pcs_coin_uncount_025"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_025"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_10 =
    gfccp_order["pcs_coin_unfit_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_10"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_5 =
    gfccp_order["pcs_coin_unfit_5"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_5"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_2 =
    gfccp_order["pcs_coin_unfit_2"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_2"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_1 =
    gfccp_order["pcs_coin_unfit_1"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_1"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_05 =
    gfccp_order["pcs_coin_unfit_05"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_05"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_025 =
    gfccp_order["pcs_coin_unfit_025"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_025"])
      : FLOAT_NULL_;
  //----unit
  //---unit note
  let unit_note_new_1000 =
    gfccp_order["unit_note_new_1000"] !== undefined
      ? gfccp_order["unit_note_new_1000"]
      : NULL_;
  let unit_note_new_500 =
    gfccp_order["unit_note_new_500"] !== undefined
      ? gfccp_order["unit_note_new_500"]
      : NULL_;
  let unit_note_new_100 =
    gfccp_order["unit_note_new_100"] !== undefined
      ? gfccp_order["unit_note_new_100"]
      : NULL_;
  let unit_note_new_50 =
    gfccp_order["unit_note_new_50"] !== undefined
      ? gfccp_order["unit_note_new_50"]
      : NULL_;
  let unit_note_new_20 =
    gfccp_order["unit_note_new_20"] !== undefined
      ? gfccp_order["unit_note_new_20"]
      : NULL_;
  let unit_note_new_10 =
    gfccp_order["unit_note_new_10"] !== undefined
      ? gfccp_order["unit_note_new_10"]
      : NULL_;
  let unit_note_fit_1000 =
    gfccp_order["unit_note_fit_1000"] !== undefined
      ? gfccp_order["unit_note_fit_1000"]
      : NULL_;
  let unit_note_fit_500 =
    gfccp_order["unit_note_fit_500"] !== undefined
      ? gfccp_order["unit_note_fit_500"]
      : NULL_;
  let unit_note_fit_100 =
    gfccp_order["unit_note_fit_100"] !== undefined
      ? gfccp_order["unit_note_fit_100"]
      : NULL_;
  let unit_note_fit_50 =
    gfccp_order["unit_note_fit_50"] !== undefined
      ? gfccp_order["unit_note_fit_50"]
      : NULL_;
  let unit_note_fit_20 =
    gfccp_order["unit_note_fit_20"] !== undefined
      ? gfccp_order["unit_note_fit_20"]
      : NULL_;
  let unit_note_fit_10 =
    gfccp_order["unit_note_fit_10"] !== undefined
      ? gfccp_order["unit_note_fit_10"]
      : NULL_;
  let unit_note_uncount_1000 =
    gfccp_order["unit_note_uncount_1000"] !== undefined
      ? gfccp_order["unit_note_uncount_1000"]
      : NULL_;
  let unit_note_uncount_500 =
    gfccp_order["unit_note_uncount_500"] !== undefined
      ? gfccp_order["unit_note_uncount_500"]
      : NULL_;
  let unit_note_uncount_100 =
    gfccp_order["unit_note_uncount_100"] !== undefined
      ? gfccp_order["unit_note_uncount_100"]
      : NULL_;
  let unit_note_uncount_50 =
    gfccp_order["unit_note_uncount_50"] !== undefined
      ? gfccp_order["unit_note_uncount_50"]
      : NULL_;
  let unit_note_uncount_20 =
    gfccp_order["unit_note_uncount_20"] !== undefined
      ? gfccp_order["unit_note_uncount_20"]
      : NULL_;
  let unit_note_uncount_10 =
    gfccp_order["unit_note_uncount_10"] !== undefined
      ? gfccp_order["unit_note_uncount_10"]
      : NULL_;
  let unit_note_unfit_1000 =
    gfccp_order["unit_note_unfit_1000"] !== undefined
      ? gfccp_order["unit_note_unfit_1000"]
      : NULL_;
  let unit_note_unfit_500 =
    gfccp_order["unit_note_unfit_500"] !== undefined
      ? gfccp_order["unit_note_unfit_500"]
      : NULL_;
  let unit_note_unfit_100 =
    gfccp_order["unit_note_unfit_100"] !== undefined
      ? gfccp_order["unit_note_unfit_100"]
      : NULL_;
  let unit_note_unfit_50 =
    gfccp_order["unit_note_unfit_50"] !== undefined
      ? gfccp_order["unit_note_unfit_50"]
      : NULL_;
  let unit_note_unfit_20 =
    gfccp_order["unit_note_unfit_20"] !== undefined
      ? gfccp_order["unit_note_unfit_20"]
      : NULL_;
  let unit_note_unfit_10 =
    gfccp_order["unit_note_unfit_10"] !== undefined
      ? gfccp_order["unit_note_unfit_10"]
      : NULL_;
  //----unit coin
  let unit_coin_new_10 =
    gfccp_order["unit_coin_new_10"] !== undefined
      ? gfccp_order["unit_coin_new_10"]
      : NULL_;
  let unit_coin_new_5 =
    gfccp_order["unit_coin_new_5"] !== undefined
      ? gfccp_order["unit_coin_new_5"]
      : NULL_;
  let unit_coin_new_2 =
    gfccp_order["unit_coin_new_2"] !== undefined
      ? gfccp_order["unit_coin_new_2"]
      : NULL_;
  let unit_coin_new_1 =
    gfccp_order["unit_coin_new_1"] !== undefined
      ? gfccp_order["unit_coin_new_1"]
      : NULL_;
  let unit_coin_new_05 =
    gfccp_order["unit_coin_new_05"] !== undefined
      ? gfccp_order["unit_coin_new_05"]
      : NULL_;
  let unit_coin_new_025 =
    gfccp_order["unit_coin_new_025"] !== undefined
      ? gfccp_order["unit_coin_new_025"]
      : NULL_;
  let unit_coin_fit_10 =
    gfccp_order["unit_coin_fit_10"] !== undefined
      ? gfccp_order["unit_coin_fit_10"]
      : NULL_;
  let unit_coin_fit_5 =
    gfccp_order["unit_coin_fit_5"] !== undefined
      ? gfccp_order["unit_coin_fit_5"]
      : NULL_;
  let unit_coin_fit_2 =
    gfccp_order["unit_coin_fit_2"] !== undefined
      ? gfccp_order["unit_coin_fit_2"]
      : NULL_;
  let unit_coin_fit_1 =
    gfccp_order["unit_coin_fit_1"] !== undefined
      ? gfccp_order["unit_coin_fit_1"]
      : NULL_;
  let unit_coin_fit_05 =
    gfccp_order["unit_coin_fit_05"] !== undefined
      ? gfccp_order["unit_coin_fit_05"]
      : NULL_;
  let unit_coin_fit_025 =
    gfccp_order["unit_coin_fit_025"] !== undefined
      ? gfccp_order["unit_coin_fit_025"]
      : NULL_;
  let unit_coin_uncount_10 =
    gfccp_order["unit_coin_uncount_10"] !== undefined
      ? gfccp_order["unit_coin_uncount_10"]
      : NULL_;
  let unit_coin_uncount_5 =
    gfccp_order["unit_coin_uncount_5"] !== undefined
      ? gfccp_order["unit_coin_uncount_5"]
      : NULL_;
  let unit_coin_uncount_2 =
    gfccp_order["unit_coin_uncount_2"] !== undefined
      ? gfccp_order["unit_coin_uncount_2"]
      : NULL_;
  let unit_coin_uncount_1 =
    gfccp_order["unit_coin_uncount_1"] !== undefined
      ? gfccp_order["unit_coin_uncount_1"]
      : NULL_;
  let unit_coin_uncount_05 =
    gfccp_order["unit_coin_uncount_05"] !== undefined
      ? gfccp_order["unit_coin_uncount_05"]
      : NULL_;
  let unit_coin_uncount_025 =
    gfccp_order["unit_coin_uncount_025"] !== undefined
      ? gfccp_order["unit_coin_uncount_025"]
      : NULL_;
  let unit_coin_unfit_10 =
    gfccp_order["unit_coin_unfit_10"] !== undefined
      ? gfccp_order["unit_coin_unfit_10"]
      : NULL_;
  let unit_coin_unfit_5 =
    gfccp_order["unit_coin_unfit_5"] !== undefined
      ? gfccp_order["unit_coin_unfit_5"]
      : NULL_;
  let unit_coin_unfit_2 =
    gfccp_order["unit_coin_unfit_2"] !== undefined
      ? gfccp_order["unit_coin_unfit_2"]
      : NULL_;
  let unit_coin_unfit_1 =
    gfccp_order["unit_coin_unfit_1"] !== undefined
      ? gfccp_order["unit_coin_unfit_1"]
      : NULL_;
  let unit_coin_unfit_05 =
    gfccp_order["unit_coin_unfit_05"] !== undefined
      ? gfccp_order["unit_coin_unfit_05"]
      : NULL_;
  let unit_coin_unfit_025 =
    gfccp_order["unit_coin_unfit_025"] !== undefined
      ? gfccp_order["unit_coin_unfit_025"]
      : NULL_;

  let row_type = "normal";
  let input_type = "manual_add";
  let user_id = gfccp_order["user_id"];
  let tbGrandTotalAmount = gfccp_order["tbGrandTotalAmount"];
  // console.log(unit_note_new_1000)
  // console.log(note_new_1000)
  try {
    let pool = await sql.connect(config);
    let add_manual_order = await pool
      .request()
      .input("approve_setting_id", sql.Int, approve_setting_id)
      .input("approve_setting_version", sql.Float, approve_setting_version)
      .input("customerID", sql.NVarChar, customerID)
      .input("order_category", sql.NVarChar, order_category)
      .input("servicetype", sql.NVarChar, servicetype)
      .input("refno", sql.NVarChar, refno)
      .input("order_date", sql.DateTime, order_date)
      .input("branchorigin_code", sql.NVarChar, branchorigin_code)
      .input("branchorigin_name", sql.NVarChar, branchorigin_name)
      .input("branchdest_code", sql.NVarChar, branchdest_code)
      .input("branchdest_name", sql.NVarChar, branchdest_name)
      .input("remark", sql.NVarChar, remark)
      //---note
      .input("note_new_1000", sql.Float, note_new_1000)
      .input("note_new_500", sql.Float, note_new_500)
      .input("note_new_100", sql.Float, note_new_100)
      .input("note_new_50", sql.Float, note_new_50)
      .input("note_new_20", sql.Float, note_new_20)
      .input("note_new_10", sql.Float, note_new_10)
      .input("note_fit_1000", sql.Float, note_fit_1000)
      .input("note_fit_500", sql.Float, note_fit_500)
      .input("note_fit_100", sql.Float, note_fit_100)
      .input("note_fit_50", sql.Float, note_fit_50)
      .input("note_fit_20", sql.Float, note_fit_20)
      .input("note_fit_10", sql.Float, note_fit_10)
      .input("note_uncount_1000", sql.Float, note_uncount_1000)
      .input("note_uncount_500", sql.Float, note_uncount_500)
      .input("note_uncount_100", sql.Float, note_uncount_100)
      .input("note_uncount_50", sql.Float, note_uncount_50)
      .input("note_uncount_20", sql.Float, note_uncount_20)
      .input("note_uncount_10", sql.Float, note_uncount_10)
      .input("note_unfit_1000", sql.Float, note_unfit_1000)
      .input("note_unfit_500", sql.Float, note_unfit_500)
      .input("note_unfit_100", sql.Float, note_unfit_100)
      .input("note_unfit_50", sql.Float, note_unfit_50)
      .input("note_unfit_20", sql.Float, note_unfit_20)
      .input("note_unfit_10", sql.Float, note_unfit_10)
      //----coin
      .input("coin_new_10", sql.Float, coin_new_10)
      .input("coin_new_5", sql.Float, coin_new_5)
      .input("coin_new_2", sql.Float, coin_new_2)
      .input("coin_new_1", sql.Float, coin_new_1)
      .input("coin_new_05", sql.Float, coin_new_05)
      .input("coin_new_025", sql.Float, coin_new_025)
      .input("coin_fit_10", sql.Float, coin_fit_10)
      .input("coin_fit_5", sql.Float, coin_fit_5)
      .input("coin_fit_2", sql.Float, coin_fit_2)
      .input("coin_fit_1", sql.Float, coin_fit_1)
      .input("coin_fit_05", sql.Float, coin_fit_05)
      .input("coin_fit_025", sql.Float, coin_fit_025)
      .input("coin_uncount_10", sql.Float, coin_uncount_10)
      .input("coin_uncount_5", sql.Float, coin_uncount_5)
      .input("coin_uncount_2", sql.Float, coin_uncount_2)
      .input("coin_uncount_1", sql.Float, coin_uncount_1)
      .input("coin_uncount_05", sql.Float, coin_uncount_05)
      .input("coin_uncount_025", sql.Float, coin_uncount_025)
      .input("coin_unfit_10", sql.Float, coin_unfit_10)
      .input("coin_unfit_5", sql.Float, coin_unfit_5)
      .input("coin_unfit_2", sql.Float, coin_unfit_2)
      .input("coin_unfit_1", sql.Float, coin_unfit_1)
      .input("coin_unfit_05", sql.Float, coin_unfit_05)
      .input("coin_unfit_025", sql.Float, coin_unfit_025)
      //----pcs
      .input("pcs_note_new_1000", sql.Float, pcs_note_new_1000)
      .input("pcs_note_new_500", sql.Float, pcs_note_new_500)
      .input("pcs_note_new_100", sql.Float, pcs_note_new_100)
      .input("pcs_note_new_50", sql.Float, pcs_note_new_50)
      .input("pcs_note_new_20", sql.Float, pcs_note_new_20)
      .input("pcs_note_new_10", sql.Float, pcs_note_new_10)
      .input("pcs_note_fit_1000", sql.Float, pcs_note_fit_1000)
      .input("pcs_note_fit_500", sql.Float, pcs_note_fit_500)
      .input("pcs_note_fit_100", sql.Float, pcs_note_fit_100)
      .input("pcs_note_fit_50", sql.Float, pcs_note_fit_50)
      .input("pcs_note_fit_20", sql.Float, pcs_note_fit_20)
      .input("pcs_note_fit_10", sql.Float, pcs_note_fit_10)
      .input("pcs_note_uncount_1000", sql.Float, pcs_note_uncount_1000)
      .input("pcs_note_uncount_500", sql.Float, pcs_note_uncount_500)
      .input("pcs_note_uncount_100", sql.Float, pcs_note_uncount_100)
      .input("pcs_note_uncount_50", sql.Float, pcs_note_uncount_50)
      .input("pcs_note_uncount_20", sql.Float, pcs_note_uncount_20)
      .input("pcs_note_uncount_10", sql.Float, pcs_note_uncount_10)
      .input("pcs_note_unfit_1000", sql.Float, pcs_note_unfit_1000)
      .input("pcs_note_unfit_500", sql.Float, pcs_note_unfit_500)
      .input("pcs_note_unfit_100", sql.Float, pcs_note_unfit_100)
      .input("pcs_note_unfit_50", sql.Float, pcs_note_unfit_50)
      .input("pcs_note_unfit_20", sql.Float, pcs_note_unfit_20)
      .input("pcs_note_unfit_10", sql.Float, pcs_note_unfit_10)
      .input("pcs_coin_new_10", sql.Float, pcs_coin_new_10)
      .input("pcs_coin_new_5", sql.Float, pcs_coin_new_5)
      .input("pcs_coin_new_2", sql.Float, pcs_coin_new_2)
      .input("pcs_coin_new_1", sql.Float, pcs_coin_new_1)
      .input("pcs_coin_new_05", sql.Float, pcs_coin_new_05)
      .input("pcs_coin_new_025", sql.Float, pcs_coin_new_025)
      .input("pcs_coin_fit_10", sql.Float, pcs_coin_fit_10)
      .input("pcs_coin_fit_5", sql.Float, pcs_coin_fit_5)
      .input("pcs_coin_fit_2", sql.Float, pcs_coin_fit_2)
      .input("pcs_coin_fit_1", sql.Float, pcs_coin_fit_1)
      .input("pcs_coin_fit_05", sql.Float, pcs_coin_fit_05)
      .input("pcs_coin_fit_025", sql.Float, pcs_coin_fit_025)
      .input("pcs_coin_uncount_10", sql.Float, pcs_coin_uncount_10)
      .input("pcs_coin_uncount_5", sql.Float, pcs_coin_uncount_5)
      .input("pcs_coin_uncount_2", sql.Float, pcs_coin_uncount_2)
      .input("pcs_coin_uncount_1", sql.Float, pcs_coin_uncount_1)
      .input("pcs_coin_uncount_05", sql.Float, pcs_coin_uncount_05)
      .input("pcs_coin_uncount_025", sql.Float, pcs_coin_uncount_025)
      .input("pcs_coin_unfit_10", sql.Float, pcs_coin_unfit_10)
      .input("pcs_coin_unfit_5", sql.Float, pcs_coin_unfit_5)
      .input("pcs_coin_unfit_2", sql.Float, pcs_coin_unfit_2)
      .input("pcs_coin_unfit_1", sql.Float, pcs_coin_unfit_1)
      .input("pcs_coin_unfit_05", sql.Float, pcs_coin_unfit_05)
      .input("pcs_coin_unfit_025", sql.Float, pcs_coin_unfit_025)
      //----unit
      .input("unit_note_new_1000", sql.NVarChar, unit_note_new_1000)
      .input("unit_note_new_500", sql.NVarChar, unit_note_new_500)
      .input("unit_note_new_100", sql.NVarChar, unit_note_new_100)
      .input("unit_note_new_50", sql.NVarChar, unit_note_new_50)
      .input("unit_note_new_20", sql.NVarChar, unit_note_new_20)
      .input("unit_note_new_10", sql.NVarChar, unit_note_new_10)
      .input("unit_note_fit_1000", sql.NVarChar, unit_note_fit_1000)
      .input("unit_note_fit_500", sql.NVarChar, unit_note_fit_500)
      .input("unit_note_fit_100", sql.NVarChar, unit_note_fit_100)
      .input("unit_note_fit_50", sql.NVarChar, unit_note_fit_50)
      .input("unit_note_fit_20", sql.NVarChar, unit_note_fit_20)
      .input("unit_note_fit_10", sql.NVarChar, unit_note_fit_10)
      .input("unit_note_uncount_1000", sql.NVarChar, unit_note_uncount_1000)
      .input("unit_note_uncount_500", sql.NVarChar, unit_note_uncount_500)
      .input("unit_note_uncount_100", sql.NVarChar, unit_note_uncount_100)
      .input("unit_note_uncount_50", sql.NVarChar, unit_note_uncount_50)
      .input("unit_note_uncount_20", sql.NVarChar, unit_note_uncount_20)
      .input("unit_note_uncount_10", sql.NVarChar, unit_note_uncount_10)
      .input("unit_note_unfit_1000", sql.NVarChar, unit_note_unfit_1000)
      .input("unit_note_unfit_500", sql.NVarChar, unit_note_unfit_500)
      .input("unit_note_unfit_100", sql.NVarChar, unit_note_unfit_100)
      .input("unit_note_unfit_50", sql.NVarChar, unit_note_unfit_50)
      .input("unit_note_unfit_20", sql.NVarChar, unit_note_unfit_20)
      .input("unit_note_unfit_10", sql.NVarChar, unit_note_unfit_10)
      .input("unit_coin_new_10", sql.NVarChar, unit_coin_new_10)
      .input("unit_coin_new_5", sql.NVarChar, unit_coin_new_5)
      .input("unit_coin_new_2", sql.NVarChar, unit_coin_new_2)
      .input("unit_coin_new_1", sql.NVarChar, unit_coin_new_1)
      .input("unit_coin_new_05", sql.NVarChar, unit_coin_new_05)
      .input("unit_coin_new_025", sql.NVarChar, unit_coin_new_025)
      .input("unit_coin_fit_10", sql.NVarChar, unit_coin_fit_10)
      .input("unit_coin_fit_5", sql.NVarChar, unit_coin_fit_5)
      .input("unit_coin_fit_2", sql.NVarChar, unit_coin_fit_2)
      .input("unit_coin_fit_1", sql.NVarChar, unit_coin_fit_1)
      .input("unit_coin_fit_05", sql.NVarChar, unit_coin_fit_05)
      .input("unit_coin_fit_025", sql.NVarChar, unit_coin_fit_025)
      .input("unit_coin_uncount_10", sql.NVarChar, unit_coin_uncount_10)
      .input("unit_coin_uncount_5", sql.NVarChar, unit_coin_uncount_5)
      .input("unit_coin_uncount_2", sql.NVarChar, unit_coin_uncount_2)
      .input("unit_coin_uncount_1", sql.NVarChar, unit_coin_uncount_1)
      .input("unit_coin_uncount_05", sql.NVarChar, unit_coin_uncount_05)
      .input("unit_coin_uncount_025", sql.NVarChar, unit_coin_uncount_025)
      .input("unit_coin_unfit_10", sql.NVarChar, unit_coin_unfit_10)
      .input("unit_coin_unfit_5", sql.NVarChar, unit_coin_unfit_5)
      .input("unit_coin_unfit_2", sql.NVarChar, unit_coin_unfit_2)
      .input("unit_coin_unfit_1", sql.NVarChar, unit_coin_unfit_1)
      .input("unit_coin_unfit_05", sql.NVarChar, unit_coin_unfit_05)
      .input("unit_coin_unfit_025", sql.NVarChar, unit_coin_unfit_025)
      .input("total_by_branch", sql.Float, tbGrandTotalAmount)
      .input("row_type", sql.NVarChar, row_type)
      .input("input_type", sql.NVarChar, input_type)
      .input("roleid", sql.Int, roleid)
      .input("createby", sql.NVarChar, user_id)
      .execute("add_manual_order");
    return add_manual_order.recordsets;
  } catch (err) {
    console.log(err);
  }
  //return add_manual_order.recordsets
}
async function set_update_urgentcase_vrf_det(obj_json) {
  try {
    console.log('set_update_urgentcase_vrf_det obj_json: ', obj_json)
    for (let index in obj_json) {
      if ((obj_json.length > 0) && (index === '0')) {
        let pool = await sql.connect(config);
        let sp_set_vrf_urgentcase = await pool
          .request()
          .input("vrf_id", sql.Int, obj_json[0].vrf_id)
          .input("req_urgentcase_by", sql.Int, obj_json[0].user_id)
          .execute("sp_set_vrf_urgentcase");
        let output_ = sp_set_vrf_urgentcase.recordsets;
      }
      if (obj_json[index].hasOwnProperty('id')) {
        let pool = await sql.connect(config);
        let sp_set_urgentcase_vrf_det = await pool
          .request()
          .input("id", sql.Int, obj_json[index].id)
          .input("req_urgentcase_by", sql.Int, obj_json[index].user_id)
          .input("remark_urgentcase", sql.NVarChar, obj_json[index].remark_urgentcase)
          .execute("sp_set_urgentcase_vrf_det");
        let output_ = sp_set_urgentcase_vrf_det.recordsets;
      } else {
        let pool = await sql.connect(config);
        let sp_add_urgentcase_person_vrf = await pool
          .request()
          .input("vrf_id", sql.Int, obj_json[index].vrf_id)
          .input("fullname", sql.NVarChar, obj_json[index].fullname)
          .input("vehicle_brand", sql.Int, obj_json[index].vehicle_brand_id)
          .input("vehicle_color", sql.Int, obj_json[index].vehicle_color_id)
          .input("vehicle_registration", sql.NVarChar, obj_json[index].vehicle_registration)
          .input("card_no", sql.NVarChar, obj_json[index].card_no)
          .input("remark_urgentcase", sql.NVarChar, obj_json[index].remark_urgentcase)
          .input("user_id", sql.Int, obj_json[index].user_id)
          .execute("sp_add_urgentcase_person_vrf");
        let output_ = sp_add_urgentcase_person_vrf.recordsets;
      }
    }
    return ({ status: 'success' })//sp_set_manual_update_vrf_det.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function set_update_urgentcase_vrf(obj_json) {
  try {
    console.log('set_update_urgentcase_vrf obj_json: ', obj_json)
    for (let index in obj_json) {
      if (obj_json[index].id && obj_json[index].urgentcase_type === 'Additional') {
        let pool = await sql.connect(config);
        let sp_set_deactive_urgentcase_vrf = await pool
          .request()
          .input("vrf_id", sql.Int, obj_json[index].vrf_id)
          .input("ModifyBy", sql.Int, obj_json[index].user_id)
          .execute("sp_set_deactive_urgentcase_vrf");
        let output_ = sp_set_deactive_urgentcase_vrf.recordsets;
      }
    }
    for (let index in obj_json) {
      if (
        obj_json[index].id !== null
        && (obj_json[index].urgentcase_type === 'Absent'
          || obj_json[index].urgentcase_type === null
        )
      ) 
      { //existing vrf_det
        if(obj_json[index].remark_urgentcase !== null 
          && obj_json[index].remark_urgentcase !== '' 
          && obj_json[index].urgentcase_type === null )
        { 
          let pool = await sql.connect(config);
          let sp_update_urgentcase_vrf = await pool
            .request()
            .input("remark_urgentcase", sql.NVarChar, obj_json[index].remark_urgentcase)
            .input("urgentcase_type", sql.NVarChar, obj_json[index].urgentcase_type)
            .input("id", sql.Int, obj_json[index].id)
            .input("ModifyBy", sql.Int, obj_json[index].user_id)
            .input("type", sql.NVarChar, 'Update new urgentcase of existing vrf_det')
            .execute("sp_update_urgentcase_vrf");
          let output_ = sp_update_urgentcase_vrf.recordsets;
        }
        else if( (obj_json[index].remark_urgentcase === null 
          || obj_json[index].remark_urgentcase === '' ) 
          && obj_json[index].urgentcase_type !== null )
        { 
          let pool = await sql.connect(config);
          let sp_update_urgentcase_vrf = await pool
            .request()
            .input("remark_urgentcase", sql.NVarChar, obj_json[index].remark_urgentcase)
            .input("urgentcase_type", sql.NVarChar, obj_json[index].urgentcase_type)
            .input("id", sql.Int, obj_json[index].id)
            .input("ModifyBy", sql.Int, obj_json[index].user_id)
            .input("type", sql.NVarChar, 'Update null to urgentcase of existing vrf_det')
            .execute("sp_update_urgentcase_vrf");
          let output_ = sp_update_urgentcase_vrf.recordsets;

        } 
        else if( (obj_json[index].remark_urgentcase !== null 
          || obj_json[index].remark_urgentcase !== '' ) 
          && obj_json[index].urgentcase_type !== null )
        { 
          let pool = await sql.connect(config);
          let sp_update_urgentcase_vrf = await pool
            .request()
            .input("remark_urgentcase", sql.NVarChar, obj_json[index].remark_urgentcase)
            .input("urgentcase_type", sql.NVarChar, obj_json[index].urgentcase_type)
            .input("id", sql.Int, obj_json[index].id)
            .input("ModifyBy", sql.Int, obj_json[index].user_id)
            .input("type", sql.NVarChar, 'Update remark only to urgentcase of existing vrf_det')
            .execute("sp_update_urgentcase_vrf");
          let output_ = sp_update_urgentcase_vrf.recordsets;

        }
      }
      else if (!obj_json[index].id)
      {
        let sp_add_urgentcase_person_vrf = await pool
        .request()
        .input("vrf_id", sql.Int, obj_json[index].vrf_id)
        .input("fullname", sql.NVarChar, obj_json[index].fullname)
        .input("vehicle_brand", sql.Int, obj_json[index].vehicle_brand_id)
        .input("vehicle_color", sql.Int, obj_json[index].vehicle_color_id)
        .input("vehicle_registration", sql.NVarChar, obj_json[index].vehicle_registration)
        .input("card_no", sql.NVarChar, obj_json[index].card_no)
        .input("remark_urgentcase", sql.NVarChar, obj_json[index].remark_urgentcase)
        .input("user_id", sql.Int, obj_json[index].user_id)
        .execute("sp_add_urgentcase_person_vrf");
        let output_ = sp_add_urgentcase_person_vrf.recordsets;
      }
      else if (obj_json[index].id && obj_json[index].urgentcase_type === 'Additional')
      {
        let pool = await sql.connect(config);
        let sp_add_urgentcase_person_vrf = await pool
        .request()
        .input("vrf_id", sql.Int, obj_json[index].vrf_id)
        .input("fullname", sql.NVarChar, obj_json[index].fullname)
        .input("vehicle_brand", sql.Int, obj_json[index].vehicle_brand_id)
        .input("vehicle_color", sql.Int, obj_json[index].vehicle_color_id)
        .input("vehicle_registration", sql.NVarChar, obj_json[index].vehicle_registration)
        .input("card_no", sql.NVarChar, obj_json[index].card_no)
        .input("remark_urgentcase", sql.NVarChar, obj_json[index].remark_urgentcase)
        .input("user_id", sql.Int, obj_json[index].user_id)
        .execute("sp_add_urgentcase_person_vrf");
        let output_ = sp_add_urgentcase_person_vrf.recordsets;

      }
    }

    return ({ status: 'success' })//sp_set_manual_update_vrf_det.recordsets;
  } catch (err) {
    console.log({ error: err });
    return ({ error: err })
  }
}
async function set_manual_update_vrf_det_trans(obj_json) {
  try {
    console.log('obj_json: ', obj_json)
    console.log('obj_json.length: ', Object.keys(obj_json).length)
    let pool = await sql.connect(config);
    let sp_set_deactive_vrf_trans_det = await pool
      .request()
      .input("vrf_id", sql.Int, obj_json[0].vrf_id)
      .input("ModifyBy", sql.Int, obj_json[0].user_id)
      .execute("sp_set_deactive_vrf_trans_det");
    let output_ = sp_set_deactive_vrf_trans_det.recordsets;

    for (let index in obj_json) {
      console.log('set_manual_update_vrf_det_trans obj_json[index].vrf_id: ', obj_json[index].vrf_id)
      let pool = await sql.connect(config);
      let spAdd_vrf_det = await pool
        .request()
        .input("vrf_id", sql.Int, obj_json[index].vrf_id)
        .input("fullname", sql.NVarChar, obj_json[index].fullname)
        .input("vehicle_brand", sql.Int, obj_json[index].vehicle_brand_id)
        .input("vehicle_color", sql.Int, obj_json[index].vehicle_color_id)
        .input("vehicle_registration", sql.NVarChar, obj_json[index].vehicle_registration)
        .input("card_no", sql.NVarChar, obj_json[index].card_no)
        .input("createby", sql.NVarChar, obj_json[index].user_id)
        .execute("spAdd_vrf_det");
      let output = spAdd_vrf_det.recordsets;
    }
    return ({ status: 'success' })//sp_set_manual_update_vrf_det.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function add_approveProc(data) {
  let ap_name = data["ap_name"];
  //let branchtocash =  data["BranchToCash"] === "true" ? '1' : '0'
  let branchtocash = data["BranchToCash"];
  let cashtocash = data["CashToCash"];
  let bottocash = data["BOTToCash"];
  let branchtobranch = data["BranchToBranch"];
  let cashtobranch = data["CashToBranch"];
  let cashtobot = data["CashToBOT"];
  let AllRowsDet = parseInt(data["AllRowsDet"]);
  let user_id = data["user_id"];
  let CustomerID = data["CustomerID"];
  let output_ = null;
  let output = null;
  let approveProcId = 0;
  try {
    let pool = await sql.connect(config);
    let add_approveProc = await pool
      .request()
      .input("ap_name", sql.NVarChar, ap_name)
      .input("branchtocash", sql.Char, branchtocash)
      .input("cashtocash", sql.Char, cashtocash)
      .input("bottocash", sql.Char, bottocash)
      .input("branchtobranch", sql.Char, branchtobranch)
      .input("cashtobranch", sql.Char, cashtobranch)
      .input("cashtobot", sql.Char, cashtobot)
      .input("customerID", sql.NVarChar, CustomerID)
      .input("createby", sql.NVarChar, user_id)
      .execute("add_approveProc");
    output_ = add_approveProc.recordsets;
    console.log("output: ", output_);
    output_ = output_[0];
    output = output_[0];
    approveProcId = output.id;
    let data_ = approveProcId.split(":");
    // output = output
    //output_ = json(output)
    console.log("output: ", output.id);
    for (var index = 1; index <= AllRowsDet; index++) {
      let add_approveProc_det = await pool
        .request()
        .input("approve_setting_id", sql.Int, data_[0])
        .input("roleid", sql.NVarChar, data["RoleId_" + index])
        .input("version", sql.Int, data_[1])
        .input("rolename", sql.NVarChar, data["RoleName_" + index])
        .input("userid", sql.NVarChar, data["UserId_" + index])
        .input("username", sql.NVarChar, data["UserName_" + index])
        .input("createby", sql.NVarChar, user_id)
        .execute("add_approveProc_det");
      output_ = add_approveProc_det.recordsets;
    }
    return output_;
  } catch (err) {
    console.log(err);
  }
  //return add_manual_order.recordsets
}
async function set_manual_update_vrf_det(obj_json) {
  try {
    console.log('obj_json: ', obj_json)
    console.log('obj_json.length: ', Object.keys(obj_json).length)
    let pool = await sql.connect(config);
    let sp_set_deactive_vrf_det = await pool
      .request()
      .input("vrf_id", sql.Int, obj_json[0].vrf_id)
      .input("ModifyBy", sql.Int, obj_json[0].user_id)
      .execute("sp_set_deactive_vrf_det");
    let output_ = sp_set_deactive_vrf_det.recordsets;

    for (let index in obj_json) {
      console.log('set_manual_update_vrf_det obj_json[index].vrf_id: ', obj_json[index].vrf_id)
      let pool = await sql.connect(config);
      let spAdd_vrf_template_det = await pool
        .request()
        .input("vrf_id", sql.Int, obj_json[index].vrf_id)
        // .input("date_from", sql.DateTime, obj_json[index].date_from)
        // .input("date_to", sql.DateTime, obj_json[index].date_to)
        .input("fullname", sql.NVarChar, obj_json[index].fullname)
        .input("vehicle_registration", sql.NVarChar, obj_json[index].vehicle_registration)
        .input("vehicle_brand", sql.Int, obj_json[index].vehicle_brand_id)
        .input("vehicle_color", sql.Int, obj_json[index].vehicle_color_id)
        .input("card_no", sql.NVarChar, obj_json[index].card_no)
        .input("createby", sql.NVarChar, obj_json[index].user_id)
        .execute("spAdd_vrf_template_det");
      let output = spAdd_vrf_template_det.recordsets;
      // let pool = await sql.connect(config);
      // let sp_set_manual_update_vrf_det = await pool
      //   .request()
      //   .input("id", sql.Int, obj_json[index].id)
      //   .input("date_from", sql.DateTime, obj_json[index].date_from)
      //   .input("date_to", sql.DateTime, obj_json[index].date_to)
      //   .input("fullname", sql.NVarChar, obj_json[index].fullname)
      //   .input("vehicle_brand", sql.Int, obj_json[index].vehicle_brand_id)
      //   .input("vehicle_color", sql.Int, obj_json[index].vehicle_color_id)
      //   .input("vehicle_registration", sql.NVarChar, obj_json[index].vehicle_registration)
      //   .input("card_no", sql.NVarChar, obj_json[index].card_no)
      //   .input("ModifyBy", sql.Int, obj_json[index].user_id)
      //   .execute("sp_set_manual_update_vrf_det");
      // let output_ = sp_set_manual_update_vrf_det.recordsets;
    }
    //retu
    return ({ status: 'success' })//sp_set_manual_update_vrf_det.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function set_update_userinfo_vrf(obj_json) {
  try {
    let pool = await sql.connect(config);
    let sp_set_update_userinfo_vrf = await pool
      .request()
      .input("employee_id", sql.NVarChar, obj_json.employee_id)
      .input("email", sql.NVarChar, obj_json.email)
      .input("username", sql.NVarChar, obj_json.username)
      .input("first_name", sql.NVarChar, obj_json.first_name)
      .input("last_name", sql.NVarChar, obj_json.last_name)
      .input("division_id", sql.Int, obj_json.division_id)
      .input("department_id", sql.Int, obj_json.department_id)
      .input("position_id", sql.Int, obj_json.position_id)
      .input("role_id", sql.Int, obj_json.role_id)
      .input("branch_id", sql.Int, obj_json.branch_id)
      .input("ModifyBy", sql.NVarChar, obj_json.modify_by)
      .input("user_id", sql.Int, obj_json.user_id)
      .execute("sp_set_update_userinfo_vrf");
    return sp_set_update_userinfo_vrf.recordsets;
  } catch (err) {
    console.log(err);
  }

}
async function set_manual_update_vrf_trans(obj_json) {
  console.log('set_manual_update_vrf_trans obj_json.attach_file: ', obj_json.attach_file)
  try {
    let pool = await sql.connect(config);
    let sp_set_manual_update_vrf_trans = await pool
      .request()
      .input("id", sql.Int, obj_json.vrf_id)
      .input("reason", sql.NVarChar, obj_json.reason)
      .input("contactor", sql.NVarChar, obj_json.contactor)
      .input("requestor", sql.Int, obj_json.requestor)
      .input("requestor_position", sql.Int, obj_json.requestor_position)
      .input("requestor_dept", sql.Int, obj_json.requestor_dept)
      .input("requestor_phone", sql.NVarChar, obj_json.requestor_phone)
      .input("navigator", sql.Int, obj_json.navigator)
      .input("area", sql.Int, obj_json.area)
      .input("date_from", sql.DateTime, obj_json.date_from)
      .input("date_to", sql.DateTime, obj_json.date_to)
      .input("attach_file", sql.NVarChar, obj_json.attach_file)
      .input("attach_file_origin", sql.NVarChar, obj_json.attach_file_origin)
      .input("ModifyBy", sql.Int, obj_json.createby)
      .execute("sp_set_manual_update_vrf_trans");
    return sp_set_manual_update_vrf_trans.recordsets;
  } catch (err) {
    console.log(err);
  }

}
async function set_manual_update_vrf(obj_json) {
  try {
    let pool = await sql.connect(config);
    let sp_set_manual_update_vrf = await pool
      .request()
      .input("id", sql.Int, obj_json["id"])
      .input("template_name", sql.NVarChar, obj_json["template_name"])
      .input("reason", sql.NVarChar, obj_json["reason"])
      .input("contactor", sql.NVarChar, obj_json["contactor"])
      .input("requestor", sql.Int, obj_json["requestor"])
      .input("requestor_position", sql.Int, obj_json["requestor_position"])
      .input("requestor_dept", sql.Int, obj_json["requestor_dept"])
      .input("requestor_phone", sql.NVarChar, obj_json["requestor_phone"])
      .input("navigator", sql.Int, obj_json["navigator"])
      .input("area", sql.Int, obj_json["area"])
      .input("date_from", sql.DateTime, obj_json["date_from"])
      .input("date_to", sql.DateTime, obj_json["date_to"])
      .input("ModifyBy", sql.Int, obj_json["user_id"])
      .execute("sp_set_manual_update_vrf");
    return sp_set_manual_update_vrf.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function update_order(gfccp_order) {
  let NULL_ = null;
  let FLOAT_NULL_ = 0;
  let customerID = gfccp_order["customerID"];
  let order_category = gfccp_order["order_category"];
  let servicetype = gfccp_order["servicetype"];
  let refno = gfccp_order["refno"] !== undefined ? gfccp_order["refno"] : NULL_;
  let order_date = gfccp_order["order_date"];
  let branchorigin_code = gfccp_order["branchorigin_code"];
  let branchorigin_name = gfccp_order["branchorigin_name"];
  let branchdest_code = gfccp_order["branchdest_code"];
  let branchdest_name = gfccp_order["branchdest_name"];
  let remark =
    gfccp_order["remark"] !== undefined ? gfccp_order["remark"] : NULL_;
  //---note
  let note_new_1000 =
    gfccp_order["note_new_1000"] !== undefined
      ? parseFloat(gfccp_order["note_new_1000"])
      : FLOAT_NULL_;
  let note_new_500 =
    gfccp_order["note_new_500"] !== undefined
      ? parseFloat(gfccp_order["note_new_500"])
      : FLOAT_NULL_;
  let note_new_100 =
    gfccp_order["note_new_100"] !== undefined
      ? parseFloat(gfccp_order["note_new_100"])
      : FLOAT_NULL_;
  let note_new_50 =
    gfccp_order["note_new_50"] !== undefined
      ? parseFloat(gfccp_order["note_new_50"])
      : FLOAT_NULL_;
  let note_new_20 =
    gfccp_order["note_new_20"] !== undefined
      ? parseFloat(gfccp_order["note_new_20"])
      : FLOAT_NULL_;
  let note_new_10 =
    gfccp_order["note_new_10"] !== undefined
      ? parseFloat(gfccp_order["note_new_10"])
      : FLOAT_NULL_;
  let note_fit_1000 =
    gfccp_order["note_fit_1000"] !== undefined
      ? parseFloat(gfccp_order["note_fit_1000"])
      : FLOAT_NULL_;
  let note_fit_500 =
    gfccp_order["note_fit_500"] !== undefined
      ? parseFloat(gfccp_order["note_fit_500"])
      : FLOAT_NULL_;
  let note_fit_100 =
    gfccp_order["note_fit_100"] !== undefined
      ? parseFloat(gfccp_order["note_fit_100"])
      : FLOAT_NULL_;
  let note_fit_50 =
    gfccp_order["note_fit_50"] !== undefined
      ? parseFloat(gfccp_order["note_fit_50"])
      : FLOAT_NULL_;
  let note_fit_20 =
    gfccp_order["note_fit_20"] !== undefined
      ? parseFloat(gfccp_order["note_fit_20"])
      : FLOAT_NULL_;
  let note_fit_10 =
    gfccp_order["note_fit_10"] !== undefined
      ? parseFloat(gfccp_order["note_fit_10"])
      : FLOAT_NULL_;
  let note_uncount_1000 =
    gfccp_order["note_uncount_1000"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_1000"])
      : FLOAT_NULL_;
  let note_uncount_500 =
    gfccp_order["note_uncount_500"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_500"])
      : FLOAT_NULL_;
  let note_uncount_100 =
    gfccp_order["note_uncount_100"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_100"])
      : FLOAT_NULL_;
  let note_uncount_50 =
    gfccp_order["note_uncount_50"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_50"])
      : FLOAT_NULL_;
  let note_uncount_20 =
    gfccp_order["note_uncount_20"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_20"])
      : FLOAT_NULL_;
  let note_uncount_10 =
    gfccp_order["note_uncount_10"] !== undefined
      ? parseFloat(gfccp_order["note_uncount_10"])
      : FLOAT_NULL_;
  let note_unfit_1000 =
    gfccp_order["note_unfit_1000"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_1000"])
      : FLOAT_NULL_;
  let note_unfit_500 =
    gfccp_order["note_unfit_500"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_500"])
      : FLOAT_NULL_;
  let note_unfit_100 =
    gfccp_order["note_unfit_100"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_100"])
      : FLOAT_NULL_;
  let note_unfit_50 =
    gfccp_order["note_unfit_50"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_50"])
      : FLOAT_NULL_;
  let note_unfit_20 =
    gfccp_order["note_unfit_20"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_20"])
      : FLOAT_NULL_;
  let note_unfit_10 =
    gfccp_order["note_unfit_10"] !== undefined
      ? parseFloat(gfccp_order["note_unfit_10"])
      : FLOAT_NULL_;
  //----coin
  let coin_new_10 =
    gfccp_order["coin_new_10"] !== undefined
      ? parseFloat(gfccp_order["coin_new_10"])
      : FLOAT_NULL_;
  let coin_new_5 =
    gfccp_order["coin_new_5"] !== undefined
      ? parseFloat(gfccp_order["coin_new_5"])
      : FLOAT_NULL_;
  let coin_new_2 =
    gfccp_order["coin_new_2"] !== undefined
      ? parseFloat(gfccp_order["coin_new_2"])
      : FLOAT_NULL_;
  let coin_new_1 =
    gfccp_order["coin_new_1"] !== undefined
      ? parseFloat(gfccp_order["coin_new_1"])
      : FLOAT_NULL_;
  let coin_new_05 =
    gfccp_order["coin_new_05"] !== undefined
      ? parseFloat(gfccp_order["coin_new_05"])
      : FLOAT_NULL_;
  let coin_new_025 =
    gfccp_order["coin_new_025"] !== undefined
      ? parseFloat(gfccp_order["coin_new_025"])
      : FLOAT_NULL_;
  let coin_fit_10 =
    gfccp_order["coin_fit_10"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_10"])
      : FLOAT_NULL_;
  let coin_fit_5 =
    gfccp_order["coin_fit_5"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_5"])
      : FLOAT_NULL_;
  let coin_fit_2 =
    gfccp_order["coin_fit_2"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_2"])
      : FLOAT_NULL_;
  let coin_fit_1 =
    gfccp_order["coin_fit_1"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_1"])
      : FLOAT_NULL_;
  let coin_fit_05 =
    gfccp_order["coin_fit_05"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_05"])
      : FLOAT_NULL_;
  let coin_fit_025 =
    gfccp_order["coin_fit_025"] !== undefined
      ? parseFloat(gfccp_order["coin_fit_025"])
      : FLOAT_NULL_;
  let coin_uncount_10 =
    gfccp_order["coin_uncount_10"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_10"])
      : FLOAT_NULL_;
  let coin_uncount_5 =
    gfccp_order["coin_uncount_5"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_5"])
      : FLOAT_NULL_;
  let coin_uncount_2 =
    gfccp_order["coin_uncount_2"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_2"])
      : FLOAT_NULL_;
  let coin_uncount_1 =
    gfccp_order["coin_uncount_1"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_1"])
      : FLOAT_NULL_;
  let coin_uncount_05 =
    gfccp_order["coin_uncount_05"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_05"])
      : FLOAT_NULL_;
  let coin_uncount_025 =
    gfccp_order["coin_uncount_025"] !== undefined
      ? parseFloat(gfccp_order["coin_uncount_025"])
      : FLOAT_NULL_;
  let coin_unfit_10 =
    gfccp_order["coin_unfit_10"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_10"])
      : FLOAT_NULL_;
  let coin_unfit_5 =
    gfccp_order["coin_unfit_5"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_5"])
      : FLOAT_NULL_;
  let coin_unfit_2 =
    gfccp_order["coin_unfit_2"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_2"])
      : FLOAT_NULL_;
  let coin_unfit_1 =
    gfccp_order["coin_unfit_1"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_1"])
      : FLOAT_NULL_;
  let coin_unfit_05 =
    gfccp_order["coin_unfit_05"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_05"])
      : FLOAT_NULL_;
  let coin_unfit_025 =
    gfccp_order["coin_unfit_025"] !== undefined
      ? parseFloat(gfccp_order["coin_unfit_025"])
      : FLOAT_NULL_;
  //----pcs
  //---pcs note
  let pcs_note_new_1000 =
    gfccp_order["pcs_note_new_1000"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_1000"])
      : FLOAT_NULL_;
  let pcs_note_new_500 =
    gfccp_order["pcs_note_new_500"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_500"])
      : FLOAT_NULL_;
  let pcs_note_new_100 =
    gfccp_order["pcs_note_new_100"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_100"])
      : FLOAT_NULL_;
  let pcs_note_new_50 =
    gfccp_order["pcs_note_new_50"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_50"])
      : FLOAT_NULL_;
  let pcs_note_new_20 =
    gfccp_order["pcs_note_new_20"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_20"])
      : FLOAT_NULL_;
  let pcs_note_new_10 =
    gfccp_order["pcs_note_new_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_new_10"])
      : FLOAT_NULL_;
  let pcs_note_fit_1000 =
    gfccp_order["pcs_note_fit_1000"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_1000"])
      : FLOAT_NULL_;
  let pcs_note_fit_500 =
    gfccp_order["pcs_note_fit_500"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_500"])
      : FLOAT_NULL_;
  let pcs_note_fit_100 =
    gfccp_order["pcs_note_fit_100"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_100"])
      : FLOAT_NULL_;
  let pcs_note_fit_50 =
    gfccp_order["pcs_note_fit_50"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_50"])
      : FLOAT_NULL_;
  let pcs_note_fit_20 =
    gfccp_order["pcs_note_fit_20"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_20"])
      : FLOAT_NULL_;
  let pcs_note_fit_10 =
    gfccp_order["pcs_note_fit_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_fit_10"])
      : FLOAT_NULL_;
  let pcs_note_uncount_1000 =
    gfccp_order["pcs_note_uncount_1000"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_1000"])
      : FLOAT_NULL_;
  let pcs_note_uncount_500 =
    gfccp_order["pcs_note_uncount_500"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_500"])
      : FLOAT_NULL_;
  let pcs_note_uncount_100 =
    gfccp_order["pcs_note_uncount_100"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_100"])
      : FLOAT_NULL_;
  let pcs_note_uncount_50 =
    gfccp_order["pcs_note_uncount_50"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_50"])
      : FLOAT_NULL_;
  let pcs_note_uncount_20 =
    gfccp_order["pcs_note_uncount_20"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_20"])
      : FLOAT_NULL_;
  let pcs_note_uncount_10 =
    gfccp_order["pcs_note_uncount_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_uncount_10"])
      : FLOAT_NULL_;
  let pcs_note_unfit_1000 =
    gfccp_order["pcs_note_unfit_1000"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_1000"])
      : FLOAT_NULL_;
  let pcs_note_unfit_500 =
    gfccp_order["pcs_note_unfit_500"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_500"])
      : FLOAT_NULL_;
  let pcs_note_unfit_100 =
    gfccp_order["pcs_note_unfit_100"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_100"])
      : FLOAT_NULL_;
  let pcs_note_unfit_50 =
    gfccp_order["pcs_note_unfit_50"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_50"])
      : FLOAT_NULL_;
  let pcs_note_unfit_20 =
    gfccp_order["pcs_note_unfit_20"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_20"])
      : FLOAT_NULL_;
  let pcs_note_unfit_10 =
    gfccp_order["pcs_note_unfit_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_note_unfit_10"])
      : FLOAT_NULL_;
  //----pcs coin
  let pcs_coin_new_10 =
    gfccp_order["pcs_coin_new_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_10"])
      : FLOAT_NULL_;
  let pcs_coin_new_5 =
    gfccp_order["pcs_coin_new_5"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_5"])
      : FLOAT_NULL_;
  let pcs_coin_new_2 =
    gfccp_order["pcs_coin_new_2"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_2"])
      : FLOAT_NULL_;
  let pcs_coin_new_1 =
    gfccp_order["pcs_coin_new_1"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_1"])
      : FLOAT_NULL_;
  let pcs_coin_new_05 =
    gfccp_order["pcs_coin_new_05"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_05"])
      : FLOAT_NULL_;
  let pcs_coin_new_025 =
    gfccp_order["pcs_coin_new_025"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_new_025"])
      : FLOAT_NULL_;
  let pcs_coin_fit_10 =
    gfccp_order["pcs_coin_fit_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_10"])
      : FLOAT_NULL_;
  let pcs_coin_fit_5 =
    gfccp_order["pcs_coin_fit_5"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_5"])
      : FLOAT_NULL_;
  let pcs_coin_fit_2 =
    gfccp_order["pcs_coin_fit_2"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_2"])
      : FLOAT_NULL_;
  let pcs_coin_fit_1 =
    gfccp_order["pcs_coin_fit_1"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_1"])
      : FLOAT_NULL_;
  let pcs_coin_fit_05 =
    gfccp_order["pcs_coin_fit_05"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_05"])
      : FLOAT_NULL_;
  let pcs_coin_fit_025 =
    gfccp_order["pcs_coin_fit_025"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_fit_025"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_10 =
    gfccp_order["pcs_coin_uncount_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_10"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_5 =
    gfccp_order["pcs_coin_uncount_5"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_5"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_2 =
    gfccp_order["pcs_coin_uncount_2"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_2"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_1 =
    gfccp_order["pcs_coin_uncount_1"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_1"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_05 =
    gfccp_order["pcs_coin_uncount_05"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_05"])
      : FLOAT_NULL_;
  let pcs_coin_uncount_025 =
    gfccp_order["pcs_coin_uncount_025"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_uncount_025"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_10 =
    gfccp_order["pcs_coin_unfit_10"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_10"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_5 =
    gfccp_order["pcs_coin_unfit_5"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_5"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_2 =
    gfccp_order["pcs_coin_unfit_2"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_2"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_1 =
    gfccp_order["pcs_coin_unfit_1"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_1"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_05 =
    gfccp_order["pcs_coin_unfit_05"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_05"])
      : FLOAT_NULL_;
  let pcs_coin_unfit_025 =
    gfccp_order["pcs_coin_unfit_025"] !== undefined
      ? parseFloat(gfccp_order["pcs_coin_unfit_025"])
      : FLOAT_NULL_;
  //----unit
  //---unit note
  let unit_note_new_1000 =
    gfccp_order["unit_note_new_1000"] !== undefined
      ? gfccp_order["unit_note_new_1000"]
      : NULL_;
  let unit_note_new_500 =
    gfccp_order["unit_note_new_500"] !== undefined
      ? gfccp_order["unit_note_new_500"]
      : NULL_;
  let unit_note_new_100 =
    gfccp_order["unit_note_new_100"] !== undefined
      ? gfccp_order["unit_note_new_100"]
      : NULL_;
  let unit_note_new_50 =
    gfccp_order["unit_note_new_50"] !== undefined
      ? gfccp_order["unit_note_new_50"]
      : NULL_;
  let unit_note_new_20 =
    gfccp_order["unit_note_new_20"] !== undefined
      ? gfccp_order["unit_note_new_20"]
      : NULL_;
  let unit_note_new_10 =
    gfccp_order["unit_note_new_10"] !== undefined
      ? gfccp_order["unit_note_new_10"]
      : NULL_;
  let unit_note_fit_1000 =
    gfccp_order["unit_note_fit_1000"] !== undefined
      ? gfccp_order["unit_note_fit_1000"]
      : NULL_;
  let unit_note_fit_500 =
    gfccp_order["unit_note_fit_500"] !== undefined
      ? gfccp_order["unit_note_fit_500"]
      : NULL_;
  let unit_note_fit_100 =
    gfccp_order["unit_note_fit_100"] !== undefined
      ? gfccp_order["unit_note_fit_100"]
      : NULL_;
  let unit_note_fit_50 =
    gfccp_order["unit_note_fit_50"] !== undefined
      ? gfccp_order["unit_note_fit_50"]
      : NULL_;
  let unit_note_fit_20 =
    gfccp_order["unit_note_fit_20"] !== undefined
      ? gfccp_order["unit_note_fit_20"]
      : NULL_;
  let unit_note_fit_10 =
    gfccp_order["unit_note_fit_10"] !== undefined
      ? gfccp_order["unit_note_fit_10"]
      : NULL_;
  let unit_note_uncount_1000 =
    gfccp_order["unit_note_uncount_1000"] !== undefined
      ? gfccp_order["unit_note_uncount_1000"]
      : NULL_;
  let unit_note_uncount_500 =
    gfccp_order["unit_note_uncount_500"] !== undefined
      ? gfccp_order["unit_note_uncount_500"]
      : NULL_;
  let unit_note_uncount_100 =
    gfccp_order["unit_note_uncount_100"] !== undefined
      ? gfccp_order["unit_note_uncount_100"]
      : NULL_;
  let unit_note_uncount_50 =
    gfccp_order["unit_note_uncount_50"] !== undefined
      ? gfccp_order["unit_note_uncount_50"]
      : NULL_;
  let unit_note_uncount_20 =
    gfccp_order["unit_note_uncount_20"] !== undefined
      ? gfccp_order["unit_note_uncount_20"]
      : NULL_;
  let unit_note_uncount_10 =
    gfccp_order["unit_note_uncount_10"] !== undefined
      ? gfccp_order["unit_note_uncount_10"]
      : NULL_;
  let unit_note_unfit_1000 =
    gfccp_order["unit_note_unfit_1000"] !== undefined
      ? gfccp_order["unit_note_unfit_1000"]
      : NULL_;
  let unit_note_unfit_500 =
    gfccp_order["unit_note_unfit_500"] !== undefined
      ? gfccp_order["unit_note_unfit_500"]
      : NULL_;
  let unit_note_unfit_100 =
    gfccp_order["unit_note_unfit_100"] !== undefined
      ? gfccp_order["unit_note_unfit_100"]
      : NULL_;
  let unit_note_unfit_50 =
    gfccp_order["unit_note_unfit_50"] !== undefined
      ? gfccp_order["unit_note_unfit_50"]
      : NULL_;
  let unit_note_unfit_20 =
    gfccp_order["unit_note_unfit_20"] !== undefined
      ? gfccp_order["unit_note_unfit_20"]
      : NULL_;
  let unit_note_unfit_10 =
    gfccp_order["unit_note_unfit_10"] !== undefined
      ? gfccp_order["unit_note_unfit_10"]
      : NULL_;
  //----unit coin
  let unit_coin_new_10 =
    gfccp_order["unit_coin_new_10"] !== undefined
      ? gfccp_order["unit_coin_new_10"]
      : NULL_;
  let unit_coin_new_5 =
    gfccp_order["unit_coin_new_5"] !== undefined
      ? gfccp_order["unit_coin_new_5"]
      : NULL_;
  let unit_coin_new_2 =
    gfccp_order["unit_coin_new_2"] !== undefined
      ? gfccp_order["unit_coin_new_2"]
      : NULL_;
  let unit_coin_new_1 =
    gfccp_order["unit_coin_new_1"] !== undefined
      ? gfccp_order["unit_coin_new_1"]
      : NULL_;
  let unit_coin_new_05 =
    gfccp_order["unit_coin_new_05"] !== undefined
      ? gfccp_order["unit_coin_new_05"]
      : NULL_;
  let unit_coin_new_025 =
    gfccp_order["unit_coin_new_025"] !== undefined
      ? gfccp_order["unit_coin_new_025"]
      : NULL_;
  let unit_coin_fit_10 =
    gfccp_order["unit_coin_fit_10"] !== undefined
      ? gfccp_order["unit_coin_fit_10"]
      : NULL_;
  let unit_coin_fit_5 =
    gfccp_order["unit_coin_fit_5"] !== undefined
      ? gfccp_order["unit_coin_fit_5"]
      : NULL_;
  let unit_coin_fit_2 =
    gfccp_order["unit_coin_fit_2"] !== undefined
      ? gfccp_order["unit_coin_fit_2"]
      : NULL_;
  let unit_coin_fit_1 =
    gfccp_order["unit_coin_fit_1"] !== undefined
      ? gfccp_order["unit_coin_fit_1"]
      : NULL_;
  let unit_coin_fit_05 =
    gfccp_order["unit_coin_fit_05"] !== undefined
      ? gfccp_order["unit_coin_fit_05"]
      : NULL_;
  let unit_coin_fit_025 =
    gfccp_order["unit_coin_fit_025"] !== undefined
      ? gfccp_order["unit_coin_fit_025"]
      : NULL_;
  let unit_coin_uncount_10 =
    gfccp_order["unit_coin_uncount_10"] !== undefined
      ? gfccp_order["unit_coin_uncount_10"]
      : NULL_;
  let unit_coin_uncount_5 =
    gfccp_order["unit_coin_uncount_5"] !== undefined
      ? gfccp_order["unit_coin_uncount_5"]
      : NULL_;
  let unit_coin_uncount_2 =
    gfccp_order["unit_coin_uncount_2"] !== undefined
      ? gfccp_order["unit_coin_uncount_2"]
      : NULL_;
  let unit_coin_uncount_1 =
    gfccp_order["unit_coin_uncount_1"] !== undefined
      ? gfccp_order["unit_coin_uncount_1"]
      : NULL_;
  let unit_coin_uncount_05 =
    gfccp_order["unit_coin_uncount_05"] !== undefined
      ? gfccp_order["unit_coin_uncount_05"]
      : NULL_;
  let unit_coin_uncount_025 =
    gfccp_order["unit_coin_uncount_025"] !== undefined
      ? gfccp_order["unit_coin_uncount_025"]
      : NULL_;
  let unit_coin_unfit_10 =
    gfccp_order["unit_coin_unfit_10"] !== undefined
      ? gfccp_order["unit_coin_unfit_10"]
      : NULL_;
  let unit_coin_unfit_5 =
    gfccp_order["unit_coin_unfit_5"] !== undefined
      ? gfccp_order["unit_coin_unfit_5"]
      : NULL_;
  let unit_coin_unfit_2 =
    gfccp_order["unit_coin_unfit_2"] !== undefined
      ? gfccp_order["unit_coin_unfit_2"]
      : NULL_;
  let unit_coin_unfit_1 =
    gfccp_order["unit_coin_unfit_1"] !== undefined
      ? gfccp_order["unit_coin_unfit_1"]
      : NULL_;
  let unit_coin_unfit_05 =
    gfccp_order["unit_coin_unfit_05"] !== undefined
      ? gfccp_order["unit_coin_unfit_05"]
      : NULL_;
  let unit_coin_unfit_025 =
    gfccp_order["unit_coin_unfit_025"] !== undefined
      ? gfccp_order["unit_coin_unfit_025"]
      : NULL_;

  // let row_type = 'normal'
  // let input_type = 'manual_add'
  let user_id = gfccp_order["user_id"];
  let tbGrandTotalAmount = gfccp_order["tbGrandTotalAmount"];
  // console.log(unit_note_new_1000)
  // console.log(note_new_1000)
  try {
    let pool = await sql.connect(config);
    let update_order = await pool
      .request()
      .input("Id_", sql.NVarChar, gfccp_order["orderId"])
      .input("customerID", sql.NVarChar, customerID)
      .input("order_category", sql.NVarChar, order_category)
      .input("servicetype", sql.NVarChar, servicetype)
      .input("refno", sql.NVarChar, refno)
      .input("order_date", sql.DateTime, order_date)
      .input("branchorigin_code", sql.NVarChar, branchorigin_code)
      .input("branchorigin_name", sql.NVarChar, branchorigin_name)
      .input("branchdest_code", sql.NVarChar, branchdest_code)
      .input("branchdest_name", sql.NVarChar, branchdest_name)
      .input("remark", sql.NVarChar, remark)
      //---note
      .input("note_new_1000", sql.Float, note_new_1000)
      .input("note_new_500", sql.Float, note_new_500)
      .input("note_new_100", sql.Float, note_new_100)
      .input("note_new_50", sql.Float, note_new_50)
      .input("note_new_20", sql.Float, note_new_20)
      .input("note_new_10", sql.Float, note_new_10)
      .input("note_fit_1000", sql.Float, note_fit_1000)
      .input("note_fit_500", sql.Float, note_fit_500)
      .input("note_fit_100", sql.Float, note_fit_100)
      .input("note_fit_50", sql.Float, note_fit_50)
      .input("note_fit_20", sql.Float, note_fit_20)
      .input("note_fit_10", sql.Float, note_fit_10)
      .input("note_uncount_1000", sql.Float, note_uncount_1000)
      .input("note_uncount_500", sql.Float, note_uncount_500)
      .input("note_uncount_100", sql.Float, note_uncount_100)
      .input("note_uncount_50", sql.Float, note_uncount_50)
      .input("note_uncount_20", sql.Float, note_uncount_20)
      .input("note_uncount_10", sql.Float, note_uncount_10)
      .input("note_unfit_1000", sql.Float, note_unfit_1000)
      .input("note_unfit_500", sql.Float, note_unfit_500)
      .input("note_unfit_100", sql.Float, note_unfit_100)
      .input("note_unfit_50", sql.Float, note_unfit_50)
      .input("note_unfit_20", sql.Float, note_unfit_20)
      .input("note_unfit_10", sql.Float, note_unfit_10)
      //----coin
      .input("coin_new_10", sql.Float, coin_new_10)
      .input("coin_new_5", sql.Float, coin_new_5)
      .input("coin_new_2", sql.Float, coin_new_2)
      .input("coin_new_1", sql.Float, coin_new_1)
      .input("coin_new_05", sql.Float, coin_new_05)
      .input("coin_new_025", sql.Float, coin_new_025)
      .input("coin_fit_10", sql.Float, coin_fit_10)
      .input("coin_fit_5", sql.Float, coin_fit_5)
      .input("coin_fit_2", sql.Float, coin_fit_2)
      .input("coin_fit_1", sql.Float, coin_fit_1)
      .input("coin_fit_05", sql.Float, coin_fit_05)
      .input("coin_fit_025", sql.Float, coin_fit_025)
      .input("coin_uncount_10", sql.Float, coin_uncount_10)
      .input("coin_uncount_5", sql.Float, coin_uncount_5)
      .input("coin_uncount_2", sql.Float, coin_uncount_2)
      .input("coin_uncount_1", sql.Float, coin_uncount_1)
      .input("coin_uncount_05", sql.Float, coin_uncount_05)
      .input("coin_uncount_025", sql.Float, coin_uncount_025)
      .input("coin_unfit_10", sql.Float, coin_unfit_10)
      .input("coin_unfit_5", sql.Float, coin_unfit_5)
      .input("coin_unfit_2", sql.Float, coin_unfit_2)
      .input("coin_unfit_1", sql.Float, coin_unfit_1)
      .input("coin_unfit_05", sql.Float, coin_unfit_05)
      .input("coin_unfit_025", sql.Float, coin_unfit_025)
      //----pcs
      .input("pcs_note_new_1000", sql.Float, pcs_note_new_1000)
      .input("pcs_note_new_500", sql.Float, pcs_note_new_500)
      .input("pcs_note_new_100", sql.Float, pcs_note_new_100)
      .input("pcs_note_new_50", sql.Float, pcs_note_new_50)
      .input("pcs_note_new_20", sql.Float, pcs_note_new_20)
      .input("pcs_note_new_10", sql.Float, pcs_note_new_10)
      .input("pcs_note_fit_1000", sql.Float, pcs_note_fit_1000)
      .input("pcs_note_fit_500", sql.Float, pcs_note_fit_500)
      .input("pcs_note_fit_100", sql.Float, pcs_note_fit_100)
      .input("pcs_note_fit_50", sql.Float, pcs_note_fit_50)
      .input("pcs_note_fit_20", sql.Float, pcs_note_fit_20)
      .input("pcs_note_fit_10", sql.Float, pcs_note_fit_10)
      .input("pcs_note_uncount_1000", sql.Float, pcs_note_uncount_1000)
      .input("pcs_note_uncount_500", sql.Float, pcs_note_uncount_500)
      .input("pcs_note_uncount_100", sql.Float, pcs_note_uncount_100)
      .input("pcs_note_uncount_50", sql.Float, pcs_note_uncount_50)
      .input("pcs_note_uncount_20", sql.Float, pcs_note_uncount_20)
      .input("pcs_note_uncount_10", sql.Float, pcs_note_uncount_10)
      .input("pcs_note_unfit_1000", sql.Float, pcs_note_unfit_1000)
      .input("pcs_note_unfit_500", sql.Float, pcs_note_unfit_500)
      .input("pcs_note_unfit_100", sql.Float, pcs_note_unfit_100)
      .input("pcs_note_unfit_50", sql.Float, pcs_note_unfit_50)
      .input("pcs_note_unfit_20", sql.Float, pcs_note_unfit_20)
      .input("pcs_note_unfit_10", sql.Float, pcs_note_unfit_10)
      .input("pcs_coin_new_10", sql.Float, pcs_coin_new_10)
      .input("pcs_coin_new_5", sql.Float, pcs_coin_new_5)
      .input("pcs_coin_new_2", sql.Float, pcs_coin_new_2)
      .input("pcs_coin_new_1", sql.Float, pcs_coin_new_1)
      .input("pcs_coin_new_05", sql.Float, pcs_coin_new_05)
      .input("pcs_coin_new_025", sql.Float, pcs_coin_new_025)
      .input("pcs_coin_fit_10", sql.Float, pcs_coin_fit_10)
      .input("pcs_coin_fit_5", sql.Float, pcs_coin_fit_5)
      .input("pcs_coin_fit_2", sql.Float, pcs_coin_fit_2)
      .input("pcs_coin_fit_1", sql.Float, pcs_coin_fit_1)
      .input("pcs_coin_fit_05", sql.Float, pcs_coin_fit_05)
      .input("pcs_coin_fit_025", sql.Float, pcs_coin_fit_025)
      .input("pcs_coin_uncount_10", sql.Float, pcs_coin_uncount_10)
      .input("pcs_coin_uncount_5", sql.Float, pcs_coin_uncount_5)
      .input("pcs_coin_uncount_2", sql.Float, pcs_coin_uncount_2)
      .input("pcs_coin_uncount_1", sql.Float, pcs_coin_uncount_1)
      .input("pcs_coin_uncount_05", sql.Float, pcs_coin_uncount_05)
      .input("pcs_coin_uncount_025", sql.Float, pcs_coin_uncount_025)
      .input("pcs_coin_unfit_10", sql.Float, pcs_coin_unfit_10)
      .input("pcs_coin_unfit_5", sql.Float, pcs_coin_unfit_5)
      .input("pcs_coin_unfit_2", sql.Float, pcs_coin_unfit_2)
      .input("pcs_coin_unfit_1", sql.Float, pcs_coin_unfit_1)
      .input("pcs_coin_unfit_05", sql.Float, pcs_coin_unfit_05)
      .input("pcs_coin_unfit_025", sql.Float, pcs_coin_unfit_025)
      //----unit
      .input("unit_note_new_1000", sql.NVarChar, unit_note_new_1000)
      .input("unit_note_new_500", sql.NVarChar, unit_note_new_500)
      .input("unit_note_new_100", sql.NVarChar, unit_note_new_100)
      .input("unit_note_new_50", sql.NVarChar, unit_note_new_50)
      .input("unit_note_new_20", sql.NVarChar, unit_note_new_20)
      .input("unit_note_new_10", sql.NVarChar, unit_note_new_10)
      .input("unit_note_fit_1000", sql.NVarChar, unit_note_fit_1000)
      .input("unit_note_fit_500", sql.NVarChar, unit_note_fit_500)
      .input("unit_note_fit_100", sql.NVarChar, unit_note_fit_100)
      .input("unit_note_fit_50", sql.NVarChar, unit_note_fit_50)
      .input("unit_note_fit_20", sql.NVarChar, unit_note_fit_20)
      .input("unit_note_fit_10", sql.NVarChar, unit_note_fit_10)
      .input("unit_note_uncount_1000", sql.NVarChar, unit_note_uncount_1000)
      .input("unit_note_uncount_500", sql.NVarChar, unit_note_uncount_500)
      .input("unit_note_uncount_100", sql.NVarChar, unit_note_uncount_100)
      .input("unit_note_uncount_50", sql.NVarChar, unit_note_uncount_50)
      .input("unit_note_uncount_20", sql.NVarChar, unit_note_uncount_20)
      .input("unit_note_uncount_10", sql.NVarChar, unit_note_uncount_10)
      .input("unit_note_unfit_1000", sql.NVarChar, unit_note_unfit_1000)
      .input("unit_note_unfit_500", sql.NVarChar, unit_note_unfit_500)
      .input("unit_note_unfit_100", sql.NVarChar, unit_note_unfit_100)
      .input("unit_note_unfit_50", sql.NVarChar, unit_note_unfit_50)
      .input("unit_note_unfit_20", sql.NVarChar, unit_note_unfit_20)
      .input("unit_note_unfit_10", sql.NVarChar, unit_note_unfit_10)
      .input("unit_coin_new_10", sql.NVarChar, unit_coin_new_10)
      .input("unit_coin_new_5", sql.NVarChar, unit_coin_new_5)
      .input("unit_coin_new_2", sql.NVarChar, unit_coin_new_2)
      .input("unit_coin_new_1", sql.NVarChar, unit_coin_new_1)
      .input("unit_coin_new_05", sql.NVarChar, unit_coin_new_05)
      .input("unit_coin_new_025", sql.NVarChar, unit_coin_new_025)
      .input("unit_coin_fit_10", sql.NVarChar, unit_coin_fit_10)
      .input("unit_coin_fit_5", sql.NVarChar, unit_coin_fit_5)
      .input("unit_coin_fit_2", sql.NVarChar, unit_coin_fit_2)
      .input("unit_coin_fit_1", sql.NVarChar, unit_coin_fit_1)
      .input("unit_coin_fit_05", sql.NVarChar, unit_coin_fit_05)
      .input("unit_coin_fit_025", sql.NVarChar, unit_coin_fit_025)
      .input("unit_coin_uncount_10", sql.NVarChar, unit_coin_uncount_10)
      .input("unit_coin_uncount_5", sql.NVarChar, unit_coin_uncount_5)
      .input("unit_coin_uncount_2", sql.NVarChar, unit_coin_uncount_2)
      .input("unit_coin_uncount_1", sql.NVarChar, unit_coin_uncount_1)
      .input("unit_coin_uncount_05", sql.NVarChar, unit_coin_uncount_05)
      .input("unit_coin_uncount_025", sql.NVarChar, unit_coin_uncount_025)
      .input("unit_coin_unfit_10", sql.NVarChar, unit_coin_unfit_10)
      .input("unit_coin_unfit_5", sql.NVarChar, unit_coin_unfit_5)
      .input("unit_coin_unfit_2", sql.NVarChar, unit_coin_unfit_2)
      .input("unit_coin_unfit_1", sql.NVarChar, unit_coin_unfit_1)
      .input("unit_coin_unfit_05", sql.NVarChar, unit_coin_unfit_05)
      .input("unit_coin_unfit_025", sql.NVarChar, unit_coin_unfit_025)
      .input("total_by_branch", sql.Float, tbGrandTotalAmount)
      // .input('row_type', sql.NVarChar, row_type)
      // .input('input_type', sql.NVarChar, input_type)
      .input("modifyby", sql.NVarChar, user_id)
      .execute("update_order");
    return update_order.recordsets;
  } catch (err) {
    console.log(err);
  }
  //return add_manual_order.recordsets
}
async function update_approveproc(data) {
  let branchtocash = data["branchtocash"];
  let cashtocash = data["cashtocash"];
  let bottocash = data["bottocash"];
  let branchtobranch = data["branchtobranch"];
  let cashtobranch = data["cashtobranch"];
  let cashtobot = data["cashtobot"];
  let AllRowsDet = parseInt(data["AllRowsDet"]);
  let output_ = null;
  console.log("Id: ", data["Id"]);

  try {
    let pool = await sql.connect(config);
    let update_approveproc = await pool
      .request()
      .input("Id_", sql.Int, data["Id"])
      .input("ap_name", sql.NVarChar, data["ap_name"])
      .input("branchtocash", sql.NVarChar, branchtocash)
      .input("cashtocash", sql.NVarChar, cashtocash)
      .input("bottocash", sql.NVarChar, bottocash)
      .input("branchtobranch", sql.NVarChar, branchtobranch)
      .input("cashtobranch", sql.NVarChar, cashtobranch)
      .input("cashtobot", sql.NVarChar, cashtobot)
      .input("modifyby", sql.NVarChar, data["user_id"])
      .input("customerID", sql.NVarChar, data["CustomerID"])
      .execute("update_approveproc");
    output_ = update_approveproc.recordsets[0];
    output_ = parseInt(output_[0].newid_);
    console.log("output_: ", output_);
    for (var index = 1; index <= AllRowsDet; index++) {
      console.log("output_: ", output_);
      console.log(
        'data["ddlRoleEditId_' + index + '"]: ',
        data["ddlRoleEditId_" + index]
      );
      console.log(
        'data["ddlRoleEditName_' + index + '"]: ',
        data["ddlRoleEditName_" + index]
      );
      console.log(
        'data["ddlUserEditId_' + index + '"]: ',
        data["ddlUserEditId_" + index]
      );
      console.log(
        'data["ddlUserEditName_' + index + '"]: ',
        data["ddlUserEditName_" + index]
      );
      console.log('data["user_id"]: ', data["user_id"]);
      let update_approveproc_det = await pool
        .request()
        .input("id_approve_setting", sql.Int, output_)
        // .input('Id', sql.Int, data["ApproveProcDetId"+index])
        .input("roleid", sql.Int, parseInt(data["ddlRoleEditId_" + index]))
        .input("rolename", sql.NVarChar, data["ddlRoleEditName_" + index])
        .input("userid", sql.Int, parseInt(data["ddlUserEditId_" + index]))
        .input("username", sql.NVarChar, data["ddlUserEditName_" + index])
        .input("modifyby", sql.NVarChar, data["user_id"])
        .execute("update_approveproc_det");
      output_2 = update_approveproc_det.recordsets;
    }
    return output_;
  } catch (err) {
    console.log(err);
  }
}
async function delete_app_proc_det(Id, user_id) {
  try {
    let pool = await sql.connect(config);
    let delete_app_proc_det = await pool
      .request()
      .input("Id", sql.Int, Id)
      .input("modifyby", sql.Int, user_id)
      .execute("delete_app_proc_det");
    return delete_app_proc_det.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function update_vrfstatus(Id, Type_, user_id) {
  try {
    let pool = await sql.connect(config);
    let update_vrfstatus = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.NVarChar, user_id)
      .execute("spUpdate_vrfstatus");
    return update_vrfstatus.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function update_user_vrf_status(Id
  , Type_
  , user_id
) {
  try {
    let pool = await sql.connect(config);
    let spUpdate_user_vrf_status = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.NVarChar, user_id)
      .execute("spUpdate_user_vrf_status");
    return spUpdate_user_vrf_status.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function update_vrf_requester_trans_status_all(Id
  , Type_
  , user_id
  , role_id
  , work_flow_id
  , io
) {
  try {
    console.log('update_vrf_requester_trans_status_all Id: ', Id, 'Type_: ', Type_, 'user_id: ', user_id, 'role_id: ', role_id, 'work_flow_id: ', work_flow_id)
    let pool = await sql.connect(config);
    let update_vrf_requester_trans_status_all = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.NVarChar, user_id)
      .input("role_id", sql.Int, role_id)
      .input("work_flow_id", sql.Int, work_flow_id)
      .execute("spUpdate_vrf_requester_trans_status");
    if (update_vrf_requester_trans_status_all.recordsets.length > 0 &&
      update_vrf_requester_trans_status_all.recordsets[0].length > 0) {
      let approveStatus = update_vrf_requester_trans_status_all.recordsets[0][0].approve_status;
      console.log('approveStatus: ', approveStatus);
      io.emit('new_vrf_send_approve', {
        message: 'new_vrf_send_approve!',
        Id: Id,
        user_id: user_id,
        role_id: role_id,
        approve_status: approveStatus
      });
    } else {
      console.log('No data found');
    }

    return update_vrf_requester_trans_status_all.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function update_vrf_trans_status(Id
  , Type_
  , user_id
  , role_id
  , work_flow_id
  , department_id
  , branch_id
  , division_id
  , io
) {
  try {
    let type_new_vrf_send_approve = parseInt(role_id) === 8 ? 'new_vrf_for_security' : 'new_vrf_send_approve';
    console.log('type_new_vrf_send_approve: ', type_new_vrf_send_approve)
    let pool = await sql.connect(config);
    let update_vrf_trans_status = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.NVarChar, user_id)
      .input("role_id", sql.Int, role_id)
      .input("work_flow_id", sql.Int, work_flow_id)
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .input("division_id", sql.Int, division_id)
      .execute("spUpdate_vrf_trans_status");
    let approveStatus = update_vrf_trans_status.recordsets[0][0].approve_status;
    console.log('approveStatus: ', approveStatus)
    io.emit(type_new_vrf_send_approve, {
      message: type_new_vrf_send_approve,
      Id: Id,
      user_id: user_id,
      role_id: role_id,
      approve_status: approveStatus
    });

    return update_vrf_trans_status.recordsets;
  } catch (err) {
    console.log(err);
  }
}
// async function update_vrf_trans_status(Id
//   , Type_
//   , user_id
//   , role_id
//   , work_flow_id) {
//   try {
//     let pool = await sql.connect(config);
//     let update_vrf_trans_status = await pool
//       .request()
//       .input("Id_", sql.Int, Id)
//       .input("Type_", sql.NVarChar, Type_)
//       .input("user_id", sql.NVarChar, user_id)
//       .input("role_id", sql.Int, role_id)
//       .input("work_flow_id", sql.Int, work_flow_id)
//       .execute("spUpdate_vrf_trans_status");
//     return update_vrf_trans_status.recordsets;
//   } catch (err) {
//     console.log(err);
//   }
// }
async function set_update_vrf_det_cancelcheckinout(Id,
  Type_,
  user_id,
  checkincheckout_det_id
) {
  console.log('set_update_vrf_det_cancelcheckinout Id: '
  , Id, 'Type: ', Type_
  , 'user_id: ', user_id
  , 'checkincheckout_det_id: ', checkincheckout_det_id
  )
  try {
    let pool = await sql.connect(config);
    let sp_update_vrf_det_cancelcheckinout = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.Int, user_id)
      .input("checkincheckout_det_id", sql.Int, checkincheckout_det_id)
      //  .input("comment", sql.NVarChar, comment)
      .execute("sp_update_vrf_det_cancelcheckinout");
    return sp_update_vrf_det_cancelcheckinout.recordsets;
  } catch (err) {
    console.log(err);
  }
 }
async function set_sp_update_vrf_det_checkinout(Id,
  Type_,
  user_id
) {
  console.log('set_sp_update_vrf_det_checkinout Id: ', Id, 'Type: ', Type_, 'user_id: ', user_id
  )
  try {
    let pool = await sql.connect(config);
    let sp_update_vrf_det_checkinout = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.Int, user_id)
      //  .input("comment", sql.NVarChar, comment)
      .execute("sp_update_vrf_det_checkinout");
    return sp_update_vrf_det_checkinout.recordsets;
  } catch (err) {
    console.log(err);
  }
}
// async function set_sp_update_vrf_checkinount(Id, Type_, user_id, comment) {
//   console.log('Id: ', Id, 'Type: ', Type_, 'user_id: ', user_id, 'comment: '
//     , comment)
//   try {
//     let pool = await sql.connect(config);
//     let sp_update_vrf_checkinount = await pool
//       .request()
//       .input("Id_", sql.Int, Id)
//       .input("Type_", sql.NVarChar, Type_)
//       .input("user_id", sql.Int, user_id)
//       .input("comment", sql.NVarChar, comment)
//       .execute("sp_update_vrf_checkinount");
//     return sp_update_vrf_checkinount.recordsets;
//   } catch (err) {
//     console.log(err);
//   }
// }
async function set_sp_update_vrf_checkinount(Id, Type_, user_id, comment) {
  console.log('Id: ', Id, 'Type: ', Type_, 'user_id: ', user_id, 'comment: '
    , comment)
  try {
    let pool = await sql.connect(config);
    let sp_update_vrf_checkinount = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.Int, user_id)
      .input("comment", sql.NVarChar, comment)
      .execute("sp_update_vrf_checkinount");
    return sp_update_vrf_checkinount.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function update_vrf_approve_status_from_mail(user_id, vrf_id
  , type, io
) {
  console.log('update_vrf_approve_status_from_mail userId: ', user_id
    , 'vrf_id: ', vrf_id
    , 'type: ', type
  )
  try {

    let pool = await sql.connect(config);
    //let type_new_vrf_send_approve = parseInt(role_id) === 8 ? 'new_vrf_for_security' : 'new_vrf_send_approve';
    let sp_update_vrf_approve_from_mail = await pool
      .request()
      .input("vrf_id", sql.Int, vrf_id)
      .input("Type_", sql.NVarChar, type)
      .input("user_id", sql.Int, user_id)
      .execute("sp_update_vrf_approve_from_mail");
    let approveStatus = sp_update_vrf_approve_from_mail.recordsets[0][0].approve_status;
    console.log('update_vrf_approve_status_from_mail approveStatus: '
      , approveStatus
      , 'role_id_approver: '
      , sp_update_vrf_approve_from_mail.recordsets[0][0].role_id_approver
    )
    if (sp_update_vrf_approve_from_mail.recordsets[0][0].Id) {
      let Id = sp_update_vrf_approve_from_mail.recordsets[0][0].Id;
      let type_new_vrf_send_approve = parseInt(sp_update_vrf_approve_from_mail.recordsets[0][0].role_id_approver) === 8 ? 'new_vrf_for_security' : 'new_vrf_send_approve';
      io.emit(type_new_vrf_send_approve, {
        message: type_new_vrf_send_approve,
        Id: Id,
        user_id: user_id,
        role_id: role_id,
        approve_status: approveStatus
      });
    }

    return sp_update_vrf_approve_from_mail.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function update_vrf_trans_approve_status(Id, Type_
  , user_id
  , role_id
  , work_flow_id
  , department_id
  , branch_id
  , division_id
  , io
) {
  console.log('update_vrf_trans_approve_status Id: ', Id, 'Type: ', Type_, 'user_id: ', user_id, 'role_id: '
    , role_id, 'work_flow_id', work_flow_id)
  try {

    let pool = await sql.connect(config);
    let type_new_vrf_send_approve = parseInt(role_id) === 8 ? 'new_vrf_for_security' : 'new_vrf_send_approve';
    let sp_update_vrf_trans_approve_status = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.Int, user_id)
      .input("role_id", sql.Int, role_id)
      .input("work_flow_id", sql.Int, work_flow_id)
      .input("department_id", sql.Int, department_id)
      .input("branch_id", sql.Int, branch_id)
      .input("division_id", sql.Int, division_id)
      .execute("sp_update_vrf_trans_approve_status");
    let approveStatus = sp_update_vrf_trans_approve_status.recordsets[0][0].approve_status;
    console.log('approveStatus: ', approveStatus)
    io.emit(type_new_vrf_send_approve, {
      message: type_new_vrf_send_approve,
      Id: Id,
      user_id: user_id,
      role_id: role_id,
      approve_status: approveStatus
    });
    return sp_update_vrf_trans_approve_status.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function get_upload_filename(Id, Type_, user_id) {
  try {
    let pool = await sql.connect(config);
    let spGet_upload_filename = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .execute("spGet_upload_filename");
    return spGet_upload_filename.recordsets;
  } catch (err) {
    console.log(err);
  }
}
module.exports = { 
  get_all_vrf_list:get_all_vrf_list, 
  get_currentDateTime:get_currentDateTime,
  set_update_vrf_det_cancelcheckinout: set_update_vrf_det_cancelcheckinout,
  get_vrf_security_det: get_vrf_security_det,
  set_update_urgentcase_vrf: set_update_urgentcase_vrf,
  set_update_urgentcase_vrf_det: set_update_urgentcase_vrf_det,
  set_sp_update_vrf_det_checkinout: set_sp_update_vrf_det_checkinout,
  get_vrf_apprve_page: get_vrf_apprve_page,
  update_vrf_approve_status_from_mail: update_vrf_approve_status_from_mail,
  getEmail_recipient: getEmail_recipient,
  get_data_approve_list_for_security: get_data_approve_list_for_security,
  get_data_approve_list: get_data_approve_list,
  get_search_vrf_approve_trans: get_search_vrf_approve_trans,
  get_search_vrf_for_guard: get_search_vrf_for_guard,
  update_vrf_requester_trans_status_all: update_vrf_requester_trans_status_all,
  get_search_vrf_templete: get_search_vrf_templete,
  get_search_vrf_list: get_search_vrf_list,
  get_search_user_vrf_by_dept: get_search_user_vrf_by_dept,
  get_role_by_dept: get_role_by_dept,
  get_user_list_by_dept: get_user_list_by_dept,
  get_mail_info_final_approve: get_mail_info_final_approve,
  get_search_user_vrf: get_search_user_vrf,
  set_update_userinfo_vrf: set_update_userinfo_vrf,
  get_uservrf_info: get_uservrf_info,
  update_user_vrf_status: update_user_vrf_status,
  set_add_user_vrf: set_add_user_vrf,
  get_role_all: get_role_all,
  get_branch_all: get_branch_all,
  get_division_all: get_division_all,
  get_dept_all: get_dept_all,
  get_user_list: get_user_list,
  get_mail_info_next_approve: get_mail_info_next_approve,
  set_sp_update_vrf_checkinount: set_sp_update_vrf_checkinount,
  get_vrf_lst_for_security: get_vrf_lst_for_security,
  get_dept_by_branch: get_dept_by_branch,
  get_user_by_branch: get_user_by_branch,
  set_reject_vrf: set_reject_vrf,
  get_mail_vrf_info: get_mail_vrf_info,
  get_vrf_approve_list: get_vrf_approve_list,
  update_vrf_trans_approve_status: update_vrf_trans_approve_status,
  get_complete_word: get_complete_word,
  get_templete_det: get_templete_det,
  get_templete: get_templete,
  get_search_vrf_trans: get_search_vrf_trans,
  get_upload_filename: get_upload_filename,
  update_vrf_trans_status: update_vrf_trans_status,
  set_manual_update_vrf_det_trans: set_manual_update_vrf_det_trans,
  set_manual_update_vrf_trans: set_manual_update_vrf_trans,
  get_vrf_det: get_vrf_det,
  get_vrf: get_vrf,
  set_manual_add_vrf_trans_det: set_manual_add_vrf_trans_det,
  set_manual_add_vrf_trans: set_manual_add_vrf_trans,
  get_vrf_list: get_vrf_list,
  get_search_vrf: get_search_vrf,
  set_manual_update_vrf_det: set_manual_update_vrf_det,
  set_manual_update_vrf: set_manual_update_vrf,
  get_templete_vrf_det: get_templete_vrf_det,
  get_templete_vrf: get_templete_vrf,
  get_templete_vrf_list: get_templete_vrf_list,
  set_manual_add_vrf_det: set_manual_add_vrf_det,
  set_manual_add_vrf: set_manual_add_vrf,
  get_meeting_area: get_meeting_area,
  get_navigator: get_navigator,
  get_dept: get_dept,
  get_position: get_position,
  get_user: get_user,
  get_vehicle_color: get_vehicle_color,
  get_vehicle_brand: get_vehicle_brand,
  get_permission_access: get_permission_access,
  getactivity_authen: getactivity_authen,
  getActitySelectd: getActitySelectd,
  getuserEdit: getuserEdit,
  delete_app_proc_det: delete_app_proc_det,
  add_manual_order: add_manual_order,
  getuserinfo: getuserinfo,
  getCashOrder: getCashOrder,
  update_vrfstatus: update_vrfstatus,
  update_order: update_order,
  getDownloadLink: getDownloadLink,
  getRole: getRole,
  getUser: getUser,
  add_approveProc: add_approveProc,
  update_approveproc: update_approveproc,
};
