<template>
  <q-page class="geral col-12 column self-center items-center justify-center">
    <!-- <h1>Fabio</h1> -->
    <q-card class="my-card shadow-3">
      <q-card-section class="titulos">
        <q-separator vertical color="blue" />
        <div class="text-h1 column items-center">
          <!-- <img src="../assets/logoPerto.png" width="140" /> -->
          <img src="../assets/wps-perto.jpg" width="250" />
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

      <div class="row">
        <q-card-section class="q-mx-auto">
          <q-input
            dense
            tabindex="2"
            rounded
            v-model="totemStore.ipServidor"
            label="IP Servidor"
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
          tabindex="2"
          push
          icon="check"
          label="Conectar"
          class="q-mx-sm full-width text-weight-bold"
          @click="autentica()"
          :loading="totemStore.load"
        >
          <template v-slot:loading>
            <q-spinner-ios size="30px" color="secundary" />
          </template>
        </q-btn>
      </q-card-actions>
      <div class="status-indicator q-ma-sm">
        <q-icon
          :name="backendAtivo ? 'check_circle' : 'cancel'"
          :color="backendAtivo ? 'positive' : 'negative'"
          size="sm"
        />
        <span :class="backendAtivo ? 'text-positive' : 'text-negative'">
          {{
            backendAtivo
              ? " Conectado ao backend"
              : " Não foi possível conectar ao backend"
          }}
        </span>
      </div>
    </q-card>
  </q-page>
</template>

<script setup>
import { Notify } from "quasar";

import { onMounted, ref, computed } from "vue";
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
const ipTotem = ref(totemStore.ipTotem);
// const backendAtivo = ref(totemStore.backendAtivo);
const backendAtivo = computed(() => totemStore.backendAtivo);

const ipServidor = computed(() => totemStore.ipServidor);

// const load = ref(false);

async function autentica() {
  await totemStore.pingBackend();
  try {
    await totemStore.autenticaTotem();
  } catch (erro) {
    Notify.create({
      type: "negative",
      message: erro,
      // caption: "Verifique se o totem está ligado",
      position: "top",
      timeout: 2500,
      textColor: "white",
    });
    console.error("Falha na autenticação do totem:", erro);
    return; // ⚠️ Interrompe aqui se falhar
  }

  await totemStore.listaDiretorioRemoto();

  await totemStore.verificaDiretorioPacoteTotem(); //não tratei esse metodo la no totemStore com throw pq nao quero parar execucao, só quero verificar mesmo

  if (totemStore.existeDiretorio) {
    await totemStore.listaDiretorioLocal();
  }

  // console.log(totemStore.respostaDiretorioLocal.versaoTinker);

  if (totemStore.conectado) {
    Notify.create({
      type: "positive",
      message: "Totem conectado com sucesso!",
      // caption: "",
      position: "top",
      timeout: 1000,
      textColor: "black",
    });
    setTimeout(() => {
      router.push("/totem");
    }, 100);
  }
}
onMounted(async () => {
  await totemStore.pingBackend();
  console.log("onmounted indexpage");
});
</script>

<style scoped>
.my-card {
  width: 330px;
  border-radius: 10px;
  height: 400px;
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
  /* color: #1b2a35; */

  color: black;

  /* background-color: #53b7e8; */
  background-color: #ff7705;
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
