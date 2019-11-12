<template>
	<view>

		<image src="../../../static/notdata.png" v-if="listdata.length<=0" style="width: 100%" mode="widthFix"></image>
		<view class="">
			<!-- 总收益 -->
			<view class="" v-if="Porfit ==3 || Porfit ==2">
				<view class="list">
					<view class="list-item" v-for="(item,index) in listdata" :key="index">
						<view class="describe">
							<view class="name">
								<text class="Profit">用户:{{item.customer}}</text>
								<small class="phone">来源账号({{item.sourceAccount}})</small>
							</view>

							<text class="date">
								{{item.sc_TimeCreated}}
							</text>
						</view>
						<view class="money">
							￥<text>{{item.money | NumToFixed}}</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 审核中 -->
			<view class="" v-if="Porfit ==0 || Porfit ==1">
				<view class="InAuditList" v-for="(item,index) in listdata" :key="index">
					<view class="describe">
						<view class="name">账号: ({{item.customer}}) </view>
						<view class="name">姓名: {{item.name}}</view>
						<view class="title">
							{{item.sc_TimeCreated}}
						</view>
					</view>
					<view class="examine">
						<view class="date">{{item.date}}</view>
						<view class="money">￥{{item.amount | NumToFixed}}</view>
						<view class="" v-if="Porfit ==0 ||Porfit ==1">
							<view class="statesuccess" v-if="item.auditStatus ==0">审核中</view>
							<view class="statesuccess" v-if="item.auditStatus ==1">已提现</view>
						</view>
						<view class="stateerror" v-if="item.auditStatus ==2" @tap="stateerror(item)">审核失败,查看原因</view>
					</view>
				</view>
			</view>
			<uniLoadMore :loadingType="loadingType" :contentText="contentText" :status="status"></uniLoadMore>
		</view>

	</view>
</template>

<script>
	import {
		api,
		requestsuccess
	} from '../../../api/request.js'
	import uniLoadMore from "../../../components/uni-load-more/uni-load-more.vue"
	export default {
		data() {
			return {
				Porfit: 0,
				listdata: [],
				tempstorecode: 0,
				userInfo: {},
				status: "more",
				loadingText: '加载中...',
				loadingType: 0, //定义加载方式 0---contentdown  1---contentrefresh 2---contentnomore
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了',
				},
				pageIndex: null,
				totalPages: null,
			};
		},
		onLoad(option) {
			this.tempstorecode = option.id
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
			this.loaddata()
		},
		methods: {
			stateerror(item) {
				uni.showModal({
					content: item.remark,
					showCancel: false
				});
			},
			loaddata() {
				let that = this
				if (that.tempstorecode == 0) {
					this.Porfit = 0
					uni.setNavigationBarTitle({
						title: "审核中"
					})
					uni.request({
						url: api + "/api/CustomerWallet/QueryCustomerWalletFlow",
						method: "POST",
						data: {
							auditStatus: 0,
							pageIndex: 1,
							pageSize: 10,
							sortBy: "Sc_TimeCreated",
							sortType: "desc",
						},
						header: {
							"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
						},
						success(res) {
							if (res.data.statusCode == requestsuccess) {
								that.listdata = res.data.data.items
								that.pageIndex = res.data.data.pageIndex
								that.totalPages = res.data.data.totalPages
								if (res.data.data.totalPages != 1) {
									that.status = "more"
								} else {
									that.status = "hidetext"
								}
								uni.stopPullDownRefresh();
							}
						},
					})
				}
				if (that.tempstorecode == 1) {
					this.Porfit = 1
					uni.setNavigationBarTitle({
						title: "已提现"
					})
					uni.request({
						url: api + "/api/CustomerWallet/QueryCustomerWalletFlow",
						method: "POST",
						data: {
							auditStatus: 1,
							pageIndex: 1,
							pageSize: 10,
							sortBy: "Sc_TimeCreated",
							sortType: "desc",
						},
						header: {
							"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
						},
						success(res) {
							if (res.data.statusCode == requestsuccess) {
								that.listdata = res.data.data.items
								that.pageIndex = res.data.data.pageIndex
								that.totalPages = res.data.data.totalPages
								if (res.data.data.totalPages != 1) {
									that.status = "more"
								} else {
									that.status = "hidetext"
								}
								uni.stopPullDownRefresh();
							}
						}
					})
				}
				if (that.tempstorecode == 2) {
					this.Porfit = 2
					uni.setNavigationBarTitle({
						title: "冻结中"
					})
					uni.request({
						url: api + "/api/DisPushMoneyFlow/QueryPushMoneyFlow",
						method: "POST",
						data: {
							auditStatus: 0,
							pageIndex: 1,
							pageSize: 10,
							sortBy: "Sc_TimeCreated",
							sortType: "desc",
						},
						header: {
							"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
						},
						success(res) {
							if (res.data.statusCode == requestsuccess) {
								that.listdata = res.data.data.items
								that.pageIndex = res.data.data.pageIndex
								that.totalPages = res.data.data.totalPages
								if (res.data.data.totalPages != 1) {
									that.status = "more"
								} else {
									that.status = "hidetext"
								}
								uni.stopPullDownRefresh();
							}
						}
					})
				}
				if (that.tempstorecode == 3) {
					this.Porfit = 3
					uni.setNavigationBarTitle({
						title: "总收益"
					})
					uni.request({
						url: api + "/api/DisPushMoneyFlow/QueryPushMoneyFlow",
						method: "POST",
						data: {
							CommonStatus: null,
							pageIndex: 1,
							pageSize: 10,
							sortBy: "Sc_TimeCreated",
							sortType: "desc",
						},
						header: {
							"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
						},
						success(res) {
							if (res.data.statusCode == requestsuccess) {
								that.listdata = res.data.data.items
								that.pageIndex = res.data.data.pageIndex
								that.totalPages = res.data.data.totalPages
								if (res.data.data.totalPages != 1) {
									that.status = "more"
								} else {
									that.status = "hidetext"
								}
								uni.stopPullDownRefresh();
							}
						}
					})
				}
			},
			// 下拉 =>初始化加载
			onPullDownRefresh() {
				this.loaddata()
			},
			// 上拉
			onReachBottom() {
				let that = this
				if (that.pageIndex <= that.totalPages) {
					uni.showNavigationBarLoading(); //显示加载动画
					if (that.tempstorecode == 0) {
						this.Porfit = 0
						uni.setNavigationBarTitle({
							title: "审核中"
						})
						uni.request({
							url: api + "/api/CustomerWallet/QueryCustomerWalletFlow",
							header: {
								"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
							},
							method: "POST",
							data: {
								auditStatus: 0,
								pageIndex: that.pageIndex + 1,
								pageSize: 10,
								sortBy: "Sc_TimeCreated",
								sortType: "desc",
							},
							success: function(res) {
								if (res.data.data.items.length <= 0) { //没有数据
									that.loadingType = 2;
									that.status = "noMore"
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								that.pageIndex++; //每触底一次 page +1
								that.listdata = that.listdata.concat(res.data.data.items) //将数据拼接在一起
								that.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							}
						});
					}
					if (that.tempstorecode == 1) {
						this.Porfit = 1
						uni.setNavigationBarTitle({
							title: "已提现"
						})
						uni.request({
							url: api + "/api/CustomerWallet/QueryCustomerWalletFlow",
							header: {
								"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
							},
							method: "POST",
							data: {
								auditStatus: 0,
								pageIndex: that.pageIndex + 1,
								pageSize: 10,
								sortBy: "Sc_TimeCreated",
								sortType: "desc",
							},
							success: function(res) {
								if (res.data.data.items.length <= 0) { //没有数据
									that.loadingType = 2;
									that.status = "noMore"
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								that.pageIndex++; //每触底一次 page +1
								that.listdata = that.listdata.concat(res.data.data.items) //将数据拼接在一起
								that.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							}
						});
					}
					if (that.tempstorecode == 2) {
						this.Porfit = 2
						uni.setNavigationBarTitle({
							title: "冻结中"
						})
						uni.request({
							url: api + "/api/DisPushMoneyFlow/QueryPushMoneyFlow",
							header: {
								"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
							},
							method: "POST",
							data: {
								auditStatus: 0,
								pageIndex: that.pageIndex + 1,
								pageSize: 10,
								sortBy: "Sc_TimeCreated",
								sortType: "desc",
							},
							success: function(res) {
								if (res.data.data.items.length <= 0) { //没有数据
									that.loadingType = 2;
									that.status = "noMore"
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								that.pageIndex++; //每触底一次 page +1
								that.listdata = that.listdata.concat(res.data.data.items) //将数据拼接在一起
								that.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							}
						});
					}
					if (that.tempstorecode == 3) {
						this.Porfit = 3
						uni.setNavigationBarTitle({
							title: "总收益"
						})
						uni.request({
							url: api + "/api/DisPushMoneyFlow/QueryPushMoneyFlow",
							header: {
								"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
							},
							method: "POST",
							data: {
								auditStatus: 0,
								pageIndex: that.pageIndex + 1,
								pageSize: 10,
								sortBy: "Sc_TimeCreated",
								sortType: "desc",
							},
							success: function(res) {
								if (res.data.data.items.length <= 0) { //没有数据
									that.loadingType = 2;
									that.status = "noMore"
									uni.hideNavigationBarLoading(); //关闭加载动画
									return;
								}
								that.pageIndex++; //每触底一次 page +1
								that.listdata = that.listdata.concat(res.data.data.items) //将数据拼接在一起
								that.loadingType = 0; //将loadingType归0重置
								uni.hideNavigationBarLoading(); //关闭加载动画
							}
						});
					}
				} else {
					that.status = "noMore"
				}
			},
		},
		components: {
			uniLoadMore
		}
	}
</script>

<style lang="scss" scoped>
	//总收益
	.list {
		padding: 30upx;

		.list-item {

			display: flex;
			border-bottom: 1px solid #EAEAEA;
			height: 117upx;
			align-items: center;
		}

		.describe {
			width: 550upx;
			font-size: 30upx;
			color: #353535;

			.name {
				display: flex;

				.phone {
					margin-left: 20upx;
					font-size: 24upx;
					color: #808080;
				}
			}


			.date {
				display: flex;
				font-size: 24upx;
				color: #808080;
			}
		}

		.money {
			width: 200upx;
			font-size: 36upx;
			color: #E52020;
			font-weight: 500;
			text-align: right;

			text {
				margin-left: 10upx;
			}
		}
	}

	// 审核中
	.InAuditList {
		padding: 30upx;
		display: flex;
		align-content: center;
		border-bottom: 1px solid #EAEAEA;

		.describe {
			width: 450upx;

			.name {
				font-size: 24upx;
				color: #888888;
				padding-bottom: 10upx;
			}

			.title {
				font-size: 28upx;
				color: #353535;
			}
		}

		.examine {
			width: 300upx;
			text-align: right;

			.date {
				font-size: 20upx;
				color: #888888;
			}

			.money {
				font-size: 24upx;
				color: #353535;
			}

			.statesuccess {
				color: #32A537;
				font-size: 24upx;
			}

			.stateerror {
				color: #E52020;
				font-size: 24upx;
			}
		}
	}
</style>
