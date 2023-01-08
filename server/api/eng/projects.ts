const projects = [
  {
    slug: 'markov',
    title: 'Markov dental clinic',
    stack: ['Nuxt', 'Typescript', 'Scss', 'Vuex', 'GSAP', 'axios'],
    image: 'markov-main.jpg',
    caption: 'Site for dental clinic.',
    link: 'https://markov.grokhotov.ru',
    repository: null,
    commerce: true,
    slides: [
      'markov-main.jpg',
      'markov_2.png',
      'markov_3.png',
      'markov_4.png',
      'markov_5.png',
    ],
    description: 'We`ve made this site for doctor Markov`s dental clinic. There are some fancy effects and GSAP animations like horizontal scroll. Also, there is an integration with Yandex maps. The main goal of this project was to create a simple and beautiful site with branded colors.',
    designed: 'Grokhotov studio design team'
  },
  {
    slug: 'industrial-ts',
    title: 'Industrial technical supply',
    stack: ['Nuxt', 'Javascript', 'Scss', 'Vuex', 'axios', 'aos'],
    image: 'industrial-ts.jpg',
    caption: 'E-commerce that is on the first stage of production without ordering, but with catalog and requests for products.',
    link: 'https://industrial-ts.ru/',
    repository: null,
    commerce: true,
    slides: [
      'industrial-ts.jpg',
      'industrial-ts_2.png',
      'industrial-ts_3.png'
    ],
    description: 'We`ve made this site for russian retail company "Industrial technical supply". There was created a catalog and one product pages with AOS animations. This project was made as the first stage of online store. There is no cart, but there is a product`s requesting form.',
    designed: '"Grokhotov studio" design team'
  },
  {
    slug: 'grade',
    title: 'Grade',
    stack: ['Vue.js', 'Javascript', 'Scss', 'Vuex', 'GSAP', 'axios'],
    image: 'grade.png',
    caption: 'Site about real estate reconstructing company "Grade".',
    link: 'http://grade.company/',
    repository: null,
    commerce: true,
    slides: [
      'grade.png',
      'grade_2.png',
      'grade_3.png',
      'grade_5.png',
      'grade_4.png',
    ],
    description: 'We`ve made this site for russian real estate redeveloping, reconstructing and building company "Grade". It was made with creative modern design and modern frontend technologies to show how modern the company is.',
    designed: '"Grokhotov studio" design team'
  },
  {
    slug: 'lpadevice',
    title: 'LenSpecAuto',
    stack: ['Vue.js', 'Javascript', 'Scss', 'Vuex', 'axios'],
    image: 'lpa.png',
    caption: 'Ecommerce of industrial electronics.',
    link: 'https://lpadevice.ru/',
    repository: null,
    commerce: true,
    slides: [
      'lpa.png',
      'lpa_4.png',
      'lpa_2.png',
      'lpa_3.png',
    ],
    description: 'This project is a redesign of the old "LenSpecAuto" site. There is an interesting Vue-component "Configurator" which is full dynamic and asynchronous. It helps to choose a product configuration with simple and understandable UI. We`ve made a cart with Vanilla JS Class. The project has already made a huge impact for the company.',
    designed: '"Grokhotov studio" design team'
  },
  {
    slug: 'vue-weather',
    title: 'Vue3 weather app',
    stack: ['Vue.js', 'Typescript', 'Scss', 'Pinia', 'axios'],
    image: 'vue-weather.png',
    caption: 'Vue3 weather app with neumorphism design.',
    link: 'https://vue3-vite-weather-app.vercel.app/',
    repository: 'https://github.com/maxon32/vue3-weather-app',
    commerce: false,
    slides: ['vue-weather.png'],
    description: 'Vue3 weather app. I`ve made this to learn basics of Pinia and Typescript in Vue3. There is a possibility to add or delete a city and change the order of it. This list will be saved in your localStorage. For data I`ve used Open Weather Map API.',
    designed: 'me'
  },
  {
    slug: 'react-weather',
    title: 'React weather app',
    stack: ['React', 'Typescript', 'Styled components', 'Redux toolkit', 'axios'],
    image: 'react-weather.png',
    caption: 'React weather app with neumorphism design.',
    link: 'https://react-ts-weather-app-openmap.vercel.app/',
    repository: 'https://github.com/eremeev23/react-ts-weather-app',
    commerce: false,
    slides: ['react-weather.png'],
    description: 'React weather app. It`s also the dark them of the Vue3 weather-app. I`ve made this to learn basics of RTK Query and Typescript in React. There is a possibility to add or delete a city and change the order of it. This list will be saved in your localStorage. For data I`ve used Open Weather Map API.',
    designed: 'me'
  },
  {
    slug: 'vue-register',
    title: 'Vue sign in form',
    stack: ['Vue.js', 'Typescript', 'Scss', 'Pinia', 'axios'],
    image: 'vue-register.png',
    caption: 'Vue3 sign in form with user page.',
    link: 'https://eremeev-uprock-test.vercel.app/',
    repository: 'https://github.com/maxon32/uprock-test',
    commerce: false,
    slides: ['vue-register.png'],
    description: 'Test task in "Uprock". I`ve made sign in form and redirecting to user page. It`s also possible to log out. After reloading page it will redirect to logged user page or to sign in form. Test user email: testuser@icloud.com, password: 123456.',
    designed: 'me'
  },
  {
    slug: 'users-table',
    title: 'Vue users table',
    stack: ['Vue.js', 'Javascript', 'Scss', 'Pinia', 'axios'],
    image: 'user-table.png',
    caption: 'Vue3 users table with data from API and with searching and pagination.',
    link: 'https://users-table-vue.vercel.app/',
    repository: 'https://github.com/maxon32/users-table',
    commerce: false,
    slides: ['user-table.png'],
    description: 'Table of users (from pseudo-api) with pagination and search. Pagination progress and search phrase are saving in url as get-parameters and will load this data after reload.',
    designed: 'me'
  },
  {
    slug: 'react-ecomm',
    title: 'React clothes e-commerce',
    stack: ['React', 'Javascript', 'Styled components', 'Redux toolkit'],
    image: 'el-modo.png',
    caption: 'React clothes e-commerce.',
    link: 'https://el-modo.vercel.app/',
    repository: 'https://github.com/maxon32/react-rtk-ecommerce',
    commerce: false,
    slides: [
      'el-modo.png',
      'el-modo_2.png',
      'el-modo_3.png',
      'el-modo_4.png',
    ],
    description: 'Clothes online store. I`ve developed this to learn basics of React and Redux toolkit. There are dynamic categories and products pages. You can add a product to cart.',
    designed: 'me'
  },
  {
    slug: 'store-gallery',
    title: 'Store gallery',
    stack: ['Nuxt', 'Javascript', 'CSS', 'Vuex', 'axios'],
    image: 'store-gallery.png',
    caption: 'Nuxt store gallery with sorting. You can add or delete an item with saving in localStorage.',
    link: 'https://store-gallery.vercel.app/',
    repository: 'https://github.com/maxon32/nuxt-store-gallery',
    commerce: false,
    slides: ['store-gallery.png'],
    description: 'I`ve made this project to improve my Nuxt skill. There you can add your own product, delete some product from list, sort all products and it will be saved in your localStorage.',
    designed: 'me'
  },
  {
    slug: 'react-todo',
    title: 'Todo list',
    stack: ['React', 'Typescript', 'Styled components', 'Redux toolkit'],
    image: 'todo.png',
    caption: 'React + Redux toolkit todo list.',
    link: 'https://react-redux-ts-todo-list.vercel.app/',
    repository: 'https://github.com/maxon32/react-ts-todo-list',
    commerce: false,
    slides: ['todo.png'],
    description: 'It`s a simple Todo list that was made with React + Redux toolkit + Typescript stack.',
    designed: 'me'
  },
]

export default defineEventHandler(() => JSON.stringify(projects));