<template>
  <div class="produto" v-if="produto">
    <RouterLink
      :to="{ name: 'product', params: { id: produto.id } }"
      class="produto-img"
    >
      <img
        v-if="produto.fotos"
        :src="produto.fotos[0].src"
        :alt="produto.fotos[0].titulo"
      />
    </RouterLink>
    <div class="info">
      <p class="preco">{{ $filters.formatPrice(produto.preco) }}</p>
      <h2 class="titulo">{{ produto.nome }}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  name: 'ProductItem',
  props: {
    produto: {},
  },
  components: { RouterLink },
};
</script>

<style scoped>
.produto {
  display: grid;
  grid-template-columns: minmax(100px, 200px) 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}

.info {
  align-self: end;
}

.produto-img {
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
}
</style>
