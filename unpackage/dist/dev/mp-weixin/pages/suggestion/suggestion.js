"use strict";
const common_vendor = require("../../common/vendor.js");
const api_index = require("../../api/index.js");
require("../../common/http.js");
if (!Array) {
  const _easycom_uv_input2 = common_vendor.resolveComponent("uv-input");
  const _easycom_uv_form_item2 = common_vendor.resolveComponent("uv-form-item");
  const _easycom_uv_textarea2 = common_vendor.resolveComponent("uv-textarea");
  const _easycom_uv_button2 = common_vendor.resolveComponent("uv-button");
  const _easycom_uv_form2 = common_vendor.resolveComponent("uv-form");
  (_easycom_uv_input2 + _easycom_uv_form_item2 + _easycom_uv_textarea2 + _easycom_uv_button2 + _easycom_uv_form2)();
}
const _easycom_uv_input = () => "../../uni_modules/uv-input/components/uv-input/uv-input.js";
const _easycom_uv_form_item = () => "../../uni_modules/uv-form/components/uv-form-item/uv-form-item.js";
const _easycom_uv_textarea = () => "../../uni_modules/uv-textarea/components/uv-textarea/uv-textarea.js";
const _easycom_uv_button = () => "../../uni_modules/uv-button/components/uv-button/uv-button.js";
const _easycom_uv_form = () => "../../uni_modules/uv-form/components/uv-form/uv-form.js";
if (!Math) {
  (_easycom_uv_input + _easycom_uv_form_item + _easycom_uv_textarea + _easycom_uv_button + _easycom_uv_form)();
}
const _sfc_main = {
  __name: "suggestion",
  setup(__props) {
    const addRef = common_vendor.ref();
    const addModel = common_vendor.reactive({
      title: "",
      content: "",
      userId: common_vendor.index.getStorageSync("userId")
    });
    const rules = common_vendor.reactive({
      "title": {
        type: "string",
        required: true,
        message: "标题",
        trigger: ["blur", "change"]
      },
      "content": {
        type: "string",
        required: true,
        message: "简介",
        trigger: ["blur", "change"]
      }
    });
    const commit = async () => {
      addRef.value.validate().then(async (res) => {
        console.log(res);
        let result = await api_index.addSuggestApi(addModel);
        if (result && result.code == 200) {
          common_vendor.index.navigateBack();
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => addModel.title = $event),
        b: common_vendor.p({
          placeholder: "请简要描述您的问题",
          border: "none",
          modelValue: addModel.title
        }),
        c: common_vendor.p({
          label: "问题:",
          prop: "title",
          borderBottom: true
        }),
        d: common_vendor.o(($event) => addModel.content = $event),
        e: common_vendor.p({
          placeholder: "请详细描述问题的细节",
          border: "none",
          modelValue: addModel.content
        }),
        f: common_vendor.p({
          label: "详细:",
          prop: "content",
          borderBottom: true
        }),
        g: common_vendor.o(commit),
        h: common_vendor.p({
          type: "primary",
          text: "确定",
          customStyle: {
            marginTop: "10px",
            background: "#008080",
            border: "none"
          }
        }),
        i: common_vendor.sr(addRef, "1f42779f-0", {
          "k": "addRef"
        }),
        j: common_vendor.p({
          labelPosition: "left",
          model: addModel,
          rules
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/suggestion/suggestion.vue"]]);
wx.createPage(MiniProgramPage);
