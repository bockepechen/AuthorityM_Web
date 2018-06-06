<template>
<div style="display:flex">
  <div style="flex:1;padding:10px">
   <Card>
     <div style="display:flex">
       <div style="flex:1">
          <ul>
            <li v-for="(item,index) in menuList" :key="index" >
             
             <div class="menu-li">{{item.name}}</div>
              <ul v-if="!(item.child_list==null)">
                <li v-for="(item,index) in item.child_list" :key="index"  @click="changeCurrentMenu(item.menu_id)" :class="{color_blue:(currentMenu==item.menu_id)}" class="role-li ml20">
                  <!-- <Checkbox :value="item.menu_id==currentMenu"  @on-change="changeCheckMenu(item.menu_id)"> 
                     
                  </Checkbox>  -->
                   <span >{{item.name}}</span><!-- <span v-if="currentMenu==item.menu_id">当前选中</span> -->
                </li>
              </ul>
            </li>
          </ul>
       </div>
       
     </div>
    <div>
     <!--  <Button @click="submit()">确定</Button> -->
   <!--   <Button @click="meunListByUser()">确定</Button> -->
    </div>
 
     
   </Card>
      </div>  
      <div style="flex:1;padding:10px">
    <transition name="fade">
      
   <Card v-if="roleShow">
     <div style="display:flex">
      
        <div style="flex:1">
          <ul>
            <li v-for="(item,index) in roleList" :key="index" class="role-li" @click="changeCurrentRole(item.role_id,item.role_name)"  :class="{color_blue:(currentRole.role_id==item.role_id)}">
             
               <!-- <Checkbox :value="checkRole(item.role_id)" @on-change="changeCheckRole(item.role_id,item.role_name)" >
                 
               </Checkbox>   -->
                <span >{{item.role_name}} </span><!-- <span v-if="currentRole.role_id==item.role_id">当前选中</span> -->
            </li>
          </ul>
       </div>
       
     </div>
    <div>
      
    </div>
      
     
   </Card>
    </transition>
   </div> 
     <div style="flex:1;padding:10px">
      <transition name="fade">
       
   <Card v-if="orgShow">
     <div style="display:flex">
       
        <div style="flex:1">
           <ul>
            <li v-for="(item,index) in orgList" :key="index"  class="role-li">
              <Checkbox :value="checkOrg(item.org_id)" @on-change="changeCurrentOrg(item.org_id,item.org_name)">
                <span>{{item.org_name}}</span>
              </Checkbox>  
              
            </li>
          </ul>
       </div>
     </div>
    <div>
      <Button @click="save()">保存</Button>
    </div>
      
     
   </Card>
   </transition>
   </div>
    <Modal
        v-model="modal1"
        title="提示"
        @on-ok="ok"
        @on-cancel="cancel">
        <p>是否保存修改</p>
    
    </Modal>
</div>
</template>
<script>
import axios from 'axios'
  export default{
    data(){
      return{
        roleList:[],
        orgList:[],
        menuList:[],
        menuRoleOrg:{},
        menuRoleOrgClone:"",
        currentMenu:"",
        currentMenuClone:"",
        currentRole:{
          role_id:"",
          role_name:""
        },
        currentRoleClone:{
          role_id:"",
          role_name:""
        },
        currentOrgList:[],
        data:[],
        roleShow:false,
        orgShow:false,
         modal1: false,
        isModified:false
      }
    },
    watch:{
      
    },
    methods:{
     checkRole(id){
        let vm = this
         for(let i=0; i<vm.menuRoleOrg.length; i++){
            if(id==vm.menuRoleOrg[i].role_id){
              return true
            }
          } 
        return false
       
      },
      meunListByUser(){
        let vm = this
        let req = {

          "jyau_content": {
            " jyau_reqData": [{
              "req_no": "AU2018048201802051125231351",
              "org_id": "1212"
            }],
            "jyau_pubData": {
              "operator_id": "O201801301417012263",
              "account_id": "systemman",
              "ip_address": "10.2.0.116",
              "system_id": "10909"
            }
          }
        }
        axios.post("api/menuAuth/queryOperatorMenu",req).then(function(res){
          console.log(res.data)
        }).catch(function(error){
          console.log(error)
        })
      },
      checkOrg(id){
        let vm = this
        for(let i=0; i<vm.menuRoleOrg.length; i++){
          if(vm.currentRole.role_id==vm.menuRoleOrg[i].role_id){
           for(let j=0; j<vm.menuRoleOrg[i].rg_data.length;j++){
              if(id==vm.menuRoleOrg[i].rg_data[j].org_id){
                return true
              }
            }
          }
        }
       return false 
      },
      save(){
        let vm = this
        vm.isModified=false
        let obj = {
          role_id:vm.currentRole.role_id,
          role_name:vm.currentRole.role_name,
          rg_data:vm.currentOrgList
        }
        
        if(vm.currentMenu==""){
          
           vm.$Message.error('菜单为空!');
           return
        }else if(vm.currentRole.role_id==""){
             vm.$Message.error('角色为空!');
             return
        }else{
          if(vm.menuRoleOrg.length>0){
            if(checkOrg()){
               for(let i=0; i<vm.menuRoleOrg.length; i++){
                  if(obj.role_id==vm.menuRoleOrg[i].role_id){
                    
                    vm.menuRoleOrg.splice(i,1,obj)
                    
                  }
                }
                vm.data = vm.menuRoleOrg

            }else{
              vm.menuRoleOrg.push(obj)
               vm.data = vm.menuRoleOrg
            }
           
          }else{
            //如果开始就为空
            vm.data.push(obj)
          }
            
        }
        console.log(obj,vm.data)
        function checkOrg(){
             for(let i=0; i<vm.menuRoleOrg.length; i++){
              if(obj.role_id==vm.menuRoleOrg[i].role_id){
                
                return true
                
              }
            }
            return false
        }
        this.saveAuth(obj)
      },
      ok(){
        let vm = this
        vm.save();
       if(vm.currentRoleClone.role_id==""){
          vm.changeCurrentMenu(vm.currentMenuClone)
        }else if(vm.currentMenuClone==""){
          vm.changeCurrentRole(vm.currentRoleClone.role_id,vm.currentRoleClone.role_name)
        }
      },
      cancel(){
        let vm = this
        vm.isModified=false
        console.log(vm.currentRoleClone.role_id,vm.currentMenuClone)
        if(vm.currentRoleClone.role_id==""){
          vm.changeCurrentMenu(vm.currentMenuClone)
        }else if(vm.currentMenuClone==""){
          vm.changeCurrentRole(vm.currentRoleClone.role_id,vm.currentRoleClone.role_name)
        }
      },
      saveAuth(obj){
        console.log("obj",obj)
        let vm = this
        let menu_id = vm.currentMenu
        let org_ids =[]
        for(let i=0; i<obj.rg_data.length; i++){
          org_ids.push(obj.rg_data[i].org_id)
        }
        let req = {
          "jyau_content": {
            "jyau_reqData": [{
              "req_no": "CL048201802051125231351",
              "menu_id": menu_id,
              "role_id": obj.role_id,
              "org_ids": org_ids
            }],
            "jyau_pubData": {
              "operator_id": "1",
              "account_id": "systemman",
              "ip_address": "10.2.0.116",
              "system_id": "10909"
            }
          }
        }
        console.log("req",req)
        axios.post("api/menuAuth/operatorMenuAuth",req).then(function(res){
           vm.$Message.success('修改成功!');
          console.log(res.data)
        }).catch(function(error){
          console.log(error)
           vm.$Message.error('修改失败!');
        })
      },
      submit(){
        let vm = this
        this.auth();
      },
      auth(){
       /* 后台接口改了 就废了 */
        let vm = this
        let menu_id = vm.currentMenu
        let req = {
            "jyau_content": {
              "jyau_reqData": [
                {
                  "req_no": "AU2018048201802051125231351",
                  "menu_id": menu_id,
                  "role_data": vm.data
                }
              ],
              "jyau_pubData": {
                "operator_id": "O201801301417012263",
                "account_id": "systemman",
                "ip_address": "10.2.0.116",
                "system_id": "10909"
              }
            }
          }
        
        
        axios.post("api/menuAuth/operatorMenuAuth",req).then(function(res){
          console.log("api/menuAuth/operatorMenuAuth",res.data)
        }).catch(function(error){
          console.log(error)
        })
        
      },
      setCurrentMenu(id){
        //console.log(id)
        let vm = this
        let req = {
           "jyau_content": {
            " jyau_reqData": [{
              "req_no": "AU2018048201802051125231351",
              "menu_id": id
            }],
            "jyau_pubData": {
              "operator_id": "O201801301417012263",
              "account_id": "systemman",
              "ip_address": "10.2.0.116",
              "system_id": "10909"
            }
          }
        }
        axios.post("api/menuAuth/queryRoleByMenu",req).then(function(res){
         
         vm.roleList=res.data.jyau_content.jyau_resData[0].role_data
         vm.orgList=res.data.jyau_content.jyau_resData[0].org_data
         vm.menuRoleOrg = res.data.jyau_content.jyau_resData[0].roleOrg_data
         vm.menuRoleOrgClone = res.data.jyau_content.jyau_resData[0].roleOrg_data
         //取消选择第一个角色
        /*  if(res.data.jyau_content.jyau_resData[0].roleOrg_data[0]){
           vm.setCurrentRole(res.data.jyau_content.jyau_resData[0].roleOrg_data[0].role_id,res.data.jyau_content.jyau_resData[0].roleOrg_data[0].role_Name)
         }else{
          let noDate = ""
          vm.setCurrentRole(noDate,noDate)
         } */
         
          
         
         
         
        }).catch(function(error){
          console.log(error)
        })
      },
      changeCurrentRole(id,name){
            let vm = this
            this.currentRoleClone.role_id=id
            this.currentRoleClone.role_name=name
            if(vm.isModified){
            vm.modal1=true
           
            return
          }
           this.currentRoleClone.role_id=""
            this.currentRoleClone.role_name=""
            setTimeout(function(){
                vm.orgShow=false
            },400)
             setTimeout(function(){
               vm.setCurrentRole(id,name)
                vm.orgShow=true
            },800)
             
          
      },
      setCurrentRole(id,name){
           let vm = this
           this.currentRole.role_id=id
           this.currentRole.role_name=name
           vm.data=[];
            vm.currentOrgList=[];
           for(let i=0; i<vm.menuRoleOrgClone.length; i++){
            if(vm.currentRole.role_id==vm.menuRoleOrgClone[i].role_id){
              vm.currentOrgList=vm.currentOrgList.concat(vm.menuRoleOrgClone[i].rg_data)
            
            }
          } 
        
        
        
      },
      changeCurrentOrg(id,name){
         
         let vm = this 
        vm.isModified=true
        let obj = {
          org_id: id,
          org_name: name
        }
        function check(){
           for(let i=0; i<vm.currentOrgList.length; i++){
            if(obj.org_id==vm.currentOrgList[i].org_id){
              vm.currentOrgList.splice(i,1)
              return false
            }
          }
          return true
        }
          
        if(check()){
          vm.currentOrgList.push(obj)
        }
        
      },
       changeCurrentMenu(id){
         let vm = this
         vm.currentMenuClone = id
         this.currentMenu=id
         let noDate = ""
         vm.setCurrentRole(noDate,noDate)
         this.setCurrentMenu(id);
         if(vm.isModified){
          vm.modal1=true
          
          return
        }
        this.currentMenuClone=""
         setTimeout(function(){
            vm.orgShow=false
         },300)
          setTimeout(function(){
           vm.roleShow=false
         },600)
          setTimeout(function(){
            vm.roleShow=true
         },900)
         /*  this.orgShow=false
          this.roleShow=false
         this.roleShow=true */
         
        
      },
      changeCheckRole(id,name){
        if(this.currentRole.role_id==id){
          this.currentRole.role_id=""
          this.currentRole.role_name=""
        }else{
          this.currentRole.role_id=id
          this.currentRole.role_name=name
        }
        
        
      },
      
       changeCheckMenu(id){
         if(this.currentMenu==id){
           this.currentMenu=""
         }else{
            this.currentMenu=id
         }
        
         this.setCurrentMenu(id);
      },
      initMenu(){
        let vm = this
        let req = {

          "jyau_content": {
            " jyau_reqData": [{
              "req_no": "AU2018048201802051125231351"
            }],
            "jyau_pubData": {
              "operator_id": "O201801301417012263",
              "account_id": "systemman",
              "ip_address": "10.2.0.116",
              "system_id": "10909"
            }
          }
        }

        axios.post("api/menuAuth",req).then(function(res){
         
          vm.menuList = res.data.jyau_content.jyau_resData[0].multi_menuList
          //取消自动选择第一个菜单
         /*  for(let i=0;i<vm.menuList.length;i++){
            if(vm.menuList[i].child_list){
               vm.currentMenu=vm.menuList[i].child_list[0].menu_id
               vm.setCurrentMenu(vm.menuList[i].child_list[0].menu_id)
              return
            }
          } */
          
        }).catch(function(error){
          console.log(error)
        })
      },
      init(){
      this.initMenu();
      },
    },
    mounted(){
      this.init()
    }
  }
</script>
<style scoped>
.fade-enter-active {
  transition: all .2s ease;
}
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter, .slide-fade-leave-to {
  transform: translateY(100px);
  opacity: 0;
}
li{
  list-style: none
}
.color_blue{
  color:#2d8cf0;
  border: 1px solid #2d8cf0;
}
.role-li{
  padding: 9px;
    border: 1px solid #e7ebee;
    border-radius: 3px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    transition: all .2s;
}
.menu-li{
    padding: 9px;
    margin-bottom: 5px;
    cursor: pointer;
    position: relative;
    transition: all .2s;
}
.ml20{
  margin-left:20px
}
.iview-admin-draggable-list li:hover {
    color: #87b4ee;
    border-color: #87b4ee;
    transition: all .2s;
}
</style>

