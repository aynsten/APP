<template>
	<view class="content">
		<view class="row b-b">
			<text class="tit">省市区</text>
			<text @click="openpicker" class="input" v-if="addressData.provinceName !=undefined">
				{{addressData.provinceName}} {{addressData.cityName}} {{addressData.regionName}}
			</text>
			<text @click="openpicker" class="input" v-else>
				请选择省市区
			</text>
		</view>

		<view class="row b-b">
			<text class="tit">名称</text>
			<input class="input" type="text" v-model="addressData.storename" placeholder="名称" placeholder-class="placeholder" />
		</view>
		<view class="row b-b">
			<text class="tit">地址</text>
			<input class="input" type="text" v-model="addressData.addresS1" placeholder="楼号、门牌" placeholder-class="placeholder" />
		</view>
		<view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.defaule" color="#fa436a" @change="switchChange" />
		</view>
		<view class="row default-row">
			<text class="tit" style="color: #FA436A;" @click="removeaddress(addressData)">删除收货地址</text>

		</view>
		<button class="add-btn" @click="confirm">提交</button>
		<KPicker @cancel="cancel" :pickershow="pickershow" :datagroup="GetRegionAll" @tempcode="tempcode" @temptext="temptext" />
	</view>
</template>

<script>
	import {
		api,
		requestsuccess
	} from '../../api/request.js'
	import KPicker from "./K-picker.vue";
	export default {
		components: {
			KPicker
		},
		data() {
			return {
				pickershow: false,
				GetRegionAll: [],
				temptitle: '点击选择省市区',
				addressData: {},
				manageType: ""
			}
		},
		onLoad(option) {
			let title = '';
			if (option.type === 'edit') {
				title = '编辑收货地址'
				this.addressData = JSON.parse(option.data)
			}
			if (option.type === 'add') {
				title = "新增收货地址"
			}
			this.manageType = option.type;
			uni.setNavigationBarTitle({
				title
			})
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
			})
		},
		methods: {
			switchChange(e) {
				console.log(e.detail)
				if (e.detail == true) {
					this.addressData.hlIsDefault = "N"
				} else {
					this.addressData.hlIsDefault = "Y"
				}

			},

			//选择省市区
			openpicker() {
				this.pickershow = true
			},
			// 取消
			cancel() {
				this.pickershow = false
			},
			// 确定
			tempcode(data) {
				this.addressData = data
				this.pickershow = false
			},
			// 回传地址信息
			temptext(data) {
				this.temptitle = data
				this.pickershow = false
			},
			//提交
			confirm() {
				let that = this
				if (that.manageType == 'add') {
					that.addressData.store = null
					if (that.addressData.provinceName == undefined ||
						that.addressData.cityName == undefined ||
						that.addressData.regionName == undefined ||
						that.addressData.provinceName == '' ||
						that.addressData.cityName == '' ||
						that.addressData.regionName == ''
					) {
						that.$api.msg('请选择省市区')
						setTimeout(function() {
							that.pickershow = true
						}, 500);

						return
					}

					if (that.addressData.storename == undefined || that.addressData.storename == '') {
						that.$api.msg('请输入名称')
						return
					}
					if (that.addressData.addresS1 == undefined || that.addressData.addresS1 == '') {
						that.$api.msg('地址不能为空')
						return
					}
					uni.request({
						url: api + '/api/Order/SaveStore',
						header: {
							"Authorization": that.userInfo.token_type + " " + that.userInfo.access_token
						},
						method: "POST",
						data: that.addressData,
						success(res) {
							if (res.data.statusCode == requestsuccess) {
								that.$api.msg("添加成功！即将返回上页！")
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							} else {
								that.$api.msg(res.data.msg)
							}
						}
					})
				}
				if (that.manageType == 'edit') {
					if (that.addressData.provinceName == undefined ||
						that.addressData.cityName == undefined ||
						that.addressData.regionName == undefined ||
						that.addressData.provinceName == '' ||
						that.addressData.cityName == '' ||
						that.addressData.regionName == ''
					) {
						that.$api.msg('请选择省市区')
						setTimeout(function() {
							that.pickershow = true
						}, 500);

						return
					}

					if (that.addressData.storename == undefined || that.addressData.storename == '') {
						that.$api.msg('请输入名称')
						return
					}
					if (that.addressData.addresS1 == undefined || that.addressData.addresS1 == '') {
						that.$api.msg('地址不能为空')
						return
					}
					uni.request({
						url: api + '/api/Order/SaveStore',
						header: {
							"Authorization": that.userInfo.token_type + " " + that.userInfo.access_token
						},
						method: "POST",
						data: that.addressData,
						success(res) {
							if (res.data.statusCode == requestsuccess) {
								that.$api.msg("修改成功！即将返回上页！")
								setTimeout(() => {
									uni.navigateBack()
								}, 1000)
							} else {
								that.$api.msg(res.data.msg)
							}
						}
					})
				}

				// //this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				// setTimeout(() => {
				// 	uni.navigateBack()
				// }, 800)
			},
			removeaddress(data) {
				let that = this
				uni.showModal({
					title: '确定删除该地址吗？',
					success(res) {
						if (confirm) {
							uni.request({
								url: api + '/api/Order/DeleteStore?store=' + data.store,
								header: {
									"Authorization": that.userInfo.token_type + " " + that.userInfo.access_token
								},
								method: "POST",
								success(res) {
									if (res.data.statusCode == requestsuccess) {
										uni.navigateBack()
									} else {
										that.$api.msg(res.daa.msg)
									}
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background: $page-color-base;
		padding-top: 16upx;
	}

	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 0 30upx;
		height: 110upx;
		background: #fff;

		.tit {
			flex-shrink: 0;
			width: 120upx;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.input {
			flex: 1;
			font-size: 28upx;
			color: $font-color-dark;
		}

		.icon-shouhuodizhi {
			font-size: 28upx;
			color: $font-color-light;
		}
	}

	.default-row {
		margin-top: 16upx;

		.tit {
			flex: 1;
		}

		switch {
			transform: translateX(16upx) scale(.9);
		}
	}

	.add-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 690upx;
		height: 80upx;
		margin: 60upx auto;
		font-size: 28upx;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.b-b:after,
	.b-t:after {
		border-bottom: none;
	}
</style>
