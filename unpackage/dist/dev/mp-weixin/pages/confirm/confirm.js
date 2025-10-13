"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_radio2 = common_vendor.resolveComponent("uv-radio");
  const _easycom_uv_radio_group2 = common_vendor.resolveComponent("uv-radio-group");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_action_sheet2 = common_vendor.resolveComponent("uv-action-sheet");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  (_easycom_uv_form_item2 + _easycom_uv_radio2 + _easycom_uv_radio_group2 + _easycom_uv_input2 + _easycom_uv_icon2 + _easycom_uv_action_sheet2 + _easycom_uv_button2 + _easycom_uv_form2)();
}
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_radio = () => "../../uni_modules/uv-radio/components/uv-radio/uv-radio.js";
const _easycom_uv_radio_group = () => "../../uni_modules/uv-radio/components/uv-radio-group/uv-radio-group.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_action_sheet = () => "../../uni_modules/uv-action-sheet/components/uv-action-sheet/uv-action-sheet.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
if (!Math) {
  (_easycom_uv_form_item + _easycom_uv_radio + _easycom_uv_radio_group + _easycom_uv_input + _easycom_uv_icon + _easycom_uv_action_sheet + _easycom_uv_button + _easycom_uv_form)();
}
const _sfc_main = {
  __name: "confirm",
  setup(__props) {
    const upRef = common_vendor.ref();
    const sexSelect = common_vendor.ref();
    const actions = common_vendor.ref([]);
    const userInfo = common_vendor.reactive({
      scheduleId: "",
      userId: common_vendor.index.getStorageSync("userId"),
      deptName: "",
      doctorId: "",
      doctorName: "",
      times: "",
      week: "",
      address: "",
      timesArea: "0",
      visitUserId: "",
      visitorName: "",
      jobTitle: "",
      price: ""
    });
    const rules = common_vendor.reactive({
      "timesArea": {
        type: "string",
        required: true,
        message: "就诊时段",
        trigger: ["blur", "change"]
      },
      "visitorName": {
        type: "string",
        required: true,
        message: "就诊人",
        trigger: ["blur", "change"]
      }
    });
    const showSexSelect = () => {
      sexSelect.value.open();
    };
    const selectBtn = (e) => {
      console.log(e);
      userInfo.visitUserId = e.visitId;
      userInfo.visitorName = e.name;
    };
    const commit = async () => {
      console.log("进来了");
      upRef.value.validate().then(async (res) => {
        if (res) {
          let result = await api_index.makeOrderAddApi(userInfo);
          if (result && result.code == 200) {
            common_vendor.index.redirectTo({
              url: "/pages/order/order"
            });
          }
        }
      });
    };
    const getSelectVisitList = async () => {
      let res = await api_index.getSelectVisitListApi({
        "userId": common_vendor.index.getStorageSync("userId")
      });
      if (res && res.code == 200) {
        actions.value = res.data;
      }
    };
    common_vendor.onLoad((option) => {
      const item = JSON.parse(decodeURIComponent(option.item));
      console.log(item);
      Object.assign(userInfo, item);
    });
    common_vendor.onReady(() => {
      upRef.value.setRules(rules);
      getSelectVisitList();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userInfo.deptName),
        b: common_vendor.p({
          labelWidth: "90",
          label: "挂号科室:",
          borderBottom: true
        }),
        c: common_vendor.t(userInfo.doctorName),
        d: common_vendor.p({
          labelWidth: "90",
          label: "挂号医生:",
          borderBottom: true
        }),
        e: common_vendor.t(userInfo.jobTitle),
        f: common_vendor.p({
          labelWidth: "90",
          label: "医生职称:",
          borderBottom: true
        }),
        g: common_vendor.t(userInfo.times),
        h: common_vendor.t(userInfo.week),
        i: common_vendor.o(_ctx.open),
        j: common_vendor.p({
          labelWidth: "90",
          label: "挂号日期:",
          borderBottom: true
        }),
        k: common_vendor.p({
          customStyle: {
            marginLeft: "16px",
            marginRight: "25px"
          },
          name: "0",
          label: "上午"
        }),
        l: common_vendor.p({
          customStyle: {
            marginRight: "16px"
          },
          name: "1",
          label: "下午"
        }),
        m: common_vendor.o(($event) => userInfo.timesArea = $event),
        n: common_vendor.p({
          placement: "row",
          modelValue: userInfo.timesArea
        }),
        o: common_vendor.p({
          labelWidth: "90",
          label: "挂号时段:",
          prop: "timesArea",
          borderBottom: true
        }),
        p: common_vendor.t(userInfo.address),
        q: common_vendor.o(_ctx.open),
        r: common_vendor.p({
          labelWidth: "90",
          label: "就诊地址:",
          borderBottom: true
        }),
        s: common_vendor.o(($event) => userInfo.visitorName = $event),
        t: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "请选择就诊人",
          border: "none",
          modelValue: userInfo.visitorName
        }),
        v: common_vendor.p({
          name: "arrow-right"
        }),
        w: common_vendor.o(showSexSelect),
        x: common_vendor.p({
          labelWidth: "90",
          label: "就诊人:",
          prop: "visitorName",
          borderBottom: true
        }),
        y: common_vendor.t(userInfo.price),
        z: common_vendor.o(_ctx.open),
        A: common_vendor.p({
          labelWidth: "90",
          label: "挂号费用:",
          prop: "price",
          borderBottom: true
        }),
        B: common_vendor.sr(sexSelect, "095e1c21-14,095e1c21-0", {
          "k": "sexSelect"
        }),
        C: common_vendor.o(selectBtn),
        D: common_vendor.p({
          actions: actions.value,
          title: "请选择就诊人"
        }),
        E: common_vendor.o(commit),
        F: common_vendor.p({
          type: "primary",
          text: "确定挂号",
          customStyle: "margin-top: 50px;background:#1695F1;border:none;"
        }),
        G: common_vendor.sr(upRef, "095e1c21-0", {
          "k": "upRef"
        }),
        H: common_vendor.p({
          model: userInfo,
          rules
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/confirm/confirm.vue"]]);
wx.createPage(MiniProgramPage);
