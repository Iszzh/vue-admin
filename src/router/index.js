import Vue from 'vue'
import VueRouter from 'vue-router'

import Main from '../components/index.vue'

import Login from '../views/Login/Login.vue'

import Home from '../views/Home/Home.vue'

import userSettings from '../views/userSettings/userSettings.vue'

import RoomState from '../views/RoomState/RoomState.vue'
import Order from '../views/Order/Order.vue'

import Member from '../views/Member/Member.vue'
import Plan from '../views/Plan/Plan.vue'

import ErrorPage from '../views/404/404.vue'


Vue.use(VueRouter)

let router=new VueRouter({
    mode:'history',
    routes:[{
        path:'/',
        component:Main,
        redirect:'/Home'
    },{
        path:'/Home',               //首页
        component:Main,
        name:'首页',
        children:[{
            path:'Charts',
            component:Home,
            name:'线形图'
        },{
            path:'RoomState',          //房态图
            component:RoomState,
            name:'房态图'
        },{
            path:'Order',
            component:Order,
            name:'客人订单管理' 
        },{
            path:'Member',
            component:Member,
            name:'会员管理'
        },{
            path:'Plan',
            component:Plan,
            name:'方案管理'
        },{
            path:'userSettings',
            component:userSettings,
            name:'个人设置'
        }]
    },{
        path:'/Login',
        component:Login,
        name:'登录'
    },,{
        path:'*',
        component:ErrorPage,
        name:'404页面'         //404页面，放在路由配置最后
    }]
})

//路由钩子，判断是否登录，如果没有登录，就返回登录页面
router.beforeEach((to,from,next)=>{
    if(to.path=='/login'){
        sessionStorage.removeItem('users');
    }
    let users=JSON.parse(sessionStorage.getItem('users'));
    if(!users && to.path!='/login'){
        next({path:'/login'})
    }else{
        next()
    }
})

export default router