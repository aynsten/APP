<template>
	<view class="content b-t">
			<image src="../../static/notdata.png" v-if="addressList.length<=0" style="width: 100%" mode="widthFix"></image>
		<view class="list b-b" v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view class="address-box">
					<text v-if="item.hlIsDefault =='Y'" class="tag">默认</text>
					<text class="address">{{item.storename}}</text>
				</view>
				<view class="u-box">
					<text class="name">{{item.provinceName}} {{item.cityName}} {{item.regionName}} {{item.addresS1}}</text>
				</view>
			</view>
			<text class="yticon icon-bianji" @click.stop="addAddress('edit', item)"></text>
		</view>
			<button class="add-btn" @click="addAddress('add')">新增地址</button>
	</view>
</template>

<script>
	import {
		api,
		requestsuccess
	} from '../../api/request.js'
	export default {
		data() {
			return {
				source: 0,
				addressList: [],
				userInfo: {},
			}
		},
		onLoad(option) {
			console.log(option.source);
			this.source = option.source;
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
				url: api + "/api/Order/GetStores",
				header: {
					"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
				},
				success: (res) => {
					if (res.data.statusCode == requestsuccess) {
						that.addressList = res.data.data
					}

				}
			})
		},
		methods: {
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					uni.setStorage({
						key: 'addressData',
						data: item,

					});
					uni.navigateBack()
				}
			},
			// 添加地址
			addAddress(type, item){
				uni.navigateTo({
					url: `/pages/address/addressManage?type=${type}&data=${JSON.stringify(item)}`
				})
			},
		}
	}
</script>

<style lang='scss'>
	page {
		padding-bottom: 120upx;
	}

	.content {
		position: relative;
	}

	.list {
		display: flex;
		align-items: center;
		padding: 20upx 30upx;
		;
		background: #fff;
		position: relative;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.address-box {
		display: flex;
		align-items: center;

		.tag {
			font-size: 24upx;
			color: $base-color;
			margin-right: 10upx;
			background: #fffafb;
			border: 1px solid #ffb4c7;
			border-radius: 4upx;
			padding: 4upx 10upx;
			line-height: 1;
		}

		.address {
			font-size: 30upx;
			color: $font-color-dark;
		}
	}

	.u-box {
		font-size: 28upx;
		color: $font-color-light;
		margin-top: 16upx;

		.name {
			margin-right: 30upx;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80upx;
		font-size: 40upx;
		color: $font-color-light;
		padding-left: 30upx;
	}

	.add-btn {
		position: fixed;
		left: 30upx;
		right: 30upx;
		bottom: 16upx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		font-size: 32upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}
</style>
