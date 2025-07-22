<template>
  <q-page class="geral flex flex-center">
    <!-- <q-img src="/imagens/fundo_plus_estacenter.PNG" style="height: 200px" /> -->
    <!-- <q-card class="my-card shadow-10"> -->

    <div class="row teste">
      <q-card class="my-card col-12 col-md-5 cardBotoes">
        <!-- Isso ocupa 100% no mobile e 50% no desktop -->
        <q-card-section class="titulos">
          <q-separator vertical color="blue" />
          <div class="text-h1 column items-center q-mb-md">
            <img src="../assets/logoPerto.png" width="120" />
          </div>

          <q-space></q-space>
          <div class="q-pa-sm">
            <div class="q-mb-md">
              <q-btn
                dense
                label="VERSÃO"
                icon="mdi-information-outline"
                class="q-mb-sm"
                rounded
                size="md"
                style="background-color: #f77100"
                @click="AtualizaVersao()"
                :loading="totemAtualizaStore.loadVersao"
                :disable="!totemStore.existeDiretorio"
              >
                <template v-slot:loading>
                  <q-spinner-gears class="on-left" />

                  Atualizando
                </template>
              </q-btn>
            </div>
            <div class="q-mb-md">
              <q-btn
                dense
                label="AUDIO ORIGINAL"
                icon="mdi-volume-high"
                style="background-color: #f77100"
                class="q-mb-sm"
                unelevated
                rounded
                size="md"
                @click="confirmAudioOriginal()"
                :disable="!totemStore.existeDiretorio"
                :loading="totemAtualizaStore.loadAudioOriginal"
              >
                <template v-slot:loading>
                  <q-spinner-gears class="on-left" />

                  Atualizando
                </template>
              </q-btn>
            </div>
            <div class="q-mb-md">
              <q-btn
                dense
                label="FUNDO DE TELA"
                icon="mdi-image-refresh"
                style="background-color: #f77100"
                class="q-mb-sm"
                unelevated
                rounded
                size="md"
                @click="atualizaNovoFundo()"
                :disable="!totemStore.existeDiretorio"
              >
                <!-- :loading="totemAtualizaStore.loadFundoTela" -->
                <template v-slot:loading>
                  <q-spinner-gears class="on-left" />

                  Atualizando
                </template>
              </q-btn>
            </div>

            <div class="q-mb-md">
              <q-btn
                dense
                label="Restaurar Dump"
                icon="mdi-database"
                style="background-color: #f77100"
                class="q-mb-sm"
                unelevated
                rounded
                size="md"
                @click="dialogDump = true"
                :disable="!totemStore.existeDiretorio"
              >
                <!-- :loading="totemAtualizaStore.loadFundoTela" -->
                <template v-slot:loading>
                  <q-spinner-gears class="on-left" />

                  Atualizando
                </template>
              </q-btn>
            </div>

            <!-- <div>
            <q-card-section>
              <q-uploader
                label="Restaurar Database"
                accept=".dump"
                url="http://localhost:9095/restaurar"
                field-name="arquivo"
                :form-fields="[{ name: 'ip', value: totemStore.resposta.ip }]"
                @uploaded="onUploadConcluido"
                style="max-width: 250px"
                dark
                color="yellow"
                text-color="black"
                bg-color="silver"
                auto-upload
                hide-upload-progress
                :disable="!totemStore.existeDiretorio"
              >
              </q-uploader>
            </q-card-section>
          </div> -->
          </div>
        </q-card-section>
      </q-card>

      <q-card class="my-card col-12 col-md-7 cardInfo">
        <q-card-section>
          <div class="text-h6">Informações do Totem</div>
          <q-separator spaced />
          <q-list>
            <q-item>
              <q-item-section avatar>
                <q-icon name="memory" />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  ><strong>CPU:</strong>
                  {{ totemStore.resposta.cpu }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="dns" />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  ><strong>IP:</strong>
                  {{ totemStore.resposta.ip }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="terminal" />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  ><strong>SO:</strong>
                  {{ totemStore.resposta.sistemaOperacional }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <!-- <q-item>
              <q-item-section avatar>
                <q-icon name="hourglass_empty" />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  ><strong>Uptime:</strong>
                  {{ totemStore.resposta.uptime }}</q-item-label
                >
              </q-item-section>
            </q-item> -->

            <q-item>
              <q-item-section avatar>
                <q-icon name="devices" />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  ><strong>Nome:</strong>
                  {{ totemStore.resposta.nomeEquipamento }}</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section avatar>
                <q-icon name="update" />
              </q-item-section>
              <q-item-section>
                <q-item-label
                  ><strong>Versão:</strong>
                  {{ totemStore.resposta.versaoAplicacao }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
          <div class="row justify-center q-ma-md">
            <q-btn
              label="Finalizar"
              icon="mdi-logout"
              color="negative"
              text-color="white"
              push
              dense
              class="q-ma-md"
              @click="totemStore.desconectaTotem(), logout()"
            />
          </div>

          <p
            v-if="totemAtualizaStore.statusDownload?.status === 'processing'"
            class="text-primary"
          >
            <q-icon
              name="cloud_download"
              color="primary"
              size="md"
              class="q-mr-sm"
            />
            Download em andamento... aguarde
          </p>
          <q-banner
            v-if="showBanner"
            class="bg-green-1 text-green-10 q-mb-md"
            rounded
            dense
          >
            <template v-slot:avatar>
              <q-icon name="check_circle" size="md" color="green-10" />
            </template>
            <div class="text-weight-medium">
              Download concluído com sucesso!
            </div>
          </q-banner>
        </q-card-section>
      </q-card>
    </div>

    <q-dialog
      v-model="dialogDump"
      backdrop-filter="blur(4px)"
      class="dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="max-width: 550px; width: 100%">
        <!-- Botão de fechar no topo direito -->
        <q-btn
          flat
          dense
          icon="close"
          round
          class="absolute-top-right q-ma-sm z-top"
          v-close-popup
        />

        <q-card-section>
          <div class="text-h6">Restaurar Banco de Dados</div>
          <div class="text-subtitle2 text-grey">
            Selecione o arquivo <code>.dump</code> para restaurar o banco no
            totem.
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-uploader
            class="full-width"
            label="Selecionar Arquivo"
            accept=".dump"
            url="http://localhost:9095/restaurar"
            field-name="arquivo"
            :form-fields="[{ name: 'ip', value: totemStore.resposta.ip }]"
            @uploaded="onUploadConcluido"
            @failed="onUploadErro"
            color="primary"
            text-color="white"
            auto-upload
            hide-upload-progress
            :disable="!totemStore.existeDiretorio"
          >
          </q-uploader>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <fundo-tela v-if="imagemStore.dialogAtivo"></fundo-tela>
  </q-page>
</template>

<script setup>
import FundoTela from "src/components/FundoTela.vue";
import { useQuasar } from "quasar";
const $q = useQuasar();
import { Notify, Dialog } from "quasar";
import { onMounted } from "vue";

import { ref, watch } from "vue";
import axios from "axios";
import { useTotemStore } from "../stores/totemStore";
import { useTotemAtualizaStore } from "../stores/totemAtualizaStore";
import { useImagemStore } from "../stores/imagemStore";
const imagemStore = useImagemStore();

const totemStore = useTotemStore();
const totemAtualizaStore = useTotemAtualizaStore();
const carregaDialogFundoTela = ref(imagemStore.dialogAtivo);
import { useRouter } from "vue-router"; // ✅ IMPORTANTE
const router = useRouter(); // ✅ HOOK DO VUE ROUTER
defineOptions({
  name: "InicioTotem",
});

const showBanner = ref(false);
const dialogDump = ref(false);

watch(
  () => totemAtualizaStore.statusDownload?.status,
  (newStatus) => {
    if (newStatus === "done") {
      showBanner.value = true;
      setTimeout(() => {
        showBanner.value = false;
      }, 3000); // 3 segundos
    }
  }
);

function AtualizaVersao() {
  var valor = null;
  if (totemStore.resposta.cpu == "Tinkerboard") {
    valor = totemStore.respostaDiretorioLocal.versaoTinker;
  } else {
    valor = totemStore.respostaDiretorioLocal.versaoPlus;
  }
  Dialog.create({
    title: "Versao ",
    message: "Escolha a versao:",
    options: {
      type: "radio",
      model: "",
      // inline: true
      // items: [
      //   { label: "Option 1", value: "opt1", color: "secondary" },
      //   { label: "Option 2", value: "opt2" },
      //   { label: "Option 3", value: "opt3" },
      // ],
      items: valor.map((v) => ({
        label: v,
        value: v,
        color: "secondary",
      })),
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    console.log("ddaata" + data);
    console.log(data.length);
    console.log(Object.keys(data).length);

    if (data !== null && data !== "") {
      try {
        await totemAtualizaStore.atualizaTotem(data);
        console.log(valor);

        await totemStore.carregaInfoTotem();

        Notify.create({
          message: "Versão atualizada!",
          color: "green-7",
          textColor: "white",
          icon: "mdi-check-circle-outline",
          position: "top-right",
          timeout: 2000,
          classes: "glossy shadow-5 rounded-borders text-body2",
        });
        console.log(">>>> OK, received", data);
      } catch (err) {
        console.log(err);

        Notify.create({
          message: err.message,
          color: "red-7",
          textColor: "white",
          icon: "mdi-alert-circle-outline",
          position: "top-right",
          timeout: 2000,
        });
      }
    } else {
      console.log("escolha um valor");
    }
  });
}

function confirmAudioOriginal() {
  $q.dialog({
    title: "Audios",
    message: "Deseja atualizar os audios originais?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await totemAtualizaStore.atualizaTotemAudioOriginal();
      Notify.create({
        message: "Audio Atualizado!",
        color: "green-7",
        textColor: "white",
        icon: "mdi-check-circle-outline",
        position: "top-right",
        timeout: 3000,
        classes: "glossy shadow-5 rounded-borders text-body2",
      });
      // console.log('>>>> OK')
    } catch (error) {
      Notify.create({
        message: error.message,
        color: "red-7",
        textColor: "white",
        icon: "mdi-alert-circle-outline",
        position: "top-right",
        timeout: 2000,
      });
    }
  });
}

async function atualizaNovoFundo() {
  imagemStore.dialogAtivo = true;
}

function AtualizaFundoTela() {
  var valor = null;

  Dialog.create({
    title: "Fundo tela ",
    message: "Escolha o fundo de tela:",
    options: {
      type: "radio",
      model: "",
      // inline: true
      // items: [
      //   { label: "Option 1", value: "opt1", color: "secondary" },
      //   { label: "Option 2", value: "opt2" },
      //   { label: "Option 3", value: "opt3" },
      // ],
      items: totemStore.respostaDiretorioLocal.fundo_tela.map((v) => ({
        label: v,
        value: v,
        color: "secondary",
      })),
    },
    cancel: true,
    persistent: true,
  }).onOk(async (data) => {
    if (data !== null && data !== "") {
      try {
        await totemAtualizaStore.atualizaFundoTela(data);
        console.log(valor);
        Notify.create({
          message: "Imagem fundo atualizado",
          color: "green-7",
          textColor: "white",
          icon: "mdi-check-circle-outline",
          position: "top-right",
          timeout: 3000,
          classes: "glossy shadow-5 rounded-borders text-body2",
        });
        console.log(">>>> OK, received", data);
      } catch (error) {
        Notify.create({
          message: error.message,
          color: "red-7",
          textColor: "white",
          icon: "mdi-alert-circle-outline",
          position: "top-right",
          timeout: 2000,
        });
      }
    }
  });
}

function onUploadConcluido(info) {
  console.log("Upload concluído:", info);
  totemStore.carregaInfoTotem();
  Notify.create({
    type: "positive",
    message: "Restore Database enviado com sucesso!",
    position: "top",
  });
}
function onUploadErro() {
  $q.notify({
    type: "negative",
    message: "Falha ao enviar o Dump.",
    caption: "",
    timeout: 4000,
    position: "top",
  });
}

function logout() {
  router.push("/"); // ou rota de login, se houver
  localStorage.removeItem("totem"); // ou qualquer chave que você salvou
  localStorage.removeItem("totemAtualiza");
  // opcional: limpar tudo
  // localStorage.clear()
}

function chamaDialogRestauraDump() {}

const count = ref(0);
onMounted(async () => {
  // await totemStore.verificaDiretorioPacoteTotem();
  if (totemStore.existeDiretorio) {
    console.log("Diretório existe ao carregar.");

    return;
  }
  console.log("Diretório não existe. Iniciando download...");

  var jobId = await totemAtualizaStore.baixaOracle();

  const checkStatus = setInterval(async () => {
    await totemAtualizaStore.status(jobId).then(() => {
      console.log(totemAtualizaStore.statusDownload.status);
      const status = totemAtualizaStore.statusDownload?.status;

      console.log("Status do download:", status);

      if (
        totemAtualizaStore.statusDownload?.status === "done" ||
        totemAtualizaStore.statusDownload?.status === "error"
      ) {
        clearInterval(checkStatus);

        if (totemAtualizaStore.statusDownload.status === "done") {
          totemStore.listaDiretorioLocal();
          // Notify.create({
          //   type: "positive",
          //   message: "Download concluido com sucesso!",
          //   position: "top",
          //   timeout: 1000,
          //   textColor: "white",
          // });
          totemStore.existeDiretorio = true;
        }
      }
    });
  }, 3000);
});
</script>

<style>
.my-card {
  /* width: 500px; */
  /* min-width: 300px; */
  border-radius: 2px;
  /* height: 1080px; */
  /* max-width: 800px; */

  /* height: fit-content; */
}
.cardInfo {
  background-color: white;
}
.cardBotoes {
  background-color: #1b2a35;
  /* width: 500px; */
}
.geral {
  /* opacity: 0.7; */
  /* background-image: url("/fundo3.png"); */
  font-family: "Kanit";
  /* background-color: #1b2a35; */

  /* background-size: 1466px 1000px; */
  /* min-height: 100vh; */
  /* height: 900px; */
  /* width: 900px; */
  padding: 16px;
}
.titulos {
  color: white;

  /* font-size: 25px; */
  text-align: center;
}
.q-btn {
  height: 30px;
  width: 170px;
}
.q-uploader {
  /* width: 200px; */
  /* width: 200px; */
}
.dialog {
  /* height: 500px; */
  /* background-color: silver; */
}
.teste {
  /* width: fit-content; */
  height: 470px;
}
</style>
