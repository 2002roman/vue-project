<template>
    <div><br>
        <router-link :to="{name:'profile'}">        
            <button class="buttonR">Profile</button>
        </router-link>
        <router-link :to="{name:'upload'}">        
            <button class="buttonR">Upload</button>
        </router-link>
        <br><br>
        <router-view></router-view>
    </div>    
</template>
<script>
export default {
    data(){
        return{
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
</style>
