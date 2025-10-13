"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
const api_index = require("../../api/index.js");
if (!Array) {
  const _easycom_uv_gap2 = common_vendor.resolveComponent("uv-gap");
  const _easycom_uv_vtabs_item2 = common_vendor.resolveComponent("uv-vtabs-item");
  const _easycom_uv_vtabs2 = common_vendor.resolveComponent("uv-vtabs");
  (_easycom_uv_gap2 + _easycom_uv_vtabs_item2 + _easycom_uv_vtabs2)();
}
const _easycom_uv_gap = () => "../../uni_modules/uv-gap/components/uv-gap/uv-gap.js";
const _easycom_uv_vtabs_item = () => "../../uni_modules/uv-vtabs/components/uv-vtabs-item/uv-vtabs-item.js";
const _easycom_uv_vtabs = () => "../../uni_modules/uv-vtabs/components/uv-vtabs/uv-vtabs.js";
if (!Math) {
  (_easycom_uv_gap + _easycom_uv_vtabs_item + _easycom_uv_vtabs)();
}
const _sfc_main = {
  __name: "category",
  setup(__props) {
    const list = common_vendor.ref([]);
    const chain = common_vendor.ref(true);
    const height = common_vendor.computed(() => {
      return common_vendor.index.getSystemInfoSync().windowHeight - common_vendor.index.upx2px(1);
    });
    const change = (index) => {
      console.log("选项改变：", index);
    };
    const toDoctor = (item) => {
      common_vendor.index.navigateTo({
        url: "../doctor/doctor?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    const getCategoryList = async () => {
      let res = await api_index.getCategoryListApi();
      if (res && res.code == 200) {
        console.log(res);
        list.value = res.data;
      }
    };
    common_vendor.onReady(() => {
      common_vendor.index.showLoading({
        title: "加载中"
      });
      setTimeout(() => {
        getCategoryList();
        common_vendor.index.hideLoading();
      }, 500);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(list.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.f(item.childrens, (item2, index2, i1) => {
              return {
                a: common_vendor.t(item2.name),
                b: common_vendor.f(item2.desc, (item3, index3, i2) => {
                  return {
                    a: common_vendor.unref(common_http.http).baseUrl + item3.image,
                    b: common_vendor.t(item3.nickName),
                    c: common_vendor.t(item3.jobTitle),
                    d: common_vendor.o(($event) => toDoctor(item3), index3),
                    e: index3
                  };
                }),
                c: index2
              };
            }),
            b: index < list.value.length - 1
          }, index < list.value.length - 1 ? {
            c: "8145b772-2-" + i0 + "," + ("8145b772-1-" + i0),
            d: common_vendor.p({
              ["bg-color"]: "#f1f1f1",
              height: "4"
            })
          } : {}, {
            e: "8145b772-1-" + i0 + ",8145b772-0",
            f: common_vendor.p({
              index
            }),
            g: index
          });
        }),
        b: common_vendor.p({
          ["bg-color"]: "#fff",
          height: "600"
        }),
        c: common_vendor.o(change),
        d: common_vendor.p({
          chain: chain.value,
          list: list.value,
          height: common_vendor.unref(height)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8145b772"], ["__file", "E:/System/phone/pages/category/category.vue"]]);
wx.createPage(MiniProgramPage);
