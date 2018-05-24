<template>
<div style="display:flex">
  <div style="flex:1;overflow-y: scroll;height:800px"> 
      <Input style="width:200px" v-model="title" ></Input>
       
          <ztreeItem :tree="yy" ref="trees" :searchname="title"></ztreeItem>
          
        
     
  </div>
  <div style="flex:1"> 
    <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="2"><div> 用户查询条件</div></th>
            </tr>
            <tr>
                <td><div>用户名称</div></td>
                <td><div><Input style="width:200px" v-model="tabletitle" :on-change="tabletitlechange()"></Input></div></td>
                
            </tr>
            <tr>
                <td colspan="2"><div>用户查询结果</div></td>
                
            </tr>
            <tr>
                <td><div>用户账号</div></td>
                <td><div>用户名称</div></td>
                
            </tr>
            <tr v-for="(item,index) in list" :key="index" draggable='true'  @dragstart='dragStart' @dragenter='dragEnter' @dragend='dragEnd' :data-name="item.name" >
                <td   >
                    <div>
                        
                         <span >{{item.account}}</span>
                    </div>
                </td>
                <td><div>{{item.name}}<!-- <div @click="mtm(item.operator_id)">{{item.operator_id}}绑定机构</div> --></div></td>
               
            </tr>
        </table>
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
      tabletitlechange(){
        let vm = this
         this.list = this.initTable
        // this.list = this.search(this.list, {name: this.name});
          
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
      dragStart(e){
          e.dataTransfer.effectAllowed = "move";
          
          e.dataTransfer.setData("item", e.target);
          let tab = {}
          tab.name = e.target.dataset.name
          tab.id = e.target.dataset.id
          this.$store.commit("setrighttable",tab)
      },
      dragEnter(e){
        
        console.log("我进去了",e.target)
      },
      mtm(userid){
        let vm = this
        let req = {
            "jyau_content": {
              "jyau_reqData": [{
                "req_no": " AU001201810231521335687",
                "org_id": "OG201805240947521098"
              }],
              "jyau_pubData": {
                "operator_id": userid,
                "account_id": "systemman",
                "ip_address": "10.2.0.116",
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
      dragEnd(e){
         let vm = this;
              
        let root = this.$store.state.app.tree
        let from = this.$store.state.app.righttable
        let to = this.$store.state.app.leftli
        let dataset={name:from.name,id:from.id,open:true,searchopen:true};
        
          for(let i=0;i<root.children.length;i++){
           if(to.parent_id==root.children[i].id){
              root.children[i].children.push(dataset)

           }
            
        } 
        
        this.$store.commit("settree",root)
         this.$store.commit("setrighttable","")
         this.$store.commit("setleftli","")
      },
      order(from,to){
          let vm = this;
          //this.check(from,to);
          console.log("from",from,"to",to)
        

      },

    },
    created(){
      
    },
    mounted(){
      this.$on("oxxe",function(){
        console.log("xxx")
      })
      this.init();
      

    },
    components:{
      ztreeItem
    }
  }  
</script>
<style>

.ul {
  padding-left: 1em;
  line-height: 1.5em;
  list-style-type: dot;
}
</style>

