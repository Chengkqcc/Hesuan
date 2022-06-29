<template>
	<view class="form">
		<u--form labelWidth="160rpx" :labelStyle="{ fontSize: '31rpx', color: '#333' }">
			<view class="form-group">
				<u-form-item label="姓名" prop="userInfo.name" ref="item1">
					<u--input v-model="form.name" placeholder="请输入姓名" border="none" fontSize='31rpx'></u--input>
				</u-form-item>
			</view>
			<view class="form-group" @click="show = true">
				<u-form-item label="证件类型" prop="userInfo._documentType" ref="item1">
					<u--input @click="show = true" v-model="form._documentType" disabled disabledColor="#fff"
						placeholder="请选择证件类型" fontSize='31rpx' suffixIcon="arrow-down"
						suffixIconStyle="opacity:0.6;margin-top:8rpx;" border="none"></u--input>
				</u-form-item>
			</view>
			<view class="form-group">
				<u-form-item label="证件号码" prop="userInfo.idNumber" ref="item1">
					<u--input v-model="form.idNumber" placeholder="请输入证件号码" fontSize='31rpx' border="none"></u--input>
				</u-form-item>
			</view>
			<button @click="submit">添加</button>
		</u--form>
		<u-action-sheet :closeOnClickOverlay="true" :closeOnClickAction="true" :actions="cardTypeActionList"
			:title="title" @select="selectAction" @close="show = false" :show="show"></u-action-sheet>
	</view>
</template>
<script>
	import {
		getDictType,
		userFamilyAdd
	} from "@/common/api";
	import {
		checkIdNo
	} from "@/util/regext";

	function toast(title) {
		uni.showToast({
			title,
			icon: "none",
		});
	}
	export default {
		data() {
			return {
				title: "证件类型",
				cardTypeActionList: [],
				show: false,
				form: {
					name: "",
					documentType: "",
					_documentType: "",
					idNumber: "",
				},
			};
		},
		onLoad() {
			getDictType("document_type").then((res) => {
				this.cardTypeActionList = res.map((v) => ({
					...v,
					name: v.dictLabel,
				}));
			});
			this.selectAction({
				name: '身份证',
				dictValue: '1'
			})
		},
		methods: {
			selectAction(res) {
				console.log(res);
				this.form.documentType = res.dictValue;
				this.form._documentType = res.name;
				this.show = false;
			},
			async submit() {
				if (!this.form.name) {
					return toast("请输入姓名");
				}
				if (!this.form.documentType) {
					return toast("请选择证件类型");
				}
				if (!this.form.idNumber) {
					return toast("请输入证件号");
				}
				if (this.form.documentType === "1" && !checkIdNo(this.form.idNumber)) {
					return toast("身份证号格式不正确");
				}
				const form = {
					...this.form
				};
				delete form._documentType;
				uni.showLoading({
					title: '加载中...',
					mask: true
				});
				try {
					await userFamilyAdd(form, {
						custom: {
							catch: true
						}
					})
					uni.showToast({
						title: "添加成功",
						icon: "success",
						mask: true,
					});
					setTimeout(() => {
						uni.navigateBack({});
					}, 1500);
				} catch (e) {
					toast(e.msg || "添加出错");
				}
			},
		},
	};
</script>
<style>
	page {
		background: #f1f4f7;
	}
</style>
<style lang="scss" scoped>
	.form-group {
		width: 625rpx;
		// height: 92rpx;
		background: #ffffff;
		border-radius: 8rpx;
		margin: 42rpx auto 0;
		padding-left: 38rpx;
		box-sizing: border-box;
		padding-right: 33rpx;
	}

	button {
		margin-top: 63rpx;
		width: 625rpx;
		height: 92rpx;
		background: #3a8cf0;
		border-radius: 8rpx;
		text-align: center;
		color: #fff;
		font-size: 33rpx;
	}
</style>
