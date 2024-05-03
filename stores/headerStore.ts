import axios from "axios";
import { defineStore, storeToRefs } from 'pinia';

// Types
import { NavItem, Icon } from "~/types";

export type Lang = 'eng' | 'rus';

interface State {
  navigation: NavItem[] | null;
  icons: Icon[] | null;
  langs: string[] | null;
  currentLang: Lang;
  menuStatus: boolean;
}

export const useHeaderStore = defineStore('headerStore', {
  state: (): State => ({
    navigation: null,
    icons: null,
    langs: null,
    currentLang: 'eng',
    menuStatus: false
  }),

  actions: {
    async HEADER_REQUEST() {
      try {
        const { data } = await axios.get(`/api/${this.currentLang}/header`);
        return data;
      } catch (e) {
        console.log(e);
      }
    },

    CHANGE_LANG(value:Lang) {
      this.currentLang = value;
    }
  }
})
