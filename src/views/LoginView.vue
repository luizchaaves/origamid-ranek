<template>
  <section class="login">
    <h1>Login</h1>
    <form>
      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="login.email" />
      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="login.senha" />
      <button class="btn" @click.prevent="logar">Logar</button>
    </form>

    <p class="perdeu">
      <a href="/" target="_blank">Predeu a senha? Clique aqui.</a>
    </p>

    <LoginCreate />
  </section>
</template>

<script>
import LoginCreate from '@/components/LoginCreate.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginView',
  components: {
    LoginCreate,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const login = ref({
      email: '',
      senha: '',
    });

    const logar = async () => {
      await store.dispatch('userLogin', login.value);
      await store.dispatch('getUsuario');
      await router.push({ name: 'user' });
    };

    return {
      login,
      logar,
    };
  },
};
</script>

<style scoped>
.login {
  max-width: 500px;
  margin: 0 auto;
  padding: 0 20px;
}

h1 {
  text-align: center;
  font-size: 2rem;
  margin-top: 40px;
  margin-bottom: 20px;
  color: #87f;
}

form {
  display: grid;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.perdeu {
  text-align: center;
  margin: 20px auto 0 auto;
}

.perdeu a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>
