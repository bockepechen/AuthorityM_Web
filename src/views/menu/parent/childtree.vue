<template>

  <ul class="ul">
     
        <li :data-name="i.name" v-for="(i, m) in tree.children" :key="m" class="item"  :class="{'tree-hidden':!i.searchopen,'tree-block':i.expanded }">
          <span  @click="toggle(m)" draggable='true' @dragstart='dragStart' @dragover='dragOver' @dragenter='dragEnter' @dragleave='dragLeave' @drop='drop' @dragend.prevent='dragEnd' :data-name="i.name">{{i.name}}</span>
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
let fromData = ''
let toData=""
 export default{
        name:'treeNode',
       
        data(){
          return{
            open: [],
             list:["张三","李四","王五","赵六",4,5]
            
           
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
          wode(){
            console.log("model") 
          
          },
          toggle: function (m) {
            let vm = this
            vm.tree.children[m].open = !vm.tree.children[m].open
              
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
            fromData = e.target.dataset.name
           
            e.dataTransfer.setData("nottext", e.target.innerHTML);
            
            return true
          },
          dragEnter(e){
           
            toData = e.target.textContent
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
             this.check(from,to);
            
            

          },
          removeItem(item){
            console.log(item)
             let root = this.$store.state.app.tree
              for(let i=0;i<root.children.length;i++){
                for(let j=0;j<root.children[i].children.length;j++){
                  if(item.name==root.children[i].children[j].name){
                   
                    root.children[i].children.splice(j,1)
                    }
                  
                }
              }
             this.$store.commit("settree",root)
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
              if((from.indexOf("机构")>-1)||(to.indexOf("机构")>-1)){
                return
              }
              if(from==to){
                return
              }
              for(let i=0;i<root.children.length;i++){
                for(let j=0;j<root.children[i].children.length;j++){
                  if(from==root.children[i].children[j].name){
                    dataset = root.children[i].children[j]
                    root.children[i].children.splice(j,1)
                    }
                  
                }
              }
                for(let i=0;i<root.children.length;i++){
                
                  for(let j=0;j<root.children[i].children.length;j++){
                   
                    if(to==root.children[i].children[j].name){
                    
                        root.children[i].children.push(dataset)
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

