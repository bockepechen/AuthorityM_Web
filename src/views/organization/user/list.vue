<template>
<div @click="closeTag">
   <Card class="home-main">
       <p slot="title">
            <Icon type="person"></Icon>
            用户管理
        </p>
    <div style="text-align: center;
    margin: 20px;">
      <!-- <div style="display:flex;width:600px;">
        <div style="flex:1">
          <input type="text">
          <span>图标</span>
        </div>
        <div style="flex:1">
          <input type="text">
          <span>图标</span>
        </div>
      </div> -->
      <Input  icon="search" placeholder="请输入登陆账号搜索" v-model="account" @on-change="findAccount" style="width: 300px"></Input>
      <Input  icon="search" placeholder="请输入姓名搜索" v-model="name"  @on-change="findName" style="width: 300px"></Input>
    </div>
    <div>
      <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                  <th><div>登陆账号<Icon type="arrow-down-a"></Icon></div></th>
                 <th><div>用户姓名<Icon type="arrow-down-a"></Icon></div></th>
                 <th><div>热点操作区域</div></th>
             </tr>
            
             <tr v-for="(item,index) in list" :key="index" v-if="currentpage-10<=index&&index<currentpage">
                 
                 <td><div>
                        
                         <span>{{item.account}}</span>
                    </div>
                 </td>
                 <td>
                   <div>
                     
                     <span>{{item.name}}</span>
                    </div>
                   </td>
                 <td>
                     <div @click.stop="showTag(item)"><!-- {{item.operator_id}} --> 点我呀</div>
                     <div class="content" :class="{maxIndex: (item==choose),minIndex:!(item==choose) }"   :id='item'>
                         <div class="circle"></div>
                         <div style="margin-top:20px;">
                             <Button @click.stop="linkTO('insertuser',item.operator_id)">添加</Button>
                            <Button @click.stop="linkTO('updateuser',item.operator_id)">修改</Button>
                              <Button @click.stop="destroy(item)">删除</Button>
                           
                        </div>
                         
                     </div>
                </td>
             </tr>
            
         </table>
    </div>
    <div style="    margin-top: 30px;
    text-align: center;">
      <Page :total="list.length" @on-change="pages" :current="currentpath"></Page>
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
                choose:'',
                modal1: false,
                current:'',
                currentpath:1,
                currentpage:10,
                name:"",
                account:"",
                initTable:[]
                
            }
        },
        methods:{
            init(){
                let vm = this;
                let req =  {
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
                axios.post('api/operator',req).then(function(res){ 
                     //console.log("data",res.data)
                     vm.list = res.data.jyau_content.jyau_resData[0].oper_list
                     vm.initTable = res.data.jyau_content.jyau_resData[0].oper_list
                    }).catch(function(error){
                        console.log(error)
                    }) 
            },
            search (data, argumentObj) {
                let res = data;
                let dataClone = data;
                for (let argu in argumentObj) {
                    if (argumentObj[argu].length > 0) {
                        res = dataClone.filter(d => {
                            return d[argu].indexOf(argumentObj[argu]) > -1;
                        });
                        dataClone = res;
                    }
                }
                return res;
            },
            findAccount(){
                this.currentpage=10
                this.list = this.initTable
                this.list = this.search(this.list, {account: this.account});
            },
            findName(){
                this.currentpage=10
                this.list = this.initTable
                this.list = this.search(this.list, {name: this.name});
            },
            linkTO(name,id){
                this.$router.push({
                    name:name,
                    params:{id:id}
                }) 
            },
            destroy(item){
                let vm = this
                this.modal1 = true
                this.current = item
               
            },
            pages(page){
                
                this.currentpage = Number(page+"0")
                console.log(this.currentpage)
            },
            ok () {
                let vm = this;
                let req = {
                  "jyau_content": {
                    "jyau_reqData": [{
                      "req_no": " AU001201810231521335687"
                    }],
                    "jyau_pubData": {
                      "operator_id": vm.current.operator_id,
                      "account_id": "systemman",
                      "ip_address": "10.2.0.116",
                      "system_id": "10909"
                    }
                  }
                } 
                axios.post('api/operator/deleteOperator',req).then(function(res){vm.init()}).catch(function(error){console.log(error)}) 
         
            },
            cancel () {
                
            },
            closeTag(){
                 this.choose="";
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
            this.init();
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

