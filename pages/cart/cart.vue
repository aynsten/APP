<template>
	<view class="container">
		<!-- 空白页 -->
		<view v-if="empty===true" class="empty">
			<image src="/static/emptyCart.jpg" mode="aspectFit"></image>
			<view class="empty-tips">
				空空如也
				<navigator class="navigator" url="../index/index" open-type="switchTab">随便逛逛></navigator>
			</view>

		</view>
		<view v-else>
			<!-- 列表 -->
			<view class="cart-list">
				<block v-for="(item, index) in cartList" :key="index">
					<view class="cart-item" :class="{'b-b': index!==cartList.length-1}">
						<view class="image-wrapper">
							<image :src="item.mainImg"></image>
							<view class="yticon icon-xuanzhong2 checkbox" :class="{checked: item.checked}" @click="check('item', index)"></view>
						</view>
						<view class="item-right">
							<text class="clamp title">{{item.stylename}}</text>
							<text class="attr">
								<text>尺码 ：{{item.sizegroup.size}}</text>
							</text>
							<text class="attr">
								<text>颜色 ：{{item.colorgroup.color}}({{item.colorgroup.label}})</text>
							</text>
							<text class="price">¥{{item.price | NumToFixed}}</text>
							<uni-number-box class="step" :min="1" :value="item.orderQty" :index="index" @eventChange="numberChange"></uni-number-box>
						</view>
						<text class="del-btn yticon icon-fork" @click="deleteCartItem(item,index)"></text>
					</view>
				</block>
			</view>
			<!-- 底部菜单栏 -->
			<view class="action-section">
				<view class="checkbox">
					<image :src="allChecked?'/static/selected.png':'/static/select.png'" mode="aspectFit" @click="check('all')"></image>
					<view class="clear-btn" :class="{show: allChecked}" @click="clearCart">
						清空
					</view>
				</view>
				<view class="total-box">
					<text class="price">¥{{total |NumToFixed}}</text>
					<!-- <text class="coupon">
						已优惠
						<text>74.35</text>
						元
					</text> -->
				</view>
				<button type="primary" class="no-border confirm-btn" @click="createOrder">去结算</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNumberBox from '@/components/uni-number-box.vue'
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				total: 0, //总价格
				allChecked: true, //全选状态  true|false
				empty: false, //空白页现实  true|false
				cartList: [],
				hasLogin: false,
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
			// 获取缓存商品
			uni.getStorage({
				key: "cartList",
				success: function(res) {
					that.cartList = res.data
					that.calcTotal()
					for (let i = 0; i < that.cartList.length; i++) {
						if (that.cartList[i].checked) {
							that.allChecked = true
						} else {
							that.allChecked = false
							break
						}

					}
				},
				fail(res) {
					that.empty = true
				}
			})
		},
		watch: {
			//显示空白页
			cartList(e) {
				let empty = e.length === 0 ? true : false;
				if (this.empty !== empty) {
					this.empty = empty;
				}
			},

		},
		methods: {
			navToLogin() {
				uni.navigateTo({
					url: '/pages/public/login'
				})
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;

				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
				uni.setStorage({
					key: 'cartList',
					data: this.cartList,
				});
			},
			//数量
			numberChange(data) {
				this.cartList[data.index].orderQty = data.number;
				uni.setStorage({
					key: 'cartList',
					data: this.cartList,
				});
				this.calcTotal();
			},
			//删除
			deleteCartItem(item, index) {
				uni.showModal({
					content: '确定将这个宝贝删除？',
					success: (e) => {
						if (e.confirm) {
							let that = this
							that.cartList.some(v => {
								if (v.styleID == item.styleID && v.colorgroup.label == item.colorgroup.label && v.sizegroup.size ==
									item.sizegroup.size) {
									console.log(index)
									that.cartList.splice(index, 1);

								}
							})
							uni.setStorage({
								key: 'cartList',
								data: that.cartList,
							});
							this.calcTotal()
						}
					}
				})

			},
			//清空
			clearCart() {
				uni.showModal({
					content: '清空购物车？',
					success: (e) => {
						if (e.confirm) {
							this.cartList = [];
							uni.removeStorage({
								key: "cartList"
							})
						}
					}
				})
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				if (list.length === 0) {
					this.empty = true;
					return;
				}
				let total = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.orderPrice * item.orderQty;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
			},
			//创建订单
			createOrder() {
				let checkeddata = []
				this.cartList.forEach((item, index) => {
					if (item.checked) {
						checkeddata.push(item)
					}
				})
				if (checkeddata.length <= 0) {
					this.$api.msg('请勾选您要购买的商品');
					return
				}
				if (!this.hasLogin) {
					uni.showModal({
						content: '请登录后再进行操作!',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.navigateTo({
									url: "../public/login"
								})
							}
						}
					});
					return
				}
				uni.navigateTo({
					url: "../order/createOrder"
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

		.image-wrapper {

			width: 230upx;
			height: 230upx;
			flex-shrink: 0;
			position: relative;

			image {
				border-radius: 8upx;
				width: 100%;
				height: 100%;
				opacity: 1;
			}
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

			.attr {
				font-size: $font-sm + 2upx;
				color: $font-color-light;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
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

	/* 底部栏 */
	.action-section {
		/* #ifdef H5 */
		margin-bottom: 100upx;
		/* #endif */
		position: fixed;
		left: 30upx;
		bottom: 30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255, 255, 255, .9);
		box-shadow: 0 0 20upx 0 rgba(0, 0, 0, .5);
		border-radius: 16upx;

		.checkbox {
			height: 52upx;
			position: relative;

			image {
				width: 52upx;
				height: 100%;
				position: relative;
				z-index: 5;
			}
		}

		.clear-btn {
			position: absolute;
			left: 26upx;
			top: 0;
			z-index: 4;
			width: 0;
			height: 52upx;
			line-height: 52upx;
			padding-left: 38upx;
			font-size: $font-base;
			color: #fff;
			background: $font-color-disabled;
			border-radius: 0 50px 50px 0;
			opacity: 0;
			transition: .2s;

			&.show {
				opacity: 1;
				width: 120upx;
			}
		}

		.total-box {
			flex: 1;
			display: flex;
			flex-direction: column;
			text-align: right;
			padding-right: 40upx;

			.price {
				font-size: $font-lg;
				color: $font-color-dark;
			}

			.coupon {
				font-size: $font-sm;
				color: $font-color-light;

				text {
					color: $font-color-dark;
				}
			}
		}

		.confirm-btn {
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: $font-base + 2upx;
			background: $uni-color-primary;
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
	}

	/* 复选框选中状态 */
	.action-section .checkbox.checked,
	.cart-item .checkbox.checked {
		color: $uni-color-primary;
	}
</style>
