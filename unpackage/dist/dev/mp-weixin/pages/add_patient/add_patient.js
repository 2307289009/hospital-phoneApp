"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_radio2 = common_vendor.resolveComponent("uv-radio");
  const _easycom_uv_radio_group2 = common_vendor.resolveComponent("uv-radio-group");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_uv_datetime_picker2 = common_vendor.resolveComponent("uv-datetime-picker");
  (_easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_radio2 + _easycom_uv_radio_group2 + _easycom_uv_button2 + _easycom_uv_form2 + _easycom_uv_datetime_picker2)();
}
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_radio = () => "../../uni_modules/uv-radio/components/uv-radio/uv-radio.js";
const _easycom_uv_radio_group = () => "../../uni_modules/uv-radio/components/uv-radio-group/uv-radio-group.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_uv_datetime_picker = () => "../../uni_modules/uv-datetime-picker/components/uv-datetime-picker/uv-datetime-picker.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_form_item + _easycom_uv_radio + _easycom_uv_radio_group + _easycom_uv_button + _easycom_uv_form + _easycom_uv_datetime_picker)();
}
const _sfc_main = {
  __name: "add_patient",
  setup(__props) {
    const upRef = common_vendor.ref();
    const times = common_vendor.ref(Number(/* @__PURE__ */ new Date()));
    const datetimePicker = common_vendor.ref();
    const userInfo = common_vendor.reactive({
      visitId: "",
      userId: "",
      visitname: "",
      sex: "",
      phone: "",
      birthday: "",
      idCard: ""
    });
    const open = () => {
      console.log("999");
      datetimePicker.value.open();
    };
    const confirm = (e) => {
      console.log(e);
      let timeValue = common_vendor.dayjs(e.value).format("YYYY-MM-DD");
      console.log(timeValue);
      userInfo.birthday = timeValue;
    };
    const rules = common_vendor.reactive({
      "visitname": {
        type: "string",
        required: true,
        message: "姓名",
        trigger: ["blur", "change"]
      },
      "sex": {
        type: "string",
        required: true,
        message: "性别",
        trigger: ["blur", "change"]
      },
      "phone": {
        type: "string",
        required: true,
        message: "联系方式",
        trigger: ["blur", "change"]
      },
      "birthday": {
        type: "string",
        required: true,
        message: "出生年月",
        trigger: ["change"]
      },
      "idCard": {
        type: "string",
        required: true,
        message: "身份证号码",
        trigger: ["blur", "change"]
      }
    });
    const submit = () => {
      upRef.value.validate().then(async (vali) => {
        console.log(common_vendor.index.getStorageSync("userId"));
        userInfo.userId = common_vendor.index.getStorageSync("userId");
        let res = await api_index.visitAddApi(userInfo);
        if (res && res.code == 200) {
          common_vendor.index.navigateBack({
            delta: 1
          });
        }
      });
    };
    common_vendor.onReady(() => {
      upRef.value.setRules(rules);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => userInfo.visitname = $event),
        b: common_vendor.p({
          border: "none",
          modelValue: userInfo.visitname
        }),
        c: common_vendor.p({
          label: "姓名:",
          prop: "visitname",
          borderBottom: true
        }),
        d: common_vendor.p({
          customStyle: {
            marginLeft: "16px",
            marginRight: "25px"
          },
          name: "0",
          label: "男"
        }),
        e: common_vendor.p({
          customStyle: {
            marginRight: "16px"
          },
          name: "1",
          label: "女"
        }),
        f: common_vendor.o(($event) => userInfo.sex = $event),
        g: common_vendor.p({
          placement: "row",
          modelValue: userInfo.sex
        }),
        h: common_vendor.p({
          label: "性别:",
          prop: "sex",
          borderBottom: true
        }),
        i: common_vendor.o(($event) => userInfo.birthday = $event),
        j: common_vendor.p({
          border: "none",
          modelValue: userInfo.birthday
        }),
        k: common_vendor.o(open),
        l: common_vendor.p({
          labelWidth: "90",
          label: "出生日期:",
          prop: "birthday",
          borderBottom: true
        }),
        m: common_vendor.o(($event) => userInfo.phone = $event),
        n: common_vendor.p({
          border: "none",
          modelValue: userInfo.phone
        }),
        o: common_vendor.p({
          label: "联系方式:",
          prop: "phone",
          borderBottom: true
        }),
        p: common_vendor.o(($event) => userInfo.idCard = $event),
        q: common_vendor.p({
          border: "none",
          modelValue: userInfo.idCard
        }),
        r: common_vendor.p({
          labelWidth: "90",
          label: "身份证:",
          prop: "idCard",
          borderBottom: true
        }),
        s: common_vendor.o(submit),
        t: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: "margin-top: 50px;background:#1695F1;border:none;"
        }),
        v: common_vendor.sr(upRef, "45da0f6f-0", {
          "k": "upRef"
        }),
        w: common_vendor.p({
          model: userInfo,
          rules
        }),
        x: common_vendor.sr(datetimePicker, "45da0f6f-14", {
          "k": "datetimePicker"
        }),
        y: common_vendor.o(confirm),
        z: common_vendor.o(($event) => times.value = $event),
        A: common_vendor.p({
          mode: "date",
          modelValue: times.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/add_patient/add_patient.vue"]]);
wx.createPage(MiniProgramPage);
