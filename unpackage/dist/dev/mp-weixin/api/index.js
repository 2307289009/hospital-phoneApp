"use strict";
const common_http = require("../common/http.js");
const registerApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/add", parm);
};
const loginApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/login", parm);
};
const getIndexNewsApi = () => {
  return common_http.http.get("/wxapi/allApi/getIndexNews");
};
const getIndexDeptApi = () => {
  return common_http.http.get("/wxapi/allApi/getIndexDept");
};
const getIndexDoctorApi = () => {
  return common_http.http.get("/wxapi/allApi/getIndexDoctor");
};
const getDoctorApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getDoctor", parm);
};
const getSelectVisitListApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getSelectVisitList", parm);
};
const makeOrderAddApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/makeOrderAdd", parm);
};
const getOrderListApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getOrderList", parm);
};
const cancelOrderApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/cancelOrder", parm);
};
const getDoctorByDeptIdApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getDoctorByDeptId", parm);
};
const getCategoryListApi = () => {
  return common_http.http.get("/wxapi/allApi/getCategoryList");
};
exports.cancelOrderApi = cancelOrderApi;
exports.getCategoryListApi = getCategoryListApi;
exports.getDoctorApi = getDoctorApi;
exports.getDoctorByDeptIdApi = getDoctorByDeptIdApi;
exports.getIndexDeptApi = getIndexDeptApi;
exports.getIndexDoctorApi = getIndexDoctorApi;
exports.getIndexNewsApi = getIndexNewsApi;
exports.getOrderListApi = getOrderListApi;
exports.getSelectVisitListApi = getSelectVisitListApi;
exports.loginApi = loginApi;
exports.makeOrderAddApi = makeOrderAddApi;
exports.registerApi = registerApi;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/index.js.map
