const data = {
  title_text: 'Привет! Меня зовут Максим и я frontend-разработчик',
  main_text: 'У меня есть несколько лет опыта работы в веб-студии в качестве frontend-разработчика. В этой роли у меня была возможность работать над широким спектром проектов для различных клиентов, включая малый бизнес, стартапы и крупные корпорации. Я отточил свои навыки в HTML, CSS и JavaScript и научился использовать Vue для создания динамичных и отзывчивых пользовательских интерфейсов.<br><br> Я также приобрел ценный опыт работы в команде, сотрудничества с дизайнерами, backend-разработчикам и менеджерам проектов, чтобы предоставлять высококачественные веб-приложения вовремя и в рамках бюджета. В целом, мой опыт работы в веб-студии дал мне прочную основу для frontend-разработки, а также навыки и уверенность в том, что я смогу справиться с любым проектом, который мне встретится',
  photo: "me.png",
  skills: {
    title: 'навыки',
    list: [
      {
        title: "Языки программирования",
        list: ["Javascript", "Typescript"]
      },
      {
        title: "Фрэймворки",
        list: ["Vue.js", "Nuxt.js", "React"]
      },
      {
        title: "Стили",
        list: ["CSS", "SCSS", "Tailwind", "Styled Components"]
      },
      {
        title: "Стэйт менеджеры",
        list: ["Vuex", "Pinia", "Redux toolkit"]
      },
      {
        title: "Другое",
        list: ["Webpack", "Vite", "GIT", "REST API", "Pug", "Figma"]
      }
    ]
  },
  career: {
    title: "опыт-работы",
    list: [
      {
        id: 2,
        title: "Plenexy",
        link: "https://plenexy.ru/",
        from: "декабрь'22",
        to: "по настоящее время",
        role: "middle-frontend-разработчик",
        summary: "Разработка маркетплейса на Nuxt3 с TypeScript и Pinia в качестве менеджера состояний.",
        list: [
          "оптимизация кода",
          "работа в команде frontend разработчиков",
          "рефактор и ревью кода",
          "обсуждение бизнес-логики проекта",
          "документирование кода"
        ],
        order: 1
      },
      {
        id: 1,
        title: "Grokhotov Studio",
        link: "https://www.positron-it.ru/",
        from: "июнь'21",
        to: "декабрь'22",
        role: "frontend-разработчик",
        summary: "Разработка веб-приложений, веб-сайтов компаний и интернет-маганзинов на Vue.js 2 или Nuxt.js 2. В качестве менеджера состояний я использовал Vuex. Также использовал GSAP для анимаций и переходов.",
        list: [
          "интеграция внешних библиотек и api",
          "ревью кода",
          "работа в команде",
          "обсуждение дизайна и структуры проектов",
          "обсуждение структуры API с командой backed-разработчиков",
          "документирование кода"
        ],
        order: 2
      },
      {
        id: 0,
        title: "Freelance",
        link: "/projects",
        from: "март'21",
        to: "июнь'21",
        role: "frontend-разработчик",
        summary: "Создание Vue2-компонентов для команды фрилансеров. Разработка pet-проектов.",
        order: 3
      }
    ]
  },
  facts: {
    title: 'факты-обо-мне',
    list: [
      "Работал на РЖД",
      "Любимый спорт - баскетбол",
      "Родился в России",
      "Живу в Грузии",
      "Мне 28",
      "Помогал с идеями по дизайну на некоторых проектах",
      "Помогу вам улучшить вашу компанию или продукт",
      "Трудолюбив"
    ]
  }
}

export default defineEventHandler(() => JSON.stringify(data));
