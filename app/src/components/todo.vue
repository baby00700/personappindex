<template>
  <div class="todo" v-bind:style="{background:'-webkit-linear-gradient(' + deg + 'deg, rgb(251,123,14), rgb(180,0,140)'}">
    <div class="top">
      <div class="additem" id="additem" @click="showadd($event)">
        <div class="inputitem" id="inputitem" v-show="isinputshow">
          <transition  name="custom-classes-transition"
                       enter-active-class="animated slideInRight"
                       leave-active-class="animated slideOutRight">
            <div class="close" v-show="iscloseshow" @click="closeadd($event)">+</div>
          </transition>
            <div class="inputarea">
              <textarea class="textarea" v-model="textvalue" placeholder="请输入..."></textarea>
            </div>
        </div>

          <div class="addbotton" v-show="isaddbottonshow">ADD TODO</div>
        <transition  name="custom-classes-transition"
                     mode="in-out"
                     leave-active-class="animated fadeOut">
          <div class="addbotton" v-show="!isaddbottonshow" @click="settodo($event)">ADD NOW</div>
        </transition>
      </div>
      <div class="tips" v-show="istipshow" @click="gologin()">{{tips}}</div>
      <div class="todolistwrap">
        <div class="card" v-for="(item, $index) in todolist" :key="item.id" @click="showmore($index)">
          <div class="line"><div class="con">{{item.updatetime}}</div></div>
          <div class="line" style="border-bottom:0"><div class="con">{{item.todo}}</div></div>
        </div>
      </div>
    </div>
    <div class="bottons" @click='goshouye()'>返回主页</div>
  </div>
</template>

<script>
import axios from 'axios'
const config = require('../vueconfig.js')
const qs = require('qs')
axios.defaults.withCredentials = true
export default {
  name: 'todo',
  data () {
    return {
      msg: 'todo',
      deg: 0,
      isinputshow: true,
      iscloseshow: false,
      isaddbottonshow: true,
      textvalue: '',
      tips: '查看更多历史内容，请点击登录',
      istipshow: true,
      todolist: []
    }
  },
  mounted () {
    this.setdeg()
    this.gettodo()
  },
  methods: {
    gologin () {
      this.$router.replace('/loginin')
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
    goshouye () {
      this.$router.push('/')
    },
    showadd (e) {
      var that = this
      that.isaddbottonshow = false
      var additemele = document.getElementById('additem')
      var inputitemele = document.getElementById('inputitem')
      additemele.style.height = '264px'
      that.iscloseshow = true
      setTimeout(function () {
        that.isinputshow = true
        console.log(inputitemele)
        inputitemele.style.height = '220px'
      }, 200)
    },
    closeadd (e) {
      var that = this
      that.isaddbottonshow = true
      var additemele = document.getElementById('additem')
      var inputitemele = document.getElementById('inputitem')
      console.log(inputitemele)
      inputitemele.style.height = '0px'
      that.iscloseshow = false
      e.stopPropagation()
      setTimeout(function () {
        additemele.style.height = '44px'
      }, 200)
    },
    settodo (ev) {
      ev.stopPropagation()
      var that = this
      var year = new Date().getFullYear()
      var month = new Date().getMonth() + 1
      var date = new Date().getDate()
      var hour = new Date().getHours()
      var minutes = new Date().getMinutes()
      var sec = new Date().getSeconds()
      var datetime = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + sec
      var url = config.hostname + 'settodo'
      if (that.textvalue === '') {
        alert('内容不能为空')
      } else {
        axios.post(url, qs.stringify({todo: that.textvalue, updatetime: datetime})).then(function (data) {
          if (data.data.success === true) {
            // animate
            that.isaddbottonshow = true
            var additemele = document.getElementById('additem')
            var inputitemele = document.getElementById('inputitem')
            console.log(inputitemele.style.height)
            inputitemele.style.height = '0px'
            that.iscloseshow = false
            additemele.style.height = '44px'
            // animate end
            that.textvalue = ''
          } else {
            alert(data.data.msg)
            console.log(data.data.obj)
            if (data.data.obj === 'needlogin') {
              that.$router.replace('/loginin')
            }
          }
        })
      }
    },
    gettodo () {
      var that = this
      var url = config.hostname + 'gettodo'
      axios.post(url).then(function (data) {
        if (data.data.obj === 'needlogin') {
          alert(data.data.msg)
          that.istipshow = true
        } else {
          that.istipshow = false
          if (data.data.success === true) {
            console.log(data.data.obj)
            if (data.data.obj.length === 0) {
              that.todolist.push({updatetime: '通知', todo: '暂无数据！', iscomplete: '1', isdelete: '1'})
            } else {
              for (var i = 0; i < data.data.obj.length; i++) {
//                var dataobj = JSON.parse(data.data.obj[i].updatetime)
//                console.log(dataobj)
//                var year = dataobj.updatetime.getFullYear()
//                var month = new Date().getMonth() + 1
//                var date = new Date().getDate()
//                var hour = new Date().getHours()
//                var minutes = new Date().getMinutes()
//                var sec = new Date().getSeconds()
//                var datetime = year + '-' + month + '-' + date + ' ' + hour + ':' + minutes + ':' + sec
              }
              that.todolist = data.data.obj
            }
          } else {
            console.log(data.data.msg)
          }
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
.todo{
  width:100%;
  height:100%;
  position:relative;
  -webkit-box-shadow: 0px 0px 30px 3px rgba(0,0,0,0.3);
}
.top{
  width:100%;
  padding-bottom:60px;
}
.additem{
  width:90%;
  height:44px;
  margin-left:5%;
  background-color:rgba(255,255,255,0.6);
  -webkit-box-shadow:0px 0px 20px 1px rgba(0,0,0,0.3);
  border-radius:5px;
  margin-top:15px;
  transition: height 0.6s;
}
.additem:active{
  background-color:rgba(255,255,255,0.6);
  -webkit-box-shadow:0px 0px 10px 1px rgba(0,0,0,0.6);
  border-radius:5px;
}
.inputitem{
  width:100%;
  height:0px;
  background-color:rgba(255,255,255,0.6);
  -webkit-box-shadow:0px 0px 20px 1px rgba(0,0,0,0.3);
  border-radius:5px;
  transition: height 0.6s;
  overflow:hidden;
}
.addbotton{
  width:100%;
  height:44px;
  line-height:44px;
  color:#FFF;
  text-shadow: 2px 2px 50px rgba(0,0,0,0.6);
}
.tips{
  width:90%;
  height:35px;
  color:#fff;
  line-height:35px;
  font-size:12px;
  border-radius:4px;
  margin-left:5%;
  background-color:rgba(255,255,255,0.4);
  margin-top:15px;
  -webkit-box-shadow:0px 0px 10px 1px rgba(0,0,0,0.3);
}

.tips:active{
  width:90%;
  height:35px;
  color:#fff;
  line-height:35px;
  font-size:12px;
  border-radius:4px;
  margin-left:5%;
  background-color:rgba(255,255,255,0.4);
  margin-top:15px;
  -webkit-box-shadow:0px 0px 20px 1px rgba(0,0,0,0.6);
}
.bottons{
  width:100%;
  height:50px;
  background-color:rgba(255,255,255,0.7);
  position: fixed;
  bottom:0px;
  left:0px;
  z-index:8;
  color:#555;
  font-size:14px;
  line-height:50px;
  text-shadow: 2px 2px 50px rgba(0,0,0,0.6);
  -webkit-box-shadow:0px 1px 40px 3px rgba(0,0,0,0.5);
}
  .close{
    height:22px;
    width:22px;
    background-color:red;
    border-radius:11px;
    position:absolute;
    right:10px;
    top:10px;
    color:#fff;
    line-height:22px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    transition: all 0.6s;
    -webkit-box-shadow: 0px 0px 20px 3px rgba(0,0,0,0.5);
  }
  .inputarea{
    height:220px;
    width:94%;
    margin-left:3%;
  }
  .textarea{
    height:190px;
    width:100%;
    border:0px;
    margin-top:10px;
    background-color:rgba(0,0,0,0);
    text-align:left;
  }
  .todolistwrap{
    width:100%;
  }
  .card{
    width:90%;
    height:81px;
    margin-top:10px;
    margin-left:5%;
    background-color:rgba(255,255,255,0.4);
    border-radius:5px;
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.3);
  }
  .line{
    height:40px;
    line-height:40px;
    border-bottom:1px solid rgba(255,255,255,0.2);
    color:#fff;
    text-shadow: 2px 2px 50px rgba(0,0,0,0.6);
    font-size:14px;
  }
  .con{
    width:90%;
    margin-left:5%;
    overflow-x: scroll;
  }
</style>
