<template>
	<tr @click='editItem'>
		<td>
			{{title.toUpperCase()}}
		</td>
		<td class='priority'>
			<i class="fa fa-circle priority-icon" :class='priorytClass' aria-hidden="true"></i> <span> {{priorityHumanFormat}}</span>
		</td>
		<td>
			{{type}}
		</td>
		<td>
			{{worker}} <br> {{area}}
		</td>
		<td>
			{{dateEndHumanFormat}}
		</td>
		<td>
			<div class="progress">
			  <div class="progress-bar"  :style="progressWidth"> </div>
			  <div class="progress-text">{{deadLineInHours}}</div>
		  </div>
		</td>
	</tr>
</template>

<script>
	import {getIndex} from './helpers.js'
	export default {
		props: {
			id: {
				type: String,
			},
			title: {
				type: String,
			},
			type: {
				type: String,
			},
			priority: {
				type: String,
			},
			worker: {
				type: String,
				default: 'Не назначен'
			},
			shortDescr: {
				type: String,
				default: 'Нет описания'
			},
			dateCreated: {
				type: String
			},
			dateEnd: {
				type: String
			},
			isArchived: {
				type: String
			},
			status: {
				type: String
			},
			area: {
				type: String
			}
		},
		data() {
			return {

			}
		},
		computed: {
			progressWidth() {
				if (this.status == 'done') {
					return `background-color:#28a745; width:100%;`
				}
				if (this.status == 'notStarted') {
					return `background-color:#1EA5E8;; width:100%;`
				}
				if (this.status == 'canceled') {
					return `background-color:#78909C; width:100%;`
				}
				if (this.status == 'pause') {
					return `background-color:#a654dc; width:100%;`
				}

				let width = 0;
				let dateCreated = Date.parse(this.dateCreated);
				let dateEnd = Date.parse(this.dateEnd);
				let period = (dateEnd - dateCreated);
				width = ( dateEnd - new Date() ) / period;
				if ( period < 0 || width <= 0.00) {
					return `background-color:#bd2130; width:100%;`
				}
				return `width:${width*100}%`
			},
			deadLineInHours() {
				if (this.status == 'done') {
					return `Готово`
				}
				if (this.status == 'notStarted') {
					return `Не начато`
				}
				if (this.status == 'canceled') {
					return `Отменено`
				}
				if (this.status == 'pause') {
					return `Отложено`
				}

				// если ничего не подошло рассчитываем дедлайн
				let hours = 0;
				let days = 0;
				let minutes = 0;
				let dateCreated = Date.parse(this.dateCreated);
				let dateEnd = Date.parse(this.dateEnd);
				days = Math.floor(( dateEnd - new Date() ) / (1000*60*60*24));
				hours = ( dateEnd - new Date() ) / (1000*60*60);
				minutes =  ( dateEnd - new Date() ) / (1000*60);

				if ( days > 0) {
					let daysText = ['дня', 'день', 'дней'][getIndex(days)]
					return `осталось: ${days} ${daysText}`
				} else if (hours > 1) {
					let hoursText = ['часа', 'час', 'часов'][getIndex(hours)]
					return `осталось: ${hours.toFixed(0)} ${hoursText}`
				} else if (minutes > 0) {
					let minutesText = ['минуты', 'минута', 'минут'][getIndex(minutes)]
					return `осталось: ${minutes.toFixed(0)} ${minutesText}`
				} else {
					return 'Провалено'
				}

			},
			dateEndHumanFormat() {
				return  moment(this.dateEnd).format('DD.MM.YYYY, HH:MM')
			},
			priorityHumanFormat() {
				const priorityList = ['низкий','средний','высокий'];
				return priorityList[this.priority];
			},
			priorytClass() {
				const priorityList = ['low-priority','normal-priority','high-priority'];
				return priorityList[this.priority];
			}

		},
		methods: {
			deleteItem() {
				this.$store.commit('deleteItem', this.id)
				this.$store.commit('showAlert', {type: 'success', text:'Итем удален.'})
			},
			makeDone() {
				this.$store.commit('makeDone', this.id)
				this.$store.commit('showAlert', {type: 'success', text:'Итем перенесен в архив.'})
			},
			editItem() {
				this.$store.commit('openEditForm',this.id)
			}
		}
	}
	
</script>

<style scoped>
	.priority-icon {
		font-size: 7px;
	    line-height: 7px;
	    vertical-align: middle;
	}
	.low-priority {
		color:#1EA5E8;
	}

	.normal-priority {
		color:rgb(244, 162, 53);
	}

	.high-priority {
		color: #ec4721;
	}
	.progress {
		position: relative;
		height: 25px;
		text-align: center;
	}

	.progress-text {
		position: absolute;
		left:0;
		right:0;
		top:5px;
		margin: 0 auto;
		font-size: 14px;
		line-height: 14px;
		color: #fff;
		text-shadow: #000 1px 1px 0, #000 -1px -1px 0, #000 -1px 1px 0, #000 1px -1px 0;
	}

	.delete-btn {
		position: absolute;
		display: none;
		top:3px;
		right:5px;
		font-size: 20px;

	}
	.delete-btn:hover {
		cursor: pointer;
	}

	.card:hover .delete-btn {
		display: block;
	}
</style>