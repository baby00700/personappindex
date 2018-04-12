<template>
  <div class="login">
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
            <mu-text-field label="用户名" labelFloat v-model="username"/>
          </div>
          <div class="passwd">
            <mu-text-field label="密码"  type="password" labelFloat v-model="userpasswd"/>
          </div>
          <div class="loginsub">
            <div class="loginbottons">
              <mu-flat-button label="创建账号" class="loginbottonc" primary @click="gojoinin()"/>
              <mu-raised-button label="登入" class="loginbottonl"  primary @click="loginin()"/>
            </div>
          </div>
        </div>
        <div class="userinfo" v-if="!isinputshow">
          <div class="loginsub">
            <div class="loginbottons">
              <mu-raised-button label="登出" class="loginbottono"  primary @click="loginout()"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <mu-dialog :open="dialog" title="">
      {{msg}}
      <mu-flat-button label="确定" slot="actions" primary @click="close"/>
    </mu-dialog>
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
      isinputshow: true,
      dialog: false
    }
  },
  mounted () {
    this.checklogin()
  },
  methods: {
    loginin () {
      var that = this
      var url = config.hostname + 'loginin'
      if (that.username === '' || that.userpasswd === '') {
        that.dialog = true
        that.msg = '用户名或密码不能为空！'
      } else {
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
            that.dialog = true
            that.msg = data.data.msg
            that.username = ''
            that.userpasswd = ''
            that.email = ''
            that.luckyname = ''
          }
        })
      }
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
    },
    close () {
      this.dialog = false
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
  color:#7E57C2;
  font-size:16px;
  font-weight:600;
  position:absolute;
  top:80%;
  text-align: center;
  text-shadow: 2px 2px 20px rgba(0,0,0,0.3);
}
  .mid{
    width: 100%;
    height:75%;
    position:absolute;
    bottom:0px;
    transition: all 0.8s;
    /*text-align: left;*/
  }
  .username, .passwd{
    width:80%;
    /*text-align: left;*/
    margin-left:10%;
  }
  .loginsub{
    width:80%;
    /*text-align: left;*/
    margin-left:10%;
    margin-top:15px;
  }
.loginbottons{
  width:256px;
  height:36px;
  /*background-color:red;*/
  margin-left: calc(50% - 128px);
}
.loginbottonc{
  float: left;
}
 .loginbottonl{
    float: right;
  }
  .loginbottono{
    width:256px;
  }
</style>
