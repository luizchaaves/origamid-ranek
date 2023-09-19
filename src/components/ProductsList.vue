<template>
  <section class="produtos-container">
    <Transition mode="out-in">
      <div v-if="products && products.length" class="produtos" key="products">
        <div class="produto" v-for="(product, index) in products" :key="index">
          <RouterLink :to="{ name: 'product', params: { id: product.id } }">
            <img
              v-if="product.fotos"
              :src="product.fotos[0].src"
              :alt="product.fotos[0].titulo"
            />
            <p class="preco">{{ $filters.formatPrice(product.preco) }}</p>
            <h2 class="titulo">{{ product.nome }}</h2>
            <p>{{ product.descricao }}</p>
          </RouterLink>
        </div>
        <ProductsPagination
          :totalProducts="productsTotal"
          :productsPerPage="productsPerPage"
        />
      </div>

      <div
        v-else-if="products && products.length === 0"
        class="sem-resultados"
        key="no-results"
      >
        <p>Busca sem resultados. Tente buscar outro termo</p>
      </div>

      <PageLoading v-else key="loading" />
    </Transition>
  </section>
</template>

<script>
import ProductsPagination from '@/components/ProductsPagination.vue';
import PageLoading from './PageLoading.vue';
import { ref, computed, watch } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/services.js';
import { serialize } from '@/helpers.js';

export default {
  name: 'ProductsList',
  components: {
    ProductsPagination,
    PageLoading,
  },

  setup() {
    const route = useRoute();
    const products = ref([]);
    const productsPerPage = ref(9);
    const productsTotal = ref(0);

    const url = computed(() => {
      const query = serialize(route.query);

      return `/produto?_limit=${productsPerPage.value}${query}`;
    });

    const getProdutos = () => {
      products.value = null;
      setTimeout(() => {
        api.get(url.value).then((response) => {
          productsTotal.value = Number(response.headers['x-total-count']);
          products.value = response.data;
        });
      }, 1500);
    };

    getProdutos();

    watch(url, () => getProdutos());

    return {
      products,
      productsPerPage,
      productsTotal,
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

@media screen and (max-width: 500px) {
  .produtos {
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
    margin: 10px;
  }
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
