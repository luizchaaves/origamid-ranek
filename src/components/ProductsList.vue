<template>
  <section class="produtos-container">
    <div v-if="produtos && produtos.length" class="produtos">
      <div class="produto" v-for="produto in produtos" :key="produto.id">
        <RouterLink to="/">
          <img
            v-if="produto.fotos"
            :src="produto.fotos[0].src"
            :alt="produto.fotos[0].titulo"
          />
          <p class="preco">{{ produto.preco }}</p>
          <h2 class="titulo">{{ produto.nome }}</h2>
          <p>{{ produto.descricao }}</p>
        </RouterLink>
      </div>
    </div>
    <div v-else-if="produtos && produtos.length === 0" class="sem-resultados">
      <p>Busca sem resultados. Tente buscar outro termo</p>
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

<style scoped>
.produtos-container {
  max-width: 1000px;
  margin: 0 auto;
}

.produtos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  margin: 30px;
}

.produto {
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  padding: 10px;
  background: #fff;
  border-radius: 4px;
  transition: all 0.2s;
}

.produto:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.1);
  position: relative;
  z-index: 1;
}

.produto img {
  border-radius: 4px;
  margin-bottom: 20px;
}

.titulo {
  margin-bottom: 10px;
}

.preco {
  color: #e80;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
}
</style>
