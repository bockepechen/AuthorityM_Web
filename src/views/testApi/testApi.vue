<template>
<div>
  <ul>
    <li @click="login">登录</li>
    <li @click="modifyOperator">修改</li>
    <li @click="display">锁定</li>
    <li @click="deleteOperator">删除</li>
  </ul>
  </div>  
</template>
<script>
import axios from 'axios';
  export default{
    data(){
      return{

      }
    },
    methods:{
      deleteOperator(){
          let req = {
                  "jyau_content": {
                    "jyau_reqData": [{
                      "req_no": " AU001201810231521335687"
                    }],
                    "jyau_pubData": {
                      "operator_id": "OP201805151658244366",
                      "account_id": "systemman",
                      "ip_address": "10.2.0.116",
                      "system_id": "10909"
                    }
                  }
                }

          axios.post('api/operator/deleteOperator',req)
          .then(function(res){
          
            console.log(res.data)
          
          })
          .catch(function(error){
            console.log(error)
          }) 
      },
      display(){
          let req = {
                    "jyau_content": {
                      "jyau_reqData": [{
                        "req_no": " AU001201810231521335687"
                      }],
                      "jyau_pubData": {
                        "operator_id": "1",
                        "account_id": "systemman",
                        "ip_address": "10.2.0.116",
                        "system_id": "10909"
                      }
                    }
                  }

          axios.post('api/operator/displayOperator',req)
          .then(function(res){
          
            console.log(res.data)
          
          })
          .catch(function(error){
            console.log(error)
          }) 
      },
      modifyOperator(){
          let req = {
            "jyau_content": {
              "jyau_reqData": [{
                "req_no": " AU001201810231521335687",
                "account": "systemman",
                "name": "zhangsan",
                "pwd": "897889",
                "status": "01",
                "ifAdmin": "1",
                "type": "02"
              }],
              "jyau_pubData": {
                "operator_id": "1",
                "account_id": "systemman",
                "ip_address": "10.2.0.116",
                "system_id": "10909"
              }
            }
          }
          let req1 = {
	"jyau_content": {
		"jyau_reqData": [{
			"req_no": " AU001201810231521335687",
			"account": "XINZ",
			"name": "testaccountname",
			"pwd": "897889",
			"status": "01",
			"ifAdmin": "1",
			"type": "01"
		}],
		"jyau_pubData": {
			"operator_id": "1",
			"account_id": "systemman",
			"ip_address": "10.2.0.116",
			"system_id": "10909"
		}
	}
}

          axios.post('api/operator/modifyOperator',req1)
          .then(function(res){
          
            console.log(res.data)
          
          })
          .catch(function(error){
            console.log(error)
          }) 
      },
      login(){
        let req = {
            "jyau_content": {
              "jyau_reqData": [{
                "req_no": " AU001201810231521335687",
                "account_pwd": "6fdefAERTYP"
              }],
              "jyau_pubData": {
                "oprator_id": "",
                "account_id": "systemman",
                "ip_address": "10.2.0.116",
                "system_id": "10909"
              }
            }
          }
       axios.post('api/login',req)
        .then(function(res){
        
       console.log(res.data)
        
        })
        .catch(function(error){
        console.log(error)
        })  

      },
    }
  }
</script>
<style>

</style>
