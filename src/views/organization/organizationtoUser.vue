<template>
<div>
   <Card class="" style="max-width:1200px">
      <p slot="title">
            <Icon type="person"></Icon>
            机构管理
        </p>
    <div style="display:flex">
      <div style="flex:1" >
      <!--  <el-tree
        :data="data6"
        node-key="id"
        default-expand-all
        @node-drag-start="handleDragStart"
        @node-drag-enter="handleDragEnter"
        @node-drag-leave="handleDragLeave"
        @node-drag-over="handleDragOver"
        @node-drag-end="handleDragEnd"
        @node-drop="handleDrop"
        draggable
        :allow-drop="allowDrop"
        :allow-drag="allowDrag">
      </el-tree> -->
      <tree ></tree>
      </div>
      
    </div>
   
  </Card>
</div>
</template>
<script>
import tree from "@/views/menu/parent/tree.vue"
let fromData = ''
let toData=""
 export default{
   data(){
     return{
       list:["张三","李四","王五","赵六",4,5],
         xx:{
            name: 'My Tree',
            searchopen:true,
            expanded: false,
            children: [
              { name: '机构1' ,
              open:true,
              searchopen:true,
              expanded: false,
              children: [
                  {name: "人员1-1",open:true,searchopen:true,expanded: false},
                  { name: '人员1-2',open:true ,searchopen:true,expanded: false},
                  { name: '人员1-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员1-4',open:true,searchopen:true,expanded: false}
                ]
              },
              { name: '机构2' ,
               open:true,
               searchopen:true,
               expanded: false,
               children: [
                 {name: "人员2-1",open:true,searchopen:true,expanded: false},
                  { name: '人员2-2',open:true ,searchopen:true,expanded: false},
                  { name: '人员2-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员2-4',open:true,searchopen:true,expanded: false}
                ]
              },
              {
                name: '机构3',
                 open:true,
                 searchopen:true,
                 expanded: false,
                children: [
                 {name: "人员3-1",open:true,searchopen:true,expanded: false},
                  { name: '人员3-2',open:true ,searchopen:true,expanded: false},
                  { name: '人员3-3',open:true,searchopen:true ,expanded: false},
                  { name: '人员3-4',open:true,searchopen:true,expanded: false}
                ]
              },
              {
                name: '机构4',
                 open:true,
                 searchopen:true,
                 expanded: false,
                children: [
                 {name: "人员4-1",open:true,searchopen:true,expanded: false},
                  { name: '人员4-2',open:true ,searchopen:true,expanded: false},
                  { name: '人员4-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员4-4',open:true,searchopen:true,expanded: false}
                ]
              },
              {
                name: '机构5',
                 open:true,
                 searchopen:true,
                 expanded: false,
                children: [
                  {name: "人员5-1",open:true,searchopen:true,expanded: false},
                  { name: '人员5-2' ,open:true,searchopen:true,expanded: false},
                  { name: '人员5-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员5-4',open:true,searchopen:true,expanded: false}
                ]
              },
              {
                name: '机构6',
                 open:true,
                 searchopen:true,
                 expanded: false,
                children: [
                  {name: "人员6-1",open:true,searchopen:true,expanded: false},
                  { name: '人员6-2',open:true ,searchopen:true,expanded: false},
                  { name: '人员6-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员6-4',open:true,searchopen:true,expanded: false}
                ]
              },
              {
                name: '机构7',
                 open:true,
                 searchopen:true,
                 expanded: false,
                children: [
                 {name: "人员7-1",open:true,searchopen:true,expanded: false},
                  { name: '人员7-2',open:true ,searchopen:true,expanded: false},
                  { name: '人员7-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员7-4',open:true,searchopen:true,expanded: false}
                ]
              },
              {
                name: '机构8',
                 open:true,
                 searchopen:true,
                 expanded: false,
                children: [
                 {name: "人员8-1",open:true,searchopen:true,expanded: false},
                  { name: '人员8-2' ,open:true,searchopen:true,expanded: false},
                  { name: '人员8-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员8-4',open:true,searchopen:true,expanded: false}
                ]
              },
              {
                name: '机构9',
                 open:true,
                 searchopen:true,
                 expanded: false,
                children: [
                 {name: "人员9-1",open:true,searchopen:true,expanded: false},
                  { name: '人员9-2' ,open:true,searchopen:true,expanded: false},
                  { name: '人员9-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员9-4',open:true,searchopen:true,expanded: false}
                ]
              },
              {
                name: '机构10',
                 open:true,
                 searchopen:true,
                 expanded: false,
                children: [
                 {name: "人员10-1",open:true,searchopen:true,expanded: false},
                  { name: '人员10-2' ,open:true,searchopen:true,expanded: false},
                  { name: '人员10-3',open:true ,searchopen:true,expanded: false},
                  { name: '人员10-4',open:true,searchopen:true,expanded: false}
                ]
              }

            ]
          },
       editable:[false,false,false,false,false,false],
        data6: [{
          id: 1,
          label: '机构 1',
          children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
            }, {
              id: 2,
              label: '机构 2',
              children: [{
                id: 5,
                label: '二级 2-1'
              }, {
                id: 6,
                label: '二级 2-2'
              }]
            }, {
              id: 3,
              label: '机构 3',
              children: [{
                id: 7,
                label: '二级 3-1'
              }, {
                id: 8,
                label: '二级 3-2',
                children: [{
                id: 11,
                  label: '三级 3-2-1'
                }, {
                  id: 12,
                  label: '三级 3-2-2'
                }, {
                  id: 13,
                  label: '三级 3-2-3'
                }]
              }]
            }],
     }
   },
   computed:{
     yy(){
       return this.$store.state.app.tree
     }
   },
   components:{
     tree
   },
   created(){
     
   },
   mounted(){
    
     this.$store.commit("settree",this.xx)
     
   },
   methods:{
     xxx(){
       console.log("heihiei")
     },
     children(){
       
     },
      dragStart(e){
          e.dataTransfer.effectAllowed = "move";
          fromData = e.target.dataset.name
          e.dataTransfer.setData("item", e.target);
      },
      dragEnter(e){
        toData = e.target.textContent
        console.log("我进去了",e.target)
      },
      dragEnd(e){
         this.order(fromData,toData)
      },
      order(from,to){
          let vm = this;
          //this.check(from,to);
          console.log("from",from,"to",to)
        

      },
     /*  handleDragStart(node, ev) {
        console.log('drag start', node);
      },
      handleDragEnter(draggingNode, dropNode, ev) {
        console.log('tree drag enter: ', dropNode.label);
      },
      handleDragLeave(draggingNode, dropNode, ev) {
        console.log('tree drag leave: ', dropNode.label);
      },
      handleDragOver(draggingNode, dropNode, ev) {
        console.log('tree drag over: ', dropNode.label);
      },
      handleDragEnd(draggingNode, dropNode, dropType, ev) {
        console.log('tree drag end: ', dropNode && dropNode.label, dropType);
        let vm = this
        console.log("vm",vm.data6)
      },
      handleDrop(draggingNode, dropNode, dropType, ev) {
        console.log('tree drop: ', dropNode.label, dropType);
      },
      allowDrop(draggingNode, dropNode, type) {
        if (dropNode.data.label === '二级 3-1') {
          return type !== 'inner';
        } else {
          return true;
        }
      },
      allowDrag(draggingNode) {
        return draggingNode.data.label.indexOf('三级 3-1-1') === -1;
      } */
   }
   
 } 
</script>
<style scoped>

</style>
