const prefix = 'pear'

const config = {
  light: {
    // xxxxx
  },
  dark: {
    'dark-main': '#141414',
    'dark-content': '#1f1f1f'
  }
}

const commonTheme = {}

for (const [themeKey, themeObj] of Object.entries(config)) {
  const temp = {}
  for (const [key, value] of Object.entries(themeObj)) {
    temp[`--${prefix}-${key}`] = value
  }
  commonTheme[themeKey] = temp
}

export default commonTheme
