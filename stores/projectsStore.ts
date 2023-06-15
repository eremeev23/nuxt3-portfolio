import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { IProject } from "~/types";
import { useHeaderStore } from "~/stores/headerStore";
// import { useGlobalStore } from "~/stores/globalStore";

const { currentLang } = storeToRefs(useHeaderStore());
// const { baseUrl } = storeToRefs(useGlobalStore());

export const useProjectsStore = defineStore('projectsStore', {
  state: () => ({
    projects: [] as IProject[],
    project: {} as IProject
  }),

  actions: {
    async PROJECTS_REQUEST() {
      try {
        const { data } = await axios.get(`https://eremeev-dev.vercel.app/api/${currentLang.value}/projects`);
        this.projects = data;
      } catch (e) {
        console.log(e);
      }
    },

    SET_PROJECT(slug:string | string[]) {
      this.project = this.projects.find((item:IProject) => item.slug === slug) || {} as IProject;
    }
  }
})
