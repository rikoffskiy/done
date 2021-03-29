<template>
  <div class="header-wrapper">
    <div class="top-header">
      <button class="lang" @click="lang">
        {{ ru ? header.btn.ru : header.btn.en }}
      </button>
      <input
        :placeholder="ru ? header.placeholder.ru : header.placeholder.en"
        v-model="searchItem"
      />
    </div>

    <div class="header">
      <div class="sort-header">
        <span>{{ ru ? header.sortItem.ru : header.sortItem.en }}</span>
        <div class="btn-group">
          <button
            @click="sortId"
            v-bind:class="{ active: activeSortHeader === 0 }"
            v-on:click.prevent="(activeSortHeader = 0), (typeSort = 0)"
            class="btn id"
          >
            ID
          </button>
          <button
            @click="sortName"
            v-bind:class="{ active: activeSortHeader === 1 }"
            v-on:click.prevent="(activeSortHeader = 1), (typeSort = 0)"
            class="btn name"
          >
            {{ ru ? header.name.ru : header.name.en }}
          </button>
          <button
            @click="sortAge"
            v-bind:class="{ active: activeSortHeader === 2 }"
            v-on:click.prevent="(activeSortHeader = 2), (typeSort = 0)"
            class="btn age"
          >
            {{ ru ? header.age.ru : header.age.en }}
          </button>
        </div>

        <div class="sort">
          <button
            @click="sortUnReverse"
            v-bind:class="{ active: typeSort === 0 }"
            v-on:click.prevent="typeSort = 0"
            class="btn sort-method sort-up"
          >
            {{ ru ? header.sortUp.ru : header.sortUp.en }}
          </button>
          <button
            @click="sortReverse"
            v-bind:class="{ active: typeSort === 1 }"
            v-on:click.prevent="typeSort = 1"
            class="btn sort-method sort-down"
          >
            {{ ru ? header.sortDown.ru : header.sortDown.en }}
          </button>
        </div>
      </div>

      <div class="type-wrapper">
        <span>{{ ru ? header.view.ru : header.view.en }}</span>
        <div class="type">
          <button
            @click="typeTable"
            v-bind:class="{ active: table === 0 }"
            v-on:click.prevent="table = 0"
            class="type-item tab"
          >
            {{ ru ? header.table.ru : header.table.en }}
          </button>
          <button
            @click="typePreview"
            v-bind:class="{ active: table === 1 }"
            v-on:click.prevent="table = 1"
            class="type-item preview"
          >
            {{ ru ? header.preview.ru : header.preview.en }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Header",
  data: () => ({
    searchItem: "",
    activeSortHeader: 0,
    typeSort: 0,
    table: 0,
    ru: true,
    header: {
      placeholder: {
        ru: "Поиск ...",
        en: "Search ...",
      },
      btn: {
        ru: "en",
        en: "ru",
      },
      sortItem: {
        ru: "Сортировка",
        en: "Sorting",
      },
      view: {
        ru: "Вид",
        en: "View",
      },
      name: {
        ru: "Имя",
        en: "Name",
      },
      age: {
        ru: "Возраст",
        en: "Age",
      },
      sortUp: {
        ru: "По возрастанию",
        en: "Ascending",
      },
      sortDown: {
        ru: "По убыванию",
        en: "Descending",
      },
      table: {
        ru: "Таблица",
        en: "Table",
      },
      preview: {
        ru: "Превью",
        en: "Preview",
      },
    },
    check: true,
  }),
  watch: {
    searchItem: function () {
      if (this.ru) {
        if (this.searchItem == "") {
          this.getData();
        } else this.$store.commit("SearchRu", this.searchItem);
      } else {
        if (this.searchItem == "") {
          this.getData();
        } else this.$store.commit("SearchEn", this.searchItem);
      }
    },
  },
  methods: {
    ...mapActions(["getData"]),
    typeTable() {
      this.$emit("showTable", this.check);
    },
    typePreview() {
      this.$emit("showPreview", !this.check);
    },
    sortId() {
      this.$emit("sortId");
    },
    sortName() {
      this.$emit("sortName");
    },
    sortAge() {
      this.$emit("sortAge");
    },
    sortUnReverse() {
      this.$emit("sortUnReverse");
    },
    sortReverse() {
      this.$emit("sortReverse");
    },
    lang() {
      if (this.ru == true) {
        this.ru = false;
      } else this.ru = true;
      this.$emit("changeLang", this.ru);
    },
  },
};
</script>

<style src="../css/header.css" scoped></style>
