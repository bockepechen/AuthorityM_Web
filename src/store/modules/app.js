import {otherRouter, appRouter} from '@/router/router';
import axios from 'axios';
/* 主要包括三个变量 当前打开页面 展示路由的list 和所有路由的list */
const app = {
  state:{
        pageOpenedList: [{
            title: '首页',
            path: '',
            name: 'home_index'
        }],
        tree:{},
        righttable:'',
        leftli:'',
        routers: [
          otherRouter,
          
       ],
       tagsList: [...otherRouter.children],
       currentPath: [
          {
            title: '首页',
            path: '',
            name: 'home_index'
          }
      ],
  },
  mutations:{
    //导航栏部分
    setCurrentPath (state, pathArr) {
        state.currentPath = pathArr;
    },
    settree(state,value){
      state.tree=null
      state.tree=value
    },
    gettree(state){
      console.log("gettree",state.tree)
      return state.tree
    },
    inittree(state,value){

    },
    setleftli(state,value){
      state.leftli=value
    },
    setrighttable(state,value){
      state.righttable=value
    },
    orderCurrentPath (state,i){
      //console.log('i',i)
      state.currentPath = state.pageOpenedList[i]
    },
    pushpageOpenedList(state, pathArr){
      state.pageOpenedList.push(pathArr);
    },
    closeallpageOpenedList(state){
      state.pageOpenedList.splice(1);
    },
    closeotherpageOpenedList(state){
      for(let i=0;i<state.pageOpenedList.length;i++){
        if(state.pageOpenedList[i]!=state.pageOpenedList[0]&&state.pageOpenedList[i]!= state.currentPath){
          state.pageOpenedList.splice(i,1)
        }
      }
      
    },
    closepageOpenedList(state, pathArr){
     //console.log("pathArr",pathArr)
     
     function check(){
      for(let i=0;i<state.pageOpenedList.length;i++){
        if(state.pageOpenedList[i].name==pathArr.name){
          return i
        }
      }
     }
     state.pageOpenedList.splice(check(),1)
     
      
    }
    //左菜单部分

  },
  actions: {
    increment (context) {
     // state.commit('inittree')
     let req =   {
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
    return new Promise(function(resolve,reject){
         resolve( axios.post('api/emporg',req).then(function(res){ 
         //return state.tree
         
          let value=res.data.jyau_content.jyau_resData[0]
          context.state.tree.name="myTree"
          context.state.tree.searchopen=true
          context.state.tree.expanded=false
          context.state.tree.children=[]
          for(let i =0;i<(value.orgemp_list.length-1);i++){
            let obj={}
            obj.name=value.orgemp_list[i].org_name
            obj.open=true
            obj.searchopen=true
            obj.expanded=false
          
            if(value.orgemp_list[i].emp_list){
              obj.children=[]
              for(let j=0;j<value.orgemp_list[i].emp_list.length;j++){
                let child = {}
                child.name=value.orgemp_list[i].emp_list[j].name
                child.open=true
                child.searchopen=true
                child.expanded=false
                obj.children.push(child)
              }
            }
            context.state.tree.children.push(obj)
          }
          console.log("state.tree",context.state.tree)
          return context.state.tree
        }).catch(function(error){
            
        }) )
    })
    
   
    
    },
    actionB ({ dispatch, commit }) {
      return dispatch('increment').then((res) => {
        console.log("actionB",res)
        commit('gettree')
        return res
      })
    },
    asyncsetTree(context,value){
      context.state.tree = value
      return context.state.tree 
    }
  }
}
export default app;