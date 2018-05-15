import Vue from 'vue'
import Router from 'vue-router'
import {routers, appRouter} from './router';
import iView from 'iview'
Vue.use(Router)

const RouterConfig = {
  // mode: 'history',
  routes: routers
};

export const router = new Router(RouterConfig);


router.beforeEach((to,from,next) => {
  iView.LoadingBar.start();
  if(to.name=='login'){
    next(true);
  }else{
    if(localStorage.getItem("UserName")=='admin'){
      next(true);
    }else{
      
      next({
        name: 'login'
      }) 
    }

  }
  
  

})
router.afterEach((to) => {

  //console.log("to",to.meta.title)
  util.openNewPage(router.app, to.name, to.params, to.query,to.meta.title);
  iView.LoadingBar.finish();
 
});

let util = {};
util.openNewPage = function (vm,name,argu,query,title){
  let pageOpenedList = vm.$store.state.app.pageOpenedList;
  let openedPageLen = pageOpenedList.length;
  let i = 0;
  let tagHasOpened = false;
 // console.log(name)
  let tag = {}
  tag.name = name
  tag.argu = argu
  tag.query = query
  tag.title = title
 // console.log("currentPath",vm.$store.state.app.currentPath)
  vm.$store.commit('setCurrentPath', tag);
 // console.log("currentPath",vm.$store.state.app.currentPath)
 function check(){
   for(let i=0;i<pageOpenedList.length;i++){
      if(pageOpenedList[i].name==tag.name){
        return false
      }
      
   }
   return true
 }
 function checkTag(){
   console.log(vm.$store.state.app.routers)
  for(let i=0;i<vm.$store.state.app.routers;i++){
    
     if(vm.$store.state.app.routers[i].name==tag.name){
       return true
     }
     
  }
  return false
}

//console.log("tages",vm.$store.state.app.routers,tags)
 //let tags = vm.$store.state.app.tagsList.filter
 if(check()){
   if(tag.name=='error-404'||tag.name=='locking'||tag.name=='login'){
     return
   }else{
    vm.$store.commit('pushpageOpenedList', tag);
   }
    
  } 
  //console.log(vm.$store.state.app.pageOpenedList)
}