<template>
  <section>
    <h2>Crie a sua conta</h2>
    <ErrorNotification :errors="errors" />
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
import ErrorNotification from './ErrorNotification.vue';

export default {
  name: 'LoginCreate',
  components: {
    UserForm,
    ErrorNotification,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const criar = ref(false);
    const errors = ref([]);

    const criarUsuario = async () => {
      errors.value = [];
      try {
        await store.dispatch('createUser', store.state.usuario);
        await store.dispatch('userLogin', store.state.usuario);
        await store.dispatch('getUsuario');
        router.push({ name: 'user' });
      } catch (error) {
        errors.value.push(error.value.response.data.message);
      }
    };

    return {
      criar,
      criarUsuario,
      errors,
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
