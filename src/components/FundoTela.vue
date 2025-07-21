<template>
  <q-page class="q-pa-md">
    <q-dialog
      v-model="dialog"
      backdrop-filter="blur(4px)"
      class="dialog"
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
        <div class="row q-gutter-md justify-start">
          <q-card
            v-for="imagem in imagens"
            :key="imagem"
            bordered
            class="col-xs-6 col-sm-4 col-md-3 col-lg-2 cardImagem"
            :class="{ 'selected-card': imagem === imagemSelecionada }"
            style="cursor: pointer; transition: 0.3s"
            @click="imagemSelecionada = imagem"
          >
            <q-img
              :src="`/imagens/${imagem}`"
              spinner-color="primary"
              style="
                object-fit: cover;
                object-position: center center;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            />

            <q-card-section class="text-center q-pa-xs">
              <div class="text-caption ellipsis" :title="imagem">
                {{ imagem }}
              </div>
            </q-card-section>
          </q-card>
          <q-card-actions>
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </div>

        <q-banner
          v-if="imagemSelecionada"
          class="bg-primary text-white q-mt-lg"
        >
          🖼️ Imagem selecionada: {{ imagemSelecionada }}
        </q-banner>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const dialog = ref(true);

const imagens = [
  "fundo_lite_estacenter.png",
  "fundo_lite_indigo.png",
  "fundo_lite_next_768_1024.png",
  "fundo_plus_estacenter.PNG",
  "fundo_plus_indigo.png",
  "fundo_plus_next_1280_720.png",
];

const imagemSelecionada = ref(null);
</script>

<style scoped>
.selected-card {
  border: 2px solid #1976d2;
  box-shadow: 0 2px 12px rgba(25, 118, 210, 0.4);
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
  width: 163px;
  height: fit-content;

  text-align: center;
  /* height: 350px; */
}
.q-img {
  width: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.q-card {
  background-color: white;
  /* height: 350px; */
}
</style>
