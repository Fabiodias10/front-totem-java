<template>
  <q-page class="geral col-12 column self-center items-center justify-center">
    <!-- <h1>Fabio</h1> -->
    <q-card class="my-card shadow-3">
      <q-card-section class="titulos">
        <q-separator vertical color="blue" />
        <div class="text-h1 column items-center">
          <img src="../assets/logoPerto.png" width="140" />
        </div>
        <div class="column items-center">Atualiza-Totem</div>
      </q-card-section>

      <div class="row">
        <q-card-section class="q-mx-auto">
          <q-input
            dense
            tabindex="1"
            rounded
            v-model="totemStore.ipTotem"
            label="IP Totem"
            type="text"
            class="q-my-md"
          >
            <template v-slot:prepend>
              <q-icon name="lan" />
            </template>
          </q-input>
        </q-card-section>
      </div>

      <q-card-actions vertical class="q-mx-xl q-mb-md">
        <q-btn
          size="md"
          tabindex="3"
          push
          icon="check"
          label="Conectar"
          class="q-mx-sm full-width"
          @click="autentica()"
          :loading="totemStore.load"
        >
          <template v-slot:loading>
            <q-spinner-ios size="30px" color="secundary" />
          </template>
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { Notify } from "quasar";

import { ref } from "vue";
import axios from "axios";
import { useTotemStore } from "../stores/totemStore";
import { useTotemAtualizaStore } from "../stores/totemAtualizaStore";
const totemStore = useTotemStore();
const totemAtualizaStore = useTotemAtualizaStore();

import { useRouter } from "vue-router"; // ✅ IMPORTANTE
const router = useRouter(); // ✅ HOOK DO VUE ROUTER

defineOptions({
  name: "IndexPage",
});

const count = ref(0);

// const load = ref(false);

async function autentica() {
  await totemStore.autenticaTotem();
  await totemStore.listaDiretorioLocal();
  await totemStore.listaDiretorioRemoto();
  await totemAtualizaStore.baixaOracle();
  console.log(totemStore.respostaDiretorioLocal.versaoTinker);

  if (totemStore.conectado) {
    Notify.create({
      type: "positive",
      message: "Totem conectado com sucesso!",
      position: "top",
      timeout: 1000,
      textColor: "white",
    });
    setTimeout(() => {
      router.push("/totem");
    }, 1000);
  } else {
    Notify.create({
      type: "negative",
      message: "Erro ao conectar no Totem.",
      position: "top",
      timeout: 2000,
      textColor: "white",
    });
  }
}
</script>

<style scoped>
.my-card {
  min-width: 340px;
  border-radius: 10px;
  height: 350px;
}

.geral {
  opacity: 1;
  /* background-image: url("/fundo3.png"); */
  font-family: "Kanit";

  /* background-size: 1466px 1000px; */
}

.versao {
  color: gray;
  padding: 4px;
}

.q-btn {
  font-family: "Kanit";
  font-size: 14px;
  color: #1b2a35;
  background-color: #53b7e8;
}

.q-input {
  padding: 3px;
}

.titulos {
  background-color: #1b2a35;
  color: white;
  font-family: "Kanit";
  font-size: 16px;
}
</style>
