<template>
    <div class="sidebar">
        <el-menu
            class="sidebar-el-menu"
            :default-active="onRoutes"
            :collapse="collapse"
            background-color="#324157"
            text-color="#bfcbd9"
            active-text-color="#20a0ff"
            unique-opened
            router
        >
            <template v-for="item in menu1">
                <template v-if="item.submenu">
                    <el-submenu :index="item.url+''" :key="item.url">
                        <template slot="title">
                            <!-- <i :class="item.icon"></i> -->
                            <span slot="name">{{ item.name }}</span>
                        </template>
                        <template v-for="subItem in item.submenu" >
                            <el-submenu
                                v-if="subItem.submenu"
                                :index="subItem.url+''"
                                :key="subItem.url"
                            >
                                <template slot="title" >{{ subItem.name }}</template>
                                <el-menu-item
                                
                                    v-for="(threeItem,i) in subItem.submenu"
                                    :key="i"
                                    :index="threeItem.url+''"
                                >{{ threeItem.name }}</el-menu-item>
                            </el-submenu>
                            <el-menu-item
                                v-else
                                :index="subItem.url"
                                :key="subItem.url"
                            >{{ subItem.name }}</el-menu-item>
                        </template>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.url" :key="item.url">
                        <!-- <i :class="item.icon"></i> -->
                        <span slot="name">{{ item.name }}</span>
                    </el-menu-item>
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
            collapse: false,
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
         console.log(cookies)
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
}
.sidebar::-webkit-scrollbar {
    width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
    width: 250px;
}
.sidebar > ul {
    height: 100%;
}
</style>
