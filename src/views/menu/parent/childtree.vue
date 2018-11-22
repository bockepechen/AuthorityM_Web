<template>


  <ul class="ul">
     
        <li :data-name="i.name" v-for="(i, m) in tree.children" :key="m" class="item"  :class="{'tree-hidden':!i.searchopen,'tree-block':i.expanded }">
          <div style="cursor: pointer;cursor-move:pointer" @click="toggle(m)" draggable='true' @dragover="dragover" @dragstart='dragStart'  @dragenter='dragEnter' @dragleave='dragLeave' @drop='drop' @dragend.prevent='dragEnd' :data-name="i.name" :data-id="i.id">
           <span v-if="!i.children" @click.stop="removeItem(i)" ><Icon type="ios-minus" style="color:red"></Icon></span> 
            {{i.name}}

            <Icon type="arrow-right-b" v-if="(!i.open)&&i.children"></Icon>
            <Icon type="arrow-down-b" v-if="i.open&&i.children"></Icon>
            
          </div>
         
     
          
         <span v-if="i.open">
          <!--  <treeNode :tree="i" :searchname="childrentitle"></treeNode>  -->
           
              <treeNode :tree="i" ></treeNode>
         
          </span>
           
        </li>
        <div>
          
        </div>
  </ul>

  
 
</template>
<script>
import axios from 'axios';
let fromData = {}
let toData={}
 export default{
        name:'treeNode',
       
        data(){
          return{
          }
        },
        props:{
          tree:{},
          searchname:""

        },
        computed:{
          isFolder: function () {
              return this.tree.children.children &&
                this.tree.children.children.length
            },
          childrentitle:function(){
            return this.searchname
          }
        },
        watch:{
          searchname:function(){
             let vm = this;
             
             if(vm.searchname==""){
               if(vm.tree.children){
                  vm.tree.children.forEach((child) => {
                   child.searchopen=true 
                    vm.tree.expanded=false
                 })
               }
             }else{
              
               if(vm.tree.children){
                   vm.tree.children.forEach((child) => {
                      child.searchopen=true 
                      vm.tree.expanded=false
                  })
                    
                  vm.tree.children.forEach((child) => {
                   
                    if(child.name.indexOf(vm.searchname)>-1){
                      child.searchopen=true 
                      vm.tree.expanded=true  
                      
                      //console.log("当前",child.name,"是否应该显示",child.searchopen,"当前父类",vm.tree.name)
                    }else{
                      child.searchopen=false 
                      //console.log("else",child.name,"是否应该显示",child.searchopen)
                    }

                  });
                 
                
               }
             
           

             }
           
          }
        },
        methods:{
          seachenameul(){
            
               
          },
          
          toggle: function (m) {
           
            let vm = this
            vm.tree.children[m].open = !vm.tree.children[m].open
             //console.log("展开",m,vm.tree.children[m].open)
           
          },
          search(name){
            //console.log("search")
            let vm = this;
            for(let i=0;i<vm.tree.children.length;i++){
                if(vm.tree.children[i].name.indexOf(name)>-1){
                  vm.open[i] = true
                }
            }
            
          },
          dragStart(e){
            //拖拽效果
            e.dataTransfer.effectAllowed = "move";
            fromData.child_name = e.target.dataset.name
            fromData.child_id = e.target.dataset.id
            fromData.parent_name = this.tree.name
            fromData.parent_id = this.tree.id
            console.log("dragStart",e.target.dataset.name,e.target.dataset.id,this.tree.name,this.tree.id)
            e.dataTransfer.setData("nottext", e.target.innerHTML);
            
           
          },
          dragEnter(e){
            console.log("进来了",e)
           // e.target.style.backgroundColor="#2d8cf0";
           e.target.style.backgroundColor="#e3dfdf";
            //e.target.style.color="#fff"
            toData.child_name = e.target.dataset.name
            toData.child_id = e.target.dataset.id
            toData.parent_name = this.tree.name
            toData.parent_id = this.tree.id
            
            if(this.$store.state.app.righttable==""){

            }else{
              this.$store.commit("setleftli",toData)
              
            }
            
             
          },
          dragLeave(e){
            e.target.style.backgroundColor="rgba(0,0,0,0)";
           // e.target.style.color="black"
            console.log("出去了",e.target)
          },
          drop(e){

          },
          dragEnd(e){
            
              this.order(fromData,toData)
             
          },
          
          order(from,to){
             let vm = this;
            // console.log("from,to",from,to)
             this.check(from,to);
            
            

          },
          removeItem(item){
           // console.log("removeItem",item)
            let vm = this 
             let root = vm.tree
              for(let i=0;i<root.children.length;i++){
                
                  if(item.id==root.children[i].id){
                   
                    root.children.splice(i,1)
                    
                    }
                  
                
              }
              //用户机构删除的操作
              let itemdata = []
              itemdata.push(item.id)
              vm.removeData(root.id,itemdata)
             
             //console.log("删除后的tree",item.id,root.id)
          },
          removeData(org_id,oper_ids){
              let vm = this
              let org =org_id
              let oper =oper_ids
             
              let req = {
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
              axios.post("api/emporg/delOperator",req).then(function(res){
                console.log(res.data)
              }).catch(function(error){
                console.log(error)
              })
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
          checktable(from,to){
              
              let vm = this;
              
              let root = this.$store.state.app.tree
              
              let dataset={name:from};
              
                for(let i=0;i<root.children.length;i++){
                
                  for(let j=0;j<root.children[i].children.length;j++){
                   
                    if(to==root.children[i].children[j].name){
                     /*  console.log("to",root.children[i].children[j]) */
                       /*  root.children[i].children.splice(j, 0, dataset);  */
                        root.children[i].children.push(dataset)
                    }
                  }
              } 
              
              this.$store.commit("settree",root)
              
              
              
           

            
          },
          dragover(e) {
            e.preventDefault();
            return true;
          },
          check(from,to){
              // console.log("from",from,"to",to)
              let vm = this;
              
              let root = this.$store.state.app.tree
              
              let dataset;
              /*  if((from.parent_name.indexOf("机构")>-1)||(to.indexOf("机构")>-1)){
                return
              }  */
              if(from.parent_name==to.parent_name){
                return
              }
              /* 拖拽到机构判断是否重复 */
              if(to.parent_name=="myTree"){
               
                for(let i=0;i<root.children.length;i++){
                   if(to.child_id==root.children[i].id){
                    
                      for(let j=0; j<root.children[i].children.length; j++){
                        
                        if(from.child_id==root.children[i].children[j].id){
                          console.log("机构去重复")
                          return
                        }
                      }
                   }
                 
                  
                }
              }
              /* 拖拽到机构 */
              if(to.parent_name=="myTree"){
                 for(let i=0;i<root.children.length;i++){
                  if(from.parent_id==root.children[i].id){
                    for(let j=0;j<root.children[i].children.length;j++){
                        if(from.child_id==root.children[i].children[j].id){
                            dataset = root.children[i].children[j]
                            root.children[i].children.splice(j,1)
                            //用户机构删除的操作
                            let itemdata =[]
                            itemdata.push(from.child_id)
                            vm.removeData(from.parent_id,itemdata)
                            }
                        
                      }

                  }
                
                }

                for(let i=0;i<root.children.length;i++){
                 if(to.child_id==root.children[i].id){
                   console.log("end",to,root.children[i])
                        root.children[i].children.push(dataset)
                        //用户机构增加的操作
                        let itemdata =[]
                        itemdata.push(from.child_id)
                         vm.addData(to.parent_id,itemdata)
                  }
                  
              } 
                return
              }
              /* 拖拽到人员判断是否重复 */
              for(let i=0;i<root.children.length;i++){
                if(to.parent_id==root.children[i].id){
                   for(let j=0;j<root.children[i].children.length;j++){
                     if(from.child_id==root.children[i].children[j].id){
                       console.log("有重复的")
                       return
                     }
                   }
                }
              }
              /* 拖拽到人员 */
              for(let i=0;i<root.children.length;i++){
                if(from.parent_id==root.children[i].id){
                   for(let j=0;j<root.children[i].children.length;j++){
                      if(from.child_id==root.children[i].children[j].id){
                          dataset = root.children[i].children[j]
                          root.children[i].children.splice(j,1)
                          //用户机构删除的操作
                          let itemdata =[]
                          itemdata.push(from.child_id)
                          vm.removeData(from.parent_id,itemdata)
                          }
                      
                    }

                }
               
              }
                for(let i=0;i<root.children.length;i++){
                 if(to.parent_id==root.children[i].id){
                   for(let j=0;j<root.children[i].children.length;j++){
                   
                    if(to.child_id==root.children[i].children[j].id){
                        
                        root.children[i].children.push(dataset)
                        //用户机构增加的操作
                        let itemdata =[]
                        itemdata.push(from.child_id)
                         vm.addData(to.parent_id,itemdata)
                    }
                  }

                 }
                  
              } 
             
              this.$store.commit("settree",root)
              //console.log("after",root,dataset)
              
           

          }

        }
  }
</script>
<style scoped>
.tree-hidden{
  display: none
}
.tree-block{
  display: block
}
li{
  list-style: none;
      margin: 5px;
}
/* span:hover{
    background-color:#e3dfdf;
} */
.ul{
  
}
</style>

