<template>
  <q-page>
    <div class="q-gutter-md row wrap justify-start">
      <q-card
        v-for="imagem in imagens"
        :key="imagem"
        class="q-ma-xs"
        flat
        bordered
        :class="{ 'bg-blue-1': imagem === imagemSelecionada }"
        style="width: 150px; cursor: pointer"
        @click="selecionarImagem(imagem)"
      >
        <q-img :src="`/imagens/${imagem}`" />
        <q-card-section class="text-center">
          <div class="text-caption">{{ imagem }}</div>
        </q-card-section>
      </q-card>
    </div>

    <div class="q-mt-md">
      <q-banner v-if="imagemSelecionada" class="bg-primary text-white">
        📷 Imagem selecionada: {{ imagemSelecionada }}
      </q-banner>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
const dialog = ref(true);
const imagens = [
  "fundo_lite_estacenter.png",
  "fundo_lite_indigo.png",
  "fundo_next_1280_720.png",
  "fundo_next_768_1024.png",
  "fundo_plus_estacenter.PNG",
  "fundo_plus_indigo.png",
];
const imagemSelecionada = ref(null);

function selecionarImagem(nome) {
  imagemSelecionada.value = nome;
}
</script>

<style></style>
