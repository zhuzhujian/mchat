<template>
  <div class="search-container">
    <m-apheader title="添加好友" back="-1"></m-apheader>
    <div class="search">
      <el-select v-model="type" placeholder="搜索方式">
        <el-option
          v-for="item in searchOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"></el-option>
      </el-select>
      <el-input
        placeholder="搜索内容"
        v-model="huntKey"
        clearable
      >
        <i slot="append" class="el-input__icon el-icon-search" @click="huntFriends('click')"></i>
      </el-input>
    </div>
    <div class="mchat-linkman-container">
      <ul class="mchat-linkman-list" v-show="userList.length">
        <li v-for="item in userList" :key="item['account']" @click="goFriendDetail(item)">
          <a href="javascript:;">
            <img :src="item.avatar" alt="">
          </a>
          <div>
            <p>
              <span class="vchat-line1" :title="item.nickname">{{item.user_name}}</span>
            </p>
            <p>
              <span :title="item.signature" class="mchat-line1">{{item.signature}}</span>
            </p>
          </div>
        </li>
      </ul>
      <v-nodata v-show="!userList.length">
        <p class="no-data">
          没有搜索到相应的用户
        </p>
      </v-nodata>
    </div>
  </div>
</template>

<script>
import mApheader from '@/views/components/mApheader'
import {searchUser} from '@/api/user'
export default {
  name: 'searchFriend',
  components: {mApheader},
  data () {
    return {
      type: '',
      huntKey: '',
      userList: [],
      searchLoading: false,
      searchOptions: [{
        value: 1,
        label: '昵称'
      },
      {
        value: 2,
        label: '账号'
      }]
    }
  },
  methods: {
    huntFriends (event) {
      this.searchLoading = true
      let data = {type: this.type, huntKey: this.huntKey}
      searchUser(data).then(res => {
        if (res.code === -1) {
          this.$message({type: 'error', message: res.message})
        } else {
          let list = res.data
          list.forEach(item => {
            item.avatar = process.env.IMG_URL + item.avatar
          })
          this.userList = list
        }
      }).finally(() => {
        this.searchLoading = false
      })
    },
    goFriendDetail (item) {
      this.$router.push({name: 'friendDetial', params: {id: item.account}})
    }
  }
}
</script>

<style lang="scss" scoped>
.search-container{
  height: 100%;
  .search{
    display: flex;
    .el-select{
      width: 100px;
    }
    .el-input{
      flex: 1;
      i{width: 10px;}
    }
  }
  .mchat-linkman-container{
    height: calc(100% - 30px);
    .mchat-linkman-list{
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
  }
}
</style>
