<template>
  <div class="detail-container">
    <m-apheader bgColor="#000" back="-1" style="height: 200px;color #fff"></m-apheader>
    <div class="friend-info">
      <div class="info-header">
        <a class="friend-avatar" href="javascript:;">
          <img :src="IMG_URL + friendInfo.avatar" alt="">
        </a>
        <span class="friend-major">
          <p>{{friendInfo.user_name}}</p>
          <div class="friend-major-down">
            <p>vChat:{{friendInfo.account}}</p>
            <p>
              <span>性别：{{friendInfo.sex ? friendInfo.sex : '性别未知'}}</span>
            </p>
          </div>
        </span>
      </div>
      <div class="info-content">
        <p class="friend-signature">
          <i class="el-icon-edit"></i>
          <span>{{friendInfo.signature ? friendInfo.signature : '该用户很懒，没有留下个性签名'}}</span>
        </p>
        <p class="friend-address">
          <i class="el-icon-location"></i>
          <span>{{friendInfo.city ? friendInfo.city : '尚未定位'}}</span>
        </p>
      </div>
      <div class="detail-button">
        <el-button type="info" plain v-if="!isMyFriend" @click="handleAddFriend" size="medium">加好友</el-button>
        <el-button type="danger" v-else @click="handleDelFriend" size="medium">删除好友</el-button>
        <el-button type="primary" @click="handleSendMes" size="medium">发消息</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {getUser} from '@/api/user'
import {isFriend, addFriend} from '@/api/friend'
import mApheader from '@/views/components/mApheader.vue'
export default {
  name: 'detailFriend',
  components: {mApheader},
  data () {
    return {
      friendInfo: {},
      isMyFriend: false,
      IMG_URL: process.env.IMG_URL
    }
  },
  created () {
    this.getFriendInfo()
  },
  methods: {
    getFriendInfo () {
      let account = this.$route.params
      getUser({account: account.id}).then(res => {
        if (res.code === 0) {
          let data = res.data[0]
          this.friendInfo = data
          this.isFriend()
        } else {
          this.$router.goto(-1)
        }
      })
    },
    isFriend () {
      let data = {}
      data.friend_id = this.friendInfo.account
      isFriend(data).then(res => {
        if (res.code === -1) {
          this.$message({type: 'error', message: res.message})
        } else {
          res.data.type ? this.isMyFriend = true : this.isMyFriend = false
        }
      })
    },
    handleAddFriend () {
      let account = this.friendInfo.account
      addFriend({account}).then(res => {
        if (res.code === 0) {
          this.$message({type: 'success', message: res.message})
        } else {
          this.$message({type: 'error', message: res.message})
        }
      })
    },
    handleDelFriend () {

    },
    handleSendMes () {}
  }
}
</script>

<style lang="scss" scoped>
.detail-container{
  width: 100%;
  height: 100%;
  .friend-info{
    position: absolute;
    top: 165px;
    height: calc(100% - 165px);
  }
}
.info-header{
  display: flex;
  width: 100%;
  .friend-avatar{
    margin-left: 10px;
    img{
      width: 70px;
      border-radius: 50%;
    }
  }
  .friend-major{
    font-size: 18px;
    margin-left: 20px;
    width: calc(100% - 100px);
    p{
      margin: 5px 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      color: #ffffff;
    }
    .friend-major-down{
      font-size: 12px;
      p{
        margin: 3px 0;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: 100%;
        color: #000;
      }
    }
  }
}
.info-content{
  font-size: 12px;
  margin: 20px 10px 0 10px;
}
.detail-button{
  width: 100%;
  position: absolute;
  bottom: 0;
  display: inline-block;
  text-align: center;
  .el-button + .el-button{
    margin-left: 50px;
  }
}
</style>
