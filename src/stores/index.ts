import { defineStore } from 'pinia'
// 建议抽出去写,然后在这里面import
interface GlobalState {
	token: any;
}
export const GlobalStore = defineStore('GlobalStore', {
  state: (): GlobalState => ({
    // 所有这些属性都将自动推断其类型
    token: localStorage.getItem("_vue3_token") != null ? localStorage.getItem("_vue3_token") : "",
  }),
  getters: {
  },
  actions: {
    setToken(token: string) {
      localStorage.setItem('_vue3_token', token)
      this.token = token
    },
    logOut() {
      localStorage.removeItem("_vue3_token")
      this.token = ""
    }
  },
})
