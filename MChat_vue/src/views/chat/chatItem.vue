<template>
  <div class="chat-item">
    <div class="chat-item-container">
      <div class="item-container">
        <div class="chat-room">
          <message></message>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import message from './message'
export default {
  name: 'chatItem',
  components: {message},
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>

</style>
