const data = {
  navigation: [
    {
      id: 1,
      text: "home",
      href: "/"
    },
    {
      id: 2,
      text: "projects",
      href: "/projects"
    },
    {
      id: 3,
      text: "contacts",
      href: "/contacts"
    }
  ],
  langs: [
    "eng",
    "rus"
  ],
  icons: [
    {
      icon: "github",
      href: "https://github.com/eremeev23"
    },
    {
      icon: "linkedin",
      href: "https://www.linkedin.com/in/maksim-eremeev-6446101a9/"
    },
    {
      icon: "inst",
      href: "https://www.instagram.com/eremeev23/"
    },
    {
      icon: "tg",
      href: "https://t.me/eremeev23"
    }
  ]
}

export default defineEventHandler(() => JSON.stringify(data));