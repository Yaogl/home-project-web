<template>
  <div class="card" style="padding:24px" v-if="article">
    <h2>{{ article.title }}</h2>
    <div v-html="article.content"></div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import api from '../api';
const route = useRoute();
const article = ref(null);
onMounted(async () => {
  article.value = await api.get('/site/articles/' + route.params.id);
});
</script>
