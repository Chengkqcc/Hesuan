<template>
	<div>
		<luyj-select-lay @scrolltolower="scrolltolowerAddress" :value="spId" optionsDirection='top' :loadingMore="loadingMore" svalue="spId"
			:zindex="9999 + index" searchAjax slabel="spName" :name="index" placeholder="请选择商户或输入商户名称" :options="list"
			@search="addressSearchEvent" @selectitem="selectitem">
		</luyj-select-lay>
	</div>
</template>
<script>
	import {
		getSpListByPage
	} from "@/common/api";
	export default {
		props: {
			spId: {
				type: Number,
			},
			index: {
				type: Number,
			},
			list: {
				type: Array,
			},
			spType: {
				type: String,
				default:null
			},
		},
		data() {
			return {
				loadingMore: true,
				moreAddressPage:2,
				name:null
			};
		},
		watch: {
			// data: {
			// 	deep: true,
			// 	handler(val) {
			// 		this.moreAddressPage = 1;
			// 		this.getList()
			// 	},
			// },
		},

		mounted() {
			this.moreAddressPage = 2;
			// this.getList()
			let time;
			this.throttlingAddressSearch = (value) => {
				if (time) {
					clearTimeout(time);
				}
				time = setTimeout(() => {
					this.addressSearch(value);
				}, 500);
			};
		},
		methods: {
			getList() {
				getSpListByPage({
					page: this.moreAddressPage,
					spType:this.spType
				}).then((res) => {
					this.moreAddressPage++;
					this.list = res.list;
				});
			},
			
			
			selectitem(item) {
				this.$emit("selectitem", item);
			},
			async addressSearch(value) {
				try {
					this.name = value
					this.moreAddressPage = 1;
					this.loadingMoreAddress = false;
					const result = await getSpListByPage({
						page: this.moreAddressPage,
						spType:this.spType,
						name: value,
					});
					this.loadingMore = false;
					this.$emit('update:list',result.list)
					// this.list = result.list;
				} catch (error) {
					uni.$u.toast("当前网络不佳，请稍后重试");
				}
			},
			addressSearchEvent(value) {
				this.throttlingAddressSearch(value);
			},
			async scrolltolowerAddress() {
				if (this.loadingMoreAddress) return;
				this.loadingMoreAddress = true;
				this.loadingMore = true;
				try {
					const result = await getSpListByPage({
						page: this.moreAddressPage,name:this.name,spType:this.spType
					});
					this.loadingMore = false;
					var arr = [...this.list, ...result.list];
					
					this.$emit('update:list',arr)
					if (result.list.length <20) {
						return;
					}
					this.moreAddressPage++;
				} catch (error) {
					console.log(error);
				}
				this.loadingMoreAddress = false;
			},
			
			
			unique(arr, key) {
				if (!arr) return arr
				if (key === undefined) return [...new Set(arr)]
				const map = {
					'string': e => e[key],
					'function': e => key(e),
				}
				const fn = map[typeof key]
				const obj = arr.reduce((o, e) => (o[fn(e)] = e, o), {})
				return Object.values(obj)
			},
			
		},
	};
</script>
