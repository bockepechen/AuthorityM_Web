<template>
    <div class="login" >
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" >
                        <FormItem prop="userName">
                            <Input v-model="formInline.user" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" long @click="handleSubmit()">登录</Button>
                        </FormItem>
                    </Form>
                    <p class="login-tip">输入任意用户名和密码即可</p>
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
         formInline: {
                    user: 'admin',
                    password: 'admin'
                },
          ruleInline: {
              user: [
                  { required: true, message: 'Please fill in the user name', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                  { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
              ]
          }

      }
    },
    methods:{
      handleSubmit(name) {
        localStorage.setItem("UserName", 'admin');
        this.$router.push({
            name: 'home_index'
        });
        let req = {
	"jyau_content": {
		"jyau_reqData": [{
			"req_no": " AU001201810231521335687",
			"account_pwd": "6fdefAERTYP"
		}],
		"jyau_pubData": {
			"oprator_id": "",
			"account_id": "systemman",
			"ip_address": "10.2.0.116",
			"system_id": "10909"
		}
	}
}
//JSON.parse(req)
        /*  axios.post('api/api',req)
        .then(function(res){
        
       console.log(res.data)
        
        })
        .catch(function(error){
        console.log(error)
        })   */  

       }
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
position: relative;}
</style>
