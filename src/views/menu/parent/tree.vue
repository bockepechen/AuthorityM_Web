<template>
<div style="display:flex">
  <div style="flex:1"> 
      <Input style="width:200px"></Input>
       
          <ztreeItem :tree="yy"></ztreeItem>
          
        
     
  </div>
  <div style="flex:1"> 
    <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="2"><div> 角色查询条件</div></th>
            </tr>
            <tr>
                <td><div>角色名称</div></td>
                <td><div><Input style="width:200px"></Input><Button>查询</Button></div></td>
                
            </tr>
            <tr>
                <td colspan="2"><div>角色查询结果</div></td>
                
            </tr>
            <tr>
                <td><div>角色编号</div></td>
                <td><div>角色名称</div></td>
                
            </tr>
            <tr v-for="(item) in list" :key="item" draggable='true'  @dragstart='dragStart' @dragenter='dragEnter' @dragend='dragEnd' :data-name="item">
                <td   >
                    <div>
                        
                         <span   >{{item}}</span>
                    </div>
                </td>
                <td><div>{{item}}</div></td>
               
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
         list:["张三","李四","王五","赵六",4,5,6],
        xx:{
            name: 'My Tree',
            children: [
              { name: '机构1' ,
              children: [
                  {name: "人员1"},
                  { name: '人员2' },
                  { name: '人员3' },
                  { name: '人员4'}
                ]
              },
              { name: '机构2' ,
               children: [
                  {name: '人员5'},
                  { name: '人员6' },
                  { name: '人员7' },
                  { name: '人员8'}
                ]
              },
              {
                name: '机构3',
                children: [
                  {name: '人员9'},
                  { name: '人员10' },
                  { name: '人员11' },
                  { name: '人员12'}
                ]
              }
            ]
          }
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
      localStorage.setItem("tree",JSON.stringify(vm.xx))
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

