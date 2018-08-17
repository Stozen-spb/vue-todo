<template>
	<div class="popover-container">
		<ul class="status-group mb-1">
			<li v-for='(item,index) in items' class="status" :key='index'
			@click.stop='clickOnItem($event, index)'
			>
			{{item.text}}
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		props:['items'],
		data() {
			return {

			}
		},
		computed: {

		},
		methods: {
			clickOnItem(e,index) {
				this.$emit('selectStatus',{value: this.items[index].value, text:this.items[index].text });
			}
			
		},
	}
	
</script>

<style scoped>
	.popover-container {
		position: absolute;
		top: 100%;
	    left: 50%;
	    transform: translate(-50%);
		min-width:150px;
		box-sizing: border-box;
		background-color: #fff;
		z-index: 60;
		border: 1px solid #e0e0e0;
		border-radius: 2px;
		box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.1);

	}

	.popover-container:before {
		left: auto;
	    right: calc(50% - 7px);
	    position: absolute;
	    top: -7px;
	    bottom: auto;
	    content: "";
	    border-left: 8px solid transparent;
	    border-right: 8px solid transparent;
	    border-bottom: 8px solid #fff;
	    border-top: none;
	    display: inline-block;
	    z-index: 59;
	}
	.status {
		padding: 0.1rem 1rem;
		font-size: 13px;
	}
	
	.status:hover {
		background-color: #fafafa;
	}
</style>