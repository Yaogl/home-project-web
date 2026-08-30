<template>
  <div class="page-panel inquiry-page">
    <div class="page-head">
      <h2>询价篮</h2>
      <span v-if="items.length" class="item-badge">共 {{ totalQty }} 件商品</span>
    </div>

    <div v-if="items.length" class="cart-section">
      <div class="cart-head">
        <span class="col-product">商品信息</span>
        <span class="col-qty">数量</span>
        <span class="col-action">操作</span>
      </div>
      <div v-for="(item, i) in items" :key="cartKey(item, i)" class="cart-row">
        <div class="col-product">
          <div class="product-title">{{ item.productTitle }}</div>
          <div v-if="item.itemRemark" class="product-spec">{{ item.itemRemark }}</div>
        </div>
        <div class="col-qty">
          <div class="qty-stepper">
            <button type="button" class="qty-btn" :disabled="item.quantity <= 1" @click="changeQty(item, -1)">−</button>
            <input
              type="number"
              class="qty-input"
              v-model.number="item.quantity"
              min="1"
              @change="onQtyChange(item)"
            />
            <button type="button" class="qty-btn" @click="changeQty(item, 1)">+</button>
          </div>
        </div>
        <div class="col-action">
          <button type="button" class="btn-remove" @click="remove(i)">删除</button>
        </div>
      </div>
    </div>

    <div v-else class="empty-cart">
      <div class="empty-icon">🛒</div>
      <p>询价篮还是空的</p>
      <router-link to="/products" class="btn-go">去产品中心看看</router-link>
    </div>

    <section v-if="items.length" class="inquiry-module">
      <div class="inquiry-header">
        <span class="inquiry-header-badge">| 提交询价</span>
        <span class="inquiry-header-line"></span>
      </div>
      <form class="inquiry-form" @submit.prevent="submit">
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
          <label class="inquiry-label">您的单位：</label>
          <div class="inquiry-field">
            <input v-model="form.companyName" placeholder="选填" />
          </div>
        </div>
        <div class="inquiry-row">
          <label class="inquiry-label">QQ 号码：</label>
          <div class="inquiry-field">
            <input v-model="form.contactQq" placeholder="选填" />
          </div>
        </div>
        <div class="inquiry-row">
          <label class="inquiry-label">微信账号：</label>
          <div class="inquiry-field">
            <input v-model="form.contactWechat" placeholder="选填" />
          </div>
        </div>
        <div class="inquiry-row">
          <label class="inquiry-label">需求说明：</label>
          <div class="inquiry-field">
            <textarea v-model="form.remark" rows="4" placeholder="补充您的采购需求"></textarea>
          </div>
        </div>
        <div class="inquiry-submit">
          <button type="submit" class="btn-submit" :disabled="submitting">
            {{ submitting ? '提交中...' : '提交询价' }}
          </button>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue';
import api from '../api';
import { getInquiryItems, setInquiryItems } from '../inquiry';
import { toastSuccess, toastWarning, toastError } from '../utils/toast';

const refreshInquiryCount = inject('refreshInquiryCount');
const items = ref(getInquiryItems());
const submitting = ref(false);
const form = ref({
  contactName: '',
  contactPhone: '',
  companyName: '',
  contactQq: '',
  contactWechat: '',
  remark: '',
});

const totalQty = computed(() =>
  items.value.reduce((sum, item) => sum + (item.quantity || 1), 0),
);

function cartKey(item, index) {
  return `${item.productId}_${item.itemRemark || ''}_${index}`;
}

function persist() {
  setInquiryItems(items.value);
  refreshInquiryCount();
}

function changeQty(item, delta) {
  item.quantity = Math.max(1, (item.quantity || 1) + delta);
  persist();
}

function onQtyChange(item) {
  if (!item.quantity || item.quantity < 1) item.quantity = 1;
  persist();
}

function remove(i) {
  items.value.splice(i, 1);
  persist();
}

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
    await api.post('/site/leads/inquiry', { ...form.value, items: items.value });
    setInquiryItems([]);
    items.value = [];
    refreshInquiryCount();
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
.page-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
}
.page-head h2 { margin: 0; }
.item-badge {
  font-size: 13px;
  color: #666;
  background: #f0f4ff;
  padding: 4px 12px;
  border-radius: 20px;
}
.cart-section {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 28px;
}
.cart-head,
.cart-row {
  display: grid;
  grid-template-columns: 1fr 140px 80px;
  align-items: center;
  gap: 16px;
  padding: 14px 20px;
}
.cart-head {
  background: #f8fafc;
  border-bottom: 1px solid #e8e8e8;
  font-size: 13px;
  font-weight: 600;
  color: #666;
}
.cart-row {
  border-bottom: 1px solid #f0f0f0;
}
.cart-row:last-child { border-bottom: none; }
.product-title {
  font-size: 15px;
  font-weight: 600;
  color: #222;
  line-height: 1.4;
}
.product-spec {
  margin-top: 4px;
  font-size: 12px;
  color: #888;
}
.qty-stepper {
  display: inline-flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}
.qty-btn {
  width: 32px;
  height: 32px;
  border: none;
  background: #f5f5f5;
  color: #333;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.15s;
}
.qty-btn:hover:not(:disabled) { background: #ebebeb; }
.qty-btn:disabled { color: #ccc; cursor: not-allowed; }
.qty-input {
  width: 48px;
  height: 32px;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
  text-align: center;
  font-size: 14px;
  outline: none;
  -moz-appearance: textfield;
}
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.btn-remove {
  border: none;
  background: none;
  color: #999;
  font-size: 13px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: color 0.15s, background 0.15s;
}
.btn-remove:hover {
  color: #c8161d;
  background: #fff5f5;
}
.empty-cart {
  text-align: center;
  padding: 48px 24px;
  background: #f8fafc;
  border: 1px dashed #ddd;
  border-radius: 8px;
  margin-bottom: 24px;
}
.empty-icon { font-size: 40px; margin-bottom: 12px; }
.empty-cart p {
  margin: 0 0 16px;
  color: #666;
  font-size: 15px;
}
.btn-go {
  display: inline-block;
  background: linear-gradient(135deg, #1a6dff, #0052d9);
  color: #fff;
  padding: 10px 24px;
  border-radius: 6px;
  font-size: 14px;
  text-decoration: none;
}
.btn-go:hover { opacity: 0.92; }
.inquiry-module {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  overflow: hidden;
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
.inquiry-label {
  width: 110px;
  flex-shrink: 0;
  text-align: right;
  padding-right: 16px;
  padding-top: 8px;
  font-size: 14px;
  color: #333;
}
.inquiry-label .req { color: #c8161d; margin-right: 2px; }
.inquiry-field { flex: 1; min-width: 0; }
.inquiry-field input,
.inquiry-field textarea {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 4px;
  outline: none;
  font-family: inherit;
  transition: border-color 0.15s;
}
.inquiry-field input:focus,
.inquiry-field textarea:focus { border-color: #1a6dff; }
.inquiry-field textarea {
  resize: vertical;
  min-height: 90px;
}
.inquiry-submit {
  text-align: right;
  padding: 16px 24px 20px;
  border-top: 1px solid #f0f0f0;
}
.btn-submit {
  background: linear-gradient(135deg, #c8161d, #a01218);
  color: #fff;
  border: none;
  padding: 10px 36px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.15s;
}
.btn-submit:hover:not(:disabled) { opacity: 0.92; }
.btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
@media (max-width: 640px) {
  .cart-head { display: none; }
  .cart-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .col-action { text-align: right; }
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
