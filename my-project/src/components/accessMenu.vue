<template>
  <div class="hello">
   <vue-p5
      @setup="setup" 
      @draw="draw"
      v-if="windowSize>741"></vue-p5>
      <router-view></router-view>
  </div>
</template>

<script>
    var xspacing = 1
    var w
    var theta = 0.0
    var amplitude = window.innerHeight/30;
    var amplitudeSpace=1
    var period = window.innerWidth/2.5
    var dx
    var yvalues=10
    var bg
    var spaceBall=50;
    var balls=[]
    var waveHeight=window.innerHeight/8*7
    var waveRaising="0"
    var directionBoolean=0

import VueP5 from 'vue-p5'

class Ball {
  constructor(sk,numberBall) {
      this.sk=sk
      this.numberBall = numberBall
      this.cordinate=sk.createVector(sk.width/spaceBall*numberBall,sk.random(0+spaceBall,sk.height))
      this.speedDirection={x:0,y:1}
      this.size=sk.random(1,10)
      this.color=Math.floor(sk.random(25,100))
  }
  updateCordinate(x,y) {
      this.cordinate.x+=Math.floor(x);
      this.cordinate.y+=Math.floor(y);
      if(this.cordinate.y<=0) {
          this.cordinate.y=this.sk.height
      }
      if(this.cordinate.x<=0) {
          this.cordinate.x=this.sk.width
      }
      if(this.cordinate.x>=this.sk.width+1) {
          this.cordinate.x=0
      }
  }
  showBall(){
      this.sk.stroke(this.color)
      this.sk.strokeWeight(this.size)
      this.sk.point(this.cordinate.x,this.cordinate.y)
  }
}

export default {
  data () {
    return {
      store:this.$store,
      windowSize: window.innerWidth
    }
  },
  components: {
      'vue-p5': VueP5
  },
  methods:{
    setup(sk){
      sk.createCanvas(sk.displayWidth,sk.displayHeight);
      bg = sk.loadImage("https://localhost:8808/public/img/img.jpg")
      dx = (sk.TWO_PI / period) * xspacing
      yvalues = new Array(sk.floor(sk.width/xspacing))
        for(var c= 0;c<spaceBall;c++){
          balls.push(new Ball(sk,c))
        }
          sk.frameRate(100)
    },
    draw(sk) {
      sk.background(bg);
      if(amplitude>=sk.height/30 && amplitudeSpace==1) amplitudeSpace= -1
      else if(amplitude<-sk.height/30 && amplitudeSpace==-1) amplitudeSpace=1
      amplitude+=amplitudeSpace
      this.calcWave(sk)
      this.renderWave(sk)
      if(sk.mouseX>sk.pmouseX){
          directionBoolean=3
      }else if(sk.mouseX<sk.pmouseX) {
          directionBoolean=-3
      }
      for(var c= 0;c<spaceBall;c++){
          balls[c].updateCordinate(directionBoolean,-1)
          balls[c].showBall()
      }
      if(waveRaising==1){
          waveHeight-=30
      }
      waveRaising=this.store.state.waveRaising
      this.windowSize=window.innerWidth
    },
    calcWave(sk){
      theta += 0.02
      var x = theta
      for (var i = 0; i < yvalues.length; i++) {
        yvalues[i] = sk.sin(x)*amplitude;
        x+=dx;
      }
    },
    renderWave(sk){
      sk.fill(sk.color(48,50,55));
      sk.strokeWeight(0)
      sk.beginShape()
      for (var x = 0; x < yvalues.length; x++) {
        sk.vertex(x*xspacing+1,waveHeight+yvalues[x])
      }
      sk.vertex(sk.width+10, sk.height);
      sk.vertex(0, sk.height);
      sk.endShape(sk.CLOSE);
      sk.endShape()
      sk.noFill()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
 ::-webkit-scrollbar {
  width: 10px;
  background:transparent;
}
/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.3); 
  border-radius: 10px;
}
  canvas{
    width:100%;
    height:100%;
    position:fixed;
    left:0px;
    top:0px;
    z-index:0;
  }
  body{
    background-image:url("https://localhost:8808/public/img/img.jpg");
    background-size:cover;
    text-align:center;
  }
</style>
