<template>
    <div class="sidebar">

        <el-menu
            class="sidebar-el-menu"
            :default-active="$route.path"
        
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in menu1">
                <template >
                    <el-submenu :index="item.id+''" :key="item.id" >
                        <template slot="title">
                    
                            <span slot="name">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.submenu" >
                            <el-submenu
                                v-if="subItem.submenu"
                                :index="subItem.id+''"
                                :key="subItem.id"
                            >
                                <template slot="title" >{{ subItem.name }}</template>

                        <template  v-for="threeItem in subItem.submenu" >
                            <el-submenu
                                v-if="threeItem.submenu"
                                :index="threeItem.id+''"
                                :key="threeItem.id"
                            >
                                <template slot="title" >{{ threeItem.name }}</template>
                                <el-menu-item
                                
                                    v-for="(fourItem,i) in threeItem.submenu"
                                    :key="i"
                                    :index="fourItem.url+''"
                                >{{ fourItem.name }}</el-menu-item>
                            </el-submenu>
                           <el-menu-item
                                   v-else
                                   
                                    :key="threeItem.url+''"
                                    :index="threeItem.url+''"
                                >{{ threeItem.name }}</el-menu-item>
                        </template>



                              
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.url+''"
                                :key="subItem.url+''"
                            >{{ subItem.name }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
       
            </template>
        </el-menu>
    </div>
</template>

<script>
import bus from '../common/bus';
import Cookies from 'js-cookie'
export default {
    data() {
        return {
            // collapse: false,
            menu1:[],
          
        };
    },
    computed: {
        onRoutes() {
            // return this.$route.path.replace('/', '');
        }
    },
    created() {
   
        // 通过 Event Bus 进行组件间通信，来折叠侧边栏
         let cookies=JSON.parse( sessionStorage.getItem('menu'))
         this.menu1=cookies
           
        bus.$on('collapse', msg => {
            this.collapse = msg;
            bus.$emit('collapse-content', msg);
        });
    }
};
</script>

<style scoped>
.sidebar {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: scroll;
    width: 250px;
    z-index: 9999;
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
/* .sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
} */
.sidebar > ul {
    height: 100%;
}
</style>
