<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="empty===true" class="empty">
			<image src="/static/Collection.png" mode="aspectFit"></image>
			<view class="empty-tips">
				暂无收藏
				<navigator class="navigator" url="../../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>

		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="index">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}" @click="tonavdatails(item)">
						<!-- <view class="image-wrapper"> -->
						<image :src="item.mainImg" mode="aspectFill"></image>
						<!-- </view> -->
						<view class="item-right">
							<text class="clamp title">{{item.styleName}}</text>
							<text class="attr">
								<text>商品ID：{{item.style}}</text>
							</text>
							<text class="price">¥{{item.price}}</text>
						</view>
						<text class="del-btn yticon icon-fork" @click.stop="deleteCartItem(item,index)"></text>
					</view>
				</block>
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
		components: {
			uniLoadMore
		},
		data() {
			return {
				empty: false, //空白页现实  true|false
				cartList: [],
				hasLogin: false,
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

		onShow() {
			let that = this
			// 获取缓存登录信息
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					that.userInfo = res.data
					that.pLevel = res.data.customer.pLevel
				},
				fail(res) {
					if (res.data == '') {}
				}
			})
			// 获取登录状态
			uni.getStorage({
				key: "hasLogin",
				success: function(res) {
					that.hasLogin = res.data
				},
				fail(res) {
					if (res.data == '') {
						that.hasLogin = false
					}
				}
			})
			this.loaddata()
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			}
		},
		methods: {

			loaddata() {
				let that = this
				uni.request({
					url: api + "/api/CustomerCollect/QueryCustomerCollect",
					method: "POST",
					header: {
						"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
					},
					data: {
						"pageIndex": 1,
						"pageSize": 6,
						"sortBy": "Sc_TimeCreated",
						"sortType": "desc"
					},
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
			// 上拉
			onReachBottom() {
				let that = this
				if (that.pageIndex <= that.totalPages) {
					uni.showNavigationBarLoading(); //显示加载动画
					uni.request({
						url: api + "/api/CustomerCollect/QueryCustomerCollect",
						method: "POST",
						header: {
							"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
						},
						data: {
							pageIndex: that.pageIndex + 1,
							pageSize: 6,
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
			//删除收藏
			deleteCartItem(item, index) {
				let that = this
				uni.showModal({
					content: '确定将这个宝贝移出收藏夹？',
					success: (e) => {
						if (e.confirm) {
							uni.request({
								url: api + "/api/CustomerCollect/DeleteCustomerCollect?style=" + item.style,
								method: "POST",
								header: {
									"Authorization": that.userInfo.token_type + ' ' + that.userInfo.access_token
								},
								success(res) {
									if (res.data.statusCode == requestsuccess) {
										that.$api.msg("取消收藏成功！")
										that.loaddata()
									}
								}
							})
						}
					}
				})

			},
			//跳转详情
			tonavdatails(item) {
				uni.navigateTo({
					url: "../../product/product?styleID=" + item.style
				})
			}
		}
	}
</script>

<style lang='scss'>
	.container {
		padding-bottom: 134upx;

		/* 空白页 */
		.empty {
			position: fixed;
			left: 0;
			top: 0;
			width: 100%;
			height: 100vh;
			padding-bottom: 100upx;
			display: flex;
			justify-content: center;
			flex-direction: column;
			align-items: center;
			background: #fff;

			image {
				width: 240upx;
				height: 160upx;
				margin-bottom: 30upx;
			}

			.empty-tips {
				display: flex;
				font-size: $font-sm+2upx;
				color: $font-color-disabled;

				.navigator {
					color: $uni-color-primary;
					margin-left: 16upx;
				}
			}
		}
	}

	/* 购物车列表项 */
	.cart-item {
		display: flex;
		position: relative;
		padding: 30upx 40upx;

		image {
			border-radius: 8upx;
			width: 200upx;
			height: 200upx;
		}

		.checkbox {
			position: absolute;
			left: -16upx;
			top: -16upx;
			z-index: 8;
			font-size: 44upx;
			line-height: 1;
			padding: 4upx;
			color: $font-color-disabled;
			background: #fff;
			border-radius: 50px;
		}

		.item-right {
			display: flex;
			flex-direction: column;
			flex: 1;
			overflow: hidden;
			position: relative;
			padding-left: 30upx;

			.title,
			.price {
				font-size: $font-base + 2upx;
				color: $font-color-dark;
				height: 40upx;
				line-height: 40upx;
			}

			.price {
				color: #FA436A;
			}

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				height: 50upx;
				line-height: 50upx;
			}

			.price {
				height: 50upx;
				line-height: 50upx;
			}
		}

		.del-btn {
			padding: 4upx 10upx;
			font-size: 34upx;
			height: 50upx;
			color: $font-color-light;
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
