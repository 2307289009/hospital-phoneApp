"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  (_easycom_uv_image2 + _easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_button2 + _easycom_uv_form2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_input + _easycom_uv_form_item + _easycom_uv_button + _easycom_uv_form)();
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
        message: "账号",
        trigger: ["blur", "change"]
      },
      "password": {
        type: "string",
        required: true,
        message: "密码",
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
        console.log(vali);
        console.log(addModel);
        let res = await api_index.loginApi(addModel);
        if (res && res.code == 200) {
          console.log(res.data);
          common_vendor.index.setStorageSync("userId", res.data.userId);
          common_vendor.index.switchTab({
            url: "../index/index"
          });
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
        b: common_vendor.o(($event) => addModel.userName = $event),
        c: common_vendor.p({
          placeholder: "账号",
          border: "none",
          modelValue: addModel.userName
        }),
        d: common_vendor.p({
          label: "账号:",
          prop: "userName",
          borderBottom: true
        }),
        e: common_vendor.o(($event) => addModel.password = $event),
        f: common_vendor.p({
          password: true,
          placeholder: "密码",
          border: "none",
          modelValue: addModel.password
        }),
        g: common_vendor.p({
          label: "密码:",
          prop: "password",
          borderBottom: true
        }),
        h: common_vendor.o(commit),
        i: common_vendor.p({
          type: "primary",
          text: "登录",
          customStyle: "margin-top: 10px;background:#19be6b;"
        }),
        j: common_vendor.o(toRegister),
        k: common_vendor.p({
          type: "primary",
          text: "注册",
          customStyle: "margin-top: 30px;background:#ff9900;"
        }),
        l: common_vendor.sr(addRef, "bd7b541a-1", {
          "k": "addRef"
        }),
        m: common_vendor.p({
          labelWidth: "80",
          labelPosition: "left",
          model: addModel,
          rules
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/login/login.vue"]]);
wx.createPage(MiniProgramPage);
