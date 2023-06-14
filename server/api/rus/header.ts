import { jsonfy } from "~/utils/jsonfy";

const data = {
  navigation: [
    {
      id: 1,
      text: "главная",
      href: "/"
    },
    {
      id: 2,
      text: "проекты",
      href: "/projects"
    },
    {
      id: 3,
      text: "контакты",
      href: "/contacts"
    }
  ],
  langs: [
    "eng",
    "rus"
  ],
  icons: [
    {
      name: 'Github',
      icon: "github",
      href: "https://github.com/eremeev23"
    },
    {
      name: 'Linkedin',
      icon: "linkedin",
      href: "https://www.linkedin.com/in/maksim-eremeev-6446101a9/"
    },
    {
      name: 'Instagram',
      icon: "inst",
      href: "https://www.instagram.com/eremeev23/"
    },
    {
      name: 'Telegram',
      icon: "tg",
      href: "https://t.me/eremeev23"
    },
    {
      name: 'Strava',
      icon: "strava",
      href: "https://www.strava.com/athletes/67307390"
    }
  ]
}

export default defineEventHandler(() => jsonfy(data));
