<template>
 <div class="home-main">
     <div>
         <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                 <th colspan="2"><div>岗位查询条件</div>     </th>
             </tr>
             <tr>
                 <td><div>岗位名称</div></td>
                 <td><div><Input style="width:200px"></Input><Button>查询</Button></div></td>
                
             </tr>
            
         </table>
     </div>
    
     <div>
         <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                 <th colspan="3"><div>岗位查询结果</div></th>
             </tr>
             <tr>
                 <td><div>岗位编号</div></td>
                 <td><div>岗位名称</div></td>
                 <td><div>操作</div></td>
             </tr>
             <tr v-for="item in list" :key="item">
                 <td><div></div></td>
                 <td><div></div></td>
                 <td><div><Button>编辑</Button><Button>删除</Button></div></td>
             </tr>
            
         </table>
     </div>
     <div style="margin:40px auto">
         <Page :total="100" show-elevator></Page>
     </div>
 </div>   
</template>
<script>
    export default{
        data(){
            return{
                list:[0,1,2,3,4,5]
            }
        },
        methods:{
            gonext(value){
                this.$router.push({
                    name:value
                })
            }
        }
    }
</script>
<style scoped>

</style>

