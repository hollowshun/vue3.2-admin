import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/base.css'
import 'element-plus/dist/index.css'

const app = createApp(App)
// 全局引入 element icons
import * as Icons from "@element-plus/icons-vue";
// 引入mitt
import mitt from 'mitt'

// 注册element Icons组件
for (const [key, component] of Object.entries(Icons)) {
  app.component(key, component)
}

// 注册Mit
const Mit = mitt()
declare module "vue" {
  export interface ComponentCustomProperties {
      $Bus: typeof Mit
  }
}
//挂载全局API
app.config.globalProperties.$Bus = Mit

app.use(createPinia())
app.use(router)

app.mount('#app')
