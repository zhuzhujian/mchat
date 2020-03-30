import request from '@/utils/request'

export function searchUser (params) {
  return request({
    url: 'info/search',
    method: 'get',
    params
  })
}
