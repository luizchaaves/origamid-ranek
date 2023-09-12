<template>
  <section>
    <div v-if="product" class="produto">
      <ul v-if="product.fotos" class="fotos">
        <li v-for="(foto, index) in product.fotos" :key="index">
          <img :src="foto.src" :alt="foto.titulo" />
        </li>
      </ul>
      <div class="info">
        <h1>{{ product.nome }}</h1>
        <p class="preco">{{ $filters.formatPrice(product.preco) }}</p>
        <p class="descricao">{{ product.descricao }}</p>
        <button v-if="product.vendido === 'false'" class="btn">Comprar</button>
        <button v-else disabled class="btn">Produto Vendido</button>
      </div>
    </div>

    <PageLoading v-else />
  </section>
</template>

<script>
import PageLoading from '@/components/PageLoading.vue';
import { api } from '../services';
import { ref } from 'vue';

export default {
  name: 'ProductView',
  props: ['id'],
  components: {
    PageLoading,
  },

  setup(props) {
    const product = ref(null);

    const getProduct = () => {
      api.get(`/produto/${props.id}`).then((response) => {
        product.value = response.data;
      });
    };

    getProduct();

    return { product };
  },
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
  max-width: 900px;
  padding: 60px;
  margin: 0 auto;
}

.preco {
  color: #e80;
  font-weight: bold;
  font-size: 1.5rem;
  margin-bottom: 40px;
}

.descricao {
  font-size: 1.2rem;
}

.btn {
  margin-top: 60px;
  widows: 200px;
}
</style>
