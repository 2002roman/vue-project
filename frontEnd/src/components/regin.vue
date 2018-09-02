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
              cardTitle: "Reg In",
              cardEndText: "Already registered?",
              formOption: [
                  {
                      name: "username",
                      type: "text",
                      label: "Username"
                  },
                  {
                      name: "password",
                      type: "password",
                      label: "Password"
                  },
                   {
                      name: "name",
                      type: "text",
                      label: "Name Lastname"
                  }
              ],
              sendButtonValue: "Reg In",
              redirectParams: {
                  name: "Log In",
                  link: "login"
              },
              formModels:[
                  {
                      name:"username",
                      model:""
                  },
                  {
                      name:"password",
                      model:""
                  },
                  {
                      name:"name",
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
        this.$store.commit('regInOption',this.formCardOption)
    }
  }
</script>

<style scoped>
  
</style>
