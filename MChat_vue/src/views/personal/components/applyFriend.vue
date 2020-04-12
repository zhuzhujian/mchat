<template>
  <div class="apply-container">
    <m-apheader title="验证信息" back="-1">
      <span @click="send">发送</span>
    </m-apheader>
    <el-form label-width="80px" class="introduceForm">
      <el-form-item label="个人介绍">
        <el-input v-model="introduce" placeholder="请输入不超过90个字" type="textarea" aotusize :maxlength="90">
        </el-input>
      </el-form-item>
    </el-form>
    <i>{{introduce.length}}/90</i>
  </div>
</template>

<script>
import mApheader from '@/views/components/mApheader.vue'
export default {
  name: 'applyFriend',
  components: {mApheader},
  data () {
    return {
      introduce: ''
    }
  },
  methods: {
    send () {
      let val = {}
      val.roomId = this.$route.params.id
      this.$socket.emit('sendValidate', val)
    }
  }
}
</script>

<style lang="scss" scoped>
.apply-container{
  text-align: right;
  .introduceForm{
    margin-top: 20px;
    margin-right: 10px;
  }
  i{
    display: inline-block;
    margin-right: 10px;
    margin-top: -10px;
  }
}
</style>
