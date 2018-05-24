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
             :menu-list="menuList"
        >
         </shrinkable-menu>
        </div>
        
            
       
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
          
                    <div style="position: absolute;right: 0;top: 20px;width: 300px;">
                    <span @click="fullscreeen(value)">全屏</span>
                    <span @click="lockscreen()">锁屏</span>
                    <div style="width: 20px;display: inline-block;"><lock-screen></lock-screen></div>
                    <span>{{username}}</span>
                    <span @click="logout()">退出</span>


                    </div>
                    <div>
                        <tags-page-opened ></tags-page-opened>
                    </div>
                <div style="padding: 20px;">
                     
                        
                            <router-view style="overflow:hidden"></router-view>
                        
                   

                </div>
               
           
        </Layout>
    </div>
</template>
<script>
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
                 menuList:[]
            }
        },
        computed: {
            showFullScreenBtn () {
                return window.navigator.userAgent.indexOf('MSIE') < 0;
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
            handleSelect(){

            },
            handleSubmenuChange(val){
               
            },
            showout(){
                //this.$refs.div.$emit('showTag',"");
            },
            logout(){
                localStorage.removeItem("organization");
                localStorage.removeItem("UserName");
                this.$router.push({name:'login'})
            },
            init(){
                 let vm = this
                axios.get('/api/menu')
                    .then(function(res){
                   
                    vm.menuList=res.data.data.data;
                    
                    })
                    .catch(function(error){
                    console.log(error)
                    })
               

            }
        },
        mounted(){
            this.init();
            /* this.active = '2-1';
            this.open = ["2"];
            
            this.$nextTick(function() {
                this.$refs.leftMenu.updateOpened();
                this.$refs.leftMenu.updateActiveName();
            })
            this.handleSelect(this.active); */
        },
        watch:{
            '$route' (to){
                let title = to.meta.title;
               // console.log(title)

            }
        }
        
    }
</script>
