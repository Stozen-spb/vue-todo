<template>
	<div class='container'>
		<div class="col"> <span class="filters-title">Сортировать результаты:</span>
		<select name="filters" id="filters" class='form-control'
		v-model='activeFilter'
		@change='sortItems'
		>
			<option value="all">Показать все</option>
			<option v-for='(item,index) in allFilters' 
			:value="item"
			> {{item}}</option>
		</select>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeFilter: 'all',
				prevFilter: ''
			}
		},
		computed: {

			allFilters() {
				let result = this.$store.getters.itemsFilters;
				return result;
			}

		},
		methods: {
			sortItems() {
				this.prevFilter = this.activeFilter;
				this.$store.commit('setFilter', this.activeFilter);

			}
			
		}
	}
	
</script>

<style scoped>
	#filters {
		display: inline;
		width:auto;
	}
	.filters-title {
		font-size: 18px;
		font-weight: 500;
		margin-right: 10px;
	}
</style>