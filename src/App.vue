<template>
  <div id="app">

    <AppHeader></AppHeader>

    <router-view>
        <toDoList></toDoList>
    </router-view>

    <transition enter-active-class='animated faster fadeIn'
        leave-active-class='animated faster fadeOut'
    >
        <EditForm v-if='isEditing'
        ></EditForm>
    </transition>

        <transition  enter-active-class='animated faster fadeIn'
        leave-active-class='animated faster fadeOut'
        mode='in-out'
    >
        <AlertComponent
        :text='alertText'
        v-if='isShowAlert'
        >
            
        </AlertComponent>
    </transition>





  </div> <!--eof app -->
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
    isShowAlert() {
        return this.$store.state.alertShown;
    },
    alertText() {
        return this.$store.state.alertText;
    },
    isEditing() {
        return this.$store.state.isEditing;
    }
  }
}
</script>

<style>
#app {
  position: relative;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #eaf1f1;
  height: 100vh;
}

.btn {
    font-size: .9rem;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

/*li {
  display: inline-block;
  margin: 0 10px;
}*/

a {
  color: #42b983;
}



</style>
