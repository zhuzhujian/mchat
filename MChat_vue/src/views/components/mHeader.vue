<template>
  <div class="head-content">
    <el-row type="flex">
      <el-col>
        <span style="font-size: 18px; line-height: 50px; color: #ffffff; padding-left: 15px">Mchat</span>
      </el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <el-avatar :size="50" :src="baseUrl" @click.native.prevent="editInfo"></el-avatar>
          <div class="signature">
            <div>{{userInfo.user_name}}
              <el-button type="text" style="color: #ffffff" @click="loginOut">[退出]</el-button>
            </div>
            <div>个性签名:{{userInfo.signature ? userInfo.signature : '这个人很懒，没有留下任何信息'}}</div>
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import image from '@/assets/images/avatar.jpeg'
export default {
  name: 'MHeader',
  data () {
    return {
      userInfo: {
        user_name: 'zhuzhijian',
        signature: ''
      },
      baseUrl: image
    }
  },
  methods: {
    editInfo () {
      console.log('edit Info')
    },
    loginOut () {
      this.$store.dispatch('user/logout')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
.head-content{
  height: 50px;
  background-color: rgb(51, 159, 175);
  vertical-align: middle;
  .signature{
    font-size: 12px;
    div{
      height: 50%;
    }
  }
}
</style>
