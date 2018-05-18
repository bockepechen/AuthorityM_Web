<template>
<div>
  <ul>
    <div>用户</div>
    <li @click="login">登录</li>
    <li @click="operator">所有用户信息</li>
    <li @click="modifyOperator">新增修改用户</li>
    <li @click="displayOperator">用户详细信息</li>
    <li @click="deleteOperator">删除用户信息</li>
    <div>机构</div>
    <li @click="org">机构列表</li>
    <li @click="orgSaveOrg">新增修改机构</li>
    <li @click="delOrg">删除机构</li>
    <li></li>
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
      login(){
        let req = {
                  "jyau_content": {
                    "jyau_reqData": [{
                      "req_no": " AU001201810231521335687",
                      "account_pwd": "6fdefAERTYP"
                    }],
                    "jyau_pubData": {
                      "operator_id": "",
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
      operator(){
          let req =  {
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


          axios.post('api/operator',req)
          .then(function(res){
          
            console.log(res.data)
          
          })
          .catch(function(error){
            console.log(error)
          }) 
      },
      deleteOperator(){
          let req = {
                  "jyau_content": {
                    "jyau_reqData": [{
                      "req_no": " AU001201810231521335687"
                    }],
                    "jyau_pubData": {
                      "operator_id": "OP201805171409322521",
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
      displayOperator(){
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
      org(){
        let req = {
          "jyau_content": {
            "jyau_reqData": [
              {
                "req_no": "AU002201810231521335687"
              }
            ],
            "jyau_pubData": {
              "operator_id": "1",
              "ip_address": "10.2.0.116",
              "account_id": "systemman",
              "system_id": "10909"
            }
          }
        }
        axios.post("api/org",req).then(function(res){console.log(res.data)}).catch(function(error){console.log(error)})

      },
      orgSaveOrg(){
        let req =  {
            "jyau_content": {
              "jyau_reqData": [
                {
                  "req_no": "CL048201802051125231351",
                  "org_id": "",
                  "org_code": "0001",
                  "org_name": "天津嘉业智德分公司1"
                }
              ],
              "jyau_pubData": {
                "operator_id": "1",
                "ip_address": "10.2.0.116",
                "account_id": "systemman",
                "system_id": "10909"
              }
            }
          }

        axios.post("api/org/saveOrg",req).then(function(res){console.log(res.data)}).catch(function(error){console.log(error)})

      },
      delOrg(){
        let req =  {
              "jyau_content": {
                "jyau_reqData": [
                  {
                    "req_no": "AU004201802051125231351",
                    "org_id": "2"
                  }
                ],
                "jyau_pubData": {
                  "operator_id": "1",
                  "ip_address": "10.2.0.116",
                  "account_id": "systemman",
                  "system_id": "10909"
                }
              }
            }


        axios.post("api/org/delOrg",req).then(function(res){console.log(res.data)}).catch(function(error){console.log(error)})

      }
      
    }
  }
</script>
<style>

</style>
