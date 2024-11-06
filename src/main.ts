// Styles
import '@/styles/main.scss'
import '@/styles/tailwind.scss'
import 'element-plus/dist/index.css'
import 'vue-pdf-embed/dist/styles/annotationLayer.css'
import 'vue-pdf-embed/dist/styles/textLayer.css'
import 'vue3-carousel/dist/carousel.css'

import VueCountdown from '@chenfengyuan/vue-countdown'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { vMaska } from 'maska/vue'
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaRegularBell,
  IoCalendar,
  IoCaretDownSharp,
  MdArrowdropdownRound,
  MdClose,
  MdFileuploadOutlined,
  MdLogout,
  MdMenuRound,
  MdRefreshSharp,
  MdSearch,
  PrMoon,
  RiDatabase2Fill,
  RiHistoryFill
} from 'oh-vue-icons/icons'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import VueCookies from 'vue3-cookies'
import App from './App.vue'
import router from './router'

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
  IoCaretDownSharp,
  MdLogout,
  MdClose,
  MdRefreshSharp
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
