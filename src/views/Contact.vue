<template>
  <div class="page-panel">
    <h2>联系我们</h2>

    <section class="merchant-contact">
      <div class="section-head">
        <h3>商户联系方式</h3>
        <p>以下为 {{ config.name || '本商户' }} 的官方联系渠道，客户可直接通过以下方式联系我们</p>
      </div>
      <div v-if="hasMerchantContact" class="contact-cards">
        <div v-if="config.phone" class="contact-card">
          <span class="card-label">客服电话</span>
          <a :href="'tel:' + config.phone" class="card-value">{{ config.phone }}</a>
        </div>
        <div v-if="config.qq" class="contact-card">
          <span class="card-label">客服 QQ</span>
          <a :href="qqLink" target="_blank" rel="noopener" class="card-value">{{ config.qq }}</a>
        </div>
        <div v-if="config.wechat" class="contact-card">
          <span class="card-label">客服微信</span>
          <span class="card-value">{{ config.wechat }}</span>
        </div>
        <div v-if="config.address" class="contact-card contact-card-wide">
          <span class="card-label">公司地址</span>
          <span class="card-value">{{ config.address }}</span>
        </div>
      </div>
      <p v-else class="empty-tip">暂未配置商户联系方式，请登录管理后台 →「联系信息」填写后保存。</p>
    </section>

    <section class="contact-form-wrap">
      <div class="inquiry-header">
        <span class="inquiry-header-badge">| 在线留言</span>
        <span class="inquiry-header-line"></span>
      </div>
      <p class="form-tip">请填写<strong>您的</strong>联系方式，我们会尽快回复（与上方商户联系方式不同）</p>
      <form class="contact-form" @submit.prevent="submit">
        <div class="form-row">
          <label class="form-label"><span class="req">*</span> 您的姓名：</label>
          <input v-model="form.contactName" placeholder="您的姓名" />
        </div>
        <div class="form-row">
          <label class="form-label"><span class="req">*</span> 您的电话：</label>
          <input v-model="form.contactPhone" placeholder="方便我们回电联系" />
        </div>
        <div class="form-row">
          <label class="form-label">您的 QQ：</label>
          <input v-model="form.contactQq" placeholder="选填" />
        </div>
        <div class="form-row">
          <label class="form-label">您的微信：</label>
          <input v-model="form.contactWechat" placeholder="选填" />
        </div>
        <div class="form-row">
          <label class="form-label">留言内容：</label>
          <textarea v-model="form.remark" rows="4" placeholder="请输入留言内容"></textarea>
        </div>
        <div class="form-submit">
          <button type="submit" class="btn" :disabled="submitting">
            {{ submitting ? '提交中...' : '提交留言' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import api from '../api';
import { toastSuccess, toastWarning, toastError } from '../utils/toast';

const config = ref({});
const submitting = ref(false);
const form = ref({
  contactName: '',
  contactPhone: '',
  contactQq: '',
  contactWechat: '',
  remark: '',
});

const qqLink = computed(() =>
  config.value.qq
    ? `https://wpa.qq.com/msgrd?v=3&uin=${config.value.qq}&site=qq&menu=yes`
    : '#',
);

const hasMerchantContact = computed(
  () => config.value.phone || config.value.qq || config.value.wechat || config.value.address,
);

onMounted(async () => {
  config.value = await api.get('/site/config');
});

async function submit() {
  if (!form.value.contactName.trim()) {
    toastWarning('请填写您的姓名');
    return;
  }
  if (!form.value.contactPhone.trim()) {
    toastWarning('请填写您的电话');
    return;
  }
  submitting.value = true;
  try {
    await api.post('/site/leads/contact', form.value);
    toastSuccess('留言已提交，我们将尽快联系您');
    form.value = {
      contactName: '',
      contactPhone: '',
      contactQq: '',
      contactWechat: '',
      remark: '',
    };
  } catch (e) {
    toastError(e.message || '提交失败，请稍后重试');
  } finally {
    submitting.value = false;
  }
}
</script>

<style scoped>
.merchant-contact {
  margin-bottom: 28px;
  padding: 20px 24px;
  background: #f8fafc;
  border: 1px solid #e8eef5;
  border-radius: 8px;
}
.section-head h3 {
  margin: 0 0 8px;
  font-size: 18px;
  color: #222;
}
.section-head p {
  margin: 0 0 16px;
  font-size: 13px;
  color: #666;
  line-height: 1.6;
}
.contact-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}
.contact-card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 6px;
  padding: 14px 16px;
}
.contact-card-wide { grid-column: 1 / -1; }
.card-label {
  display: block;
  font-size: 12px;
  color: #888;
  margin-bottom: 6px;
}
.card-value {
  font-size: 15px;
  font-weight: 600;
  color: #1a6dff;
  word-break: break-all;
}
a.card-value:hover { text-decoration: underline; }
.empty-tip {
  margin: 0;
  font-size: 13px;
  color: #999;
}
.form-tip {
  margin: 0;
  padding: 12px 24px;
  font-size: 13px;
  color: #666;
  background: #fafafa;
  border-bottom: 1px solid #f0f0f0;
}
.contact-form-wrap {
  background: #fff;
  border: 1px solid #e8e8e8;
}
.inquiry-header {
  display: flex;
  align-items: center;
}
.inquiry-header-badge {
  background: #e65c00;
  color: #fff;
  padding: 10px 20px;
  font-size: 15px;
  font-weight: 600;
}
.inquiry-header-line {
  flex: 1;
  height: 1px;
  background: #ddd;
}
.form-row {
  display: flex;
  align-items: flex-start;
  padding: 14px 24px;
  border-bottom: 1px solid #f0f0f0;
  gap: 16px;
}
.form-label {
  width: 100px;
  flex-shrink: 0;
  text-align: right;
  padding-top: 8px;
  font-size: 14px;
  color: #333;
}
.form-label .req { color: #c8161d; margin-right: 2px; }
.form-row input,
.form-row textarea {
  flex: 1;
  min-width: 0;
  border: 1px solid #ccc;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 4px;
  font-family: inherit;
}
.form-row textarea { resize: vertical; min-height: 90px; }
.form-submit {
  text-align: right;
  padding: 16px 24px 20px;
}
.btn {
  background: linear-gradient(135deg, #1a6dff, #0052d9);
  color: #fff;
  border: none;
  padding: 10px 28px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
.btn:disabled { opacity: 0.6; cursor: not-allowed; }
@media (max-width: 600px) {
  .contact-cards { grid-template-columns: 1fr; }
  .form-row { flex-direction: column; padding: 12px 16px; }
  .form-label { width: 100%; text-align: left; padding: 0 0 6px; }
}
</style>
