<template>
	<view>
		<view class="goods-section">
			<view class="g-item" v-for="(item,index) in datagroup.orderStyles" :key="index">
				<image :src="item.mainImg"></image>
				<view class="right">
					<text class="title clamp">{{item.styleDesc}}</text>
					<text class="spec">颜色：{{item.color}}</text> --
					<text class="spec">尺寸：{{item.size}}</text>
					<view class="price-box">
						<text class="price">￥{{item.price | NumToFixed}}</text>
						<text class="number">x {{item.orderQty}}</text>
					</view>
				</view>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="yt-list" v-if="datagroup.orderHead !=undefined">
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单总额</text>
				<text class="cell-tip">￥{{datagroup.orderHead.totalAmount | NumToFixed}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单编号</text>
				<text class="cell-tip">{{datagroup.orderHead.orderNo}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">订单状态</text>
				<text class="cell-tip" v-if="datagroup.orderHead.newOrderStatus ==10" style="color: #FA436A;">待付款</text>
				<text class="cell-tip" v-if="datagroup.orderHead.newOrderStatus ==20">已付款</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">仓库</text>
				<text class="cell-tip">{{datagroup.orderHead.wareHouse}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">国家</text>
				<text class="cell-tip">{{datagroup.orderHead.country}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">货币单位</text>
				<text class="cell-tip">{{datagroup.orderHead.currency}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">客户</text>
				<text class="cell-tip">{{datagroup.orderHead.customer}}</text>
			</view>
			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">客户名称</text>
				<text class="cell-tip">{{datagroup.orderHead.customerName}}</text>
			</view>

			<view class="yt-list-cell b-b">
				<text class="cell-tit clamp">下单时间</text>
				<text class="cell-tip">{{datagroup.orderHead.orderDate}}</text>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		api,
		requestsuccess
	} from "../../../../api/request.js"
	export default {
		data() {
			return {
				addressData: {},
				datagroup: {},
			}
		},
		onLoad(options) {
			this.orderNo = options.orderNo
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
				url: api + "/api/Order/GetOrderDetail?orderNo=" + that.orderNo,
				header: {
					"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
				},
				success(res) {
					if (res.data.statusCode == requestsuccess) {
						that.datagroup = res.data.data
					}
				}
			})
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-bottom: 100upx;
	}

	.address-section {
		padding: 30upx 0;
		background: #fff;
		position: relative;

		.order-content {
			display: flex;
			align-items: center;
		}

		.icon-shouhuodizhi {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 90upx;
			color: #888;
			font-size: 44upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
			color: $font-color-light;
		}

		.icon-you {
			font-size: 32upx;
			color: $font-color-light;
			margin-right: 30upx;
		}

		.a-bg {
			position: absolute;
			left: 0;
			bottom: 0;
			display: block;
			width: 100%;
			height: 5upx;
		}
	}

	.goods-section {
		margin-top: 16upx;
		background: #fff;
		padding-bottom: 1px;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 30upx;
			position: relative;
		}

		.logo {
			display: block;
			width: 50upx;
			height: 50upx;
			border-radius: 100px;
		}

		.name {
			font-size: 30upx;
			color: $font-color-base;
			margin-left: 24upx;
		}

		.g-item {
			display: flex;
			margin: 20upx 30upx;

			image {
				flex-shrink: 0;
				display: block;
				width: 140upx;
				height: 140upx;
				border-radius: 4upx;
			}

			.right {
				flex: 1;
				padding-left: 24upx;
				overflow: hidden;
			}

			.title {
				font-size: 30upx;
				color: $font-color-dark;
			}

			.spec {
				font-size: 26upx;
				color: $font-color-light;
			}

			.price-box {
				display: flex;
				align-items: center;
				font-size: 32upx;
				color: $font-color-dark;
				padding-top: 10upx;

				.price {
					margin-bottom: 4upx;
				}

				.number {
					font-size: 26upx;
					color: $font-color-base;
					margin-left: 20upx;
				}
			}

			.step-box {
				position: relative;
			}
		}
	}

	.yt-list {
		margin-top: 16upx;
		background: #fff;
	}

	.yt-list-cell {
		display: flex;
		align-items: center;
		padding: 10upx 30upx 10upx 40upx;
		line-height: 70upx;
		position: relative;

		&.cell-hover {
			background: #fafafa;
		}

		&.b-b:after {
			left: 30upx;
		}

		.cell-icon {
			height: 32upx;
			width: 32upx;
			font-size: 22upx;
			color: #fff;
			text-align: center;
			line-height: 32upx;
			background: #f85e52;
			border-radius: 4upx;
			margin-right: 12upx;

			&.hb {
				background: #ffaa0e;
			}

			&.lpk {
				background: #3ab54a;
			}

		}

		.cell-more {
			align-self: center;
			font-size: 24upx;
			color: $font-color-light;
			margin-left: 8upx;
			margin-right: -10upx;
		}

		.cell-tit {
			flex: 1;
			font-size: 26upx;
			color: $font-color-light;
			margin-right: 10upx;
		}

		.cell-tip {
			font-size: 26upx;
			color: $font-color-dark;

			&.disabled {
				color: $font-color-light;
			}

			&.active {
				color: $base-color;
			}

			&.red {
				color: $base-color;
			}
		}

		&.desc-cell {
			.cell-tit {
				max-width: 90upx;
			}
		}

		.desc {
			flex: 1;
			font-size: $font-base;
			color: $font-color-dark;
		}
	}
</style>
