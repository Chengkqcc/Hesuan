<template>
	<view>
		<view @click="getMyselfPass" hover-class="none" class="list-item">
			<image src="https://admin.xzlglobal.com/icon_1.png" />
			本人网格证
		</view>
		<navigator url="/pages/nucleic/family" hover-class="none" class="list-item">
			<image src="@/static/icon_dai2.png" />
			家人网格证
		</navigator>
		<navigator url="/pages/nucleic/passApply" hover-class="none" class="list-item">
			<image src="@/static/icon_dai1.png" />
			网格证代申请
		</navigator>

	</view>
</template>

<script>
	import {
		getUserInfoById
	} from '@/common/api.js'
	export default {
		data() {
			return {
				background1: "",
				title: ''
			};
		},
		onLoad({
			source
		}) {
			uni.hideShareMenu()

		},
		methods: {
			getMyselfPass() {
				getUserInfoById({
					params: {
						userId: this.$store.state.userInfo.id
					},
					custom: {
						toast: true,
						catch: true
					}
				}).then(res => {
					this.$store.dispatch("setUserInfo", res);
					if (res && res.userProfession == 9 || res.userProfession ==
						10 || res.userProfession == 11) {
						uni.navigateTo({
							url: '/pages/nucleic/employeePermit?userProfession=' +
								res.userProfession
						})
					} else {
						uni.navigateTo({
							url: '/pages/nucleic/permit'
						})
					}

				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.list-item {
		width: 667rpx;
		height: 125rpx;
		background: #ffffff;
		box-shadow: 0px 0px 21px 0px rgba(0, 0, 0, 0.1);
		border-radius: 17rpx;
		display: flex;
		align-items: center;
		padding: 0 54rpx;
		margin: 0 auto;
		color: #333333;
		font-weight: bold;
		box-sizing: border-box;
		margin-top: 23rpx;

		&:first-child image {
			width: 88rpx;
			height: 75rpx;
			margin-right: 44rpx;
		}

		&:nth-child(2) image {
			width: 88rpx;
			height: 79rpx;
			margin-right: 42rpx;
		}

		&:nth-child(3) image {
			width: 88rpx;
			height: 79rpx;
			margin-right: 42rpx;
		}
	}
</style>
