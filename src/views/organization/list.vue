<template>
<div @click="closeTag">
   <Card class="home-main">
       <p slot="title">
            <Icon type="person"></Icon>
            机构管理
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
      <Input  icon="search" placeholder="输入机构代码搜索" style="width: 300px"></Input>
      <Input  icon="search" placeholder="收入机构名称搜索" style="width: 300px"></Input>
    </div>
    <div>
      <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                  <th><div>公司代码<Icon type="arrow-down-a"></Icon></div></th>
                 <th><div>公司名称<Icon type="arrow-down-a"></Icon></div></th>
                 <th><div>操作</div></th>
             </tr>
            
             <tr v-for="(item,index) in list" :key="index">
                 
                 <td><div>
                        <!-- <Input v-show="editable[index]==true" v-model="list[index]" @keyup.enter="changeEditable"></Input> -->
                        <!--  <span v-show="editable[index]==false"  >{{item.org_code}}</span> -->
                        <span>{{item.org_code}}</span>
                    </div>
                 </td>
                 <td>
                   <div>
                     
                     <span>{{item.org_name}}</span>
                    </div>
                   </td>
                 <td>
                     <div  ref="div" @click.stop="showTag(item)">点我呀</div>
                     <div class="content" :class="{maxIndex: (item==choose),minIndex:!(item==choose) }"   :id='item'>
                         <div class="circle"></div>
                         <div style="margin-top:20px;">
                             <Button @click.stop="linkTO('insertorganization',item.org_id)">添加</Button>
                             <Button @click.stop="linkTO('updateorganization',item.org_id)">修改</Button>
                             <Button @click.stop="destroy(item)">删除</Button>
                             <Button style="margin-top:5px" @click.stop="linkTO('otoUser')">添加机构人</Button>
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
                list:['a','b','c','d','e','f','g','h','i','j'],
                editable:[false,false,false,false,false,false,false,false,false,false,false],
                choose:'',
                current:'',
                modal1: false
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
            change(index){
                
                this.$set(this.editable,index,!this.editable[index])
                
                
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
    width:270px;height:100px;background-color:#fff;box-shadow: 0 1px 6px rgba(0,0,0,.2);border-radius: 20px;position: absolute; 
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

