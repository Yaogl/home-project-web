<template>
  <div class="site-page">
    <header class="site-header">
      <div class="container header-inner">
        <router-link to="/" class="brand">
          <img v-if="config.logoUrl" :src="config.logoUrl" class="brand-logo" alt="" />
          <span class="brand-name">{{ config.name || '企业官网' }}</span>
        </router-link>
        <nav class="nav">
          <router-link to="/">首页</router-link>
          <router-link to="/products">产品中心</router-link>
          <router-link to="/about">关于我们</router-link>
          <router-link to="/news">新闻资讯</router-link>
          <router-link to="/honors">案例荣誉</router-link>
          <router-link to="/contact">联系我们</router-link>
          <router-link to="/inquiry" class="nav-inquiry">询价篮 ({{ inquiryCount }})</router-link>
        </nav>
        <router-link to="/inquiry" class="btn-quote">立即报价</router-link>
      </div>
    </header>

    <main class="site-main" :style="mainStyle">
      <div class="container site-content">
        <router-view />
      </div>
    </main>

    <ModContactBar
      v-if="homeContactModule"
      :config="homeContactModule.config || {}"
    />

    <div v-if="config.showFloatBar" class="float-bar">
      <a v-if="config.qq" :href="qqLink" target="_blank" rel="noopener">QQ咨询</a>
      <a v-if="config.phone" :href="'tel:' + config.phone">电话咨询</a>
      <span v-if="config.wechat" class="float-wechat" :title="'微信：' + config.wechat">微信：{{ config.wechat }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, provide, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import { getInquiryItems } from '../inquiry';
import { resolvePageStyle, routeToPageKey } from '../utils/pageStyle';
import ModContactBar from '../components/modules/ModContactBar.vue';

const route = useRoute();
const config = ref({});
const pageStyles = ref({});
const homeModules = ref([]);
const inquiryCount = ref(0);

const mainStyle = computed(() =>
  resolvePageStyle(pageStyles.value, routeToPageKey(route.path)),
);

const homeContactModule = computed(() => {
  if (route.path !== '/') return null;
  const mod = homeModules.value.find(
    (m) => m.type === 'contact_bar' && m.enabled !== false,
  );
  return mod || null;
});

const qqLink = computed(() =>
  config.value.qq
    ? `https://wpa.qq.com/msgrd?v=3&uin=${config.value.qq}&site=qq&menu=yes`
    : '#',
);

function refreshInquiryCount() {
  inquiryCount.value = getInquiryItems().reduce((s, i) => s + i.quantity, 0);
}

async function loadHomeLayout() {
  if (route.path !== '/') {
    homeModules.value = [];
    return;
  }
  const data = await api.get('/site/home/layout');
  homeModules.value = data.modules || [];
}

provide('siteConfig', config);
provide('refreshInquiryCount', refreshInquiryCount);

onMounted(async () => {
  config.value = await api.get('/site/config');
  pageStyles.value = await api.get('/site/page-styles');
  refreshInquiryCount();
  window.addEventListener('storage', refreshInquiryCount);
  await loadHomeLayout();
});

watch(() => route.path, loadHomeLayout);
</script>
