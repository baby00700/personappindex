<template>
  <div id="app">
    <transition  name="custom-classes-transition"
                 enter-active-class="animated slideInUp"
                 leave-active-class="animated slideOutDown">
      <router-view class="child-view"/>
    </transition>
    <transition  name="custom-classes-transition"
                 enter-active-class="animated slideInDown"
                 leave-active-class="animated slideOutUp">
      <tqview @close='close()' v-if='istqshow' class="tqview"></tqview>
    </transition>
    <div class="wrap" v-bind:style="{background:'-webkit-linear-gradient(' + deg + 'deg, #8915C0, #0195D1'}">
      <div class="listwrap">
        <div class="funs f1" @click="gof1()"></div>
        <div class="funs f2" @click="gof2()"></div>
        <div class="funs f3" @click="gof3()"></div>
        <div class="funs f4" @click="gof4()"></div>
      </div>
      <div class="bottons" @click='goshouye()'>返回首页</div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios'
import tq from '@/components/tq'
// const qs = require('qs')
export default {
  name: 'App',
  data () {
    return {
      msg: 122,
      deg: 0,
      istqshow: true
    }
  },
  mounted () {
    console.log('tianqi mounted !')
    this.setdeg()
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })
  },
  methods: {
    close () {
      this.istqshow = false
    },
    goshouye () {
      this.istqshow = true
    },
    setdeg () {
      // console.log(this.deg)
      var that = this
      if (this.deg === 0) {
        this.route = 1
        that.deg++
        that.setdeg()
      } else if (this.deg > 0 && this.deg <= 360) {
        if (this.route === 1) {
          setTimeout(function () {
            that.deg++
            that.setdeg()
          }, 20)
        } else {
          setTimeout(function () {
            that.deg--
            that.setdeg()
          }, 20)
        }
      } else if (this.deg >= 360) {
        this.route = 2
        if (this.route === 2) {
          setTimeout(function () {
            that.deg--
            that.setdeg()
          }, 20)
        }
      }
    },
    gof1 () {
      this.$router.push('/todo')
    },
    gof2 () {},
    gof3 () {},
    gof4 () {
      this.$router.push('/loginin')
    }
  },
  components: {
    tqview: tq
  }
}
</script>

<style >
  @import '../static/css/animate.css';
  *{
    text-align: center;
  }
</style>

<style>
body, html{
  width:100%;
  height:100%;
}
*{
  margin:0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #fff;
  height:100%;
  /* -webkit-touch-callout: none; */
}

.child-view{
  height:100%;
  width:100%;
  position:absolute;
  top:0px;
  left:0px;
  z-index:21;
  overflow:scroll;
  background-color:#fff;
}

.tqview{
   width:100%;
   height:100%;
   z-index:10;
}
.wrap{
  width:100%;
  height:100%;
  position: fixed;
  top:0px;
  left:0px;
}
.bottons{
  width:100%;
  height:50px;
  background-color:rgba(255,255,255,0.3);
  position: fixed;
  bottom:0px;
  left:0px;
  z-index:8;
  color:#fff;
  font-size:14px;
  line-height:50px;
  text-shadow: 2px 2px 50px rgba(0,0,0,0.6);
  -webkit-box-shadow:0px 1px 20px 1px rgba(0,0,0,0.3);
}
.listwrap{
  width:100%;
  height:calc(100% - 50px);
  padding-bottom:50px;
  position: absolute;
  top:10px;
  left:0px;
  overflow: scroll;
}
.funs{
  width:41%;
  margin-left:6%;
  margin-top:20px;
  height:100px;
  border-radius:6px;
  background-color:rgba(255,255,255,0.2);
  float:left;
  background-size:60px 60px;
  background-repeat: no-repeat;
  background-position: center;
  -webkit-box-shadow:0px 0px 30px 1px rgba(0,0,0,0.4);
}
.funs:active{
  width:41%;
  margin-left:6%;
  margin-top:20px;
  height:100px;
  border-radius:6px;
  background-color:rgba(255,255,255,0.3);
  float:left;
  -webkit-box-shadow:0px 0px 10px 1px rgba(0,0,0,0.5);
}
.f1{
  background-image: url(./assets/img/daiban.png);
}

.f2{
  background-image: url(./assets/img/tixing.png);
}

.f3{
  background-image: url(./assets/img/chaxun.png);
}

.f4{
  background-image: url(./assets/img/weizhi.png);
}
</style>
