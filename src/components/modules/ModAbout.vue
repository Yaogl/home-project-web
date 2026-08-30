<template>
  <div class="about-brief">
    <h3 class="module-title">{{ config.title || '关于我们' }}</h3>
    <div class="summary" v-html="summaryHtml"></div>
    <router-link to="/about" class="more-link">了解更多 →</router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({ config: { type: Object, default: () => ({}) } });

const summaryHtml = computed(
  () =>
    props.config.summary ||
    '<p>专注工业过滤设备研发与制造，品质成就未来。</p>',
);
</script>

<style scoped>
.module-title {
  margin: 0 0 16px;
  font-size: 20px;
  color: #1a1a1a;
  padding-bottom: 12px;
  border-bottom: 2px solid #1a6dff;
  display: inline-block;
}
.summary { line-height: 1.8; color: #444; font-size: 15px; }
.summary :deep(p) { margin: 0 0 12px; }
.more-link { display: inline-block; margin-top: 16px; color: #1a6dff; font-size: 14px; }
.more-link:hover { text-decoration: underline; }
</style>
