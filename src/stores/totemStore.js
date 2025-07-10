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
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async autenticaTotem() {
      this.load = true;
      try {
        const response = await axios.post(
          "http://localhost:8080/totem/conecta",
          {
            ip: this.ipTotem,
          }
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

    async listaDiretorioLocal() {
      try {
        const response = await axios.get(
          "http://localhost:8080/totem/listar_diretorio_local"
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
          "http://localhost:8080/totem/listar_Diretorio_remoto"
        );
        console.log(response.data);

        this.respostaDiretorioRemoto = response.data;
      } catch (error) {
        console.log("Erro ao conectar: ", error);
        this.respostaDiretorioRemoto = null;
      } finally {
        console.log("Finally do autenticaTotem");
      }
    },
    // http://localhost:8080/totem/listar_diretorio_local
  },
  persist: true, //  ativa persistência automática
});
