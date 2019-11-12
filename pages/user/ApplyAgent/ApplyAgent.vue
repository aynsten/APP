<template>
	<view>
		<image src="../../../static/applyagent.png" mode="aspectFill" style="width: 100%;"></image>
		<view class="form-box">
			<view class="uni-form-item uni-column applyselect-level">
				<label>申请身份</label>
				<view class="" v-if="level ==1">分销商</view>
				<view class="" v-if="level ==2">区代</view>
				<view class="" v-if="level ==3">市代</view>
				<view class="" v-if="level ==4">省代</view>
			</view>
			<view class="uni-form-item uni-column applyselect" v-if="level>1">
				<label>区域</label>
				<view @tap="openpicker">
					{{temptitle}}
				</view>
				<!-- <select name="" id="" v-model="provincecode" @change="changeGetRegionAll(provincecode)">
					<option :value="item.code" v-for="(item,index) in GetRegionAll" :key="index">{{item.regionName}}</option>
				</select>
				<select name="" id="" v-model="citycode" @change="changecity(provincecode)" v-if="level ==3 || level ==2 ">
					<option :value="item.code" v-for="(item,index) in city" :key="index">{{item.regionName}}</option>
				</select>
				<select name="" id="" v-model="areacode" v-if="level ==3  ||level ==0">
					<option :value="item.code" v-for="(item,index) in area" :key="index">{{item.regionName}}</option>
				</select> -->

			</view>
			<KPicker @cancel="cancel" :pickershow="pickershow" :datagroup="GetRegionAll" :level="level" @tempcode="tempcode"
			 @temptext="temptext" />
			<button class="setup" @tap="setup">提交</button>
			<text class="describe">系统将在3个工作日内通知审核结果</text>
		</view>

	</view>
</template>

<script>
	import {
		api,
		requestsuccess,
		requesterror
	} from "../../../api/request.js"
	import KPicker from "./K-picker.vue";
	export default {
		components: {
			KPicker
		},
		data() {
			return {
				GetRegionAll: [],
				level: 0,
				province: [],
				provincecode: "",
				city: [],
				citycode: "",
				area: [],
				areacode: '',
				userInfo: {},
				pickershow: false,
				tempregionCode: "",
				temptitle: "请选择地址",
			};
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
			// 获取省市区
			uni.request({
					url: api + "/api/Region/GetRegionAll",
					header: {
						"Authorization": that.userInfo.token_type + " " + that.userInfo.access_token
					},
					success(res) {
						if (res.data.statusCode == requestsuccess) {
							that.GetRegionAll = res.data.data
						}
					}
				}),
				// 获取用户可以申请的身份
				uni.request({
					url: api + "/api/Customer/GetMyData",
					header: {
						"Authorization": that.userInfo.token_type + " " + that.userInfo.access_token
					},
					success: (res) => {
						if (res.data.statusCode == requestsuccess) {
							that.level = res.data.data.applyFor
						}

					}
				})
		},
		methods: {
			// 提交
			setup() {
				let that = this
				uni.request({
					url: api + "/api/CustomerAudit/ApplyFor",
					method: "POST",
					header: {
						"Authorization": that.userInfo.token_type + " " + that.userInfo.access_token
					},
					data: {
						"regionCode": this.tempregionCode,
						"level": this.level
					},
					success(res) {
						if (res.data.statusCode == requestsuccess) {
							uni.showModal({
								content: '提交成功，请注意查收结果！',
								showCancel: false,
								success(res) {
									if (res.confirm) {
										setTimeout(() => {
											uni.switchTab({
												url: "../user"
											})
										}, 500)
									}
								}
							});
						}
						if (res.data.statusCode == requesterror) {

							uni.showModal({
								content: res.data.msg,
								showCancel: false,
								success(res) {
									if (res.confirm) {
										setTimeout(() => {
											uni.switchTab({
												url: "../user"
											})
										}, 500)
									}
								}
							});
						}
					}
				})
			},
			openpicker() {
				this.pickershow = true
			},
			cancel() {
				this.pickershow = false
			},
			tempcode(data) {
				console.log(data)
				this.tempregionCode = data
				this.pickershow = false
			},
			temptext(data) {
				this.temptitle = data
			}
		},

	}
</script>

<style lang="scss">
	.form-box {
		padding: 30upx;

		.uni-column {
			display: flex;
			line-height: 80upx;

			label {
				font-size: 28upx;
				width: 25%;
			}

			.uni-input {
				font-size: 24upx;
				height: 80upx;
				border-bottom: 1px solid #D1D1D1;
				width: 75%;
			}
		}

		.setup {
			background: #4FBA4A;
			width: 320upx;
			height: 60upx;
			line-height: 60upx;
			color: #FFFFFF;
			border: none;
			margin: 40upx auto;
			font-size: 28upx;
			border-radius: 60upx;
		}

		.describe {
			display: block;
			width: 100%;
			font-size: 24upx;
			color: #888888;
			text-align: center;
		}
	}

	uni-button,
	select:after {
		border: none;
	}

	.applyselect {
		font-size: 28upx;
	}

	.applyselect-level {
		view {
			width: 75%;
			border: none;
			border-bottom: 1px solid #D1D1D1;
			font-size: 28upx;
			color: #606266;
		}

	}
</style>
