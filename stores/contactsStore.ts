import axios from "axios";
import { defineStore, storeToRefs } from "pinia";
import { useHeaderStore } from "~/stores/headerStore";

export interface Contacts {
  title: string,
  hrefPref: string,
  value: string,
  href: string
}

export const useContactsStore = defineStore('contactsStore', {
  state: () => ({
    contactsInfo: [] as Contacts[]
  }),

  actions: {
    async CONTACTS_REQUEST() {
      try {
        const { currentLang } = storeToRefs(useHeaderStore());
        const { data } = await axios.get(`/api/${currentLang.value}/contacts`)
        this.contactsInfo = data;
      } catch (e) {
        console.log(e);
      }
    },

    async FEEDBACK_POST_REQUEST(fd:{}) {
      try {
        await axios.post('https://nuxt3-portfolio-2738c-default-rtdb.europe-west1.firebasedatabase.app/messages.json', JSON.stringify(fd))
        return true;
      } catch (e) {
        return false;
      }
    }
  }
})
