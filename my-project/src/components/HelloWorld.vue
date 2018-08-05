<template>
  <div class="hello">
    <input type="text" v-model="username"><br>
    <input type="text" v-model="pass"><br>
    <input type="submit" v-on:click="setUser"><br>
    <p>{{username}} {{pass}}</p>
    <router-link :to="{ name: 'hi' }">Home</router-link>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
const axios = require('axios')

export default {
  name:'HelloWorld',
  data () {
    return {
      username:"ok",
      pass:"okok"
    }
  },
  methods:{
    setUser:function() {
      console.log("ok")
      axios.post('https://127.0.0.1:9090/ok', {firstName: this.username,lastName: this.pass}).then(function (response) {
        console.log(response)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
