"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  (_easycom_uv_text2 + _easycom_uv_load_more2)();
}
const _easycom_uv_text = () => "../../uni_modules/uv-text/components/uv-text/uv-text.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
if (!Math) {
  (_easycom_uv_text + _easycom_uv_load_more)();
}
const _sfc_main = {
  __name: "doctorDepartment",
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
        common_vendor.index.__f__("log", "at pages/doctorDepartment/doctorDepartment.vue:50", indexList.value);
        if (currentPage.value >= pages.value) {
          loadStatus.value = "nomore";
        } else {
          loadStatus.value = "loadmore";
        }
        common_vendor.index.__f__("log", "at pages/doctorDepartment/doctorDepartment.vue:56", indexList.value);
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
      common_vendor.index.__f__("log", "at pages/doctorDepartment/doctorDepartment.vue:71", "触底加载");
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
        url: "../doctorIdentity/doctorIdentity?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    common_vendor.onLoad((options) => {
      const item = JSON.parse(decodeURIComponent(options.item));
      deptId.value = item.deptId;
      common_vendor.index.__f__("log", "at pages/doctorDepartment/doctorDepartment.vue:90", item);
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
            e: "36c13d7c-0-" + i0,
            f: common_vendor.p({
              lines: 2,
              text: "擅长：" + item.goodAt,
              color: "#828c9a",
              size: "13"
            }),
            g: item.userId,
            h: common_vendor.o(($event) => toDoctor(item), item.userId)
          };
        }),
        b: common_vendor.o(loadmore),
        c: common_vendor.p({
          status: loadStatus.value,
          color: "#828c9a"
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/doctorDepartment/doctorDepartment.js.map
