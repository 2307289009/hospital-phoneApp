"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  _easycom_uv_button2();
}
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  _easycom_uv_button();
}
const _sfc_main = {
  __name: "doctorIdentity",
  setup(__props) {
    const deptName = common_vendor.ref("");
    const visitAddress = common_vendor.ref("");
    const jobTitle = common_vendor.ref("");
    const price = common_vendor.ref(0);
    const parm = {
      userId: "",
      doctorId: ""
    };
    const scheduleList = common_vendor.ref([]);
    const doctor = common_vendor.ref({});
    const getDoctorSchedule = async () => {
      let res = await api_index.getDoctorApi(parm);
      if (res && res.code == 200) {
        scheduleList.value = res.data;
      }
    };
    const toConfirm = (item) => {
      item.deptName = deptName.value;
      item.jobTitle = jobTitle.value;
      item.address = visitAddress.value;
      item.price = price.value;
      common_vendor.index.navigateTo({
        url: "/pages/confirm/confirm?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    common_vendor.onLoad((option) => {
      const item = JSON.parse(decodeURIComponent(option.item));
      parm.doctorId = item.userId;
      deptName.value = item.deptName;
      visitAddress.value = item.visitAddress;
      jobTitle.value = item.jobTitle;
      price.value = item.price;
      parm.userId = common_vendor.index.getStorageSync("userId");
      Object.assign(doctor.value, item);
      getDoctorSchedule();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(common_http.http).baseUrl + doctor.value.image,
        b: common_vendor.t(doctor.value.nickName),
        c: common_vendor.t(doctor.value.jobTitle),
        d: common_vendor.t(doctor.value.deptName),
        e: common_vendor.t(doctor.value.goodAt),
        f: common_vendor.t(doctor.value.introduction || "暂无简介"),
        g: scheduleList.value.length > 0
      }, scheduleList.value.length > 0 ? {
        h: common_vendor.f(scheduleList.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item.times),
            b: common_vendor.t(item.week),
            c: common_vendor.t(item.lastAmount),
            d: common_vendor.o(($event) => toConfirm(item), index),
            e: "93524cf2-0-" + i0,
            f: index
          };
        }),
        i: common_vendor.t(doctor.value.price),
        j: common_vendor.p({
          size: "small",
          type: "primary",
          shape: "circle",
          text: "立即挂号"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93524cf2"], ["__file", "E:/System/phone/pages/doctorIdentity/doctorIdentity.vue"]]);
wx.createPage(MiniProgramPage);
