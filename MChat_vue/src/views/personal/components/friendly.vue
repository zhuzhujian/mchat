<template>
  <div class="mchat-friendly">
    <div class="mchat-friendly-container">
      <transition :name="transitionName">
        <router-view v-if="isShow"></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Friendly',
  data () {
    return {
      isShow: true,
      transitionName: 'moveIn'
    }
  },
  beforeDestroy () {
    this.isShow = false
  }
}
</script>

<style lang="scss" scoped>
.mchat-friendly{
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  .mchat-friendly-container{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    overflow: hidden;
    position: relative;
  }
}
</style>
