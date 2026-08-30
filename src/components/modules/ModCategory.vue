<template>
  <div>
    <h3>产品分类</h3>
    <div class="category-tabs">
      <router-link
        v-for="c in list"
        :key="c.id"
        :to="'/products?categoryId=' + c.id"
        class="category-tab"
      >{{ c.name }}</router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import api from '../../api';
defineProps({ config: Object });
const list = ref([]);
onMounted(async () => { list.value = await api.get('/site/categories'); });
</script>
