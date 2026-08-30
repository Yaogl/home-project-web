<template>
  <div class="page-panel">
    <h2>产品中心</h2>
    <CategoryTabs v-model="categoryId" :tabs="tabList" />
    <div class="grid">
      <ProductCard v-for="p in list" :key="p.id" :product="p" />
    </div>
    <p v-if="!list.length" class="empty">暂无产品</p>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../api';
import CategoryTabs from '../components/CategoryTabs.vue';
import ProductCard from '../components/ProductCard.vue';

const route = useRoute();
const router = useRouter();
const categories = ref([]);
const list = ref([]);
const categoryId = ref('');
const tabList = computed(() => [
  { label: '全部', value: '' },
  ...categories.value.map((c) => ({ label: c.name, value: c.id })),
]);

async function load() {
  categories.value = await api.get('/site/categories');
  const params = { pageSize: 30 };
  if (categoryId.value) params.categoryId = categoryId.value;
  if (route.query.keyword) params.keyword = route.query.keyword;
  const data = await api.get('/site/products', { params });
  list.value = data.list || [];
}

watch(categoryId, (id) => {
  router.replace({ query: { ...route.query, categoryId: id || undefined } });
});

watch(
  () => [route.query.categoryId, route.query.keyword],
  ([v]) => {
    categoryId.value = v || '';
    load();
  },
  { immediate: true },
);
</script>

<style scoped>
.empty { text-align: center; color: #999; padding: 40px 0; }
</style>
