import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
      
       
        {
            path: '',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/dashboard',
                    meta: { title: '首页' },
                    component: () => import(/* webpackChunkName: "home" */ '../components/page/Dashboard.vue'),
                },
                {
                    path: '/role/findRoleList',
                    component: () => import( '../components/page/role/findRoleList.vue'),
                    meta: { title: '角色管理' }
                },
                {
                    path: '/menu/findMenuList',
                    component: () => import( '../components/page/menu/findMenuList.vue'),
                    meta: { title: '菜单管理' }
                },
                {
                    path: '/user/findUserList',
                    component: () => import( '../components/page/user/findUserList.vue'),
                    meta: { title: '用户管理' }
                },
                
            ]
        },
        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        // {
        //     path: '*',
        //     redirect: '/404'
        // }
    ]
});
