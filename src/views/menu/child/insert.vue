      
<template>
   <div class="home-main content">
       <div>
           <table cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
               <tr>
                   <th colspan="2">增加子菜单</th>
               </tr>
               <tr>
                   <td ><div><span>父菜单显示名称</span></div> </td>
                   <td ><div><Input></Input></div></td>
                  
                   
               </tr>
               <tr>
                   <td><div>菜单名称</div>  </td>
                   <td><div><Input></Input></div></td>
                  
               </tr>
               <tr>
                   <td><div>菜单显示名称</div></td>
                   <td><div><Input></Input></div></td>
                  
               </tr>
               <tr>
                   <td><div>菜单代码</div></td>
                   <td><div><Input></Input></div></td>
                   
               </tr>
               <tr>
                   <td><div>是否有子菜单</div></td>
                   <td ><div><Input></Input></div></td>
                  
               </tr>
               <tr>
                   <td><div>显示顺序</div></td>
                   <td><div><Input></Input></div></td>
                   
               </tr>
               
           </table>
       </div>
       <div class="control">
           <Button>保存</Button>
           <Button>取消</Button>
       </div>
   </div> 
</template>
<script>
    export default{
      
    }
</script>
<style scoped>
.control{
    width: 120px;
    margin: 42px auto;
}
.content{
    border: #d6caca solid 1px;
    background-color: #fff;
}

</style>

