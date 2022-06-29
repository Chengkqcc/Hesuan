<template>
	<view :class="url != null && url != ''? 'fixed_div':''">
		<KpsImageCutter v-if="url != null && url != ''" @ok="onok" @cancel="oncancle" :url="url" :fixed="true"
			:width="400" :height="400">
		</KpsImageCutter>

		<view class="form">
			<u--form labelWidth="170rpx" :labelStyle="{ fontSize: '31rpx', color: '#333' }" labelPosition="left"
				:model="model1" ref="form1">
				<u-form-item label="本人头像" prop="form.avatar" borderBottom ref="item1">

					<view @click="chooseImage"
						style="display: flex;justify-content: space-between;align-items: center;">
						<image style="width: 120rpx; height: 120rpx;border-radius: 50%;" :src="form.avatar" />
						<u-icon name="arrow-right" v-if="!userInfo.avatar"></u-icon>
					</view>
				</u-form-item>
				<u-form-item label="姓名" prop="form.name" borderBottom ref="item1">
					<u--input v-model="form.name" border="none" fontSize='31rpx' disabledColor="#fff"
						placeholder="请输入姓名"></u--input>
				</u-form-item>

				<u-form-item label="申请类型" prop="form._userProfession" borderBottom ref="item1"
					@click="apply_TypeShow = true">
					<u--input v-model="form._applyType" border="none" disabled fontSize='31rpx' disabledColor="#fff"
						suffixIcon="arrow-right" suffixIconStyle="opacity:0.6" placeholder="请选择居住类型"></u--input>
				</u-form-item>
				<u-action-sheet :closeOnClickOverlay="true" :closeOnClickAction="true" :actions="apply_Type"
					title="申请类型" @select="selectAction($event, 'applyType')" @close="apply_TypeShow = false"
					:show="apply_TypeShow"></u-action-sheet>

				<u-form-item v-if="form.applyType ==='1'||form.applyType==='2' " label="社区/网格" prop="form._userProfession" borderBottom ref="item1">
					<uni-data-picker :localdata="deptTreeTemporary" placeholder="点击选择社区/网格" popup-title="请选择社区/网格"
						v-model="form.companyId" :clear-icon='false' :map="{text:'label',value:'id'}"
						@change="bindPickerChange">
					</uni-data-picker>
				</u-form-item>
				
				<u-form-item v-if="form.applyType ==='3'" label="社区/网格" prop="form._userProfession" borderBottom ref="item1">
					<uni-data-picker :localdata="deptTree" placeholder="点击选择社区/网格" popup-title="请选择社区/网格"
						v-model="form.companyId" :clear-icon='false' :map="{text:'label',value:'id'}"
						@change="bindPickerChange">
					</uni-data-picker>
				</u-form-item>
				
				<u-form-item label="户籍类型" prop="form._userCensus" borderBottom ref="item1"
					@click="householdActionShow = true">
					<u--input v-model="form._userCensus" border="none" fontSize='31rpx' disabled disabledColor="#fff"
						suffixIcon="arrow-right" suffixIconStyle="opacity:0.6" placeholder="请选择户籍类型"></u--input>
				</u-form-item>

				<u-action-sheet :closeOnClickOverlay="true" :closeOnClickAction="true" :actions="householdActionList"
					title="户籍类型" @select="selectAction($event, 'household')" @close="householdActionShow = false"
					:show="householdActionShow"></u-action-sheet>
				<u-form-item label="人员类型" prop="form._userProfession" borderBottom ref="item1"
					@click="jobActionShow = true">
					<u--input v-model="form._userProfession" border="none" disabled fontSize='31rpx'
						disabledColor="#fff" suffixIcon="arrow-right" suffixIconStyle="opacity:0.6"
						placeholder="请选择人员类型"></u--input>
				</u-form-item>
				<u-picker :show="jobActionShow" title='人员类型' :columns="[jobActionList]" keyName="name"
					:immediateChange='true' @close="jobActionShow = false;" @cancel="jobActionShow = false;"
					@confirm='user_enter_purposeSelect'>
				</u-picker>
				<u-form-item prop="form.name" borderBottom ref="item1">
					<view class="form-item-textarea">
						<view class="_label">
							<view v-if="form.residenceType == '1'">现居住地址</view>
							<view v-else>在东兴居住(联系)地址</view>
							<view>(必填)</view>
						</view>
						<view class="_content">
							<u--textarea v-model="form.addr" count placeholder="请输入社区+街道+小区+房号"></u--textarea>
						</view>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<PromiseComponent v-model="isPromise" inStyle="margin-top: 30rpx;" />
		<WarnEditHeadimg :show='warnEditHeadImg' @confirm='warnEditHeadImgConfirm' @cancel='warnEditHeadImg = false' />
		<view style="height: 40rpx;"></view>
		<button class="submit" @click="submit">申请</button>
		<view style="height: 40rpx;"></view>
		<u-loading-page :loadingText="loadingPageData.loadingText" :image="loadingPageData.image"
			:loadingMode="loadingPageData.loadingMode" :bgColor="loadingPageData.bgColor" :loading="loading"
			:color="loadingPageData.color" :loadingColor="loadingPageData.loadingColor">
		</u-loading-page>
	</view>
</template>
<script>
	import {
		getDictType
	} from "@/common/api";
	import config from "@/common/config";
	import PromiseComponent from '@/components/promise.vue'
	import {
		getUploadToken,
		userApply,
		deptTreeselect
	} from "@/common/api.js";
	import KpsImageCutter from "@/components/ksp-image-cutter/ksp-image-cutter.vue";
	import WarnEditHeadimg from '@/components/warnEditHeadImg.vue'

	function toast(title) {
		uni.showToast({
			title,
			icon: "none",
		});
	}
	export default {
		components: {
			KpsImageCutter,
			PromiseComponent,
			WarnEditHeadimg
		},
		data() {
			return {
				loading:false,
				loadingPageData: {
					// 自定义提示内容
					loadingText: '加载中',
					// 自定义图片
					image: '',
					// 自定义加载动画模式
					loadingMode: 'spinner',
					// 自定义背景色
					bgColor: 'rgba(0, 0, 0, 0.4)',
					color:'#eee'
				},
				apply_Type: [],
				deptTree: [],
				deptTreeTemporary: [],
				apply_TypeShow: false,
				isPromise: false,
				fileList: [],
				householdActionList: [],
				householdActionShow: false,
				jobActionList: [],
				jobActionShow: false,
				liveActionShow: false,
				liveActionList: [],
				communityActionShow: false,
				communityActionList: [],
				communityColumns: [
					[],
					[],
					[]
				],
				residenceActionShow: false,
				residenceActionList: [],
				cardTypeActionList: [],
				companyId: [],
				companyName: [],
				warnEditHeadImg: false,
				companyNameInputShowContent: '',
				form: {
					avatar: "",
					name: "",
					companyId: "",
					companyName: "",
					userCensus: "",
					_userCensus: "",
					userProfession: "",
					_userProfession: "",
					residenceType: '',
					_residenceType: '',
					applyType: '',
					_applyType: '',
					addr: "",
				},
				userInfo: {},
				url: null,
			};
		},
		watch: {
		},
		async onLoad() {
			this.loading = true
			await this.load();
			this.loading = false
			this.userInfo = this.$store.state.userInfo
			if (this.$store.state.userInfo.avatar) {
				this.form.avatar = this.$store.state.userInfo.avatar;
			} else {
				this.form.avatar = 'https://qiniu.xzlglobal.com/FnXkGW7ZrH5skQxGCxAUqZJ52S4p';
			}
			this.form.name = this.$store.state.userInfo.name;
			this.selectAction({
				dictValue: '1',
				name: '本地居住(有固定住所,包括长短租)'
			}, 'residence')

		},
		methods: {
			
			async load() {
				await Promise.all([
				getDictType("user_profession"),
				getDictType("user_census"),
				getDictType("residence_type"),
				getDictType('apply_type'),
				deptTreeselect()
			]).then(([job, household, residence, apply, dept]) => {
				this.householdActionList = household.map((v) => ({
					...v,
					name: v.dictLabel,
				}));
				this.jobActionList = job.map((v) => ({
					...v,
					name: v.dictLabel
				}));
				this.apply_Type = apply.map((v) => ({
					...v,
					name: v.dictLabel,
					value: v.dictValue,
					text: v.dictLabel
				}));

				this.jobActionList = this.jobActionList.filter(v => v.dictValue != '9' && v.dictValue != '10' && v
					.dictValue != '11'
				);

				this.residenceActionList = residence.map((v) => ({
					...v,
					name: v.dictLabel
				}));
				let copyObj = JSON.parse(JSON.stringify(dept.children))
				dept = dept.children
				this.deptTree = dept.filter(v => v.id != 377 && v.id != 382 && v.id != 386 &&
					v.id != 437 && v.id != 438 && v.id != 439
				);
				this.deptTree.forEach(item=>{
					if(item.children){
						var data = item.children
						item.children = data.filter(v => v.id != 494 && v.id != 495 && v.id != 436);
					}
				})
				this.deptTreeTemporary = copyObj.filter(v => v.id != 377 && v.id != 382 && v.id != 386 &&
					v.id != 437 && v.id != 438 && v.id != 439
				);
				this.deptTreeTemporary.forEach(item=>{
					if(item.children){
						var data = item.children
						item.children = data.filter(v => v.id == 494 || v.id == 495 || v.id == 436);
					}
				})

			});
			},
			
			
			//更改申请类型
			applyTypeChange() {
				this.form.companyName = ''
				this.form.companyId = ''
			},

			bindPickerChange(val) {
				const list = val.detail.value.filter(v => v);
				var companyName = []
				for (let i = 0; i < list.length; i++) {
					companyName.push(list[i].text)
				}
				this.form.companyName = companyName ? companyName.join('/') : ""

			},

			warnEditHeadImgConfirm() {
				this.warnEditHeadImg = false;
				this.chooseImage()
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
			chooseImage() {
				if (!this._warnEditHeadImg) {
					this._warnEditHeadImg = true;
					return this.warnEditHeadImg = true;
				}
				uni.chooseImage({
					count: 1,
					success: res => {
						this.url = res.tempFilePaths[0];
					}
				})
			},
			async afterRead(event, fileList) {
				this.url = event.file[0].url;
			},
			async onok(ev) {
				this.url = ""; //隐藏组件
				try {
					await this.getQiniuToken();
					const result = await this.uploadFilePromise(ev.path);
					this.fileList.push({
						type: "image",
						url: result,
						thumb: result,
					});
					this.form.avatar = result;
				} catch (error) {
					toast(typeof error === "string" ? error : "请求出错");
				}
			},
			oncancle() {
				this.url = "";
			},
			user_enter_purposeSelect(info) {
				console.log(info)
				this.jobActionShow = false
				this.form.userProfession = info.value[0].dictValue;
				this.form._userProfession = info.value[0].name;
			},

			selectAction(res, type) {
				console.log(res);
				if (type === "household") {
					this.form.userCensus = res.dictValue;
					this.form._userCensus = res.name;
				} else if (type === "job") {
					this.form.userProfession = res.dictValue;
					this.form._userProfession = res.name;
				} else if (type === 'residence') {
					this.form.residenceType = res.dictValue;
					this.form._residenceType = res.name;
				} else if (type === 'applyType') {
					this.form.applyType = res.dictValue;
					this.form._applyType = res.name;
					this.applyTypeChange()
				}
				this.residenceActionShow = false;
				this.householdActionShow = false;
				this.jobActionShow = false;
			},
			async submit() {
				console.log(this.form.avatar)
				if (this.form.avatar == 'https://qiniu.xzlglobal.com/FnXkGW7ZrH5skQxGCxAUqZJ52S4p') {
					return toast("请上传本人头像");
				}
				if (!this.form.name) {
					return toast("请输入姓名");
				}
				if (!this.form.residenceType) {
					return toast("请选择居住类型");
				}
				if (!this.form.applyType) {
					return toast("请选择申请类型");
				}
				if (!this.form.companyId && !this.form.companyName) {
					return toast("请选择社区/网格");
				}
				if (!this.form.userCensus) {
					return toast("请选择户籍类型");
				}
				if (!this.form.userProfession) { //6
					return toast("请选择人员类型");
				}
				if (!this.form.addr) {
					return toast("请输入现居住地址");
				} else {
					var addr = this.form.addr.replace(/\s+/g, "");
					if (addr.length < 9) {
						return toast("现居住地址不低于9个字符");
					}
				}
				if (!this.isPromise) {
					return toast('请同意个人承诺书')
				}
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				const form = {
					...this.form,
				};
				delete form._userProfession;
				delete form._userCensus;
				delete form._residenceType;
				try {
					await userApply(form, {
						custom: {
							catch: true
						}
					})
					uni.redirectTo({
						url: '/pages/nucleic/applylose'
					})

				} catch (error) {
					toast(error.msg || '申请出错，请稍后重试')
				}
			},
			getChildren(list, id, returnValue = []) {
				var data = {}
				for (let i in list) {
					if (id == list[i].id) {
						data = list[i]
						break
					}
					//把元素都存入returnValue
					returnValue.push(list[i])
					if (list[i].children) {
						this.getChildren(list[i].children, id, returnValue)
					}
				}
				return data
			}
		},
	};
</script>
<style lang="scss" scoped>
	/deep/.uni-stat__select {
		width: 100%;
		padding: 0;
	}

	.tip {
		color: #da0303;
		font-size: 29rpx;
		line-height: 42rpx;
		margin-top: 29rpx;
		text-align: center;
	}

	.form {
		background: #fff;
		padding: 0 44rpx;
		margin-top: 42rpx;
	}

	.form-item-textarea {
		display: flex;
		padding-bottom: 30rpx;

		._label {
			width: 170rpx;
			font-size: 31rpx;
			color: #333;

			view:last-child {
				color: #dd1c1c;
				text-indent: 10rpx;
			}
		}

		._content {
			flex: 1;
		}
	}

	button.submit {
		width: 625rpx;
		height: 92rpx;
		background: #3a8cf0;
		border-radius: 8rpx;
		text-align: center;
		color: #fff;
		font-size: 33rpx;
		position: absolute;
		// bottom: 77rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.fixed_div {
		position: fixed;
		width: 100%;
	}
</style>
