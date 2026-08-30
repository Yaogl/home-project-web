import { getTenantCode } from './api';

export function getInquiryKey() {
  return `inquiry_${getTenantCode()}`;
}

export function getInquiryItems() {
  try {
    return JSON.parse(localStorage.getItem(getInquiryKey()) || '[]');
  } catch {
    return [];
  }
}

export function setInquiryItems(items) {
  localStorage.setItem(getInquiryKey(), JSON.stringify(items));
}

export function addToInquiry(product, options = {}) {
  const { quantity = 1, itemRemark = '' } = options;
  const items = getInquiryItems();
  const remarkKey = itemRemark || '';
  const found = items.find((i) => i.productId === product.id && i.itemRemark === remarkKey);
  if (found) {
    found.quantity += quantity;
  } else {
    items.push({
      productId: product.id,
      productTitle: product.title,
      quantity,
      itemRemark: remarkKey,
    });
  }
  setInquiryItems(items);
}
