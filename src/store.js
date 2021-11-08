import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });

const store = createStore({
  state() {
    return {
      acc_type: "",
      user_id: 0,
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
      switch (acc_type) {
        case "admin":
          state.user_id = 1;
          break;
        case "learner":
          state.user_id = 2;
          break;
        case "trainer":
          state.user_id = 3;
          break;
      }
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
