import { createI18n } from 'vue-i18n'
import { getBrowserLang } from '@/utils'

import zh from './modules/zh'
import en from './modules/en'

const i18n = createI18n({
  allowComposition: true,
  // you must set `false`, to use Composition API
  legacy: false,
  locale: getBrowserLang(),
  messages: {
    zh,
    en
  }
})

export default i18n
