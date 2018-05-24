<template>
  <div>
   <Card class="home-main">
      <div class="form-content">
           <Form  label-position="left" :label-width="100">
              <FormItem label="机构代码">
                  <Input v-model="form.code"></Input>
              </FormItem>
              <FormItem label="机构名称">
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
                  name:"",
                  code:""
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
                        "org_id": "",
                        "org_code": vm.form.code,
                        "org_name": vm.form.name,
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
            axios.post('api/org/saveOrg',req).then(function(res){
                console.log(res.data)
                 vm.$Message.success('新建成功!');
            }).catch(function(error){
                vm.$Message.error('新建失败!');
                console.log(error)
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

