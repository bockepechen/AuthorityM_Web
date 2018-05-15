import {otherRouter, appRouter} from '@/router/router';
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
      state.tree=value
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
}
export default app;