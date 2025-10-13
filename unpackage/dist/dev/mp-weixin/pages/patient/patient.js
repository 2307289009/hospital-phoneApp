"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_list_item2 = common_vendor.resolveComponent("uv-list-item");
  const _easycom_uv_list2 = common_vendor.resolveComponent("uv-list");
  const _component_u_icon = common_vendor.resolveComponent("u-icon");
  const _easycom_uv_modal2 = common_vendor.resolveComponent("uv-modal");
  (_easycom_uv_icon2 + _easycom_uv_list_item2 + _easycom_uv_list2 + _component_u_icon + _easycom_uv_modal2)();
}
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_list_item = () => "../../uni_modules/uv-list/components/uv-list-item/uv-list-item.js";
const _easycom_uv_list = () => "../../uni_modules/uv-list/components/uv-list/uv-list.js";
const _easycom_uv_modal = () => "../../uni_modules/uv-modal/components/uv-modal/uv-modal.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_list_item + _easycom_uv_list + _easycom_uv_modal)();
}
const _sfc_main = {
  __name: "patient",
  setup(__props) {
    const modal = common_vendor.ref();
    const addBtn = () => {
      common_vendor.index.navigateTo({
        url: "/pages/add_patient/add_patient"
      });
    };
    const editBtn = (item) => {
      common_vendor.index.navigateTo({
        url: "/pages/edit_patient/edit_patient?item=" + encodeURIComponent(JSON.stringify(item))
      });
    };
    const visitId = common_vendor.ref("");
    const deleteBtn = (item) => {
      visitId.value = item.visitId;
      modal.value.open();
    };
    const visitUser = common_vendor.ref([]);
    const getVisitList = async () => {
      let res = await api_index.getVisitListApi({
        userId: common_vendor.index.getStorageSync("userId")
      });
      if (res && res.code == 200) {
        visitUser.value = res.data;
        console.log(visitUser.value);
      }
    };
    const confirm = async () => {
      console.log("确定");
      let res = await api_index.visitDeleteApi({
        visitId: visitId.value
      });
      if (res && res.code == 200) {
        getVisitList();
        modal.value.close();
      }
    };
    common_vendor.onShow(() => {
      getVisitList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(visitUser.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.visitname),
            b: common_vendor.t(item.idCard),
            c: common_vendor.o(($event) => editBtn(item)),
            d: "a7943d5b-2-" + i0 + "," + ("a7943d5b-1-" + i0),
            e: common_vendor.o(($event) => deleteBtn(item)),
            f: "a7943d5b-3-" + i0 + "," + ("a7943d5b-1-" + i0),
            g: "a7943d5b-1-" + i0 + ",a7943d5b-0"
          };
        }),
        b: common_vendor.p({
          name: "edit-pen",
          color: "#FFC107",
          size: "22"
        }),
        c: common_vendor.p({
          name: "close",
          color: "#F44336",
          size: "22"
        }),
        d: common_vendor.p({
          border: true
        }),
        e: common_vendor.p({
          name: "plus",
          color: "#ffffff",
          size: 30
        }),
        f: common_vendor.o(addBtn),
        g: common_vendor.sr(modal, "a7943d5b-5", {
          "k": "modal"
        }),
        h: common_vendor.o(confirm),
        i: common_vendor.p({
          asyncClose: true,
          showCancelButton: "true",
          cancelText: "取消",
          title: "提示",
          content: "确定删除该就诊人吗?"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a7943d5b"], ["__file", "E:/System/phone/pages/patient/patient.vue"]]);
wx.createPage(MiniProgramPage);
