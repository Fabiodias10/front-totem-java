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
    loadAudioOriginal: false,
    loadFundoTela: false,
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
      const totemStore = useTotemStore(); // ✅ Acessa o outro store
      const ip = totemStore.ipServidor;
      try {
        const response = await axios.post(
          "http://localhost:9095/oracle/iniciar/totem/pacote_atualiza_totem.zip"
        );

        this.respostaDownload = response.data;
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
      const totemStore = useTotemStore(); // ✅ Acessa o outro store
      const ip = totemStore.ipServidor;
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
      const totemStore = useTotemStore(); // ✅ Acessa o outro store
      const ip = totemStore.ipServidor;
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
        // Aqui você pode lançar um erro com mais detalhes se desejar
        throw new Error("Erro ao atualizar versão do totem.");
      } finally {
        // console.log("Finally do autenticaTotem");
        this.versaoAtualizada = "* Versão atualizada: " + versao;

        this.loadVersao = false;
      }
    },
    async atualizaTotemAudioOriginal() {
      const totemStore = useTotemStore(); // ✅ Acessa o outro store
      const ip = totemStore.ipServidor;
      this.loadAudioOriginal = true;
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
        throw new Error("Erro ao atualizar Audios originais");
      } finally {
        console.log("Finally do autenticaTotem");

        this.loadAudioOriginal = false;
      }
    },

    async atualizaFundoTela(imagem) {
      const totemStore = useTotemStore(); // ✅ Acessa o outro store
      const ip = totemStore.ipServidor;
      this.loadFundoTela = true;
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/update/fundo/" + imagem
          // {http://localhost:8080/totem/update/fundo/fundo_plus_indigo.png
          //   ip: this.ipTotem,
          // }
        );
        console.log(response.data);

        this.fundoTelaAtualizado = true;
        Notify.create({
          message: "Imagem fundo atualizada",
          color: "green-7",
          textColor: "white",
          icon: "mdi-check-circle-outline",
          position: "top-right",
          timeout: 3000,
          classes: "glossy shadow-5 rounded-borders text-body2",
        });
      } catch (error) {
        // this.versaoAtualizada = null;
        console.log("Erro ao conectar: ", error);
        // (this.resposta = null), (this.conectado = false);
        this.fundoTelaAtualizado = false;
        throw new Error("Erro ao atualizar fundo de tela");
      } finally {
        // console.log("Finally do autenticaTotem");
        // this.versaoAtualizada = "* Versão atualizada: " + versao;
        imagemStore.dialogAtivo = false;
        this.loadFundoTela = false;
      }
    },
  },
  persist: true, //  ativa persistência automática
});
