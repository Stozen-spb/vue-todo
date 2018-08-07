<template>
	<div class="box">
		<input type='text' class="form-control form-control-sm" autocomplete="on" 
			:placeholder='placeholder'
			v-model.trim='value'
			@input='validate($event)'
			:name='validType'
			:disabled='isDisabled'
		>
		<i class='valid-indicator' :class='inputClass' aria-hidden="true"></i>
	</div>
</template>

<script>
	export default {
		props: ['validType', 'pattern','placeholder', 'startValue', 'isDisabled'],
		data () {
			return {
					validationTypes: {
						notEmpty: /^.+$/,
						name: /^[A-Za-zА-Яа-я\-]{2,30}$/,
						email: /.@.+\..+/,
						number: /^[0-9]+$/,
						comment: /^.{0,220}$/,
						age:/^[0-9]{1,3}$/,
						
					},
					value: '',
					errors: '',
					validClass: 'fa fa-check text-success',
					invalidClass: 'fa fa-times text-danger'

			}

		},
		computed: {
			inputClass() {
				if ( this.errors === '') return false;

				else {
					return this.errors ? this.invalidClass : this.validClass;}
			}

		},
		methods: {
			validate(e) {
				// если есть индивидуальный паттерн валидации
				if (this.pattern ) {
					if ( this.pattern.test(this.value) ) {
						this.errors = false
					}	
						else { 
							this.errors = true
					 	}
					this.checkErrors(e);
					return;
				}

				if (!(this.validType in this.validationTypes) ) {
					console.error('no such validation type in component')
					return;
				}

				if (this.validationTypes[this.validType].test(this.value)) {
					this.errors = false
				}	
					else { 
						this.errors = true
					}
				this.checkErrors(e);		

				
			},
			checkErrors(e) {
				this.$emit('input',{errors: this.errors, value: this.value, });
			}

		},
		created() {
			if (this.startValue != '') {
				this.value = this.startValue;
			}
		}
	}
</script>

<style scoped>
	.box {
		position: relative;
	}

	.valid-indicator {
		position: absolute;
		top:50%;
		right:1%;
		transform: translate(-50%, -50%);
		font-size: 26px;
	}	
</style>