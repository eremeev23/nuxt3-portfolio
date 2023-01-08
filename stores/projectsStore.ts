import { defineStore, storeToRefs } from "pinia";
import { IProject } from "~/types";
import axios from "axios";
import { useHeaderStore } from "~/stores/headerStore";

const { currentLang } = storeToRefs(useHeaderStore());

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as IProject[],
    project: {} as IProject
  }),

  actions: {
    async PROJECTS_REQUEST() {
      try {
        await axios
          .get(`/api/${currentLang.value}/projects`)
          .then(({ data }) => {
            this.projects = data;
          })
      } catch (e) {
        console.log(e);
      }
    },

    SET_PROJECT(slug:string | string[]) {
      // @ts-ignore
      this.project = this.projects.find((item:IProject) => item.slug === slug);
    }
  }
})