<template>
  <div id="app">
    <Header
      @changeLang="changeLang"
      @showPreview="showOrHide"
      @showTable="showOrHide"
      @sortId="sortId"
      @sortAge="sortAge"
      @sortName="sortName"
      @sortReverse="reverseUp"
      @sortUnReverse="reverseDown"
    />
    <Table
      @activeStar="addActiveStar"
      :ru="ru"
      :list="getAllData"
      :active="active"
      v-if="isTable"
    />
    <Preview
      @activeStar="addActiveStar"
      :ru="ru"
      :list="getAllData"
      :active="active"
      v-else
    />
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import Preview from "./components/Preview.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "App",
  components: {
    Header,
    Table,
    Preview,
  },
  data: () => ({
    ru: true,
    isTable: true,
    toggler: true,
    active: [],
    searchStr: "Г",
  }),

  computed: {
    ...mapGetters(["getAllData"]),
  },
  mounted() {
    this.getData();
  },
  methods: {
    ...mapActions(["getData"]),
    showOrHide(check) {
      this.isTable = check;
    },
    sortId() {
      this.$store.commit("setById");
      this.toggler = true;
    },
    sortAge() {
      this.$store.commit("setByAge");
      this.toggler = true;
    },
    sortNameRu() {
      this.$store.commit("setByNameRu");
    },
    sortNameEn() {
      this.$store.commit("setByNameEn");
    },
    sortName() {
      if (this.ru) {
        this.sortNameRu();
        this.toggler = true;
      } else {
        this.sortNameEn();
        this.toggler = true;
      }
    },
    reverseUp() {
      if (this.toggler === true) {
        this.$store.commit("setReverse");
      }
      this.toggler = false;
    },
    reverseDown() {
      if (this.toggler === false) {
        this.$store.commit("setReverse");
      }
      this.toggler = true;
    },

    sortDataId(arr) {
      arr.sort(function (a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
      });
      this.toggler = true;
    },
    sortDataName(objField, prop, arr) {
      arr.sort(function (a, b) {
        if (a[objField][prop] < b[objField][prop]) {
          return -1;
        } else if (b[objField][prop] > a[objField][prop]) {
          return 1;
        } else {
          return 0;
        }
      });
      this.toggler = true;
    },
    sortDataAge(arr) {
      arr.sort(function (a, b) {
        return parseFloat(a.age) - parseFloat(b.age);
      });
      this.toggler = true;
    },
    reverseTrue(arr) {
      if (this.toggler === true) {
        arr.reverse();
        this.toggler = false;
      }
    },
    reverseFalse(arr) {
      if (this.toggler === false) {
        arr.reverse();
        this.toggler = true;
      }
    },
    changeLang() {
      if (this.ru) {
        this.ru = false;
      } else {
        this.ru = true;
      }
    },
    addActiveStar(id) {
      this.$store.commit("addStar", id);
    },
  },
};
</script>

<style src="./css/app.css"></style>
