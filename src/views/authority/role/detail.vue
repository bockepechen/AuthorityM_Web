<template>
<div class="home-main content">
     <h4>角色对应人员信息管理</h4>
    <div>
        <table cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
            <tr>
                <th colspan="4"><div>查询条件</div> </th>
            </tr>
            <tr>
                <td><div>登录名称</div></td>
                <td><div><Input></Input></div></td>
                <td><div>操作员名称</div></td>
                <td><div><Input></Input></div></td>
            </tr>
             <tr>
                <td><div>所属分公司</div></td>
                <td><div><Input></Input></div></td>
                <td></td>
                <td></td>
            </tr>
             <tr>
                <td colspan="4"><div><Button>查询</Button> </div></td>
                
            </tr>
             <tr>
                 <th colspan="4"><div>查询结果</div> </th>
            </tr>
             <tr>
                <td><div> <Checkbox label="twitter"></Checkbox>选择</div></td>
                <td><div>登陆名称</div></td>
                <td><div>操作员名称</div></td>
                <td><div>所属分公司</div></td>
            </tr>
             <tr v-for="item in list" :key="item">
                <td><div>{{item}}</div></td>
                <td><div></div></td>
                <td><div></div></td>
                <td><div></div></td>
            </tr>
            
        </table>
    </div>
</div> 
</template>
<script>
    export default{
      data(){
        return{
          list:[0,1,2,3,4,5]
        }
      }
    }
</script>
<style scoped>

</style>

