<template>
 <div class="home-main">
     <div>
         <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                 <th colspan="3"><div>角色查询条件</div>     </th>
             </tr>
             <tr>
                 <td><div>角色名称</div></td>
                 <td colspan="2"><div><input type="text" name="" id="" style="width:200px"><Button>查询</Button></div></td>
                 
             </tr>
             <tr>
                 <td><div>角色编号</div></td>
                 
                 <td><div>角色名称</div></td>
                 <td><div>操作</div></td>
             </tr>
              <tr v-for="item in list" :key="item">
                 <td><div>{{item}}</div></td>
                 
                 <td><div>{{item}}</div></td>
                 <td><div><Button>管理菜单</Button></div></td>
             </tr>
         </table>
     </div>
    <!--  <div>
        <Tree :data="xx"></Tree>
     </div> -->
    <div>
        <el-tree
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
</el-tree>
    </div>
    
 </div>   
</template>
<script>
    export default{
        data(){
            return{
                list:[0,1,2,3,4,5],
                xx: [],
                 data6: [{
          id: 1,
          label: '一级 1',
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
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
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
        defaultProps: {
          children: 'children',
          label: 'label'
        }
            }
        },
        methods:{
            gonext(value){
                this.$router.push({
                    name:value
                })
            },
             handleDragStart(node, ev) {
                console.log('drag start', node);
                console.log(this.data6)
            },
            handleDragEnter(draggingNode, dropNode, ev) {
                console.log('tree drag enter: ', dropNode.label);
                 console.log(this.data6)
            },
            handleDragLeave(draggingNode, dropNode, ev) {
                console.log('tree drag leave: ', dropNode.label);
                 console.log(this.data6)
            },
            handleDragOver(draggingNode, dropNode, ev) {
                console.log('tree drag over: ', dropNode.label);
                 console.log(this.data6)
            },
            handleDragEnd(draggingNode, dropNode, dropType, ev) {
                console.log('tree drag end: ', dropNode && dropNode.label, dropType);
                 console.log(this.data6)
            },
            handleDrop(draggingNode, dropNode, dropType, ev) {
                console.log('tree drop: ', dropNode.label, dropType);
                 console.log(this.data6)
            },
            allowDrop(draggingNode, dropNode, type) {
                if (dropNode.data.label === '二级 3-1') {
                return type !== 'inner';
                } else {
                return true;
                }
                 console.log(this.data6)
            },
            allowDrag(draggingNode) {
                return draggingNode.data.label.indexOf('三级 3-1-1') === -1;
                 console.log(this.data6)
            }
        },
        mounted(){
          this.xx=[ {
                title: 'Vue实例',
                expand: true,
                children: [
                    {
                        title: '数据与方法',
                        expand: true
                    },
                    {
                        title: '生命周期',
                        expand: true
                    }
                ]
            },
            {
                title: 'Class与Style绑定',
                expand: true,
                children: [
                    {
                        title: '绑定HTML class',
                        expand: true,
                        children: [
                            {
                                title: '对象语法',
                                expand: true
                            },
                            {
                                title: '数组语法',
                                expand: true
                            },
                            {
                                title: '用在组件上',
                                expand: true
                            }
                        ]
                    },
                    {
                        title: '生命周期',
                        expand: true
                    }
                ]
            },
            {
                title: '模板语法',
                expand: true,
                children: [
                    {
                        title: '插值',
                        expand: true
                    },
                    {
                        title: '指令',
                        expand: true
                    },
                    {
                        title: '缩写',
                        expand: true
                    }
                ]
            }
        ]
        }
    }
</script>
<style scoped>
</style>