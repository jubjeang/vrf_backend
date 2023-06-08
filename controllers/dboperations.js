var config = require("../server/dbconfig");
const sql = require("mssql");

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
async function getOrder_status(
  user_id,
  customerID,
  orderId,
  activity_type,
  service_type
) {
  //service_type:Deposit,Withdraw
  try {
    let pool = await sql.connect(config);
    let spGetOrder_status = await pool
      .request()
      .input("user_id", sql.Int, user_id)
      .input("customerID", sql.NVarChar, customerID)
      .input("orderId", sql.Int, orderId)
      .input("activity_type", sql.NVarChar, activity_type)
      .input("service_type", sql.NVarChar, service_type)
      .execute("spGetOrder_status");
    return spGetOrder_status.recordsets;
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
async function get_pbi_url(pagename, CustomerID, user_id) {
  try {
    let pool = await sql.connect(config);
    let spGet_pbi_url = await pool
      .request()
      .input("CustomerID", sql.NVarChar, CustomerID)
      .input("pagename", sql.NVarChar, pagename)
      .input("user_id", sql.Int, user_id)
      .execute("spGet_pbi_url");
    // .query("SELECT top 1 pbi_url from T_Graph_Info where CustomerID = @CustomerID and pagename = @pagename and [Status]='1' ");
    return spGet_pbi_url.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getBankTypeData(userID) {
  try {
    let pool = await sql.connect(config);
    let spBankType = await pool
      .request()
      .input("userID", sql.Int, userID)
      .execute("spBankType");
    return spBankType.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getCCT_Data(CustomerID, user_id) {
  try {
    let pool = await sql.connect(config);
    let spGetCCT_Data = await pool
      .request()
      .input("CustomerID", sql.NVarChar, CustomerID)
      .input("user_id", sql.Int, user_id)
      .execute("spGetCCT_Data");
    return spGetCCT_Data.recordsets;
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
//------------branch data
async function getBranchData(CustomerID, user_id) {
  try {
    let pool = await sql.connect(config);
    let spBranchData = await pool
      .request()
      .input("CustomerID", sql.NVarChar, CustomerID)
      .input("user_id", sql.Int, user_id)
      .execute("spBranchData");
    return spBranchData.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getCashCenterBOT(CustomerID, user_id) {
  try {
    let pool = await sql.connect(config);
    let spCashCenterData = await pool
      .request()
      // let CustomerID_ = CustomerID
      // CustomerID_ = '1493f524-c52e-4c06-aee8-8ef962929242'
      .input("CustomerID", sql.NVarChar, CustomerID)
      .input("user_id", sql.Int, user_id)
      .execute("spCashCenterData");
    return spCashCenterData.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getCashCenterData(CustomerID, user_id) {
  try {
    let pool = await sql.connect(config);
    let spCashCenterData = await pool
      .request()
      .input("CustomerID", sql.NVarChar, CustomerID)
      .input("user_id", sql.Int, user_id)
      .execute("spCashCenterData");
    return spCashCenterData.recordsets;
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
async function getBOT_Branch(user_id, CustomerID) {
  try {
    console.log("getBOT_Branch user_id :", user_id);
    console.log("getBOT_Branch CustomerID :", CustomerID);
    let pool = await sql.connect(config);
    let spBOT_Branch = await pool
      .request()
      .input("CustomerID", sql.NVarChar, CustomerID)
      .input("user_id", sql.Int, user_id)
      .execute("spBOT_Branch");
    return spBOT_Branch.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getBranchForCash(CustomerID, CCT, user_id) {
  try {
    let pool = await sql.connect(config);
    let spBranchForCash = await pool
      .request()
      .input("CustomerID", sql.NVarChar, CustomerID)
      .input("CCT", sql.NVarChar, CCT)
      .input("user_id", sql.Int, user_id)
      .execute("spBranchForCash");
    return spBranchForCash.recordsets;
    // let pool = await sql.connect(config);
    // let sql_=""
    // sql_="select * from [dbo].[T_Branch] where gfc_cct='"+CCT
    // sql_ +="' and CustomerID='"+CustomerID+"' "
    // sql_ +=" and branch_status=0"
    // console.log('sql_: ',sql_)
    // console.log('user_id: ',user_id)
    // console.log('CustomerID: ',CustomerID)
    // let T_Branch = await pool.request()
    // .input('user_id', sql.NVarChar, user_id)
    // .input('customerID', sql.NVarChar, CustomerID)
    // .query( sql_ );
    //return T_Branch.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_templete_vrf_list(
  department_id,
  branch_id
) 
{ 
  console.log('/dboperations.get_templete_vrf_list department_id: ', department_id
        , 'branch_id: ', branch_id )  
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
async function getOrdersList(
  RoleId,
  CustomerID,
  user_id,
  approve_setting_id,
  approve_setting_version
) {
  try {
    let pool = await sql.connect(config);
    console.log(
      "getOrdersList RoleId: ",
      RoleId,
      "CustomerID: ",
      CustomerID,
      "user_id: ",
      user_id,
      "approve_setting_id: ",
      approve_setting_id,
      "approve_setting_version: ",
      approve_setting_version
    );
    // let products = await pool.request().query("select o.*,(SELECT top 1 b.gfc_cct from [dbo].[T_Branch] b where gfc_cct is not null and b.branch_id = o.branch_code ) as cash_center from gfccp_order o where LTRIM(RTRIM(row_type))<>'summary' and ( convert(varchar, order_date, 105)  = convert(varchar, GETDATE(), 105) or convert(varchar, order_date, 105)  = convert(varchar, DATEADD(day,1,GETDATE()), 105) ) and o.[status]='Y' order by AutoID desc");
    let spOrderlist = await pool
      .request()
      .input("customerID_", sql.NVarChar, CustomerID)
      .input("RoleId_", sql.Int, RoleId)
      .input("user_id", sql.Int, user_id)
      .input("approve_setting_id", sql.Int, approve_setting_id)
      .input("approve_setting_version", sql.Float, approve_setting_version)
      .execute("spOrderlist");
    return spOrderlist.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getApproveNList(
  RoleId,
  CustomerID,
  user_id,
  approve_setting_id,
  approve_setting_version
) {
  console.log(
    "getApproveList RoleId: ",
    RoleId,
    "CustomerID: ",
    CustomerID,
    "user_id: ",
    user_id,
    "approve_setting_id: ",
    approve_setting_id,
    "approve_setting_version: ",
    approve_setting_version
  );
  try {
    let pool = await sql.connect(config);
    let spApproveNlist = await pool
      .request()
      .input("customerID_", sql.NVarChar, CustomerID)
      .input("RoleId_", sql.Int, RoleId)
      .input("user_id", sql.Int, user_id)
      .input("approve_setting_id", sql.Int, approve_setting_id)
      .input("approve_setting_version", sql.Float, approve_setting_version)
      .execute("spApproveNlist");
    return spApproveNlist.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getApproveList(
  RoleId,
  CustomerID,
  user_id,
  approve_setting_id,
  approve_setting_version
) {
  console.log(
    "getApproveList RoleId: ",
    RoleId,
    "CustomerID: ",
    CustomerID,
    "user_id: ",
    user_id,
    "approve_setting_id: ",
    approve_setting_id,
    "approve_setting_version: ",
    approve_setting_version
  );
  try {
    let pool = await sql.connect(config);
    let spApprovelist = await pool
      .request()
      .input("customerID_", sql.NVarChar, CustomerID)
      .input("RoleId_", sql.Int, RoleId)
      .input("user_id", sql.Int, user_id)
      .input("approve_setting_id", sql.Int, approve_setting_id)
      .input("approve_setting_version", sql.Float, approve_setting_version)
      .execute("spApprovelist");
    return spApprovelist.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getApproveProcList(user_id) {
  try {
    let pool = await sql.connect(config);
    let spApproveProclist = await pool
      .request()
      .input("user_id", sql.NVarChar, user_id)
      .execute("spApproveProclist");
    // .query("select * from vOrdersList where cashstatus=@cashstatus and customerID=@customerID  order by AutoID desc");
    return spApproveProclist.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_approveProcData(Id) {
  try {
    let pool = await sql.connect(config);
    let spApproveProcData = await pool
      .request()
      .input("Id", sql.NVarChar, Id)
      .execute("spApproveProcData");
    return spApproveProcData.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function set_cancel_approve_proc_data(Id) {
  console.log("set_cancel_approve_proc_data Id: ", Id);
  try {
    let pool = await sql.connect(config);
    let spUpdate_ApproveProcStatus = await pool
      .request()
      .input("Id_", sql.NVarChar, Id)
      .execute("spUpdate_ApproveProcStatus");
    return spUpdate_ApproveProcStatus.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function get_approveProcDataDet(Id, version) {
  try {
    let pool = await sql.connect(config);
    let spApproveProcDataDet = await pool
      .request()
      .input("approve_setting_id", sql.NVarChar, Id)
      .input("version", sql.Float, version)
      .execute("spApproveProcDataDet");
    console.log("Id: ", Id);
    console.log("version: ", version);
    return spApproveProcDataDet.recordsets;
  } catch (error) {
    console.log("error: ", error);
    return [{ error: error }];
  }
}
async function getOrder(orderId) {
  try {
    let pool = await sql.connect(config);
    let product = await pool
      .request()
      .input("input_parameter", sql.Int, orderId)
      .query(
        "SELECT * from T_CCT_Monthly_Branch where AutoId = @input_parameter"
      );
    return product.recordsets;
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
          .input("date_from", sql.DateTime, obj_json[key].tbDateF)
          .input("date_to", sql.DateTime, obj_json[key].tbDateT)
          .input("fullname", sql.NVarChar, obj_json[key].tbFullName)
          .input("vehicle_registration", sql.NVarChar, obj_json[key].tbVehicle_Registration)
          .input("vehicle_brand", sql.Int, obj_json[key].ddlvehicle_brand)
          .input("vehicle_color", sql.Int, obj_json[key].ddlvehicle_color)
          .input("card_no", sql.NVarChar, obj_json[key].tbVehicle_Registration)
          .input("createby", sql.NVarChar, obj_json[key].user_id)
          .execute("spAdd_vrf_template_det");
         output = spAdd_vrf_template_det.recordsets;
      }
    }
  } catch (err) {
    console.log(err);
  } finally {
    return({state:1})	 
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
async function update_cashstatus_order(Id, Type_, user_id) {
  try {
    let pool = await sql.connect(config);
    let update_cashstatus_order = await pool
      .request()
      .input("Id_", sql.Int, Id)
      .input("Type_", sql.NVarChar, Type_)
      .input("user_id", sql.NVarChar, user_id)
      .execute("update_cashstatus_order");
    return update_cashstatus_order.recordsets;
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
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
  getOrder_status: getOrder_status,
  get_permission_access: get_permission_access,
  set_cancel_approve_proc_data: set_cancel_approve_proc_data,
  getApproveNList: getApproveNList,
  getactivity_authen: getactivity_authen,
  getActitySelectd: getActitySelectd,
  getOrdersList: getOrdersList,
  getuserEdit: getuserEdit,
  delete_app_proc_det: delete_app_proc_det,
  getOrder: getOrder,
  getBranchData: getBranchData,
  getCashCenterData: getCashCenterData,
  add_manual_order: add_manual_order,
  getuserinfo: getuserinfo,
  getCashOrder: getCashOrder,
  update_cashstatus_order: update_cashstatus_order,
  update_order: update_order,
  get_pbi_url: get_pbi_url,
  getApproveList: getApproveList,
  getApproveProcList: getApproveProcList,
  getBankTypeData: getBankTypeData,
  getDownloadLink: getDownloadLink,
  getBOT_Branch: getBOT_Branch,
  getBranchForCash: getBranchForCash,
  getCashCenterBOT: getCashCenterBOT,
  getCCT_Data: getCCT_Data,
  getRole: getRole,
  getUser: getUser,
  add_approveProc: add_approveProc,
  get_approveProcData: get_approveProcData,
  get_approveProcDataDet: get_approveProcDataDet,
  update_approveproc: update_approveproc,
};
