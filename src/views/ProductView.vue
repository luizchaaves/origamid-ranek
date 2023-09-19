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

        <button v-else disabled class="btn btn-disabled">
          Produto Vendido
        </button>
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

.fotos {
  grid-row: 1 / 3;
}

.info {
  position: sticky;
  top: 20px;
}

.descricao {
  font-size: 1.2rem;
}

img {
  margin-bottom: 30px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.2);
  border-radius: 4px;
}

.btn {
  margin-top: 60px;
  widows: 200px;
}

@media screen and (max-width: 500px) {
  .produto {
    grid-template-columns: 1fr;
  }

  .fotos {
    grid-row: 2;
  }

  .info {
    position: initial;
  }
}
</style>
