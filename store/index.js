import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userInfo: {},
		hasLogin:false
	},
	mutations: {
		login(state, provider,hasLogin) {
			state.userInfo = provider;
			state.hasLogin = hasLogin;
			uni.setStorage({//缓存用户登陆信息
			    key: 'userInfo',  
			    data: provider  
			}) 
			uni.setStorage({//缓存用户登陆状态
			    key: 'hasLogin',  
			    data: hasLogin  
			}) 
			// console.log(state.userInfo);
		},
		logout(state) {
			state.hasLogin = false;
			state.userInfo = {};
			uni.removeStorage({  
                key: 'userInfo'  
            })
		}
	},
	actions: {
		
	}
})

export default store
