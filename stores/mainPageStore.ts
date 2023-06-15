import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { ICareer, IPageBlock, ISkill } from "~/types";
import { useHeaderStore } from "~/stores/headerStore";
import { useGlobalStore } from "~/stores/globalStore";

const { currentLang } = storeToRefs(useHeaderStore());
const { baseUrl } = storeToRefs(useGlobalStore());

interface State {
  mainPage: IMainPage;
}

export interface IMainPage {
  title_text: string | null;
  main_text: string | null;
  photo: string | null;
  skills: IPageBlock<ISkill> | null;
  facts: IPageBlock<string> | null;
  career: IPageBlock<ICareer>
}

export const useMainPageStore = defineStore('mainPageStore', {
  state: (): State => ({
    mainPage: {} as IMainPage
  }),

  actions: {
    async MAIN_PAGE_REQUEST() {
      this.mainPage = {} as IMainPage;

      try {
        const { data } = await axios.get(`${baseUrl.value}/api/${currentLang.value}/mainPage`);
        this.mainPage = data;
        this.mainPage.career.title = data.career.title;
        this.mainPage.career.list = data.career.list?.sort((a: ICareer, b: ICareer) => a.order - b.order)
      } catch (e) {
        console.log(e)
      }
    }
  }
})
