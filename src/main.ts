// Styles
import '@/styles/main.scss'
import '@/styles/tailwind.css'
import 'vue3-carousel/dist/carousel.css'

import ElementPlus from 'element-plus'
import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaChevronLeft,
  FaChevronRight,
  MdArrowdropdownRound,
  MdMenuRound,
  PrMoon,
  FaRegularBell,
  MdSearch,
  FaChevronDown,
  FaChevronUp,
  RiHistoryFill,
  RiDatabase2Fill,
  MdFileuploadOutlined
} from 'oh-vue-icons/icons'

addIcons(
  FaChevronLeft,
  FaChevronRight,
  FaChevronDown,
  FaChevronUp,
  MdArrowdropdownRound,
  MdMenuRound,
  PrMoon,
  FaRegularBell,
  MdSearch,
  RiHistoryFill,
  RiDatabase2Fill,
  MdFileuploadOutlined
)

const app = createApp(App)

app.component('v-icon', OhVueIcon)

app.use(VueApexCharts)
app.use(ElementPlus)
app.use(createPinia())
app.use(router)

app.mount('#app')
