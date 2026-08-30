import axios from 'axios';

function getTenantCode() {
  const params = new URLSearchParams(window.location.search);
  return params.get('tenant') || localStorage.getItem('tenantCode') || 'demo';
}

const api = axios.create({ baseURL: '/api/v1' });

api.interceptors.request.use((config) => {
  const tenantCode = getTenantCode();
  localStorage.setItem('tenantCode', tenantCode);
  config.headers['X-Tenant-Code'] = tenantCode;
  return config;
});

api.interceptors.response.use(
  (res) => {
    const body = res.data;
    if (body && body.code === 0) return body.data;
    return Promise.reject(new Error(body?.message || '请求失败'));
  },
  (err) => Promise.reject(new Error(err.response?.data?.message || err.message)),
);

export { getTenantCode };
export default api;
