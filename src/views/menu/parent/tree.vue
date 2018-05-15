<template>
<div style="display:flex">
  <div style="flex:1"> 
      <Input style="width:200px" v-model="title" ></Input>
       
          <ztreeItem :tree="yy" ref="trees" :searchname="title"></ztreeItem>
          
        
     
  </div>
  <div style="flex:1"> 
    <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="2"><div> 角色查询条件</div></th>
            </tr>
            <tr>
                <td><div>角色名称</div></td>
                <td><div><Input style="width:200px" v-model="tabletitle"></Input><Button @click="tabletitlechange">查询</Button></div></td>
                
            </tr>
            <tr>
                <td colspan="2"><div>角色查询结果</div></td>
                
            </tr>
            <tr>
                <td><div>角色编号</div></td>
                <td><div>角色名称</div></td>
                
            </tr>
            <tr v-for="(item,index) in list" :key="index" draggable='true'  @dragstart='dragStart' @dragenter='dragEnter' @dragend='dragEnd' :data-name="item.name" v-if="!tableshow[index]">
                <td   >
                    <div>
                        
                         <span   >{{item.name}}</span>
                    </div>
                </td>
                <td><div>{{item.name}}</div></td>
               
            </tr>
        </table>
  </div>
</div>
</template>
<script>
import ztreeItem from "@/views/menu/parent/childtree"

  export default{
    name:'tree',
    
    data(){
      return{
         list:[{ name: '张三'},{ name: '李四'},{ name: '王五'},{ name: '赵六'},{ name: '1'},{ name: '2'},{ name: '3'}],
         title:"",
         tabletitle:"",
         zz : this.$store.state.app.tree,
         tableshow:[]
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
      
      wode(){
         console.log("msg")
      },
      
      tabletitlechange(){
        let vm = this
          console.log(this.tabletitle)
          if(vm.tabletitle==""){
            for(let i=0;i<vm.list.length;i++){
               
                  vm.$set(vm.tableshow,i,false)
               
            }
          }else{
            for(let i=0;i<vm.list.length;i++){
                if(vm.list[i].name.indexOf(vm.tabletitle)>-1){
                  vm.$set(vm.tableshow,i,false)
                }else{
                   vm.$set(vm.tableshow,i,true)
                }
            }
           
          }
      },
      dragStart(e){
          e.dataTransfer.effectAllowed = "move";
          
          e.dataTransfer.setData("item", e.target);
          let tab = e.target.dataset.name
          this.$store.commit("setrighttable",tab)
      },
      dragEnter(e){
        
        console.log("我进去了",e.target)
      },
      dragEnd(e){
         let vm = this;
              
        let root = this.$store.state.app.tree
        let from = this.$store.state.app.righttable
        let to = this.$store.state.app.leftli
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
      let vm = this
      //localStorage.setItem("tree",JSON.stringify(vm.xx))
    },
    mounted(){
      this.$on("oxxe",function(){
        console.log("xxx")
      })
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

