<template>
  <section>
    <div v-if="compras">
      <h2>Compras</h2>
      <div
        class="produto-wrapper"
        v-for="(compra, index) in compras"
        :key="index"
      >
        <ProductItem v-if="compra.produto" :produto="compra.produto">
          <p class="vendedor">
            <span>Vendedor: </span>{{ compra.vendedor_id }}
          </p>
        </ProductItem>
      </div>
    </div>
  </section>
</template>

<script>
import ProductItem from '@/components/ProductItem.vue';
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import { api } from '@/services';

export default {
  name: 'UserPurchase',
  components: {
    ProductItem,
  },

  setup() {
    const store = useStore();

    const compras = ref(null);
    const usuario = computed(() => store.state.usuario);
    const login = computed(() => store.state.login);

    const getCompras = () => {
      api
        .get(`/transacao?comprador_id=${usuario.value.id}`)
        .then((response) => (compras.value = response.data));
    };

    if (login.value) getCompras();

    watch(login, () => getCompras());

    return {
      compras,
    };
  },
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.vendedor span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}
</style>
