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
             let id = this.$route.params.id;  
            let req = {
                "jyau_content": {
                    "jyau_reqData": [{
                        "req_no": " AU001201810231521335687",
                        "org_id": id,
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
                vm.$Message.success('修改成功!');
                console.log(res.data)
            }).catch(function(error){
                 vm.$Message.error('修改失败!');
                console.log(error)
            }) 
          },
          init(){
              let vm = this
              let id = this.$route.params.id;  
              let req = {
                        "jyau_content": {
                            "jyau_reqData": [
                            {
                                "req_no": "AU005201802051125231351",
                                "org_id": id
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

              axios.post('api/org/showOrg',req).then(function(res){
                  console.log(res.data)
                  vm.form.code=res.data.jyau_content.jyau_resData[0].org_code
                  vm.form.name=res.data.jyau_content.jyau_resData[0].org_name
              }).catch(function(error){

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

