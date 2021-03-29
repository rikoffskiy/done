<template>
  <div class="table">
    <div class="table-item" v-for="(item, idx) in list.data" :key="idx">
      <div class="img"><img :src="imgData(idx, list.data)" /></div>
      <div class="name">{{ ru ? item.name.ru : item.name.en }}</div>
      <div class="age">{{ item.age }}</div>
      <div class="phone">{{ item.phone }}</div>
      <div
        @click="star(item.id)"
        v-bind:class="{ active: item.star }"
        class="star"
      >
        <img src="/img/star.svg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    list: {
      type: Object,
      default: () => ({}),
    },
    ru: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Array,
      default: () => [],
    },
  },

  methods: {
    imgData(idx, list) {
      const img = list[idx].image;
      const src = `/img/${img}.svg`;
      return src;
    },
    star(id) {
      this.$emit("activeStar", id);
    },
  },
};
</script>

<style src="../css/table.css" scoped></style>
