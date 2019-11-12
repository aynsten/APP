<template>
	<view class="content">
		<image class="logo" src="../../static/logo.png"></image>
		<view>
			<text class="title">{{title}}</text>
			<button @click="show()">升级</button>
		</view>
	</view>
</template>

<script>
	import autoUpdater from '../../common/autoUpdater.min.js';
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			//ps:检查程序升级的逻辑需要自己实现接口，uni.request 调用自己的检测接口，返回需要升级的相关字段(升级类容，安装包下载地址等)
			// #ifdef APP-PLUS
			autoUpdater.init({
				packageUrl: 'https://qd.myapp.com/myapp/qqteam/Androidlite/qqlite_3.7.1.704_android_r110206_GuanWang_537057973_release_10000484.apk',
				content: '更新内容:\n.修复上传房源时图片重复错乱问题\n.修复启动app时启动图变形问题\n.优化部分性能问题\n.新增功能1.新增功能2.新增功能3.新增功能3.新增功能3.新增功能3.新增功能3.新增功能3.新增功能3',
				contentAlign: 'left',
				cancel: '取消该版本',
				cancelColor: '#007fff'
			});
			// #endif
		},
		methods: {
			show() {
				autoUpdater.show();
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
