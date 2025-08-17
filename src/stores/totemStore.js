import { defineStore } from "pinia";
import axios from "axios";
import { Notify } from "quasar";

export const useTotemStore = defineStore("totem", {
  state: () => ({
    ipServidor: "localhost",
    ipTotem: "192.168.0.20",
    conectado: false,
    resposta: null,
    respostaDiretorioLocal: null,
    respostaDiretorioRemoto: null,
    load: false,
    existeDiretorio: null,
    backendAtivo: false,
    statusConexaoSessaoSSH: null,
    StatusDump: null,
    loadDump: false,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    ipServer() {},

    async pingBackend() {
      console.log("pingBackend");

      console.log(this.ipServidor);
      console.log(this.ipServidor);

      try {
        const response = await axios.get(
          // "http://" + this.ipServidor + ":9095/totem/ping"
          `http://${this.ipServidor}:9095/totem/ping`
        );
        // const response = await axios.get("http://10.6.103.44:9095/actuator/health");

        if (response.status === 200) {
          this.backendAtivo = true;
        }
      } catch (error) {
        this.backendAtivo = false;
        throw error;
      }
    },

    async autenticaTotem() {
      console.log("autenticaTotem");

      console.log(this.ipServidor);
      console.log(this.ipServidor);
      this.load = true;
      try {
        const response = await axios.post(
          // "http://" + this.ipServidor + ":9095/totem/conecta",
          `http://${this.ipServidor}:9095/totem/conecta`,
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
          "http://192.168.0.155:9095/totem/carregaInfoTotem"
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
          "http://" + this.ipServidor + ":9095/oracle/verifica_pacote_totem"
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

    async statusConexaoSsh() {
      try {
        const response = await axios.get(
          "http://192.168.0.155:9095/totem/status_conexao_ssh"
        );
        this.statusConexaoSessaoSSH = true;
        console.log("statusConexaoSSH: ", response.data);
      } catch (error) {
        console.log("statusConexaoSSH", error);
        this.statusConexaoSessaoSSH = false;
        throw error;
      } finally {
      }
    },

    async dumpTotem() {
      this.loadDump = true;
      try {
        const response = await axios.get("http://192.168.0.155:9095/dump");
        console.log("dumpTotem: ", response.data);

        this.StatusDump = response.data;
      } catch (error) {
        console.log("dumpTotem", error);
        this.StatusDump = null;
        throw new Error("Erro ao realiza Dump");
      } finally {
        this.loadDump = false;
      }
    },

    async listaDiretorioLocal() {
      try {
        const response = await axios.get(
          "http://" + this.ipServidor + ":9095/totem/listar_diretorio_local"
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
          "http://" + this.ipServidor + ":9095/totem/listar_Diretorio_remoto"
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
          "http://" + this.ipServidor + ":9095/totem/desconecta_sessao_ssh"
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
