<template>
<div @click="closeTag">
   <Card class="home-main">
        <p slot="title">
            <Icon type="person"></Icon>
            机构管理
        </p>
    <div style="text-align: center;
    margin: 20px;">
      <!-- <div style="display:flex;width:600px;">
        <div style="flex:1">
          <input type="text">
          <span>图标</span>
        </div>
        <div style="flex:1">
          <input type="text">
          <span>图标</span>
        </div>
      </div> -->
      
      <Input  icon="search" placeholder="请输入菜单名称搜索" style="width: 600px"></Input>
    </div>
    <div>
      <table  cellspacing="0" cellpadding="0" border="0" style="table-layout:fixed;">
             <tr>
                  <th><div>菜单名称<Icon type="arrow-down-a"></Icon></div></th>
                 <th><div>是否子菜单<Icon type="arrow-down-a"></Icon></div></th>
                 <th><div>热点操作区域</div></th>
             </tr>
            
             <tr v-for="(item,index) in list" :key="index">
                 
                 <td><div>
                        <Input v-show="editable[index]==true" v-model="list[index]" @keyup.enter="changeEditable"></Input>
                         <span v-show="editable[index]==false"  >{{item}}</span>
                    </div>
                 </td>
                 <td>
                   <div>
                     <Input v-show="editable[index]==true" v-model="list[index]" @keyup.enter="changeEditable"></Input>
                     <span v-show="editable[index]==false"  >{{item}}</span>
                    </div>
                   </td>
                 <td>
                     <div @click.stop="showTag(item)">{{item}}点我呀</div>
                     <div class="content" :class="{maxIndex: (item==choose),minIndex:!(item==choose) }"   :id='item'>
                         <div class="circle"></div>
                         <div style="margin-top:20px;">
                             <Button @click.stop="destroy(item)">删除</Button>
                            <Button @click.stop="change(index)">修改</Button>
                            <Button>详情</Button>
                        </div>
                         
                     </div>
                </td>
             </tr>
            
         </table>
    </div>
    <div style="    margin-top: 30px;
    text-align: center;">
      <Page :total="100"></Page>
    </div>
      <Modal
        v-model="modal1"
        title="Common Modal dialog box title"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>确定删除？</p>
    
    </Modal>
  </Card>
</div>
</template>
<script>
  export default{
    data(){
            return{
                list:['a','b','c','d','e','f','g','h','i','j'],
                editable:[false,false,false,false,false,false,false,false,false,false,false],
                choose:'',
                modal1: false
            }
        },
        methods:{
            changeEditable(){
              console.log("修改后的回车事件")
            },
            gonext(value){
                this.$router.push({
                    name:value
                })
            },
            change(index){
                
                this.$set(this.editable,index,!this.editable[index])
                
                
            },
            ok () {
               
            },
            cancel () {
                
            },
            destroy(item){
                let vm = this
                this.modal1 = true
               // this.list.splice(vm.list.indexOf(item),1)
            },
            closeTag(){
                 this.choose="";
            },
            showTag(item){
                var box=document.getElementById(item);       
                if(this.choose==item){
                    this.choose=""
                     
                }else{
                    this.choose=item
                   
                }
                let distance = box.getBoundingClientRect();
                let width = document.body.clientWidth;
                let height = document.body.clientHeight;
                
                if(distance.bottom>height){
                    
                    let y = box.offsetTop-box.offsetHeight-30
                    box.style.top=y+"px"
                    
                } 
                if(distance.right>document.body.clientWidth){
                    let x = box.offsetLeft-box.offsetWidth
                    box.style.left=x+"px"
                }
                 
                

                
            }
        },

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
    width:270px;height:70px;background-color:#fff;box-shadow: 0 1px 6px rgba(0,0,0,.2);border-radius: 20px;position: absolute; 
}
.circle{
  bottom: 3px;
    border-width: 5px 5px 0;
    border-top-color: hsla(0,0%,85%,.5);
    display: block;
    width: 0;
    height: 0;
    position: absolute;
    border-color: transparent;
    border-style: solid;
    border-width: 6px;
}
</style>

