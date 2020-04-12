// io.in(pramas.roomid).emit('getHistoryMessages', res.data); // 包括发送者
// socket.to(val.roomid).emit('joined', OnlineUser); // 不包括发送者

const onconnection = (socket) => {
  console.log('scoket启动了');

  socket.on('join', (val) => { // 加入房间
    socket.join(val.roomId, () => {
      console.log('加入了', val.name);
      onlineUser[val.name] = socket.id;
      io.in(val.roomId).emit('joined', onlineUser);
    });
  });
  socket.on('leave', (val) => { // 退出房间
    delete onlineUser[val.name];
    console.log('leave', onlineUser);
    socket.leave(val.roomId, () => {
      socket.to(val.roomId).emit('leaved', onlineUser);
    });
  });
  socket.on('mes', (val) => { // 聊天消息
    socket.to(val.roomId).emit('mes', val);
  });
  socket.on('getHistoryMessages', (params) => { // 获取历史消息
    console.log('这里获取历史消息');
    let value = '';
    socket.emit('getHistoryMessages', value);
  });
  socket.on('sendValidate', (val) => { // 发送验证消息
    console.log('saveMessage');
    socket.to(val.roomId).emit('takeValidate', val);
  });
  socket.on('agreeValidate', (val) => { // 同意好友或者加群申请
    if(val.state === 'group') { // 群聊验证
      // 查看是否存在
      // 设置消息已读
      let value = {
        mes: val.userName + '同意你加入' + val.groupName + '!',
        time: new Date(),
        roomId: val.roomId,
        status: '1', // 同意
        type: 'info',
        nickname: val.userName
      };
      // 保存通知消息
      socket.to(value.roomId).emit('takeValidate',value);
      // 添加到申请人会话列表
      let org = {
        type: 'org',
        nickname: val.nickname,
        time: new Date(),
        roomId: val.roomId,
      }
      // 保存消息
      socket.to(org.roomId).emit('org', org)
    } else if(val.state === 'friend') {
      // 写入好友列表
      let value = {
        mes: val.userName + '同意了你的好友申请！',
        time: new Date(),
        roomId: val.roomId,
        status: '1',  
        type: 'info',
        nickname: val.userName
      };
      // 保存通知
      // 添加到会话列表
      socket.to(value.roomId).emit('takeValidate', value);
      socket.emit('validateSuccess', 'ok');
    } else {
      console.log('添加好友失败');
    }
  });

  socket.on('refuseValidate', (val) => {
    if (val.state === 'group') {
      let value = {
          mes: val.userYname + '拒绝了你加入 ' + val.groupName + ' 的申请!',
          time: new Date(),
          nickname: val.userYname,
          groupName: val.groupName,
          state: 'group',
          type: 'info',
          status: '-1', // 拒绝
          roomid: val.roomId
      };
      // 保存通知消息
      socket.to(value.roomid).emit('takeValidate', value);
    } else if (val.state === 'friend') {
        let value = {
            mes: val.userYname + '拒绝了你的好友请求！',
            time: new Date(),
            nickname: val.userName,
            state: 'friend',
            status: '-1', // 拒绝
            type: 'info',
            roomid: val.roomId
        };
        // console.log('saveMessage', value);
        apiList.saveMessage(value); // 保存通知消息
        socket.to(value.roomid).emit('takeValidate', value);
    }
  // 通知申请人验证已拒绝
  })
}

module.exports = {
  onconnection
}