<template>
	<view>
		<view class="list">
			<image src="../../../static/notdata.png" v-if="listdata.length<=0" style="width: 100%" mode="widthFix"></image>
			<view class="list-item" v-for="(item,index) in listdata" :key="index">
				<view class="describe">
					<view class="">
						账号<text class="name">:{{item.phoneAccount}}</text>
					</view>
					<view class="">
						客户名称<text class="customerName">
							: {{item.customerName}}</small>
						</text>
					</view>
				</view>

			</view>
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
				listdata: [],
				userInfo: {},
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
			uni.request({
				url: api + "/api/CustomerDistributor/MyDistributorPagedList",
				method: "POST",
				data: {
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
					}
				}

			})
		},
		methods: {

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
			padding: 20upx 0;
			align-items: center;
		}

		.describe {
			width: 750upx;
			font-size: 30upx;
			color: #353535;
			line-height: 1.8;
			font-size: 26upx;

			.name {
				color: #888888;
			}

			.customerName {
				color: #888888;
			}
		}
	}
</style>
