<template>
  <q-page class="geral col-12 column self-center items-center justify-center">
    <q-card class="row my-card shadow-3">
      <!-- <q-card-section class="row justify-end items-center titulos">
        <div class="text-h6">Logout</div>
        <div>
          <q-btn dense icon="logout" @click="logout" flat round color="white" />
        </div>
      </q-card-section> -->

      <q-card-section class="titulos">
        <q-separator vertical color="blue" />
        <div class="text-h1 column items-center q-mb-xl">
          <img src="../assets/logoPerto.png" width="140" />
        </div>

        <q-space></q-space>
        <div class="q-pa-sm">
          <div class="q-mb-md">
            <q-btn
              size="md"
              tabindex="3"
              style="background-color: white; color: black"
              push
              label="Versão"
              class="q-mx-sm full-width"
              @click="AtualizaVersao()"
              :loading="totemStore.load"
            ></q-btn>
          </div>
          <div class="q-mb-md">
            <q-btn
              size="md"
              tabindex="3"
              style="background-color: white; color: black"
              push
              label="Audio original"
              class="q-mx-sm full-width"
              @click="confirmAudioOriginal()"
              :loading="totemStore.load"
            ></q-btn>
          </div>
          <div class="q-mb-md">
            <q-btn
              size="md"
              tabindex="3"
              style="background-color: white; color: black"
              push
              label="Atualiza fundo de tela"
              class="q-mx-sm full-width"
              @click="AtualizaFundoTela()"
              :loading="totemStore.load"
            ></q-btn>
          </div>
          <div>
            <q-card-section>
              <q-uploader
                label="Audio personalizado"
                accept="audio/*"
                url="http://localhost:8080/upload"
                field-name="file"
                @uploaded="onUploadConcluido"
                style="max-width: 230px"
              />
            </q-card-section>
          </div>
        </div>
      </q-card-section>
      <q-card class="col-6 q-pa-sm my-card" flat bordered>
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

            <!-- <q-item>
              <q-item-section avatar>
                <q-icon name="device_hub" />
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  <strong>Modelo Totem:</strong>
                  {{ dadosTotem.modeloTotem || "Não identificado" }}
                </q-item-label>
              </q-item-section>
            </q-item> -->

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
                <q-icon name="hourglass_empty" />
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
        </q-card-section>
      </q-card>
    </q-card>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
const $q = useQuasar();
import { Notify, Dialog } from "quasar";
import { onMounted } from "vue";

import { ref } from "vue";
import axios from "axios";
import { useTotemStore } from "../stores/totemStore";
import { useTotemAtualizaStore } from "../stores/totemAtualizaStore";
const totemStore = useTotemStore();
const totemAtualizaStore = useTotemAtualizaStore();

defineOptions({
  name: "InicioTotem",
});

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
  })
    .onOk(async (data) => {
      await totemAtualizaStore.atualizaTotem(data);
      console.log(valor);
      Notify.create({
        type: "positive",
        message: "Versao atualizada com sucesso!",
        position: "top",
      });
      console.log(">>>> OK, received", data);
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
    })
    .onDismiss(() => {
      console.log("I am triggered on both OK and Cancel");
    });
}

function confirmAudioOriginal() {
  $q.dialog({
    title: "Audios",
    message: "Deseja atualizar os audios originais?",
    cancel: true,
    persistent: true,
  })
    .onOk(async () => {
      await totemAtualizaStore.atualizaTotemAudioOriginal();
      Notify.create({
        type: "positive",
        message: "Audio atualizado com sucesso!",
        position: "top",
      });
      // console.log('>>>> OK')
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
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
  })
    .onOk(async (data) => {
      await totemAtualizaStore.atualizaTotem(data);
      console.log(valor);
      Notify.create({
        type: "positive",
        message: "Versao atualizada com sucesso!",
        position: "top",
      });
      console.log(">>>> OK, received", data);
    })
    .onCancel(() => {
      console.log(">>>> Cancel");
    })
    .onDismiss(() => {
      console.log("I am triggered on both OK and Cancel");
    });
}

function onUploadConcluido(info) {
  console.log("Upload concluído:", info);
  Notify.create({
    type: "positive",
    message: "Arquivo enviado com sucesso!",
    position: "top",
  });
}

function logout() {
  totemStore.$reset();
  router.push("/"); // ou rota de login, se houver
}

const count = ref(0);
onMounted(async () => {
  // alert(totemStore.respostaDiretorioLocal.versaoTinker);
  if (!totemStore.resposta) {
    await totemStore.autenticaTotem();
  }
});
</script>

<style>
.my-card {
  min-width: 300px;
  border-radius: 5px;
  /* height: 450px; */
}
.geral {
  opacity: 1;
  /* background-image: url("/fundo3.png"); */
  font-family: "Kanit";

  /* background-size: 1466px 1000px; */
}
.titulos {
  background-color: #1b2a35;
  color: white;
  font-family: "Kanit";
  font-size: 16px;
}
</style>
