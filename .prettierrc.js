module.exports = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "tabWidth": 2,
  "useTabs": false, 
  "printWidth": 80, // 超过最大值换行
  "htmlWhitespaceSensitivity": "ignore",
  "jsxSingQuote": true,
  "semi": true, // 结尾不用分号
  "singleQuote": true, // 使用单引号
  "trailingComma": 'all',  //在括号和对象的文字之间加上一个空格
  "bracketSpacing": true,  // 当箭头函数中只有一个参数的时候忽略括弧   
  "arrowParens": 'avoid', 
  "disableLanguages": ["vue"], // 不格式化vue文件，vue文件的格式化单独设置
  "trailingComma": "none" // 函数最后不需要逗号
};