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
                  type:"02",
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
                        "type": "02"
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
            }).catch(function(error){
                console.log(error)
            })  
        }, 
        init(){
            let vm = this
            let id = this.$route.params.id;  
            //console.log(id)
            let req = {
                    "jyau_content": {
                      "jyau_reqData": [{
                        "req_no": " AU001201810231521335687"
                      }],
                      "jyau_pubData": {
                        "operator_id": id,
                        "account_id": "systemman",
                        "ip_address": "10.2.0.116",
                        "system_id": "10909"
                      }
                    }
                  }

          axios.post('api/operator/displayOperator',req).then(function(res){
              vm.form.account=res.data.jyau_content.jyau_resData[0].account;
              vm.form.name=res.data.jyau_content.jyau_resData[0].name;
              vm.form.pwd=res.data.jyau_content.jyau_resData[0].pwd;
              vm.form.status=(res.data.jyau_content.jyau_resData[0].status=="正常")?"01":"02";
              vm.form.ifAdmin=(res.data.jyau_content.jyau_resData[0].ifAdmin=="1")?false:true;
              console.log(res.data,vm.form)
              }).catch(function(error){
                  console.log(error)
                  })

        }
      },
      mounted(){
          this.init()
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

