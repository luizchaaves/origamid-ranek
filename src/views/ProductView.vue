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
        <Transition mode="out-in" v-if="product.vendido === 'false'">
          <button v-if="!finalizar" class="btn" @click="finalizar = true">
            Comprar
          </button>
          <FinalizePurchase v-else :produto="product" />
        </Transition>

        <button v-else disabled class="btn">Produto Vendido</button>
      </div>
    </div>

    <PageLoading v-else />
  </section>
</template>

<script>
import PageLoading from '@/components/PageLoading.vue';
import FinalizePurchase from '@/components/FinalizePurchase.vue';
import { api } from '../services';
import { ref } from 'vue';

export default {
  name: 'ProductView',
  props: ['id'],
  components: {
    PageLoading,
    FinalizePurchase,
  },

  setup(props) {
    const product = ref(null);
    const finalizar = ref(false);

    const getProduct = () => {
      api.get(`/produto/${props.id}`).then((response) => {
        product.value = response.data;
      });
    };

    getProduct();

    return { product, finalizar };
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
