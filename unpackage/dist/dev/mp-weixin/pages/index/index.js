"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_divider2 = common_vendor.resolveComponent("uv-divider");
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_list_item2 = common_vendor.resolveComponent("uv-list-item");
  const _easycom_uv_list2 = common_vendor.resolveComponent("uv-list");
  (_easycom_uv_divider2 + _easycom_uv_text2 + _easycom_uv_list_item2 + _easycom_uv_list2)();
}
const _easycom_uv_divider = () => "../../uni_modules/uv-divider/components/uv-divider/uv-divider.js";
const _easycom_uv_text = () => "../../uni_modules/uv-text/components/uv-text/uv-text.js";
const _easycom_uv_list_item = () => "../../uni_modules/uv-list/components/uv-list-item/uv-list-item.js";
const _easycom_uv_list = () => "../../uni_modules/uv-list/components/uv-list/uv-list.js";
if (!Math) {
  (_easycom_uv_divider + _easycom_uv_text + _easycom_uv_list_item + _easycom_uv_list)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const indicatorDots = common_vendor.ref(true);
    common_vendor.ref("#FFF");
    const autoplay = common_vendor.ref(true);
    const interval = common_vendor.ref(2e3);
    const duration = common_vendor.ref(500);
    const swipperList = common_vendor.ref([]);
    const getIndexNews = async () => {
      let res = await api_index.getIndexNewsApi();
      if (res && res.code == 200) {
        swipperList.value = res.data;
      }
    };
    const baseList = common_vendor.ref([]);
    const getIndexDept = async () => {
      let res = await api_index.getIndexDeptApi();
      if (res && res.code == 200) {
        if (res.data.length > 0) {
          for (let i = 0; i < res.data.length; i++) {
            let obj = {
              img: "",
              title: "",
              deptId: ""
            };
            obj.title = res.data[i].deptName;
            obj.deptId = res.data[i].deptId;
            obj.img = `/static/d${i + 1}.png`;
            baseList.value.push(obj);
          }
        }
      }
    };
    const doctorList = common_vendor.ref([]);
    const getIndexDoctor = async () => {
      let res = await api_index.getIndexDoctorApi();
      if (res && res.code == 200) {
        doctorList.value = res.data;
        console.log(doctorList.value);
      }
    };
    const toDoctor = (item) => {
      common_vendor.index.navigateTo({
        url: "../doctor/doctor?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    const toDoctorList = (item) => {
      common_vendor.index.navigateTo({
        url: "../dectorDepartment/dectorDepartment?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    common_vendor.onLoad(() => {
      getIndexNews();
      getIndexDept();
      getIndexDoctor();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(swipperList.value, (item, index, i0) => {
          return {
            a: common_vendor.unref(common_http.http).baseUrl + item.image
          };
        }),
        b: indicatorDots.value,
        c: autoplay.value,
        d: interval.value,
        e: duration.value,
        f: common_vendor.f(baseList.value, (item, index, i0) => {
          return {
            a: item.img,
            b: common_vendor.t(item.title),
            c: common_vendor.o(($event) => toDoctorList(item))
          };
        }),
        g: common_vendor.p({
          text: "专家",
          textColor: "#546E7A"
        }),
        h: common_vendor.f(doctorList.value, (item, k0, i0) => {
          return {
            a: common_vendor.unref(common_http.http).baseUrl + item.image,
            b: common_vendor.t(item.nickName),
            c: common_vendor.t(item.deptName),
            d: common_vendor.t(item.jobTitle),
            e: "626c05f6-3-" + i0 + "," + ("626c05f6-2-" + i0),
            f: common_vendor.p({
              lines: 1,
              text: item.goodAt,
              color: "#546E7A"
            }),
            g: common_vendor.o(($event) => toDoctor(item)),
            h: "626c05f6-2-" + i0 + ",626c05f6-1"
          };
        }),
        i: common_vendor.p({
          border: "true"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
