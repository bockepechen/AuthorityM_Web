<template>
  <div>
   <Card class="home-main">
      <div class="form-content">
           <Form  label-position="left" :label-width="100">
              <FormItem label="登陆账号">
                  <Input v-model="form.account"></Input>
              </FormItem>
              <FormItem label="用户姓名">
                  <Input v-model="form.name"></Input>
              </FormItem>
               <FormItem label="登录密码">
                  <Input v-model="form.pwd" type="password"></Input>
              </FormItem>
               <FormItem label="用户状态">
                  <Select v-model="form.status" style="width:200px">
                      <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
              </FormItem>
               <FormItem label="">
                 <Checkbox v-model="form.ifAdmin">是否是管理员</Checkbox>
              </FormItem>
             
          </Form>
      </div>
      <div class="control">
          <Button @click="submit">保存</Button>
          <Button>取消</Button>
      </div>
     </Card>
</div>
</template>
<script>
import axios from 'axios';
    export default{
      data(){
          return{
              list:['男','女'],
              status:[{name:"正常",value:"01"},{name:"注销",value:"02"}],
              form:{
                  account:"",
                  name:"",
                  pwd:"",
                  status:"",
                  ifAdmin:false,
                  type:"01",
              }
          }
      },
      methods:{
        submit(){
            
            let vm = this
            let req = {
                "jyau_content": {
                    "jyau_reqData": [{
                        "req_no": " AU001201810231521335687",
                        "account": vm.form.account,
                        "name": vm.form.name,
                        "pwd": vm.form.pwd,
                        "status": vm.form.status,
                        "ifAdmin": vm.form.ifAdmin?"1":"0",
                        "type": "01"
                    }],
                    "jyau_pubData": {
                        "operator_id": "1",
                        "account_id": "systemman",
                        "ip_address": "10.2.0.116",
                        "system_id": "10909"
                      }
                    }
             }
            console.log("数据",req);
            axios.post('api/operator/modifyOperator',req).then(function(res){
                console.log(res.data)
                vm.$Message.success('新建成功!');
            }).catch(function(error){
                this.$Message.error('新建失败!');
                vm.log(error)
            })  
        }, 
      }
    }
</script>
<style scoped>
.control{
    width: 120px;
    margin: 42px auto;
}
.content{
    border: #d6caca solid 1px;
    background-color: #fff;
}
.form-content{
      width: 50%;
    margin: 40px auto;
}
</style>

