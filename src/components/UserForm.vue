<template>
  <form>
    <div class="usuario" v-if="mostrarDadosLogin">
      <label for="nome">Nome</label>
      <input type="text" name="nome" id="nome" v-model="nome" />

      <label for="email">Email</label>
      <input type="email" name="email" id="email" v-model="email" />

      <label for="senha">Senha</label>
      <input type="password" name="senha" id="senha" v-model="senha" />
    </div>

    <label for="cep">Cep</label>
    <input
      type="text"
      name="cep"
      id="cep"
      v-model="cep"
      @keyup="preencherCep"
    />

    <label for="rua">Rua</label>
    <input type="text" name="rua" id="rua" v-model="rua" />

    <label for="numero">Numero</label>
    <input type="text" name="numero" id="numero" v-model="numero" />

    <label for="bairro">Bairro</label>
    <input type="text" name="bairro" id="bairro" v-model="bairro" />

    <label for="cidade">Cidade</label>
    <input type="text" name="cidade" id="cidade" v-model="cidade" />

    <label for="estado">Estado</label>
    <input type="text" name="estado" id="estado" v-model="estado" />

    <div class="button">
      <slot></slot>
    </div>
  </form>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { getCep } from '@/services';

export default {
  name: 'UserForm',

  setup() {
    const store = useStore();
    const route = useRoute();

    const fieldsComputed = {};
    const fields = [
      'nome',
      'email',
      'senha',
      'cep',
      'rua',
      'numero',
      'bairro',
      'cidade',
      'estado',
    ];

    fields.forEach((field) => {
      fieldsComputed[field] = computed({
        get() {
          return store.state.usuario[field];
        },
        set(value) {
          store.commit('UPDATE_USER', { [field]: value });
        },
      });
    });

    const mostrarDadosLogin = computed(() => {
      return !store.state.login || route.name === 'user-edit';
    });

    const preencherCep = () => {
      const cep = fieldsComputed.cep.value.replace(/\D/g, '');
      fieldsComputed.cep.value = cep;
      if (cep.length === 8)
        getCep(cep).then((response) => {
          console.log(response);
          fieldsComputed.rua.value = response.data.logradouro;
          fieldsComputed.bairro.value = response.data.bairro;
          fieldsComputed.estado.value = response.data.uf;
          fieldsComputed.cidade.value = response.data.localidade;
        });
    };

    return {
      ...fieldsComputed,
      preencherCep,
      mostrarDadosLogin,
    };
  },
};
</script>

<style scoped>
form,
.usuario {
  display: grid;
  grid-template-columns: 80px 1fr;
  align-items: center;
}

.usuario {
  grid-column: 1 / 3;
}

.button {
  grid-column: 2;
  margin-top: 10px;
}
</style>
