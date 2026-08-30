<template>
  <div class="news-brief">
    <h3 class="module-title">{{ config.title || '新闻资讯' }}</h3>
    <ul class="news-list">
      <li v-for="a in list" :key="a.id">
        <router-link :to="'/news/' + a.id">{{ a.title }}</router-link>
        <span v-if="a.publishedAt" class="date">{{ formatDate(a.publishedAt) }}</span>
      </li>
    </ul>
    <p v-if="!list.length" class="empty">暂无新闻</p>
    <router-link to="/news" class="more-link">查看更多 →</router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../../api';

const props = defineProps({ config: { type: Object, default: () => ({}) } });
const list = ref([]);

function formatDate(d) {
  return new Date(d).toLocaleDateString('zh-CN');
}

onMounted(async () => {
  const all = await api.get('/site/articles');
  const ids = props.config.articleIds || [];
  if (ids.length) {
    const map = Object.fromEntries(all.map((a) => [a.id, a]));
    list.value = ids.map((id) => map[id]).filter(Boolean);
  } else {
    const limit = props.config.limit || 5;
    list.value = all.slice(0, limit);
  }
});
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
.news-list { list-style: none; padding: 0; margin: 0; }
.news-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px dashed #e8e8e8;
}
.news-list a { color: #333; flex: 1; }
.news-list a:hover { color: #1a6dff; }
.date { color: #999; font-size: 13px; margin-left: 16px; white-space: nowrap; }
.empty { color: #999; text-align: center; padding: 20px 0; }
.more-link { display: inline-block; margin-top: 16px; color: #1a6dff; font-size: 14px; }
.more-link:hover { text-decoration: underline; }
</style>
