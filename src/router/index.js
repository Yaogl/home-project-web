import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import ProductList from '../views/ProductList.vue';
import ProductDetail from '../views/ProductDetail.vue';
import NewsList from '../views/NewsList.vue';
import NewsDetail from '../views/NewsDetail.vue';
import Honors from '../views/Honors.vue';
import Contact from '../views/Contact.vue';
import Inquiry from '../views/Inquiry.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/products', component: ProductList },
    { path: '/products/:id', component: ProductDetail },
    { path: '/news', component: NewsList },
    { path: '/news/:id', component: NewsDetail },
    { path: '/honors', component: Honors },
    { path: '/contact', component: Contact },
    { path: '/inquiry', component: Inquiry },
  ],
});
