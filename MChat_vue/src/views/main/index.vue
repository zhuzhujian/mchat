<template>
  <div class="mchat-main">
    <m-header></m-header>
    <div class="mchat-content">
      <div class="mchat-content-nav">
        <ul>
          <li v-for="item in nav" :key="item.id" :class="{active: $route.path.indexOf(item.link) > -1}">
            <router-link :to="{name: item.link}">
              <i :class="[item.class]"></i>
              <p>{{item.name}}</p>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="mchat-content-sub">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from '@/views/components/mHeader'
export default{
  name: 'Main',
  components: {MHeader},
  data () {
    return {
      nav: [{
        name: '主页',
        class: 'el-icon-s-home',
        id: 1,
        link: 'personMain'
      },
      {
        name: '应用空间',
        class: 'el-icon-menu',
        id: 2,
        link: 'application'
      }]
    }
  },
  methods: {}
}
</script>

<style lang="scss">
.mchat-main{
  width: 100%;
  height: 100%;
  .mchat-content{
    width: 100%;
    height: calc(100vh - 70px);
    // min-height: 600px;
    display: flex;
    justify-content: flex-start;
    background-color: #ffffff;
    .mchat-content-nav{
      width: 100px;
      height: 100%;
      box-shadow: 5px 0 20px -10px;
      ul{
        width: 100%;
        list-style: none;
        padding: 25px!important;
        .active {
          a{
            color: #0099ff;
          }
        }
        li{
          padding-bottom: 15px;
          cursor: pointer;
          list-style: none;
          a{
            display: inline-block;
            text-decoration: none;
            text-align: center;
            width: 50px;
            color: #000;
            i{
              font-size: 32px;
              margin-bottom: 5px;
            }
            p{
              font-size: 12px;
            }
          }
        }
      }
    }
    .mchat-content-sub{
      margin: 20px 25px;
      flex: 1;
    }
  }
}
</style>
