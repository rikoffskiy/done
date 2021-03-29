import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: [],
  },
  getters: {
    getAllData(state) {
      return state;
    },
  },
  mutations: {
    setData(state, payload) {
      state.data = payload;
    },
    setById(state) {
      state.data.sort((a, b) => {
        return parseFloat(a.id) - parseFloat(b.id);
      });
    },
    setByAge(state) {
      state.data.sort((a, b) => {
        return parseFloat(a.age) - parseFloat(b.age);
      });
    },
    setByNameRu(state) {
      state.data.sort(function (a, b) {
        if (a["name"]["ru"] < b["name"]["ru"]) {
          return -1;
        } else if (b["name"]["ru"] > a["name"]["ru"]) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    setByNameEn(state) {
      state.data.sort(function (a, b) {
        if (a["name"]["en"] < b["name"]["en"]) {
          return -1;
        } else if (b["name"]["en"] > a["name"]["en"]) {
          return 1;
        } else {
          return 0;
        }
      });
    },
    setReverse(state) {
      state.data.reverse();
    },
    addFalseStar(state, id) {
      state.data[id].star = false;
    },
    addStar(state, id) {
      state.data.forEach((item) => {
        if (item.id == id) {
          if (!item.star) {
            Vue.set(item, "star", true);
          } else Vue.set(item, "star", false);
        }
      });
    },
    SearchRu(state, searchStr) {
      if (searchStr === "") {
        this.getData();
      } else
        this.state.data = state.data.filter((x) =>
          x.name.ru.toLowerCase().includes(searchStr.toLowerCase())
        );
    },
    SearchEn(state, searchStr) {
      if (searchStr === "") {
        this.getData();
      } else
        this.state.data = state.data.filter((x) =>
          x.name.en.toLowerCase().includes(searchStr.toLowerCase())
        );
    },
  },
  actions: {
    getData(context) {
      fetch("data.json")
        .then((response) => response.json())
        .then((json) => context.commit("setData", json));
    },
  },
  modules: {},
});
