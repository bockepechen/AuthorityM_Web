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
    <div class="layout " >
        
        <div class="leftMenu">
            <shrinkable-menu  @on-change="handleSubmenuChange"  :menu-list="menuLists" >
            </shrinkable-menu>
        </div>
        
            
       
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}">
                <div class="message">
                       <ul style="position: absolute;" id="list">
                           <li @click="info(item,index)" v-for="(item,index) in messageList" :key="index" class="message-item">{{item.msgContent|capitalize}}</li>
                          
                      </ul>    
                </div>
            </Header>
                    
            <div style="position: absolute;right: 0;top: 20px;width: 300px;">
              
                <full-screen></full-screen>
                <lock-screen></lock-screen>
             
              <!--   <div style="display: inline-block;margin-right: 10px;">{{username}}</div>  -->
                <logout v-on:logout="logouts"></logout>
                   <div  style="position: absolute;width: 20px;display: inline-block;left: 70px;top: -8px;">
                        <Tooltip :content="username" placement="bottom">
                             <img style="height: 32px;border-radius: 16px;" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&amp;fm=27&amp;gp=0.jpg">
                        </Tooltip>
                </div>

            </div>
            <div style="background-color:#e3dfdf">
                <tags-page-opened ></tags-page-opened>
            </div>
            <div style="padding: 20px;">
                <router-view></router-view>
            </div>
               
           
        </Layout>
         <Modal
            v-model="modal"
            title="消息"
            @on-ok="ok"
            @on-cancel="cancel">
            <p>{{message}}</p>
        
        </Modal>
    </div>
</template>
<script>
 const url ="wss://authoritymserv.jiayecaifu.com:8023/AuthorityM_Serv/websocket/" 
//const url ="ws://10.2.0.101:8182/AuthorityM_Serv/websocket/";
// const url ="ws://10.2.0.155:8199/AuthorityM_Serv/websocket/" 
  var websocket
  import Util from '@/libs/util';
  
  import lockScreen from '@/components/lockscreen/lockscreen.vue';
  import logout from '@/components/logout/logout.vue';
  import fullScreen from '@/components/fullscreen/fullscreen.vue';
  import shrinkableMenu from '@/components/shrinkable-menu/menu.vue';
  import tagsPageOpened from '@/components/tagsPageOpened/tagsPageOpened.vue';
    export default {
        name:'mains',
        components: {
            lockScreen,
            tagsPageOpened,
            shrinkableMenu,
            logout,
            fullScreen
        },
        data(){
            return{
                isFullScreen: false,
                value:  false,
                open: [],
                active: '1-1',
                menuList:[],
                messageList:[],
                modal:false,
                message:"",
                cn: '',
                config: {
                    color: '255,255,255',
                    count: 200,
                }
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
                return  Util.getStorge("UserName")
            }
        },
        filters:{
            capitalize:function(value){
                return value.replace(/<[^>]+>/g,"")
            }
        },
        methods:{
            ok(){

            },
            cancel(){

            },
            logouts(){
                let vm =this
                vm.closeWebScoket();
                
            },
            lockscreen(){
                    this.$router.push({
                        name: 'locking'
                    }); 
                
              
            },
            info(item,index){
                this.$Notice.info({
                    title: '消息',
                    desc: item.msgContent ,
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
                    if(!JSON.parse(Util.getStorge("organization"))){
                        return
                    }
                    let req = {
                    "jyau_content": {
                        " jyau_reqData": [{
                            "req_no": "AU2018048201802051125231351",
                            "org_id": JSON.parse(Util.getStorge("organization")).id
                        }],
                            "jyau_pubData": {
                                "operator_id": JSON.parse(Util.getStorge("User")).jyau_content.jyau_resData[0].operator_id,
                                "account_id": "systemman",
                                "ip_address": "10.2.0.116",
                                "system_id": "10909"
                            }
                        }
                    }
                    Util.axios.post("api/menuAuth/queryOperatorMenu",req).then(function(res){
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
                          websocket = new WebSocket(url+JSON.parse(Util.getStorge("User")).jyau_content.jyau_resData[0].operator_id+"/0/0");
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
                        console.log("这是接受的消息",event.data)
                        if(JSON.parse(event.data).msgType==1){
                             vm.$Notice.info({
                                title: '消息',
                                desc: JSON.parse(event.data).msgContent ,
                                duration: 0
                            }); 
                        }else if(JSON.parse(event.data).msgType==0){
                             vm.messageList.push(JSON.parse(event.data))
                             //console.log("event",vm.messageList,JSON.parse(event.data));
                        }else if(JSON.parse(event.data).msgType==2){
                            console.log("这是警告消息")
                            vm.message=JSON.parse(event.data).msgContent
                            vm.modal=true
                        }
                       
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
            vm.closeWebScoket();
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
<style scoped>
.message{
    height: 64px;overflow-y: hidden;position: relative;
}
.message-item{
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.leftMenu{
    width: 200px;
    min-width: 200px;
    max-width: 200px;
    flex: 0 0 200px;
    position: fixed;
    height: 100vh;
    left: 0px;
    overflow: auto;
    background: #495060;
    transition: all .2s ease-in-out;
}
</style>
