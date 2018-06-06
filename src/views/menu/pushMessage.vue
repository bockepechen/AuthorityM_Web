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
            <Input v-model="formValidate.name" placeholder="收件人姓名"></Input>
        </FormItem>
         <FormItem label="消息类型">
            <Input v-model="formValidate.type" placeholder="0 不是必须接收，1是必须接收"></Input>
        </FormItem>
        
        <FormItem label="内容" >
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 5,maxRows: 5}" placeholder="消息内容..."></Input>
        </FormItem>
        <FormItem>
            <Button type="primary" @click="send">发送</Button>
            <Button type="primary" @click="sendAll">群发</Button>
            <Button type="ghost" style="margin-left: 8px">重置</Button>
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

 const url ="wss://authoritymserv.jiayecaifu.com:8023/AuthorityM_Serv/websocket/" 
//const url ="ws://10.2.0.101:8182/AuthorityM_Serv/websocket/";
// const url ="ws://10.2.0.155:8199/AuthorityM_Serv/websocket/" 
var websocket
export default{
  name:'pushMessage',
  data(){
    return{
      modal1:false,
      formValidate:{
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
    cancel(){

    },
    send(){
        
        let vm = this
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
            console.log("event",event,event.data);
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
      websocket.send(vm.formValidate.desc);
    },
    closeWebScoket(){
      websocket.close();
    }
  },
  mounted(){
    let vm = this
    window.onbeforeunload = function() {
      vm.closeWebSocket();
    }
  }
}  
</script>
<style scoped>

</style>

