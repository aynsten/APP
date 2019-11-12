<template>
	<view class="content">
		<!-- <view class="navbar" :style="{position:headerPosition,top:headerTop}">
			<view class="nav-item" :class="{current: filterIndex === 0}" @click="tabClick(0)">
				综合排序
			</view>
			<view class="nav-item" :class="{current: filterIndex === 1}" @click="tabClick(1)">
				销量优先
			</view>
			<view class="nav-item" :class="{current: filterIndex === 2}" @click="tabClick(2)">
				<text>价格</text>
				<view class="p-box">
					<text :class="{active: priceOrder === 1 && filterIndex === 2}" class="yticon icon-shang"></text>
					<text :class="{active: priceOrder === 2 && filterIndex === 2}" class="yticon icon-shang xia"></text>
				</view>
			</view>
		</view> -->
		<image src="../../static/notdata.png" v-if="cartList.length<=0" style="width: 100%" mode="widthFix"></image>
		<view class="" v-else>
			<view class="goods-list">
				<view v-for="(item, index) in cartList" :key="index" class="goods-item" @click="navToDetailPage(item)">
					<view class="image-wrapper">
						<image :src="item.mainImg" mode="aspectFill"></image>
					</view>
					<text class="title clamp">{{item.styleName}}</text>
					<view class="price-box">
						<text class="price">{{item.price}}</text>
						<!-- <text class="price" v-if="pType ==0 || pType ==1">{{item.price}}</text>
					<text class="price" v-if="pType ==2">{{item.provincialPrice}}</text>
					<text class="price" v-if="pType ==3">{{item.cityPrice}}</text>
					<text class="price" v-if="pType ==4">{{item.regionPrice}}</text> -->
					</view>
				</view>

			</view>
			<uniLoadMore :loadingType="loadingType" :contentText="contentText" :status="status"></uniLoadMore>
		</view>
	</view>
</template>

<script>
	import uniLoadMore from "../../components/uni-load-more/uni-load-more.vue"
	import {
		api,
		requestsuccess
	} from '../../api/request.js'
	export default {
		data() {
			return {
				headerPosition: "fixed",
				headerTop: "0px",
				filterIndex: 0,
				priceOrder: 0, //1 价格从低到高 2价格从高到低
				cateList: [],
				cartList: [],
				merchGroupA: '',
				merchGroupB: '',
				userInfo: {},
				pType: 0,
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
			this.merchGroupA = options.merchGroupA
			this.merchGroupB = options.merchGroupB
			// #ifdef H5
			this.headerTop = document.getElementsByTagName('uni-page-head')[0].offsetHeight + 'px';
			// #endif

		},
		onShow() {
			let that = this
			// 获取缓存登录信息
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					that.userInfo = res.data
					that.pType = res.data.customer.pType
				},
				fail(res) {
					if (res.data == '') {}
				}
			})
			this.loaddata()
		},
		methods: {
			loaddata() {
				let that = this
				uni.request({
					url: api + "/api/NewStyle/QueryStyle",
					data: {
						"styleName": "",
						"pageIndex": 1,
						"pageSize": 20,
						"sortBy": "Sc_TimeCreated",
						"sortType": "desc",
						"merchGroupA": that.merchGroupA,
						"merchGroupB": that.merchGroupB,
					},
					method: "POST",
					success(res) {
						if (res.data.statusCode == requestsuccess) {
							that.cartList = res.data.data.items
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
				this.loaddata()
			},
			onReachBottom() {
				let that = this
				if (that.pageIndex <= that.totalPages) {
					uni.showNavigationBarLoading(); //显示加载动画
					uni.request({
						url: api + "/api/NewStyle/QueryStyle",
						method: "POST",
						header: {
							"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
						},
						data: {
							"styleName": "",
							"pageIndex": that.pageIndex + 1,
							"pageSize": 20,
							"sortBy": "Sc_TimeCreated",
							"sortType": "desc",
							"merchGroupA": that.merchGroupA,
							"merchGroupB": that.merchGroupB,
						},
						success: function(res) {
							if (res.data.data.items.length <= 0) { //没有数据
								that.loadingType = 2;
								that.status = "noMore"
								uni.hideNavigationBarLoading(); //关闭加载动画
								return;
							}
							that.pageIndex++; //每触底一次 page +1
							that.cartList = that.cartList.concat(res.data.data.items) //将数据拼接在一起

							that.loadingType = 0; //将loadingType归0重置
							uni.hideNavigationBarLoading(); //关闭加载动画
						}
					});
				} else {
					that.status = "noMore"
				}
			},
			//筛选点击
			// tabClick(index) {
			// 	if (this.filterIndex === index && index !== 2) {
			// 		return;
			// 	}
			// 	this.filterIndex = index;
			// 	if (index === 2) {
			// 		this.priceOrder = this.priceOrder === 1 ? 2 : 1;
			// 	} else {
			// 		this.priceOrder = 0;
			// 	}
			// 	uni.pageScrollTo({
			// 		duration: 300,
			// 		scrollTop: 0
			// 	})
			// 	// this.loadData('refresh', 1);
			// 	// uni.showLoading({
			// 	// 	title: '正在加载'
			// 	// })
			// },
			// 跳转到详情页面
			navToDetailPage(item) {
				uni.navigateTo({
					url: "product?styleID=" + item.style
				})
			},
		},
		components: {
			uniLoadMore
		}

	}
</script>

<style lang="scss">
	page,
	.content {
		background: $page-color-base;
	}

	.content {
		padding-top: 30upx;
	}

	.navbar {
		position: fixed;
		left: 0;
		top: var(--window-top);
		display: flex;
		width: 100%;
		height: 80upx;
		background: #fff;
		box-shadow: 0 2upx 10upx rgba(0, 0, 0, .06);
		z-index: 10;

		.nav-item {
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			font-size: 30upx;
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
					width: 120upx;
					height: 0;
					border-bottom: 4upx solid $base-color;

				}
			}
		}

		.p-box {
			display: flex;
			flex-direction: column;

			.yticon {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 30upx;
				height: 14upx;
				line-height: 1;
				margin-left: 4upx;
				font-size: 26upx;
				color: #888;

				&.active {
					color: $base-color;
				}
			}

			.xia {
				transform: scaleY(-1);
			}
		}

		.cate-item {
			display: flex;
			justify-content: center;
			align-items: center;
			height: 100%;
			width: 80upx;
			position: relative;
			font-size: 44upx;

			&:after {
				content: '';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
				border-left: 1px solid #ddd;
				width: 0;
				height: 36upx;
			}
		}
	}

	/* 分类 */
	.cate-mask {
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 95;
		transition: .3s;

		.cate-content {
			width: 630upx;
			height: 100%;
			background: #fff;
			float: right;
			transform: translateX(100%);
			transition: .3s;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.cate-content {
				transform: translateX(0);
			}
		}
	}

	.cate-list {
		display: flex;
		flex-direction: column;
		height: 100%;

		.cate-item {
			display: flex;
			align-items: center;
			height: 90upx;
			padding-left: 30upx;
			font-size: 28upx;
			color: #555;
			position: relative;
		}

		.two {
			height: 64upx;
			color: #303133;
			font-size: 30upx;
			background: #f8f8f8;
		}

		.active {
			color: $base-color;
		}
	}

	/* 商品列表 */
	.goods-list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30upx;
		background: #fff;

		.goods-item {
			display: flex;
			flex-direction: column;
			width: 48%;
			padding-bottom: 40upx;

			&:nth-child(2n+1) {
				margin-right: 4%;
			}
		}

		.image-wrapper {
			width: 100%;
			height: 330upx;
			border-radius: 3px;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
				opacity: 1;
			}
		}

		.title {
			font-size: $font-lg;
			color: $font-color-dark;
			line-height: 80upx;
		}

		.price-box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-right: 10upx;
			font-size: 24upx;
			color: $font-color-light;
		}

		.price {
			font-size: $font-lg;
			color: $uni-color-primary;
			line-height: 1;

			&:before {
				content: '￥';
				font-size: 26upx;
			}
		}
	}
</style>
