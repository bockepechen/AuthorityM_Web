<template>
    <div >
   <Card class="home-main">
        <p slot="title">
            <Icon type="person"></Icon>
            角色管理
        </p>
      <div class="form-content">
           <Form  label-position="left" :label-width="100">
              <FormItem label="角色编号">
                  <Input  v-model="form.code"></Input>
              </FormItem>
              <FormItem label="角色名称">
                  <Input v-model="form.name"></Input>
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
             form:{
               name:'',
               code:""
             } 
          }
      },
      methods:{
        submit(){
          let vm = this
          let req = {
          "jyau_content": {
            "jyau_reqData": [
              {
                "req_no": "AU012201802051125231351",
                "role_id": "",
                "role_code":  vm.form.code,
                "role_name":  vm.form.name,
              }
            ],
            "jyau_pubData": {
              "operator_id": "1",
              "ip_address": "10.2.0.116",
              "account_id": "systemman",
              "system_id": "10909"
            }
          }
        }

          axios.post("api/role/saveRole",req).then(function(res){
              console.log(res.data)
             vm.$Message.success('新建成功!');
          }).catch(function(err){
              vm.$Message.error('新建失败!');
          })
        }
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

