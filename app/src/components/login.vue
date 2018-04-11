<template>
  <div class="login" v-bind:style="{background:'-webkit-linear-gradient(' + deg + 'deg, #91486F, #75AFDD'}">
    <div class="wrap">
      <div class="top" id="top">
        <transition  name="custom-classes-transition"
                     mode="in-out"
                     enter-active-class="animated fadeIn">
        <div class="userinfo" v-if="!isinputshow">
          <div class="ckusername">
            {{luckyname}}
          </div>
        </div>
        </transition>
      </div>
      <div class="mid" id="mid">
        <div v-if="isinputshow">
          <div class="username">
            <input type="text" class="inputs" v-model="username" placeholder="用户名">
          </div>
          <div class="passwd">
            <input type="text" class="inputs" v-model="userpasswd" placeholder="密码">
          </div>
          <div class="bottonsl" @click="loginin()">
            登录
          </div>
          <div class="bottoms">
            <div class="goback" @click="gozhuye()">返回主页&nbsp;&nbsp;&nbsp;&nbsp;|</div>
            <div class="loginin" @click="gojoinin()">&nbsp;&nbsp;&nbsp;&nbsp;注册账号</div>
          </div>
        </div>
        <div class="userinfo" v-if="!isinputshow">
          <div class="bottonsl loginoutbotton" @click="loginout()">
            登出
          </div>
          <div class="bottonsl loginoutbotton" @click="gozhuye">
            返回主页
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const config = require('../vueconfig.js')
const qs = require('qs')
axios.defaults.withCredentials = true
export default {
  name: 'login',
  data () {
    return {
      msg: 'login',
      deg: 0,
      username: '',
      luckyname: '',
      userpasswd: '',
      email: '',
      isinputshow: true
    }
  },
  mounted () {
    this.setdeg()
    this.checklogin()
  },
  methods: {
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
    loginin () {
      var that = this
      var url = config.hostname + 'loginin'
      axios.post(url, qs.stringify({username: that.username, userpasswd: that.userpasswd})).then(function (data) {
        console.log(data)
        if (data.data.success === true) {
          that.username = ''
          that.userpasswd = ''
          that.email = ''
          that.luckyname = data.data.obj[0].luckyname
          that.isinputshow = false
          var topele = document.getElementById('top')
          var midele = document.getElementById('mid')
          topele.style.height = '50%'
          midele.style.height = '50%'
        } else {
          alert(data.data.msg)
          that.username = ''
          that.userpasswd = ''
          that.email = ''
          that.luckyname = ''
        }
      })
    },
    checklogin () {
      var that = this
      var url = config.hostname + 'loginin'
      axios.post(url, qs.stringify({username: '', userpasswd: ''})).then(function (data) {
        console.log(data)
        if (data.data.success === true) {
          that.username = ''
          that.userpasswd = ''
          that.email = ''
          that.luckyname = data.data.obj.userid[0].luckyname
          that.isinputshow = false
          var topele = document.getElementById('top')
          var midele = document.getElementById('mid')
          topele.style.height = '50%'
          midele.style.height = '50%'
        } else {
          that.isinputshow = true
          that.username = ''
          that.userpasswd = ''
          that.email = ''
        }
      })
    },
    gozhuye () {
      this.$router.replace('/')
    },
    gojoinin () {
      this.$router.replace('/joinin')
    },
    loginout () {
      var that = this
      var url = config.hostname + 'loginout'
      axios.post(url).then(function (data) {
        console.log(data)
        if (data.data.success === true) {
          that.isinputshow = true
          var topele = document.getElementById('top')
          var midele = document.getElementById('mid')
          topele.style.height = '30%'
          midele.style.height = '70%'
        } else {
          alert(data.data.msg)
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.wrap{
  width:100%;
  height:100%;
  position:relative;
  background-color:rgba(255,255,255,0.1);
}
  .top{
    width:100%;
    height:30%;
    position:absolute;
    background-image:url(../assets/img/weizhi.png);
    background-size:100px 100px;
    background-position: center;
    background-repeat: no-repeat;
    transition: all 0.8s;
  }

.ckusername{
  width:100%;
  height:10%;
  line-height: 100%;
  color:#fff;
  font-size:16px;
  font-weight:600;
  position:absolute;
  top:70%;
  text-align: center;
  text-shadow: 2px 2px 10px rgba(0,0,0,0.7);
}
  .mid{
    width: 100%;
    height:70%;
    position:absolute;
    bottom:0px;
    transition: all 0.8s;
  }
  .username, .passwd, .email{
    width:80%;
    height:40px;
    background-color:rgba(255,255,255,0.5);
    margin-top:10px;
    margin-left:10%;
    border-radius:5px;
    overflow: hidden;
    -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
  }
  .inputs{
    width:100%;
    height:100%;
    border:0;
    background-color:rgba(0,0,0,0);
  }
.bottonsl{
  width:80%;
  height:40px;
  background-color:rgba(255,255,255,0.5);
  margin-top:10px;
  margin-left:10%;
  border-radius:5px;
  overflow: hidden;
  font-size:14px;
  color:#000;
  line-height:40px;
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
}
  .bottonsl:active{
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.3);
    background-color:rgba(255,255,255,1);
  }

  .loginoutbotton{
    margin-top:10px !important;
  }
  .bottoms{
    width:100%;
    height:40px;
    text-shadow: 2px 2px 6px rgba(0,0,0,0.3);
    margin-top:30px;
    font-size:14px;
    line-height:40px;
    color:#eee;
    /*background-color:rgba(255,255,255,1);*/
  }
  .goback, .loginin{
    width:50%;
    height:40px;
    float:left;
  }
.goback{
   text-align: right;
 }
.goback:active{
  text-align: right;
  color:#42b983;
}
.loginin{
  text-align: left;
}
</style>
