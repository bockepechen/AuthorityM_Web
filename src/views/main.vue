<style>
    .layout{
        
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .lock-screen-back{
        border-radius: 50%;
        z-index: -1;
        box-shadow: 0 0 0 0 #667aa6 inset;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
        transition: all 3s;
    }
</style>
<template>
    <div class="layout">
        <!-- <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu :active-name='active' theme="dark" width="auto" :open-names="open" ref="leftMenu">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-navigate"></Icon>
                        公司信息管理
                    </template>
                  
                    <MenuItem name="1-1"><router-link :to="{ path: '/company/list'}" style="color:#fff">公司管理</router-link></MenuItem>
                   
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                       权限管理
                    </template>
                    <MenuItem name="2-1"><router-link :to="{ path: '/authority/listrole'}" style="color:#fff">角色管理</router-link></MenuItem>
                     <MenuItem name="2-2"><router-link :to="{ path: '/authority/listjob'}" style="color:#fff">岗位管理</router-link></MenuItem>
                   
                </Submenu>
                 <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                       配置管理
                    </template>
                    <MenuItem name="3-1"><router-link :to="{ path: '/menu/list'}" style="color:#fff">菜单管理</router-link></MenuItem>
                    
                   
                </Submenu>
               
            </Menu>
        </Sider> -->
        <div style="    width: 200px;
    min-width: 200px;
    max-width: 200px;
    flex: 0 0 200px;
    position: fixed;
    height: 100vh;
    left: 0px;
    overflow: auto;
    background: #495060;
    transition: all .2s ease-in-out;">
            <shrinkable-menu
             @on-change="handleSubmenuChange"
             :menu-list="menuLists"
        >
         </shrinkable-menu>
        </div>
        
            
       
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <div style="height: 64px;overflow-y: hidden;position: relative;">
                       <ul style="position: absolute;" id="list">
                           <li @click="info(item,index)" v-for="(item,index) in messageList" :key="index">{{item}}</li>
                          
                      </ul>    
                </div>
            </Header>
                    
            <div style="position: absolute;right: 0;top: 20px;width: 300px;">
                <span @click="fullscreeen(value)">全屏</span>
                <span @click="lockscreen()">锁屏</span>
                <div style="width: 20px;display: inline-block;"><lock-screen></lock-screen></div>
                <span>{{username}}</span>
                <span @click="logout()">退出</span>
                

            </div>
            <div style="background-color:#e3dfdf">
                <tags-page-opened ></tags-page-opened>
            </div>
                <div style="padding: 20px;">
                     
                        
                            <router-view></router-view>
                        
                   

                </div>
               
           
        </Layout>
    </div>
</template>
<script>
 const url ="wss://authoritymserv.jiayecaifu.com:8023/AuthorityM_Serv/websocket/" 
//const url ="ws://10.2.0.101:8182/AuthorityM_Serv/websocket/";
// const url ="ws://10.2.0.155:8199/AuthorityM_Serv/websocket/" 
var websocket
import axios from 'axios';
 import lockScreen from './lockscreen/lockscreen.vue';
 import tagsPageOpened from './lockscreen/tags-page-opened.vue';
 import shrinkableMenu from '@/components/shrinkable-menu/menu.vue';
    export default {
        name:'mains',
        components: {
            lockScreen,
            tagsPageOpened,
            shrinkableMenu
        },
        data(){
            return{
                value:  false,
                open: [],
                active: '1-1',
                menuList:[],
                messageList:[]
            }
        },
        computed: {
            showFullScreenBtn () {
                return window.navigator.userAgent.indexOf('MSIE') < 0;
            },
            menuLists(){
                return this.$store.state.app.menuList
            },
           username(){
                return localStorage.getItem("UserName")
            }
        },
        methods:{
            
            fullscreeen(value){
               let main = document.body;
            if (this.value) {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                    this.value = false
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                    this.value = false
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                    this.value = false
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                    this.value = false
                }
            } else {
                if (main.requestFullscreen) {
                    main.requestFullscreen();
                    this.value = true
                } else if (main.mozRequestFullScreen) {
                    main.mozRequestFullScreen();
                     this.value = true
                } else if (main.webkitRequestFullScreen) {
                    main.webkitRequestFullScreen();
                     this.value = true
                } else if (main.msRequestFullscreen) {
                    main.msRequestFullscreen();
                     this.value = true
                }
            }
            },
            lockscreen(){
                    this.$router.push({
                        name: 'locking'
                    }); 
                
              
            },
            info(item,index){
                this.$Notice.info({
                    title: '消息',
                    desc: item,
                    duration: 0
                });
                this.messageList.splice(index,1)
            },
            handleSelect(){
                
            },
            play(){
                console.log("play")
                let vm = this
                let moveDis=-64;
                let list = document.getElementById('list');
                 function animate(){
                   
                    var newLeft = Number(list.style.top.replace("px","")) + moveDis;
                    //console.log("newLeft",newLeft)
                    let max = vm.messageList.length*(-64)
                    
                    if (newLeft <= 0&&newLeft > max) {
                        list.style.top =newLeft+"px"
                    }else if (newLeft == max) {
                        list.style.top = 0 + 'px';
                    }
                 }
                let timer = setInterval(function() {
                  animate();
                }, 2000)   
            },
            handleSubmenuChange(val){
               
            },
            showout(){
                //this.$refs.div.$emit('showTag',"");
            },
            logout(){
                localStorage.removeItem("organization");
                localStorage.removeItem("UserName");
                 localStorage.removeItem("User");
                 let array = []
                  this.$store.commit("setMenuList",array)
                this.$router.push({name:'login'})
            },
            init(){
                 let vm = this
                /*  axios.get('/api/menu')
                    .then(function(res){
                   
                    vm.menuList=res.data.data.data;
                    vm.$store.commit("setMenuList",vm.menuList)
                    })
                    .catch(function(error){
                    console.log(error)
                    })  */
                    if(!JSON.parse(localStorage.getItem("organization"))){
                        return
                    }
                    let req = {
                    "jyau_content": {
                        " jyau_reqData": [{
                            "req_no": "AU2018048201802051125231351",
                            "org_id": JSON.parse(localStorage.getItem("organization")).id
                        }],
                            "jyau_pubData": {
                                "operator_id": JSON.parse(localStorage.getItem("User")).jyau_content.jyau_resData[0].operator_id,
                                "account_id": "systemman",
                                "ip_address": "10.2.0.116",
                                "system_id": "10909"
                            }
                        }
                    }
                    axios.post("api/menuAuth/queryOperatorMenu",req).then(function(res){
                        let list =res.data.jyau_content.jyau_resData[0].multi_menuList
                        let menuList = {}
                        menuList.name="菜单"
                        menuList.data=[]
                        for(let i=0; i<list.length;i++){
                            let obj={}
                            obj.name=list[i].name
                            obj.id = list[i].menu_id
                            obj.children = []
                            for(let j=0; j<list[i].child_list.length; j++){
                                let child={}
                                child.name=list[i].child_list[j].name
                                child.id=list[i].child_list[j].menu_id
                                child.route= list[i].child_list[j].action
                                obj.children.push(child)
                            }
                            menuList.data.push(obj)
                        }
                        vm.menuList=menuList.data
                        vm.$store.commit("setMenuList",vm.menuList)
                        console.log(menuList)
                    })

            },
            messageInit(){
                    let vm = this
                	if ('WebSocket' in window) {
                       // websocket = new WebSocket(url+"OP201805241441037573"+"/0/0");
                          websocket = new WebSocket(url+JSON.parse(localStorage.getItem("User")).jyau_content.jyau_resData[0].operator_id+"/0/0");
                    } else {
                    alert('当前浏览器 Not support websocket')
                    return;
                    };
                    websocket.onopen = function() {
                    vm.startSend();
                    }
                        websocket.onerror = function() {
                        console.log("WebSocket连接发生错误");
                        return;
                    };
                    //接收到消息的回调方法
                    websocket.onmessage = function(event) {
                        vm.messageList.push(event.data)
                        console.log("event",event,event.data);
                    }
                    //连接关闭的回调方法
                    websocket.onclose = function() {
                        console.log("WebSocket连接关闭");
                    }
            },
             startSend(){
                let vm = this
                console.log("登录成功")
                //websocket.send();
            },
            closeWebScoket(){
                 websocket.close();
            }
        },
        mounted(){
            this.init();
            this.play()
            this.messageInit()
             let vm = this
            window.onbeforeunload = function() {
            vm.closeWebSocket();
            }
        },
        watch:{
            '$route' (to){
                let title = to.meta.title;
               // console.log(title)

            }
        }
        
    }
</script>
