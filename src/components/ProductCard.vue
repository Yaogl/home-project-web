<template>
  <router-link :to="'/products/' + product.id" class="product-item">
    <div
      class="product-item-media"
      @mouseenter="pauseCarousel"
      @mouseleave="resumeCarousel"
    >
      <div v-if="images.length > 1" class="product-item-slider">
        <img
          v-for="(img, i) in images"
          :key="img.url + i"
          :src="img.url"
          :alt="product.title"
          :class="{ active: i === currentIndex }"
        />
      </div>
      <img
        v-else
        :src="images[0]?.url || placeholder"
        :alt="product.title"
        class="product-item-single"
      />
      <div class="product-item-overlay">
        <h4>{{ product.title }}</h4>
        <p>{{ product.summary || '暂无摘要' }}</p>
      </div>
    </div>
    <div class="product-item-title">{{ product.title }}</div>
  </router-link>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';

const props = defineProps({
  product: { type: Object, required: true },
});

const placeholder = 'https://via.placeholder.com/400x400?text=Product';
const currentIndex = ref(0);
let timer = null;
let paused = false;

const images = computed(() => props.product.images || []);

function nextSlide() {
  if (images.value.length <= 1) return;
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
}

function startCarousel() {
  stopCarousel();
  if (images.value.length <= 1) return;
  timer = setInterval(() => {
    if (!paused) nextSlide();
  }, 3000);
}

function stopCarousel() {
  if (timer) {
    clearInterval(timer);
    timer = null;
  }
}

function pauseCarousel() {
  paused = true;
}

function resumeCarousel() {
  paused = false;
}

watch(images, () => {
  currentIndex.value = 0;
  startCarousel();
});

onMounted(startCarousel);
onBeforeUnmount(stopCarousel);
</script>

<style scoped>
.product-item {
  display: block;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s, box-shadow 0.25s;
  text-decoration: none;
  color: inherit;
}

.product-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.product-item-media {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  background: #f5f7fa;
}

.product-item-single,
.product-item-slider img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-item-slider img {
  opacity: 0;
  transition: opacity 0.6s ease;
}

.product-item-slider img.active {
  opacity: 1;
}

.product-item-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.82) 0%, rgba(0, 0, 0, 0.45) 55%, transparent 100%);
  transform: translateY(100%);
  transition: transform 0.35s ease;
  pointer-events: none;
}

.product-item:hover .product-item-overlay {
  transform: translateY(0);
}

.product-item-overlay h4 {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.4;
}

.product-item-overlay p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  opacity: 0.92;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-item-title {
  padding: 12px 14px 14px;
  font-size: 14px;
  font-weight: 600;
  color: #222;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
