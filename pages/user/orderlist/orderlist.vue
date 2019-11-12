<template>
	<view>
		<view class="list-group">
			<view class="list-item" v-for="(item,index) in listdata" :key="index" @tap="navtodatails(item)">
				<text>订单：{{item.orderNo}}</text>
				<view class="list-item-date">
					<text> {{item.orderDate}}</text>
					<text> ￥{{item.totalAmount | NumToFixed}} ({{item.country}})</text>
				</view>
			</view>
		</view>
		<uniLoadMore :loadingType="loadingType" :contentText="contentText" :status="status"></uniLoadMore>
	</view>
</template>
<script>
	import {
		api,
		requestsuccess
	} from "../../../api/request.js"
	import uniLoadMore from "../../../components/uni-load-more/uni-load-more.vue"
	export default {
		components: {
			uniLoadMore
		},
		data() {
			return {
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
			this.loaddata()
		},
		methods: {
			// 初始化加载
			loaddata() {
				let that = this
				this.loadingType = 0;
				uni.request({
					url: api + "/api/Order/QueryOrder",
					header: {
						"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
					},
					method: "POST",
					data: {
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
				this.loaddata()
			},
			// 上拉
			onReachBottom() {
				let that = this
				if (that.pageIndex <= that.totalPages) {
					uni.showNavigationBarLoading(); //显示加载动画
					uni.request({
						url: api + "/api/Order/QueryOrder",
						header: {
							"Authorization": this.userInfo.token_type + ' ' + this.userInfo.access_token
						},
						method: "POST",
						data: {
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
			navtodatails(item) {
				uni.navigateTo({
					url: "orderdatails/orderdatails?orderNo=" + item.orderNo
				})

			}
		}
	}
</script>

<style scoped lang="scss">
	.list-group {
		background: #FFFFFF;
		padding: 20upx 30upx;

		.list-item {
			padding: 20upx 30upx;
			border-bottom: 1px solid #f2f2f2;
			margin-bottom: 20upx;
			line-height: 1.8;
			font-size: 30upx;
			color: #353535;

			.list-item-date {
				display: flex;
				justify-content: space-between;
				font-size: 26upx;
				color: #888888;
			}
		}
	}
</style>
