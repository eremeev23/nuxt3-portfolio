import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { Career, IPageBlock, Skill } from "~/types";
import { useHeaderStore } from "~/stores/headerStore";

interface State {
  mainPage: IMainPage;
}

export interface IMainPage {
  title_text: string | null;
  main_text: string | null;
  photo: string | null;
  skills: IPageBlock<Skill> | null;
  facts: IPageBlock<string> | null;
  career: IPageBlock<Career>
}

export const useMainPageStore = defineStore('mainPageStore', {
  state: (): State => ({
    mainPage: {} as IMainPage
  }),

  actions: {
    async fetchMainData() {
      const { currentLang } = storeToRefs(useHeaderStore());

      try {
        const { data } = await axios.get<IMainPage>(`/api/${currentLang.value}/mainPage`);
        const response = data;
        response.career.list = data.career.list?.sort((a: Career, b: Career) => a.order - b.order)
        return response
      } catch (e) {
        console.log(e)
        return null
      }
    }
  }
})
