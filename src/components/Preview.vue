<template>
  <div class="preview" v-on="updateHeight()">
    <div class="preview-item" v-for="(item, idx) in list.data" :key="idx">
      <div v-if="item.video">
        <video
          class="video"
          :autoplay="auto"
          controls
          :src="videoData(idx, list.data)"
        ></video>
      </div>

      <div class="data" v-else>
        <div class="preview-header">
          <div class="img"><img :src="imgData(idx, list.data)" /></div>
          <div class="name">{{ ru ? item.name.ru : item.name.en }}</div>
          <div
            @click="star(item.id)"
            v-bind:class="{ active: item.star }"
            class="star"
          >
            <img src="/img/star.svg" />
          </div>
        </div>
        <div class="preview-body">
          <div class="age">{{ item.age }}</div>
          <div class="phone">{{ item.phone }}</div>
          <div class="phrase">{{ ru ? item.phrase.ru : item.phrase.en }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Preview",
  data: () => ({
    auto: [],
    windowHeight: 0,
    videoHeight: 0,
    videos: [],
  }),
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
  created() {
    window.addEventListener("resize", this.updateHeight);
    const videos = document.querySelectorAll(".video");
    console.log(videos);
  },
  methods: {
    imgData(idx, list) {
      const img = list[idx].image;
      const src = `/img/${img}.svg`;
      return src;
    },
    videoData(idx, list) {
      const video = list[idx].video;
      const src = `/video/${video}.mp4`;
      return src;
    },
    star(id) {
      this.$emit("activeStar", id);
    },
    updateHeight() {
      this.windowHeight = window.innerHeight;
    },
  },
};
</script>

<style src="../css/preview.css" scoped></style>
