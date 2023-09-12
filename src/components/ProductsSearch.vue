<template>
  <form>
    <input
      type="text"
      name="search"
      id="search"
      v-model="search"
      placeholder="Buscar..."
    />
    <input
      type="submit"
      id="searchButton"
      value="Buscar"
      @click.prevent="searchProducts"
    />
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

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
}

#search {
  width: 100%;
  padding: 20px;
  border: none;
}

#search:focus,
#search:hover {
  transform: scale(1.1);
}

#searchButton {
  width: 62px;
  height: 62px;
  background: url('../assets/search.svg') no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0px;
  right: 0px;
  box-shadow: none;
}
</style>
