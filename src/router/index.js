/* 导入Vue构造函数 */
import Vue from 'vue'
/* 导入VueRouter构造函数 */
import VueRouter from 'vue-router'
/* 导入HomeView页面 */
/* import MainNavigationVue from '../views/HomeView.vue' */
import { MessageBox, Message } from 'element-ui';
import axios from '../utils/axios'

/* 调用构造函数Vue的use方法 传入VueRouter构造函数 
作用是：把VueRouter当作一个插件 全局插入到Vue中*/
Vue.use(VueRouter)

/* 定义一个路由数组对象 */
const routes = [
    /* 一个对象就对应了一个路由
    path就是路由的地址
    name给路由起个名字
    component就是具体跳转的页面
    */
    /* {
      //这里是一级目录所以可以加/, /表示根目录
      path: '/about',
      name: 'about',
      //箭头函数的写法可以实现‘懒加载’的效果
      component: () => import('../views/AboutView.vue'),
    } */
    {
        path: '/',
        redirect: { name: 'login' }
    },
    {
        path: '/entrance',
        name: 'Entrance',
        redirect: '/home',
        component: () => import('../components/MainEntrance.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('../pages/home/Home.vue'),
                meta: { keepAlive: true, comp: "home", name: '首页', needVerify: false, index: 1 }
            },
            {
                path: '/map',
                name: 'map',
                component: () => import('../pages/Map.vue'),
                meta: { keepAlive: true, comp: "Map", name: '地图详情', needVerify: false, index: 1 }
            },
            {
                path: '/foundationData',
                name: 'foundationData',
                redirect: '/foundationData/water',
                component: () => import('../pages/Layout.vue'),
                children: [
                    {
                        path: 'water',
                        name: 'water',
                        component: () => import('../components/WaterConditionDisplay.vue'),
                        meta: { keepAlive: true, comp: "water", name: '水情', parent: [{ name: "基础数据", path: "/foundationData" }], needVerify: false, index: 1 }
                    },
                    {
                        path: 'station',
                        name: 'station',
                        component: () => import('../components/StationList.vue'),
                        meta: { keepAlive: true, comp: "station", name: '测站基本信息表', parent: [{ name: "基础数据", path: "/foundationData" }], needVerify: false, index: 1 }
                    },
                    {
                        path: 'section',
                        name: 'section',
                        component: () => import('../components/SectionList.vue'),
                        meta: { keepAlive: true, comp: "Section", name: '断面基本信息表', parent: [{ name: "基础数据", path: "/foundationData" }], needVerify: false, index: 1 }
                    },
                ]
            },
            {
                path: '/watchData',
                name: 'watchData',
                redirect: '/watchData/myWatch',
                component: () => import('../pages/Layout.vue'),
                children: [
                    {
                        path: 'myWatch',
                        name: 'myWatch',
                        component: () => import('../pages/watchData/myWatch.vue'),
                        meta: { keepAlive: true, comp: "myWatch", name: '我的关注', parent: [{ name: "水质检测", path: "/watchData" }], needVerify: false, index: 1 }
                    },
                    {
                        path: 'tableWatch',
                        name: 'tableWatch',
                        component: () => import('../pages/watchData/tableWatch.vue'),
                        meta: { keepAlive: true, comp: "tableWatch", name: '表格监测', parent: [{ name: "水质检测", path: "/watchData" }], needVerify: false, index: 1 }
                    },
                    {
                        path: 'chartWatch',
                        name: 'chartWatch',
                        component: () => import('../components/SectionList.vue'),
                        meta: { keepAlive: true, comp: "chartWatch", name: '图表展示', parent: [{ name: "水质检测", path: "/watchData" }], needVerify: false, index: 1 }
                    },
                ]
            },
            {
                path: '/admin',
                name: 'admin',
                /* redirect: '/watchData/myWatch', */
                component: () => import('../pages/admin/admin.vue'),
                meta: { keepAlive: true, comp: "admin", name: '管理系统', needVerify: false, index: 1 }
            },
            {
                path: '/addItem',
                name: 'addItem',
                component: () => import('../pages/admin/components/addItem.vue'),
                meta: { keepAlive: true, comp: "addItem", name: '添加数据项', parent: [{ name: '管理系统', path: "/admin" }], needVerify: true, index: 1 }
            },
            {
                path: '/changeData',
                name: 'changeData',
                component: () => import('../pages/admin/components/changeData.vue'),
                meta: { keepAlive: true, comp: "changeData", name: '修改数据项', parent: [{ name: '管理系统', path: "/admin" }], needVerify: true, index: 1 }
            },
            {
                path: '/stationManage',
                name: 'stationManage',
                component: () => import('../pages/admin/components/stationManage.vue'),
                meta: { keepAlive: true, comp: "stationManage", name: '测站管理', parent: [{ name: '管理系统', path: "/admin" }], needVerify: true, index: 1 }
            },
            {
                path: '/sectionManage',
                name: 'sectionManage',
                component: () => import('../pages/admin/components/sectionManage.vue'),
                meta: { keepAlive: true, comp: "sectionManage", name: '断面管理', parent: [{ name: '管理系统', path: "/admin" }], needVerify: true, index: 1 }
            },
            {
                path: '/page_403',
                name: 'page_403',
                component: () => import('../pages/error-page/page_403.vue'),
                meta: { keepAlive: true, comp: "page_403", name: 'page_403', needVerify: false, index: 1 }
            },


        ],
        meta: { keepAlive: false, comp: "entrance", name: '入口' }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../pages/Login.vue'),
        meta: { keepAlive: true, comp: "login", name: '注册', needVerify: false, index: 0 }
    },

]

/* 实例化构造函数VueRouter 产生一个实例化对象router 
并把上面的路由数组对象routes当作参数 以对象的方式传给构造函数VueRouter*/
const router = new VueRouter({
    routes: routes
})

// router.beforeEach((to, from, next) => {
//     console.log("beforeEach", to.path)
//     /* 登录逻辑
//     *首次登录，有token转跳首页或加载原页面
//     *首次登录，无token转跳/login
//     *刷新且有token且不是/login
//     *刷新且有token且是/login
//     *刷新，无token
//      */
//     if (to.path === '/login') {
//         console.log("from.path", from.path)
//         //不是初次直接加载界面
//         if (from.path != '/') {
//             if (localStorage.getItem('Authorization')) {
//                 router.app.$confirm('此操作将退出当前登录, 是否继续?', '提示', {
//                     confirmButtonText: '确定',
//                     cancelButtonText: '取消',
//                     type: 'warning',
//                     center: true
//                 }).then(() => {
//                     Message({
//                         type: 'success',
//                         message: '退出成功!',
//                         duration: 1000
//                     });
//                     localStorage.removeItem('Authorization')
//                     next();
//                 }).catch(() => {
//                     Message({
//                         type: 'info',
//                         message: '已取消退出',
//                         duration: 1000
//                     });
//                     next(false)
//                 });
//             } else {
//                 next()
//             }

//         } else {
//             if (localStorage.getItem('Authorization')) {
//                 next('/home')
//             } else {
//                 next();
//             }

//         }

//     } else {
//         let token = localStorage.getItem('Authorization');
//         if (token === null || token === '') {
//             next('/login');
//         } else if (from.path === '/page_403' && to.meta.needVerify == true) {
//             next(false)
//         }
//         else if (to.meta.needVerify == true) {
//             axios("http://47.98.181.209:9090/status_verify").then(() => {
//                 next();
//             }).catch((err) => { console.log(err) })
//         }
//         else {
//             handleKeepAlive(to)
//             next()
//         }
//     }


// })

async function handleKeepAlive(to) {
    if (to.matched && to.matched.length > 2) {
        for (let i = 0; i < to.matched.length; i++) {
            const element = to.matched[i]
            if (element.components.default.name === 'layout') {
                to.matched.splice(i, 1)
                await handleKeepAlive(to)
            }
            // 如果没有按需加载完成则等待加载
            if (typeof element.components.default === 'function') {
                await element.components.default()
                await handleKeepAlive(to)
            }
        }
    }
}


/* 把实例化路由对象router默认导出 */
export default router