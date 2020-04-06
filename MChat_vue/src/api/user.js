import request from '@/utils/request'

export function searchUser (params) {
  return request({
    url: 'info/search',
    method: 'get',
    params
  })
}

export function getUser (params) {
  return request({
    url: 'info/getUser',
    method: 'get',
    params
  })
}
