import { useQuasar } from "quasar";
import { createPinia } from "pinia";
import piniaPersistedstate from "pinia-plugin-persistedstate";

export default async ({ app }) => {
  const pinia = createPinia();
  pinia.use(piniaPersistedstate);

  app.use(pinia);

  // Se estiver usando Pinia em `useStore`, certifique-se que foi inicializado
  app.pinia = pinia;
};
