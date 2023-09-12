<template>
  <header>
    <nav>
      <RouterLink to="/" class="logo">
        <img src="@/assets/ranek.svg" alt="Ranek" />
      </RouterLink>
      <RouterLink v-if="$store.state.login" class="btn" to="/usuario">{{
        nome
      }}</RouterLink>
      <RouterLink v-else class="btn" to="/login"> Vender / Login </RouterLink>
    </nav>
  </header>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'TheHeader',

  setup() {
    const store = useStore();

    const nome = computed(() => {
      return store.state.usuario.nome.replace(/ .*/, '');
    });

    return {
      nome,
    };
  },
};
</script>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}

.logo {
  padding: 10px 0;
}

.logo img {
  width: 90px;
}
</style>
