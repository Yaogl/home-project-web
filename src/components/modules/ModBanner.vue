<template>
  <div class="banner-wrap">
    <div class="banner" v-if="config.images?.length">
      <img v-for="(img, i) in config.images" :key="i" :src="img" alt="" />
    </div>
    <div v-else class="banner placeholder">
      <span>请在管理后台配置 Banner 图片</span>
    </div>
  </div>
</template>

<script setup>
defineProps({ config: { type: Object, default: () => ({}) } });
</script>

<style scoped>
.banner-wrap { margin: 0 -8px; }
.banner img {
  width: 100%;
  max-height: 320px;
  object-fit: cover;
  border-radius: 12px;
  display: block;
}
.placeholder {
  height: 200px;
  background: linear-gradient(135deg, #e8f2ff, #f0f4f8);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  border-radius: 12px;
  border: 1px dashed #c0d4f0;
}
</style>
