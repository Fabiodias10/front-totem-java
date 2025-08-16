<template>
  <q-page class="geral flex flex-center">
    <!-- <div v-if="$q.screen.xs">XS</div>
    <div v-else-if="$q.screen.sm">SM</div>
    <div v-else-if="$q.screen.md">MD</div>
    <div v-else-if="$q.screen.lg">LG</div>
    <div v-else>XL</div> -->
    <div
      class="row q-gutter-md justify-center items-center"
      style="width: 100%"
    >
      <div class="col-xs-12 col-sm-5 col-md-4 col-lg-3">
        <q-card class="my-card cardBotoes shadow-3">
          <!-- Isso ocupa 100% no mobile e 50% no desktop -->
          <div class="titulos">
            <!-- <q-separator vertical color="blue" /> -->
            <div class="text-h1 column items-center">
              <img
                src="../assets/logoPerto.png"
                width="100px"
                class="q-pt-sm"
              />
            </div>

            <!-- <q-space></q-space> -->

            <q-card class="cards shadow-4 q-ma-md" style="min-height: 160px">
              <div class="text-overline" style="color: Black">Sistema</div>
              <!-- <div class="text-h6" style="color: Black">Sistema</div> -->

              <div class="q-gutter-md">
                <div>
                  <q-btn
                    dense
                    label="Atualiza VERSÃO"
                    icon="mdi-application-braces-outline"
                    rounded
                    push
                    size="md"
                    style="background-color: #0f909a; color: white"
                    :style="{ width: btnWidth }"
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
                <div>
                  <q-btn
                    dense
                    label="AUDIO ORIGINAL"
                    icon="mdi-volume-high"
                    style="background-color: #0f909a; color: white"
                    :style="{ width: btnWidth }"
                    class=""
                    rounded
                    push
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
                <div>
                  <q-btn
                    dense
                    label="FUNDO Padrão"
                    icon="mdi-image-refresh"
                    style="background-color: #0f909a; color: white"
                    :style="{ width: btnWidth }"
                    class=""
                    unelevated
                    push
                    rounded
                    size="md"
                    @click="atualizaNovoFundo()"
                    :disable="!totemStore.existeDiretorio"
                    :loading="totemAtualizaStore.loadFundoTela"
                  >
                    <template v-slot:loading>
                      <q-spinner-gears class="on-left" />

                      Atualizando
                    </template>
                  </q-btn>
                </div>
              </div>
            </q-card>

            <q-card class="cards q-ma-md" style="min-height: 120px">
              <div class="text-overline" style="color: Black">Database</div>
              <!-- <div class="text-h6" style="color: Black">Database</div> -->
              <div class="justify-center items-center full-height q-gutter-md">
                <div>
                  <q-btn
                    dense
                    label="Gerar Dump"
                    icon="mdi-database-export"
                    style="background-color: #395f7a"
                    :style="{ width: btnWidth }"
                    class=""
                    unelevated
                    push
                    rounded
                    size="md"
                    :disable="!totemStore.existeDiretorio"
                    @click="confirmDump()"
                    :loading="totemStore.loadDump"
                  >
                    <template v-slot:loading>
                      <q-spinner-gears class="on-left" />

                      Atualizando
                    </template>
                    <template v-slot:icon>
                      <q-icon
                        name="mdi-database-export"
                        style="font-size: 16px"
                      />
                    </template>
                  </q-btn>
                </div>
                <div>
                  <q-btn
                    dense
                    label="Restaurar Dump"
                    icon="mdi-database-import"
                    style="background-color: #395f7a"
                    :style="{ width: btnWidth }"
                    class="q-mb-sm"
                    unelevated
                    push
                    rounded
                    size="md"
                    @click="dialogDump = true"
                    :disable="!totemStore.existeDiretorio"
                    :loading="totemAtualizaStore.loadFundoTela"
                  >
                    <template v-slot:loading>
                      <q-spinner-gears class="on-left" />

                      Atualizando
                    </template>
                  </q-btn>
                </div>
              </div>
            </q-card>

            <q-card class="cards q-ma-md" style="min-height: 125px">
              <!-- <div class="text-overline" style="color: Black">Midia</div> -->
              <div class="text-overline" style="color: Black">
                Midia Personalizada
              </div>
              <div class="justify-center items-center q-gutter-md full-height">
                <div>
                  <q-btn
                    dense
                    label="Audio Entrada"
                    icon="mdi-volume-high
                "
                    style="background-color: #176399"
                    :style="{ width: btnWidth }"
                    class=""
                    unelevated
                    push
                    rounded
                    size="md"
                    @click="dialogMidiaEntrada = true"
                    :disable="!totemStore.existeDiretorio"
                  >
                    <!-- :loading="totemAtualizaStore.loadFundoTela" -->
                    <template v-slot:loading>
                      <q-spinner-gears class="on-left" />

                      Atualizando
                    </template>
                  </q-btn>
                </div>

                <div>
                  <q-btn
                    dense
                    label="Audio Saida"
                    icon="mdi-volume-high"
                    style="background-color: #176399"
                    :style="{ width: btnWidth }"
                    class=""
                    unelevated
                    rounded
                    push
                    size="md"
                    @click="dialogMidiasaida = true"
                    :disable="!totemStore.existeDiretorio"
                  >
                    <!-- :loading="totemAtualizaStore.loadFundoTela" -->
                    <template v-slot:loading>
                      <q-spinner-gears class="on-left" />

                      Atualizando
                    </template>
                  </q-btn>
                </div>

                <div>
                  <q-btn
                    dense
                    label="Fundo Tela"
                    icon="mdi-image-edit-outline"
                    style="background-color: #176399"
                    :style="{ width: btnWidth }"
                    class="q-mb-sm"
                    unelevated
                    rounded
                    push
                    size="md"
                    @click="dialogMidiaFundoPersonalizado = true"
                  >
                    <!-- :disable="true" -->
                    <!-- :disable="!totemStore.existeDiretorio" -->
                    <!-- :loading="totemAtualizaStore.loadFundoTela" -->
                    <template v-slot:loading>
                      <q-spinner-gears class="on-left" />

                      Atualizando
                    </template>
                  </q-btn>
                </div>
              </div>
            </q-card>
          </div>
        </q-card>
      </div>

      <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="my-card cardInfo shadow-3">
          <q-card-section>
            <div class="text-h6 row justify-center items-center">
              Informações do Totem
            </div>
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

              <q-item>
                <q-item-section avatar>
                  <q-icon name="update" />
                </q-item-section>
                <q-item-section>
                  <q-item-label
                    ><strong>Uptime:</strong>
                    {{ totemStore.resposta.uptime }}</q-item-label
                  >
                </q-item-section>
              </q-item>

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
                  <q-icon name="extension" />
                </q-item-section>
                <q-item-section>
                  <q-item-label
                    ><strong>Versão:</strong>
                    {{ totemStore.resposta.versaoAplicacao }}</q-item-label
                  >
                </q-item-section>
              </q-item>
              <q-item class="flex-center">
                <q-icon
                  :name="statusIcone"
                  :color="statusCor"
                  size="md"
                  class="q-mr-sm"
                />
                <strong>{{ statusTexto }}</strong>
              </q-item>
            </q-list>
            <div class="row justify-center">
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
            <q-banner
              v-if="totemAtualizaStore.statusDownload?.status === 'processing'"
              class="bg-blue-1 text-blue-10 q-mb-md"
              rounded
              dense
            >
              <template v-slot:avatar>
                <q-icon name="cloud_download" color="blue-10" size="md" />
              </template>
              <div class="text-weight-medium">
                Download em andamento... aguarde
              </div>
            </q-banner>

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
    </div>

    <q-dialog
      v-model="dialogMidiasaida"
      backdrop-filter="blur(4px)"
      class="dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="max-width: 350px; width: 100%">
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
          <!-- <div class="text-h6">Selecione audio para Totem de Saida</div> -->
          <div class="text-subtitle2 text-grey">
            Selecione o audio personalizado <code>.Mp3</code>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-uploader
            class="full-width"
            label="Audio Totem Saida"
            accept=".mp3"
            url="http://192.168.0.155:9095/MidiaSaida"
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

    <q-dialog
      v-model="dialogMidiaEntrada"
      backdrop-filter="blur(4px)"
      class="dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="max-width: 350px; width: 100%">
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
          <!-- <div class="text-h6">Selecione audio para totem entrada</div> -->
          <div class="text-subtitle2 text-grey">
            Selecione o audio personalizado <code>.Mp3</code>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-uploader
            class="full-width"
            label="Audio Totem Entrada"
            accept=".mp3"
            url="http://192.168.0.155:9095/MidiaEntrada"
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

    <q-dialog
      v-model="dialogDump"
      backdrop-filter="blur(4px)"
      class="dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="max-width: 350px; width: 100%">
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
          <!-- <div class="text-h6">Restaurar Banco de Dados</div> -->
          <div class="text-subtitle2 text-grey">
            Selecione o arquivo <code>.dump</code> para restaurar o banco do
            totem.
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-uploader
            class="full-width"
            label="Arquivo dump"
            accept=".dump"
            url="http://192.168.0.155:9095/restaurar"
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

    <q-dialog
      v-model="dialogMidiaFundoPersonalizado"
      backdrop-filter="blur(4px)"
      class="dialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="max-width: 350px; width: 100%">
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
          <!-- <div class="text-h6">Selecione audio para Totem de Saida</div> -->
          <div class="text-subtitle2 text-grey">
            Selecione o fundo personalizado <code></code>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-uploader
            class="full-width"
            label="Fundo Totem Personalizado"
            accept="image/*"
            url="http://192.168.0.155:9095/FundoPersonalizado"
            field-name="arquivo"
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
import { onMounted, computed } from "vue";

const btnWidth = $q.screen.lt.sm ? "100%" : "80%";

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

const statusCor = computed(() =>
  totemStore.statusConexaoSessaoSSH ? "green" : "red"
);
const statusTexto = computed(() =>
  totemStore.statusConexaoSessaoSSH
    ? "Conectado"
    : "Desconectado, verifique conexão"
);
const statusIcone = computed(() =>
  totemStore.statusConexaoSessaoSSH ? "check_circle" : "cancel"
);

defineOptions({
  name: "InicioTotem",
});

const showBanner = ref(false);
const dialogDump = ref(false);
const dialogMidiaEntrada = ref(false);
const dialogMidiasaida = ref(false);
const dialogMidiaFundoPersonalizado = ref(false);

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

function confirmDump() {
  $q.dialog({
    title: "PG_DUMP",
    message: "Deseja gerar o arquivo .Dump do totem?",
    cancel: true,
    persistent: true,
  }).onOk(async () => {
    try {
      await totemStore.dumpTotem();
      Notify.create({
        message: "     Dump realizado com sucesso     ",
        caption: "     salvo em C:/temp/DumpTotem     ",
        color: "green-10",
        textColor: "white",
        icon: "mdi-check-circle-outline",
        position: "top",
        timeout: 4000,
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
    message: "Arquivo enviado com sucesso!",
    position: "top",
  });
}
function onUploadErro() {
  $q.notify({
    type: "negative",
    message: "Falha ao enviar.",
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
  // Executa imediatamente
  //Para executar imediatamente e continuar a cada 3 segundos, basta chamar a função logo antes do setInterval
  (async () => {
    try {
      await totemStore.statusConexaoSsh();
    } catch (erro) {
      console.error("Erro na verificação de status SSH:", erro);
      totemStore.desconectaTotem();
    }
  })();

  const intervalo = setInterval(async () => {
    try {
      await totemStore.statusConexaoSsh();
    } catch (erro) {
      console.error("Erro na verificação de status SSH:", erro);
      clearInterval(intervalo);
      totemStore.desconectaTotem();
    }
  }, 10000);

  // await totemStore.verificaDiretorioPacoteTotem();
  if (totemStore.existeDiretorio) {
    console.log("Diretório existe ao carregar.");

    return;
  }
  console.log("Diretório não existe. Iniciando download...");

  var jobId = await totemAtualizaStore.baixaOracle();

  (async () => {
    try {
      await totemAtualizaStore.status(jobId);
    } catch (erro) {}
  })();

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
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap");
.my-card {
  /* width: 500px; */
  /* min-width: 300px; */
  /* border-radius: 10px; */
  /* height: 1080px; */
  /* max-width: 800px; */

  /* height: fit-content; */
}
.cardInfo {
  background-color: #1b2a35e8;
  color: white;
  font-family: "Inter", sans-serif;
  border-radius: 0;
  height: 530px;
  width: 100%;

  /* font-weight: bold; */
}
.cardBotoes {
  /* background-color: #0f172a; */
  /* background-color: #4986b3; */
  background-color: #1b2a3573;
  border-radius: 0;
  /* min-width: 250px; */
  height: 530px;
  /* font-size: small; */
  /* width: 100%; */
}
.q-btn {
  /* text-align: end; */
}
.geral {
  /* opacity: 0.7; */
  background-image: url("/fundo3.png");
  /* font-family: "Kanit"; */
  /* background-color: #176399; */

  background-size: 1466px 1000px;
  /* font-family: sans-serif; */
  /* text-align: start; */
  /* min-height: 100vh; */
  /* height: 900px; */
  /* width: 900px; */
  /* padding: 16px; */
}
.titulos {
  color: white;

  /* font-size: 25px; */
  text-align: center;
}
.q-btn {
  max-height: 25px;
  max-width: 220px;
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
  /* max-width: 660px;
  max-height: 550px; */
  border: solid rgb(145, 163, 224) 1px;
  border-radius: 2px;
}
.cards {
  /* border: solid black 1px; */
  border-radius: 10px;

  background-color: rgb(255, 255, 255);
}
.containner {
  /* max-width: 850px; */
  /* height: fit-content; */
  /* height: 950px; */
  /* align-items: center; */
}
.q-page.geral {
  min-height: 100vh; /* altura total da tela */
}
.row {
  /* border: 2px solid red; */
}
</style>
