<template>
	<div class="container">
		<div class="form-body">
		    <div class="modal-dialog">
		        <div class="modal-content">
		            <!-- Modal Header -->
		            <div class="modal-header">
		            	<h5 class="modal-title d-flex">
		                   <div >{{taskTitle}}</div> 
		                   <div 
		                   	 v-if='fields.isArchived != "true"'
		                     @click='isOpenStatusSelect = true'
		                   	 class='ml-auto status-select'
		                   	 >
		                   		{{statusText}}
		                   		<PopOverList v-if='isOpenStatusSelect' :items='taskStatuses'
		                   		@selectStatus='selectStatus'
		                   		>
		                   		</PopOverList>
		               		</div>
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
		                  	<label for="" class="col-form-label-sm mb-0">Примечание менеджера:</label>
		                  	<textarea rows="2"  class="form-control form-control-sm" 
		                      placeholder="Примечание менеджера"
		                      v-model.trim='fields.managerComment'
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
				                     	:value = 'dateEndHumanFormat'
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
					managerComment: '',
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
				isOpenStatusSelect: false,

			}
		},
		computed: {
			taskClasses(){
				return this.$store.state.taskClasses;
			},
			priorityOptions() {
				return this.$store.state.priority;
			},
			taskStatuses(){
				return this.$store.getters.taskStatuses;
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
			},
			dateEndHumanFormat(){
				return moment(this.fields.finishedTime).format('DD.MM.YYYY, HH:mm')
			},
			statusText(){
				if (this.fields.status == 'done') {
					return `Готово`
				}
				if (this.fields.status == 'notStarted') {
					return `Не начато`
				}
				if (this.fields.status == 'canceled') {
					return `Отменено`
				}
				if (this.fields.status == 'pause') {
					return `Отложено`
				}
				if (this.fields.status == 'progress') {
					return `В процессе`
				}
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
					newObj.id = '' +  Math.random().toFixed(4);
					newObj.dateCreated = moment().format('YYYY-MM-DD HH:mm:ss')
					newObj.isArchived = 'false'
					newObj.status = 'progress'
					this.$store.commit('createNewTask', newObj)
					this.$store.commit('closeEdit')
				}

			},
			deleteTask() {
				if ( confirm('Удалить?') ) {
					this.$store.commit('deleteItem', this.fields.id)
					this.$store.commit('closeEdit')
					this.$store.commit('showAlert', {type: 'success', text:'Итем удален.'})
				}
			},
			archiveThisTask() {
				this.$store.commit('archiveItem', this.fields.id)
				this.$store.commit('closeEdit')
				this.$store.commit('showAlert', {type: 'success', text:'Итем перемещен в архив.'})
			},
			selectStatus(e){
				this.isOpenStatusSelect = false;
				this.fields.status = e.value
				this.$store.commit('changeItemStatus',{id: this.fields.id, status: this.fields.status});
				
			},
			checkClickArea(e) {
				if ( e.target.classList.contains('status-select') ) {
					return false
				} else this.isOpenStatusSelect = false;
			},
			
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
			// обработчик клика в любом месте документа и закрытия выбора статуса
			document.addEventListener('click', this.checkClickArea)
		},
		beforeDestroy() {
			document.removeEventListener('click', this.checkClickArea)
		}
}		


	
</script>

<style scoped>

	.modal-content {
		border: 1px solid #e0e0e0;
		border-radius: 2px;
		box-shadow: 0px 0px 20px 0 rgba(0, 0, 0, 0.1);
	}
	.modal-title {
		width:100%;
	}

	.modal-header, 
	.modal-footer {
		padding: 0.5rem 1rem;
	}

	.modal-body {
		padding: 0 1rem 0.5rem 1rem ;
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
	.status-select {
		position: relative;
	}
	.status-select:hover {
		cursor:pointer;
		text-decoration: underline;					
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



	
</style>