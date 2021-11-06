import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });

const store = createStore({
  state() {
    return {
      acc_type: "",
    };
  },

  getters: {
    acc_type(state) {
      return state.acc_type;
    },
  },

  mutations: {
    onLogin(state, acc_type) {
      state.acc_type = acc_type;
    },
  },
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: (key) => ls.remove(key),
      },
    }),
  ],
  actions: {},
});

export default store;
