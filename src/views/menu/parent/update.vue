<template>
  <div>
   <Card class="home-main">
      <div class="form-content">
           <Form  label-position="left" :label-width="100">
              <FormItem label="父菜单显示名称">
                 
                   <Select v-model="form.parent_id" style="width:200px">
                    <Option v-for="item in parent" :value="item.mu_id" :key="item.mu_id">{{ item.mu_name}}</Option>
                 </Select>
              </FormItem>
              <FormItem label="菜单名称">
                  <Input v-model="form.name"></Input>
              </FormItem>
               <FormItem label="菜单代码">
                  <Input v-model="form.code"></Input>
              </FormItem>
               <FormItem label="是否子菜单">
                  <Select v-model="form.if_leaf" style="width:200px">
                    <Option v-for="item in status" :value="item.value" :key="item.value">{{ item.name }}</Option>
                 </Select>
              </FormItem>
               <FormItem label="显示顺序">
                  <Input v-model="form.display_order"></Input>
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
               status:[{name:"是",value:"1"},{name:"否",value:"0"}],
              form:{
                  parent_name:"",
                  parent_id:"",
                  display_order:"",
                  if_leaf:"",
                  name:"",
                  code:"",
                   
              },
              parent:[]
          }
      },
      methods:{
          submit(){
            let vm = this
             let id = this.$route.params.id;  
            let req = {

                "jyau_content": {
                    "jyau_reqData": [{
                        "req_no": "AU2018048201802051125231351",
                        "parent_id": vm.form.parent_id,
                        "menu_id":id,
                        "menu_name": vm.form.name,
                        "menu_code": vm.form.code,
                        "if_leaf": vm.form.if_leaf,
                        "display_order": vm.form.display_order,
                        "type": "02"
                    }],
                    "jyau_pubData": {
                        "operator_id": "O201801301417012263",
                        "account_id": "systemman",
                        "ip_address": "10.2.0.116",
                        "system_id": "10909"
                    }
                }
            }

            console.log("数据",req);
            axios.post('api/menu/modifyMenu',req).then(function(res){
                console.log(res.data)
                 vm.$Message.success('修改成功!');
            }).catch(function(error){
                console.log(error)
                 vm.$Message.error('修改失败!');
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
                                "menu_id": id
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

              axios.post('api/menu/displayMenu',req).then(function(res){
                  console.log(res.data)
                  vm.form.parent_id=res.data.jyau_content.jyau_resData[0].parent_id
                  vm.form.parent_name=res.data.jyau_content.jyau_resData[0].parent_name
                  vm.form.display_order=res.data.jyau_content.jyau_resData[0].display_order
                  vm.form.name=res.data.jyau_content.jyau_resData[0].menu_name
                  vm.form.code=res.data.jyau_content.jyau_resData[0].menu_code
                  vm.form.if_leaf=res.data.jyau_content.jyau_resData[0].if_leaf
              }).catch(function(error){

              })
              let req1 = {
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

                axios.post("api/menu",req1).then(function(res){
                    console.log(res.data)
                     vm.parent = res.data.jyau_content.jyau_resData[0].menu_list
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

