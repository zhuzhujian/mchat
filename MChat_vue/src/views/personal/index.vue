<template>
  <div class="person-container">
    <div class="friend-list-contanier">
      <el-card class="friend-list" shadow="always">
        <div slot="header" style="display: inline-block; text-align: center; width: 100%; font-size: 16px"><div>{{list === 'friend' ? '我的好友' : '我的群聊'}}</div></div>
        <div v-if="list === 'friend'" class="friend-list-center">
          <div>你好友列表为空，请先添加</div>
        </div>
        <div v-if="list === 'group'" class="friend-list-center">
          <div>
            你暂时未添加群聊，请先添加
          </div>
        </div>
        <div class="friend-list-footer">
          <div :class="{active: list === 'friend'}">
            <i class="el-icon-s-custom" @click="getFriend"></i>
            <p>好友</p>
          </div>
          <div :class="{active: list === 'group'}">
            <i class="el-icon-s-grid" @click="getGroup"></i>
            <p>群聊</p>
          </div>
        </div>
      </el-card>
    </div>
    <el-card class="chat-room" shadow="always">
      chat-room
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'personMain',
  data () {
    return {
      list: 'friend',
      friendList: [],
      groupList: []
    }
  },
  methods: {
    getFriend () {
      this.list = 'friend'
    },
    getGroup () {
      this.list = 'group'
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
      padding: 0!important;
    }
    .friend-list-center{
      height: 550px;
      width: 100%;
    }
    .friend-list-footer{
      height: 50px;
      width: 100%;
      display: flex;
      .active{
        color: #0099ff;
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
  .chat-room{
    flex: 1;
    height: 100%;
    margin-left: 15px;
  }
}
</style>
