import { createI18n } from 'vue-i18n'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import localeMessages from '@/locales/zh-cn'

const i18n = createI18n({
  locale: locale.name,
  datetimeFormats: {
    [locale.name]: {
      s: {
        year: 'numeric', month: '2-digit', day: '2-digit'
      },
      l: {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
      },
      short: {
        year: 'numeric', month: 'short', day: 'numeric'
      },
      long: {
        year: 'numeric', month: 'short', day: 'numeric',
        weekday: 'short', hour: 'numeric', minute: 'numeric'
      }
    }
  },
  messages: {
    [locale.name]: {
      el: locale.el,
      ...localeMessages
    }
  },
  modifiers: {}
})

export default i18n