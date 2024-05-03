import { defineStore, storeToRefs } from "pinia";
import axios from "axios";
import { Project } from "~/types";
import { useHeaderStore } from "~/stores/headerStore";

interface State {
  projects: Project[],
  project: null | Project
}

export const useProjectsStore = defineStore('projectsStore', {
  state: (): State => ({
    projects: [],
    project: null
  }),

  actions: {
    async PROJECTS_REQUEST(lang?: string) {
      try {
        if (lang) {
          const { data } = await axios.get(`/api/${lang}/projects`);
          this.projects = data;
        } else {
          const { currentLang } = storeToRefs(useHeaderStore());
          const { data } = await axios.get(`/api/${currentLang.value}/projects`);
          this.projects = data;
        }
      } catch (e) {
        console.log(e);
      }
    },

    SET_PROJECT(slug:string | string[]) {
      if (this.projects?.length) {
        this.project = this.projects.find((item: Project) => item.slug === slug) || null;
      }
    }
  }
})
