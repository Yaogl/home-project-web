<template>
  <div class="page-panel">
    <h2>新闻资讯</h2>
    <ul class="list">
      <li v-for="a in list" :key="a.id">
        <router-link :to="'/news/' + a.id">{{ a.title }}</router-link>
        <span v-if="a.publishedAt" class="date">{{ formatDate(a.publishedAt) }}</span>
      </li>
    </ul>
    <p v-if="!list.length" class="empty">暂无新闻</p>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../api';
const list = ref([]);
onMounted(async () => { list.value = await api.get('/site/articles'); });

function formatDate(d) {
  return new Date(d).toLocaleDateString('zh-CN');
}
</script>

<style scoped>
.list { list-style: none; padding: 0; margin: 0; }
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 0;
  border-bottom: 1px dashed #e8e8e8;
}
li a { color: #333; flex: 1; }
li a:hover { color: #1a6dff; }
.date { color: #999; font-size: 13px; margin-left: 16px; }
.empty { text-align: center; color: #999; padding: 40px 0; }
</style>
