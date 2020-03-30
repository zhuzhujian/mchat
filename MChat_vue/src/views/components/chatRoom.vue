<template>
  <div class="mchat-chatRoom-container">
    <div class="chat-room-bg">
      <div class="chat-header">
        <a>{{currSation.name}}</a>
      </div>
      <div class="chat-room-container">
        <div class="chat-conversation-container">
          <ul class="chat-conversation-ul">
            <li v-for="(item, index) in contactsList" :key="index" :class="{active: currSation.id === item.id}" @click="setCurrSation(item)">
              <el-badge :value="item.unRead" :max="99" class="masBadge" :hidden="item.unRead === 0">
                <a class="chat-photo">
                  <img :src="image" alt="">
                </a>
              </el-badge>
              <div class="chat-conversation-li-center">
                <template v-if="item.type === 'chat'">
                  <p class="chat-line1">{{item.nickname}}</p>
                  <p class="chat-line2">{{item.signature}}</p>
                </template>
                <template v-else>
                  <p class="chat-line1">{{item.name}}</p>
                  <p class="chat-line2">{{item.newMes}}</p>
                </template>
              </div>
              <div class="chat-conversation-li-right">
                <p>{{item.newMesTime}}</p>
              </div>
              <p class="delete">
                <el-tooltip class="item" effect="dark" :content="item.type === 'chat' ? '从会话列表移除' : '从会话列表中移除后，需要添加才能收到消息'" placement="top-start">
                  <i class="el-icon-circle-close"></i>
                </el-tooltip>
              </p>
            </li>
          </ul>
          <div class="chat-conversation-content">
            <chat-item></chat-item>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import image from '@/assets/images/avatar.jpeg'
import chatItem from '../chat/chatItem'
export default {
  name: 'ChatRoom',
  components: {chatItem},
  data () {
    return {
      image: image,
      currSation: {name: '朱智健'},
      contactsList: [
        {id: 1, unRead: 3, type: 'chat', nickname: '朱智健', signature: '成功没有捷径,后面还有很长的什么东西都不知道反正隐藏了，不理是什么反正你给我隐藏了就是', newMesTime: '3/23'},
        {id: 2, unRead: 3, type: 'chat', nickname: '朱智健', signature: '成功没有捷径,后面还有很长的什么东西都不知道反正隐藏了，不理是什么反正你给我隐藏了就是', newMesTime: '3/23'}]
    }
  },
  methods: {
    setCurrSation (currSation) {
      console.log('currSation')
    }
  }
}
</script>

<style lang="scss" scoped>
.mchat-chatRoom-container{
  width: 100%;
  height: 100%;
  .chat-room-bg{
    height: 100%;
    .chat-header{
      height: 40px;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid rgba(37, 30, 30, 0.212);
    }
    .chat-room-container{
      width: 100%;
      height: 100%;
      .chat-conversation-container{
        width: 100%;
        height: calc(100% - 40px);
        display: flex;
        justify-content: flex-start;
        .chat-conversation-ul{
          width: 20%;
          min-width:250px;
          list-style: none;
          padding: 0 5px;
          margin: 0;
          border-right: 1px solid rgba(37, 30, 30, 0.212);
          overflow-y: auto;
          li{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            text-align: left;
            position: relative;
            padding: 5px;
            .el-badge{
              width: 35px;
              height: 35px;
              a{
                width: 35px;
                height: 35px;
                img{
                  border-radius: 50%;
                  width: 35px;
                }
              }
            }
            .chat-conversation-li-center{
              height: 100%;
              margin-left: 10px;
              .chat-line1{
                height: 20px;
                font-size: 12px;
                min-width: 100px;
                overflow: hidden;
                line-height: 30px;
                box-sizing: border-box;
                margin: 5px 0 0 0;
              }
              .chat-line2{
                height: 20px;
                font-size: 10px;
                overflow: hidden;
                line-height: 20px;
                box-sizing: border-box;
                margin: 0;
              }
            }
            .chat-conversation-li-right{
              position: relative;
              top: 0;
              font-size: 10px;
              text-align: right;
            }
            .delete{
              position: absolute;
              right: 5px;
              top:13px;
              border-radius: 50%;
              width:18px;
              height: 18px;
              line-height: 18px;
              text-align: center;
              /*transition: transform 0.3s;*/
              transform: scale(0);
              i{
                  margin: 0;
              }
              i:hover{
                  color: #FF3255 !important;
              }
            }
          }
          li:hover, li.active{
            // background-color: rgba(243, 239, 239, 0.2);
                background-color: #f5f5f5;
          }
          li:hover .delete{
            transform: scale(1);
          }
        }
      }
    }
  }
}
</style>
