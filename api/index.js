import http from '../common/http.js'
//注册
export const registerApi = (parm)=>{
	return http.post("/wxapi/allApi/add",parm)
}
//登录
export const loginApi = (parm)=>{
	return http.post("/wxapi/allApi/login",parm)
}
//小程序首页轮播图
export const getIndexNewsApi = ()=>{
	return http.get("/wxapi/allApi/getIndexNews")
}
//小程序首页科室
export const getIndexDeptApi = ()=>{
	return http.get("/wxapi/allApi/getIndexDept")
}
//小程序首页专家
export const getIndexDoctorApi = ()=>{
	return http.get("/wxapi/allApi/getIndexDoctor")
}
//医生详情挂号列表
export const getDoctorApi = (parm)=>{
	return http.get("/wxapi/allApi/getDoctor",parm)
}
//新增就诊人
export const visitAddApi = (parm)=>{
	return http.post("/wxapi/allApi/visitAdd",parm)
}
//编辑就诊人
export const visitEditApi = (parm)=>{
	return http.put("/wxapi/allApi/visitEdit",parm)
}
//删除就诊人
export const visitDeleteApi = (parm)=>{
	return http.post("/wxapi/allApi/visitDelete",parm)
}
//就诊人列表
export const getVisitListApi = (parm)=>{
	return http.get("/wxapi/allApi/getVisitList",parm)
}
//就诊人下拉列表
export const getSelectVisitListApi = (parm)=>{
	return http.get("/wxapi/allApi/getSelectVisitList",parm)
}
//挂号
export const makeOrderAddApi = (parm)=>{
	return http.post("/wxapi/allApi/makeOrderAdd",parm)
}
//挂号列表
export const getOrderListApi = (parm)=>{
	return http.get("/wxapi/allApi/getOrderList",parm)
}
//取消挂号
export const cancelOrderApi = (parm)=>{
	return http.post("/wxapi/allApi/cancelOrder",parm)
}
//科室查询医生列表
export const getDoctorByDeptIdApi = (parm)=>{
	return http.get("/wxapi/allApi/getDoctorByDeptId",parm)
}
//资讯列表
export const getNewsListApi = (parm)=>{
	return http.get("/wxapi/allApi/getNewsList",parm)
}
//底部挂号列表
export const getCategoryListApi = ()=>{
	return http.get("/wxapi/allApi/getCategoryList")
}
//根据id查询个人信息
export const getWxUserByIdApi = (parm)=>{
	return http.get("/wxapi/allApi/getWxUserById",parm)
}
//更新个人信息
export const updateUserInfoApi = (parm)=>{
	return http.post("/wxapi/allApi/updateUserInfo",parm)
}
//修改密码
export const updatePasswordApi = (parm)=>{
	return http.post("/wxapi/allApi/updatePassword",parm)
}
//反馈
export const addSuggestApi = (parm)=>{
	return http.post("/wxapi/allApi/addSuggest",parm)
}
//就诊列表
export const getVisitOrderListApi = (parm)=>{
	return http.get("/wxapi/allApi/getVisitOrderList",parm)
}
//提交个人信息
export const submitAuthApi = (parm) => {
	return http.post("/wxapi/allApi/submitAuth",parm)
}
//上传照片
export const uploadPhoto = (filePath) => {
	const uploadParams = {
		url: '/wxapi/allApi/uploadPhoto',
		filePath: filePath
	};
	return http.upload(uploadParams)
}