import Vue from 'vue'
import VueRouter from 'vue-router'
import E404 from './E404.vue'
import toDoList from './toDoList.vue'
import toDoListArchive from './toDoListArchive.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '',
		redirect: '/current'
	},
	{
		path: '/current',
		component: toDoList
	},
	{
		path: '/archive',
		component: toDoListArchive
	},
	// {
	// 	path:'/archive',
	// 	component: Archive
	// },
	{
		path: '*',
		component: E404
	}
]

export const router = new VueRouter({
	routes
})