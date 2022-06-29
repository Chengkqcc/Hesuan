<template>
	<view>
		<view class="comment">
			<view class="head">
				<img style="width: 100%;height: 100%;" src='https://qiniu.xzlglobal.com/hs/mp/head.png'>
			</view>
			<view class="right">
				<view class="name">张忠义</view>
				<view>多图固定比例在多图模式的时候是最常见的情况，固定模块下采用什么样的搭配。</view>
				<view class="answer" v-if="isanswer">
					<text class="answer-name">李万金：</text>说的太对了。对图固定比例再多土图模式的时候是最常见的情况。<br/>
					<text class="answer-name">张忠义</text>回复<text class="answer-name">李万金：</text> 多谢老铁！
				</view>
				<view class="time">
					<text>2022-06-16</text>
					<view class="info">
						<view style="margin-right: 30rpx;">
							<img src="https://qiniu.xzlglobal.com/hs/mp/icon_pl1@2x.png" style="width: 34rpx;height: 27rpx;margin-top: 10rpx;margin-right: 10rpx;" @click="answer" />
							<text>239</text>
						</view>
						<view>
							<img src="https://qiniu.xzlglobal.com/hs/mp/icon_fy1@2x.png" style="width: 34rpx;height: 27rpx;margin-top: 10rpx;margin-right: 10rpx;" />
							<text>239</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="send">
			<view class="uni-form-item uni-column" v-if="showInput">
				<input class="uni-input" placeholder-style="color: #E4E7ED" type="text" focus placeholder="回复 张忠义" :adjust-position='true' />
			</view>
			<button v-if="showInput" class="mini-btn" type="primary" size="mini" @click="sendInfo">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isanswer: {
				type: Boolean,
				default: true
			}
		},
		name:"comment",
		data() {
			return {
				showInput: false
			};
		},
		methods: {
			answer() {
				this.showInput = true
			},
			sendInfo() {}
		}
	}
</script>

<style lang="scss" scoped>
.comment {
	width: 90%;
	margin: auto;
	display: flex;
	flex-direction: row;
	padding: 30rpx 0;
	border-bottom: 1px solid #EBEEF5;
	.head {
		width: 170rpx;
		height: 80rpx;
		margin: 12rpx 30rpx 0 0;
	}
	.right {
		color: #606266;
		.name {
			padding-bottom: 20rpx;
		}
		.answer {
			background-color: #EBEEF5;
			color: #909399;
			line-height: 1.5;
			font-size: 30rpx;
			margin-top: 15rpx;
			padding: 15rpx 20rpx;
			.answer-name {
				color: rgb(58, 140, 240);
			}
		}
		.time {
			width: 100%;
			padding-top: 20rpx;
			font-size: 30rpx;
			display: flex;
			justify-content: space-between;
			.info {
				display: flex;
			}
		}
	}
}
.send {
	width: 90%;
	margin: auto;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	margin-top: 20rpx;
	.uni-column {
		border: 1px solid #EBEEF5;
		border-radius: 12px;
		.uni-input {
			width: 500rpx;
			height: 80rpx;
			padding-left: 20rpx;
		}
	}
}
</style>