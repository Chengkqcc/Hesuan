<template>
	<view class="uni-select-lay" :style="{'z-index':zindex}">
		<input type="text" :name="name" v-model="value" class="uni-select-input" >
		<view class="uni-select-lay-select" :class="{'active':active}">
			<!-- 禁用mask -->
			<view class="uni-disabled" v-if="disabled"></view>
			<!-- 禁用mask -->
			<!-- 清空 -->
			<view class="uni-select-lay-input-close" v-if="changevalue!=''&&this.active">
				<text @click="removevalue"></text>
			</view>
			<!-- 清空 -->
			<input type="text" class="uni-select-lay-input" :class="{active:changevalue!=''&&changevalue!=placeholder}"
				v-model="changevalue" :disabled="disabled" :placeholder="placeholder" @focus="unifocus"
				@input="intchange">
			<view class="uni-select-lay-icon" @click="select"><text></text></view>
		</view>
		<!-- 下拉框展示内容 :单选-->
		<scroll-view v-if="!multiple" class="uni-select-lay-options" scroll-y @scrolltolower='scrolltolower' :class="optionsDirection === 'top' ? 'uni-select-lay-options-top' :'uni-select-lay-options-bottom' " v-show="active">
			<!-- 加载中 -->
			<template v-if="loading">
				<view class="uni-select-lay-item" style="color: #777777;">
					<!-- <image
						mode="widthFix" style="width: 16px;height: 16px;margin-right: 5px;" class=".rotating__animation">
					</image> -->
					<text>{{loadingText}}</text>
				</view>
			</template>
			<!-- 加载中 -->
			<!-- 未输入是显示内容 -->
			<template v-else-if="!changes">
				<!-- <view class="uni-select-lay-item" :class="{active:value==''}" @click="selectitem(-1,null)">
					{{placeholder}}
				</view> -->
				<view class="uni-select-lay-item" :class="{active:value==item[svalue]}" v-for="(item,index) in options"
					:key="index" @click="selectitem(index,item)">
					<view style="font-size:32rpx;line-height: 1.3;padding: 10rpx 0 10rpx">{{item[slabel]}}</view>	
					<view style="font-size:24rpx;line-height: 32rpx;padding-bottom: 10rpx;">{{item.addr}}</view>
				</view>
			</template>
			<!-- 未输入是显示内容 -->
			<!-- 搜索时显示内容 -->
			<template v-else>
				<template v-if="vlist.length>0 ">
					<view class="uni-select-lay-item" :class="{active:value==item[svalue]}"
						v-for="(item,index) in vlist" :key="index" @click="selectitem(index,item)">{{item[slabel]}}
					</view>
				</template>
				<template v-else>
					<view class="nosearch">无匹配内容！</view>
				</template>
			</template>
			<template v-if="loadingMore">
				<view class="uni-select-lay-item" style="color: #777777;text-align: center;">
					<!-- <image
						mode="widthFix" style="width: 16px;height: 16px;margin-right: 5px;" class=".rotating__animation">
					</image> -->
					<text>{{loadingText}}</text>
				</view>
			</template>
			<!-- 搜索时显示内容 -->
		</scroll-view>
	</view>
</template>

<script>
	/**
	 * Select 下拉选择插件
	 * @description  简单的下拉选择插件
	 * @tutorial url https://ext.dcloud.net.cn/plugin?id=5627
	 * @property {Boolean}  disabled =[true | false] 是否禁用(默认false) 
	 * @property {Number}  zindex 层级，默认999，防止多个组件一起使用是下拉栏穿透
	 * @property {Array}  options	数据列表
	 * @property {String}  optionsDirection	数据列表的位置（默认值bottom）
	 * 	@value top 数据列表位于上方
	 *  @value bottom 数据列表位于下方
	 * @property {Boolean}  loading	是否加载中
	 * @property {String}  loadingText	加载时提示文字
	 * @property {Boolean}  multiple 是否多选（默认false）
	 * @property {String} name input字段名 
	 * @property {String} value 默认展示的value值
	 * @property {String} placeholder	无选项时展示的文字
	 * @property {String} slabel	自定义列表中键值对应关系 (默认label)（键值对应label）
	 * @property {String}  svalue  自定义列表中键值对应关系（默认value）(键值对应value)
	 * @event {Function()} selectitem 点击选项时触发事件
	 */
	/**
	 * 也参考了插件：https://ext.dcloud.net.cn/plugin?id=2868
	 */
	export default {
		name: "luyj-select-lay",
		props: {
			// 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			searchAjax: {
				type: Boolean,
				default: false
			},
			loadingMore: {
				type: Boolean,
				default: false
			},
			// 层级
			zindex: {
				type: Number,
				default: 0
			},
			// 数据列表
			options: {
				type: Array,
				default () {
					return []
				}
			},
			// 数据列表的位置
			optionsDirection:{
				type:String,
				default:'bottom'
			},
			// 是否加载中
			loading: {
				type: Boolean,
				default: false,
			},
			// 加载提示文字
			loadingText: {
				type: String,
				default: '数据加载中……'
			},
			// 是否多选
			multiple :{
				type: Boolean,
				default:false
			},
			// input字段名
			name: {
				type: String,
				default: ''
			},
			// 默认展示value值
			value: {
				type: String,
				default: ''
			},
			// 无选项时展示文字
			placeholder: {
				type: String,
				default: '请选择'
			},
			// 自定义列表中键值对应关系label
			slabel: {
				type: String,
				default: 'label'
			},
			// 自定义列表中键值对应关系 value
			svalue: {
				type: String,
				default: 'value'
			}
		},
		data() {
			return {
				active: false, //组件是否激活，
				changevalue: "", //搜索框同步
				oldvalue: "", //数据回滚
				changes: false, //正在搜索
				vlist: [] //搜索框查询的列表
			};
		},
		// created之后，元素加载完毕
		mounted() {
			this.itemcheck();
		},
		watch: {
			//value改变
			value() {
				console.log(this.value)
				this.itemcheck();
				this.$forceUpdate()
			},
			//初始化数组
			options() {
				// 此处判断是否有初始value,存在则判断显示文字
				this.itemcheck(true);
			}
		},
		methods: {
			scrolltolower() {
				this.$emit('scrolltolower')
			},
			// 单选和多选的方式本身有相似性,这里先分开.后期再改.
			// ========================================= 单选 ============================================================
			/**
			 * 判断数组及当前active值
			 */
			itemcheck(refresh) {
				if (this.searchAjax && refresh) {
					return
				}
				// 此处判断是否有初始value,存在则判断显示文字
				if (this.value != "") {
					// 展示plachhoder
					//判断数组
					if (this.options.length > 0) {
						for (var i = 0; i < this.options.length; i++) {
							// console.log(this.value,this.options[i][this.svalue])
							if (this.value == this.options[i][this.svalue]) {
								this.oldvalue = this.changevalue = this.options[i][this.slabel];
								break;
							}
						}
						// this.options.forEach(item => {
						// 	if (this.value == item[this.svalue]) {
						// 		this.oldvalue = this.changevalue = item[this.slabel];
						// 		return;
						// 	}
						// })
					}
				} else {
					this.oldvalue = this.changevalue = "";
				}
			},
			/**
			 * 点击组件
			 */
			select() {
				console.log('点击组件')
				if (this.disabled) {
					return;
				}
				this.active = !this.active;
				if (this.active) {
					this.changes = false;
				} else {
					if (this.oldvalue != this.changevalue && this.searchAjax) {
						this.$emit('search', this.oldvalue)
					}
					this.changevalue = this.oldvalue;
				}
			},
			/**
			 * 获得焦点
			 */
			unifocus() {
				if (this.disabled) {
					return
				};
				this.active = true;
				this.changes = false;
			},
			/**
			 * 移除数据
			 */
			removevalue() {
				this.changes = false;
				this.changevalue = "";
			},
			/**
			 * value值改变
			 */
			intchange() {
				if (this.searchAjax) {
					this.$emit('search', this.changevalue)
					return
				}
				if (this.changevalue == '') {
					this.changes = false;
					return;
				};
				this.changes = true;
				this.vlist = this.options.filter(item => {
					return item[this.slabel].includes(this.changevalue)
				})
			},
			/** 点击组件列
			 * @param {Object} index 索引
			 * @param {Object} item	值
			 */
			selectitem(index, item) {
				console.log('选择',index,item)
				// console.log(index,item)
				this.active = false;
				this.changevalue = this.oldvalue;
				this.$emit("selectitem", item)
			},
			// =============================================== 多选 =======================================================
		}
	}
</script>

<style lang="scss" scoped>
	.uni-select-lay {
		position: relative;
		z-index: 2;

		.uni-select-input {
			opacity: 0;
			position: absolute;
			z-index: -111;
		}

		// select部分 
		.uni-select-lay-select {
			user-select: none;
			position: relative;
			z-index: 3;
			height: 90rpx;
			padding: 0 30px 0 10px;
			box-sizing: border-box;
			border-radius: 4px;
			// border: 1px solid rgb(229, 229, 229);
			display: flex;
			align-items: center;
			font-size: 14px;
			color: #999;

			.uni-disabled {
				position: absolute;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: 19;
				cursor: no-drop;
			}

			// input 框的清除按钮
			.uni-select-lay-input-close {
				position: absolute;
				right: 35px;
				top: 0;
				height: 100%;
				width: 15px;
				display: flex;
				align-items: center;
				justify-content: center;
				z-index: 3;
				cursor: pointer;

				text {
					position: relative;
					background: #fff;
					width: 13px;
					height: 13px;
					border-radius: 50%;
					border: 1px solid #bbb;

					&::before,
					&::after {
						content: "";
						position: absolute;
						left: 20%;
						top: 50%;
						height: 1px;
						width: 60%;
						transform: rotate(45deg);
						background-color: #bbb;
					}

					&::after {
						transform: rotate(-45deg);
					}
				}
			}

			.uni-select-lay-input {
				font-size: 14px;
				color: #999;
				display: block;
				width: 98%;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				line-height: 30px;

				&.active {
					color: #333
				}
			}

			.uni-select-lay-icon {
				cursor: pointer;
				position: absolute;
				right: 0;
				top: 0;
				height: 100%;
				width: 30px;
				display: flex;
				align-items: center;
				justify-content: center;

				&::before {
					content: "";
					width: 1px;
					height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					background-color: #e5e5e5;
				}

				text {
					display: block;
					width: 0;
					height: 0;
					border-width: 12rpx 12rpx 0;
					border-style: solid;
					border-color: #bbb transparent transparent;
					transition: .3s;
				}
			}

			&.active .uni-select-lay-icon {
				text {
					transform: rotate(180deg);
				}
			}
		}

		// options部分
		.uni-select-lay-options {
			user-select: none;
			position: absolute;
			left: 0;
			width: 100%;
			height: 500rpx;
			overflow-y: auto;
			border-radius: 4px;
			border: 1px solid rgb(229, 229, 229);
			background: #fff;
			padding: 5px 0;
			box-sizing: border-box;
			z-index: 9;

			.uni-select-lay-item {
				padding: 0 10px;
				box-sizing: border-box;
				cursor: pointer;
				line-height: 2.5;
				transition: .3s;
				font-size: 14px;

				&.active {
					background: #007AFF;
					color: #fff;

					&:hover {
						background: #007AFF;
						color: #fff;
					}
				}

				&:hover {
					background-color: #f5f5f5;
				}
			}

			.nosearch {
				font-size: 16px;
				line-height: 3;
				text-align: center;
				color: #666;
			}
		}
		.uni-select-lay-options-top {
			bottom: calc(100% + 5px);
		}
		.uni-select-lay-options-bottom{
			top:calc(100% + 5px);
		}
	}


.rotating__animation{
   -webkit-animation: spin 1s linear 1s 5 alternate;
    animation: spin 1s linear infinite;
}

	// 旋转
	@-webkit-keyframes spin {
		from {
			-webkit-transform: rotate(0deg);
		}
		to {
			-webkit-transform: rotate(360deg);
		}
	}

	@keyframes spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
