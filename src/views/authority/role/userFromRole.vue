<template>
  <div>
   <Card class="home-main">
      <p slot="title">
            <Icon type="person"></Icon>
           查询绑定
        </p>
        <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="4"><div> 查询条件</div></th>
            </tr>
            <tr>
                <td><div>登录名称</div></td>
                <td ><div><Input ></Input></div></td>
                <td><div>操作员名称</div></td>
                <td ><div><Input ></Input></div></td>
                
            </tr>
            <tr>
                <td colspan="4">
                  <div>
                    <span>每页显示<Input style="width:60px"></Input></span>
                    <span>查询</span>
                    <span>重置</span>
                  </div>
                 </td>
                
            </tr>
           
        </table>
        
        

        <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="3"><div> 查询结果</div></th>
            </tr>
            <tr>
                <td><div> <Checkbox :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"></Checkbox>选择</div></td>
                <td ><div>登录账号</div></td>
                <td><div>用户姓名</div></td>
               
                
            </tr>
            <tr v-for="(item,index) in list" :key="index" v-if="currentpage-10<=index&&index<currentpage">
                <td><div> <Checkbox v-model="checked[index]" ></Checkbox></div></td>
                <td ><div>{{item.account_id}}</div></td>
                <td><div>{{item.account_name}}</div></td>
                
            </tr>
           
        </table>
        <div style="margin: 10px;">
          <Button @click="linkTO('userBindRole')">新增</Button>
          <Button @click="changeEditable()">关闭</Button>
        </div>
        <div style="text-align: center;margin: 10px;">
          
          <Page :total="list.length" @on-change="pages" ></Page>
          </div>
        
        
   </Card>
</div>
</template>
<script>
import axios from 'axios';
    export default{
      data(){
          return{
              list:[],
              initTable:[],
              indeterminate: true,
              checkAll: true,
              checked:[true,true,true,true,true,true,true,true,true,true],
              ncheckAllGroup: [],
               currentpage:10
             
          }
      },
      methods:{
          changeEditable(){
              console.log("changeEditable")
          },
          linkTO(name){
                let id = this.$route.params.id
                this.$router.push({
                    name:name,
                    params:{id:id}
                })
            },
             pages(page){
                
                this.currentpage = Number(page+"0")
                console.log(this.currentpage)
          },
          change(index){
              console.log(index)
              this.$set(this.editable,index,!this.editable[index])
                  //this.editable[index] = true
              console.log(this.editable)
          },
          handleCheckAll(){
                if (this.indeterminate) {
                    this.checkAll = false;
                } else {
                    this.checkAll = !this.checkAll;
                }
                this.indeterminate = false;

                if (this.checkAll) {
                      for(let i =0;i<this.checked.length;i++){
                        this.checked[i]=true
                      }
                } else {
                    for(let i =0;i<this.checked.length;i++){
                      this.checked[i]=false
                    }
                }
          },
          init(){
              let vm = this;
               let id = this.$route.params.id;
                let req = {
                    "jyau_content": {
                      "jyau_reqData": [
                        {
                          "req_no": "AU002201810231521335687",
                          "role_id": id
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


                axios.post('api/emporg/showRoleUser',req).then(function(res){ 
                     console.log("data",res.data)
                     vm.list = res.data.jyau_content.jyau_resData[0].users_data
                     vm.initTable = res.data.jyau_content.jyau_resData[0].users_data
                       for(let i = 0; i<vm.list.length;i++){
                        vm.checked.push(true)
                        }
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
.content{
    border: #d6caca solid 1px;
    background-color: #fff;
}
</style>

