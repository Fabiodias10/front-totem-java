<template>
  <q-page class="q-pa-md">
    <q-card class="geralFundoTela">
      <q-dialog
        v-model="dialogFundoTela"
        backdrop-filter="blur(4px)"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="q-pa-md">
          <q-card-section>
            <div class="text-h6">Escolha o fundo de tela</div>
            <div class="text-subtitle2 text-grey">
              <!-- Selecione o arquivo <code>.dump</code> para restaurar o banco no
            totem. -->
            </div>
          </q-card-section>
          <div class="row q-gutter-md justify-center q-mt-sm">
            <q-card
              v-for="imagem in imagens"
              :key="imagem"
              bordered
              class="col-xs-6 col-sm-4 col-md-3 col-lg-2 cardImagem"
              :class="{ 'selected-card': imagem === imagemSelecionada }"
              style="cursor: pointer; transition: 0.3s"
              @click="imagemSelecionada = imagem"
            >
              <q-img :src="`/imagens/${imagem}`" spinner-color="primary" />

              <!-- <q-card-section class="text-center q-pa-xs">
                <div class="text-caption ellipsis" :title="imagem">
                  {{ imagem }}
                </div>
              </q-card-section> -->
            </q-card>
          </div>
          <q-card-actions align="right" class="q-mt-md">
            <q-btn
              flat
              label="Cancelar"
              color="negative"
              @click="imagemStore.dialogAtivo = false"
              v-close-popup
            />

            <q-btn
              flat
              label="OK"
              color="primary"
              @click="confirmarSelecao"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </q-page>
</template>

<script setup>
import { Notify } from "quasar";
import { ref } from "vue";
import { useTotemStore } from "../stores/totemStore";
import { useTotemAtualizaStore } from "../stores/totemAtualizaStore";
import { useImagemStore } from "../stores/imagemStore";
const totemStore = useTotemStore();
const totemAtualizaStore = useTotemAtualizaStore();
const imagemStore = useImagemStore();
const imagemSelecionada = ref(null);

const dialogFundoTela = ref(imagemStore.dialogAtivo);
// const dialogFundoTela = ref(true);

async function confirmarSelecao() {
  imagemStore.setImagem(imagemSelecionada.value);

  if (imagemSelecionada.value != null) {
    try {
      await totemAtualizaStore.atualizaFundoTela(imagemSelecionada.value);
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
  } else {
    console.log("nehuma imagem selecionada");
    imagemStore.dialogAtivo = false;
  }
}

const imagens = [
  "fundo_lite_estacenter.png",
  "fundo_lite_indigo.png",
  "fundo_lite_next_768_1024.PNG",
  "fundo_plus_estacenter.PNG",
  "fundo_plus_indigo.png",
  "fundo_plus_next_1280_720.PNG",
];
</script>

<style scoped>
.selected-card {
  border: 10px solid orange;
  box-shadow: 0 12px 12px rgba(25, 118, 210, 0.4);
  transform: scale(1.02);
}
.q-img__image {
  /* border-bottom: 5px solid #ccc; */
}
.q-card:hover {
  transform: scale(1.02);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15);
}

.cardImagem {
  width: 150px;
  height: fit-content;
  /* min-height: 170px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* justify-items: center; */
  justify-content: center;
  /* justify-self: center; */
}
.q-img {
  /* width: 100px; */
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  /* text-align: center; */
}
</style>
