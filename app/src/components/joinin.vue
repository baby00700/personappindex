<template>
  <div class="joinin" v-bind:style="{background:'-webkit-linear-gradient(' + deg + 'deg, #91486F, #75AFDD'}">
    <div class="wrap">
      <div class="top">
      </div>
      <div class="mid">
        <div class="username">
          <input type="text" class="inputs" v-model="username" placeholder="用户名">
        </div>
        <div class="passwd">
          <input type="text" class="inputs" v-model="userpasswd" placeholder="密码">
        </div>
        <div class="email">
          <input type="text" class="inputs" v-model="email" placeholder="邮箱">
        </div>
        <div class="bottonsl" @click="joinin()">
          提交注册
        </div>
        <div class="bottoms">
          <div class="goback" @click="gozhuye()">返回主页&nbsp;&nbsp;&nbsp;&nbsp;|</div>
          <div class="loginin" >&nbsp;&nbsp;&nbsp;&nbsp;已有账号?</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const config = require('../vueconfig.js')
const qs = require('qs')
export default {
  name: 'joinin',
  data () {
    return {
      msg: 'joinin',
      deg: 0,
      username: '',
      userpasswd: '',
      email: ''
    }
  },
  mounted () {
    this.setdeg()
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
    joinin () {
      var that = this
      var year = new Date().getFullYear()
      var month = new Date().getMonth() + 1
      var date = new Date().getDate()
      var hour = new Date().getHours()
      var minutes = new Date().getMinutes()
      var sec = new Date().getSeconds()
      var datetime = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + sec
      var url = config.hostname + 'joinin'
      axios.post(url, qs.stringify({username: that.username, userpasswd: that.userpasswd, usermail: that.email, gendatetime: datetime})).then(function (data) {
        console.log(data)
        if (data.data.success === true) {
          alert('注册成功')
          that.username = ''
          that.userpasswd = ''
          that.email = ''
          that.$router.replace('/')
        } else {
          alert(data.data.msg)
          that.username = ''
          that.userpasswd = ''
          that.email = ''
        }
      })
    },
    gozhuye () {
      this.$router.replace('/')
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
  }
  .mid{
    width: 100%;
    height:70%;
    position:absolute;
    bottom:0px;
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
  background-color:rgba(255,255,255,0.8);
  margin-top:10px;
  margin-left:10%;
  border-radius:5px;
  overflow: hidden;
  font-size:14px;
  color:#555;
  line-height:40px;
  -webkit-box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
}
  .bottonsl:active{
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.3);
    background-color:rgba(255,255,255,1);
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
