"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  _easycom_uv_text2();
}
const _easycom_uv_text = () => "../../uni_modules/uv-text/components/uv-text/uv-text.js";
if (!Math) {
  _easycom_uv_text();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const indicatorDots = common_vendor.ref(true);
    const autoplay = common_vendor.ref(true);
    const interval = common_vendor.ref(3e3);
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
          const processedData = res.data.map((dept, index) => ({
            title: dept.deptName,
            deptId: dept.deptId,
            img: `/static/d${index + 1}.png`
          }));
          baseList.value = processedData;
        }
      }
    };
    const doctorList = common_vendor.ref([]);
    const getIndexDoctor = async () => {
      let res = await api_index.getIndexDoctorApi();
      if (res && res.code == 200) {
        doctorList.value = res.data;
      }
    };
    const toDoctor = (item) => {
      common_vendor.index.navigateTo({
        url: "../doctorIdentity/doctorIdentity?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    const toDoctorList = (item) => {
      common_vendor.index.navigateTo({
        url: "../doctorDepartment/doctorDepartment?item=" + encodeURIComponent(JSON.stringify(item))
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
            a: common_vendor.unref(common_http.http).baseUrl + item.image,
            b: index
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
            c: index,
            d: common_vendor.o(($event) => toDoctorList(item), index)
          };
        }),
        g: common_vendor.f(doctorList.value, (item, k0, i0) => {
          return {
            a: common_vendor.unref(common_http.http).baseUrl + item.image,
            b: common_vendor.t(item.nickName),
            c: common_vendor.t(item.jobTitle),
            d: common_vendor.t(item.deptName),
            e: "1cf27b2a-0-" + i0,
            f: common_vendor.p({
              lines: 1,
              text: "擅长：" + item.goodAt,
              color: "#888",
              size: "13"
            }),
            g: item.id,
            h: common_vendor.o(($event) => toDoctor(item), item.id)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "E:/System/phone/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
