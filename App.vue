<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
		page {
			height: 100%;
		}
	
		/*去掉挂号页面科室右侧滚动条 */
		::-webkit-scrollbar {
			display: none;
		}
</style>
