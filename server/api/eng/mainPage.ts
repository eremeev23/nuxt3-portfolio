import { jsonfy } from "~/utils/jsonfy";

const age = new Date().getFullYear() - new Date("10.04.1994").getFullYear();

const data = {
  title_text: 'Hi! My name is Maksim and I am a frontend developer',
  main_text: "I have a few years of experience working in a web studio as a front-end developer. In this role, I have had the opportunity to work on a wide range of projects for a variety of clients, including small businesses, startups, and large corporations. I have honed my skills in HTML, CSS, and JavaScript, and have become proficient in using Vue to build dynamic and responsive user interfaces.<br><br> I have also gained valuable experience working in a team environment, collaborating with designers, back-end developers, and project managers to deliver high-quality web applications on time and within budget. Overall, my experience in a web studio has provided me with a strong foundation in front-end development and has given me the skills and confidence to tackle any project that comes my way.",
  photo: "me.png",
  skills: {
    title: 'skills',
    list: [
      {
        title: "Languages",
        list: ["Javascript", "Typescript"]
      },
      {
        title: "Frameworks",
        list: ["Vue.js", "Nuxt.js", "React"]
      },
      {
        title: "Styles",
        list: ["CSS", "SCSS", "Tailwind", "Styled Components"]
      },
      {
        title: "State managers",
        list: ["Vuex", "Pinia", "Redux toolkit"]
      },
      {
        title: "Others",
        list: ["Webpack", "Vite", "GIT", "REST API", "Pug", "Figma"]
      }
    ]
  },
  career: {
    title: "career",
    list: [
      {
        id: 2,
        title: "Plenexy",
        link: "https://plenexy.ru/",
        from: "december'22",
        to: "present",
        role: "middle-frontend-developer",
        summary: "The project involves the development and ongoing maintenance of a clothing marketplace, along with supplier and administrator panels. It has been built using cutting-edge technologies, specifically Nuxt3/Vue3 + Typescript. For efficient state management, the project utilizes Pinia. Styling is achieved through a combination of SCSS and Tailwind, while UI components are implemented using Element-plus.\n" +
          "A key feature of this project is its modular structure, which enhances scalability and maintainability. Several tasks have already been successfully completed as part of this endeavor, including:\n" +
          "With such comprehensive development and accomplished tasks, this project is poised to deliver a robust, efficient, and user-friendly clothing marketplace platform.",
        list: [
          "code refactoring and thorough code reviews to ensure high-quality and optimized code.",
          "creation of modules encompassing both UI components and essential business logic.",
          "implementation of responsive design principles, ensuring seamless user experiences across various devices.",
          "optimal loading time achieved through performance optimizations.",
          "regularly updating library versions to stay up-to-date with the latest advancements and improvements.",
          "close collaboration with the backend team to ensure smooth integration and communication between frontend and backend functionalities.",
          "introduction of new and innovative functionalities to enhance the overall user experience.",
        ],
        order: 1
      },
      {
        id: 1,
        title: "Grokhotov Studio",
        link: "https://www.positron-it.ru/",
        from: "june'21",
        to: "december'22",
        role: "frontend-developer",
        summary: "Develop web-applications, company websites and e-commerce projects on Vue.js 2 or Nuxt.js 2. As a state manager I’ve been using Vuex. Also, used GSAP for fancy animations and transitions.",
        list: [
          "integrating third-party libraries like vue-yandex-map",
          "code-reviewing",
          "team work",
          "discussing of the project designs and structures",
          "discussing of the API structure with backend team",
          "3 months leading frontend team",
          "writing tech documentations"
        ],
        order: 2
      },
      {
        id: 0,
        title: "Freelance",
        link: "/projects",
        from: "march'21",
        to: "june'21",
        role: "frontend-developer",
        summary: "Creating Vue2 components for the team of freelancers. And developing my own pet projects.",
        order: 3
      }
    ]
  },
  facts: {
    title: 'facts-about-me',
    list: [
      "Was a railways worker",
      "Favorite sport is basketball",
      "Was born in Russia",
      "Live in Georgia",
      `I'm ${ age }`,
      "Helped with design ideas in a few projects",
      "Will help you to improve your company or product",
      "Hardworking"
    ]
  }
}

export default defineEventHandler(() => jsonfy(data));
