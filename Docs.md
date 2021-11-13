## 文档

### 翻译
中文翻译配置文件目录在[src/config/localization/translations.json](public/locales/zh-CN.json)
英文翻译配置文件目录在[src/config/localization/translations.json](src/config/localization/translations.json)
翻译示例文件目录在[src/view/Test.tsx](src/view/Test.tsx)
翻译示例页面路由[http://localhost:3007/test](http://localhost:3007/test)

#### 请各位前端老师按照示例规范进行翻译代码编写
#### 如果英文译文困难可先按照[谷歌翻译](https://translate.google.cn/)或[百度翻译](https://fanyi.baidu.com/)进行第一版翻译
#### 各位前端老师如有疑问可咨询 @kksma 


### 主题
主题配置文件目录在[src/uikit/theme/index.ts](src/uikit/theme/index.ts)
示例文件目录在[src/view/Test.tsx](src/view/Test.tsx)
示例页面路由[http://localhost:3007/test](http://localhost:3007/test)

#### 目录结构
  base.ts 基础文件配置
  colors.ts 颜色主题文件配置
  dark.ts 夜间主题文件配置
  light.ts 夜间主题文件配置
  filter.ts css filter 文件配置(暂未使用)
  types.ts 主题类型文件

#### 文字
  使用[Text](src/uikit/components/Text/index.tsx)组件可自动适配文字主题
  <Text>文字</Text>

#### 背景
  使用[Card](src/uikit/components/Card/Card.tsx)组件可自动适配卡片背景主题(当前组件自带border-radius)
  <Card>内容</Card>

  自定义背景：
  可使用[styled](node_modules/@types/styled-components/index)进行自定义背景及样式

### 自适应布局
  Coming soon