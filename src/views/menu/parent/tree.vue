<template>
<div style="display:flex">
  <div style="flex:1;overflow-y: scroll;height:800px"> 
      <Input style="width:200px" v-model="title" ></Input>
       <ztreeItem :tree="yy" ref="trees" :searchname="title"></ztreeItem>
          
        
     
  </div>
  <div style="flex:1;padding:15px"> 
     <div style="text-align: center;margin: 20px;">
     <Input  icon="search" placeholder="请输入用户名称搜索"   v-model="tabletitle"  style="width: 600px"></Input>
    <!--  <input type="text" v-model="tabletitle" @change="findname()" placeholder="请输入用户名称搜索"> -->
    </div>
    <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
           <tr>
                <th><div>用户账号</div></th>
                <th><div>用户名称</div></th>
                
            </tr>
            <tr v-for="(item,index) in list" :key="index"  :class="{td_show:currentpage-10<=index&&index<currentpage,td_hidden:!(currentpage-10<=index&&index<currentpage)}"  >
           <!--    :class="{td_show:currentpage-10<=index&&index<currentpage,td_hidden:!(currentpage-10<=index&&index<currentpage)}" -->
                <td >
                    <div>
                        
                         <span   >{{item.account}}</span>
                    </div>
                </td >
                <td  draggable='true' @dragstart='dragStart' @dragenter='dragEnter' @dragover="dragover" @dragend='dragEnd' :data-name="item.name" :data-id="item.operator_id" style="cursor: pointer;"><div>{{item.name}}</div></td>
               
            </tr>
        </table>
         <div style="margin-top: 30px;text-align: center;">
         <Page :total="list.length" @on-change="pages" ></Page>
        </div>
  </div>
</div>
</template>
<script>
import ztreeItem from "@/views/menu/parent/childtree"
import axios from 'axios';

  export default{
    name:'tree',
    
    data(){
      return{
         list:[],
         initTable:[],
         title:"",
         currentpage:10,
         tabletitle:"",
         tableshow:[],
         store: null,
         root: null,
         
      }
    },
    props:{
      tree:{}
    },
    computed:{
       yy(){
          return this.$store.state.app.tree
        }
    },
    watch:{
      tabletitle:function(){
         let vm = this
         this.currentpage=10
         this.list = this.initTable
         this.list = vm.search(vm.list, {name: vm.tabletitle});
      }
    },
    components:{
      ztreeItem
    },
    methods:{
       init(){
                //右侧用户数据初始化
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
      findname(){
      /*   console.log("findname",this.tabletitle)
         let vm = this
         this.currentpage=10
         this.list = this.initTable
         this.list = vm.search(vm.list, {name: vm.tabletitle}); */
        
          
      },
      search(data, argumentObj) {
       //  console.log("search",this.tabletitle)
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
       pages(page){
                
               this.currentpage = Number(page+"0")
               
        },
     
      dragStart(e){
          e.dataTransfer.effectAllowed = "move";
          console.log(e.target.Class)
          //e.target.className ="sortable-ghost"
          e.dataTransfer.setData("Text", e.target.dataset.name);
          let tab = {}
          tab.name = e.target.dataset.name
          tab.id = e.target.dataset.id
          this.$store.commit("setrighttable",tab)
         
      },
      dragEnter(e){
        //sortable-ghost
        event.preventDefault();
        e.target.className="sortable-ghost"
       
         console.log("进去了",e.target.style)
       // console.log("我进去了",e.target)
       return true;
      },
      dragover(e) {
        e.preventDefault();
        return true;
      },
      dragEnd(e){
         e.target.className =""
         let vm = this;
              
        let root = this.$store.state.app.tree
        let from = this.$store.state.app.righttable
        let to = this.$store.state.app.leftli
        let dataset={name:from.name,id:from.id,open:true,searchopen:true};
        console.log("from",from)
         /* 拖拽到机构判断是否重复 */
              if(to.parent_name=="myTree"){
               
                for(let i=0;i<root.children.length;i++){
                   if(to.child_id==root.children[i].id){
                    
                      for(let j=0; j<root.children[i].children.length; j++){
                        
                        if(from.id==root.children[i].children[j].id){
                          console.log("机构去重复")
                          return
                        }
                      }
                   }
                 
                  
                }
              }
        if(to.parent_name=="myTree"){
           for(let i=0;i<root.children.length;i++){
           if(to.child_id==root.children[i].id){
              root.children[i].children.push(dataset)
               //异步修改数据
              let itemdata =[]
              itemdata.push(from.id)
              this.addData(to.child_id,itemdata)
            }
            
        } 
          return
        }
         /* 拖拽到人员判断是否重复 */
              for(let i=0;i<root.children.length;i++){
                if(to.parent_id==root.children[i].id){
                   for(let j=0;j<root.children[i].children.length;j++){
                     if(from.id==root.children[i].children[j].id){
                       console.log("有重复的")
                       return
                     }
                   }
                }
              }
          for(let i=0;i<root.children.length;i++){
           if(to.parent_id==root.children[i].id){
              root.children[i].children.push(dataset)
               //异步修改数据
              let itemdata =[]
              itemdata.push(from.id)
              this.addData(to.parent_id,itemdata)
            }
            
        } 
       
         this.$store.commit("settree",root)
         this.$store.commit("setrighttable","")
         this.$store.commit("setleftli","")
         //return false
      },
      addData(org_id,oper_ids){
               let vm = this
               let org =org_id
               let oper =oper_ids
               let req =   {
                            "jyau_content": {
                                "jyau_reqData": [{
                                    "req_no": "AU002201810231521335687",
                                    "org_id": org,
                                    "oper_ids": oper
                                }],
                                "jyau_pubData": {
                                    "operator_id": "1",
                                    "ip_address": "10.2.0.116",
                                    "account_id": "systemman",
                                    "system_id": "10909"
                                }
                            }
                        }
                
                axios.post("api/emporg/addOperator",req).then(function(res){
                    console.log(res.data)
                    
                }).catch(function(error){
                   
                    console.log(error)
                })
          },
      

    },
    
    mounted(){
     this.init();
    },
    
  }  
</script>
<style>
.sortable-ghost {
 /*  opacity: .2; */
  cursor: pointer;
}
.ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
.td_hidden{
  display: none;
}
.td_show{
  display: table-row;
}
</style>

