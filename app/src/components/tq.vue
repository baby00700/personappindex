<template>
  <div class="tianqi" v-bind:class="{ tran: istran }" v-bind:style="{background:'-webkit-linear-gradient(' + deg + 'deg, rgb(37,237,130), rgb(80,52,80)'}">
    <div class="top" v-bind:class="{ blur: isActive }">{{city}}</div>
    <div class="mid" v-bind:class="{ blur: isActive }">
      <div class="tqgk">
        <div class="wz">
          {{tqgk}}
        </div>
      </div>
      <div class="wd">{{wd}}</div>
    </div>
    <div class="bottom">{{tips}}</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'tianqi',
  data () {
    return {
      tqgk: '晴转多云',
      wd: '2-16',
      city: '南昌',
      deg: 0,
      route: 1,
      moveX: 0,
      moveY: 0,
      startpageX: 0,
      startpageY: 0,
      endpageX: 0,
      endpageY: 0,
      touchstate: '',
      pageY: 0,
      isActive: false,
      tips: '向上滑动',
      istran: false
    }
  },
  mounted () {
    console.log('tq mounted!')
    this.setdeg()
    this.gettq()
    // console.clear()
    console.log(this.$el.children)
    var bottomelement = this.$el
    console.log(bottomelement)
    bottomelement.addEventListener('touchstart', this.touchstart, false)
    bottomelement.addEventListener('touchmove', this.touchmove, false)
    bottomelement.addEventListener('touchend', this.touchend, false)
    bottomelement.addEventListener('touchcancel', this.touchcancel, false)
  },
  methods: {
    gettq () {
      var that = this
      var url = 'http://47.97.99.132:3000/tq'
      axios.post(url).then(function (data) {
        console.log(data)
        var datainfo = data.data.HeWeather6
        console.log(datainfo[0].basic)
        that.city = datainfo[0].basic.location
        that.tqgk = datainfo[0].now.cond_txt
        that.wd = datainfo[0].now.fl + ' ℃' + '  ' + datainfo[0].now.wind_dir + '  ' + datainfo[0].now.wind_sc + '级'
      })
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
    touchstart (event) {
      this.touchstate = 'touchstart'
      console.log(event)
      this.istran = false
      this.startpageY = event.touches[0].pageY
      // event.preventDefault()
    },
    touchmove (event) {
      event.preventDefault()
      this.isActive = true
      this.istran = false
      this.touchstate = 'touchmove'
      this.moveY = event.touches[0].pageY - this.startpageY
      this.endpageY = event.touches[0].pageY
      this.pageY = event.touches[0].pageY
      this.$el.style.height = this.pageY + 'px'
      if (this.moveY >= 200) {
        this.tips = '松开进入'
        this.$emit('close')
      }
    },
    touchend (event) {
      event.preventDefault()
      this.isActive = false
      this.istran = true
      this.touchstate = 'touchend'
      console.log(this.touchstate)
      this.$el.style.height = this.pageY + 'px'
      if (document.body.clientHeight - this.pageY >= 200) {
        this.$emit('close')
        this.istran = false
        this.tips = '松开进入'
      } else {
        this.$el.style.height = document.body.clientHeight + 'px'
        // this.istran = false
      }
    },
    touchcancel (event) {
      this.touchstate = 'touchcancel'
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
  .tianqi{
    height:100%;
    width:100%;
    position:fixed;
    top:0px;
    left:0px;
    overflow: hidden;
    -webkit-box-shadow: 0px -1px 20px 1px rgba(0,0,0,0.3);
  }
.tran{
  transition: height 0.3s ease;
}
.blur{
  -webkit-filter: blur(10px); /* Chrome, Opera */
  -moz-filter: blur(10px);
  -ms-filter: blur(10px);
  filter: blur(10px);
}
  .top{
    width:100%;
    height:100px;
    /*background-color:#fff;*/
    line-height:160px;
    font-size:30px;
    font-weight:900;
    position: absolute;;
    top:0px;
    left:0px;
    color:rgba(255,255,255,0.6);
    /*border-bottom: 1px solid #eee;*/
    text-shadow: 3px 4px 9px rgba(0,0,0,0.3);
    z-index:10;
     transition: all 0.5s;

  }
  .bottom{
    width:100%;
    height:50px;
    line-height:50px;
    position: absolute;;
    bottom:0px;
    left:0px;
    font-size:14px;
    color:#fff;
    text-shadow: 3px 4px 40px rgba(0,0,0,0.3);
    background-color:rgba(255,255,255,0.2);
    -webkit-box-shadow: 0px -1px 20px 1px rgba(0,0,0,0.2);
    transition: all 0.5s;
    z-index:11;
    /*border-top:1px dotted #eee;*/
  }

 .bottom:active{
    width:100%;
    height:50px;
    line-height:50px;
    position:absolute;
    bottom:0px;
    left:0px;
    font-size:14px;
    color:#555;
    text-shadow: 3px 4px 40px rgba(0,0,0,0.9);
    background-color:rgba(255,255,255,0.5);
    z-index:11;
    /*border-top:1px dotted #eee;*/
  }

  .mid{
    height:calc(100% - 150px);
    position:fixed;
    top:60px;
    width:100%;
    position:relative;
    z-index:10;
    /* overflow: hidden; */
     transition: all 0.5s;
  }
  .tqgk{
    width:100%;
    height:70%;
    position:relative;
  }
  .wz{
    width:100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align:center;
    font-size:80px;
    font-weight:900;
    color:rgba(255,255,255,0.7);
    text-shadow: 3px 4px 40px rgba(0,0,0,0.3);
  }
  .wd{
    width:100%;
    font-size:20px;
    font-weight:500;
    color:rgba(255,255,255,0.7);
    text-shadow: 3px 4px 40px rgba(0,0,0,0.3);
  }

</style>
