<template>
    <div id="profile">
        <h4 v-if="errorB" id="errorT">No such file...!</h4>
        <div v-for='(file,index) in files' class="imgDiv">
            <div>
                <div class="imgTitle">
                    <h6>{{file.name}}</h6>
                    <h6>
                        <a :href="'https://localhost:8808/usersFiles/'+id+'/'+file.address" download>
                            <i class="fa fa-cloud-download" style="font-size:50px"></i>
                        </a>
                    </h6>
                </div>
                <img :src="'https://localhost:8808/usersFiles/'+id+'/'+file.address">
            </div>
        </div>
    </div>
</template>
<script>
const axios = require('axios')
axios.defaults.withCredentials = true
    export default{
        data(){
            return {
                msg:"okok",
                files: [],
                id: "",
                errorB: false
            }
        },
        mounted(){
            var vueThis = this
            async function go() {
                try {
                    const wes = await axios('https://localhost:8808/userData');
                    vueThis.files = wes.data.result
                    vueThis.id = wes.data.id
                    if(wes.data.result[0]==undefined){
                        vueThis.errorB = true
                    }
                    console.log(wes)
                }catch (e) {
                    console.error(e); 
                }
            }
            go()
        }
    }    
</script>
<style>
    body{
        text-align: center;
    }
    #profile{
        float: left;
    }
    #profile .imgDiv{
        width:25%;
        display: inline-block;
        text-align: center;
        margin:4%;
        transition:all 1s;
    }
    #profile .imgDiv img{
        width:100%;
        transition:all 0.5s;
    }
    #profile .imgDiv .imgTitle{
        width:100%;
        position: absolute;
        margin-top:20px;
        display:none;
    }
    #profile .imgDiv .imgTitle{
        text-align: center
    }
    #profile .imgDiv div{
        display:block;
    }
    #profile .imgDiv:hover .imgTitle{
        display:block;
        color:#fff;
        z-index:1000;
        font-size:200%;
        font-family: 'Kirang Haerang', cursive;
    }
    #profile .imgDiv:hover img{
        filter:blur(3px)
    }
    #profile .imgDiv:hover{
        transform:scale(1.4);
        z-index:1000
    }
    #profile #errorT{
        width:100%;
        margin-left:20vw;
        text-align:center;
    }
</style>