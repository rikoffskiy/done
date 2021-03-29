<template>
  <div id="app">
    <Header
      @showPreview="showOrHide"
      @showTable="showOrHide"
      @sortId="sortDataId(dataList.dataList)"
      @sortName="sortDataName(dataList.dataList)"
      @sortAge="sortDataAge(dataList.dataList)"
      @sortUnReverse="reverseFalse"
      @sortReverse="reverseTrue"
    />
    <Table :list="dataList" v-if="isTable" />
    <Preview :list="dataList" v-else />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import Preview from "./components/Preview.vue";

export default {
  name: "App",
  components: {
    Header,
    Table,
    Preview,
  },
  data: () => ({
    isTable: true,
    reverse: false,
  }),
  computed: {
    ...mapGetters("dataStore", ["dataList"]),
  },
  mounted() {
    this.fetchData();
  },
  methods: {
    showOrHide(check) {
      this.isTable = check;
    },
    ...mapActions("dataStore", ["fetchData"]),

    sortFoo(field, reverse, type) {
      const key = type
        ? function (x) {
            return type(x[field]);
          }
        : function (x) {
            return x[field];
          };
      reverse = !reverse ? 1 : -1;
      return function (a, b) {
        return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
      };
    },
    sortDataAge(arr) {
      arr.sort(function (a, b) {
        return parseFloat(a.age) - parseFloat(b.age);
      });
    },
    sortDataId(arr) {
      arr.sort(function (a, b) {
        return parseFloat(a.id) - parseFloat(b.id);
      });
    },
    sortDataName(arr) {
      arr.sort(function (a, b) {
        return parseFloat(a.name.ru) - parseFloat(b.name.ru);
      });
    },
    reverseTrue() {
      this.reverse = true;
    },
    reverseFalse() {
      this.reverse = false;
    },
  },
};
</script>

<style src="./css/app.css"></style>
