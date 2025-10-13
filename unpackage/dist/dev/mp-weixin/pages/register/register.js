"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  (_easycom_uv_image2 + _easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_form2 + _easycom_uv_button2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_input + _easycom_uv_form_item + _easycom_uv_form + _easycom_uv_button)();
}
const _sfc_main = {
  __name: "register",
  setup(__props) {
    common_vendor.ref();
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
        message: "请填写姓名",
        trigger: ["blur", "change"]
      },
      "phone": {
        type: "string",
        required: true,
        message: "请填写联系方式",
        trigger: ["blur", "change"]
      },
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
      },
      confirm: [{
        required: true,
        message: "请输入确定密码",
        // blur和change事件触发检验
        trigger: ["blur", "change"]
      }, {
        // 自定义验证函数，见上说明，注意这里面的逻辑不能出现语法报错，否则可能导致不验证
        validator: (rule, value, callback) => {
          console.log(value);
          if (value != userInfo.password) {
            return false;
          }
          return true;
        },
        message: "密码和确定密码不一致",
        trigger: ["blur"]
      }]
    });
    const toLogin = () => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const commit = async () => {
      formRef.value.validate().then(async (vali) => {
        console.log(vali);
        let res = await api_index.registerApi(userInfo);
        console.log(res);
        if (res && res.code == 200) {
          common_vendor.index.navigateTo({
            url: "/pages/login/login"
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
        b: common_vendor.o(($event) => userInfo.name = $event),
        c: common_vendor.p({
          placeholder: "请输入姓名",
          border: "none",
          modelValue: userInfo.name
        }),
        d: common_vendor.p({
          label: "姓名:",
          prop: "name",
          borderBottom: true
        }),
        e: common_vendor.o(($event) => userInfo.phone = $event),
        f: common_vendor.p({
          type: "number",
          placeholder: "请输入联系方式",
          border: "none",
          modelValue: userInfo.phone
        }),
        g: common_vendor.p({
          label: "联系方式:",
          prop: "phone",
          borderBottom: true
        }),
        h: common_vendor.o(($event) => userInfo.userName = $event),
        i: common_vendor.p({
          placeholder: "请输入账号",
          border: "none",
          modelValue: userInfo.userName
        }),
        j: common_vendor.p({
          label: "账号:",
          prop: "userName",
          borderBottom: true
        }),
        k: common_vendor.o(($event) => userInfo.password = $event),
        l: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          border: "none",
          modelValue: userInfo.password
        }),
        m: common_vendor.p({
          label: "密码:",
          prop: "password",
          borderBottom: true
        }),
        n: common_vendor.o(($event) => userInfo.confirm = $event),
        o: common_vendor.p({
          type: "password",
          placeholder: "请输入密码",
          border: "none",
          modelValue: userInfo.confirm
        }),
        p: common_vendor.p({
          label: "确定密码:",
          prop: "confirm",
          borderBottom: true
        }),
        q: common_vendor.sr(formRef, "bac4a35d-1", {
          "k": "formRef"
        }),
        r: common_vendor.p({
          labelWidth: "70",
          labelPosition: "left",
          model: userInfo,
          rules
        }),
        s: common_vendor.o(commit),
        t: common_vendor.p({
          color: "#7C4DFF",
          type: "primary",
          text: "注册",
          customStyle: "margin-top: 10px;background:#7C4DFF;"
        }),
        v: common_vendor.o(toLogin),
        w: common_vendor.p({
          color: "#7C4DFF",
          type: "primary",
          text: "登录",
          customStyle: "margin-top: 30px;background:#7C4DFF;"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bac4a35d"], ["__file", "E:/System/phone/pages/register/register.vue"]]);
wx.createPage(MiniProgramPage);
