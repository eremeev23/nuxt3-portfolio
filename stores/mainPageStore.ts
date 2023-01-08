import {defineStore, storeToRefs} from "pinia";
import axios from "axios";
import { ISkill } from "~/types";
import {useHeaderStore} from "~/stores/headerStore";
import {useGlobalStore} from "~/stores/globalStore";

const { currentLang } = storeToRefs(useHeaderStore());
const { baseUrl } = storeToRefs(useGlobalStore());

export interface IMainPage {
  title_text: string | null;
  main_text: string | null;
  photo: string | null;
  skills: {title: string, list:  ISkill[]} | null;
  facts: {title: string, list:  string[]} | null;
}

export const useMainPageStore = defineStore('main-page', {
  state: () => ({
    mainPage: {} as IMainPage
  }),

  actions: {
    async MAIN_PAGE_REQUEST() {
      this.mainPage = {} as IMainPage;

      try {
        await axios
          .get(`${baseUrl.value}/api/${currentLang.value}/mainPage`)
          .then(({ data }) => {
            this.mainPage = data;
          })
      } catch (e) {
        console.log(e)
      }
    }
  }
})