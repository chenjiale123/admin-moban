import Vue from 'vue';
import Router from 'vue-router';
import Cookies from 'js-cookie'

Vue.use(Router);

const router= new Router({
    routes: [
        {
            path: '/',
            redirect: '/dashboard'
        },
      
       
        {
            path: '/',
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
                {
                    path: '/dept/findDeptTree',
                    component: () => import( '../components/page/dept/findDeptTree.vue'),
                    meta: { title: '部门管理' }
                },
                {
                    path: '/dictionary/findDictionaryValList',
                    component: () => import( '../components/page/dictionary/findDictionaryValList.vue'),
                    meta: { title: '字典数据' }
                },
                {
                    path: '/dictionary/findDictionaryList',
                    component: () => import( '../components/page/dictionary/findDictionaryList.vue'),
                    meta: { title: '字典类型' }
                },
                {
                    path: '/userlog/findUserOperationLogList',
                    component: () => import( '../components/page/userlog/findUserOperationLogList.vue'),
                    meta: { title: '操作日志' }
                },
                {
                    path: '/userLog/findUserLoginLogList',
                    component: () => import( '../components/page/userlog/findUserLoginLogList.vue'),
                    meta: { title: '登录日志' }
                },
                {
                    path: '/userLog/findUserExceptionLogList',
                    component: () => import( '../components/page/userlog/findUserExceptionLogList.vue'),
                    meta: { title: '异常日志' }
                },
                {
                    path: '/userLog/findClientExceptionLogList',
                    component: () => import( '../components/page/userlog/findClientExceptionLogList.vue'),
                    meta: { title: '客户端异常日志' }
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


router.beforeEach(function(to, from, next) {

    if (!Cookies.get("token")) {
        if (to.path !== '/login') {
            return next('/login')
        }
    }
    next()
})
export default router