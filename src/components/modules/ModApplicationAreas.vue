<template>
  <section class="app-section">
    <div class="app-header">
      <span class="app-label">{{ config.label || 'APPLICATIONS' }}</span>
      <h2 class="app-title">{{ config.title || '应用领域' }}</h2>
      <p class="app-subtitle">
        {{ config.subtitle || '产品覆盖六大核心行业，为不同工况提供专业的过滤解决方案' }}
      </p>
    </div>
    <div class="app-grid">
      <article v-for="item in visibleItems" :key="item.id" class="app-card">
        <div class="app-card-cover">
          <img :src="item.image" :alt="item.name" class="app-card-img" />
          <div class="app-card-mask"></div>
          <div class="app-card-badge">
            <span class="app-icon-wrap">
              <svg viewBox="0 0 24 24" class="app-icon">
                <path fill="currentColor" :d="getAreaIcon(item.id)" />
              </svg>
            </span>
            <h3>{{ item.name }}</h3>
          </div>
        </div>
        <p class="app-card-desc">{{ item.desc }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue';
import { DEFAULT_APPLICATION_AREAS, getAreaIcon } from '../../constants/applicationAreas';

const props = defineProps({ config: { type: Object, default: () => ({}) } });

const visibleItems = computed(() => {
  const defaults = DEFAULT_APPLICATION_AREAS;
  const items = props.config.items?.length ? props.config.items : defaults;
  return items
    .filter((i) => i.enabled !== false)
    .map((item) => {
      const def = defaults.find((d) => d.id === item.id);
      return { ...def, ...item, image: item.image || def?.image || '' };
    })
    .filter((i) => i.image);
});
</script>

<style scoped>
.app-section { padding: 8px 0 16px; }
.app-header { text-align: center; margin-bottom: 48px; }
.app-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #4a90d9;
}
.app-title {
  margin: 12px 0 16px;
  font-size: 32px;
  font-weight: 700;
  color: #1e293b;
}
.app-subtitle {
  margin: 0 auto;
  max-width: 640px;
  font-size: 15px;
  line-height: 1.7;
  color: #64748b;
}
.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, 350px);
  justify-content: center;
  gap: 24px;
}
@media (max-width: 400px) {
  .app-grid { grid-template-columns: 1fr; }
}
.app-card {
  width: 350px;
  height: 350px;
  display: flex;
  flex-direction: column;
  border: 1px solid #f1f5f9;
  border-radius: 12px;
  overflow: hidden;
  background: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
}
@media (max-width: 400px) {
  .app-card {
    width: 100%;
    height: auto;
    aspect-ratio: 1;
    max-width: 350px;
    margin: 0 auto;
  }
}
.app-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(15, 23, 42, 0.12);
}
.app-card-cover {
  position: relative;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}
.app-card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.app-card:hover .app-card-img { transform: scale(1.05); }
.app-card-mask {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(30, 41, 59, 0.65), transparent 55%);
}
.app-card-badge {
  position: absolute;
  left: 16px;
  bottom: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.app-icon-wrap {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.app-icon { width: 16px; height: 16px; color: #4a90d9; }
.app-card-badge h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 700;
  color: #fff;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.app-card-desc {
  margin: 0;
  padding: 12px 14px;
  font-size: 13px;
  line-height: 1.6;
  color: #64748b;
  background: #fff;
  flex-shrink: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
