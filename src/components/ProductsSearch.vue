<template>
  <form>
    <input type="text" name="search" id="search" v-model="search" />
    <input
      type="submit"
      id="searchButton"
      value="Buscar"
      @click.prevent="searchProducts"
    />
    {{ search }}
  </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const search = ref('');

    const searchProducts = () => {
      router.push({
        query: { q: search.value },
      });
    };

    return {
      search,
      searchProducts,
    };
  },
};
</script>
