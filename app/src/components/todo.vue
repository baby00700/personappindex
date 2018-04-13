<template>
  <div class="todo">
    <div class="top">
      <div class="todolistwrap">
        <mu-card class="cardlist" v-for="(item, $index) in todolist" :key="item.id">
          <mu-card-title :title="item.jb" :subTitle="item.updatetime" :style="{backgroundColor: item.color}"/>
          <mu-card-text>
            {{item.todo}}
          </mu-card-text>
          <mu-card-actions v-show="!item.isbottonshow">
            <mu-flat-button label="Done" primary @click="setdone($event, $index)"/>
            <mu-flat-button label="Delete" secondary @click="setdel($event, $index)"/>
          </mu-card-actions>
          <div>
          <mu-menu-item v-show="item.isbottonshow" class="itemlist">
            <mu-badge :content="item.isdone" v-if="item.isdoneshow" class="badge" primary  slot="after"/>
            <mu-badge :content="item.isdel" v-if="item.isdelshow" class="badge" secondary slot="after"/>
          </mu-menu-item>
          </div>
        </mu-card>
      </div>
    </div>
    <transition  name="custom-classes-transition"
                 enter-active-class="animated slideInUp"
                 leave-active-class="animated slideOutDown">
    <div class="addsend" v-show="isinputshow">
      <mu-appbar title="添加事项">
        <mu-icon-button icon="keyboard_backspace" slot="left" @click="closeadd()"/>
      </mu-appbar>
      <div class="inputarea">
        <textarea class="textarea" maxlength="255" v-model="textvalue"></textarea>
      </div>
      <div class="bottombut">
        <mu-float-button icon="send" class="float-button" @click="showdia()"/>
      </div>
      <mu-dialog :open="dialog" title="请选择优先级别">
        <div class="select">
          <div class="jblist" style="background-color:#ff8a80" @click="settodo('紧急')">紧急</div>
          <div class="jblist" style="background-color:#ff8a65" @click="settodo('优先')">优先</div>
          <div class="jblist" style="background-color:#82b1ff" @click="settodo('一般')">一般</div>
          <div class="jblist" style="background-color:#a5d6a7" @click="settodo('空闲')">空闲</div>
        </div>
        <mu-flat-button label="取消" slot="actions" primary @click="hidedia"/>
      </mu-dialog>
      <!--<mu-raised-button label="保存" style="height:56px" primary fullWidth @click="settodo()"/>-->
    </div>
    </transition>
    <mu-float-button icon="add" class="float-button"  @click="showadd($event)"/>
    <!--<div class="bottons" @click='goshouye()'>返回主页</div>-->
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
      isinputshow: false,
      iscloseshow: false,
      isaddbottonshow: true,
      textvalue: '',
      tips: '查看更多历史内容，请点击登录',
      istipshow: true,
      todolist: [],
      list: ['紧急', '优先', '一般', '空闲'],
      selectjb: '',
      dialog: false
    }
  },
  mounted () {
    this.$emit('setchilddata', 'TODOS')
    this.checklogin()
    this.gettodo()
  },
  methods: {
    showdia () {
      this.dialog = true
    },
    hidedia () {
      this.dialog = false
    },
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
    goshouye () {
      this.$router.push('/')
    },
    showadd (e) {
      this.isinputshow = true
    },
    closeadd (e) {
      this.isinputshow = false
    },
    settodo (selectjb) {
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
        axios.post(url, qs.stringify({todo: that.textvalue, updatetime: datetime, selectjb: selectjb})).then(function (data) {
          that.hidedia()
          if (data.data.success === true) {
            that.textvalue = ''
            that.gettodo()
            that.closeadd()
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
                var color
                var isdelshow = false
                var isdoneshow = false
                var dataobj = data.data.obj[i]
                if (dataobj.iscomplete === 1) {
                  isdone = '已完成'
                  isdoneshow = true
                }
                if (dataobj.isdelete === 1) {
                  isdel = '已删除'
                  isdelshow = true
                }
                if (dataobj.iscomplete === 1 || dataobj.isdelete === 1) {
                  isbottonshow = true
                }
                if (dataobj.jb === '紧急') {
                  color = '#ff8a80'
                } else if (dataobj.jb === '优先') {
                  color = '#ff8a65'
                } else if (dataobj.jb === '一般') {
                  color = '#82b1ff'
                } else if (dataobj.jb === '空闲') {
                  color = '#a5d6a7'
                }
                data.data.obj[i].isdone = isdone
                data.data.obj[i].isdel = isdel
                data.data.obj[i].isbottonshow = isbottonshow
                data.data.obj[i].color = color
                data.data.obj[i].isdelshow = isdelshow
                data.data.obj[i].isdoneshow = isdoneshow
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
          that.todolist[index].isbottonshow = true
          that.todolist[index].iscomplete = 1
          that.todolist[index].isdone = '已完成'
          that.todolist[index].isdoneshow = true
        }
      })
      ev.stopPropagation()
    },
    setdel (ev, index) {
      var that = this
      var url = config.hostname + 'setdel'
      axios.post(url, qs.stringify({id: that.todolist[index].id})).then(function (data) {
        if (data.data.success === true) {
          that.todolist[index].isbottonshow = true
          that.todolist[index].isdelete = 1
          that.todolist[index].isdel = '已删除'
          that.todolist[index].isdelshow = true
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
  padding-bottom:80px;
  text-align: left;
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
  /*new*/
.float-button{
  position:fixed;
  bottom:20px;
  right:20px;
  z-index:10;
}
  .cardlist{
    width:90%;
    margin-left:5%;
    margin-top:15px;
    margin-bottom:5px;
    border-radius:5px;
    overflow: hidden;
    -webkit-box-shadow: 1px 1px 10px 1px rgba(0,0,0,0.2);
  }
  .badge{
    margin-right:5px;
  }
  .addsend{
    width:100%;
    height:100%;
    background-color:#fff;
    position:fixed;
    top:0px;
    left:0px;
    z-index:11;
  }
  .inputarea{
    height:calc(100% - 112px);
    width:100%;
    margin-top:5px;
    /*background-color:green;*/
  }
  .textarea{
    width:96%;
    height:100%;
    margin-left:0%;
    background-color:rgba(255,255,255,1);
    border:0;
  }
  .bottombut{
    background-color:#fff;
    width:100%;
    height:56px;
  }
/*.select{*/
  /*width:220px;*/
  /*height:50px;*/
  /*!*background-color:red;*!*/
/*}*/
  .jblist{
    width:40px;
    height:40px;
    float:left;
    margin-left:12px;
    text-align: center;
    line-height: 40px;
    margin-top:5px;
    border-radius:20px;
    background-color:green;
    font-size:12px;
    color:#fff;
  }
</style>
