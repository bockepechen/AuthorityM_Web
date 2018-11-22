<template>
<div >
   <Card class="home-main">
        <p slot="title">
            <Icon type="person"></Icon>
           消息管理
        </p>
    <!-- <div style="text-align: center;margin: 20px;">
     
      
      <Input  icon="search" placeholder="请输入菜单名称搜索"   style="width: 600px"></Input>

    </div> -->
   <Form ref="formValidate" :model="formValidate"  :label-width="80" style="width: 600px">
        <FormItem label="收件人">
          <Cascader :data="data" change-on-select @on-change="xx" style="width:300px"></Cascader>
                  
                    <transition name="fade">
                    <div v-if="show"  class="user-content">
                    <div class="user-content-header">
                       <!--  <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            @click.prevent.native="handleCheckAll">全选</Checkbox> -->
                            <span class="user-item" v-if="!checkAll" v-bind:class="{ chose: checkAll }" @click="handleCheckAll">全选</span>
                            <span class="user-item" v-if="checkAll" v-bind:class="{ chose: !checkAll }" @click="handleCheckAll">取消全选</span>
                    </div>
                      <div>
                        
                       <!--  <Checkbox   v-for="(item,index) in userList" :value="include(item.operator_id)" :key="index" :label="item.operator_id" @on-change="userChange(item.operator_id)"><Icon type="plus-round"></Icon>{{item.name}}</Checkbox> -->
                        <div class="user-item"  v-bind:class="{ chose: include(item.operator_id) }"  v-for="(item,index) in userList" :key="index" @click="userChange(item.operator_id)"><Icon v-if="!include(item.operator_id)" type="plus-round"></Icon>{{item.name}}</div>
                      </div>

                    </div>
                    </transition>
                   <!--  {{list}} -->
        </FormItem>
         <FormItem label="消息类型">
            <Select v-model="formValidate.type" style="width:200px">
                      <Option  :value="0">非必须接受</Option>
                      <Option  :value="1">必须接受</Option>
                      <Option  :value="2">警告</Option>
             </Select>
            
        </FormItem>
        
        <FormItem label="内容" >
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="消息内容..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="send">发送</Button>
         <!--    <Button type="primary" @click="sendAll">群发</Button> -->
            <!-- <Button type="ghost" style="margin-left: 8px">重置</Button>
            <a href="https://www.baidu.com" target="view_window">www.baidu.com</a>
<a href="https://www.baidu.com">www.baidu.com</a>
<a href="http://localhost:8080/#/menu/listmenu" >登录</a> -->
        </FormItem>
    </Form>
  
      <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>确定删除？</p>
    
    </Modal>
  </Card>
</div>
</template>
<script>
import axios from 'axios';
 const url ="wss://authoritymserv.jiayecaifu.com:8023/AuthorityM_Serv/websocket/" 
//const url ="ws://10.2.0.101:8182/AuthorityM_Serv/websocket/";
// const url ="ws://10.2.0.155:8199/AuthorityM_Serv/websocket/" 
var websocket
export default{
  name:'pushMessage',
  data(){
    return{
       data: [{
                    value: 'beijing',
                    label: '人员',
                    children: [
                        {
                            value: 'gugong',
                            label: '人员1'
                        },
                        {
                            value: 'tiantan',
                            label: '人员2'
                        },
                        {
                            value: 'wangfujing',
                            label: '人员3'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '机构',
                    children: [
                        {
                            value: 'nanjing',
                            label: '天津市加也值得科技有限公司哈哈哈哈哈哈哈',
                            
                        },
                        {
                            value: 'suzhou',
                            label: '机构1',
                            
                        }
                    ],
                }],
      indeterminate: false,
      orgList:[],
      roleList:[],
      userList:[],
      show:false,
      list:[],
      checkAll: true,
      sendType:"角色",
      modal1:false,
      formValidate:{
        sendType:"",
        push:"",
        name:"",
        desc:"",
        type:""
      }
      
    }
  },
  methods:{
    ok(){

    },
    xx(a,b){
      console.log("选择的结构",a)
      if(a.length==1){
        return
      }
      this.select(a[1])
      this.show=true
    },
    cancel(){

    },
    include(value){
      if(this.list.indexOf(value)>-1){
        return true
      }else{
        return false
      }
    },
    userChange(value){
     // console.log(value)
      if(this.list.indexOf(value)>-1){
        this.list.splice(this.list.indexOf(value),1)
      }else{
        this.list.push(value)
      }
       if (this.list.length === this.userList.length) {
              this.indeterminate = false;
              this.checkAll = true;
          } else if (this.list.length > 0) {
              this.indeterminate = true;
              this.checkAll = false;
          } else {
              this.indeterminate = false;
              this.checkAll = false;
          }
      
    },
    
    handleCheckAll () {
        if (this.indeterminate) {
            this.checkAll = false;
        } else {
            this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
            console.log("全选")
            for(let i=0; i<this.userList.length; i++){
              this.list.push(this.userList[i].operator_id)
            }
            //this.list = [...this.userList];
        } else {
          console.log("全不选")
            this.list = [];
        }
    },
     select(value){
      let vm = this
      console.log("清空了")
      vm.list=[]
      //console.log(value)
      if(value.indexOf("RL")>-1){
        for(let i=0;i<vm.roleList.length;i++){
          if(value==vm.roleList[i].role_id){
            vm.userList = vm.roleList[i].emp_list
          }
        }
        
      }else{
        //console.log("org")
        for(let i=0;i<vm.orgList.length;i++){
          if(value==vm.orgList[i].org_id){
            vm.userList = vm.orgList[i].emp_list
          }
        }
      }
       for(let i=0; i<this.userList.length; i++){
          this.list.push(this.userList[i].operator_id)
        }
        this.checkAll=true
        this.indeterminate=false
    },
    init(){
                let vm = this;
                let req =  {
                  "jyau_content": {
                    "jyau_reqData": [{
                      "req_no": " AU001201810231521335687"
                    }],
                    "jyau_pubData": {
                      "operator_id": "1",
                      "account_id": "systemman",
                      "ip_address": "10.2.0.116",
                      "system_id": "10909"
                    }
                  }
                }
                //emporg/queryRoleOperator  emporg/queryOrgOperator
                function role(){
                  return new Promise(function(resolve,reject){
                    resolve(axios.post('api/emporg/queryOrgOperator',req).then(function(res){ 
                     console.log("data",res.data)
                    vm.orgList = res.data.jyau_content.jyau_resData[0].orgemp_list
                   
                  // vm.userList=res.data.jyau_content.jyau_resData[0].orgemp_list[0].emp_list
                    }).catch(function(error){
                        console.log(error)
                    }) );
                  })
                   
                }
                 function org(){
                   return new Promise(function(resolve,reject){
                     resolve(axios.post('api/emporg/queryRoleOperator',req).then(function(res){ 
                      console.log("data",res.data)
                    vm.roleList = res.data.jyau_content.jyau_resData[0].roleemp_list
                   
                    }).catch(function(error){
                        console.log(error)
                    }) )
                   })
                    
                }
                function initData(){
                  console.log("initData",vm.roleList,vm.orgList)
                  vm.data=[]
                  let role = {
                    value: 'role',
                    label: '角色',
                    children:[]
                  }
                  for(let i=0; i<vm.roleList.length;i++){
                    let obj ={}
                    obj.value=vm.roleList[i].role_id
                    obj.label=vm.roleList[i].role_name
                    role.children.push(obj)
                  }
                  let org = {
                    value: 'org',
                    label: '机构',
                    children:[]
                  }
                   for(let j=0; j<vm.orgList.length;j++){
                    let obj1 ={}
                    obj1.value=vm.orgList[j].org_id
                    obj1.label=vm.orgList[j].org_name
                    org.children.push(obj1)
                  }
                  vm.data.push(role)
                  vm.data.push(org)
                  console.log("vm.data",vm.data)
                }
              async function init(){
                await role();
                await org();
               initData();
              }
               init()
      },
    send(){
        
        let vm = this
        let json =`OP201805171438586409,OP201805171726129979`

        vm.formValidate.name=vm.list.join(",")
        if(vm.formValidate.name==""){
          return
        }
        vm.formValidate.push=JSON.parse(localStorage.getItem("User")).jyau_content.jyau_resData[0].operator_id
      	if ('WebSocket' in window) {
          websocket = new WebSocket(url + vm.formValidate.push + "/" + vm.formValidate.name+"/"+vm.formValidate.type);
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
            /* console.log("收到消息",JSON.parse(event.data).msgContent)
           if(JSON.parse(event.data).msgType==1){
                    vm.$Notice.info({
                      title: '消息',
                      desc: JSON.parse(event.data).msgContent ,
                      duration: 0
                  }); 
              }else if(JSON.parse(event.data).msgType==0){
                console.log(vm.$parent)
                   // vm.$parent.messageList.push(JSON.parse(event.data))
                    //console.log("event",vm.messageList,JSON.parse(event.data));
              }else if(JSON.parse(event.data).msgType==2){
                  console.log("这是警告消息")
                  vm.$parent.message=JSON.parse(event.data).msgContent
                  vm.$parent.modal=true
              } */
          }
          //连接关闭的回调方法
         websocket.onclose = function() {
            console.log("WebSocket连接关闭");
          }
    },
    sendAll(){
       let vm = this
        vm.formValidate.push=JSON.parse(localStorage.getItem("User")).jyau_content.jyau_resData[0].operator_id
      	if ('WebSocket' in window) {
          websocket = new WebSocket(url+"0/0/"+vm.formValidate.type);
        } else {
          alert('当前浏览器不支持websocket')
          return;
        };
        websocket.onopen = function() {
            vm.startSend();
          }
          //连接发生错误的回调方法
         websocket.onerror = function() {
            console.log("WebSocket连接发生错误");
            return;
          };
          //接收到消息的回调方法
          websocket.onmessage = function(event) {
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
      if(vm.formValidate.desc==""){
        return
      }
      websocket.send(vm.formValidate.desc);
    },
    closeWebScoket(){
      websocket.close();
    }
  },
  mounted(){
    let vm = this
    this.init()
    window.onbeforeunload = function() {
      vm.closeWebSocket();
    }
  }
}  
</script>
<style scoped>
li{
  list-style: none;
}
.fade-enter-active {
  transition: all .2s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
.user-content{
  padding: 5px;
  margin-top: 10px;
  width: 320px;
  background: rgb(245, 247, 249);
  border-radius: 4px;
}
.user-content-header{
  border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;
}
.user-item{
    display: inline-block;
    margin: 3px;
    border-radius: 4px;
    padding: 3px;
}
.chose{
    background-color: #2d8cf0;
    
    /* font-size: 16px; */
    color: #fff;
   
}
</style>

