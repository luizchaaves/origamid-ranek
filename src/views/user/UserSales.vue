<template>
  <section>
    <h2>Vendas</h2>
    <div v-if="vendas">
      <div
        class="produto-wrapper"
        v-for="(venda, index) in vendas"
        :key="index"
      >
        <ProductItem v-if="venda.produto" :produto="venda.produto">
          <p class="comprador">
            <span>Comprador: </span>{{ venda.comprador_id }}
          </p>
        </ProductItem>
        <div class="entrega">
          <h3>Entrega:</h3>
          <ul v-if="venda.endereco">
            <li v-for="(value, key) in venda.endereco" :key="key">
              {{ key }}: {{ value }}
            </li>
          </ul>
        </div>
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
  name: 'UserSales',
  components: {
    ProductItem,
  },

  setup() {
    const store = useStore();

    const vendas = ref(null);
    const login = computed(() => store.state.login);

    const getVendas = () => {
      api
        .get(`/transacao?tipo=vendedor_id`)
        .then((response) => (vendas.value = response.data));
    };

    if (login.value) getVendas();

    watch(login, () => getVendas());

    return {
      vendas,
    };
  },
};
</script>

<style scoped>
.produto-wrapper {
  margin-bottom: 40px;
}

.comprador span {
  color: #e80;
}

h2 {
  margin-bottom: 20px;
}

.entrega {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 60px;
}

h3 {
  margin: 0;
  justify-self: end;
}
</style>
