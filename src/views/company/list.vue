<template>
 <div class="home-main">
     <div>
         <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                 <th colspan="4"><div>公司条件查询</div>     </th>
             </tr>
             <tr>
                 <td><div>公司代码</div></td>
                 <td><div><input type="text" name="" id=""></div></td>
                 <td><div>公司名称</div></td>
                 <td><div><input type="text"></div></td>
             </tr>
             <tr>
                 <td><div>公司类别</div></td>
                 <td><div><input type="text"></div></td>
                 <td><div></div></td>
                 <td><div></div></td>
             </tr>
         </table>
     </div>
     <div style="padding: 30px;
    text-align: center;">
         <Button>重置</Button>
         <Button>查询</Button>
     </div>
     <div>
         <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                 <th colspan="6"><div>查询结果</div></th>
             </tr>
             <tr>
                 <td><div>选择</div></td>
                 <td><div>公司代码</div></td>
                 <td><div>公司名称</div></td>
                 <td><div>公司类别</div></td>
                 <td><div>公司性质</div></td>
                 <td><div>操作</div></td>
             </tr>
             <tr v-for="item in list" :key="item">
                 <td><div><input type="checkbox" name="" id=""></div></td>
                 <td><div></div></td>
                 <td><div></div></td>
                 <td><div></div></td>
                 <td><div></div></td>
                 <td>
                     <div @click="showTag(item)">{{item}}点我呀</div>
                     <div class="content" :class="{maxIndex: (item==choose),minIndex:!(item==choose) }"   :id='item'>
                         <button disabled="disabled">删除</button>
                         <button disabled="disabled">修改</button>
                         <button disabled="disabled">详情</button>
                     </div>
                </td>
             </tr>
            
         </table>
     </div>
     <div style="margin-top:40px;" id="box">
         <Button @click="gonext('insertstaff')" >机构添加人员</Button>
         <Button @click="gonext('insert')">新增机构</Button>
         <span style="    display: inline-block;
    vertical-align: middle;
    margin-left: 190px;"><Page :total="100" show-elevator></Page></span>
         
         
     </div>
   
 </div>   
</template>
<script>
    export default{
        data(){
            return{
                list:['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u'],
                choose:''
            }
        },
        methods:{
            gonext(value){
                this.$router.push({
                    name:value
                })
            },
            showTag(item){
                var box=document.getElementById(item);       
                if(this.choose==item){
                    this.choose=""
                     //box.style.zIndex=-999
                }else{
                    this.choose=item
                     //box.style.zIndex=10
                }
                console.log(document.body.clientHeight,document.body.clientWidth,
                            box.getBoundingClientRect().top,
                            box.getBoundingClientRect().right,
                            box.getBoundingClientRect().bottom,
                            box.getBoundingClientRect().left);
                let distance = box.getBoundingClientRect();
                let width = document.body.clientWidth;
                let height = document.body.clientHeight;
                if(distance.bottom>height){
                    //box.style.top="200px";
                    let y = box.offsetTop-220
                    box.style.top=y+"px"
                    
                } 
                if(distance.right>document.body.clientWidth){
                    console.log("ok", box.offsetLeft)
                    let x = box.offsetLeft-400

                    box.style.left=x+"px"
                }
                 
                

                
            }
        },
        updated: function () {
        this.$nextTick(function () {
            
            })
        }
    }
</script>
<style scoped>
.maxIndex{
z-Index:10
}
.minIndex{
z-Index:-999
}
.content{
    width:400px;height:200px;background-color:#fff;box-shadow: 0 1px 6px rgba(0,0,0,.2);border-radius: 20px;position: absolute; 
}
</style>

