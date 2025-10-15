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
  __name: "login",
  setup(__props) {
    const addRef = common_vendor.ref();
    const addModel = common_vendor.reactive({
      userName: "",
      password: ""
    });
    const rules = common_vendor.reactive({
      "userName": {
        type: "string",
        required: true,
        message: "请输入账号",
        trigger: ["blur", "change"]
      },
      "password": {
        type: "string",
        required: true,
        message: "请输入密码",
        trigger: ["blur", "change"]
      }
    });
    const toRegister = () => {
      common_vendor.index.navigateTo({
        url: "/pages/register/register"
      });
    };
    const commit = async () => {
      addRef.value.validate().then(async (vali) => {
        if (vali) {
          let res = await api_index.loginApi(addModel);
          if (res && res.code == 200) {
            console.log(res.data);
            common_vendor.index.setStorageSync("userId", res.data.userId);
            common_vendor.index.switchTab({
              url: "../index/index"
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
          name: "account",
          size: "22",
          color: "#999"
        }),
        c: common_vendor.o(($event) => addModel.userName = $event),
        d: common_vendor.p({
          placeholder: "请输入账号",
          border: "none",
          clearable: true,
          modelValue: addModel.userName
        }),
        e: common_vendor.p({
          prop: "userName",
          borderBottom: true
        }),
        f: common_vendor.p({
          name: "lock",
          size: "22",
          color: "#999"
        }),
        g: common_vendor.o(($event) => addModel.password = $event),
        h: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          border: "none",
          clearable: true,
          modelValue: addModel.password
        }),
        i: common_vendor.p({
          prop: "password",
          borderBottom: true
        }),
        j: common_vendor.sr(addRef, "bd7b541a-1", {
          "k": "addRef"
        }),
        k: common_vendor.p({
          labelPosition: "left",
          model: addModel,
          rules
        }),
        l: common_vendor.o(commit),
        m: common_vendor.p({
          type: "primary",
          text: "登 录"
        }),
        n: common_vendor.o(toRegister)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
