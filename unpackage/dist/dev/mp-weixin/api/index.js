"use strict";
const common_http = require("../common/http.js");
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
const getSelectVisitListApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getSelectVisitList", parm);
};
const makeOrderAddApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/makeOrderAdd", parm);
};
const getCategoryListApi = () => {
  return common_http.http.get("/wxapi/allApi/getCategoryList");
};
exports.getCategoryListApi = getCategoryListApi;
exports.getIndexDeptApi = getIndexDeptApi;
exports.getIndexDoctorApi = getIndexDoctorApi;
exports.getIndexNewsApi = getIndexNewsApi;
exports.getSelectVisitListApi = getSelectVisitListApi;
exports.loginApi = loginApi;
exports.makeOrderAddApi = makeOrderAddApi;
