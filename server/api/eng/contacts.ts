import { jsonfy } from "~/utils/jsonfy";

const contacts = [
  {
    title: 'E-mail',
    hrefPref: 'mailto:',
    value: 'eremeevmiami94@icloud.com',
    href: 'eremeevmiami94@icloud.com',
  },
  {
    title: 'Phone number',
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
    title: 'Github',
    hrefPref: '',
    value: '@eremeev23',
    href: 'https://github.com/eremeev23',
  },
  {
    title: 'Instagram',
    hrefPref: '',
    value: '@eremeev23',
    href: 'https://www.instagram.com/eremeev23/',
  },
  {
    title: 'Telegram',
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
    title: 'Strava',
    hrefPref: '',
    value: "strava",
    href: "https://www.strava.com/athletes/67307390"
  }
]

export default defineEventHandler(() => jsonfy(contacts));
