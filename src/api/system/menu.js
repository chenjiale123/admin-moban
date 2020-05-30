import request from '@/utils/request'

// 查询菜单列表
export function listMenu() {
  return request({
    url: '/api/menu/findMenuList',
    method: 'get',

  })
}

// 查询菜单详细
export function getMenu(menuId) {
  return request({
    url: '/system/menu/' + menuId,
    method: 'get'
  })
}




// 菜单
export function avater(file) {
  return request({
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      
   },
 
    url: '/api/menu'  ,
    method: 'post',
    data:file

  })
}
// 查询菜单下拉树结构
export function menuTreeselect() {
  return request({
    url: '/api/menu/findMenuList',
    method: 'get'
  })
}

// 根据角色ID查询菜单下拉树结构  
export function roleMenuTreeselect(roleId) {
  return request({
    url: '/api/role/findRoleAndMenu' ,
    method: 'get',
    params: roleId
  })
}

// 新增菜单
export function addMenu(name,url,parentId,menuSortNumber,form) {
  return request({
    url: '/api/menu/addMenu?name='+name+'&url='+url+'&parentId='+parentId+"&menuSortNumber="+menuSortNumber,
    method: 'post',
    data: form
  })
}

// 修改菜单
export function updateMenu(data) {
  return request({
    url: '/api/menu/updMenu',
    method: 'post',
    params: data
  })
}

// 删除菜单
export function delMenu(menuId) {
  return request({
    url: 'api/menu/delMenus' ,
    method: 'post',
    params: menuId
  })
}