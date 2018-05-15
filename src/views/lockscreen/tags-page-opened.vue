<template>
  <div>
      <!-- <ul>
          <li v-for="(item,index) in pages" :key="index">{{item}}<p v-if="currentPath==item">选中的是我</p><p @click="close(item)" v-if="index>0">关闭</p></li>
      </ul>
      <div @click="closeAll();">全部关闭</div>
      <div @click="closeOther()">关闭其他</div> -->
      <div>
          <Tag 
                    type="dot"
                    v-for="(item, index) in pages" 
                    :key="index.name" 
                    :name="item.name" 
                    @click.native="linkTo(item)"
                    @on-close="close(item)"
                    :closable="index>0?true:false"
                    :color="item.name==currentPath.name?'blue':'default'"
                >{{ item.title }}</Tag>
      </div>
  </div>
</template>
<script>

   export default{
       data(){
           return{
               
               
           }
       },
       computed:{
           pages(){
              return this.$store.state.app.pageOpenedList; 
           },
           currentPath(){
               return this.$store.state.app.currentPath
           }
       },
       methods:{
           close(item){
              // console.log("item",item)
               let vm = this
                let check =function (){
                        for(let i=0;i<vm.pages.length;i++){
                            if(vm.pages[i].name==item.name){
                            return i
                            }
                        }
                    }
                   // console.log("check",check(),this.pages.length-1);
               if(item.name==this.currentPath.name){
                  if((check())==(this.pages.length-1)){
                      
                      
                      
                      this.$store.commit('closepageOpenedList',item)
                       this.$store.commit('orderCurrentPath',this.pages.length-1) 
                      
                       vm.$router.push({
                          name:vm.currentPath.name
                      })
                  }else{
                     
                      
                   let order = check()
                    this.$store.commit('closepageOpenedList',item)
                    this.$store.commit('orderCurrentPath',order)  
                     
                    vm.$router.push({
                          name:vm.currentPath.name
                      })
                  }
               }else{
                   //console.log(2)
                   this.$store.commit('closepageOpenedList',item) 
               }
               
               
           },
           closeAll(){
                this.$store.commit('closeallpageOpenedList')
           },
           closeOther(){
                this.$store.commit('closeotherpageOpenedList')
           },
           linkTo(item){
              // console.log(item)
               let routerObj = {};
               routerObj.name = item.name;
               //routerObj.name = item;
                if (item.argu) {
                    routerObj.params = item.argu;
                }
                if (item.query) {
                    routerObj.query = item.query;
                }
                
                    this.$router.push(routerObj);
               

           }
       }
   } 
</script>
<style scoped>
li{
    display:inline-block;
    min-width: 30px;
    margin-left: 10px;
    background-color: antiquewhite
}
</style>

