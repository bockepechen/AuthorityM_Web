<template>
    <div class="login" >
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="formInline" :rules="rules">
                        <FormItem prop="name">
                            <Input v-model="formInline.name" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="pwd" >
                            <Input :type="type" v-model="formInline.pwd" placeholder="请输入密码" >
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                                <span slot="append" v-if="type=='text'" @click="changetype(type)">
                                    <Icon :size="14" type="eye"></Icon>
                                </span>
                                 <span slot="append" v-if="type=='password'" @click="changetype(type)">
                                    <Icon :size="14" type="eye-disabled"></Icon>
                                </span>
                                
                            </Input>
                           
                        </FormItem>
                        
                        <FormItem>
                            <div id="wrapper">
                                <div id="drag">
                                    <div class="drag_bg" id="drag_bg"></div>
                                    <div id="drag_text" class="drag_text slidetounlock" onselectstart="return false;" unselectable="on">
                                        请按住滑块，拖动到最右边
                                    </div>
                                    <div class="handler handler_bg" id="handler">
                                        <Icon v-if="!isdrag" type="ios-fastforward-outline"></Icon>
                                        <Icon v-if="isdrag" type="checkmark-round" style="color:green"></Icon>
                                        
                                    </div>
                                </div>
                            </div>
                        </FormItem>
                        <FormItem prop="">
                            <Button type="primary" long @click="handleSubmit()">登录</Button>
                        </FormItem>
                    </Form>
                   <!--  <p v-if="formInline.state" class="login-tip">输入用户名和密码即可</p> -->
                    
                </div>
            </Card>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
  export default{
    name:'login',
    data(){
      return{
          type:"password",
          isdrag:false,
         formInline: {
                    name: 'zhangming',
                    pwd: '111111',
                    state:true
                    
                },
          rules: {
              name: [
                  { required: true, message: '用户名不能为空', trigger: 'blur' }
              ],
              pwd: [
                  { required: true, message: '密码不能为空.', trigger: 'blur' }
                  
              ],
              state:[
                  { required: true, message: '用户名密码错误.', trigger: 'blur' }
              ]
          }

      }
    },
    methods:{
        changetype(item){
            let vm =this
            if(item=="password"){
                vm.type="text"
            }else{
               vm.type="password"
            }
            
        },
      handleSubmit(name) {
        this.$refs.loginForm.validate((valid) => {
             if (!valid){return  }
        })
        let vm = this
        if(!vm.isdrag){
            return
        }
        
        //systemman，6fdefAERTYP
        let req = {
            "jyau_content": {
                "jyau_reqData": [{
                    "req_no": " AU001201810231521335687",
                    "account_pwd": vm.formInline.pwd
                }],
                "jyau_pubData": {
                    "operator_id": "",
                    "account_id": vm.formInline.name,
                    "ip_address": "10.2.0.116",
                    "system_id": "10909"
                }
            }
        }


         axios.post('api/login',req)
        .then(function(res){
            console.log(res)
            if(res.data.jyau_content.jyau_resHead.return_code=="0000"){
                
                localStorage.setItem("UserName",vm.formInline.name);
                localStorage.setItem("User",JSON.stringify(res.data));

                vm.$router.push({
                    name: 'home_index'
                });
            }else{
              vm.$Message.error('登陆失败!');
             /*   vm.$router.push({
                    name: 'home_index'
                }); */
            }
        
        
        })
        .catch(function(error){
            console.log(error)
        })    

       },
       init(){
           let vm = this
           let handler = document.getElementById("handler");
           let drag = document.getElementById("drag")
           let drag_bg =  document.getElementById("drag_bg");
           let text =  document.getElementById("drag_text");
           let isMove = false
           let x 
          let maxWidth = 232;  //能滑动的最大间距
          handler.addEventListener("mousedown",function(e){
              
              isMove = true;
              x = e.pageX - parseInt(handler.offsetLeft);
             
             
          })
          function mousemove(e){
              let _x = e.pageX - x;
             
              if (isMove) {
                    if (_x > 0 && _x <= maxWidth) {
                        
                        handler.style.left= _x+"px"
                        drag_bg.style.width= _x+"px"
                    } else if (_x > maxWidth) {  //鼠标指针移动距离达到最大时清空事件
                        dragOk();
                    }
                }

          }
          /* handler.addEventListener("mousemove",function(e){
              
              let _x = e.pageX - x;
              console.log(_x)
              if (isMove) {
                    if (_x > 0 && _x <= 232) {
                        console.log("执行了")
                        handler.style.left= _x+"px"
                        drag_bg.style.width= _x+"px"
                    } else if (_x > 232) {  //鼠标指针移动距离达到最大时清空事件
                        dragOk();
                    }
                }
          }) */
          handler.addEventListener("mousemove",mousemove)
          handler.addEventListener("mouseup",function(e){
               
               isMove = false;
                let _x = e.pageX - x;
                if (_x < maxWidth) { //鼠标松开时，如果没有达到最大距离位置，滑块就返回初始位置
                    
                   
                     handler.className="handler handler_bg button_move"
                     handler.style.left= 0+"px"
                     
                     setTimeout(function(){ 
                         handler.className="handler handler_bg"
                     },550); 
                   
                   drag_bg.className="drag_bg bg_move"
                   drag_bg.style.width= 0+"px"
                     setTimeout(function(){ 
                         drag_bg.className="drag_bg"
                     },550); 
                    
                }
          })
          function dragOk(){
             
              vm.isdrag=true
             
              handler = "handler handler_ok_bg" 
              text.className ="drag_text"
              text.innerHTML="验证通过";
              text.style.color = "#fff"
             /*  handler.style.left=232+"px"
              drag_bg.style.width=232+"px" */
              
              /* handler.removeEventListener('mousedown',function(){
                   event.preventDefault();  
              });
              handler.removeEventListener('mousemove',mousemove);
              handler.removeEventListener('mouseup',function(){
                  event.preventDefault();  
              }); */
          }


       }
    },
    mounted(){
        this.init();
    }
  }
  
</script>
<style scoped>
header{
    font-size: 16px;
    font-weight: 300;
    text-align: center;
    padding: 30px 0;
}
.form-con{
    padding: 10px 0 0;
}
.login-tip{
    font-size: 10px;
    text-align: center;
    color: #c3c3c3;
}
.login-con{
    position: absolute;
    right: 160px;
    top: 50%;
    transform: translateY(-60%);
    width: 300px;

}
.login{
width: 100%;
height: 100%;
background-image: url('https://file.iviewui.com/iview-admin/login_bg.jpg');
background-size: cover;
background-position: center;
position: relative;
}
.slidetounlock{
    font-size: 12px;
    background:-webkit-gradient(linear,left top,right top,color-stop(0,#4d4d4d),color-stop(.4,#4d4d4d),color-stop(.5,#fff),color-stop(.6,#4d4d4d),color-stop(1,#4d4d4d));
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    -webkit-animation:slidetounlock 3s infinite;
    -webkit-text-size-adjust:none
 }
 @-webkit-keyframes slidetounlock{0%{background-position:-200px 0} 100%{background-position:200px 0}}
#drag{
    position: relative;
    background-color: #e8e8e8;
    width: 270px;
    height: 34px;
    line-height: 34px;
    text-align: center;
}
#drag .handler{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 34px;
    border: 1px solid #ccc;
    cursor: move;
}
.handler_bg{
    background: #fff
}
.handler_ok_bg{
    background: #fff 
}
#drag .drag_bg{
    background-color: #2d8cf0;
    height: 34px;
    width: 0px;
}
#drag .drag_text{
    position: absolute;
    top: 0px;
    width: 270px;
    color:#9c9c9c;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select:none;
    -ms-user-select:none;

    font-size: 12px;     
}
.button_move{
    transition: left  .5s;
}
.bg_move{
    transition: width .5s
}
</style>
