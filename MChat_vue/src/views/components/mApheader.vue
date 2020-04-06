<template>
  <div class="mchat-apheader" :style="{backgroundColor: bgColor}">
    <a v-if="back">
      <i class="el-icon-back" @click="goBack"></i>
    </a>
    <span v-if="title">{{title}}</span>
    <div class="icon-slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MApheader',
  props: {
    back: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    bgColor: {
      type: String,
      default: '#27cac7'
    }
  },
  data () {
    return {}
  },
  methods: {
    goBack () {
      if (this.back === '-1') {
        this.$router.go(-1)
      } else {
        this.$router.push(this.back)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mchat-apheader{
  width: 100%;
  font-size: 14px;
  color: #ffffff;
  font-weight: 400;
  display: flex;
  justify-content: center;
  padding: 10px 15px;
  box-sizing: border-box;
  position: relative;
  height: 40px;
  a:first-child{
    display: block;
    position: absolute;
    left: 5px;
    top: 10px;
    i{
      display: inline-block;
      width: 24px;
      height: 24px;
      color: #fff;
    }
  }
  .icon-slot{
    position: absolute;
    right: 15px;
    top: 10px;
  }
}
</style>
