<template>
  <div>
   <Card class="home-main">
        <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="4"><div> 查询条件</div></th>
            </tr>
            <tr>
                <td><div>登录名称</div></td>
                <td ><div><Input ></Input></div></td>
                <td><div>操作员名称</div></td>
                <td ><div><Input ></Input></div></td>
                
            </tr>
            <tr>
                <td colspan="4">
                  <div>
                    <span>每页显示<Input style="width:60px"></Input></span>
                    <span>查询</span>
                    <span>重置</span>
                  </div>
                 </td>
                
            </tr>
           
        </table>
        
        

        <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="3"><div> 查询结果</div></th>
            </tr>
            <tr>
                <td><div> <Checkbox ></Checkbox>选择</div></td>
                <td ><div>登录账号</div></td>
                <td><div>用户姓名</div></td>
               
                
            </tr>
            <tr v-for="item in list" :key="item">
                <td><div> <Checkbox ></Checkbox></div></td>
                <td ><div></div></td>
                <td><div></div></td>
                
            </tr>
           
        </table>
        <div style="margin: 10px;">
          <Button @click="changeEditable()">新增</Button>
          <Button @click="changeEditable()">关闭</Button>
        </div>
        <div style="text-align: center;margin: 10px;">
          
          <Page :total="10"></Page>
          </div>
        
        
   </Card>
</div>
</template>
<script>
    export default{
      data(){
          return{
              list:[0,1,2,3,4,5,6,7,8,9],
             
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

