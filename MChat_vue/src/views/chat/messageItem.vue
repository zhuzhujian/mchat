<template>
  <div class="message-item">
    <p v-if="type === 'other'" class="avater">
      <img :src="'#'" alt="">
    </p>
    <div v-if="type === 'other' || type === 'mine'" class='messageInfo'>
      <p class="info">
        <span>{{item.nickname}}</span>
        <i>{{item.time}}</i>
      </p>
      <p v-if="item.style === 'img'" class="image">
        <img src="#" alt="" @dblclick="$emit('lookPhoto', v.img)" title="双击查看原图">
      </p>
      <div v-if="item.style === 'file'" class="file">
        <img src="../../assets/images/file.png" alt="">
        <div>
          <p :title="item.mes">{{item.mes.lastIndexOf('.') > 12 ? item.mes.slice(0,12) + '...' + item.mes.slice(item.mes.lastIndexOf('.')) : item.mes}}</p>
          <a :href="'#'" download v-if="type === 'other'">下载</a>
        </div>
      </div>
      <p v-if="type === 'mine'" class="avater">
        <img :src="'#'" alt="">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'messageItem',
  props: {
    type: {
      type: String,
      default: 'other'
    },
    item: {
      type: Object,
      default: () => { return {} }
    }
  },
  data () {}
}
</script>

<style lang="scss" scoped>

</style>
