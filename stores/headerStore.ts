import {defineStore, storeToRefs} from 'pinia';
import axios from "axios";
import { INavItem, IIcon } from "~/types";

export type Lang = 'eng' | 'rus';

interface State {
  navigation: INavItem[] | null;
  icons: IIcon[] | null;
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
