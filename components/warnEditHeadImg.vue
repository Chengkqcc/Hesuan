<template>
	<u-modal :show="show" :title="title_modal" :content='content_modal' :showCancelButton='true' @confirm="$emit('confirm')"
	@cancel="$emit('cancel')"></u-modal>
</template>

<script>
export default {
	props: ['show'],
	data() {
		return {
			title_modal:'上传头像提示',
			content_modal:'头像仅限提交一次，请谨慎操作。如因图像不清晰或上传其他图像，导致无法正常进入网格的，后果自负。如出现特殊情况，请联系所属网格管理员后台修改。',
		}
	},
	// methods: {
	// 	tapConfirm() {
	// 		this.$emit('confirm');
	// 		this.show_modal = false;
	// 	}
	// }
	
}
</script>

<style>
</style>