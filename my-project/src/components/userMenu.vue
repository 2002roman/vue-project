<template>
    <div><br>
        <router-link :to="{name:'profile'}">        
            <button class="buttonR">Profile</button>
        </router-link>
        <router-link :to="{name:'upload'}">        
            <button class="buttonR">Upload</button>
        </router-link>
        <button class="buttonR" @click="logOut">Log Out</button>
        <br><br>
        <router-view></router-view>
    </div>    
</template>
<script>
const axios = require("axios")
axios.defaults.withCredentials = true
export default {
    data(){
        return{
        }
    },
    beforeCreate() {
        var vueThis = this
        axios.get("https://localhost:8808/verify").then(res=>{
            if(res.data==false){
                vueThis.$router.push('/access/login')
            }
        })
    },
    methods:{
        logOut(){
            var vueThis = this
            axios.get("https://localhost:8808/logout").then(res=>{
                if(res.data==true) vueThis.$router.push('/access/login')
            })
        }
    }
}
</script>
<style>
    .buttonR{
        outline:none;
        background:#fff;
        color:rgb(14, 201, 248);
        border:1px solid rgb(14, 201, 248);
        transition:all .5s;
        margin:20px;
        padding-left:20px;
        padding-right:20px;
        padding-top:10px;
        padding-bottom:10px;
    }
    .buttonR:hover{
        background:rgb(14, 201, 248);
        color:#fff;
    }
    ::-webkit-scrollbar {
        width: 8px;
        height: 8px;
        background:transparent;
    }
    ::-webkit-scrollbar-track {
         box-shadow: inset 0 0 5px grey; 
        border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
        background: rgba(0,0,0,0.3); 
        border-radius: 5px;
    }
    body{
        background:#fff;
    }
</style>
