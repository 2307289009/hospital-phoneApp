"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/evaluate/evaluate.js";
  "./pages/appointment/appointment.js";
  "./pages/record/record.js";
  "./pages/register/register.js";
  "./pages/doctorIdentity/doctorIdentity.js";
  "./pages/confirm/confirm.js";
  "./pages/doctorDepartment/doctorDepartment.js";
  "./pages/journal/journal.js";
  "./pages/see/see.js";
  "./pages/primary/primary.js";
  "./pages/journal_content/journal_content.js";
  "./pages/identity/identity.js";
  "./pages/treatment/treatment.js";
  "./pages/treatmentModify/treatmentModify.js";
  "./pages/treatmentAdd/treatmentAdd.js";
  "./pages/change/change.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/System/phone/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
