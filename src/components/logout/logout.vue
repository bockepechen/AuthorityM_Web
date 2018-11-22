<template>
   <div  @click="logout()" style="width: 20px;display: inline-block;"> 
            <Tooltip content="退出" placement="bottom">
               <Icon  type="log-out" size="20"></Icon>
            </Tooltip>
      </div>
</template>
<script>
import Util from '@/libs/util';
/* import axios from 'axios'; */
  export default{
    name:"logout",
    data(){
      return{}
    },
    methods:{
      logout(){

                
                 let array = []
                 this.$store.commit("setMenuList",array)
                 this.$router.push({name:'login'})
                 this.$emit("logout")
                 let req = {
                    "jyau_content": {
                        " jyau_reqData": [{
                            "req_no": "AU2018048201802051125231351"
                        }],
                            "jyau_pubData": {
                                "operator_id": JSON.parse( Util.getStorge("User")).jyau_content.jyau_resData[0].operator_id,
                                "account_id": "systemman",
                                "ip_address": "10.2.0.116",
                                "system_id": "10909"
                            }
                        }
                    }
                Util.axios.post("api/logout",req).then(function(res){
                    Util.removeStorge("organization")
                    Util.removeStorge("UserName")
                    Util.removeStorge("User")
               
                     console.log(res)
                },error=>{
                    console.log(error)
                })
            }
    }
  }
</script>
<style scoped>

</style>

