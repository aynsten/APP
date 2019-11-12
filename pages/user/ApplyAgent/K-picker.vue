<template>
	<view class="">
		<view class="Mask" v-show="pickershow" @tap="cancel">

		</view>
		<view class="picker-cont" v-show="pickershow">
			<view class="picker-operation">
				<view @tap="cancel" class="cancel">取消</view>
				<view @tap="Determine" class="Determine">确定</view>
			</view>
			<view class="picker-view-wrapper">
				<view class="picker-view-column">
					<view class="picker-view-group">
						<view class="picker-view-mask">
							<view class="picker-view-indicator" v-for="(item,index) in datagroup" :key="index" :class="provinceactive ==index?'active':''"
							 @click="ChangeProvince(item,index)">
								{{item.regionName}}
							</view>
						</view>
					</view>
				</view>
				<view class="picker-view-column" v-if="level ==3 || level ==2 ">
					<view class="picker-view-group">
						<view class="picker-view-mask">
							<view class="picker-view-indicator" v-for="(item,index) in city" :key="index" :class="cityactie ==index?'active':''"
							 @click="ChangeCity(item,index)">
								{{item.regionName}}
							</view>
						</view>
					</view>

				</view>
				<view class="picker-view-column" v-if="level ==1  ||level ==2">
					<view class="picker-view-group">
						<view class="picker-view-mask">
							<view class="picker-view-indicator" v-for="(item,index) in area" :key="index" :class="areaactive ==index?'active':''"
							 @click="ChangeArea(item,index)">
								{{item.regionName}}
							</view>
						</view>
					</view>

				</view>
			</view>
		</view>
	</view>


</template>

<script>
	export default {
		data() {
			return {
				provinceactive: -1,
				province: [], //省
				provincetext: '',
				provincecode: "",
				city: [], //市
				citytext: '',
				cityactie: -1,
				citycode: "",
				area: [], //区,
				areatext: '',
				areaactive: -1,
				areacode: '',
				tempcode: '',
				temptext: "",
			}
		},
		props: {
			pickershow: {
				type: Boolean
			},
			datagroup: {
				type: Array
			},
			level: {
				type: Number
			}
		},
		mounted() {
			console.log(this.datagroup)

		},
		methods: {
			// 取消关闭遮罩层和联动
			cancel() {
				this.$emit("cancel", this.pickershow)
			},
			ChangeProvince(item, index) {
				this.provinceactive = index
				this.cityactie = -1
				this.areaactive = -1
				this.provincecode = item.code
				this.provincetext = item.regionName
				this.city = []
				this.area = []
				let tempdata = []
				tempdata = this.datagroup.filter(x => x.code === item.code);
				this.city = tempdata[0].childrens
			},
			ChangeCity(item, index) {
				this.cityactie = index
				this.areaactive = -1
				this.citycode = item.parentCode
				this.citytext = item.regionName
				this.area = []
				let tempdata = []
				tempdata = this.city.filter(x => x.parentCode === item.parentCode);
				this.area = tempdata[0].childrens
			},
			ChangeArea(item, index) {
				this.areaactive = index
				this.areacode = item.code
				this.areatext = item.regionName
			},
			Determine() {
				if (this.level == 2 || this.level == 1) { //区代 分销商
					this.tempcode = this.areacode
					this.temptext = this.provincetext + ' - ' + this.citytext + ' - ' + this.areatext
				}
				if (this.level == 3) { //市代
					this.tempcode = this.citycode
					this.temptext = this.provincetext + ' - ' + this.citytext
				}
				if (this.level == 4) { //省代
					this.tempcode = this.provincecode
					this.temptext = this.provincetext
				}
				this.$emit('tempcode', this.tempcode)
				this.$emit('temptext', this.temptext)
			}
		}
	}
</script>

<style lang="scss">
	.Mask {
		position: fixed;
		background: rgba(0, 0, 0, .6);
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}

	.picker-cont {
		background: #FFFFFF;
		position: fixed;
		left: 0;
		bottom: 0;
		height: 600upx;
		width: 100%;
		z-index: 4;
		padding: 0 30upx;
		font-size: 32upx;

		.picker-operation {
			display: flex;
			justify-content: space-between;
			color: #333333;
			line-height: 2;

			.cancel {
				color: #888;
			}

			.Determine {
				color: #FA436A;
			}
		}

		.picker-view-wrapper {
			display: flex;
			position: relative;
			overflow: hidden;
			height: 100%;
			padding-top: 20upx;
			padding-bottom: 20upx;
			font-size: 28upx;

			.picker-view-column {
				flex: 1;
				position: relative;
				height: 100%;
				overflow: hidden;
				overflow-y: scroll;
				text-align: center;

				.picker-view-group {
					width: 100%;

					.picker-view-mask {
						position: absolute;
						left: 0;
						width: 100%;
						margin-bottom: 40upx;

						.picker-view-indicator {
							height: 80upx;
							line-height: 80upx;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
						}
					}
				}
			}

		}
	}

	.active {
		color: #FA436A;
	}
</style>
