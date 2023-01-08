import {defineStore} from "pinia";

export const useGlobalStore = defineStore('global', {
  state: () => ({
    anyModal: false,
    responseModal: false,
    responseSuccess: true,
  }),

  actions: {
    TOGGLE_MODAL(event?: string) {
      this.anyModal = !this.anyModal;

      if (event === 'close') {
        this.responseModal = false;
      }
    },

    TOGGLE_RESPONSE_MODAL() {
      this.responseModal = !this.responseModal;
      if (!this.responseModal) this.anyModal = false;
    },
  }
})