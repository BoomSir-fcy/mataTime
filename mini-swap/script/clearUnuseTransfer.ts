const zhLocal = require('../public/locales/zh-CN.json')
const translations = require('../src/config/localization/translations.json')
const fs = require('fs')

const main = () => {
  const newTranslations = {}
  Object.keys(zhLocal).forEach(item => {
    newTranslations[item] = translations[item]
  })

  fs.writeFile(`./translations.json`, JSON.stringify(newTranslations, null, 2), (err) => {
    if (err) throw err
    console.info(` ✅ - translations.json has been updated!`)
  })
}

main()

