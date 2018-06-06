<template>
<div>
   <Card class="" style="max-width:1200px">
      <p slot="title">
            <Icon type="person"></Icon>
            机构管理
        </p>
    <div style="display:flex">
      <div style="flex:1" >
     
      <tree ></tree>
      </div>
      
    </div>
   
  </Card>
</div>
</template>
<script>
import axios from 'axios';
import tree from "@/views/menu/parent/tree.vue"
let fromData = ''
let toData=""
 export default{
   data(){
     return{
      
     }
   },
   computed:{
    

   },
   components:{
     tree
   },
   
   mounted(){
     this.init();
   },
   methods:{
     init(){
       let vm = this
        let req =   {
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
        axios.post('api/emporg',req).then(function(res){
          let value=res.data.jyau_content.jyau_resData[0]
          let obtTree={}
            obtTree.name="myTree"
              obtTree.searchopen=true
              obtTree.expanded=false
              obtTree.children=[]
              for(let i =0;i<(value.orgemp_list.length-1);i++){
                let obj={}
                obj.name=value.orgemp_list[i].org_name
                obj.open=true
                obj.searchopen=true
                obj.expanded=false
                obj.id=value.orgemp_list[i].org_id
              
                if(value.orgemp_list[i].emp_list){
                  obj.children=[]
                  for(let j=0;j<value.orgemp_list[i].emp_list.length;j++){
                    let child = {}
                    child.name=value.orgemp_list[i].emp_list[j].name
                    child.open=true
                    child.searchopen=true
                    child.expanded=false
                    child.id=value.orgemp_list[i].emp_list[j].operator_id
                    obj.children.push(child)
                  }
                }
                obtTree.children.push(obj)
              }
          vm.$store.commit("settree",obtTree)
          vm.yy=vm.$store.state.app.tree
        })
    
     }
     
    
   }
   
 } 
</script>
<style scoped>

</style>
