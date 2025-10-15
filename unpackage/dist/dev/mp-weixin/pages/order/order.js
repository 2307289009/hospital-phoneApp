"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_line2 = common_vendor.resolveComponent("uv-line");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_load_more2 = common_vendor.resolveComponent("uv-load-more");
  const _easycom_uv_notify2 = common_vendor.resolveComponent("uv-notify");
  const _easycom_uv_modal2 = common_vendor.resolveComponent("uv-modal");
  (_easycom_uv_icon2 + _easycom_uv_text2 + _easycom_uv_line2 + _easycom_uv_button2 + _easycom_uv_load_more2 + _easycom_uv_notify2 + _easycom_uv_modal2)();
}
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_text = () => "../../uni_modules/uv-text/components/uv-text/uv-text.js";
const _easycom_uv_line = () => "../../uni_modules/uv-line/components/uv-line/uv-line.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_load_more = () => "../../uni_modules/uv-load-more/components/uv-load-more/uv-load-more.js";
const _easycom_uv_notify = () => "../../uni_modules/uv-notify/components/uv-notify/uv-notify.js";
const _easycom_uv_modal = () => "../../uni_modules/uv-modal/components/uv-modal/uv-modal.js";
if (!Math) {
  (_easycom_uv_icon + _easycom_uv_text + _easycom_uv_line + _easycom_uv_button + _easycom_uv_load_more + _easycom_uv_notify + _easycom_uv_modal)();
}
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const loadStatus = common_vendor.ref("loadmore");
    const indexList = common_vendor.ref([]);
    const currentPage = common_vendor.ref(1);
    const pageSize = common_vendor.ref(6);
    const pages = common_vendor.ref(0);
    const getStatusClass = (status) => {
      return status == "1" ? "status-success" : "status-cancelled";
    };
    const getList = async () => {
      let res = await api_index.getOrderListApi({
        currentPage: currentPage.value,
        pageSize: pageSize.value,
        userId: common_vendor.index.getStorageSync("userId")
      });
      if (res && res.code == 200) {
        pages.value = res.data.pages;
        indexList.value = indexList.value.concat(res.data.records);
        if (currentPage.value >= pages.value) {
          loadStatus.value = "nomore";
        } else {
          loadStatus.value = "loadmore";
        }
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
    const cancelBtn = (item) => {
      parms.makeId = item.makeId;
      cancelModal.value.open();
    };
    const cancelCancel = () => {
      cancelModal.value.close();
    };
    const cancelConfirm = async () => {
      let res = await api_index.cancelOrderApi(parms);
      if (res && res.code == 200) {
        indexList.value = [];
        currentPage.value = 1;
        getList();
        uvToast.value.show({
          type: "success",
          message: res.msg,
          bgColor: "#3F51B5"
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
            a: "93207a4f-0-" + i0,
            b: common_vendor.t(item.times),
            c: common_vendor.t(item.week),
            d: item.status == "1"
          }, item.status == "1" ? {
            e: "93207a4f-1-" + i0,
            f: common_vendor.p({
              size: "12",
              color: "#3F51B5",
              text: "挂号成功"
            })
          } : {}, {
            g: item.status == "2"
          }, item.status == "2" ? {
            h: "93207a4f-2-" + i0,
            i: common_vendor.p({
              size: "12",
              color: "#FFA000",
              text: "已取消"
            })
          } : {}, {
            j: common_vendor.n(getStatusClass(item.status)),
            k: "93207a4f-3-" + i0,
            l: "93207a4f-4-" + i0,
            m: common_vendor.t(item.deptName),
            n: common_vendor.t(item.nickName),
            o: "93207a4f-5-" + i0,
            p: common_vendor.t(item.visitname),
            q: "93207a4f-6-" + i0,
            r: common_vendor.t(item.timesArea == "0" ? "上午" : "下午"),
            s: "93207a4f-7-" + i0,
            t: common_vendor.t(item.address),
            v: "93207a4f-8-" + i0,
            w: common_vendor.t(item.price),
            x: "93207a4f-9-" + i0,
            y: common_vendor.t(item.createTime),
            z: item.status == "1"
          }, item.status == "1" ? common_vendor.e({
            A: item.hasVisit == "0"
          }, item.hasVisit == "0" ? {
            B: common_vendor.o(($event) => cancelBtn(item), index),
            C: "93207a4f-10-" + i0,
            D: common_vendor.p({
              size: "small",
              plain: true,
              text: "取消挂号",
              shape: "circle",
              customStyle: {
                color: "#FFA000",
                borderColor: "#FFA000"
              }
            })
          } : {}, {
            E: item.hasVisit == "1"
          }, item.hasVisit == "1" ? {
            F: "93207a4f-11-" + i0,
            G: common_vendor.p({
              size: "small",
              plain: true,
              text: "已就诊",
              shape: "circle",
              disabled: true,
              customStyle: {
                color: "#3F51B5",
                borderColor: "#3F51B5"
              }
            })
          } : {}) : {}, {
            H: index
          });
        }),
        b: common_vendor.p({
          name: "calendar",
          size: "20",
          color: "#3F51B5"
        }),
        c: common_vendor.p({
          color: "#eeeeee"
        }),
        d: common_vendor.p({
          name: "home",
          size: "22",
          color: "#2c3e50"
        }),
        e: common_vendor.p({
          name: "account",
          size: "18",
          color: "#606266"
        }),
        f: common_vendor.p({
          name: "clock",
          size: "18",
          color: "#606266"
        }),
        g: common_vendor.p({
          name: "map",
          size: "18",
          color: "#606266"
        }),
        h: common_vendor.p({
          name: "coupon",
          size: "18",
          color: "#606266"
        }),
        i: common_vendor.p({
          color: "#eeeeee"
        }),
        j: common_vendor.o(loadmore),
        k: common_vendor.p({
          status: loadStatus.value,
          color: "#7f8c8d"
        }),
        l: common_vendor.sr(uvToast, "93207a4f-13", {
          "k": "uvToast"
        }),
        m: common_vendor.sr(cancelModal, "93207a4f-14", {
          "k": "cancelModal"
        }),
        n: common_vendor.o(cancelCancel),
        o: common_vendor.o(cancelConfirm),
        p: common_vendor.p({
          showCancelButton: true,
          asyncClose: true,
          title: "系统提示",
          content: "确定取消挂号吗?",
          confirmColor: "#3F51B5",
          cancelColor: "#7f8c8d"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-93207a4f"], ["__file", "E:/System/phone/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
