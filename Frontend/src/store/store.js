import vue from "vue";
import vuex from "vuex";
import persistedState from "vuex-persistedstate";
import actions from "./actions";
import mutations from "./mutations";
import state from "./state";
vue.use(vuex);

export const store = new vuex.Store({
  plugins: [persistedState()],
  state,
  mutations,
  actions,
});
