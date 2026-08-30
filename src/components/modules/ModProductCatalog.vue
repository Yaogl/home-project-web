<template>
  <div class="product-catalog">
    <CategoryTabs v-model="activeCategoryId" :tabs="tabList" />
    <div class="grid">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>
    <p v-if="!loading && !products.length" class="empty">该分类暂无产品</p>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import api from '../../api';
import CategoryTabs from '../CategoryTabs.vue';
import ProductCard from '../ProductCard.vue';

const props = defineProps({ config: { type: Object, default: () => ({}) } });

const categories = ref([]);
const products = ref([]);
const activeCategoryId = ref('');
const loading = ref(false);
const tabList = computed(() => [
  { label: '全部产品', value: '' },
  ...categories.value.map((c) => ({ label: c.name, value: c.id })),
]);

async function loadCategories() {
  categories.value = await api.get('/site/categories');
}

async function loadProducts() {
  loading.value = true;
  try {
    // 全部分类展示全部商品；选中分类时展示该分类下全部商品（避免与「全部」数量看起来一样）
    const params = { pageSize: 50 };
    if (activeCategoryId.value) params.categoryId = activeCategoryId.value;
    const data = await api.get('/site/products', { params });
    products.value = data.list || [];
  } finally {
    loading.value = false;
  }
}

watch(activeCategoryId, loadProducts);

onMounted(async () => {
  await loadCategories();
  await loadProducts();
});
</script>

<style scoped>
.empty { text-align: center; color: #999; padding: 32px 0; }
</style>
