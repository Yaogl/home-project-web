<template>

  <div>

    <h3>热门产品</h3>

    <div class="grid">
      <ProductCard v-for="p in list" :key="p.id" :product="p" />
    </div>

  </div>

</template>



<script setup>

import { onMounted, ref } from 'vue';

import api from '../../api';
import ProductCard from '../ProductCard.vue';

const props = defineProps({ config: { type: Object, default: () => ({}) } });

const list = ref([]);



onMounted(async () => {

  const limit = props.config.limit || 8;

  const data = await api.get('/site/products', { params: { pageSize: limit } });

  list.value = data.list || [];

});

</script>


