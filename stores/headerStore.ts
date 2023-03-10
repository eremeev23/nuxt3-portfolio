import {defineStore, storeToRefs} from 'pinia';
import axios from "axios";
import { INavItem, IIcon } from "~/types";
import { useGlobalStore } from "~/stores/globalStore";

const { baseUrl } = storeToRefs(useGlobalStore());

export type Lang = 'eng' | 'rus';

interface IState {
  navigation: INavItem[] | null;
  icons: IIcon[] | null;
  langs: string[] | null;
  currentLang: Lang;
  menuStatus: boolean;
}

export const useHeaderStore = defineStore('header', {
  state: ():IState => ({
    navigation: null,
    icons: null,
    langs: null,
    currentLang: 'eng',
    menuStatus: false
  }),

  actions: {
    async HEADER_REQUEST() {
      try {
        await axios
          .get(`${baseUrl.value}/api/${this.currentLang}/header`)
          .then(({ data }) => {
            this.navigation = data.navigation;
            this.icons = data.icons;
            this.langs = data.langs;
          })
      } catch (e) {
        console.log(e);
      }
    },

    CHANGE_LANG(value:Lang) {
      this.currentLang = value;
    }
  }
})
