import request from '@/utils/request'

export function prvo() {
    return request({
      url: '/api/common/findProvinceSelect',
      method: 'get',
    
    })
  }

  export function city(query) {
    return request({
      url: '/api/common/findCitySelect',
      method: 'get',
      params: query
    })
  }

  export function area(query) {
    return request({
      url: '/api/common/findAreaSelect',
      method: 'get',
      params: query
    })
  }