<template>
  <div id="app">
    <mu-appbar title="Title">
      <mu-icon-button icon="menu" slot="left" @click="showmenu()"/>
      <mu-icon-button icon="help_outline" slot="right"/>
    </mu-appbar>
    <transition  name="custom-classes-transition"
                 enter-active-class="animated slideInLeft"
                 leave-active-class="animated slideOutLeft">
    <div class="menu" v-show="ismenushow">
      <div class="menuleft">
        <div class="menuleft-top">Login</div>
        <div class="menuleft-mid">
          <mobile-tear-sheet>
            <mu-list>
              <mu-list-item title="Home" @click="gohome()">
              </mu-list-item>
              <mu-list-item title="ToDos" @click="gotodos()">
              </mu-list-item>
              <mu-list-item title="Weather">
              </mu-list-item>
              <mu-list-item title="Others">
              </mu-list-item>
             <mu-list-item title="login" @click="gologin()">
              </mu-list-item>
            </mu-list>
            <mu-divider />
            <mu-list>
              <mu-list-item title="About">
              </mu-list-item>
            </mu-list>
          </mobile-tear-sheet>
        </div>
      </div>
    </div>
    </transition>
    <transition  name="custom-classes-transition"
                 enter-active-class="animated fadeIn"
                 leave-active-class="animated fadeOut">
      <div class="menuright" v-show="ismenushow" @click="hidemenu()">cc</div>
    </transition>
    <transition  name="custom-classes-transition"
                              enter-active-class="animated slideInUp"
                              leave-active-class="animated slideOutDown">
    <router-view class="child-view"/>
  </transition>
    <!--<transition  name="custom-classes-transition"-->
                 <!--enter-active-class="animated slideInDown"-->
                 <!--leave-active-class="animated slideOutUp">-->
      <!--<tqview @close='close()' v-if='istqshow' class="tqview"></tqview>-->
    <!--</transition>-->
    <!--<div class="wrap" v-bind:style="{background:'-webkit-linear-gradient(' + deg + 'deg, #8915C0, #0195D1'}">-->
      <!--<div class="listwrap">-->
        <!--<div class="funs f1" @click="gof1()"></div>-->
        <!--<div class="funs f2" @click="gof2()"></div>-->
        <!--<div class="funs f3" @click="gof3()"></div>-->
        <!--<div class="funs f4" @click="gof4()"></div>-->
      <!--</div>-->
      <!--<div class="bottons" @click='goshouye()'>返回首页</div>-->
    <!--</div>-->
    <!---->
  </div>
</template>

<script>
import axios from 'axios'
import tq from '@/components/tq'
const config = require('./vueconfig.js')
const qs = require('qs')
axios.defaults.withCredentials = true
export default {
  name: 'App',
  data () {
    return {
      msg: 122,
      deg: 0,
      istqshow: true,
      ismenushow: false
    }
  },
  mounted () {
    this.checklogin()
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault()
    })
  },
  methods: {
    checklogin () {
      var that = this
      var url = config.hostname + 'loginin'
      axios.post(url, qs.stringify({username: '', userpasswd: ''})).then(function (data) {
        console.log(data)
        if (data.data.success === true) {
          that.$router.replace('/')
        } else {
          that.$router.replace('/loginin')
        }
      })
    },
    showmenu () {
      this.ismenushow = true
    },
    hidemenu () {
      this.ismenushow = false
    },
    gohome () {
      this.$router.replace('/')
      this.hidemenu()
    },
    gologin () {
      this.$router.replace('/loginin')
      this.hidemenu()
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
    gotodos () {
      this.$router.push('/todo')
      this.ismenushow = false
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
    /*text-align: center;*/
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
  height:calc(100% - 56px);
  width:100%;
  position:fixed;
  top:56px;
  left:0px;
  z-index:2;
  overflow:hidden;
  background-color:#fff;
}

.menu{
  width:55%;
  height:100%;
  overflow: hidden;
  position:fixed;
  top:0px;
  left:0px;
  z-index:100;
}
.menuleft{
  width:100%;
  height:100%;
  background-color:#fff;
  position: absolute;
  top:0px;
  left:0px;
  -webkit-box-shadow: 0px 3px 20px 1px rgba(0,0,0,0.3);
}
.menuright{
  width:100%;
  height:100%;
  background-color:rgba(0,0,0,0.4);
  position: absolute;
  top:0px;
  left:0px;
  z-index:9;
}
.menuleft-top{
  width:100%;
  height:56px;
  background-color:#7E57C2;
  color:#fff;
  font-size:22px;
  line-height: 56px;
}
.menuleft-mid{
  width:100%;
  height:calc(100% - 56px);
  overflow: scroll;
}
</style>
