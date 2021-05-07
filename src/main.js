import { createApp } from 'vue'
import ElementPlus from 'element-plus'

import 'normalize.css/normalize.css'
import './assets/styles/element-variables.scss'
import './assets/styles/application.scss'

import components from './components'
import App from './App.vue'
import validators from './utils/validators'
import filters from './utils/filters'
import store from './store'
import router from './router'
import i18n from './locales'

import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import 'dayjs/locale/zh-cn'

const app = createApp(App)
app.use(ElementPlus, { size: 'medium', zIndex: 3000, i18n: i18n.global.t })
app.use(components)
app.use(validators, '$validators')
app.use(filters, '$filters')
app.use(store)
app.use(i18n)
app.use(router)
app.mount('#app')

// dayjs locale should place after using ElementPlush
dayjs.extend(localizedFormat)
dayjs.locale('zh-cn')

