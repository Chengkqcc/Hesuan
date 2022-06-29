<template>
	<view class="page-warpper">
		<!-- tabs 开始 -->
		<view class="top-bar">
			<u-sticky bgColor="#BA1524">
				<u-tabs
					:list="columns"
					@change="onChangeColumn"
					:current="currentColumn"
					style="width: 25%;"
					lineColor="white"
					lineWidth="90"
					:activeStyle="{
						color: 'white',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
					:inactiveStyle="{
						color: 'white',
						transform: 'scale(1)'
					}"
				></u-tabs>
			</u-sticky>
		</view>
		
		
		<!-- 第一个 -->
		<view v-if="currentColumn == 0">
			<view class="top-bar-bg"></view>
			<view>第一个</view>
		</view>
		
		
		<!-- 第一二个 -->
		<view v-if="currentColumn == 1">
		<view class="top-bar-bg"></view>
		<view>第2222个</view>
		</view>
		
		<!-- 第三个 -->
		<view v-if="currentColumn == 2">
		<view class="top-bar-bg"></view>
		<view>第3333个</view>
		</view>
		
		
		<!-- tabs 结束 -->
		<view v-if="currentColumn == 3">
		<view class="top-bar-bg"></view>
		<view class="title">
			<view>
				<span class="title-label">东兴市人民政府</span>
				<span class="title-link">
					<i class="circle"></i>
					进入工作平台
				</span>
			</view>
			<view class="logo"></view>
		</view>
		<view class="basic-wrapper">
			<view class="basic-title">
				<u-tabs
					:list="basicLabel"
					@change="onChangeBasicColumn"
					:current="currentBasicColumn"
					lineWidth="0"
					lineHeight="0"
					:activeStyle="{
						color: '#ba1524',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
					:inactiveStyle="{
						color: '#333333',
						transform: 'scale(1)',
						background: '#eeeee'
					}"
				></u-tabs>
			</view>
			<view class="basic-content">
				<span class="basic-item" :class="isFload ? 'hide' : 'show'">
					东兴市人民政府办公室 ｜ 东兴市发展和改革局 ｜ 东兴市教育和科学技术局 ｜ 东兴市工业和信息化局 ｜ 东兴市民族宗教事务局 ｜ 东兴市公安局 ｜ 东兴市民政局 ｜
					东兴市司法局 ｜ 东兴市财政局 ｜ 东兴市人力资源和社会保障局 ｜ 东兴市自然资源局 ｜ 东兴市住房和城乡建设局 ｜ 东兴市交通运输局 ｜ 东兴市农业农村水利局 ｜
					东兴市商务和口岸管理局 ｜ 东兴市文化广电体育和旅游局 ｜ 东兴市卫生健康局 ｜ 东兴市退役军人事务局 ｜ 东兴市应急管理局 ｜ 东兴市审计局 ｜ 东兴市外事办公室 ｜
					东兴市市场监督管理局 ｜ 东兴市统计局 ｜ 东兴市边海人防局 ｜ 东兴市医疗保障局 ｜ 东兴市城市管理监督局 ｜ 东兴市乡村振兴局
				</span>
				<view class="unfold">
					<u-icon v-show="isFload" width="20rpx" :name="isFload ? 'arrow-down' : 'arrow-up'" color="#d8d8d8" size="15" :bold="true" @click="fload"></u-icon>
				</view>
			</view>
		</view>
		<view class="red-gap"></view>
		<view class="standardized-warpper">
			<view class="standardized-title">
				<u-tabs
					:list="standardizedLabel"
					@change="onChangeStandardColumn"
					:current="currentStandardColumn"
					lineWidth="60rpx"
					lineHeight="6rpx"
					lineColor="#ba1524"
					:activeStyle="{
						color: '#333333',
						fontWeight: 'bold',
						transform: 'scale(1.05)'
					}"
					:inactiveStyle="{
						color: '#888888',
						transform: 'scale(1)',
						background: '#eeeee'
					}"
				></u-tabs>
			</view>
			<u-divider lineColor="#eeeeee"></u-divider>
			<view class="standardized-item" v-for="(item, key) in standardizedList" :key="key">
				<view class="standardized-title text-overflow">{{ item.title }}</view>
				<view class="standardized-date">{{ item.date }}</view>
			</view>
		</view>
		<view class="red-gap"></view>
		<!-- 党建风采    开始 -->
		<view class="party-show-wrapper">
			<view class="common-title">党政风采</view>
			<u-divider lineColor="#eeeeee"></u-divider>
			<view class="common-item" v-for="(item, key) in partyList" :key="key">
				<image class="common-item-left" v-if="item.imageUrl" :src="item.imageUrl"></image>
				<view class="common-item-right">
					<view class="common-item-title text-overflow">{{ item.title }}</view>
					<view class="common-date">
						<span class="common-section" v-if="item.section">{{ item.section }}</span>
						{{ item.date }}
					</view>
				</view>
			</view>
		</view>
		<view class="red-gap"></view>
		<!-- 党建风采    结束 -->

		<!-- 精彩瞬间    开始 -->
		<view class="party-show-wrapper">
			<view class="common-title">精彩瞬间</view>
			<u-divider lineColor="#eeeeee"></u-divider>
			<view class="common-content">
				<view class="common-item-pic" v-if="imagesList.length">
					<image class="common-images" src="https://qiniu.xzlglobal.com/hs/mp/person.png"></image>
					<view class="common-images-title">情暖复工路！东兴市“点对点”护送工人赴粤务工</view>
				</view>
				<view class="common-item-pic-wrapper">
					<view class="common-item-pic group-common-item-pic" :key="key" v-for="(item, key) in imagesList">
						<image class="common-images" :src="item.imageUrl" style="width: 200rpx;height: 200rpx;"></image>
						<view class="common-images-title" style="width: 182rpx;">{{ item.title }}</view>
					</view>
				</view>
			</view>
		</view>
		<view class="red-gap"></view>
		<!-- 精彩瞬间    结束 -->

		<!-- 留言    开始 -->
		<view class="comment-wrapper">
			<view class="common-title">留言</view>
			<u-divider lineColor="#eeeeee"></u-divider>
			<view class="comment-content">
				<view class=""><u--textarea placeholder="请输入你想说的话" height="200rpx" border="surround" clearable></u--textarea></view>
				<view class="btn"><u-button text="发送" color="#BA1524"></u-button></view>
			</view>
		</view>
		<view class="red-gap"></view>
		<!-- 留言    结束 -->

		<!-- 活动报名    开始 -->
		<view class="party-show-wrapper">
			<view class="common-title">活动报名</view>
			<u-divider lineColor="#eeeeee"></u-divider>
			<view class="apply-content">
				<view class="apply-item" style="margin-right: 20rpx;">
					<image class="common-images" src="https://qiniu.xzlglobal.com/hs/mp/person.png" style="width: 320rpx;height: 182rpx;"></image>
					<view class="apply-item-title">2022年春季志愿者活动</view>
					<view class="btn"><u-button text="立即报名" color="#BA1524"></u-button></view>
				</view>
				<view class="apply-item">
					<image class="common-images" src="https://qiniu.xzlglobal.com/hs/mp/person.png" style="width: 320rpx;height: 182rpx;"></image>
					<view class="apply-item-title">2022年春季志愿者活动</view>
					<view class="btn"><u-button text="立即报名" color="#BA1524"></u-button></view>
				</view>
			</view>
		</view>
		<view class="red-gap"></view>
		<!-- 活动报名    结束 -->
	</view>
	</view>
</template>

<script>
import { columns, basicLabel, standardizedLabel, standardizedList, partyList, imagesList } from './columns.js';
import { module1Type, module2Type } from '../../common/api.js';
export default {
	components: {},
	data() {
		return {
			isFload: true,
			columns: columns,
			basicLabel: basicLabel,
			standardizedLabel: standardizedLabel,
			standardizedList: standardizedList,
			partyList: partyList,
			imagesList: imagesList,

			currentColumn: 0,
			module1Type: [],
			module2Type: [],

			currentBasicColumn:0,
			currentStandardColumn:0,
		};
	},
	onLoad() {},
	onShow() {},
	mounted() {
		this.getModule1();
		this.getModule2();
	},
	methods: {
		fload() {
			//改变isFload的状态
			this.isFload = !this.isFload;
		},
		getModule1() {
			module1Type().then(res => {
				let tempArr = [];
				res.map(ele => {
					tempArr.push({ name: ele.dictLabel });
				});
				this.columns = tempArr;
				this.module1Type = res;
				console.log(res)
			});
		},
		getModule2() {
			module2Type().then(res => {
				let tempArr = [];
				res.map(ele => {
					tempArr.push({ name: ele.dictLabel });
				});
				this.module2Type = res;
				console.log(res)
			});
		},
		onChangeColumn(target) {
			this.currentColumn = target.index;
		},
		onChangeBasicColumn(target) {
			this.currentBasicColumn = target.index;
			console.log(target.index)
		},
		onChangeStandardColumn(target) {
			this.currentStandardColumn = target.index;
			console.log(target.index)
		}
	}
};
</script>

<style lang="scss" scoped>
/deep/ .top-bar .u-tabs__wrapper__nav__item {
	width: 25%;
	padding: 0;
}
/deep/ .top-bar :nth-of-type(4) .u-tabs__wrapper__nav__item__text {
	border-right: none;
}
/deep/ .top-bar .u-tabs__wrapper__nav__item__text {
	border-right: 1px solid white;
	width: 100%;
	text-align: center;
	font-size: 30rpx !important;
}
/deep/ .basic-title .u-tabs__wrapper__nav {
	justify-content: center;
}
/deep/ .basic-title .u-tabs__wrapper__nav__item {
	background-color: #eeeeee;
	margin-right: 20rpx;
	border-radius: 20rpx;
	padding: 0 14rpx;
	.u-tabs__wrapper__nav__item__text {
		font-size: 30rpx;
	}
}
/deep/ .basic-title :nth-of-type(4).u-tabs__wrapper__nav__item {
	margin-right: 0;
}

/deep/ .standardized-title .u-tabs__wrapper__nav__item {
	padding: 0;
	width: 33%;
}

/deep/ .standardized-title .u-input {
	width: 33.33%;
	padding: 0;
}
/deep/ .comment-content .u-button {
	width: 144rpx;
	height: 60rpx;
	border-radius: 20rpx;
	color: #ba1524;
}
/deep/ .apply-item .u-button {
	width: 180rpx;
	height: 60rpx;
	border-radius: 20rpx;
	color: #ba1524;
}
// ------------------------------通用类名-------------开始----------------------------
/deep/ .u-divider {
	margin: 0 !important;
}
.red-gap {
	width: 100%;
	height: 6rpx;
	background-color: #ba1524;
}

.text-overflow {
	overflow: hidden;
	word-break: break-all; /* break-all(允许在单词内换行。) */
	text-overflow: ellipsis; /* 超出部分省略号 */
	display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
	-webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
	-webkit-line-clamp: 2; /** 显示的行数 **/
}
.common-title {
	height: 80rpx;
	line-height: 80rpx;
	color: #333333;
	font: 32rpx;
	font-weight: bold;
	margin-left: 40rpx;
}
.common-item {
	// height: 150rpx;
	border-bottom: 1rpx solid #f7f7f7;
	padding: 20rpx;
	margin: 0 50rpx 0 40rpx;
	display: flex;
	.common-item-left {
		width: 160rpx;
		height: 120rpx;
		display: inline-block;
	}
	.common-item-right {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 120rpx;

		.common-item-title {
			font-size: 30rpx;
			color: #333333;
			padding: 8rpx 52rpx 5rpx 32rpx;
		}

		.common-date {
			color: #999999;
			font-size: 24rpx;
			padding: 0rpx 52rpx 0 32rpx;
			.common-section {
				margin-right: 60rpx;
			}
		}
	}
}
// ------------------------------通用类名-------------结束----------------------------

.page-warpper {
	position: relative;
}
.tabs-wrapper {
	background-color: #ba1524;
	color: white;
}
.top-bar-bg {
	width: 100%;
	height: 316rpx;
	border-radius: 0px 0px 30rpx 30rpx;
	background: linear-gradient(180deg, #ba1524 0%, #dc2032 50%, #ffffff 100%);
	position: absolute;
	z-index: -1;
}
.title {
	color: white;
	display: flex;
	justify-content: space-between;
	padding: 0 56rpx;
	padding-top: 30rpx;

	.title-label {
		font-size: 45rpx;
		display: block;
		margin-bottom: 20rpx;
	}
	.title-link {
		.circle {
			display: inline-block;
			height: 24rpx;
			width: 24rpx;
			margin-right: 20rpx;
			background-image: url(https://qiniu.xzlglobal.com/hs/mp/circle.png);
			border-radius: 50%;
		}
	}
	.logo {
		display: inline-block;
		height: 100rpx;
		width: 100rpx;
		margin-right: 44rpx;
		margin-top: 20rpx;
		background-image: url(https://qiniu.xzlglobal.com/hs/mp/logo.png);
	}
}
.basic-wrapper {
	background-color: white;
	border-radius: 20rpx;
	margin: 26rpx 20rpx 10rpx;
	padding: 20rpx 30rpx;

	.basic-title {
		margin-bottom: 30rpx;
	}
	.basic-content {
		color: #333333;
		font-size: 34rpx;
		.basic-item {
			overflow: hidden;
		}
		.hide {
			display: -webkit-box;
			height: 265rpx;
		}
		.show {
			display: block;
			height: 100%;
		}
		.unfold {
			margin: 0 auto;
			cursor: pointer;
			width: 30rpx;
		}
	}
}

.standardized-warpper {
	.standardized-title {
		margin-bottom: 10rpx;
	}
	.standardized-item {
		height: 154rpx;
		border-bottom: 1rpx solid #dddddd;
		.standardized-title {
			font-size: 32rpx;
			color: #333333;
			padding: 20rpx 52rpx 0 32rpx;
		}
		.standardized-date {
			color: #999999;
			font-size: 24rpx;
			padding: 0rpx 52rpx 0 32rpx;
		}
	}
}
.common-item-pic-wrapper {
	text-align: center;
	margin-bottom: 15rpx;
	.common-images {
	}
}
.common-item-pic {
	width: 640rpx;
	height: 360rpx;
	position: relative;
	margin: 0 auto;
	margin-top: 20rpx;
	.common-images {
		display: inline-block;
		width: 100%;
		height: 100%;
		border-radius: 20rpx;
	}
	.common-images-title {
		position: absolute;
		bottom: 0;
		height: 44rpx;
		line-height: 44rpx;
		opacity: 0.6;
		background-color: #000000;
		border-radius: 0 0 20rpx 20rpx;
		color: white;
		padding-left: 18rpx;
		font-size: 24rpx;
		width: 622rpx;
	}
}
.group-common-item-pic {
	width: 200rpx;
	height: 200rpx;
	display: inline-block;
	margin-right: 20rpx;
}
.group-common-item-pic:nth-of-type(3) {
	margin-right: 0;
}

.comment-wrapper {
	padding-bottom: 30rpx;
	.comment-content {
		position: relative;
		margin: 26rpx 30rpx;
		height: 200rpx;
		.btn {
			position: absolute;
			bottom: -20rpx;
			right: 15rpx;
			z-index: 2;
		}
	}
}
.apply-content {
	padding: 28rpx 0;
	display: flex;
	justify-content: center;
	.apply-item {
		background-color: white;
		border: 1rpx solid #eeeeee;
		border-radius: 13rpx;
		display: inline-block;
		text-align: center;
		padding-bottom: 24rpx;

		.apply-item-title {
			font-size: 28rpx;
			color: #333333;
			margin: 14rpx 0 20rpx;
			font-weight: bold;
		}
		.common-images {
			width: 320rpx;
			height: 184rpx;
			border-radius: 20rpx;
		}
		.btn {
			width: 180rpx;
			height: 60rpx;
			border-radius: 20rpx;
			margin: 0 auto;
		}
	}
}
</style>
