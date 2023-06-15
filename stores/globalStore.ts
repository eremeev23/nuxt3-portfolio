import { defineStore } from "pinia";

interface State {
  anyModal: boolean;
  responseModal: boolean;
  responseSuccess: boolean;
  baseUrl: string;
}

const isProd = process.env.NODE_ENV === 'production';

export const useGlobalStore = defineStore('globalStore', {
  state: (): State => ({
    anyModal: false,
    responseModal: false,
    responseSuccess: true,
    baseUrl: isProd ? 'https://eremeev-dev.vercel.app' : 'http://localhost:5001'
  }),

  actions: {
    TOGGLE_MODAL(event?: string) {
      this.anyModal = !this.anyModal;
      if (event === 'close') this.responseModal = false;
    },

    TOGGLE_RESPONSE_MODAL() {
      this.responseModal = !this.responseModal;
      if (!this.responseModal) this.anyModal = false;
    },
  }
})
