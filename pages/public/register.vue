<template>
	<view class="container">
		<view class="left-bottom-sign"></view>
		<view class="back-btn yticon icon-zuojiantou-up" @click="navBack"></view>
		<view class="right-top-sign"></view>
		<!-- 设置白色背景防止软键盘把下部绝对定位元素顶上来盖住输入框等 -->
		<view class="wrapper">
			<view class="left-top-sign">REGISTER</view>
			<view class="input-content">
				<view class="input-item">
					<text class="tit">用户名称</text>
					<input type="text" v-model="custName" placeholder="请输入用户名称" maxlength="11" data-key="mobile" />
				</view>
				<view class="input-item">
					<text class="tit">地址</text>
					<input type="text" v-model="address" placeholder="请输入地址" maxlength="11" data-key="mobile" />
				</view>
				<view class="input-item">
					<text class="tit">手机号码</text>
					<input type="number" v-model="phoneNum" placeholder="请输入手机号码" maxlength="11" data-key="mobile" />
					<button type="primary" @click="sendcode" :disabled="disabled" class="sendcodebtn">{{codetext}}</button>
				</view>
				<view class="input-item">
					<text class="tit">验证码</text>
					<input type="mobile" placeholder="请输入6位手机验证码" v-model="verifyCode" placeholder-class="input-empty" maxlength="6"
					 text data-key="text" @confirm="toLogin" />
				</view>
			</view>
			<button class="confirm-btn" @click="register">注册</button>
		</view>
		<view class="register-section">
			已有账号
			<text @click="Login">立即登录</text>
		</view>
	</view>
</template>

<script>
	import {
		api
	} from '../../api/request.js'
	import {
		mapMutations
	} from 'vuex';
	import md5 from '../../common/js/md5.js'
	import {
		formatDate
	} from '../../common/js/commonUtil.js'
	export default {
		data() {
			return {
				phoneNum: '',
				password: '',
				logining: false,
				codetext: '获取验证码',
				codenum: 60,
				disabled: false,
				custName: '',
				address: '',
				appid: "App001",
				countryCode: '86',
				verifyCode: '',
			}
		},
		onLoad() {

		},
		methods: {
			navBack() {
				uni.navigateBack();
			},
			toRegist() {
				uni.navigateTo({
					url: "register"
				})
			},
			// 60S 倒计时
			timer() {
				let that = this;
				if (this.codenum == 0) {
					this.codetext = "获取验证码"
					this.codenum = 60
					this.disabled = false
					return false
				} else {
					this.disabled = true
					this.codetext = this.codenum + "秒后重新发送"
					this.codenum--
				}
				setTimeout(() => {
					that.timer()
				}, 1000);
			},
			// 发送验证码
			sendcode() {
				if (this.custName == '') {
					this.$api.msg('用户名不能为空');
					return
				}
				if (this.address == '') {
					this.$api.msg('地址不能为空');
					return
				}
				if (this.phoneNum == '') {
					this.$api.msg('手机号码不能为空');
					return
				}
				this.timer()
				let that = this
				let sendtime = formatDate(new Date(), "yyyyMMddhhmmss");
				let token = md5(this.phoneNum + this.appid + "abc123!!" + sendtime);

				uni.request({
					url: api + '/api/WeiXinSMS/SendCode',
					method: "POST",
					data: {
						countryCode: this.countryCode,
						phoneNum: this.phoneNum,
						appID: this.appid,
						sendTime: sendtime,
						token: token
					},
					success: (res) => {
						if (res.data.statusCode == 1) {
							this.$api.msg(res.data.msg);

						} else {
							this.$api.msg(res.data.msg);
						}
					}
				})
			},
			register() {
				if (this.verifyCode == '') {
					this.$api.msg('验证码不能为空');
					return
				}
				let that = this
				let sendtime = formatDate(new Date(), "yyyyMMddhhmmss");
				let token = md5(this.phoneNum + this.verifyCode + this.appid + "abc123!!" + sendtime);
				uni.request({
					url: api + '/api/Account/Register',
					method: "POST",
					data: {
						"belongerId": null,
						"custName": that.custName,
						"address": that.address,
						"phoneNum": that.phoneNum,
						"verifyCode": that.verifyCode,
						"appID": that.appID,
						"sendTime": sendtime,
						"token": token
					},
					success: (res) => {
						if (res.data.statusCode == 1) {
							this.$api.msg('注册成功，即将跳转到登录页')
							setTimeout(function() {
								uni.navigateTo({
									url: 'login'
								})
							}, 1000);
						} else {
							this.$api.msg(res.data.msg);
						}
					}
				})
			},
			Login() {
				uni.navigateTo({
					url: "login"
				})
			}
		},

	}
</script>

<style lang='scss' scoped>
	page {
		background: #fff;
	}

	.container {
		padding-top: 60px;
		position: relative;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		background: #fff;
	}

	.wrapper {
		position: relative;
		z-index: 90;
		background: #fff;
		padding-bottom: 40upx;
	}

	.back-btn {
		position: absolute;
		left: 40upx;
		z-index: 9999;
		padding-top: var(--status-bar-height);
		top: 40upx;
		font-size: 40upx;
		color: $font-color-dark;
	}

	.left-top-sign {
		font-size: 120upx;
		color: $page-color-base;
		position: relative;
		left: -16upx;
	}

	.right-top-sign {
		position: absolute;
		top: 80upx;
		right: -30upx;
		z-index: 95;

		&:before,
		&:after {
			display: block;
			content: "";
			width: 400upx;
			height: 80upx;
			background: #b4f3e2;
		}

		&:before {
			transform: rotate(50deg);
			border-radius: 0 50px 0 0;
		}

		&:after {
			position: absolute;
			right: -198upx;
			top: 0;
			transform: rotate(-50deg);
			border-radius: 50px 0 0 0;
			/* background: pink; */
		}
	}

	.left-bottom-sign {
		position: absolute;
		left: -270upx;
		bottom: -320upx;
		border: 100upx solid #d0d1fd;
		border-radius: 50%;
		padding: 180upx;
	}

	.welcome {
		position: relative;
		left: 50upx;
		top: -90upx;
		font-size: 46upx;
		color: #555;
		text-shadow: 1px 0px 1px rgba(0, 0, 0, .3);
	}

	.input-content {
		padding: 0 60upx;
	}

	.input-item {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		padding: 0 30upx;
		background: $page-color-light;
		height: 120upx;
		border-radius: 4px;
		margin-bottom: 50upx;

		&:last-child {
			margin-bottom: 0;
		}

		.tit {
			height: 50upx;
			line-height: 56upx;
			font-size: $font-sm+2upx;
			color: $font-color-base;
		}

		input {
			height: 60upx;
			font-size: $font-base + 2upx;
			color: $font-color-dark;
			width: 100%;
		}

		button {
			position: absolute;
			right: 80upx;
			font-size: 28upx;
			border: none;
			background: none;
			color: #333333;
		}

		uni-button:after {
			border: none;
		}
	}

	.confirm-btn {
		width: 630upx;
		height: 76upx;
		line-height: 76upx;
		border-radius: 50px;
		margin-top: 70upx;
		background: $uni-color-primary;
		color: #fff;
		font-size: $font-lg;

		&:after {
			border-radius: 100px;
		}
	}

	.forget-section {
		font-size: $font-sm+2upx;
		color: $font-color-spec;
		text-align: center;
		margin-top: 40upx;
	}

	.register-section {
		position: absolute;
		left: 0;
		bottom: 50upx;
		width: 100%;
		font-size: $font-sm+2upx;
		color: $font-color-base;
		text-align: center;

		text {
			color: $font-color-spec;
			margin-left: 10upx;
		}
	}

	.wxlogin {
		position: absolute;
		left: 0;
		bottom: 150upx;
		width: 100%;

		view {
			display: flex;
			justify-content: center;

			p {
				font-size: 28upx;
				color: #606266;
				margin-bottom: 20upx;
			}

			img {
				width: 60upx;
				height: 60upx;
			}
		}
	}
</style>
