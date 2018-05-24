<template>

  <ul class="ul">
     
        <li :data-name="i.name" v-for="(i, m) in tree.children" :key="m" class="item"  :class="{'tree-hidden':!i.searchopen,'tree-block':i.expanded }">
          <span  @click="toggle(m)" draggable='true' @dragstart='dragStart' @dragover='dragOver' @dragenter='dragEnter' @dragleave='dragLeave' @drop='drop' @dragend.prevent='dragEnd' :data-name="i.name" :data-id="i.id">{{i.name}}</span>
         <Icon type="arrow-right-b" v-if="(!i.open)&&i.children"></Icon>
         <Icon type="arrow-down-b" v-if="i.open&&i.children"></Icon>
         <span v-if="!i.children" @click="removeItem(i)" ><Icon type="ios-minus" style="color:red"></Icon></span>
        <!--  <span v-if="!isdelete(i.name)">+</span> -->
          <a></a>
          
         <span v-if="i.open">
          <!--  <treeNode :tree="i" :searchname="childrentitle"></treeNode>  -->
           
              <treeNode :tree="i" ></treeNode>
         
          </span>
           
        </li>
        <div>
          
        </div>
  </ul>

  
 
</template>
<script>
let fromData = {}
let toData={}
 export default{
        name:'treeNode',
       
        data(){
          return{
          }
        },
        props:{
          tree:{},
          searchname:""

        },
        computed:{
          isFolder: function () {
              return this.tree.children.children &&
                this.tree.children.children.length
            },
          childrentitle:function(){
            return this.searchname
          }
        },
        watch:{
          searchname:function(){
             let vm = this;
             
             if(vm.searchname==""){
               if(vm.tree.children){
                  vm.tree.children.forEach((child) => {
                   child.searchopen=true 
                    vm.tree.expanded=false
                 })
               }
             }else{
              
               if(vm.tree.children){
                   vm.tree.children.forEach((child) => {
                      child.searchopen=true 
                      vm.tree.expanded=false
                  })
                    
                  vm.tree.children.forEach((child) => {
                   
                    if(child.name.indexOf(vm.searchname)>-1){
                      child.searchopen=true 
                      vm.tree.expanded=true  
                      
                      //console.log("当前",child.name,"是否应该显示",child.searchopen,"当前父类",vm.tree.name)
                    }else{
                      child.searchopen=false 
                      //console.log("else",child.name,"是否应该显示",child.searchopen)
                    }

                  });
                 
                
               }
             
           

             }
           
          }
        },
        methods:{
          seachenameul(){
            
               
          },
          
          toggle: function (m) {
           
            let vm = this
            vm.tree.children[m].open = !vm.tree.children[m].open
             console.log("展开",m,vm.tree.children[m].open)
           
          },
          search(name){
            console.log("search")
            let vm = this;
            for(let i=0;i<vm.tree.children.length;i++){
                if(vm.tree.children[i].name.indexOf(name)>-1){
                  vm.open[i] = true
                }
            }
            
          },
          dragStart(e){
            //拖拽效果
            e.dataTransfer.effectAllowed = "move";
            fromData.child_name = e.target.dataset.name
            fromData.child_id = e.target.dataset.id
            fromData.parent_name = this.tree.name
            fromData.parent_id = this.tree.id
            console.log("dragStart",e.target.dataset.name,e.target.dataset.id,this.tree.name,this.tree.id)
            e.dataTransfer.setData("nottext", e.target.innerHTML);
            
           
          },
          dragEnter(e){
           
            toData.child_name = e.target.dataset.name
            toData.child_id = e.target.dataset.id
            toData.parent_name = this.tree.name
            toData.parent_id = this.tree.id
            
            if(this.$store.state.app.righttable==""){

            }else{
              this.$store.commit("setleftli",toData)
              
            }
            
             
          },
          dragLeave(e){
            
          },
          drop(e){

          },
          dragEnd(e){
            
              this.order(fromData,toData)
             
          },
          dragOver(e){

          },
          order(from,to){
             let vm = this;
            // console.log("from,to",from,to)
             this.check(from,to);
            
            

          },
          removeItem(item){
            console.log("removeItem",item)
            let vm = this 
             let root = vm.tree
              for(let i=0;i<root.children.length;i++){
                
                  if(item.id==root.children[i].id){
                   
                    root.children.splice(i,1)
                    
                    }
                  
                
              }
             //用户机构删除的操作
             console.log("删除后的tree",this.$store.state.app.tree)
          },
          checktable(from,to){
              
              let vm = this;
              
              let root = this.$store.state.app.tree
              
              let dataset={name:from};
              
                for(let i=0;i<root.children.length;i++){
                
                  for(let j=0;j<root.children[i].children.length;j++){
                   
                    if(to==root.children[i].children[j].name){
                     /*  console.log("to",root.children[i].children[j]) */
                       /*  root.children[i].children.splice(j, 0, dataset);  */
                        root.children[i].children.push(dataset)
                    }
                  }
              } 
              
              this.$store.commit("settree",root)
              
              
              
           

            
          },
          check(from,to){
               console.log("from",from,"to",to)
              let vm = this;
              
              let root = this.$store.state.app.tree
              
              let dataset;
              /* if((from.parent_name.indexOf("机构")>-1)||(to.indexOf("机构")>-1)){
                return
              } 
              if(from==to){
                return
              } */
              for(let i=0;i<root.children.length;i++){
                if(from.parent_id==root.children[i].id){
                   for(let j=0;j<root.children[i].children.length;j++){
                      if(from.child_id==root.children[i].children[j].id){
                          dataset = root.children[i].children[j]
                          root.children[i].children.splice(j,1)
                          //用户机构删除的操作
                        
                          }
                      
                    }

                }
               
              }
                for(let i=0;i<root.children.length;i++){
                 if(to.parent_id==root.children[i].id){
                   for(let j=0;j<root.children[i].children.length;j++){
                   
                    if(to.child_id==root.children[i].children[j].id){
                        //用户机构增加的操作
                        root.children[i].children.push(dataset)
                    }
                  }

                 }
                  
              } 
             
              this.$store.commit("settree",root)
              console.log("after",root,dataset)
              
           

          }

        }
  }
</script>
<style scoped>
.tree-hidden{
  display: none
}
.tree-block{
  display: block
}
li{
  list-style: none;
}

</style>

