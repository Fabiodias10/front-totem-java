// stores/useImagemStore.js
import { defineStore } from "pinia";

export const useImagemStore = defineStore("imagem", {
  state: () => ({
    imagemSelecionada: null,
    dialogAtivo: false,
  }),
  actions: {
    setImagem(imagem) {
      this.imagemSelecionada = imagem;
    },
  },
});
