<template>
  <div class="home-page">
    <section class="home-hero">
      <h1>{{ siteName }} · 工业产品数字化选型中心</h1>
      <p>参数对比 | 型号筛选 | 图纸下载 | 快速询价</p>
      <div class="hero-search">
        <input
          v-model="keyword"
          placeholder="输入型号、参数或应用场景"
          @keyup.enter="doSearch"
        />
        <button @click="doSearch">搜索产品</button>
      </div>
    </section>

    <section v-if="searched" class="home-module home-search-results">
      <h3 class="search-results-title">
        搜索结果
        <span v-if="keyword.trim()">「{{ keyword.trim() }}」</span>
      </h3>
      <p v-if="searchLoading" class="search-status">搜索中...</p>
      <div v-else-if="searchResults.length" class="grid">
        <ProductCard v-for="p in searchResults" :key="p.id" :product="p" />
      </div>
      <p v-else class="search-empty">未找到相关产品</p>
    </section>

    <section
      v-for="mod in displayModules"
      :key="mod.key"
      v-show="!searched || !keyword.trim()"
      :class="['home-module', {
        'home-module-compact': mod.type === 'product_catalog',
        'home-module-flat': mod.type === 'application_areas',
      }]"
    >
      <component
        :is="moduleMap[mod.type]"
        v-if="moduleMap[mod.type]"
        :config="mod.config || {}"
      />
    </section>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, watch } from 'vue';
import api from '../api';
import ProductCard from '../components/ProductCard.vue';
import ModBanner from '../components/modules/ModBanner.vue';
import ModProductCatalog from '../components/modules/ModProductCatalog.vue';
import ModApplicationAreas from '../components/modules/ModApplicationAreas.vue';
import ModAbout from '../components/modules/ModAbout.vue';
import ModNews from '../components/modules/ModNews.vue';

const siteConfig = inject('siteConfig', ref({}));
const siteName = computed(() => siteConfig.value?.name || '企业官网');

const modules = ref([]);
const keyword = ref('');
const searched = ref(false);
const searchLoading = ref(false);
const searchResults = ref([]);

const moduleMap = {
  banner: ModBanner,
  product_catalog: ModProductCatalog,
  application_areas: ModApplicationAreas,
  about: ModAbout,
  news: ModNews,
};

const enabledModules = computed(() =>
  [...modules.value]
    .filter((m) => m.enabled !== false)
    .sort((a, b) => (a.sort || 0) - (b.sort || 0)),
);

const displayModules = computed(() => {
  const list = enabledModules.value;
  const hasCatalog = list.some((m) => m.type === 'product_catalog');
  const result = [];
  let i = 0;
  while (i < list.length) {
    const mod = list[i];
    const next = list[i + 1];
    const isCategory = mod.type === 'category';
    const isHot = mod.type === 'hot_products';

    // 已有 product_catalog 时，跳过旧版分类/热门模块，避免重复展示
    if (hasCatalog && (isCategory || isHot)) {
      i += 1;
      continue;
    }

    const nextIsCategory = next?.type === 'category';
    const nextIsHot = next?.type === 'hot_products';

    if ((isCategory && nextIsHot) || (isHot && nextIsCategory)) {
      const hotConfig = isHot ? mod.config : next.config;
      result.push({
        key: `catalog-${mod.sort}`,
        type: 'product_catalog',
        config: hotConfig || { limit: 8 },
      });
      i += 2;
    } else if (isCategory || isHot) {
      result.push({
        key: `catalog-${mod.sort}`,
        type: 'product_catalog',
        config: mod.config || { limit: 8 },
      });
      i += 1;
    } else if (mod.type === 'contact_bar') {
      i += 1;
    } else {
      result.push({
        key: `${mod.type}-${mod.sort}`,
        type: mod.type,
        config: mod.config,
      });
      i += 1;
    }
  }
  return result;
});

async function doSearch() {
  const q = keyword.value.trim();
  if (!q) {
    searched.value = false;
    searchResults.value = [];
    return;
  }
  searched.value = true;
  searchLoading.value = true;
  try {
    const data = await api.get('/site/products', {
      params: { keyword: q, pageSize: 50 },
    });
    searchResults.value = data.list || [];
  } finally {
    searchLoading.value = false;
  }
}

watch(keyword, (val) => {
  if (!val.trim()) {
    searched.value = false;
    searchResults.value = [];
  }
});

onMounted(async () => {
  const data = await api.get('/site/home/layout');
  modules.value = data.modules || [];
});
</script>

<style scoped>
.home-module-compact { padding-top: 4px; }
.home-module-flat {
  background: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  backdrop-filter: none !important;
}
.home-search-results {
  margin-bottom: 24px;
}
.search-results-title {
  margin: 0 0 20px;
  font-size: 20px;
  font-weight: 600;
  color: #222;
}
.search-results-title span {
  color: #1a6dff;
  font-weight: 500;
}
.search-status,
.search-empty {
  text-align: center;
  color: #999;
  padding: 32px 0;
  margin: 0;
}
</style>
