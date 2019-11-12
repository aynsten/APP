<template>
	<view class="content">
		<view class="navbar">
			<view v-for="(item, index) in navList" :key="index" class="nav-item" :class="{current: tabCurrentIndex === index}"
			 @click="tabClick(index)">
				{{item.text}}
			</view>
		</view>
		<image src="../../static/notdata.png" v-if="listdata.length<=0" style="width: 100%" mode="widthFix"></image>
		<view class="ordergroup">
			<view v-for="(item,index) in listdata" :key="index" class="order-item" @tap="navtodatails(item)">
				<view class="i-top b-b">
					<text class="time">订单编号:{{item.orderNo}}</text>
					<text class="state" style="color: #888888;font-size: 24upx;">{{item.orderDate}}</text>
					<text v-if="item.state===9" class="del-btn yticon icon-iconfontshanchu1" @click="deleteOrder(index)"></text>
				</view>
				<view class="goods-box-single">
					<image class="goods-img" src="../../static/404.png" mode="aspectFill"></image>
					<view class="right">
						<text class="title clamp">韩版于是洞洞拖鞋 夏季浴室防滑简约居家【新人专享，限选意见】</text>
						<text class="attr-box">春装款 L</text>
						<text class="price">{{item.totalAmount}}</text>
					</view>
				</view>
				<view class="price-box">
					共
					<text class="num">7</text>
					件商品 实付款
					<text class="price">{{item.totalAmount}}</text>
				</view>
				<!-- <view class="price-box">
					<text class="price">{{item.totalAmount | NumToFixed}} ({{item.country}})</text>
				</view> -->
				<view class="action-box b-t" v-if="item.newOrderStatus ==10">
					<button class="action-btn" @click.stop="cancelOrder(item)">取消订单</button>
					<!-- <button class="action-btn recom" @click="pay(item)">立即支付</button> -->
				</view>
				<view class="action-box b-t" v-if="item.newOrderStatus ==20">
					<button class="action-btn recom" @click.stop="confirmlOrder(item)">确认收货</button>
				</view>
			</view>
			<uniLoadMore :loadingType="loadingType" :contentText="contentText" :status="status"></uniLoadMore>
		</view>

	</view>
</template>

<script>
	import uniLoadMore from '@/components/uni-load-more/uni-load-more.vue';
	import {
		api,
		requestsuccess
	} from "../../api/request.js"
	import empty from "@/components/empty";

	export default {
		components: {
			uniLoadMore,
			empty
		},
		data() {
			return {
				tabCurrentIndex: 0,
				navList: [{
						state: 0,
						text: '全部',
						orderList: []
					},
					{
						state: 1,
						text: '待付款',
						orderList: []
					},
					{
						state: 2,
						text: '待收货',
						orderList: []
					},
				],
				userInfo: {},
				listdata: [],
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

		onLoad(options) {
			if (options.state == undefined) {
				options.state = 0
			}
			this.tabCurrentIndex = +options.state;
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
			this.loadData()
		},
		methods: {
			//获取订单列表
			loadData(source) {
				let index = this.tabCurrentIndex;
				let navItem = this.navList[index];
				let state = navItem.state;
				let orderList = []
				let that = this
				this.loadingType = 0;
				let newOrderStatus = null
				if (state == 1) {
					newOrderStatus = 10
				}
				if (state == 2) {
					newOrderStatus = 20
				}
				uni.request({
					url: api + "/api/Order/QueryOrder",
					header: {
						"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
					},
					method: "POST",
					data: {
						newOrderStatus: newOrderStatus,
						pageIndex: 1,
						pageSize: 20,
						sortBy: "Sc_TimeCreated",
						sortType: "desc"
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
			},
			// 下拉 =>初始化加载
			onPullDownRefresh() {
				this.loadData()
			},
			// 上拉
			onReachBottom() {
				console.log(this.pageIndex)
				let index = this.tabCurrentIndex;
				let that = this
				let newOrderStatus = null
				if (index == 1) {
					newOrderStatus = 10
				}
				if (index == 2) {
					newOrderStatus = 20
				}
				if (that.pageIndex <= that.totalPages) {
					uni.showNavigationBarLoading(); //显示加载动画
					uni.request({
						url: api + "/api/Order/QueryOrder",
						header: {
							"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
						},
						method: "POST",
						data: {
							newOrderStatus: newOrderStatus,
							pageIndex: that.pageIndex + 1,
							pageSize: 20,
							sortBy: "Sc_TimeCreated",
							sortType: "desc"
						},
						success: function(res) {
							if (res.data.data.items.length <= 0) { //没有数据
								that.loadingType = 2;
								that.status = "noMore"
								uni.hideNavigationBarLoading(); //关闭加载动画
								return;
							}
							console.log(res.data.data.items)
							that.pageIndex++; //每触底一次 page +1
							that.listdata = that.listdata.concat(res.data.data.items) //将数据拼接在一起
							that.loadingType = 0; //将loadingType归0重置
							uni.hideNavigationBarLoading(); //关闭加载动画
						}
					});
				} else {
					that.status = "noMore"
				}
			},
			//顶部tab点击
			tabClick(index) {
				this.tabCurrentIndex = index;
				this.loadData()
			},
			//取消订单
			cancelOrder(item) {
				this.$api.msg("取消订单")
			},
			//确认收货
			confirmlOrder(item) {
				this.$api.msg("确认收货")
			},
			// 立即支付
			pay(item) {
				console.log(item)
			},
			navtodatails(item) {
				uni.navigateTo({
					url: "../user/orderlist/orderdatails/orderdatails?orderNo=" + item.orderNo
				})

			}
		},
	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
		height: 100%;
	}

	.swiper-box {
		height: calc(100% - 40px);
	}

	.list-scroll-content {
		height: 100%;
	}

	.navbar {
		display: flex;
		height: 40px;
		padding: 0 5px;
		background: #fff;
		box-shadow: 0 1px 5px rgba(0, 0, 0, .06);
		position: fixed;
		width: 100%;
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 15px;
			color: $font-color-dark;
			position: relative;

			&.current {
				color: $base-color;

				&:after {
					content: '';
					position: absolute;
					left: 50%;
					bottom: 0;
					transform: translateX(-50%);
					width: 44px;
					height: 0;
					border-bottom: 2px solid $base-color;
				}
			}
		}
	}

	.ordergroup {
		padding-top: 80upx;
	}

	.order-item {
		display: flex;
		flex-direction: column;
		padding-left: 30upx;
		background: #fff;
		margin-bottom: 20upx;

		.i-top {
			display: flex;
			align-items: center;
			height: 80upx;
			padding-right: 30upx;
			font-size: $font-base;
			color: $font-color-dark;
			position: relative;

			.time {
				flex: 1;
			}

			.state {
				color: $base-color;
			}

			.del-btn {
				padding: 10upx 0 10upx 36upx;
				font-size: $font-lg;
				color: $font-color-light;
				position: relative;

				&:after {
					content: '';
					width: 0;
					height: 30upx;
					border-left: 1px solid $border-color-dark;
					position: absolute;
					left: 20upx;
					top: 50%;
					transform: translateY(-50%);
				}
			}
		}

		/* 多条商品 */
		.goods-box {
			height: 160upx;
			padding: 20upx 0;
			white-space: nowrap;

			.goods-item {
				width: 120upx;
				height: 120upx;
				display: inline-block;
				margin-right: 24upx;
			}

			.goods-img {
				display: block;
				width: 100%;
				height: 100%;
			}
		}

		/* 单条商品 */
		.goods-box-single {
			display: flex;
			padding: 20upx 0;

			.goods-img {
				display: block;
				width: 120upx;
				height: 120upx;
			}

			.right {
				flex: 1;
				display: flex;
				flex-direction: column;
				padding: 0 30upx 0 24upx;
				overflow: hidden;

				.title {
					font-size: $font-base + 2upx;
					color: $font-color-dark;
					line-height: 1;
				}

				.attr-box {
					font-size: $font-sm + 2upx;
					color: $font-color-light;
					padding: 10upx 0upx;
				}

				.price {
					font-size: $font-base + 2upx;
					color: $font-color-dark;

					&:before {
						content: '￥';
						font-size: $font-sm;
						margin: 0 2upx 0 8upx;
					}
				}
			}
		}

		.price-box {
			display: flex;
			justify-content: flex-end;
			align-items: baseline;
			padding: 20upx 30upx;
			font-size: $font-sm + 2upx;
			color: $font-color-light;

			.num {
				margin: 0 8upx;
				color: $font-color-dark;
			}

			.price {
				font-size: $font-lg;
				color: $font-color-dark;

				&:before {
					content: '￥';
					font-size: $font-sm;
					margin: 0 2upx 0 8upx;
				}
			}
		}

		.action-box {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			height: 100upx;
			position: relative;
			padding-right: 30upx;
		}

		.action-btn {
			width: 160upx;
			height: 60upx;
			margin: 0;
			margin-left: 24upx;
			padding: 0;
			text-align: center;
			line-height: 60upx;
			font-size: $font-sm + 2upx;
			color: $font-color-dark;
			background: #fff;
			border-radius: 100px;

			&:after {
				border-radius: 100px;
			}

			&.recom {
				background: #fff9f9;
				color: $base-color;

				&:after {
					border-color: #f7bcc8;
				}
			}
		}
	}


	/* load-more */
	.uni-load-more {
		display: flex;
		flex-direction: row;
		height: 80upx;
		align-items: center;
		justify-content: center
	}

	.uni-load-more__text {
		font-size: 28upx;
		color: #999
	}

	.uni-load-more__img {
		height: 24px;
		width: 24px;
		margin-right: 10px
	}

	.uni-load-more__img>view {
		position: absolute
	}

	.uni-load-more__img>view view {
		width: 6px;
		height: 2px;
		border-top-left-radius: 1px;
		border-bottom-left-radius: 1px;
		background: #999;
		position: absolute;
		opacity: .2;
		transform-origin: 50%;
		animation: load 1.56s ease infinite
	}

	.uni-load-more__img>view view:nth-child(1) {
		transform: rotate(90deg);
		top: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(2) {
		transform: rotate(180deg);
		top: 11px;
		right: 0
	}

	.uni-load-more__img>view view:nth-child(3) {
		transform: rotate(270deg);
		bottom: 2px;
		left: 9px
	}

	.uni-load-more__img>view view:nth-child(4) {
		top: 11px;
		left: 0
	}

	.load1,
	.load2,
	.load3 {
		height: 24px;
		width: 24px
	}

	.load2 {
		transform: rotate(30deg)
	}

	.load3 {
		transform: rotate(60deg)
	}

	.load1 view:nth-child(1) {
		animation-delay: 0s
	}

	.load2 view:nth-child(1) {
		animation-delay: .13s
	}

	.load3 view:nth-child(1) {
		animation-delay: .26s
	}

	.load1 view:nth-child(2) {
		animation-delay: .39s
	}

	.load2 view:nth-child(2) {
		animation-delay: .52s
	}

	.load3 view:nth-child(2) {
		animation-delay: .65s
	}

	.load1 view:nth-child(3) {
		animation-delay: .78s
	}

	.load2 view:nth-child(3) {
		animation-delay: .91s
	}

	.load3 view:nth-child(3) {
		animation-delay: 1.04s
	}

	.load1 view:nth-child(4) {
		animation-delay: 1.17s
	}

	.load2 view:nth-child(4) {
		animation-delay: 1.3s
	}

	.load3 view:nth-child(4) {
		animation-delay: 1.43s
	}

	@-webkit-keyframes load {
		0% {
			opacity: 1
		}

		100% {
			opacity: .2
		}
	}
</style>
