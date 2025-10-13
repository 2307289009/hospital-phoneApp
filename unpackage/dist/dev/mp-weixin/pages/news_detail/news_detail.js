"use strict";
const common_vendor = require("../../common/vendor.js");
const common_http = require("../../common/http.js");
if (!Array) {
  const _easycom_uv_image2 = common_vendor.resolveComponent("uv-image");
  const _easycom_uv_text2 = common_vendor.resolveComponent("uv-text");
  const _easycom_uv_parse2 = common_vendor.resolveComponent("uv-parse");
  (_easycom_uv_image2 + _easycom_uv_text2 + _easycom_uv_parse2)();
}
const _easycom_uv_image = () => "../../uni_modules/uv-image/components/uv-image/uv-image.js";
const _easycom_uv_text = () => "../../uni_modules/uv-text/components/uv-text/uv-text.js";
const _easycom_uv_parse = () => "../../uni_modules/uv-parse/components/uv-parse/uv-parse.js";
if (!Math) {
  (_easycom_uv_image + _easycom_uv_text + _easycom_uv_parse)();
}
const _sfc_main = {
  __name: "news_detail",
  setup(__props) {
    const news = common_vendor.reactive({});
    common_vendor.onLoad((option) => {
      const item = JSON.parse(decodeURIComponent(option.item));
      console.log(item);
      Object.assign(news, item);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          src: common_vendor.unref(common_http.http).baseUrl + news.image,
          width: "100%",
          height: "180px"
        }),
        b: common_vendor.p({
          bold: "true",
          text: news.title,
          color: "#34495e"
        }),
        c: common_vendor.p({
          text: news.textDesc,
          color: "#555555"
        }),
        d: common_vendor.p({
          content: news.textContent
        }),
        e: common_vendor.p({
          text: news.createTime,
          color: "#b0bec5"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/pages/news_detail/news_detail.vue"]]);
wx.createPage(MiniProgramPage);
