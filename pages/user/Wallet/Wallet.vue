<template>
	<view>
		<view class="header">
			<text class="title">可提现金额</text>
			<text class="money">{{GetCustomerWallet.withDrawableDis | NumToFixed}}</text>
			<button class="CashWithdrawal" @tap="CashWithdrawal">立即提现</button>
		</view>
		<view class="container">
			<view class="container-item" v-for="(item,index) in  Porfit" :key="index" @tap="AllPorfit(item)">
				<text class="uni-text">{{item.title}}</text>
				<view class="money">￥{{item.money | NumToFixed}}</view>
			</view>
		</view>
		<view class="SetUp" @tap="WalletSetUp">
			<img src="../../../static/Wallet1.png" mode="" class="setupico"></img>
			提现账号设置
			<img src="../../../static/Wallet3.png" mode="" class="more"></img>
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
				Porfit: [{
						title: '总收益',
						money: 0,
						id: 3
					},
					{
						title: '审核中',
						money: 0,
						id: 0
					},
					{
						title: '已提现',
						money: 0,
						id: 1
					},
					{
						title: '冻结中',
						money: 0,
						id: 2
					},
				],
				GetCustomerWallet: {},
				hasLogin: false,
				userInfo: {},
				wechatId: '',
				name: '',
				mobile: '',
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
						that.GetCustomerWallet = res.data.data
						that.Porfit.forEach(item => {
							if (item.title == '总收益') {
								item.money = res.data.data.profitDis
							}
							if (item.title == '审核中') {
								item.money = res.data.data.handlingDis
							}
							if (item.title == '已提现') {
								item.money = res.data.data.withdrewDis
							}
							if (item.title == '冻结中') {
								item.money = res.data.data.freezeDis
							}
						})
					}

				}
			})
			// 获取提现账号信息
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
			WalletSetUp() {
				uni.navigateTo({
					url: "../WalletSetUp/WalletSetUp"
				})
			},
			CashWithdrawal() {
				if (this.wechatId == '' || this.name == '' || this.mobile == '') {
					this.$api.msg("请先完善提现账号信息！")
					return
				}
				uni.navigateTo({
					url: "../CashWithdrawal/CashWithdrawal"
				})
			},
			AllPorfit(item) {
				uni.navigateTo({
					url: "../AllPorfit/AllPorfit?id=" + item.id,
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

		.CashWithdrawal {
			width: 40%;
			font-size: 28upx;
			background: #f7c61e;
			position: absolute;
			bottom: -30upx;
			left: 30%;
			border-radius: 40upx;
			border: none;
		}
	}


	.container {
		margin: 100upx 10upx 100upx 10upx;
		width: 730upx;
		height: 128upx;
		text-align: center;
		font-size: 28upx;
		line-height: 1.5;
		border-radius: 5upx;

		.container-item {
			width: 25%;
			float: left;

			.uni-text {
				display: block;
				font-size: 24upx;
				width: 100%;
				color: #888888;
			}

			.money {
				color: #f00f00;
			}
		}
	}

	.CashWithdrawal:after {
		border: none;
	}

	.CashWithdrawal {
		height: 60upx;
		line-height: 60upx;
		color: #FFFFFF;
	}

	.SetUp {
		padding: 0 30upx;
		display: flex;
		align-items: center;
		font-size: 26upx;
		color: #353535;

		.setupico {
			width: 40upx;
			height: 40upx;
			margin-right: 20upx;
		}

		.more {
			width: 20upx;
			height: 30upx;
			margin-left: auto;
		}

	}
</style>
