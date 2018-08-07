<template>
    <div id="upload">
        <div
        @drop="divDrop($event)"
        @dragover="divDragover($event)"
        @dragleave="divDragleave($event)"
        :class="[{'dragover': classBoolean},'dropzone']"
        >{{loadingT}}
        </div>
        <br>
        <button id="uploadButton" @click="uploadFiles">{{uploadBtnT}}</button>
        <br>
        <div id="images">
            <div class='imgDiv' v-for="(file,index) in filesRes">
                        <img :src="file.fileAddress">
                        <i class='fa fa-remove removeB' @click="removeImage(index)"></i><br>
                        <h6>{{file.fileName}}</h6>
                </div>
        </div>
    </div>    
</template>

<script>
const axios = require('axios')
axios.defaults.withCredentials = true
var reader = []
var filesRes = []
var progressNode = document.getElementById("my-progress");


export default {
    data(){
        return{
            classBoolean: false,
            filesRes: [],
            loadingT: "Drop file!",
            uploadBtnT: "Upload image"
        }
    },
    methods:{
        divDrop(e){
            var vueThis = this
            e.preventDefault()
            this.classBoolean = false
            var files = e.dataTransfer.files
            for(let i = 0;i < files.length;i++){
                if(files[i].type.split('/')[0]=="image"){
                    var obj = {}
                    reader[i] = new FileReader()
                    reader[i].readAsDataURL(files[i])
                    if(i==0){
                        vueThis.loadingT = "Readed..."
                    }
                    reader[i].onloadend = function () {
                        filesRes[i] = {fileName:files[i].name,fileAddress:this.result}
                        vueThis.filesRes.push({fileName:files[i].name,fileAddress:this.result})
                        if(i==(files.length-1)){
                            vueThis.loadingT = "Drop file!"                      
                        }
                    }
                }
            }
        },
        divDragover(e){
            e.preventDefault();
            this.classBoolean = true
        },
        divDragleave(e){
            this.classBoolean = false
        },
        uploadFiles(e){
            var vueThis = this
            this.uploadBtnT = "Uploaded..."
            async function go() {
                try {
                    const response = await axios.post('https://localhost:8808/upload',{files:filesRes})
                    if(response.data==true){
                        filesRes = []
                        vueThis.filesRes = []
                        vueThis.uploadBtnT = "Upload successful"
                        setTimeout(function(){
                            vueThis.uploadBtnT = "Upload image"
                        },1500)
                    }
                }catch (err) {
                    console.log(err)
                }
            }
            if(filesRes[0]) go()
            else alert("Not file for uploading...!")
        },
        removeImage(index){
            this.filesRes.splice(index, 1)
            filesRes.splice(index, 1)
        }
    }
}
  </script>

<style>
    body{
        text-align: center;
    }
    #upload .dropzone{
        width:300px;
        height: 300px;
        border:2px dashed rgb(14, 201, 248);
        color:rgb(14, 201, 248);
        line-height: 300px;
        text-align: center;
        display: inline-block;
        transition: all 0.5s;
    }
    #upload #images img{
        width:150px;
    }
    #upload #images h6{
        font-size:12px;
        text-overflow: ellipsis;
        width:100%;
        overflow: hidden;
    }
    #upload #images{
        margin:20px;
        float:left;
        overflow-y:hidden;
        overflow-x:scroll;
        white-space: nowrap;
        max-width: 100%; 
        height:200px;
    }
    #upload #images .imgDiv{
        width:150px;
        display:inline-block;
        margin:20px;
    }
    #upload .dragover{
        color:rgb(14, 201, 248);
        border:2px solid rgb(14, 201, 248);
        font-size: 200%;
    }
    #upload #uploadButton{
        margin-top:20px;
        padding:5px;
        background:white;
        border:1px solid rgb(14, 201, 248);
        color:rgb(14, 201, 248);
        outline: none;
        padding-left:20px;
        padding-right:20px;
        transition:all 0.5s; 
    }
    #upload #uploadButton:hover{
        background:rgb(14, 201, 248);
        border: 1px solid rgb(14, 201, 248);
        color:#fff;
    }
    #upload .removeB{
        display:none;
    }
    #upload .imgDiv:hover .removeB{
        display:inline-block
    }
</style>
