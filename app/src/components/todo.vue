<template>
  <div class="todo">
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
        <div class="card" v-for="(item, $index) in todolist" :key="item.id" @click="showorclose($index)" >
          <div class="line" :class="{isdone: item.isbottonshow}"><div class="con">{{item.updatetime}}</div></div>
          <div class="line" :class="{isdone: item.isbottonshow}" style="border-bottom:0"><div class="con">{{item.todo}}</div></div>

          <div class="line" style="font-size:12px;line-height:30px;border-bottom:0;border-top:0;height:30px;" v-show="!item.isbottonshow">
            <div class="leftbut" @click="setdone($event, $index)">已完成</div>
            <div class="rightbut" @click="setdel($event, $index)">刪除</div>
          </div>
          <div class="line" style="line-height:30px;font-size:12px;text-decoration: no-line-through !important;border-bottom:0;border-top:1px solid rgba(0,0,0,0.2);height:30px; background-color:rgba(255,255,255,0.2);" v-show="item.isbottonshow">
            {{item.isdone}} {{item.isdel}}
          </div>
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
    this.checklogin()
    this.gettodo()
  },
  methods: {
    checklogin () {
      var that = this
      var url = config.hostname + 'loginin'
      axios.post(url, qs.stringify({username: '', userpasswd: ''})).then(function (data) {
        console.log(data)
        if (data.data.success === true) {
        } else {
          that.$router.replace('/loginin')
        }
      })
    },
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
            that.gettodo()
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
          that.istipshow = true
        } else {
          that.istipshow = false
          if (data.data.success === true) {
            console.log(data.data.obj)
            that.todolist = []
            if (data.data.obj.length === 0) {
              that.todolist.push({updatetime: '通知', todo: '暂无数据！', iscomplete: '1', isdelete: '1'})
            } else {
              for (var i = 0; i < data.data.obj.length; i++) {
                console.log(data.data.obj[i])
                var isdone = ''
                var isdel = ''
                var isbottonshow = false
                var dataobj = data.data.obj[i]
                if (dataobj.iscomplete === 1) {
                  isdone = '已完成'
                }
                if (dataobj.isdelete === 1) {
                  isdel = '已删除'
                }
                if (dataobj.iscomplete === 1 || dataobj.isdelete === 1) {
                  isbottonshow = true
                }
                data.data.obj[i].isdone = isdone
                data.data.obj[i].isdel = isdel
                data.data.obj[i].isbottonshow = isbottonshow
              }
              that.todolist = data.data.obj
            }
          } else {
            console.log(data.data.msg)
          }
        }
      })
    },
    showorclose (index) {
      var cardele = document.getElementsByClassName('card')
      if (cardele[index].style.height === '111px') {
        cardele[index].style.height = '81px'
      } else {
        cardele[index].style.height = '111px'
      }
    },
    setdone (ev, index) {
      var that = this
      var url = config.hostname + 'setdone'
      console.log(that.todolist[index].id)
      axios.post(url, qs.stringify({id: that.todolist[index].id})).then(function (data) {
        console.log(data)
        if (data.data.success === true) {
          var cardele = document.getElementsByClassName('card')
          cardele[index].style.height = '81px'
          that.todolist[index].isbottonshow = true
          that.todolist[index].iscomplete = 1
          that.todolist[index].isdone = '已完成'
        }
      })
      ev.stopPropagation()
    },
    setdel (ev, index) {
      var that = this
      var url = config.hostname + 'setdel'
      axios.post(url, qs.stringify({id: that.todolist[index].id})).then(function (data) {
        if (data.data.success === true) {
          var cardele = document.getElementsByClassName('card')
          cardele[index].style.height = '81px'
          that.todolist[index].isbottonshow = true
          that.todolist[index].isdelete = 1
          that.todolist[index].isdel = '已删除'
        }
      })
      ev.stopPropagation()
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
  -webkit-box-shadow: 0px 0px 30px 3px rgba(0,0,0,0.3);
  overflow-x: hidden;
  overflow-y: scroll;
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
.isdone{
  background-color:rgba(255,255,255,0.2) !important;
  color:#000 !important;
  text-decoration: line-through;
  filter: blur(1px);
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
    background-color:rgba(255,255,255,0.6);
    border-radius:5px;
    overflow: hidden;
    -webkit-box-shadow: 0px 0px 8px 1px rgba(0,0,0,0.3);
    transition: height 0.4s;

  }
  .line{
    height:40px;
    line-height:40px;
    border-bottom:1px solid rgba(0,0,0,0.2);
    color:#fff;
    text-shadow: 2px 2px 50px rgba(0,0,0,0.6);
    font-size:14px;
    transition: all 0.5s;
  }
  .con{
    width:90%;
    margin-left:5%;
    overflow-x: scroll;
  }
  .leftbut{
    width:calc(50% - 1px);
    background-color:rgba(255,255,255,0.2);
    float:left;
    height:30px;
    color:#eee;
  }
  .rightbut{
    width:50%;
    float:left;
    height:30px;
    color:#eee;
    background-color:rgba(255,255,255,0.2);
    border-left:1px solid rgba(0,0,0,0.1);
  }

.leftbut:active{
  width:calc(50% - 1px);
  background-color:rgba(255,255,255,0.4);
  float:left;
  height:30px;
  color:#eee;
}
.rightbut:active{
  width:50%;
  float:left;
  height:30px;
  color:#eee;
  background-color:rgba(255,255,255,0.4);
  border-left:1px solid rgba(0,0,0,0.1);
}
.bg-bubbles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
}
.bg-bubbles li {
  position: absolute;
  list-style: none;
  display: block;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.15);
  bottom: -160px;
  -webkit-animation: square 25s infinite;
  animation: square 25s infinite;
  -webkit-transition-timing-function: linear;
  transition-timing-function: linear;
}
.bg-bubbles li:nth-child(1) {
  left: 10%;
}
.bg-bubbles li:nth-child(2) {
  left: 20%;
  width: 80px;
  height: 80px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 17s;
  animation-duration: 17s;
}
.bg-bubbles li:nth-child(3) {
  left: 25%;
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}
.bg-bubbles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  -webkit-animation-duration: 22s;
  animation-duration: 22s;
  background-color: rgba(255, 255, 255, 0.25);
}
.bg-bubbles li:nth-child(5) {
  left: 70%;
}
.bg-bubbles li:nth-child(6) {
  left: 80%;
  width: 120px;
  height: 120px;
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
  background-color: rgba(255, 255, 255, 0.2);
}
.bg-bubbles li:nth-child(7) {
  left: 32%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 7s;
  animation-delay: 7s;
}
.bg-bubbles li:nth-child(8) {
  left: 55%;
  width: 20px;
  height: 20px;
  -webkit-animation-delay: 15s;
  animation-delay: 15s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
}
.bg-bubbles li:nth-child(9) {
  left: 25%;
  width: 10px;
  height: 10px;
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
  -webkit-animation-duration: 40s;
  animation-duration: 40s;
  background-color: rgba(255, 255, 255, 0.3);
}
.bg-bubbles li:nth-child(10) {
  left: 90%;
  width: 160px;
  height: 160px;
  -webkit-animation-delay: 11s;
  animation-delay: 11s;
}
@-webkit-keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}
@keyframes square {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
  100% {
    -webkit-transform: translateY(-700px) rotate(600deg);
    transform: translateY(-700px) rotate(600deg);
  }
}
</style>
