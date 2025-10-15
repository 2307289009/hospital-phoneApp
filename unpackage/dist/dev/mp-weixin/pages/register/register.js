"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_icon2 = common_vendor.resolveComponent("uv-icon");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_image2 + _easycom_uv_icon2 + _easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_form2 + _easycom_uv_button2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_icon = () => "../../uni_modules/uv-icon/components/uv-icon/uv-icon.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_icon + _easycom_uv_input + _easycom_uv_form_item + _easycom_uv_form + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "register",
  setup(__props) {
    const formRef = common_vendor.ref();
    const userInfo = common_vendor.reactive({
      userName: "",
      password: "",
      confirm: "",
      phone: "",
      name: ""
    });
    const rules = common_vendor.reactive({
      "name": {
        type: "string",
        required: true,
        message: "请输入您的姓名",
        trigger: ["blur", "change"]
      },
      "phone": {
        type: "string",
        required: true,
        message: "请输入您的联系方式",
        trigger: ["blur", "change"]
      },
      "userName": {
        type: "string",
        required: true,
        message: "请输入您的账号",
        trigger: ["blur", "change"]
      },
      "password": {
        type: "string",
        required: true,
        message: "请输入您的密码",
        trigger: ["blur", "change"]
      },
      confirm: [{
        required: true,
        message: "请确认您的密码",
        trigger: ["blur", "change"]
      }, {
        validator: (rule, value, callback) => {
          if (value !== userInfo.password) {
            return false;
          }
          return true;
        },
        message: "两次输入的密码不一致",
        trigger: ["change", "blur"]
      }]
    });
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const commit = () => {
      formRef.value.validate().then(async (valid) => {
        if (valid) {
          let res = await api_index.registerApi(userInfo);
          if (res && res.code == 200) {
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: "/static/user.jpg",
          shape: "circle",
          width: "80px",
          height: "80px"
        }),
        b: common_vendor.p({
          name: "camera-fill",
          color: "#ffffff",
          size: "20"
        }),
        c: common_vendor.p({
          name: "account-fill",
          size: "22"
        }),
        d: common_vendor.o(($event) => userInfo.name = $event),
        e: common_vendor.p({
          placeholder: "请输入您的姓名",
          border: "none",
          modelValue: userInfo.name
        }),
        f: common_vendor.p({
          prop: "name"
        }),
        g: common_vendor.p({
          name: "phone-fill",
          size: "22"
        }),
        h: common_vendor.o(($event) => userInfo.phone = $event),
        i: common_vendor.p({
          type: "number",
          placeholder: "请输入您的联系方式",
          border: "none",
          modelValue: userInfo.phone
        }),
        j: common_vendor.p({
          prop: "phone"
        }),
        k: common_vendor.p({
          name: "phone-fill",
          size: "22"
        }),
        l: common_vendor.o(($event) => userInfo.userName = $event),
        m: common_vendor.p({
          placeholder: "请输入您的账号",
          border: "none",
          modelValue: userInfo.userName
        }),
        n: common_vendor.p({
          prop: "userName"
        }),
        o: common_vendor.p({
          name: "lock-fill",
          size: "22"
        }),
        p: common_vendor.o(($event) => userInfo.password = $event),
        q: common_vendor.p({
          type: "password",
          placeholder: "请输入您的密码",
          border: "none",
          modelValue: userInfo.password
        }),
        r: common_vendor.p({
          prop: "password"
        }),
        s: common_vendor.p({
          name: "reload",
          size: "22"
        }),
        t: common_vendor.o(($event) => userInfo.confirm = $event),
        v: common_vendor.p({
          type: "password",
          placeholder: "请确认您的密码",
          border: "none",
          modelValue: userInfo.confirm
        }),
        w: common_vendor.p({
          prop: "confirm"
        }),
        x: common_vendor.sr(formRef, "bac4a35d-2", {
          "k": "formRef"
        }),
        y: common_vendor.p({
          labelWidth: "80",
          labelPosition: "left",
          model: userInfo,
          rules
        }),
        z: common_vendor.o(commit),
        A: common_vendor.p({
          color: "#7C4DFF",
          text: "注 册"
        }),
        B: common_vendor.o(toLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bac4a35d"], ["__file", "E:/System/phone/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
