<template>
  <div class="inquiry-module">
    <div class="inquiry-header">
      <span class="inquiry-header-badge">| 在线询盘</span>
      <span class="inquiry-header-line"></span>
    </div>
    <form class="inquiry-form" @submit.prevent="submit">
      <div class="inquiry-row">
        <label class="inquiry-label"><span class="req">*</span> 产品标题：</label>
        <div class="inquiry-field">
          <input :value="displayTitle" readonly />
        </div>
      </div>
      <div class="inquiry-row">
        <label class="inquiry-label">您的单位：</label>
        <div class="inquiry-field">
          <input v-model="form.companyName" placeholder="您的单位" />
        </div>
      </div>
      <div class="inquiry-row">
        <label class="inquiry-label"><span class="req">*</span> 您的姓名：</label>
        <div class="inquiry-field">
          <input v-model="form.contactName" placeholder="您的姓名" />
        </div>
      </div>
      <div class="inquiry-row">
        <label class="inquiry-label"><span class="req">*</span> 联系电话：</label>
        <div class="inquiry-field">
          <input v-model="form.contactPhone" placeholder="联系电话" />
        </div>
      </div>
      <div class="inquiry-row">
        <label class="inquiry-label">QQ号码：</label>
        <div class="inquiry-field">
          <input v-model="form.contactQq" placeholder="您的QQ号码" />
        </div>
      </div>
      <div class="inquiry-row">
        <label class="inquiry-label">微信账号：</label>
        <div class="inquiry-field">
          <input v-model="form.contactWechat" placeholder="您的微信账号" />
        </div>
      </div>
      <div class="inquiry-row">
        <label class="inquiry-label">补充说明：</label>
        <div class="inquiry-field">
          <textarea v-model="form.remark" rows="4" placeholder="补充说明"></textarea>
        </div>
      </div>
      <div class="inquiry-submit">
        <button type="submit" :disabled="submitting">{{ submitting ? '提交中...' : '提交询价' }}</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import api from '../api';
import { toastSuccess, toastWarning, toastError } from '../utils/toast';

const props = defineProps({
  product: { type: Object, required: true },
  selectedModel: { type: Object, default: null },
});

const displayTitle = computed(() => {
  if (!props.selectedModel) return props.product.title;
  const m = props.selectedModel;
  return `${props.product.title}（${m.name} ${m.spec}）`;
});

const form = ref({
  contactName: '',
  contactPhone: '',
  companyName: '',
  contactQq: '',
  contactWechat: '',
  remark: '',
});
const submitting = ref(false);

async function submit() {
  if (!form.value.contactName.trim()) {
    toastWarning('请填写您的姓名');
    return;
  }
  if (!form.value.contactPhone.trim()) {
    toastWarning('请填写联系电话');
    return;
  }
  submitting.value = true;
  try {
    await api.post('/site/leads/inquiry', {
      ...form.value,
      items: [{
        productId: props.product.id,
        productTitle: displayTitle.value,
        quantity: 1,
        itemRemark: props.selectedModel
          ? `${props.selectedModel.name} ${props.selectedModel.spec} ${props.selectedModel.price}`.trim()
          : '',
      }],
    });
    toastSuccess('询价已提交，我们将尽快联系您');
    form.value = {
      contactName: '',
      contactPhone: '',
      companyName: '',
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
.inquiry-module {
  margin-top: 24px;
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
  white-space: nowrap;
}
.inquiry-header-line {
  flex: 1;
  height: 1px;
  background: #ddd;
}
.inquiry-row {
  display: flex;
  align-items: flex-start;
  padding: 14px 24px;
  border-bottom: 1px solid #f0f0f0;
}
.inquiry-row:last-of-type {
  border-bottom: none;
}
.inquiry-label {
  width: 110px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 16px;
  padding-top: 8px;
  font-size: 14px;
  color: #333;
}
.inquiry-label .req {
  color: #c8161d;
  margin-right: 2px;
}
.inquiry-field {
  flex: 1;
  min-width: 0;
}
.inquiry-field input,
.inquiry-field textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 8px 10px;
  font-size: 14px;
  outline: none;
  font-family: inherit;
}
.inquiry-field input:focus,
.inquiry-field textarea:focus {
  border-color: #1a6dff;
}
.inquiry-field input[readonly] {
  background: #f5f5f5;
  color: #666;
}
.inquiry-field textarea {
  resize: vertical;
  min-height: 90px;
}
.inquiry-submit {
  text-align: right;
  padding: 16px 24px 20px;
  border-top: 1px solid #f0f0f0;
}
.inquiry-submit button {
  background: #c8161d;
  color: #fff;
  border: none;
  padding: 10px 36px;
  font-size: 14px;
  cursor: pointer;
}
.inquiry-submit button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
@media (max-width: 600px) {
  .inquiry-row {
    flex-direction: column;
    padding: 12px 16px;
  }
  .inquiry-label {
    width: 100%;
    text-align: left;
    padding: 0 0 6px;
  }
}
</style>
