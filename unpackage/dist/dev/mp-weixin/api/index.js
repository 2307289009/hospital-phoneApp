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
const visitAddApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/visitAdd", parm);
};
const visitEditApi = (parm) => {
  return common_http.http.put("/wxapi/allApi/visitEdit", parm);
};
const visitDeleteApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/visitDelete", parm);
};
const getVisitListApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/getVisitList", parm);
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
const submitAuthApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/submitAuth", parm);
};
const uploadPhoto = (filePath) => {
  const uploadParams = {
    url: "/wxapi/allApi/uploadPhoto",
    filePath
  };
  return common_http.http.upload(uploadParams);
};
const rescheduleOrderApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/rescheduleOrder", parm);
};
const joinWaitlistApi = (parm) => {
  return common_http.http.post("/wxapi/allApi/waitlist/join", parm);
};
const getMyWaitlistApi = (parm) => {
  return common_http.http.get("/wxapi/allApi/waitlist/my", parm);
};
exports.addSuggestApi = addSuggestApi;
exports.cancelOrderApi = cancelOrderApi;
exports.getCategoryListApi = getCategoryListApi;
exports.getDoctorApi = getDoctorApi;
exports.getDoctorByDeptIdApi = getDoctorByDeptIdApi;
exports.getIndexDeptApi = getIndexDeptApi;
exports.getIndexDoctorApi = getIndexDoctorApi;
exports.getIndexNewsApi = getIndexNewsApi;
exports.getMyWaitlistApi = getMyWaitlistApi;
exports.getNewsListApi = getNewsListApi;
exports.getOrderListApi = getOrderListApi;
exports.getSelectVisitListApi = getSelectVisitListApi;
exports.getVisitListApi = getVisitListApi;
exports.getVisitOrderListApi = getVisitOrderListApi;
exports.getWxUserByIdApi = getWxUserByIdApi;
exports.joinWaitlistApi = joinWaitlistApi;
exports.loginApi = loginApi;
exports.makeOrderAddApi = makeOrderAddApi;
exports.registerApi = registerApi;
exports.rescheduleOrderApi = rescheduleOrderApi;
exports.submitAuthApi = submitAuthApi;
exports.uploadPhoto = uploadPhoto;
exports.visitAddApi = visitAddApi;
exports.visitDeleteApi = visitDeleteApi;
exports.visitEditApi = visitEditApi;
