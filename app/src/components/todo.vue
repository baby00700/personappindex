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
        <transition  name="custom-classes-transition"
                     mode="out-in"
                     enter-active-class="animated fadeIn"
                     leave-active-class="animated fadeOut">
          <div class="addbotton" v-show="isaddbottonshow">ADD TODO</div>
        </transition>
        <transition  name="custom-classes-transition"
                     mode="in-out"
                     enter-active-class="animated fadeIn"
                     leave-active-class="animated fadeOut">
          <div class="addbotton" v-show="!isaddbottonshow" @click="itemsub()">OK!</div>
        </transition>
      </div>
    </div>
    <div class="bottons" @click='goshouye()'>返回主页</div>
  </div>
</template>

<script>
export default {
  name: 'todo',
  data () {
    return {
      msg: 'todo',
      deg: 0,
      isinputshow: true,
      iscloseshow: false,
      isaddbottonshow: true,
      textvalue: ''
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
    goshouye () {
      this.$router.push('/')
    },
    showadd (e) {
      var that = this
      that.isaddbottonshow = false
      var additemele = document.getElementById('additem')
      var inputitemele = document.getElementById('inputitem')
      additemele.style.height = '264px'
      setTimeout(function () {
        that.isinputshow = true
        console.log(inputitemele)
        inputitemele.style.height = '220px'
        that.iscloseshow = true
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
    itemsub () {
      alert('333')
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
  background-color:rgba(255,255,255,0.4);
  -webkit-box-shadow:0px 0px 20px 1px rgba(0,0,0,0.3);
  border-radius:5px;
  margin-top:15px;
  transition: height 0.5s;
}
.additem:active{
  background-color:rgba(255,255,255,0.4);
  -webkit-box-shadow:0px 0px 10px 1px rgba(0,0,0,0.5);
  border-radius:5px;
}
.inputitem{
  width:100%;
  height:0px;
  background-color:rgba(255,255,255,0.4);
  -webkit-box-shadow:0px 0px 20px 1px rgba(0,0,0,0.3);
  border-radius:5px;
  transition: height 0.5s;
  overflow:hidden;
}
.addbotton{
  width:100%;
  height:44px;
  line-height:44px;
  color:#FFF;
  text-shadow: 2px 2px 50px rgba(0,0,0,0.6);
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
    transition: all 0.5s;
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
</style>
