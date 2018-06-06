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
        menuList:[],
        orgList:[],
        currentMenu:"",
        currentMenuClone:"",
        orgShow:false,
        menuOrg:[],
        currentOrgList:[],
        modal1: false,
        isModified:false
      }
    },
    methods:{
      initMenu(){
          let vm = this
          let id = this.$route.params.id;
          let req = {

          "jyau_content": {
            " jyau_reqData": [{
              "req_no": "AU2018048201802051125231351",
             "role_id": id
            }],
            "jyau_pubData": {
              "operator_id": "O201801301417012263",
              "account_id": "systemman",
              "ip_address": "10.2.0.116",
              "system_id": "10909"
            }
          }
        }


          axios.post("api/menuAuth/queryMenuOrgByRole",req).then(function(res){
            console.log(res.data.jyau_content.jyau_resData[0])
            vm.menuList = res.data.jyau_content.jyau_resData[0].menu_data
            vm.orgList =  res.data.jyau_content.jyau_resData[0].org_data
            vm.menuOrg = res.data.jyau_content.jyau_resData[0].menuOrg_data
          }).catch(function(error){
            console.log(error)
        })
      },
      init(){
        this.initMenu();
        
      },
      ok(){
        let vm = this
         //vm.isModified=false
         vm.save()
         vm.changeCurrentMenu(vm.currentMenuClone)
        
      },
      cancel(){
         let vm = this
         vm.isModified=false
         vm.changeCurrentMenu(vm.currentMenuClone)
      },
      changeCurrentMenu(id){
        console.log(id)
        let vm = this
         vm.currentMenuClone=id
        if(vm.isModified){
          vm.modal1=true
           return
        }
         setTimeout(function(){
            vm.orgShow=false
         },300)
          setTimeout(function(){
            vm.setCurrentMenu(id)
            vm.orgShow=true
            
         },600)
      },
      setCurrentMenu(id){
        let vm = this
        vm.currentMenu=id
        vm.currentOrgList=[]
         for(let i=0; i<vm.menuOrg.length; i++){
            if(vm.currentMenu==vm.menuOrg[i].menu_id){
              vm.currentOrgList=vm.currentOrgList.concat(vm.menuOrg[i].mg_data)
            
            }
          } 
         console.log("vm.currentOrgList",vm.currentOrgList) 
      },
      checkOrg(id){
        let vm = this
        for(let i=0; i<vm.menuOrg.length; i++){
          if(vm.currentMenu==vm.menuOrg[i].menu_id){
            for(let j=0; j<vm.menuOrg[i].mg_data.length; j++){
              if(id==vm.menuOrg[i].mg_data[j].org_id){
                return true
              }
            }
          }
        }
        return false
      },
      changeCurrentOrg(id,name){
         let vm = this
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
           /*  for(let i=0; i<vm.menuOrg.length; i++){
              if(vm.currentMenu==vm.menuOrg[i].menu_id){
               vm.menuOrg[i].mg_data.push(obj)
              }
            } */
          }
          vm.isModified=true
          console.log(vm.menuOrg,vm.currentOrgList)
      },
      save(){
       
        let vm = this
         vm.isModified=false
        let obj = {
          role_id:vm.$route.params.id,
          menu_id:vm.currentMenu,
          org_ids:[]
        }
        
        for(let i=0; i<vm.currentOrgList.length; i++){
              obj.org_ids.push(vm.currentOrgList[i].org_id)
        }
        for(let i=0; i<vm.menuOrg.length; i++){
              if(vm.currentMenu==vm.menuOrg[i].menu_id){
               vm.menuOrg[i].mg_data=vm.currentOrgList
              }
        }
         
        this.saveAuth(obj)
      },
      saveAuth(obj){
        let vm = this
        let req = {
          "jyau_content": {
            "jyau_reqData": [{
              "req_no": "CL048201802051125231351",
              "menu_id": obj.menu_id,
              "role_id": obj.role_id,
              "org_ids": obj.org_ids
            }],
            "jyau_pubData": {
              "operator_id": "1",
              "account_id": "systemman",
              "ip_address": "10.2.0.116",
              "system_id": "10909"
            }
          }
        }
        console.log("req",JSON.stringify(req))
        axios.post("api/menuAuth/operatorMenuAuth",req).then(function(res){
           vm.$Message.success('修改成功!');
          console.log(res.data)
        }).catch(function(error){
          console.log(error)
           vm.$Message.error('修改失败!');
        })


      }
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

