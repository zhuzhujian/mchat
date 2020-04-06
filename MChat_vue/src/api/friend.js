import request from '@/utils/request'

export function isFriend (params) {
  return request({
    url: 'friend/isFriend',
    method: 'get',
    params
  })
}
