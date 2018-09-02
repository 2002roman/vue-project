<template>
  <div id="form">
      <form-card></form-card>
  </div>
</template>

<script>
  import formCard from '@/components/form-card'
  export default{
    data(){
      return {
          formCardOption:{
              cardTitle: "Log In",
              cardEndText: "Want to sign up?",
              formOption: [
                  {
                      name: "username",
                      type: "email",
                      label: "Username"
                  },
                  {
                      name: "password",
                      type: "password",
                      label: "Password"
                  }
              ],
              sendButtonValue: "Log In",
              redirectParams: {
                  name: "Register",
                  link: "regin"
              },
              formModels:[
                  {
                      name:"username",
                      model:""
                  },
                  {
                      name:"password",
                      model:""
                  }
              ]
          }
      }
    },
    components:{
        formCard
    },
    created(){
        this.$store.commit('logInOption',this.formCardOption)
    }
  }
</script>

<style scoped>
  
</style>
