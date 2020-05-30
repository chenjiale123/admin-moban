import request from '@/utils/request'

export function getLog(userId) {
    return request({
      url: '/api/sysLog/findSysLoginLogList' ,
      method: 'get',
      params:userId
    })
  }

  export function getCLog(userId) {
    return request({
      url: '/api/sysLog/findSysOperationLogList' ,
      method: 'get',
      params:userId
    })
  }

  export function getULog(userId) {
    return request({
      url: '/api/sysLog/findSysExceptionLogList' ,
      method: 'get',
      params:userId
    })
  }

  export function getClienLog(userId) {
    return request({
      url: '/api/sysLog/findClientExceptionLogList' ,
      method: 'get',
      params:userId
    })
  }



  export function getClienResponse(userId) {
    return request({
      url: '/api/sysLog/findClientExceptionLogResponse' ,
      method: 'get',
      params:userId
    })
  }

  export function getUResponse(userId) {
    return request({
      url: '/api/sysLog/findSysExceptionLogResponse' ,
      method: 'get',
      params:userId
    })
  }

  export function getResponse(userId) {
    return request({
      url: '/api/sysLog/findSysLoginLogResponse' ,
      method: 'get',
      params:userId
    })
  }
  export function getCResponse(userId) {
    return request({
      url: '/api/sysLog/findSysOperationLogResponse' ,
      method: 'get',
      params:userId
    })
  }