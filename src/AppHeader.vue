<template>
	<div class="container">
		<nav class="navbar navbar-expand-lg navbar-light bg-light">
		  <a class="navbar-brand" href="#">Инженерная служба</a>
		  <button class="navbar-toggler" type="button" data-toggle="collapse"
		  	@click='navBarShow = !navBarShow'
		  >
		    <span class="navbar-toggler-icon"></span>
		  </button>
		  <div class="collapse navbar-collapse" :class='menuClass'>
		    <ul class="navbar-nav">
				  <router-link v-for='(item,index) in links'
				  :key='item.name'
				  :to='item.url'
				  tag='li'
				  class='nav-item'
				  active-class='active'
				  >
				  	<a class='nav-link'> {{item.name}}</a>
				  </router-link>
		    </ul>
		  </div>
		</nav>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				isActive: true,
				error: true,
				navBarShow: false,
				links: [
					{
						name: 'Текущие',
						url: '/current'

					},
					{
						name: 'Архив',
						url: '/archive'

					},
										{
						name: 'Test',
						url: '/no'

					}

				]

			}
		},
		computed: {
			menuClass() {
				if (this.navBarShow) {
					return 'show'
				}
			}
		},
		methods: {

		}
	}
	
</script>

<style scoped>
	.container {
		position: relative;
		padding-top: 80px;

	}
	.navbar {
		position: absolute;
		width:100%;
		top:0;
		left:0;
		z-index: 10;
		background-color: inherit;
	}

	.navbar-collapse {
/*		background-color: inherit;
		z-index: 10;*/
	}

</style>