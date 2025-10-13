"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_list_item2 = common_vendor.resolveComponent("uv-list-item");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_uv_list2 = common_vendor.resolveComponent("uv-list");
  (_easycom_uv_text2 + _easycom_uv_list_item2 + _easycom_uv_load_more2 + _easycom_uv_list2)();
}
const _easycom_uv_text = () => "../../uni_modules/uv-text/components/uv-text/uv-text.js";
const _easycom_uv_list_item = () => "../../uni_modules/uv-list/components/uv-list-item/uv-list-item.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_uv_list = () => "../../uni_modules/uv-list/components/uv-list/uv-list.js";
if (!Math) {
  (_easycom_uv_text + _easycom_uv_list_item + _easycom_uv_load_more + _easycom_uv_list)();
}
const _sfc_main = {
  __name: "doctor_list",
  setup(__props) {
    const indexList = common_vendor.ref([]);
    const deptId = common_vendor.ref("");
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(6);
    const pages = common_vendor.ref(0);
    const loadStatus = common_vendor.ref("loadmore");
    const getDoctorByDeptId = async () => {
      let res = await api_index.getDoctorByDeptIdApi({
        deptId: deptId.value,
        currentPage: currentPage.value,
        pageSize: pageSize.value
      });
      if (res && res.code == 200) {
        pages.value = res.data.pages;
        indexList.value = indexList.value.concat(res.data.records);
        console.log(indexList.value);
        if (currentPage.value >= pages.value) {
          loadStatus.value = "nomore";
        } else {
          loadStatus.value = "loadmore";
        }
        console.log(indexList.value);
      }
    };
    const loadmore = () => {
      if (currentPage.value >= pages.value) {
        loadStatus.value = "nomore";
        return;
      }
      loadStatus.value = "loading";
      currentPage.value = ++currentPage.value;
      getDoctorByDeptId();
    };
    common_vendor.onReachBottom(() => {
      console.log("触底加载");
      if (currentPage.value >= pages.value) {
        loadStatus.value = "nomore";
        return;
      }
      loadStatus.value = "loading";
      currentPage.value = ++currentPage.value;
      getDoctorByDeptId();
    });
    const toDoctor = (item) => {
      common_vendor.index.navigateTo({
        url: "../doctor/doctor?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    common_vendor.onLoad((options) => {
      const item = JSON.parse(decodeURIComponent(options.item));
      deptId.value = item.deptId;
      console.log(item);
      getDoctorByDeptId();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(indexList.value, (item, k0, i0) => {
          return {
            a: common_vendor.unref(common_http.http).baseUrl + item.image,
            b: common_vendor.t(item.nickName),
            c: common_vendor.t(item.deptName),
            d: common_vendor.t(item.jobTitle),
            e: "dc259ac6-2-" + i0 + "," + ("dc259ac6-1-" + i0),
            f: common_vendor.p({
              lines: 1,
              text: item.goodAt,
              color: "#828c9a"
            }),
            g: common_vendor.o(($event) => toDoctor(item)),
            h: "dc259ac6-1-" + i0 + ",dc259ac6-0"
          };
        }),
        b: common_vendor.p({
          border: "true"
        }),
        c: common_vendor.o(loadmore),
        d: common_vendor.p({
          status: loadStatus.value,
          color: "#828c9a"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/doctor_list/doctor_list.vue"]]);
wx.createPage(MiniProgramPage);
