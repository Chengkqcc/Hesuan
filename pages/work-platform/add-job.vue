<template>
	<view class="body">
		<view class="form">
			<view class="form-group">
				<view class="form-label">
					标题
					<view>0/20</view>
				</view>
				<view class="form-content">
					<input class="input-text" maxlength="20" placeholder="请输入标题" />
				</view>
			</view>
			<view class="form-group">
				<view class="form-label">
					内容
					<view>0/200</view>
				</view>
				<view class="form-content">
					<textarea value="" maxlength="200" placeholder="请输入内容" />
				</view>
			</view>
			<view class="form-group">
				<view class="form-label">
					材料附件
				</view>
				<view class="form-content">
					<view class="input-appendix" @click="chooseMessageFile">+ 附件上传</view>
				</view>
			</view>
			<view class="form-group">
				<view class="form-label">
					图片资料
				</view>
				<view class="form-content">
					<view class="input-upload" @click="chooseImage">
						<view class="default" v-if="!form.image">
							<image src="@/static/work-platform/icon_add_pic.png"></image>
						</view>
						<image :src="form.image" style="width: 100%;height: 100%;"></image>
					</view>
				</view>
			</view>
			<view class="form-group" @click="cardTypeActionShow=true">
				<view class="form-label">
					流转对象
				</view>
				<view class="form-content">
					<input class="input-text" maxlength="20" placeholder="请选择流转对象" />
					<u-icon class="arrow-right" name='arrow-right' />
				</view>
			</view>
			<u-action-sheet
				:closeOnClickOverlay="true"
				:closeOnClickAction="true"
				:actions="cardTypeActionList"
				title="流转对象" @select="selectAction($event, 'documentType')"
				@close="cardTypeActionShow = false"
				:show="cardTypeActionShow"></u-action-sheet>
			<view class="form-group">
				<view class="form-label">
					紧急程度
				</view>
				<view class="form-content">
					<input class="input-text" maxlength="20" placeholder="请选择流转对象" />
					<u-icon class="arrow-right" name='arrow-right' />
				</view>
			</view>
			<view class="form-group">
				<view class="form-label">
					备注
				</view>
				<view class="form-content">
					<textarea value="" maxlength="200" placeholder="请输入内容" />
				</view>
			</view>
			<view class="form-button-group">
				<view>存为草稿</view>
				<view>提交</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUploadToken
	} from "@/common/api.js";
	import config from "@/common/config";
	// import QiunDataCharts from '../../uni_modules/uni-data-picker'
	export default {
		data() {
			return {
				form: {
					image: ''
				},
				cardTypeActionShow:false,
				cardTypeActionList: [{name:'aaa'},{name:'bbb'}]
			}
		},
		methods: {
			selectAction() {
				
			},
			chooseMessageFile() {
				uni.chooseMessageFile({
					count:1,
					res: () => {
						console.log(res)
					}
				})
			},
			chooseImage() {
				uni.chooseImage({
					count: 1,
						
					success: async res => {
						await this.getQiniuToken();
						const result = await this.uploadFilePromise(res.tempFilePaths[0]);
						this.form.image = result
					}
				})
			},
			
			async getQiniuToken() {
				//获取七牛的uptoken
				return new Promise((resolve, reject) => {
					getUploadToken()
						.then((res) => {
							if (res && JSON.stringify(res) !== "{}") {
								this.qiniuToken = res;
								resolve(res);
							}
						})
						.catch((err) => reject("获取上传凭证出错"));
				});
			},
			
			uploadFilePromise(url) {
				var that = this;
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: "https://upload-z1.qiniup.com/",
						// url: config.baseUrl + '/wechat/common/upload',
						filePath: url,
						name: "file",
						formData: {
							token: that.qiniuToken,
						},
						success: (res) => {
							if (res.data) {
								var imgData = JSON.parse(res.data);
								resolve(config.qiniuUrl + imgData.key);
							} else {
								reject();
							}
						},
					});
				});
			},
		}
	}
</script>

<style>
	page {
		background: #F1F4F7;
	}
</style>
<style lang="scss" scoped>
.body {
	padding: 20rpx 60rpx 40rpx;
	.form-group {
		padding-top: 21rpx;
	}
	.form-button-group {
		margin: 40rpx 0;
		display: flex;
		justify-content: space-between;
		view {
			width: 292rpx;
			height: 92rpx;
			border-radius: 8rpx;
			border: 1px solid #3A8CF0;
			text-align: center;
			line-height: 92rpx;
			font-size: 33rpx;
			&:first-child {
				color: #3A8CF0;
			}
			&:last-child {
				background: #3A8CF0;
				color: #fff;
			}
		}
	}
	.form-label {
		display: flex;
		justify-content: space-between;
		color: #333333;
		font-size: 31rpx;
		margin-bottom: 21rpx;
		font-weight: bold;
		view {
			font-weight: 500;
		}
	}
	.form-content {
		position: relative;
		.arrow-right {
			position: absolute;
			right: 20rpx;
			top: calc(50% - 15rpx);
		}
	}
	.input-appendix, .input-select, .input-text {
		height: 92rpx;
		background: #FFFFFF;
		border-radius: 8px;
		padding: 0 30rpx;
	}
	.input-appendix {
		text-align: center;
		line-height: 92rpx;
		color: #3A8CF0;
		font-size: 31rpx;
	}
	.input-upload {
		width: 208rpx;
		height: 208rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		overflow: hidden;
		.default {
			width: 100%;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 69rpx;
				height: 69rpx;
			}
		}
	}
	textarea {
		height: 183rpx;
		background: #FFFFFF;
		border-radius: 8rpx;
		width: 100%;
		padding: 30rpx;
		box-sizing: border-box;
	}
}
</style>
