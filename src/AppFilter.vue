<template>
<!-- 	<div class='container filters-container'>
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
		>	<option value="all" selected>Все</option>
			<option v-for='item in statusFilters' :key='item.value' :value="item.value"> {{item.text}} </option>
			
		</select>

	</div> -->
	<tr class='filters-row'>
		<td>
			<input 
			type="text" 
			class="form-control form-control-sm" 
			placeholder=" Поиск" 
			v-model='searchField'
			:class='searchFieldClass'
			@keyup='searchItems'
			/>

		</td>
		<td>
			<select class='form-control form-control-sm'
				v-model='priorityFilter'
				@change='sortItems'
			>
				<option value="all" selected>Все</option>
				<option v-for='item in priorityFilters' :key='item.value' :value="item.value"> {{item.name}} </option>
			</select>
		<td>
			<select name="filters" id="filters" class='form-control form-control-sm'
			v-model='activeFilter'
			@change='sortItems'
			>
				<option value="all" selected>Все классы</option>
				<option v-for='(item,index) in allFilters' 
				:value="item"
				> {{item}}</option>
			</select>
		</td>			
		</td>
		<td>
			
		</td>
		<td>
			<select class='form-control form-control-sm'
				v-model='dateFilter'
				@change='sortItems'
			>
				<option value="all" selected>Все</option>
				<option v-for='item in dateFilters' :key='item.value' :value="item.value"> {{item.name}} </option>
			</select>	
		</td>
		<td>
			<select  name="filter2" id="filter2" class='form-control form-control-sm'
			v-model='secondFilter'
			@change='sortItems'
			>	
				<option value="all" selected>Все</option>
				<option v-for='item in statusFilters' :key='item.value' :value="item.value"> {{item.text}} </option>
			
			</select>
		</td>
	</tr>
</template>

<script>
	export default {
		data() {
			return {
				searchField: '',
				activeFilter: 'all',
				secondFilter: 'all',
				priorityFilter: 'all',
				dateFilter: 'all',
				dateFilters: [ 
					{
						name: 'ближайшие',
						value: 'low'
					},
					{
						name: 'дальнейшие',
						value: 'high'
					}
				],
				searchTimeout: '',
			}
		},
		computed: {

			allFilters() {
				let result = this.$store.getters.itemsFilters;
				return result;
			},
			statusFilters() {
				let result = this.$store.getters.taskStatuses;
				return result;

			},
			priorityFilters() {
				let result = this.$store.getters.priorityList;
				return result;
			},
			searchFieldClass() {
				if (this.searchField == '') {
					return 'empty'
				} else  return ''
			}

		},
		methods: {
			sortItems() {
				this.$store.commit('setFilter', {
					firstFilter: this.activeFilter, 
					secondFilter: this.secondFilter, 
					priorityFilter: this.priorityFilter,
					dateFilter: this.dateFilter 
				});

			},
			searchItems() {
				clearTimeout(this.searchTimeout);
				this.searchTimeout = setTimeout( e => {
					this.activeFilter = 'all'
					this.secondFilter  = 'all'
					this.priorityFilter = 'all'
					this.dateFilter = 'all'
					this.$store.commit('setFilter', {firstFilter: 'all', secondFilter:'all', priorityFilter: 'all', dateFilter: 'all'});
					this.$store.commit('searchItems', this.searchField);
				}, 550);

			}
			
		}
	}
	
</script>

<style scoped>
	.filters-row:hover {
		background-color: inherit;
	}

	input.empty {
    font-family: FontAwesome;
	font-style: normal;
	font-weight: normal;
    text-decoration: inherit;
	  
	}
</style>