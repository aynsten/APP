<template>
	<view>
		<view class="form-box">
			<view class="uni-form-item uni-column">
				<label>微信号</label>
				<input class="uni-input" placeholder="请输入微信号" v-model="wechatId" />
			</view>
			<view class="uni-form-item uni-column">
				<label>真实姓名</label>
				<input class="uni-input" placeholder="请输入真实姓名" v-model="name" />
			</view>
			<view class="uni-form-item uni-column">
				<label>手机号</label>
				<input class="uni-input" placeholder="请输入常用手机号码" v-model="mobile" />
			</view>
			<button class="setup" @tap="send">提交</button>
			<text class="describe">请填写真实有效的信息，方便商家可以准确核实信息并打款</text>
		</view>

	</view>
</template>

<script>
	import {
		api,
		requestsuccess
	} from '../../../api/request.js'
	export default {
		data() {
			return {
				wechatId: "",
				name: "",
				mobile: "",
				userInfo: {}
			};
		},
		onShow() {
			let that = this
			// 获取缓存登录信息
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					that.userInfo = res.data
				},
				fail(res) {
					if (res.data == '') {}
				}
			})
			uni.request({
				url: api + "/api/CustomerWallet/GetCustomerWallet",
				header: {
					"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
				},
				success(res) {
					if (res.data.statusCode == requestsuccess) {
						that.wechatId = res.data.data.wechatId
						that.name = res.data.data.name
						that.mobile = res.data.data.mobile
					}
				}
			})
		},
		methods: {
			send() {
				let that = this
				if (this.wechatId == '') {
					uni.showModal({
						content: '微信号不能为空',
						showCancel: false
					});
					return
				}
				if (this.name == '') {
					uni.showModal({
						content: '姓名不能为空',
						showCancel: false
					});
					return
				}
				if (this.wechatId == '') {
					uni.mobile({
						content: '手机号不能为空',
						showCancel: false
					});
					return
				}
				uni.request({
					url: api + "/api/CustomerWallet/UpdateCustomerWallet",
					method: "POST",
					header: {
						"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
					},
					data: {
						wechatId: this.wechatId,
						name: this.name,
						mobile: this.mobile,
					},
					success(res) {
						if (res.data.statusCode == requestsuccess) {
							uni.showModal({
								content: '信息保存成功',
								showCancel: false
							});
						}
						setTimeout(function() {
							uni.navigateTo({
								url: "../Wallet/Wallet"
							})
						}, 2000);
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.form-box {
		padding: 30upx;

		.uni-column {
			display: flex;
			line-height: 80upx;

			label {
				font-size: 28upx;
				width: 25%;
			}

			.uni-input {
				font-size: 24upx;
				height: 80upx;
				border-bottom: 1px solid #D1D1D1;
				width: 75%;
			}
		}

		.setup {
			background: #4FBA4A;
			width: 320upx;
			height: 60upx;
			line-height: 60upx;
			color: #FFFFFF;
			border: none;
			margin: 40upx auto;
			font-size: 28upx;
			border-radius: 60upx;
		}

		.describe {
			display: block;
			width: 100%;
			font-size: 24upx;
			color: #888888;
			text-align: center;
		}
	}

	uni-button:after {
		border: none;
	}
</style>
