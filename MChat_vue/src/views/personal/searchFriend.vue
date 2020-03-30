<template>
  <div class="search-container">
    <m-apheader title="添加好友" back="/main/personMain/friendly/own"></m-apheader>
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
        <li v-for="item in userList" :key="item['_id']" @click="goFriendDetail(item['_id'])">
          <a href="javascript:;">
            <img :src="'#'" alt="">
          </a>
          <div>
            <p>
              <span class="vchat-line1" :title="item.nickname">{{item.nickname}}</span>
            </p>
            <p>
              <span :title="v.signature" class="mchat-line1">{{item.signature}}</span>
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
      let data = {type: this.type, huntKey: this.huntKey}
      console.log(data)
      searchUser(data).then(res => {
        this.userList = res.data.slice(0)
      })
    },
    goFriendDetail (id) {
      console.log('detail')
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
  }
}
</style>
