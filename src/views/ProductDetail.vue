<template>
  <div v-if="product" class="product-detail">
    <div class="detail-main">
      <div class="gallery-section">
        <div class="gallery-inner">
          <div v-if="product.images?.length > 1" class="thumbs-side">
            <img
              v-for="(img, i) in product.images"
              :key="img.id"
              :src="img.url"
              :class="{ active: i === currentIndex }"
              @click="currentIndex = i"
            />
          </div>
          <div class="main-view">
            <button v-if="product.images?.length > 1" type="button" class="nav prev" @click="prevImage">‹</button>
            <img :src="currentImage" :alt="product.title" class="main-img" />
            <button v-if="product.images?.length > 1" type="button" class="nav next" @click="nextImage">›</button>
          </div>
        </div>
      </div>

      <div class="info-section">
        <span class="product-tag">在售产品</span>
        <h1 class="product-title">{{ product.title }}</h1>
        <p v-if="product.summary" class="product-summary">{{ product.summary }}</p>

        <div v-if="models.length" class="model-block">
          <div class="model-label">规格</div>
          <div class="model-grid">
            <button
              v-for="(m, i) in models"
              :key="i"
              type="button"
              :class="['model-btn', { active: selectedModelIndex === i }]"
              @click="selectedModelIndex = i"
            >
              <span class="model-name">{{ m.name }}</span>
              <span class="model-meta">{{ m.spec }} · {{ m.price }}</span>
            </button>
          </div>
        </div>

        <div v-if="selectedModel" class="price-row">
          <span class="price-label">参考报价</span>
          <span class="price-value">{{ selectedModel.price || '联系询价' }}</span>
        </div>

        <div class="qty-row">
          <span class="qty-label">数量</span>
          <div class="qty-ctrl">
            <button type="button" @click="changeQty(-1)">−</button>
            <input v-model.number="quantity" type="number" min="1" />
            <button type="button" @click="changeQty(1)">+</button>
          </div>
        </div>

        <div class="action-row">
          <button type="button" class="btn-cart" @click="addCart">加入询价篮</button>
          <button type="button" class="btn-inquiry" @click="scrollToInquiry">立即询价</button>
        </div>
      </div>
    </div>

    <div v-if="product.content" class="content" v-html="product.content"></div>
    <ProductInquiryForm ref="inquiryRef" :product="product" :selected-model="selectedModel" />
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
import { addToInquiry } from '../inquiry';
import ProductInquiryForm from '../components/ProductInquiryForm.vue';
import { toastSuccess } from '../utils/toast';

const route = useRoute();
const refreshInquiryCount = inject('refreshInquiryCount');
const product = ref(null);
const currentIndex = ref(0);
const selectedModelIndex = ref(0);
const quantity = ref(1);
const inquiryRef = ref(null);

const models = computed(() => product.value?.specs || []);
const selectedModel = computed(() => models.value[selectedModelIndex.value] || null);
const currentImage = computed(
  () => product.value?.images?.[currentIndex.value]?.url || '',
);

watch(product, () => {
  selectedModelIndex.value = 0;
  quantity.value = 1;
  currentIndex.value = 0;
});

function prevImage() {
  const len = product.value?.images?.length || 0;
  if (!len) return;
  currentIndex.value = (currentIndex.value - 1 + len) % len;
}

function nextImage() {
  const len = product.value?.images?.length || 0;
  if (!len) return;
  currentIndex.value = (currentIndex.value + 1) % len;
}

function changeQty(delta) {
  quantity.value = Math.max(1, (quantity.value || 1) + delta);
}

function modelRemark() {
  if (!selectedModel.value) return '';
  const m = selectedModel.value;
  return `${m.name} ${m.spec} ${m.price}`.trim();
}

function addCart() {
  addToInquiry(product.value, {
    quantity: quantity.value,
    itemRemark: modelRemark(),
  });
  refreshInquiryCount();
  toastSuccess('已加入询价篮');
}

function scrollToInquiry() {
  inquiryRef.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

onMounted(async () => {
  product.value = await api.get('/site/products/' + route.params.id);
});
</script>

<style scoped>
.product-detail { padding-bottom: 24px; }
.detail-main {
  display: flex;
  gap: 32px;
  background: #fff;
  padding: 24px;
  border: 1px solid #eee;
}
.gallery-section { flex: 0 0 420px; max-width: 420px; }
.gallery-inner { display: flex; gap: 12px; }
.thumbs-side {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex-shrink: 0;
}
.thumbs-side img {
  width: 56px;
  height: 56px;
  object-fit: cover;
  border: 2px solid #e8e8e8;
  border-radius: 4px;
  cursor: pointer;
}
.thumbs-side img.active { border-color: #1a6dff; }
.main-view {
  position: relative;
  flex: 1;
  height: 420px;
  background: linear-gradient(180deg, #f0f4f8 0%, #e8edf2 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.main-img { max-width: 90%; max-height: 90%; object-fit: contain; }
.nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  z-index: 2;
}
.nav.prev { left: 10px; }
.nav.next { right: 10px; }
.info-section { flex: 1; min-width: 0; }
.product-tag {
  display: inline-block;
  padding: 2px 10px;
  background: #e8f0fe;
  color: #1a6dff;
  font-size: 12px;
  border-radius: 2px;
  margin-bottom: 10px;
}
.product-title {
  margin: 0 0 12px;
  font-size: 22px;
  font-weight: 700;
  color: #222;
  line-height: 1.4;
}
.product-summary {
  margin: 0 0 20px;
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}
.model-block { margin-bottom: 20px; }
.model-label {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
}
.model-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}
.model-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.model-btn:hover { border-color: #1a6dff; }
.model-btn.active {
  border-color: #1a6dff;
  box-shadow: 0 0 0 1px #1a6dff;
}
.model-name {
  font-size: 13px;
  font-weight: 600;
  color: #222;
  word-break: break-all;
}
.model-meta {
  font-size: 12px;
  color: #888;
}
.price-row {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 12px 0;
  border-top: 1px solid #f0f0f0;
  margin-bottom: 16px;
}
.price-label { font-size: 14px; color: #666; }
.price-value { font-size: 20px; font-weight: 700; color: #c8161d; }
.qty-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}
.qty-label { font-size: 14px; color: #333; }
.qty-ctrl {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}
.qty-ctrl button {
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  cursor: pointer;
  font-size: 16px;
}
.qty-ctrl input {
  width: 48px;
  height: 32px;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
  outline: none;
}
.action-row { display: flex; gap: 12px; }
.btn-cart,
.btn-inquiry {
  flex: 1;
  max-width: 180px;
  padding: 12px 0;
  border: none;
  border-radius: 4px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
}
.btn-cart { background: #1a3a5c; }
.btn-inquiry { background: #7cb342; }
.content {
  margin-top: 24px;
  background: #fff;
  padding: 20px 24px;
  border: 1px solid #eee;
}
@media (max-width: 900px) {
  .detail-main { flex-direction: column; }
  .gallery-section { flex: none; max-width: 100%; width: 100%; }
  .main-view { height: 300px; }
  .model-grid { grid-template-columns: 1fr; }
  .action-row { flex-direction: column; }
  .btn-cart, .btn-inquiry { max-width: 100%; }
}
</style>
