<template>
  <section>
    <h2>Crie a sua conta</h2>
    <Transition mode="out-in">
      <button v-if="!criar" class="btn" @click="criar = true">
        Criar conta
      </button>
      <UserForm v-else>
        <button class="btn btn-form" @click.prevent="criarUsuario">
          Criar Usuário
        </button>
      </UserForm>
    </Transition>
  </section>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'LoginCreate',
  components: {
    UserForm,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const criar = ref(false);

    const criarUsuario = async () => {
      try {
        await store.dispatch('createUser', store.state.usuario);
        await store.dispatch('getUsuario', store.state.usuario.email);
        router.push({ name: 'user' });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      criar,
      criarUsuario,
    };
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-top: 40px;
  margin-bottom: 10px;
}

.btn {
  width: 100%;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}

.btn-form {
  max-width: 100%;
}
</style>
