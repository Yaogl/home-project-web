<template>
  <div class="page-panel">
    <h2>关于我们</h2>
    <div class="content" v-html="content"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../api';
const content = ref('');
onMounted(async () => {
  const page = await api.get('/site/pages/about');
  content.value = page?.content || '';
});
</script>

<style scoped>
.content { line-height: 1.8; color: #444; }
</style>
