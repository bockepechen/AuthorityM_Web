<template>
<div @click="closeTag">
   <Card class="home-main">
        <p slot="title">
            <Icon type="person"></Icon>
           用户-角色管理
        </p>
    <div style="text-align: center;
    margin: 20px;">
     <Input  icon="search" placeholder="请输入角色名称搜索" style="width: 600px"></Input>
    </div>
    <div>
      <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                  <th><div>角色编号<Icon type="arrow-down-a"></Icon></div></th>
                 <th><div>角色名称<Icon type="arrow-down-a"></Icon></div></th>
                 <th><div>热点操作区域</div></th>
             </tr>
            
             <tr v-for="(item,index) in list" :key="index">
                 
                 <td><div>
                       
                         <span >{{item.role_code}}</span>
                    </div>
                 </td>
                 <td>
                   <div>
                    
                     <span >{{item.role_name}}</span>
                    </div>
                   </td>
                 <td>
                     <div @click.stop="showTag(item)">点我呀</div>
                     <div class="content" :class="{maxIndex: (item==choose),minIndex:!(item==choose) }"   :id='item'>
                         <div class="circle"></div>
                         <div style="margin-top:20px;">
                            <Button @click.stop="linkTO('userFromRole',item.role_id)">详情</Button>
                        </div>
                         
                     </div>
                </td>
             </tr>
            
         </table>
    </div>
    <div style="    margin-top: 30px;
    text-align: center;">
      <Page :total="100"></Page>
    </div>
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
import axios from 'axios';
  export default{
    data(){
            return{
                list:[],
                editable:[false,false,false,false,false,false,false,false,false,false,false],
                choose:'',
                modal1: false
            }
        },
        methods:{
            init(){
                let vm = this
                let req = {
                    "jyau_content": {
                        "jyau_reqData": [
                        {
                            "req_no": "AU011201810231521335687"
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

                axios.post("api/role",req).then(function(res){
                    console.log(res.data)
                    vm.list = res.data.jyau_content.jyau_resData[0].role_data
                }).catch(function(){

                })
            },
            changeEditable(){
              console.log("修改后的回车事件")
            },
            gonext(value){
                this.$router.push({
                    name:value
                })
            },
            change(index){
                
                this.$set(this.editable,index,!this.editable[index])
                
                
            },
            destroy(item){
                let vm = this
                this.modal1 = true
               // this.list.splice(vm.list.indexOf(item),1)
            },
            closeTag(){
                 this.choose="";
            },
            ok () {
                let vm = this;
                let req = {
                  "jyau_content": {
                    "jyau_reqData": [{
                      "req_no": " AU001201810231521335687",
                      "org_id": vm.current.org_id
                    }],
                    "jyau_pubData": {
                      "operator_id": "1",
                      "account_id": "systemman",
                      "ip_address": "10.2.0.116",
                      "system_id": "10909"
                    }
                  }
                } 
                axios.post('api/org/delOrg',req).then(function(res){vm.init()}).catch(function(error){console.log(error)}) 
         
            },
            cancel () {
                
            },
            linkTO(name,id){
                this.$router.push({
                    name:name,
                    params:{id:id}
                })
            },
            showTag(item){
                var box=document.getElementById(item);       
                if(this.choose==item){
                    this.choose=""
                     
                }else{
                    this.choose=item
                   
                }
                let distance = box.getBoundingClientRect();
                let width = document.body.clientWidth;
                let height = document.body.clientHeight;
                
                if(distance.bottom>height){
                    
                    let y = box.offsetTop-box.offsetHeight-30
                    box.style.top=y+"px"
                    
                } 
                if(distance.right>document.body.clientWidth){
                    let x = box.offsetLeft-box.offsetWidth
                    box.style.left=x+"px"
                }
                 
                

                
            }
        },
        mounted(){
             this.init()
        }

  }
</script>
<style scoped>
.maxIndex{
z-Index:10
}
.minIndex{
z-Index:-999
}
.content{
    width:270px;height:70px;background-color:#fff;box-shadow: 0 1px 6px rgba(0,0,0,.2);border-radius: 20px;position: absolute; 
}
.circle{
  bottom: 3px;
    border-width: 5px 5px 0;
    border-top-color: hsla(0,0%,85%,.5);
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-color: transparent;
    border-style: solid;
        border-width: 6px;
}
</style>

