"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  (_easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_button2 + _easycom_uv_form2)();
}
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_form_item + _easycom_uv_button + _easycom_uv_form)();
}
const _sfc_main = {
  __name: "reset_password",
  setup(__props) {
    const addRef = common_vendor.ref();
    const addModel = common_vendor.reactive({
      oldPassword: "",
      password: "",
      confirmPassword: "",
      userId: ""
    });
    const rules = common_vendor.reactive({
      "oldPassword": {
        type: "string",
        required: true,
        message: "原密码",
        trigger: ["blur", "change"]
      },
      "password": {
        type: "string",
        required: true,
        message: "新密码",
        trigger: ["blur", "change"]
      },
      "confirmPassword": [
        {
          type: "string",
          required: true,
          message: "确定密码",
          trigger: ["blur", "change"]
        },
        {
          // 自定义验证函数，见上说明，注意这里面的逻辑不能出现语法报错，否则可能导致不验证
          validator: (rule, value, callback) => {
            return value == addModel.password;
          },
          message: "新密码和确定密码不一致",
          trigger: ["blur", "change"]
        }
      ]
    });
    const commit = () => {
      addRef.value.validate().then(async (res) => {
        console.log(res);
        addModel.userId = common_vendor.index.getStorageSync("userId");
        let result = await api_index.updatePasswordApi(addModel);
        if (result && result.code == 200) {
          common_vendor.index.navigateBack();
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => addModel.oldPassword = $event),
        b: common_vendor.p({
          placeholder: "请输入原密码",
          border: "none",
          modelValue: addModel.oldPassword
        }),
        c: common_vendor.p({
          label: "原密码:",
          prop: "oldPassword",
          borderBottom: true
        }),
        d: common_vendor.o(($event) => addModel.password = $event),
        e: common_vendor.p({
          placeholder: "请输入新密码",
          border: "none",
          modelValue: addModel.password
        }),
        f: common_vendor.p({
          label: "新密码:",
          prop: "password",
          borderBottom: true
        }),
        g: common_vendor.o(($event) => addModel.confirmPassword = $event),
        h: common_vendor.p({
          placeholder: "请输入确定密码",
          border: "none",
          modelValue: addModel.confirmPassword
        }),
        i: common_vendor.p({
          label: "确定密码:",
          prop: "confirmPassword",
          borderBottom: true
        }),
        j: common_vendor.o(commit),
        k: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: {
            marginTop: "10px",
            background: "#FF9800",
            border: "none"
          }
        }),
        l: common_vendor.sr(addRef, "46b2f982-0", {
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/reset_password/reset_password.vue"]]);
wx.createPage(MiniProgramPage);
