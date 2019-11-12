<template>
	<view class="container">
		<view class="user-section">
			<image class="bg" src="/static/userheaderbg.png"></image>
			<view class="user-info-box" v-if="hasLogin ==false">
				<view class="portrait-box">
					<image class="portrait" :src="userInfo.url || '/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<text class="username">{{'游客'}}</text>
				</view>
			</view>
			<view class="user-info-box" v-else>
				<view class="portrait-box">
					<image class="portrait" :src="'/static/missing-face.png'"></image>
				</view>
				<view class="info-box">
					<view class="">
						<view class="" v-if="customer.pType ==0">商家</view>
						<view class="" v-if="customer.pType ==1">分销商</view>
						<view class="" v-if="customer.pType ==2">省代</view>
						<view class="" v-if="customer.pType ==3">市代</view>
						<view class="" v-if="customer.pType ==4">区代</view>
					</view>
					<text class="username">{{customer.customerName || '游客'}}</text>
				</view>
			</view>
		</view>
		<!-- 订单 -->
		<view class="cover-container">
			<view class="order-section">
				<view class="order-item" @click="navTo('/pages/order/order?state=0')" hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/order_ico2.png" mode=""></image>
					<text>全部订单</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=1')" hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/order_ico1.png" mode=""></image>
					<text>待付款</text>
				</view>
				<view class="order-item" @click="navTo('/pages/order/order?state=2')" hover-class="common-hover" :hover-stay-time="50">
					<image src="../../static/order_ico3.png" mode=""></image>
					<text>已付款</text>
				</view>
			</view>
			<view>
				<view class="history-section icon">
					<!-- <list-cell icon="/static/user-ico3.png" title="我的订单" @eventClick="navTo('/pages/user/orderlist/orderlist')"></list-cell> -->
					<list-cell icon="/static/user-ico6.png" title="分销钱包" @eventClick="navTo('/pages/user/Wallet/Wallet')"></list-cell>
					<list-cell icon="/static/user-ico4.png" title="我的分销商" @eventClick="navTo('/pages/user/DistributionList/DistributionList')"></list-cell>
					<list-cell icon="/static/user-ico5.png" v-if="applyFor ==2 || applyFor ==3 || applyFor ==4" title="申请成为区域代理"
					 @eventClick="navTo('/pages/user/ApplyAgent/ApplyAgent')"></list-cell>
					<list-cell icon="/static/user-ico5.png" v-if="applyFor ==1" title="申请成为分销商" @eventClick="navTo('/pages/user/ApplyAgent/ApplyAgent')"></list-cell>
					<list-cell icon="/static/user-ico1.png" title="我的收藏" @eventClick="navTo('/pages/user/Collection/Collection')"></list-cell>
					<list-cell icon="/static/user-ico7.png" title="地址管理" @eventClick="navTo('/pages/address/address')"></list-cell>
					<list-cell icon="/static/user-ico2.png" title="设置" border="" @eventClick="navTo('/pages/set/set')"></list-cell>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';
	import {
		api,
		requestsuccess,
		requesterror
	} from '../../api/request.js'
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell,
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				hasLogin: false,
				userInfo: {},
				applyFor: 0,
				customer: {},
			}
		},
		onShow() {
			let that = this
			// 获取缓存token
			uni.getStorage({
				key: 'userInfo',
				success: function(res) {
					that.userInfo = res.data
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
			// 获取用户可以申请的身份及用户信息
			uni.request({
				url: api + "/api/Customer/GetMyData",
				header: {
					"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
				},
				success: (res) => {
					if (res.data.statusCode == requestsuccess) {
						that.applyFor = res.data.data.applyFor
						that.customer = res.data.data.customer

					}
				}
			})
		},
		// #ifndef MP
		onNavigationBarButtonTap(e) {
			const index = e.index;
			if (index === 0) {
				this.navTo('/pages/set/set');
			} else if (index === 1) {
				// #ifdef APP-PLUS
				const pages = getCurrentPages();
				const page = pages[pages.length - 1];
				const currentWebview = page.$getAppWebview();
				currentWebview.hideTitleNViewButtonRedDot({
					index
				});
				// #endif
				uni.navigateTo({
					url: '/pages/notice/notice'
				})
			}
		},
		// #endif
		computed: {
			// ...mapState(['hasLogin','userInfo'])
		},
		methods: {

			/**
			 * 统一跳转接口,拦截未登录路由
			 * navigator标签现在默认没有转场动画，所以用view
			 */
			navTo(url) {
				if (!this.hasLogin) {
					url = '/pages/public/login';
				}
				uni.navigateTo({
					url
				})
			},

			/**
			 *  会员卡下拉和回弹
			 *  1.关闭bounce避免ios端下拉冲突
			 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
			 *    transition设置0.1秒延迟，让css来过渡这段空窗期
			 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
			 */
			coverTouchstart(e) {
				if (pageAtTop === false) {
					return;
				}
				this.coverTransition = 'transform .1s linear';
				startY = e.touches[0].clientY;
			},
			coverTouchmove(e) {
				moveY = e.touches[0].clientY;
				let moveDistance = moveY - startY;
				if (moveDistance < 0) {
					this.moving = false;
					return;
				}
				this.moving = true;
				if (moveDistance >= 80 && moveDistance < 100) {
					moveDistance = 80;
				}

				if (moveDistance > 0 && moveDistance <= 80) {
					this.coverTransform = `translateY(${moveDistance}px)`;
				}
			},
			coverTouchend() {
				if (this.moving === false) {
					return;
				}
				this.moving = false;
				this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
				this.coverTransform = 'translateY(0px)';
			},
		}
	}
</script>
<style lang='scss'>
	%flex-center {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	%section {
		display: flex;
		justify-content: space-around;
		align-content: center;
		background: #fff;
		border-radius: 10upx;
	}

	.user-section {
		/* height: 520upx; */
		color: #FFFFFF;
		padding: 100upx 30upx 100upx;
		position: relative;
		z-index: -1;
		.bg {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			filter: blur(1px);
			/* opacity: .7; */
		}
	}

	.user-info-box {
		height: 180upx;
		display: flex;
		align-items: center;
		position: relative;
		z-index: 1;

		.portrait {
			width: 130upx;
			height: 130upx;
			border: 5upx solid #fff;
			border-radius: 50%;
			margin-right: 20upx;
		}

		.username {
			font-size: $font-lg + 6upx;
			color: #FFFFFF;
		}
	}

	.vip-card-box {
		display: flex;
		flex-direction: column;
		color: #f7d680;
		height: 240upx;
		background: linear-gradient(left, rgba(0, 0, 0, .7), rgba(0, 0, 0, .8));
		border-radius: 16upx 16upx 0 0;
		overflow: hidden;
		position: relative;
		padding: 20upx 24upx;

		.card-bg {
			position: absolute;
			top: 20upx;
			right: 0;
			width: 380upx;
			height: 260upx;
		}

		.b-btn {
			position: absolute;
			right: 20upx;
			top: 16upx;
			width: 132upx;
			height: 40upx;
			text-align: center;
			line-height: 40upx;
			font-size: 22upx;
			color: #36343c;
			border-radius: 20px;
			background: linear-gradient(left, #f9e6af, #ffd465);
			z-index: 1;
		}

		.tit {
			font-size: $font-base+2upx;
			color: #f7d680;
			margin-bottom: 28upx;

			.yticon {
				color: #f6e5a3;
				margin-right: 16upx;
			}
		}

		.e-b {
			font-size: $font-sm;
			color: #d8cba9;
			margin-top: 10upx;
		}
	}

	.cover-container {
		background: $page-color-base;
		padding: 30upx;
		background: #f5f5f5;
		padding-bottom: 20upx;
		height: 100%;

		.arc {
			position: absolute;
			left: 0;
			top: -34upx;
			width: 100%;
			height: 36upx;
		}
	}

	.tj-sction {
		@extend %section;

		.tj-item {
			@extend %flex-center;
			flex-direction: column;
			height: 140upx;
			font-size: $font-sm;
			color: #75787d;
		}

		.num {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 8upx;
		}
	}

	.order-section {
		@extend %section;
		padding: 28upx 0;
		margin-bottom: 20upx;
		margin-top: -118upx;
		.order-item {
			@extend %flex-center;
			width: 120upx;
			border-radius: 10upx;
			font-size: $font-sm;
		}

		image {
			width: 70upx;
			height: 70upx;
			margin-bottom: 18upx;
		}
		
	}

	.history-section {
		/* padding: 30upx 0 0; */
		/* margin-top: 20upx; */
		background: #fff;
		border-radius: 10upx;

		.sec-header {
			display: flex;
			align-items: center;
			font-size: $font-base;
			color: $font-color-dark;
			line-height: 40upx;
			margin-left: 30upx;

			.yticon {
				font-size: 44upx;
				color: #5eba8f;
				margin-right: 16upx;
				line-height: 40upx;
			}
		}

		.h-list {
			white-space: nowrap;
			padding: 30upx 30upx 0;

			image {
				display: inline-block;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				border-radius: 10upx;
			}
		}
	}
</style>
