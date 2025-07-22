import { defineStore } from "pinia";
import axios from "axios";

export const useTotemStore = defineStore("totem", {
  state: () => ({
    ipTotem: "192.168.0.20",
    conectado: false,
    resposta: null,
    respostaDiretorioLocal: null,
    respostaDiretorioRemoto: null,
    load: false,
    existeDiretorio: null,
    backendAtivo: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    // logout() {
    //   (this.ipTotem = null),
    //     (this.conectado = null),
    //     (this.resposta = null),
    //     (this.respostaDiretorioLocal = null),
    //     (this.respostaDiretorioRemoto = null),
    //     (this.load = null),
    //     (this.existeDiretorio = null);
    // },

    async pingBackend() {
      try {
        const response = await axios.get("http://localhost:9095/totem/ping");
        // const response = await axios.get("http://localhost:9095/actuator/health");

        if (response.status === 200) {
          this.backendAtivo = true;
        }
      } catch (error) {
        this.backendAtivo = false;
        throw error;
      }
    },

    async autenticaTotem() {
      this.load = true;
      try {
        const response = await axios.post(
          "http://localhost:9095/totem/conecta",
          {
            ip: this.ipTotem,
          }
        );
        console.log("autenticaTotem ", response.data);

        this.resposta = response.data;
        this.conectado = true;
      } catch (error) {
        (this.resposta = null), (this.conectado = false);
        throw error.response?.data?.mensagem || "Erro desconhecido";
      } finally {
        this.load = false;
      }
    },

    async carregaInfoTotem() {
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/carregaInfoTotem"
        );

        this.resposta = response.data;
      } catch (error) {
        this.resposta = null;
        throw error.response?.data?.mensagem || "Erro desconhecido";
      } finally {
      }
    },
    async verificaDiretorioPacoteTotem() {
      try {
        const response = await axios.get(
          "http://localhost:9095/oracle/verifica_pacote_totem"
        );
        console.log("verificaDiretorioPacoteTotem: ", response.data);

        this.existeDiretorio = true;
      } catch (error) {
        console.log("Erro ao verificaDiretorioPacoteTotem: ", error);
        this.existeDiretorio = false;
        // throw error;
      } finally {
      }
    },

    async listaDiretorioLocal() {
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/listar_diretorio_local"
        );
        console.log("listaDiretorioLocal ", response.data);

        this.respostaDiretorioLocal = response.data;
      } catch (error) {
        console.log(
          "Erro ao listaDiretorioLocal: ",
          error.response.data.mensagem
        );
        this.respostaDiretorioLocal = null;
        throw error;
      } finally {
      }
    },

    async listaDiretorioRemoto() {
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/listar_Diretorio_remoto"
        );
        console.log("listaDiretorioRemoto ", response.data);

        this.respostaDiretorioRemoto = response.data;
      } catch (error) {
        console.log("Erro ao listaDiretorioRemoto: ", error);
        this.respostaDiretorioRemoto = null;
        throw error; // ⚠️ Propaga o erro para o `autentica()` capturar
      } finally {
      }
    },

    async desconectaTotem() {
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/desconecta_sessao_ssh"
        );
        console.log("desconectaTotem ", response.data);

        this.conectado = response.data;
      } catch (error) {
        console.log("DesconectaTotem: ", error);
        // this.respostaDiretorioRemoto = null;
        throw error; // ⚠️ Propaga o erro para o `autentica()` capturar
      } finally {
      }
    },
  },
  persist: true, //  ativa persistência automática
});
