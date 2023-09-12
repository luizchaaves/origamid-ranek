<template>
  <section class="usuario">
    <nav class="sidenav">
      <ul>
        <li><RouterLink :to="{ name: 'user' }">Produtos</RouterLink></li>
        <li><RouterLink :to="{ name: 'purchases' }">Compras</RouterLink></li>
        <li><RouterLink :to="{ name: 'sales' }">Vendas</RouterLink></li>
        <li>
          <RouterLink :to="{ name: 'user-edit' }">Editar Usuário</RouterLink>
        </li>
        <li><button @click="deslogar">Deslogar</button></li>
      </ul>
    </nav>

    <RouterView v-slot="{ Component }">
      <Transition mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </section>
</template>

<script>
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'UserView',
  components: {
    RouterLink,
  },

  setup() {
    const router = useRouter();
    const store = useStore();

    const deslogar = () => {
      store.dispatch('userLogout');
      router.push('/login');
    };

    return {
      deslogar,
    };
  },
};
</script>

<style scoped>
.usuario {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 30px;
  padding: 20px;
}

@media screen and (max-width: 500px) {
  .usuario {
    grid-template-columns: 1fr;
    margin: 0px auto;
  }
}

.sidenav a,
.sidenav button {
  padding: 10px;
  display: block;
  background: #f4f7fc;
  margin-bottom: 10px;
  border-radius: 4px;
}

.sidenav a:hover,
.sidenav button:hover,
.sidenav a.router-link-exact-active {
  background: #87f;
  color: #fff;
}

.sidenav button {
  border: none;
  width: 100%;
  font-size: 1rem;
  text-align: left;
  font-family: Arial, Helvetica, sans-serif;
  cursor: pointer;
}
</style>
