<template>
    <div id="profile">
        <h4 id="errorT" v-if="files[0]==undefined">No such file...!</h4>
        <div v-for='(file,index) in files' class="imgDiv">
            <div>
                <div class="imgTitle">
                    <h6>{{file.name}}</h6>
                    <h6>
                        <a :href="'https://localhost:8808/usersFiles/'+id+'/'+file.address" download="image.jpeg">
                            <i class="fa fa-cloud-download" style="font-size:50px"></i>
                        </a>
                        <i class="fa fa-trash-o" style="font-size:50px" @click="removeImageC(file.address,index)"></i>
                    </h6>
                </div>
                <img :src="'https://localhost:8808/usersFiles/'+id+'/'+file.address">
            </div>
        </div><br>
        <button class="buttonR" @click="moreImages">More</button>
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
                id: ""            }
        },
        mounted(){
            var vueThis = this
            async function go() {
                try {
                    const wes = await axios('https://localhost:8808/userData/0')
                    vueThis.files = wes.data.result
                    vueThis.id = wes.data.id
                }catch (e) {
                    console.error(e); 
                }
            }
            go()
        },
        methods:{
            removeImageC(fileAddress,index){
                var vueThis = this
                axios.delete('https://localhost:8808/removeImage/'+fileAddress).then(function(res){
                    document.getElementsByClassName("imgDiv")[index].className+=" deleteAnimate"
                    setTimeout(function (){
                        vueThis.files.splice(index, 1)
                    },900)
                })
            },
            moreImages(){
                var vueThis = this
                axios('https://localhost:8808/userData/'+vueThis.files.length).then((res)=>{
                    vueThis.files = vueThis.files.concat(res.data.result)
                    console.log(vueThis.files)
                })
            }
        }
    }    
</script>
<style>
    body{
        text-align: center;
    }
    #profile{
        float: left;
        overflow-x:hidden;
        width:100%;
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
        text-overflow: ellipsis;
        overflow: hidden;
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
        font-family: 'Kirang Haerang';
    }
    #profile .imgDiv:hover img{
        filter:blur(1px)
    }
    #profile .imgDiv:hover{
        transform:scale(1.2);
        z-index:1000
    }
    #profile #errorT{
        width:100%;
    }
    #profile .deleteAnimate{
        width:0;
        height: 0;
    }
</style>