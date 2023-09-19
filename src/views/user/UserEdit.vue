<template>
  <UserForm>
    <button class="btn" @click.prevent="atualizarUsuario">
      Atualizar Usuário
    </button>
  </UserForm>
  <ErrorNotification :errors="errors" />
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { api } from '@/services';
import ErrorNotification from '@/components/ErrorNotification.vue';

export default {
  name: 'UserEdit',
  components: { UserForm, ErrorNotification },

  setup() {
    const store = useStore();
    const router = useRouter();
    const errors = ref([]);

    const atualizarUsuario = () => {
      errors.value = [];
      api
        .put('/usuario', store.state.usuario)
        .then(() => {
          store.dispatch('getUsuario', store.state.usuario.id);
          router.push({ name: 'user' });
        })
        .catch((error) => {
          errors.value.push(error.response.data.message);
        });
    };

    return {
      atualizarUsuario,
      errors,
    };
  },
};
</script>
