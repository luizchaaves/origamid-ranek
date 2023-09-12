<template>
  <section>
    <h2>Adicionar produto</h2>
    <AddProduct />
    <h2>Seus Produtos</h2>
    <TransitionGroup v-if="usuario_produtos" name="list" tag="ul">
      <li v-for="(produto, index) in usuario_produtos" :key="index">
        <ProductItem :produto="produto">
          <p>{{ produto.descricao }}</p>
          <button class="deletar" @click="deletarProduto(produto.id)">
            Deletar
          </button>
        </ProductItem>
      </li>
    </TransitionGroup>
  </section>
</template>

<script>
import AddProduct from '@/components/AddProduct.vue';
import ProductItem from '@/components/ProductItem.vue';
import { computed, watch } from 'vue';
import { useStore } from 'vuex';
import { api } from '@/services';

export default {
  name: 'UserProducts',
  components: {
    AddProduct,
    ProductItem,
  },

  setup() {
    const store = useStore();

    const login = computed(() => store.state.login);
    const usuario = computed(() => store.state.usuario);
    const usuario_produtos = computed(() => store.state.usuario_produtos);

    if (login.value) store.dispatch('getUsuarioProdutos');

    watch(login, () => store.dispatch('getUsuarioProdutos'));

    const deletarProduto = (id) => {
      const confirmar = window.confirm('Deseja remover este produto?');
      if (confirmar) {
        api
          .delete(`/produto/${id}`)
          .then(() => store.dispatch('getUsuarioProdutos'))
          .catch((error) => {
            console.log(error.respose);
          });
      }
    };

    return {
      login,
      usuario,
      usuario_produtos,
      deletarProduto,
    };
  },
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.list-enter,
.list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s;
}

.deletar {
  position: absolute;
  top: 0px;
  right: 0px;
  background: url('../../assets//remove.svg') no-repeat center center;
  width: 24px;
  height: 24px;
  text-indent: -150px;
  overflow: hidden;
  cursor: pointer;
  border: none;
}
</style>
