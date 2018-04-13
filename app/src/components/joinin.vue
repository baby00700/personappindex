<template>
  <div class="joinin">
    <div class="wrap">
      <div class="top">
      </div>
      <div class="mid">
        <div class="username">
          <mu-text-field hintText="用户名" class="tef"  v-model="username"/>
        </div>
        <div class="passwd">
          <mu-text-field hintText="密码" class="tef"  v-model="userpasswd"/>
        </div>
        <div class="email">
          <mu-text-field hintText="邮箱" class="tef"  v-model="email"/>
        </div>
        <div class="loginsub">
          <div class="loginbottons">
            <mu-flat-button label="已有账号" class="loginbottonc" primary @click="gologin()"/>
            <mu-raised-button label="注册" class="loginbottonl"  primary @click="joinin()"/>
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
  name: 'joinin',
  data () {
    return {
      msg: 'joinin',
      deg: 0,
      username: '',
      userpasswd: '',
      email: '',
      dialog: false
    }
  },
  mounted () {
  },
  methods: {
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
          that.msg = '注册成功'
          alert('注册成功')
          that.dialog = true
          that.username = ''
          that.userpasswd = ''
          that.email = ''
          that.$router.replace('/')
        } else {
          that.msg = data.data.msg
          that.dialog = true
          that.username = ''
          that.userpasswd = ''
          that.email = ''
        }
      })
    },
    gozhuye () {
      this.$router.replace('/')
    },
    gologin () {
      this.$router.replace('/loginin')
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
  }
  .mid{
    width: 100%;
    height:70%;
    position:absolute;
    bottom:0px;
    /*background-color:red;*/
  }
  .username, .passwd, .email{
    width:80%;
    margin-left:10%;
    text-align: left;
    /*background-color:green;*/
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
  .tef{
    width:256px;
    height:32px;
    margin-left:calc(50% - 128px);
  }

</style>
