<template>
    <view class="a">
		<u-popup
		  :show="show"
		  mode="center"
		  round="10px"
		  closeable
		  :safeAreaInsetBottom="false"
		  customStyle="width: 625rpx"
		  closeIconPos="top-right"
		  @close="close"
		>
		  <view class="message">
		    <view class="title">通知</view>
		    <u-line color="#EEEEEE"></u-line>
		    <view class="u-content">
				<scroll-view style="max-height: 60vh;" scroll-y>
					<u-parse :content="detail.content"></u-parse>
				</scroll-view>
				<view class="noMoreReminders">
					<u-checkbox-group v-model="checkboxValue">
					  <u-checkbox :customStyle="{ marginBottom: '16rpx' }" name="checked" />
					</u-checkbox-group>
					<view class="text" @click="updateCheckBox">
					  不再提醒
					</view>
				</view>
		    </view>
		    <u-line color="#EEEEEE"></u-line>
		    <button @click="close" class="footer-button">确认</button>
		  </view>
		</u-popup>
    </view>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			checkboxValue: [],
		}
	},
	props: {
		detail: Object
	},
	watch: {
		detail: {
			immediate: true,
			handler(val) {
				if (!val) return;
				if (uni.getStorageSync(this.getSaveKey())) return;
				this.show = true;
			}
		}
	},
	methods: {
		updateCheckBox() {
			if (this.checkboxValue.includes('checked')) {
				this.checkboxValue = [];
			} else {
				this.checkboxValue.push('checked')
			}
		},
		getSaveKey() {
			return `notice-no-${this.detail.id}`;
		},
		close() {
			console.log(this.checkboxValue)
			if (this.checkboxValue.includes('checked')) {
				uni.setStorageSync(this.getSaveKey(), true)
			}
			this.show = false;
		}
	}
}
</script>

<style lang="scss" >
.title {
  color: #333333;
  line-height: 98rpx;
  text-align: center;
  font-size: 33rpx;
}
.footer-button {
  width: 258rpx;
  height: 92rpx;
  line-height: 92rpx;
  border: 2rpx solid #3A8CF0;
  border-radius: 21rpx;
  margin: 29rpx auto 38rpx;
  text-align: center;
  color: #3A8CF0;
  background: #fff;
  font-size: 31rpx;
}
.u-content {
  font-weight: 600;
  color: #333333;
  line-height: 58rpx;
  font-size: 31rpx;
  padding: 38rpx 40rpx 0rpx;
}
.noMoreReminders {
	margin-top: 10rpx;
	color: #666666;
	display: flex;
	flex-direction: initial;
	.text {
		position: relative;
		top: -8.5rpx;
	}
}
</style>