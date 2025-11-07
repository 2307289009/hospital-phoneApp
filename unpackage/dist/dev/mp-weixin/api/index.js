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
const getNewsListApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getNewsList", parm);
};
const getCategoryListApi = () => {
  return common_http.http.get("/wxapi/allApi/getCategoryList");
};
const getWxUserByIdApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getWxUserById", parm);
};
const addSuggestApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/addSuggest", parm);
};
const getVisitOrderListApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getVisitOrderList", parm);
};
exports.addSuggestApi = addSuggestApi;
exports.cancelOrderApi = cancelOrderApi;
exports.getCategoryListApi = getCategoryListApi;
exports.getDoctorApi = getDoctorApi;
exports.getDoctorByDeptIdApi = getDoctorByDeptIdApi;
exports.getIndexDeptApi = getIndexDeptApi;
exports.getIndexDoctorApi = getIndexDoctorApi;
exports.getIndexNewsApi = getIndexNewsApi;
exports.getNewsListApi = getNewsListApi;
exports.getOrderListApi = getOrderListApi;
exports.getSelectVisitListApi = getSelectVisitListApi;
exports.getVisitOrderListApi = getVisitOrderListApi;
exports.getWxUserByIdApi = getWxUserByIdApi;
exports.loginApi = loginApi;
exports.makeOrderAddApi = makeOrderAddApi;
exports.registerApi = registerApi;
