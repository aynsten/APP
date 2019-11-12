export const RouteInterception = () => {
	let hasLogin = false
	uni.getStorage({
		key: 'userInfo',
		success: function(res) {
			if (res.data != null) {
				hasLogin = true
				return hasLogin
			}
		},
		fail: function(res) {
			hasLogin = false
			return hasLogin
			uni.showModal({
				content: '请登录后再进行操作',
				showCancel: false
			});
		}
	});
}
