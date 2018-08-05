<template>
  <div class="hello">
    <router-link :to="{ name: 'HelloWorld' }">Home</router-link>
  clash</div>
</template>

<script>

export default {
  name: 'hi',
  data () {
    return {
      msg: 'App',
      ret: 'okookok'
    }
  },
  computed: {
    txy () {
      return this.$store.state.txy
    }
  },
  mounted: function () {
    // const CancelToken = axios.CancelToken
    // const source = CancelToken.source()
    // axios.get('http://localhost:9090/ok',{cancelToken: source.token})
    // .then(function (response) {
    //   console.log(response)
    //   return response
    // })
    // .catch(function (error) {
    //   console.log(error)
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
