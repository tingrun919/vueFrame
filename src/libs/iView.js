import Vue from "vue";
import * as componentObj from "./iViewComponent";

Object.keys(componentObj).forEach(item => {
  // console.log(item);
  if (item === "Message") {
    Vue.prototype.$message = componentObj[item];
  } else {
    Vue.use(componentObj[item]);
  }
});
