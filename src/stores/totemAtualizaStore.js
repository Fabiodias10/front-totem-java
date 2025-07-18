import { defineStore } from "pinia";
import axios from "axios";

export const useTotemAtualizaStore = defineStore("totemAtualiza", {
  state: () => ({
    resposta: null,
    respostaAudioOriginal: null,
    respostaDownload: null,
    versaoAtualizada: null,
    audioAtualizado: null,
    fundoTelaAtualizado: null,
    statusDownload: null,

    loadVersao: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    logout() {
      (this.resposta = null),
        (this.respostaAudioOriginal = null),
        (this.respostaDownload = null),
        (this.versaoAtualizada = null),
        (this.audioAtualizado = null),
        (this.fundoTelaAtualizado = null),
        (loadVersao = null);
    },
    async baixaOracle() {
      try {
        const response = await axios.post(
          "http://localhost:9095/oracle/iniciar/totem/pacote_atualiza_totem.zip"
          // {
          //   ip: this.ipTotem,
          // }
        );

        this.respostaDownload = response.data;

        // const interval = setInterval(() => {
        //   this.status(response.data.jobId).then(() => {
        //     console.log(this.statusDownload.status);

        //     if (
        //       this.statusDownload?.status === "done" ||
        //       this.statusDownload?.status === "error"
        //     ) {
        //       clearInterval(interval);
        //     }
        //   });
        // }, 3500);
        return response.data.jobId;
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        this.respostaDownload = null;
      } finally {
        console.log("Finally do autenticaTotem");

        this.load = false;
      }
    },

    async status(job) {
      try {
        const response = await axios.get(
          "http://localhost:9095/oracle/status/" + job
          // {
          //   ip: this.ipTotem,
          // }
        );
        console.log(response.data);

        this.statusDownload = response.data;
      } catch (error) {
        console.log("Erro status download: ", error);
        this.statusDownload = null;
      }
    },

    async atualizaTotem(versao) {
      this.loadVersao = true;
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/update/versao/" + versao
          // {
          //   ip: this.ipTotem,
          // }
        );
        console.log(response.data);

        this.resposta = response.data;
      } catch (error) {
        this.versaoAtualizada = null;
        console.log("Erro ao conectar: ", error);
        (this.resposta = null), (this.conectado = false);
      } finally {
        // console.log("Finally do autenticaTotem");
        this.versaoAtualizada = "* Versão atualizada: " + versao;

        this.loadVersao = false;
      }
    },
    async atualizaTotemAudioOriginal() {
      this.load = true;
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/update/audio_original"
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

    async atualizaFundoTela(imagem) {
      this.loadVersao = true;
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/update/fundo/" + imagem
          // {http://localhost:8080/totem/update/fundo/fundo_plus_indigo.png
          //   ip: this.ipTotem,
          // }
        );
        console.log(response.data);

        this.resposta = response.data;
      } catch (error) {
        // this.versaoAtualizada = null;
        console.log("Erro ao conectar: ", error);
        // (this.resposta = null), (this.conectado = false);
      } finally {
        // console.log("Finally do autenticaTotem");
        // this.versaoAtualizada = "* Versão atualizada: " + versao;

        this.loadVersao = false;
      }
    },
  },
  persist: true, //  ativa persistência automática
});
