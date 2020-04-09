import request from '@/utils/request'

export function isFriend (params) {
  return request({
    url: 'friend/isFriend',
    method: 'get',
    params
  })
}

export function addFriend (data) {
  return request({
    url: 'friend/addFriend',
    method: 'post',
    data
  })
}

export function getFriendList () {
  return request({
    url: 'friend/friendList',
    method: 'get'
  })
}
