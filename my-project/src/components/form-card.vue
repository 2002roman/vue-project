<template>
    <div>
        <div id="form-card">
           <div id="card-text">
                <h3 id="card-title">{{formCardOption.cardTitle}}</h3><br>
                <h6>{{errorText}}</h6>
            </div>
            <div id="card-func">
                    <form v-on:submit.prevent="formComplite()">
                    <div class="input-field col s6" v-for="(inputOption,index) in formCardOption.formOption">
                        <input :id="inputOption.name" :type="inputOption.type" v-model="formCardOption.formModels[index]['model']" class="validate" autocomplete="off" required>
                        <label :for="inputOption.name">{{inputOption.label}}</label>
                    </div>
                    <input type="submit" :value="formCardOption.sendButtonValue"><br/>
                    <h6 id="card-end">{{formCardOption.cardEndText}} 
                    <router-link :to="{ name: formCardOption.redirectParams.link }">{{formCardOption.redirectParams.name}}</router-link></h6>
                    </form>
                    <button id="fcButton">
                        <i class="fa fa fa-facebook" style="font-size:24px;">
                            <a href="https://localhost:8808/facebook">Connect with Facebook</a>
                        </i>
                    </button>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios')
axios.defaults.withCredentials = true
    var vueThis
    export default{
        data(){
            return {
                formCardOption: this.$store.state[this.$route.name+"Option"],
                store: this.$store,
                files: "",
                errorText: ""
            }
        },
        methods:{
            formComplite(){
                vueThis=this
                axios.post('https://localhost:8808/'+this.$route.name,this.formCardOption.formModels).then(function (response) {
                    console.log(response)
                    if(response.data==true){
                        vueThis.$store.commit('waveRaising',"1")
                        setTimeout(function(){
                            vueThis.$router.push('/user/profile')
                        },5000)
                    }else{
                        vueThis.formCardOption.formModels[0].model=""
                        vueThis.formCardOption.formModels[1].model=""
                        vueThis.errorText = vueThis.$store.state[vueThis.$route.name+"ErrorT"]
                    }
                })
            }
        },
        beforeCreate(){
           var vueThis = this
            axios("https://localhost:8808/verify").then(function(res){
                if(res.data==true){
                    vueThis.$router.push('/user/profile')
                    console.log("")
                }
            })
        }
    } 
</script>

<style scoped>
        #form-card{
            text-align:center;
            background:#36393F;
            box-shadow:0px 0px 20px;
            border-radius:10px;
            color:gray;
            overflow-x:hidden;
        }
        #form-card #fcButton a{
            color:#fff;
            font-size:75%;
            padding-left:30px;
            padding-right:30px;
        }
        #form-card input{
            width:100%;
            height:50px;
            outline: none;
            color:#fff;
            background:transparent
        }
        #form-card .input-field{
            width:60%;
            margin-left:20%;
            margin-bottom:20px;
        }
        #form-card #card-title{
            color:#fff;
        }
        #form-card input[type=submit]{
            background:#26A69A;
            border:none;
            width:60%;
            border-radius:10px;
        }
        #form-card input[type=submit]:hover{
            background:#00897b;
        }
        #form-card label{
            display: inline-block;
        }
        #form-card #fcButton{
            background: #3B5996;
            color: #fff;
            outline: none;
            border: none;
            width:60%;
            margin-bottom:20px;
            padding-left:20px;
            padding-right:20px;
            padding-top:10px;
            padding-bottom:10px;
            line-height:100vw;
        }
         @media only screen and (min-width: 641px) {
            #form-card {
                position:absolute;
                left:30%;
                top:20%;
                min-height:400px;
                max-height:60%;
                width:40%;        
            }
        }
        @media only screen and (max-width: 641px) {
            #form-card {
                position:static;
                min-height:100%;
                width:100%;
                text-align:center;
                background:#36393F;
                border-radius:10px;
                color:gray;   
                padding: 20px;
            }
            body{
                margin:0px;
                padding:0px;
            }
            #card-text{
                margin:20px
            }
        }  
</style>
