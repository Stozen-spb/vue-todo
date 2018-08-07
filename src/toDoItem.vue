<template>
	<div class="card h-100">
	  <div class="card-header ">
	     {{title}}
	  </div>
	  <div class="progress mb-2">

		  <div class="progress-bar"  :style="progressWidth"> </div>
		  <div class="progress-text">{{deadLineInHours}}</div>
	  </div>
	  <div class="row justify-content-center">
	  	<div class="col-8">
	  		<img class="card-img-top" src="./assets/notepad.png" alt="Card image cap">
	  	</div>
	  </div>
	  <div class="card-body">
	    <h5 class="card-title">{{type}}</h5>
	    <p class="card-text">{{shortDescr}}</p>
		<div class="group-of-btns">
			<button type="button" class="btn btn-primary btn-block"
				@click='editItem'
			>

				<i class="fa fa-pencil-square-o" aria-hidden="true"></i> 
				Редактировать
			</button> 
			<button v-if='isArchived != "true"' type="button" class="btn btn-success btn-block"
				@click='makeDone'
			>
				<i class="fa fa-check" aria-hidden="true"></i>
				Готово
			</button> 
			<div class='delete-btn'
			@click='deleteItem'
			>
				<i class="fa fa-times text-danger" aria-hidden="true"></i>
			</div> 
		</div>



	  </div>
	</div>
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
	.card {
		position: relative;
	}
	.card-header {
		padding:10px 12px;
		font-weight: 700;
	}
	.card-body {
		display:flex;
		flex-direction: column;
	}
	.card-body p {
		flex-grow: 1;
	}
	.progress {
		position: relative;
		height: 25px;
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