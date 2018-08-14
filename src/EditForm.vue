<template>
	<div class="container">
		<div class="form-body">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <!-- Modal Header -->
		            <div class="modal-header">
		            	<h5 class="modal-title" >
		                   {{taskTitle}}
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
		                       placeholder="Введите название задачи"
		                       :startValue='fields.title'
		                       @input='taskInput'
		                       :isDisabled='disabledInput'
		                       />
		                  </div>
		                  <div class="form-group mb-0">
		                    <label class='col-form-label-sm mb-0'>Описание:</label>
		                     <textarea rows="4"  class="form-control form-control-sm" 
		                      placeholder="Описание задачи"
		                      v-model.trim='fields.shortDescr'
		                      :disabled='disabledInput'
		                      />
		                  </div>
							
						  <div class="form-group mb-0">
		                    <label class='col-form-label-sm mb-0'  >Класс неисправности:</label>
		                     <select class='form-control form-control-sm'
		                     v-model='fields.type'
		                     :disabled='disabledInput'
		                     required
		                     >
		                     	<option value='' selected>Выбрать...</option>
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

<!-- 		                   <div class="form-group mb-0">
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
			                     	<datetime format="YYYY-MM-DD H:i:s" width="214px" v-model="fields.dateEnd" firstDayOfWeek="1" ></datetime>
								</div>
		                  </div> -->

		                  	<div class="form-group mb-0">
							 	<div class="row">
									<div class="col">
										 <label class='col-form-label-sm mb-0'>Приоритет:</label>
									</div>
									<div class="col">
										<label v-if='fields.isArchived == "true"' class='col-form-label-sm mb-0'>Исполнено:</label>	
										<label v-else class='col-form-label-sm mb-0'>Исполнить до:</label>	
									</div>
								</div>

								<div class="row">
									<div class="col">
										<select class='form-control form-control-sm'
					                     v-model='fields.priority'
					                     :disabled='disabledInput'
					                     >
					                     	<option value='' selected>Выбрать...</option>
					                     	<option v-for='(item,index) in priorityOptions'
					                     	:value='item.value'
					                     	>{{item.name}}</option>
					                     </select>
									</div>
									<div class="col">
										<input v-if='fields.isArchived == "true"' type="text" class="form-control form-control-sm" disabled
				                     	:value=' new Date( Date.parse(fields.finishedTime)).toLocaleString()'
				                     	>
				                     	<datetime v-else format="YYYY-MM-DD H:i:s" width="218px" v-model="fields.dateEnd" firstDayOfWeek="1" ></datetime>
									</div>
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
											<option value='' selected>Выбрать...</option>
										</select>
									</div>
									<div class="col">
										<select class='form-control form-control-sm'
										v-model='fields.supervisor'
										:disabled='disabledInput'
										>
											<option value='' selected>Выбрать...</option>
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
							:disabled = 'formInvalid'
		                >
		                    Сохранить
		                </button>
		            </div>
		            <div class="created-by">
		                	{{dateCreated}}
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
				},
				userStatus: 'normal',
				formErrors: true,
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
			},
			dateCreated() {
				if ( this.fields.dateCreated) {
					return `Создано superadmin ${ new Date( Date.parse(this.fields.dateCreated)).toLocaleString()}`
				}
			},
			taskTitle() {
				if (this.fields.id) {
					return `Карточка задачи #${this.fields.id} `
				} else return `Создание задачи`
			},
			restrictedField() {
				if (this.userStatus != 'manager' || this.userStatus != 'admin' ) {
					return true
				}
			},
			formInvalid() {
				if (this.formErrors == true || !this.fields.type) {
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
				this.formErrors = e.errors;
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
					newObj.id = '' +  Math.random();
					newObj.dateCreated = moment().format('YYYY-MM-DD HH:mm:ss')
					newObj.isArchived = 'false'
					newObj.status = 'progress'
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
				this.formErrors = false;
			}
		}
	}
	
</script>

<style scoped>

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

	.modal-footer {
		display:flex;
		flex-wrap: wrap;
		justify-content: flex-end;
	}

	@media (max-width: 576px ) {
		.modal-footer {
			justify-content: center;
		}
		.modal-footer .btn {
			width:100%;
			margin-bottom: 2px;

		}
	}

	.created-by {
		color: #99979c;
		margin-top: -5px;
		padding:0px 15px 5px 10px;
		font-size: 14px;
		text-align: right;
	}

	input:invalid {
	  background-color: #ffdddd;
	}

	select:invalid {
	  background-color: #ffdddd;
	}

	
</style>