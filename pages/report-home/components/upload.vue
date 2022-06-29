<template>
	<view class="form-item">
		<view class="form-item-label">
			<text>*</text>
			上传证明
		</view>
		<view class="form-item-content upload-image">
			<view class="upload-group">
				<u-upload :fileList="fileList1" @afterRead="afterRead($event, fileList1)" @delete="fileList1 = []"
					name="1" multiple :maxCount="1"></u-upload>
				<view class="sm-title">{{fistTitle}}</view>
			</view>
			<view class="upload-group">
				<u-upload :fileList="fileList2" @afterRead="afterRead($event, fileList2)" @delete="fileList2 = []"
					name="1" multiple :maxCount="1"></u-upload>
				<view class="sm-title">{{secondTitle}}</view>
			</view>
			<view class="upload-group">
				<u-upload :fileList="fileList3" @afterRead="afterRead($event, fileList3)" @delete="fileList3 = []"
					name="1" multiple :maxCount="1"></u-upload>
				<view class="sm-title">{{thirdTitle}}</view>
			</view>
		</view>
		<view class="form-item-content upload-image">
			<view class="upload-group" style="margin-top: 20rpx;">
				<u-upload :fileList="fileList4" @afterRead="afterRead($event, fileList4)" @delete="fileList4 = []"
					name="1" multiple :maxCount="1"></u-upload>
				<view class="sm-title">{{fourTitle}}</view>
			</view>
		</view>
	</view>
</template>
<script>
	import config from "@/common/config";
	import {
		getUploadToken
	} from "@/common/api.js";
	export default {
		data() {
			return {
				fileList1: [],
				fileList2: [],
				fileList3: [],
				fileList4: [],
			};
		},
		props: {
			value: Array,
			fistTitle: {
				type: String,
				default: '48小时核酸证明'
			},
			secondTitle: {
				type: String,
				default: '行程卡'
			},
			thirdTitle: {
				type: String,
				default: '健康码'
			},
			fourTitle: {
				type: String,
				default: '其他(选填)'
			}
		},
		model: {
			prop: "value",
			event: "input",
		},
		onReady() {
			this.$watch(() => [this.fileList1, this.fileList2, this.fileList3, this.fileList4], () => {
				this.$emit('input', [
					this.fileList1[0]?.url, this.fileList2[0]?.url, this.fileList3[0]?.url, this.fileList4[0]?.url
				])
			})
		},
		watch: {
			//value改变
			value() {
				this.fileList1 = this.value[0] ? [{
					url: this.value[0]
				}] : []
				this.fileList2 = this.value[1] ? [{
					url: this.value[1]
				}] : []
				this.fileList3 = this.value[2] ? [{
					url: this.value[2]
				}] : [],
				this.fileList4 = this.value[3] ? [{
					url: this.value[3]
				}] : []

			},
		},
		methods: {
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

			uploadFilePromise(url, name) {
				console.log(url);
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
			async afterRead(event, fileList) {
				await this.getQiniuToken();
				const result = await this.uploadFilePromise(event.file[0].url);
				fileList.push({
					...event.file[0],
					url: result,
					thumb: result
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	@import "../common.scss";

	.upload-image {
		height: auto !important;
		border: none !important;
		display: flex;
		justify-content: space-between;

		.sm-title {
			text-align: center;
			color: #686868;
			font-size: 25rpx;
			margin-right: 8px;
		}
	}
</style>
