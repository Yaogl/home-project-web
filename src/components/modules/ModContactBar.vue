<template>
  <section class="contact-section">
    <div class="contact-inner">
      <div class="contact-header">
        <span class="contact-label">{{ config.label || 'CONTACT' }}</span>
        <h2>{{ config.title || '联系我们' }}</h2>
        <p>{{ config.subtitle || '欢迎咨询滤芯选型与定制需求，我们的技术团队将为您提供专业支持' }}</p>
      </div>

      <div class="contact-grid">
        <div v-if="showPhone" class="contact-card">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
          </div>
          <div>
            <div class="contact-field-label">服务热线</div>
            <a :href="'tel:' + site.phone" class="contact-field-value">{{ site.phone || '400-888-6500' }}</a>
          </div>
        </div>

        <div v-if="showEmail" class="contact-card">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/></svg>
          </div>
          <div>
            <div class="contact-field-label">商务邮箱</div>
            <a :href="'mailto:' + email" class="contact-field-value">{{ email || 'sales@example.com' }}</a>
          </div>
        </div>

        <div v-if="showAddress" class="contact-card">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
          </div>
          <div>
            <div class="contact-field-label">公司地址</div>
            <div class="contact-field-value">{{ site.address || '请在管理后台配置地址' }}</div>
          </div>
        </div>

        <div v-if="site.qq" class="contact-card">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <div>
            <div class="contact-field-label">客服 QQ</div>
            <a :href="qqLink" target="_blank" rel="noopener" class="contact-field-value">{{ site.qq }}</a>
          </div>
        </div>

        <div v-if="site.wechat" class="contact-card">
          <div class="contact-icon">
            <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          </div>
          <div>
            <div class="contact-field-label">客服微信</div>
            <div class="contact-field-value">{{ site.wechat }}</div>
          </div>
        </div>
      </div>

      <div class="contact-footer">
        <div class="contact-brand">
          <span class="brand-mark">{{ (site.name || '企')[0] }}</span>
          <span class="brand-text">{{ site.name || '企业官网' }}</span>
        </div>
        <div class="contact-links">
          <router-link to="/products">产品中心</router-link>
          <router-link to="/about">关于我们</router-link>
          <router-link to="/contact">在线留言</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, inject, ref } from 'vue';

const props = defineProps({ config: { type: Object, default: () => ({}) } });
const siteConfig = inject('siteConfig', ref({}));

const site = computed(() => siteConfig.value || {});
const showPhone = computed(() => props.config.showPhone !== false);
const showEmail = computed(() => props.config.showEmail !== false);
const showAddress = computed(() => props.config.showAddress !== false);
const email = computed(() => props.config.email || 'sales@example.com');
const qqLink = computed(() =>
  site.value.qq
    ? `https://wpa.qq.com/msgrd?v=3&uin=${site.value.qq}&site=qq&menu=yes`
    : '#',
);
</script>

<style scoped>
.contact-section {
  width: 100%;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  color: #e2e8f0;
}
.contact-inner {
  width: 80%;
  max-width: none;
  margin: 0 auto;
  padding: 64px 16px 48px;
}
@media (max-width: 768px) {
  .contact-inner { width: 94%; }
}
.contact-header { text-align: center; margin-bottom: 48px; }
.contact-label {
  display: block;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #4a90d9;
}
.contact-header h2 {
  margin: 12px 0 16px;
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}
.contact-header p {
  margin: 0 auto;
  max-width: 640px;
  font-size: 15px;
  line-height: 1.7;
  color: #94a3b8;
}
.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 24px;
  margin-bottom: 48px;
}
@media (max-width: 768px) { .contact-grid { grid-template-columns: 1fr; } }
.contact-card {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 24px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: background 0.2s;
}
.contact-card:hover { background: rgba(255, 255, 255, 0.08); }
.contact-icon {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background: rgba(74, 144, 217, 0.2);
  color: #4a90d9;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.contact-icon svg { width: 20px; height: 20px; }
.contact-field-label {
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 4px;
}
.contact-field-value {
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  line-height: 1.5;
}
a.contact-field-value:hover { color: #60a5fa; }
.contact-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  flex-wrap: wrap;
}
.contact-brand { display: flex; align-items: center; gap: 10px; }
.brand-mark {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: #4a90d9;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.brand-text { font-size: 14px; font-weight: 700; color: #fff; }
.contact-links { display: flex; gap: 24px; flex-wrap: wrap; }
.contact-links a {
  font-size: 12px;
  color: #94a3b8;
  transition: color 0.2s;
}
.contact-links a:hover { color: #fff; }
</style>
