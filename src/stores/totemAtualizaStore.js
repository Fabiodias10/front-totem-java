import { defineStore } from "pinia";
import axios from "axios";

export const useTotemAtualizaStore = defineStore("totemAtualiza", {
  state: () => ({
    resposta: null,
    respostaAudioOriginal: null,
    respostaDownload: null,

    load: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async baixaOracle() {
      try {
        const response = await axios.get(
          "http://localhost:8080/oracle/download/totem/pacote_atualiza_totem.zip"
          // {
          //   ip: this.ipTotem,
          // }
        );
        console.log(response.data);

        this.respostaDownload = response.data;
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        this.respostaDownload = null;
      } finally {
        console.log("Finally do autenticaTotem");

        this.load = false;
      }
    },
    async atualizaTotem(versao) {
      this.load = true;
      try {
        const response = await axios.get(
          "http://localhost:8080/totem/update/versao/" + versao
          // {
          //   ip: this.ipTotem,
          // }
        );
        console.log(response.data);

        this.resposta = response.data;
        this.conectado = true;
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        (this.resposta = null), (this.conectado = false);
      } finally {
        console.log("Finally do autenticaTotem");

        this.load = false;
      }
    },
    async atualizaTotemAudioOriginal() {
      this.load = true;
      try {
        const response = await axios.get(
          "http://localhost:8080/totem/update/audio_original"
          // {
          //   ip: this.ipTotem,
          // }
        );
        console.log(response.data);

        this.respostaAudioOriginal = response.data;
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        this.respostaAudioOriginal = null;
      } finally {
        console.log("Finally do autenticaTotem");

        this.load = false;
      }
    },
  },
  persist: true, //  ativa persistência automática
});
