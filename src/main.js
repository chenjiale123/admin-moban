import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import VueI18n from 'vue-i18n';
import { messages } from './components/common/i18n';
import 'element-ui/lib/theme-chalk/index.css'; // 默认主题

import './components/common/directives';
import 'babel-polyfill';
import Cookies from 'js-cookie'
import { parseTime, resetForm, addDateRange, selectDictLabel, download, handleTree,dateForm } from "@/utils/ruoyi";

import Pagination from "@/components/common/Pagination";

const BASE_URL = 'http://39.97.210.157/'
Vue.prototype.baseUrl=BASE_URL
Vue.prototype.dateForm = dateForm
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.download = download
Vue.prototype.handleTree = handleTree
Vue.prototype.msgSuccess = function (msg) {
  this.$message({ showClose: true, message: msg, type: "success" });
}

Vue.prototype.msgError = function (msg) {
  this.$message({ showClose: true, message: msg, type: "error" });
}

Vue.prototype.msgInfo = function (msg) {
  this.$message.info(msg);
}
Vue.component('Pagination', Pagination)

Vue.config.productionTip = false;
Vue.use(VueI18n);
Vue.use(ElementUI, {
    size: 'small'
});
const i18n = new VueI18n({
    locale: 'zh',
    messages
});

// router.beforeEach((to, from, next) => {
//     const role = Cookies.get('token');
//     console.log(role )


//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else {
    
//         next()
        
//     }
  
// });

new Vue({
    router,
    i18n,
    render: h => h(App)
}).$mount('#app');
