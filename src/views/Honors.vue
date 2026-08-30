<template>
  <div class="page-panel">
    <h2>案例荣誉</h2>
    <div class="grid">
      <div v-for="h in list" :key="h.id" class="product-card honor-card">
        <img :src="h.imageUrl" alt="" />
        <p>{{ h.title }}</p>
      </div>
    </div>
    <p v-if="!list.length" class="empty">暂无案例</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../api';
const list = ref([]);
onMounted(async () => { list.value = await api.get('/site/honors'); });
</script>

<style scoped>
.honor-card { cursor: default; }
.honor-card img { object-fit: cover; border-radius: 8px; }
.empty { text-align: center; color: #999; padding: 40px 0; }
</style>
