<template>

		<div :class='"container alert alert-"+alertType'>{{text}}</div>

</template>

<script>
	export default {
		props:['text'],
		data() {
			return {

			}
		},
		computed: {
			alertType() {
				return this.$store.state.alertClass;
			}

		},
		methods: {
			
		},
	}
	
</script>

<style scoped>
	.alert {
		position: fixed;
		width:50%;
		top: 1%;
		right: 0;
		left:0;
		margin: 0 auto;
		z-index: 55;

	}
</style>