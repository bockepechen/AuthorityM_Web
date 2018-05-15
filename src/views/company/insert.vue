      
<template>
   <div class="home-main content">
       <div>
           <table cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
               <tr>
                   <th colspan="4">增加分公司</th>
               </tr>
               <tr>
                   <td ><div><span>公司代码</span></div> </td>
                   <td ><div><Input></Input></div></td>
                   <td colspan="2" ><div></div></td>
                   
               </tr>
               <tr>
                   <td><div>所在省市</div>  </td>
                   <td><div><Input></Input></div></td>
                   <td><div>所在城市</div> </td>
                   <td><div><Input></Input></div></td>
               </tr>
               <tr>
                   <td><div>公司名称</div></td>
                   <td><div><Input></Input></div></td>
                   <td><div>公司类别</div></td>
                   <td><div>
                      <Select   value="男">
                            <Option v-for="item in list" :value="item" :key="item">{{ item }}</Option>
                        </Select>
                    </div></td>
               </tr>
               <tr>
                   <td><div>公司状态</div></td>
                   <td><div><Input></Input></div></td>
                   <td><div>公司性质</div></td>
                   <td><div><Input></Input></div></td>
               </tr>
               <tr>
                   <td><div>公司全称</div></td>
                   <td colspan="3"><div><Input></Input></div></td>
                  
               </tr>
               <tr>
                   <td><div>公司地址</div></td>
                   <td colspan="3"><div><Input></Input></div></td>
                   
               </tr>
               <tr>
                   <td><div>创建时间</div></td>
                   <td><div><Input></Input></div></td>
                   <td colspan="2"></td>
                   
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
        data(){
            return{
                list:['类别1','类别2']
            }
        }
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

