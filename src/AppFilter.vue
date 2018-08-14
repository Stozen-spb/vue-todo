<template>
	<div class='container filters-container'>
		 <span class="filters-title">Сортировать результаты:</span>
		<select name="filters" id="filters" class='form-control'
		v-model='activeFilter'
		@change='sortItems'
		>
			<option value="all">Все классы</option>
			<option v-for='(item,index) in allFilters' 
			:value="item"
			> {{item}}</option>
		</select>


		<select v-if='isArchiveRoute' name="filter2" id="filter2" class='form-control'
		v-model='secondFilter'
		@change='sortItems'
		>
			<option value="all">Все статусы </option>
			<option value="done">Готовые </option>
			<option value="progress">Неготовые </option>
			
		</select>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeFilter: 'all',
				secondFilter: 'all',
				prevFilter: ''
			}
		},
		computed: {

			allFilters() {
				let result = this.$store.getters.itemsFilters;
				return result;
			},
			isArchiveRoute(){
				if (this.$router.currentRoute.name == 'archive')
					return true
			}

		},
		methods: {
			sortItems() {
				this.prevFilter = this.activeFilter;
				this.$store.commit('setFilter', {firstFilter: this.activeFilter, secondFilter: this.secondFilter});
				console.log(this.$router.currentRoute);

			}
			
		}
	}
	
</script>

<style scoped>
	.filters-container select {
		display: inline;
		width:auto;
	}
	.filters-title {
		font-size: 18px;
		font-weight: 500;
		margin-right: 10px;
	}
</style>