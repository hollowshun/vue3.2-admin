// 导入axios实例
import httpRequest from '../index'

// 定义接口的传参
interface UserInfoParam {
	userID: string,
}
// 获取用户信息
export function getUserInfo(param: UserInfoParam) {
    return httpRequest({
		url: '/post',
		method: 'post',
		data: param,
	})
}