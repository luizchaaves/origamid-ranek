<template>
  <UserForm>
    <button class="btn" @click.prevent="atualizarUsuario">
      Atualizar Usuário
    </button>
  </UserForm>
</template>

<script>
import UserForm from '@/components/UserForm.vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { api } from '@/services';

export default {
  name: 'UserEdit',
  components: { UserForm },

  setup() {
    const store = useStore();
    const router = useRouter();

    const atualizarUsuario = () => {
      api
        .put('/usuario', store.state.usuario)
        .then(() => {
          store.dispatch('getUsuario', store.state.usuario.id);
          router.push({ name: 'user' });
        })
        .catch((error) => {
          console.log(error.response);
        });
    };

    return {
      atualizarUsuario,
    };
  },
};
</script>
