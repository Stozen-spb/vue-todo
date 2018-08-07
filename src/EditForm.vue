<template>
	<div class="container">
		<div class="form-body">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <!-- Modal Header -->
		            <div class="modal-header">
		            	<h5 class="modal-title" >
		                    Редактирование задачи:
		                </h5>
		                <button type="button" class="close" 
		                   @click='close'
		                 >
		                       <span aria-hidden="true">&times;</span>
		                       <span class="sr-only">Close</span>
		                </button>
		            </div>
		            
		            <!-- Modal Body -->
		            <div class="modal-body">
		                
		                <form role="form">
		                  <div class="form-group mb-0">
		                    <label class='col-form-label-sm mb-0'>Название задачи:</label>
		                      <ValidationInput validType='notEmpty'
		                       placeholder="Введите название задачи (обязательно)"
		                       :startValue='fields.title'
		                       @input='taskInput'
		                       :isDisabled='disabledInput'
		                       />
		                  </div>
		                  <div class="form-group mb-0">
		                    <label class='col-form-label-sm mb-0'>Краткое описание:</label>
		                     <input   class="form-control form-control-sm" 
		                      placeholder="Краткое описание задачи"
		                      v-model.trim='fields.shortDescr'
		                      :disabled='disabledInput'
		                      />
		                  </div>

						  <div class="form-group mb-0">
		                    <label class='col-form-label-sm mb-0'  >Класс неисправности:</label>
		                     <select class='form-control form-control-sm'
		                     v-model='fields.type'
		                     :disabled='disabledInput'
		                     >
		                     	<option selected>Выбрать...</option>
		                     	<option v-for='(item,index) in taskClasses'
		                     	:value='item'
		                     	>{{item}}</option>
		                     </select>
		                  </div>

		                  <div class="form-group mb-0">
		                    <label class='col-form-label-sm mb-0'>Помещение:</label>
		                     <input  class="form-control form-control-sm" placeholder="Помещение"
		                     v-model.trim='fields.area'
		                     :disabled='disabledInput'
		                     />
		                  </div>

		                   <div class="form-group mb-0">
		                    <label class='col-form-label-sm mb-0'  >Приоритет:</label>
		                     <select class='form-control form-control-sm'
		                     v-model='fields.priority'
		                     :disabled='disabledInput'
		                     >
		                     	<option selected>Выбрать...</option>
		                     	<option v-for='(item,index) in priorityOptions'
		                     	:value='item.value'
		                     	>{{item.name}}</option>
		                     </select>
		                  </div>

		                  <div class="form-group mb-0">
							<div v-if='fields.isArchived == "true"'>
								<label class='col-form-label-sm mb-0'>Исполнено:</label>
		                     	<input type="text" class="form-control form-control-sm" disabled
		                     	:value=' new Date( Date.parse(fields.finishedTime)).toLocaleString()'
		                     	>

							</div>

							<div v-else>
								<label class='col-form-label-sm mb-0'>Исполнить до:</label>
		                     	<datetime format="YYYY-MM-DD H:i:s" width="300px" v-model="fields.dateEnd" firstDayOfWeek="1" ></datetime>
							</div>
		                  </div>

		                  <div class="form-group mb-0">
								<div class="row">
									<div class="col">
										 <label class='col-form-label-sm mb-0'>Специалист:</label>
									</div>
									<div class="col">
										<label class='col-form-label-sm mb-0'>Отв. Специалист:</label>	
									</div>
								</div>
								<div class="row">
									<div class="col">
										<select class='form-control form-control-sm'
										v-model='fields.worker'
										:disabled='disabledInput'
										>
											<option selected>Выбрать...</option>
										</select>
									</div>
									<div class="col">
										<select class='form-control form-control-sm'
										v-model='fields.supervisor'
										:disabled='disabledInput'
										>
											<option selected>Выбрать...</option>
										</select>
									</div>
								</div>
		                  </div>




		                </form>
		                
		                
		            </div>
		            
		            <!-- Modal Footer -->
		            <div class="modal-footer">
		        		<button type="button" class="btn btn-danger"
							@click='deleteTask'
							:disabled='deleteTaskIsDisabled'
		                >
		                    Удалить
		                </button>
		                <button  v-if='fields.isArchived != "true"'
		                	type="button" class="btn btn-default"
							@click='archiveThisTask'
							:disabled='deleteTaskIsDisabled'
		                >
		                    В архив
		                </button>
		                <button type="button" class="btn btn-default"
		                        @click='close'>
		                            Закрыть
		                </button>
		                <button type="button" class="btn btn-primary"
							@click='saveForm'
		                >
		                    Сохранить
		                </button>
		            </div>
		        </div>
		    </div> <!-- eof modal dialog -->
	</div>

	</div>
</template>

<script>
	export default {
		props:{
			name: {
				type: String,
				default: ''
			},
		},
		data() {
			return {
				fields: {
					id: '',
					title: '',
					dateEnd: '',
					shortDescr: '',
					type: '',
					area: '',
					priority: '',
					worker: '',
					supervisor: '',
					dateCreated: '',
					isArchived: '',
					status: '',
					finishedTime:''
				}
			}
		},
		computed: {
			taskClasses(){
				return this.$store.state.taskClasses;
			},
			priorityOptions() {
				return this.$store.state.priority;
			},
			deleteTaskIsDisabled(){
				if (this.$store.state.activeItemIndex == null) {
					return 'disabled'
				}
			},
			disabledInput() {
				if (this.fields.isArchived == 'true') {
					return true
				} else return false
			}

		},
		methods: {
			close() {
				this.$store.commit('closeEdit');
			},
			taskInput(e){
				this.fields.title = e.value;
			},
			saveForm() {
				let newObj = {};

				for ( let key in this.fields) {
					newObj[key] = this.fields[key]
				}
				//создание новой задачи либо редактирование существующей
				if (this.$store.state.activeItemIndex != null) {
					this.$store.commit('saveEditForm', newObj)
					this.$store.commit('closeEdit')
				} else {
					//создание новой задачи
					newObj.id = new Date();
					newObj.dateCreated = moment().format('YYYY-MM-DD HH:mm:ss')
					newObj.isArchived = 'false'
					this.$store.commit('createNewTask', newObj)
					this.$store.commit('closeEdit')
				}

			},
			deleteTask() {
				this.$store.commit('deleteItem', this.fields.id)
				this.$store.commit('closeEdit')
			},
			archiveThisTask() {
				this.$store.commit('archiveItem', this.fields.id)
				this.$store.commit('closeEdit')
			}
			
		},
		created() {
			// проверяем если есть индекс, то заполняем поля формы
			if (this.$store.state.activeItemIndex != null) {
				let obj = this.$store.getters.getObjectToFillForm;

				for (let key in obj) {
					this.fields[key] = obj[key]
				}
			}
		}
	}
	
</script>

<style scoped>
	.form-body {


	}

	.modal-content {
		box-shadow: 6px 6px 11px 0px rgba(0,0,0,0.75);
	}
	.container {
		position: absolute;
		right: 0;
		left:0;
		margin: 0 auto;
	    top: 0px;
	    text-align: left;
	    z-index: 50;
	}

	
</style>