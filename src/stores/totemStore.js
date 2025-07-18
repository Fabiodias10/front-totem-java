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
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    logout() {
      (this.ipTotem = null),
        (this.conectado = null),
        (this.resposta = null),
        (this.respostaDiretorioLocal = null),
        (this.respostaDiretorioRemoto = null),
        (this.load = null),
        (this.existeDiretorio = null);
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
        console.log(response.data);

        this.resposta = response.data;
        this.conectado = true;
        // verificaDiretorioPacoteTotem();
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        (this.resposta = null), (this.conectado = false);
        throw error; // ⚠️ Propaga o erro para o `autentica()` capturar
      } finally {
        console.log("Finally do autenticaTotem");

        this.load = false;
      }
    },
    async verificaDiretorioPacoteTotem() {
      try {
        const response = await axios.get(
          "http://localhost:9095/oracle/verifica_pacote_totem"
          // {
          //   ip: this.ipTotem,
          // }
        );
        console.log(response.data);

        this.existeDiretorio = true;
        // this.conectado = true;
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        // (this.resposta = null), (this.conectado = false);
        this.existeDiretorio = false;
      } finally {
        console.log("Finally do autenticaTotem");

        // this.load = false;
      }
    },

    async listaDiretorioLocal() {
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/listar_diretorio_local"
        );
        console.log(response.data);

        this.respostaDiretorioLocal = response.data;
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        this.respostaDiretorioLocal = null;
      } finally {
        console.log("Finally do autenticaTotem");
      }
    },

    async listaDiretorioRemoto() {
      try {
        const response = await axios.get(
          "http://localhost:9095/totem/listar_Diretorio_remoto"
        );
        console.log(response.data);

        this.respostaDiretorioRemoto = response.data;
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        this.respostaDiretorioRemoto = null;
        throw error; // ⚠️ Propaga o erro para o `autentica()` capturar
      } finally {
        console.log("Finally do autenticaTotem");
      }
    },
    // http://localhost:8080/totem/listar_diretorio_local
  },
  persist: true, //  ativa persistência automática
});
