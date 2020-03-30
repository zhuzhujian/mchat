<template>
  <div class="mchat-friend-list">
    <m-apheader title="我的好友">
      <el-dropdown trigger="click" @command="handleCommand">
                <i class="el-icon-plus" style="color: #fff"></i>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="/main/personMain/friendly/search">添加好友</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
    </m-apheader>
    <div class="mchat-friend-container">
      <div class="mchat-manlist-conatainer" v-if="friendList.length">
        <ul class="mchat-manlist-list">
          <li v-for="item in friendList" :key="item.id" @click="goFriendDetail(item.id)">
            <a href="javascript:;">
              <img :src="item.path" alt="">
            </a>
            <div>
              <p>
                <span class="mchat-name">{{item.name}}</span>
              </p>
              <p>
                <span class="mchat-signatrue">{{item.signatrue}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <v-nodata v-if="friendList.length === 0">
        <p class="mchat-no-list">
          还没有添加好友哦，去<router-link to="/main/personMain/friendly/search">添加</router-link>
        </p>
      </v-nodata>
    </div>
  </div>
</template>

<script>
import MApheader from '@/views/components/mApheader.vue'
import img from '@/assets/images/avatar.jpeg'
export default {
  name: 'MyFriend',
  components: {
    MApheader
  },
  data () {
    return {
      friendList: [
        {id: 1, name: 'test', signatrue: 'i have no idea', path: img}
      ]
    }
  },
  methods: {
    handleCommand (command) {
      console.log('command:' + command)
      this.$router.push(command)
    },
    goFriendDetail (id) {
      console.log('get room id')
    }
  }
}
</script>

<style lang="scss" scoped>
.mchat-friend-container{
  width: 100%;
  div{
    width: 100%;
    // display: inline-block;
    text-align: center;
  }
}
.mchat-manlist-list{
  list-style: none;
  padding-left: 0;
  font-size: 14px;
  width: 100%;
  margin: 0;
  li{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    a {
      width: 35px;
      height: 35px;
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 5px;
      img{
        width: 35px;
      }
    }
    div{
      width:calc(100% - 50px);
      font-size: 14px;
      color: #a3a3a3;
      text-align: left;
      display: flex;
      justify-content: space-between;
      span{
        max-width: 160px;
        cursor: pointer;
      }
    }
  }
  li:hover{
    background-color: #f5f5f5;
  }
}
</style>
