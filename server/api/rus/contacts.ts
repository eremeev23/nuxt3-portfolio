import { jsonfy } from "~/utils/jsonfy";

const contacts = [
  {
    title: 'E-mail',
    hrefPref: 'mailto:',
    value: 'eremeevmiami94@icloud.com',
    href: 'eremeevmiami94@icloud.com',
  },
  {
    title: 'Телефон',
    hrefPref: 'tel:',
    value: '+995 599 389 346',
    href: '+995599389346',
  },
  {
    title: 'Linkedin',
    hrefPref: '',
    value: 'linkedin.com',
    href: 'https://www.linkedin.com/in/maksim-eremeev-6446101a9/',
  },
  {
    title: 'Гитхаб',
    hrefPref: '',
    value: '@eremeev23',
    href: 'https://github.com/eremeev23',
  },
  {
    title: 'Инстаграм',
    hrefPref: '',
    value: '@eremeev23',
    href: 'https://www.instagram.com/eremeev23/',
  },
  {
    title: 'Телеграм',
    hrefPref: '',
    value: '@eremeev23',
    href: 'https://t.me/eremeev23'
  },
  {
    title: 'Whatsapp',
    hrefPref: '',
    value: '',
    href: 'https://api.whatsapp.com/send/?phone=995599389346&text&type=phone_number&app_absent=0'
  },
  {
    title: 'Страва',
    hrefPref: '',
    value: "strava",
    href: "https://www.strava.com/athletes/67307390"
  }
]

export default defineEventHandler(() => jsonfy(contacts));
