import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);
import {findIndex, chainFilters, dateFilter} from '../helpers.js'
export const store = new Vuex.Store({
	state: {
		toDoItems: [
			{
				id: '1',
				title: 'Изучить фреймворк Vue.js',
				type: 'firstType',
				shortDescr: 'нужно изучить фреймворк vue.js',
				dateCreated: '2018-07-30 14:03:00',
				dateEnd: '2018-07-31 16:15:00',
				isArchived: 'false',
				status: 'progress',
				taskClass: 'santehnika',
				area: 'some place',
				priority: '0',
				worker: 'Газманов Олег',
				supervisor: 'Филипп Бедро',
				createdBy: 'manager',

			},
			{
				id: '2',
				title: 'Изучить библиотеку vuetify',
				type: 'secondType',
				shortDescr: 'нужно изучить библиотеку компонентов vuetify',
				dateCreated: '2018-08-05 11:03:00',
				dateEnd: '2018-10-09 22:03:00',
				isArchived: 'false',
				status: 'progress',
				taskClass: 'santehnika',
				area: 'some place',
				priority: '1',
				worker: 'Газманов Олег',
				supervisor: 'Филипп Бедро',
				createdBy: 'manager',
			},
			{
				id: '3',
				title: 'Стать крутым разработчиком',
				type: 'thirdType',
				shortDescr: 'profit!',
				dateCreated: '2018-07-28 00:03:00',
				dateEnd: '2018-11-22 18:30:00',
				isArchived: 'false',
				status: 'progress',
				taskClass: 'santehnika',
				area: 'some place',
				priority: '2',
				worker: 'Газманов Олег',
				supervisor: 'Филипп Бедро',
				createdBy: 'manager',
			},
			{
				id: '4',
				title: 'архивный итем',
				type: 'firstType',
				shortDescr: 'архивный итем архивный итем',
				dateCreated: '2018-07-28 00:03:00',
				dateEnd: '2018-08-22 18:30:00',
				isArchived: 'true',
				status: 'done',
				taskClass: 'santehnika',
				area: 'some place',
				priority: '1',
				worker: 'Газманов Олег',
				supervisor: 'Филипп Бедро',
				createdBy: 'manager',
				finishedTime: '2018-08-07 07:30:00'
			},
			{
				id: '5',
				title: 'итем пауза',
				type: 'firstType',
				shortDescr: 'пауза пауза',
				dateCreated: '2018-07-28 00:03:00',
				dateEnd: '2018-08-22 18:30:00',
				isArchived: 'false',
				status: 'canceled',
				taskClass: 'santehnika',
				area: 'some place',
				priority: '1',
				worker: null,
				supervisor: 'Филипп Бедро',
				createdBy: 'manager',
				finishedTime: '2018-08-07 07:30:00'
			},


		],
		typeFilter: 'all',
		statusFilter: 'all',
		priorityFilter: 'all',
		dateFilter: 'all',
		searchFilter: '',
		activeItemIndex: null,
		archivedItems: [],
		alertClass: 'primary',
		alertText: 'Текст Сообщения!',
		alertShown: false,
		isEditing: false,
		taskClasses: ['firstType','secondType','thirdType','myClass'],
		taskStatuses: [
			{
				text: 'Не начато',
				value: 'notStarted'
			},
			{
				text: 'Готово',
				value: 'done'
			},
			{
				text: 'Отменено',
				value: 'canceled'
			},
			{
				text: 'Отложено',
				value: 'pause'
			},
			{
				text: 'В процессе',
				value: 'progress'
			},
		],
		priority: [
			{
				name: 'низкий',
				value: '0'
			},
			{
				name: 'средний',
				value: '1'
			},
			{
				name: 'высокий',
				value: '2'
			},
		],



	},
	mutations : {
		setFilter(state,payLoad) {
			state.typeFilter = payLoad.firstFilter;
			state.statusFilter = payLoad.secondFilter;
			state.priorityFilter = payLoad.priorityFilter;
			state.dateFilter = payLoad.dateFilter;
		},
		searchItems(state,payLoad) {
			state.searchFilter = payLoad;
		},
		deleteItem(state, id) {
			let indexToDel = 0;
			// находим порядковый номер элемента с id 
			state.toDoItems.forEach( (item,index)=> {
				if (item.id == id) { 
					indexToDel = index
					return;
				}
			})
			state.toDoItems.splice(indexToDel,1);
		},
		showAlert(state, payLoad) {
			state.alertText = payLoad.text;
			state.alertClass = payLoad.type;
			state.alertShown = true;
			setTimeout(() => {state.alertShown = false}, 1000)


		},
		makeDone(state, id) {
			let index = findIndex(state.toDoItems, id);
			state.toDoItems[index].status = 'done'
			state.toDoItems[index].isArchived = 'true'
			state.toDoItems[index].finishedTime =  moment().format('YYYY-MM-DD HH:mm:ss')
			// state.archivedItems.push(state.toDoItems[index]);
			// state.toDoItems.splice(index,1);
		},
		closeEdit(state) {
			state.isEditing = false;
		},
		openEditForm(state, id) {
			let index = findIndex(state.toDoItems, id);
			state.activeItemIndex = index;
			state.isEditing = true;
		},
		saveEditForm(state, newObj) {
			if (state.activeItemIndex != null) {
				state.toDoItems.splice(state.activeItemIndex,1,newObj)
			}
		},
		openNewTaskForm(state) {
			state.activeItemIndex = null;
			state.isEditing = true;
		},
		createNewTask(state, newObj) {
			if (state.activeItemIndex == null) {
				state.toDoItems.push(newObj);
			}
		},
		archiveItem(state, id) {
			let index = findIndex(state.toDoItems, id);
			state.toDoItems[index].isArchived = 'true'
		},
		changeItemStatus(state,payLoad) {
			let index = findIndex(state.toDoItems, payLoad.id);
			state.toDoItems[index].status = payLoad.status;
		}


	},
	actions: {

	},
	getters: {
		itemsFilters(state) {
			let filtersTypes = [];
			// находим среди всех итемов уникальные категории для создании на их основе фильтров
			state.toDoItems.forEach( (item, index) => {
				if (filtersTypes.indexOf(item.type) == -1 ) {
					filtersTypes.push(item.type);
				}
			});
			return filtersTypes;

		},
		toDoItemsSorted(state) {
			// поиск по названию всегда возвращает задания со сброшенными фильтрами
			// если нет никаких фильторов
			if (state.typeFilter == 'all' && 
				state.statusFilter == 'all' && 
				state.priorityFilter == 'all' && 
				state.dateFilter == 'all' && 
				state.searchFilter == '' ) {
				return state.toDoItems
			}
			if (state.searchFilter != '') {
				return state.toDoItems.filter( item => {
					return item.title.toUpperCase().indexOf(state.searchFilter.toUpperCase()) != -1
				})
			}
			//первый фильтр
			let result = chainFilters(state.typeFilter, state.toDoItems, 'type')
			//второй фильтр
			result = chainFilters(state.statusFilter, result, 'status')
			//третий фильтр
			result = chainFilters(state.priorityFilter, result, 'priority')
			//сортировка по дате
			result = dateFilter(state.dateFilter, result, 'dateEnd')
			return result;
		},
		getObjectToFillForm(state) {
			if (state.isEditing && state.activeItemIndex != null) {
				return state.toDoItems[state.activeItemIndex]

			} else console.warn('editing is false or no active item')
		},
		priorityList(state){
			return state.priority
		},
		taskStatuses(state) {
			return state.taskStatuses
		},
	}

})

