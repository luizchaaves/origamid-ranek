<template>
  <section>
    <h2>Endereço de Envio</h2>
    <UserForm>
      <button class="btn" @click.prevent="finalizarCompra">
        Finalizar Compra
      </button>
    </UserForm>
  </section>
</template>

<script>
import UserForm from './UserForm.vue';
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { api } from '@/services';

export default {
  name: 'FinalizePurchase',
  props: {
    produto: {},
  },
  components: {
    UserForm,
  },

  setup(props) {
    const store = useStore();
    const router = useRouter();

    const usuario = ref(store.state.usuario);

    const compra = computed(() => {
      return {
        comprador_id: usuario.value.email,
        vendedor_id: props.produto.usuario_id,
        produto: props.produto,
        endereco: {
          cep: usuario.value.cep,
          rua: usuario.value.rua,
          numero: usuario.value.numero,
          bairro: usuario.value.bairro,
          cidade: usuario.value.cidade,
          estado: usuario.value.estado,
        },
      };
    });

    const criarTransacao = () => {
      return api
        .post('/transacao', compra.value)
        .then(() => router.push({ name: 'purchases' }));
    };

    const criarUsuario = async () => {
      try {
        await store.dispatch('createUser', store.state.usuario);
        await store.dispatch('getUsuario', store.state.usuario.email);
        await criarTransacao();
      } catch (error) {
        console.log(error);
      }
    };

    const finalizarCompra = () => {
      if (store.state.login) criarTransacao();
      else criarUsuario();
    };

    return {
      finalizarCompra,
    };
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 20px;
}

.btn {
  background: #e80;
}
</style>
