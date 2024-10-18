// Styles
import '@/styles/main.scss'
import '@/styles/tailwind.css'
import 'vue3-carousel/dist/carousel.css'
import 'element-plus/dist/index.css'

import VueApexCharts from 'vue3-apexcharts'
import App from './App.vue'
import router from './router'
import VueCountdown from '@chenfengyuan/vue-countdown'
import VueCookies from 'vue3-cookies'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vMaska } from 'maska/vue'
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
  MdFileuploadOutlined,
  IoCalendar,
  IoCaretDownSharp
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
  MdFileuploadOutlined,
  IoCalendar,
  IoCaretDownSharp
)

const app = createApp(App)

app.component('v-icon', OhVueIcon)
app.component('v-countdown', VueCountdown)

const pinia = createPinia()
app.use(pinia)
app.use(VueApexCharts)
app.use(router)
app.use(VueQueryPlugin)
app.use(VueCookies)

app.directive('maska', vMaska)
app.mount('#app')
