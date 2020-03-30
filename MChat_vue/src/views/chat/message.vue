<template>
  <div class="message-container">
    <ul ref="msglist">
      <li style="font-size: 12px" v-if="chatList.length > 50">更多消息请在聊天记录中查看</li>
      <li :class="[{org: item.type==='org'}]" v-for="(item, index) in chatList" :key="index" >
        <template v-if="item.type === 'mine'">
          <message-item type="mine" @lookPhoto="lookPhoto" :item="item" class="mine"></message-item>
        </template>
        <template v-if="item.type === 'other'">
          <message-item type="other" @lookPhoto="lookPhoto" :item="item" class="other"></message-item>
        </template>
        <template v-if="item.type === 'org'">
          系统消息:<span>{{item.nickname}}</span>加入群聊
        </template>
      </li>
    </ul>
  </div>
</template>

<script>
import messageItem from './messageItem'
export default {
  name: 'Message',
  props: {
    chatList: {
      type: Array,
      default: () => []
    }
  },
  components: {messageItem},
  data () {
    return {
    }
  },
  watch: {
    chatList () {
      this.$nextTick(_ => {
        setTimeout(_ => {
          this.$refs['meglist'].scrollTop = this.$refs['meglist'].scrollHeight + 200
        }, 200)
      })
    }
  },
  methods: {
    lookPhoto (url) {
      this.$emit('lookPhoto', url)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
