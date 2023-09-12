<template>
  <section class="produtos-container">
    <div v-for="produto in produtos" :key="produto.id">
      <img
        v-if="produto.fotos"
        :src="produto.fotos[0].src"
        :alt="produto.fotos[0].titulo"
      />
      <p class="preco">{{ produto.preco }}</p>
      <h2 class="titulo">{{ produto.nome }}</h2>
      <p>{{ produto.descricao }}</p>
    </div>
  </section>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/services.js';
import { serialize } from '@/helpers.js';

export default {
  setup() {
    const route = useRoute();
    const produtos = ref([]);
    const productsPerPage = ref(9);

    const url = computed(() => {
      const query = serialize(route.query);

      return `/produto?_limit=${productsPerPage.value}${query}`;
    });

    const getProdutos = () => {
      api.get(url.value).then((response) => (produtos.value = response.data));
    };

    watch(url, () => getProdutos());

    return {
      produtos,
    };
  },
};
</script>
