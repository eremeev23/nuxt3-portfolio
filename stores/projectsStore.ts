import { defineStore, storeToRefs } from "pinia";
import { IProject } from "~/types";
import axios from "axios";
import { useHeaderStore } from "~/stores/headerStore";
import {useGlobalStore} from "~/stores/globalStore";

const { currentLang } = storeToRefs(useHeaderStore());
const { baseUrl } = storeToRefs(useGlobalStore());

export const useProjectsStore = defineStore('projects', {
  state: () => ({
    projects: [] as IProject[],
    project: {} as IProject
  }),

  actions: {
    async PROJECTS_REQUEST() {
      try {
        await axios
          .get(`${baseUrl.value}/api/${currentLang.value}/projects`)
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