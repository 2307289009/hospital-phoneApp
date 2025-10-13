"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_parse2 = common_vendor.resolveComponent("uv-parse");
  const _easycom_uv_list_item2 = common_vendor.resolveComponent("uv-list-item");
  const _easycom_uv_list2 = common_vendor.resolveComponent("uv-list");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_uv_notify2 = common_vendor.resolveComponent("uv-notify");
  const _easycom_uv_modal2 = common_vendor.resolveComponent("uv-modal");
  (_easycom_uv_text2 + _easycom_uv_line2 + _easycom_uv_button2 + _easycom_uv_parse2 + _easycom_uv_list_item2 + _easycom_uv_list2 + _easycom_uv_load_more2 + _easycom_uv_notify2 + _easycom_uv_modal2)();
}
const _easycom_uv_text = () => "../../uni_modules/uv-text/components/uv-text/uv-text.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_parse = () => "../../uni_modules/uv-parse/components/uv-parse/uv-parse.js";
const _easycom_uv_list_item = () => "../../uni_modules/uv-list/components/uv-list-item/uv-list-item.js";
const _easycom_uv_list = () => "../../uni_modules/uv-list/components/uv-list/uv-list.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_uv_notify = () => "../../uni_modules/uv-notify/components/uv-notify/uv-notify.js";
const _easycom_uv_modal = () => "../../uni_modules/uv-modal/components/uv-modal/uv-modal.js";
if (!Math) {
  (_easycom_uv_text + _easycom_uv_line + _easycom_uv_button + _easycom_uv_parse + _easycom_uv_list_item + _easycom_uv_list + _easycom_uv_load_more + _easycom_uv_notify + _easycom_uv_modal)();
}
const _sfc_main = {
  __name: "order_patient",
  setup(__props) {
    common_vendor.ref(false);
    const toggle = (item) => {
      console.log(item);
      item.collapsed = !item.collapsed;
    };
    const loadStatus = common_vendor.ref("loadmore");
    const indexList = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(6);
    const pages = common_vendor.ref(0);
    const getList = async () => {
      let res = await api_index.getVisitOrderListApi({
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        userId: common_vendor.index.getStorageSync("userId")
        //挂号人的id
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
      getList();
    };
    common_vendor.onReachBottom(() => {
      console.log("触底加载");
      if (currentPage.value >= pages.value) {
        loadStatus.value = "nomore";
        return;
      }
      loadStatus.value = "loading";
      currentPage.value = ++currentPage.value;
      getList();
    });
    const uvToast = common_vendor.ref();
    const cancelModal = common_vendor.ref();
    const parms = {
      makeId: ""
    };
    const cancelCancel = () => {
      cancelModal.value.close();
    };
    const cancelConfirm = async () => {
      let res = await cancelOrderApi(parms);
      if (res && res.code == 200) {
        indexList.value = [];
        currentPage.value = 1;
        getList();
        uvToast.value.show({
          type: "success",
          message: res.msg,
          bgColor: "#26A69A"
        });
        cancelModal.value.close();
      }
    };
    common_vendor.onLoad(() => {
      getList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(indexList.value, (item, index, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.times),
            b: common_vendor.t(item.week),
            c: item.status == "1"
          }, item.status == "1" ? {
            d: "eda469b9-2-" + i0 + "," + ("eda469b9-1-" + i0),
            e: common_vendor.p({
              color: "#26A69A",
              text: "挂号成功"
            })
          } : {}, {
            f: item.status == "2"
          }, item.status == "2" ? {
            g: "eda469b9-3-" + i0 + "," + ("eda469b9-1-" + i0),
            h: common_vendor.p({
              color: "#FFCA28",
              text: "已取消"
            })
          } : {}, {
            i: "eda469b9-4-" + i0 + "," + ("eda469b9-1-" + i0),
            j: common_vendor.t(item.visitname),
            k: common_vendor.t(item.deptName),
            l: common_vendor.t(item.nickName),
            m: item.timesArea == "0"
          }, item.timesArea == "0" ? {} : {}, {
            n: item.timesArea == "1"
          }, item.timesArea == "1" ? {} : {}, {
            o: common_vendor.t(item.address),
            p: common_vendor.t(item.price),
            q: common_vendor.t(item.createTime),
            r: common_vendor.o(($event) => toggle(item)),
            s: "eda469b9-5-" + i0 + "," + ("eda469b9-1-" + i0),
            t: "eda469b9-6-" + i0 + "," + ("eda469b9-1-" + i0),
            v: common_vendor.p({
              content: item.advice
            }),
            w: item.collapsed ? 1 : "",
            x: "eda469b9-1-" + i0 + ",eda469b9-0"
          });
        }),
        b: common_vendor.p({
          text: "查看医嘱",
          customStyle: {
            background: "#26A69A"
          }
        }),
        c: common_vendor.p({
          border: "true"
        }),
        d: common_vendor.o(loadmore),
        e: common_vendor.p({
          status: loadStatus.value,
          color: "#B0BEC5"
        }),
        f: common_vendor.sr(uvToast, "eda469b9-8", {
          "k": "uvToast"
        }),
        g: common_vendor.sr(cancelModal, "eda469b9-9", {
          "k": "cancelModal"
        }),
        h: common_vendor.o(cancelCancel),
        i: common_vendor.o(cancelConfirm),
        j: common_vendor.p({
          showCancelButton: true,
          asyncClose: true,
          title: "系统提示",
          content: "确定取消挂号吗?",
          confirmColor: "#26A69A",
          cancelColor: "#B0BEC5"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-eda469b9"], ["__file", "E:/System/phone/pages/order_patient/order_patient.vue"]]);
wx.createPage(MiniProgramPage);
