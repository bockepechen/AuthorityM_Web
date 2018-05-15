<template>
<div>
    <div class="home-main content">
        <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="3"><div> 角色查询条件</div></th>
            </tr>
            <tr>
                <td><div>角色名称</div></td>
                <td colspan="2"><div><Input style="width:400px"></Input><Button>查询</Button></div></td>
                
            </tr>
            <tr>
                <td colspan="3"><div>角色查询结果</div></td>
                
            </tr>
            <tr>
                <td><div>角色编号</div></td>
                <td><div>角色名称</div></td>
                <td><div>操作</div></td>
            </tr>
            <tr v-for="(item,index) in list" :key="item">
                <td>
                    <div>
                        <input v-show="editable[index]==true" v-model="list[index]" @keyup.enter="changeEditable"/>
                         <span v-show="editable[index]==false"  >{{item}}</span>
                    </div>
                </td>
                <td><div>{{item}}</div></td>
                <td>
                    <div>
                        <Button @click="change(index)">编辑</Button>
                        <Button>删除</Button>
                        <Button>人员</Button>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    <div>
        <Page :total="100"></Page>
    </div>
</div>
</template>
<script>
    export default{
      data(){
          return{
              list:[0,1,2,3,4,5],
              editable:[false,false,false,false,false,false]
          }
      },
      methods:{
          changeEditable(){
              console.log("changeEditable")
          },
          change(index){
              console.log(index)
              this.$set(this.editable,index,!this.editable[index])
                  //this.editable[index] = true
              console.log(this.editable)
          }
      }
    }
</script>
<style scoped>
.content{
    border: #d6caca solid 1px;
    background-color: #fff;
}
</style>

