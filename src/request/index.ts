import axios from 'axios'
import router from '@/router'
import { GlobalStore } from "../stores";
import { ref } from 'vue'
import { ElMessage, ElLoading  } from 'element-plus'
const store = GlobalStore();
console.log(import.meta);

// 创建一个 axios 实例
const service = axios.create({
	baseURL: import.meta.env.VITE_BASE_API, // 所有的请求地址前缀部分
	timeout: 60*1000, // 请求超时时间毫秒
	withCredentials: true, // 异步请求携带cookie
	headers: {
		// 设置后端需要的传参类型
		'Content-Type': 'application/json',
		'token': store.token||'',
		'X-Requested-With': 'XMLHttpRequest',
	},
})
// 全局加载
const ElLoadingNum = ref<any>(0)
const Loading = ref<any>("");

function startElLoading() {
  if (ElLoadingNum.value == 0) {
    Loading.value  = ElLoading.service({
      lock: true,
      text: "Loading",
      background: "rgba(0, 0, 0, 0.7)"
    });
  }
  ElLoadingNum.value++;
}

function endElLoading() {
  ElLoadingNum.value--;
  if (ElLoadingNum.value <= 0) {
    Loading.value.close();
  }
}
const toLogin = () => {
  router.replace({
    path: '/login'
  });
}
const errorHandle = (status:any, other:any) => {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
      // 清除token并跳转登录页
    case 403:
      ElMessage.error('登录过期，请重新登录');
      store.logOut();
      setTimeout(() => {
        toLogin();
      }, 1000);
      break;
    case 404:
      ElMessage.error('请求的资源不存在');
      break;
    case 405:
      ElMessage.error('请求405');
      break;
    case 504:
      ElMessage.error('请求504');
      break;
    default:
      ElMessage(other);
  }
}
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    startElLoading()
		// 在发送请求之前做些什么
		return config
	},
	(error) => {
    startElLoading()
		// 对请求错误做些什么
		return Promise.reject(error)
	}
)

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    // 对响应成功做点什么
    endElLoading()
    return Promise.resolve(response.data)
	},
  (error) => {
    endElLoading()
    if (error) {
      // 对响应错误做点什么
      errorHandle(error.response.status, error.message);
      return Promise.reject(error)
    } else {
        // 处理断网的情况
        if (!window.navigator.onLine) {
          ElMessage.error('网络异常');
        } else {
          ElMessage.error('数据加载失败,请稍后重试');
          return Promise.reject(error);
        }
    }
	}
)

export default service

