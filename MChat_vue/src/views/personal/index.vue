<template>
  <div class="person-container">
    <div class="friend-list-contanier">
      <el-card class="friend-list" shadow="always">
        <div class="friend-list-body">
          <router-view></router-view>
        </div>
        <div class="friend-list-footer">
          <ul>
            <li v-for="n in nav" :key="n.id" :class="{active: $route.path.indexOf(n.link) > -1}">
              <router-link :to="{path: n.link}">
                <i :class="n.class"></i>
                <p>{{n.name}}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </el-card>
    </div>
    <el-card class="chat-room" shadow="always">
      <chat-room></chat-room>
    </el-card>
  </div>
</template>

<script>
import chatRoom from '@/views/components/chatRoom'
export default {
  name: 'personMain',
  components: {chatRoom},
  data () {
    return {
      nav: [{
        name: '好友',
        class: 'el-icon-user-solid',
        id: 2,
        link: '/main/personMain/friendly/own'
      },
      {
        name: '群聊',
        class: 'el-icon-s-grid',
        id: 3,
        link: '/main/personMain/group'
      }],
      list: 'friend',
      friendList: [],
      groupList: []
    }
  },
  mounted () {
  },
  methods: {
    getFriend () {
      this.list = 'friend'
      this.$scoket.close()
    },
    getGroup () {
      this.list = 'group'
    }
  },
  sockets: {
    connect: function (data) {
      console.log('websocket connection')
    },
    test (data) {
      console.log(data + 'test')
    }
  }
}
</script>

<style lang="scss" scoped>
.person-container{
  width: 100%;
  height: 100%;
  display: flex;
  .friend-list{
    width: 300px;
    height: 100%;
    >>>.el-card__body{
      height: 100%;
      padding: 0;
      .friend-list-body{
        height: calc(100% - 80px);
      }
      .friend-list-footer{
        height: 50px;
        width: 100%;
        border-top: 1px solid #ebebeb;
        ul {
          display: flex;
          list-style: none;
          width: 100%;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
          li{
            list-style: none;
            width: 33.3%;
            font-size: 12px;
            a{
              color: #000;
              text-decoration: none;
              i{
                text-decoration: none;
                font-size: 22px;
              }
            }
          }
          .active{
            a{
              color: #0099ff;
            }
          }
        }
        div{
          width: 50%;
          text-align: center;
          i{
            font-size: 25px;
          }
          p{
            font-size: 14px;
            margin: 5px 0;
          }
        }
      }
    }
  }
  .chat-room{
    flex: 1;
    height: 100%;
    margin-left: 15px;
    >>>.el-card__body{
      padding: 0;
      height: 100%;
    }
  }
}
</style>
