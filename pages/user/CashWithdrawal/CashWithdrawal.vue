<template>
	<view>
		<view class="header">
			<text class="title">可提现金额</text>
			<text class="money">{{GetCustomerWallet.withDrawableDis | NumToFixed}}</text>
		</view>
		<view class="form-box">
			<view class="uni-form-item uni-column">
				<label>提现金额</label>
				<input class="uni-input" placeholder="请输入提现金额" type="number" v-model="amount" />
			</view>
			<button class="Wallet" @tap="send">提现</button>
			<text class="describe">请输入整数，方便商家可以准确核实信息并打款</text>
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
				GetCustomerWallet: {},
				amount: "",
				userInfo: {}
			}
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
			this.Wallet()
		},
		methods: {
			Wallet() {
				let that = this
				uni.request({
					url: api + "/api/CustomerWallet/GetCustomerWallet",
					header: {
						"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
					},
					success(res) {
						if (res.data.statusCode == requestsuccess) {
							that.GetCustomerWallet = res.data.data
						}

					}
				})
			},
			send() {
				let that = this
				if (this.amount == "") {
					uni.showModal({
						content: '提现金额不能为空！',
						showCancel: false
					});
					return
				}
				if (this.amount <= 0) {
					uni.showModal({
						content: '提现金额不能为0,请重新输入！',
						showCancel: false
					});
					return
				}
				let reg = /^-?[1-9]+[0-9]*$/;
				if (!reg.test(this.amount)) {
					uni.showModal({
						content: '请输入整数，方便商家可以准确核实信息并打款',
						showCancel: false
					});
					return
				}
				uni.request({
					url: api + "/api/CustomerWallet/Withdraw?amount=" + this.amount,
					method: "POST",
					header: {
						"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
					},
					success(res) {
						if (res.data.statusCode == requestsuccess) {
							uni.showModal({
								content: '提现申请已提交,等待银行处理！',
								showCancel: false,
								success(res) {
									if (res.confirm) {
										setTimeout(() => {
											uni.redirectTo({
												url: "../Wallet/Wallet"
											})
										}, 1000)
									}
								}
							});
							that.Wallet()
						}
					}
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.header {
		background: url(../../../static/Wallet2.png) no-repeat center;
		background-size: 100%;
		padding-bottom: 60upx;
		position: relative;

		.title,
		.money {
			display: block;
			font-size: 24upx;
			text-align: center;
			padding-top: 40upx;
			width: 100%;
			color: #FFFFFF;
		}

		.money {
			padding: 0upx 0 20upx 0;
			color: #FFFFFF;
			font-size: 70upx;
		}
	}

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

		.Wallet {
			background: #f7c61e;
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

	.Wallet:after {
		border: none;
	}
</style>
