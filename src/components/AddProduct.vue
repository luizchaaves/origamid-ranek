<template>
  <form class="adicionar-produto">
    <label for="nome">Nome</label>
    <input type="text" name="nome" id="nome" v-model="produto.nome" />

    <label for="preco">Preco (R$)</label>
    <input type="number" name="preco" id="preco" v-model="produto.preco" />

    <label for="fotos">Fotos</label>
    <input type="file" name="fotos" id="fotos" ref="fotos" />

    <label for="descricao">Descrição</label>
    <textarea
      name="descricao"
      id="descricao"
      v-model="produto.descricao"
    ></textarea>
    <input
      class="btn"
      type="button"
      value="Adicionar Produto"
      @click.prevent="addProduct"
    />
  </form>
</template>

<script>
import { api } from '@/services';
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'AddProduct',

  setup() {
    const store = useStore();

    const produto = ref({
      nome: '',
      preco: '',
      descricao: '',
      fotos: null,
    });

    const formatProduct = () => {
      produto.value.usuario_id = store.state.usuario.id;
    };

    const addProduct = () => {
      formatProduct();
      api
        .post('/produto', produto.value)
        .then(() => store.dispatch('getUsuarioProdutos'));
    };

    return {
      produto,
      addProduct,
    };
  },
};
</script>

<style scoped>
.adicionar-produto {
  display: grid;
  grid-template-columns: 100px 1fr;
  align-items: center;
  margin-bottom: 60px;
}

.btn {
  grid-column: 2;
}
</style>
