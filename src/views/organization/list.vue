<template>
<div @click="closeTag">
   <Card class="home-main">
       <p slot="title">
            <Icon type="person"></Icon>
            机构管理
        </p>
    <div class="home-head">
      <Input  icon="search" placeholder="输入机构代码搜索" v-model="code" @on-change="findCode()" style="width: 300px"></Input>
       <Input  icon="search" placeholder="收入机构名称搜索" v-model="name" @on-change="findName()" style="width: 300px"></Input>
       <Button type="primary" @click.stop="linkTO('insertorganization')">添加</Button>
    </div>
    <div>
      <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                  <th><div>公司代码</div></th>
                 <th><div>公司名称</div></th>
                 <th><div>操作</div></th>
             </tr>
            
             <tr v-for="(item,index) in list" :key="index" v-if="currentpage-10<=index&&index<currentpage">
                 
                 <td><div>
                     
                        <span>{{item.org_code}}</span>
                    </div>
                 </td>
                 <td>
                   <div>
                     
                     <span>{{item.org_name}}</span>
                    </div>
                   </td>
                 <td>
                     <div  ref="div" @click.stop="showTag(item)"><Icon type="settings" size="22"></Icon></div>
                     <div class="content" :class="{maxIndex: (item==choose),minIndex:!(item==choose) }"   :id='item'>
                         <div class="circle"></div>
                         <div style="margin-top:20px;">
                            
                             <Button type="primary" @click.stop="linkTO('updateorganization',item.org_id)">修改</Button>
                             <Button type="primary" @click.stop="destroy(item)">删除</Button>
                             <Button type="primary" @click.stop="linkTO('otoUser',item.org_id)">添加机构人</Button>
                        </div>
                         
                     </div>
                </td>
             </tr>
            
         </table>
    </div>
    <div class="page-content" >
      <Page :total="list.length" @on-change="pages" ></Page>
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
import Util from '@/libs/util';
import axios from 'axios';
  export default{
    data(){
            return{
                list:[],
                initTable:[],
                editable:[false,false,false,false,false,false,false,false,false,false,false],
                choose:'',
                current:'',
                modal1: false,
                currentpage:10,
                code:"",
                name:""
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
                axios.post('api/org',req).then(function(res){ 
                     console.log(res.data)
                     vm.list = res.data.jyau_content.jyau_resData[0].org_data
                      vm.initTable = res.data.jyau_content.jyau_resData[0].org_data
                    }).catch(function(error){
                        console.log(error)
                        }) 
            },
            changeEditable(){
              console.log("修改后的回车事件")
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
             findCode(){
                console.log("findCode")
                let vm = this
                this.currentpage=10
                this.list = this.initTable
                this.list = Util.search(vm.list, {org_code: vm.code});
            },
            findName(){
                let vm = this
                this.currentpage=10
                this.list = this.initTable
                this.list = Util.search(vm.list, {org_name: vm.name});
            },
            change(index){
                
                this.$set(this.editable,index,!this.editable[index])
                
                
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
    width:270px;height:70px;background-color:#fff;box-shadow: 0 1px 6px rgba(0,0,0,.2);border-radius: 4px;position: absolute; 
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
.home-head{
    text-align: center; margin: 20px;
}
.page-content{
    margin-top: 30px;
    text-align: center;
}
</style>

