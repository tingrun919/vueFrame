import Vue from "vue";
import Vuex from "vuex";
import confAction from "./modules/confAction";
import createLogger from "@/libs/logger";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    confAction,
    test: "6",
    //基础URL带端口号
    base8000: window.location.origin
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
