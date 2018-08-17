<template>
	<div class="container">
		<div class="row justify-content-start align-items-center mb-3">
			<div class="col-sm-auto">
				<button class="btn btn-primary"
					@click='openNewTaskForm'
				>Создать задачу</button>
			</div>
			<div class="col-sm-auto">

			</div>
		</div>
		<table class="table task-table table-hover thead-light table-bordered">
		  <thead>
		    <tr>
		      <th style="width: 30%" >Название</th>
		      <th style="width: 8%" >Приоритет</th>
		      <th style="width: 13%" >Класс</th>
		      <th style="width: 10%" class="double-th"> <span>Исполнитель/</span> <span>Помещение</span></th>
		      <th style="width: 12%" >Исполнить до</th>
		      <th style="width: 17%">Статус</th>
		    </tr>
		  </thead>
		  <tbody><AppFilter></AppFilter></tbody>
		  <tbody v-for='(item, index) in items'>
		  	
				<toDoItem
					:title='item.title'
					:type='item.type'
					:priority='item.priority'
					:status='item.status'
					:worker='item.worker'
					:area='item.area'
					:shortDescr='item.shortDescr'
					:dateCreated='item.dateCreated'
					:dateEnd='item.dateEnd'
					:key='item.id'
					:id='item.id'
				></toDoItem>
		  </tbody>
		  <tr v-if='emptySearch'>
		  	<td colspan="6"> НИЧЕГО НЕ НАЙДЕНО</td>
		  </tr>
		</table>
	</div>
</template>

<script>
	export default {
		data() {
			return {


			}
		},
		computed: {
			items() {
				return this.$store.getters.toDoItemsSorted.filter((item) => { return item.isArchived == 'false'});
			},
			emptySearch() {
				let result = this.$store.getters.toDoItemsSorted.filter((item) => { return item.isArchived == 'false'});
				if (result.length == 0) {
					return true;
				} else return false;
			}

		},
		methods: {
			openNewTaskForm() {
				this.$store.commit('openNewTaskForm')
			}
			
		},
		created() {
			this.$store.commit('setFilter', {firstFilter: 'all', secondFilter:'all', priorityFilter: 'all', dateFilter: 'all'});
		}
	}
	
</script>

<style scoped>
	.table {
	    font-size: 12px;
		text-align: left;
		color: #21293c;
		background-color: #fff;
	}

	thead {
		color: #787f82;
		background-color: #fafafa;
		border-bottom: 1px solid #dddddd;
	}
	thead tr th:not(:first-child) {
		text-align: center;
	}
	.double-th {
		padding-top:0;
		padding-bottom: 0;
	}
</style>