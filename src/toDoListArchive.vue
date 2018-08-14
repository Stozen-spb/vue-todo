<template>
	<div class="container">
		<div class="row justify-content-start align-items-center mb-3">
			<div class="col-sm-auto">
				<button class="btn btn-primary"
					@click='openNewTaskForm'
				>Создать задачу</button>
			</div>
			<div class="col-sm-auto">
				<AppFilter
				></AppFilter>
			</div>
		</div>
		<div class="row">
			<div class="col-sm-6 col-md-4 col-lg-3 mb-4" v-for='(item, index) in items' >
				<toDoItem
				:title='item.title'
				:type='item.type'
				:shortDescr='item.shortDescr'
				:dateCreated='item.dateCreated'
				:dateEnd='item.dateEnd'
				:key='item.id'
				:id='item.id'
				:status='item.status'
				:isArchived='item.isArchived'
				:finishedTime='item.finishedTime'
				></toDoItem>
			</div>
		</div>
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
				return this.$store.getters.toDoItemsSorted.filter( function(item) {return item.isArchived == 'true'});
			}

		},
		methods: {
			openNewTaskForm() {
				this.$store.commit('openNewTaskForm')
			}
			
		},
		created() {
			this.$store.commit('setFilter', {firstFilter: 'all', secondFilter:'all'});
		}
	}
	
</script>

<style scoped>
	
</style>