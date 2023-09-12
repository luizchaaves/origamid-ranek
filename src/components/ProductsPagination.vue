<template>
  <ul v-if="totalPages > 1">
    <li v-for="page in pages.pagesArray" :key="page">
      <RouterLink
        :class="pages.current === page ? 'active' : ''"
        :to="{ query: query(page) }"
        >{{ page }}</RouterLink
      >
    </li>
  </ul>
</template>

<script>
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

export default {
  props: {
    totalProducts: {
      type: Number,
      default: 1,
    },
    productsPerPage: {
      type: Number,
      default: 1,
    },
  },

  components: { RouterLink },

  setup(props) {
    const route = useRoute();

    const totalPages = computed(() => {
      const total = props.totalProducts / props.productsPerPage;
      return total !== Infinity ? Math.ceil(total) : 0;
    });

    const pages = computed(() => {
      const current = Number(route.query._page);
      const range = 4;
      const offset = Math.ceil(range / 2);
      const total = totalPages.value;
      const pagesArray = [];

      for (let i = 1; i <= total; i++) {
        pagesArray.push(i);
      }

      pagesArray.splice(0, current - offset);
      pagesArray.splice(range, total);

      return { pagesArray, current };
    });

    const query = (page) => {
      return {
        ...route.query,
        _page: page,
      };
    };

    return {
      totalPages,
      query,
      pages,
    };
  },
};
</script>

<style scoped>
ul {
  grid-column: 1 / -1;
}

li {
  display: inline-block;
}

li a {
  padding: 2px 8px;
  border-radius: 2px;
  margin: 4px;
}

li a:hover,
li a.active {
  background: #87f;
  color: #fff;
}
</style>
