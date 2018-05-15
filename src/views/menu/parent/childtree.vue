<template>

  <ul class="ul">
     
        <li :data-name="i.name" v-for="(i, m) in tree.children" :key="m" class="item" v-if="!searchopen[m]">
          <span  @click="toggle(m)" draggable='true' @dragstart='dragStart' @dragover='dragOver' @dragenter='dragEnter' @dragleave='dragLeave' @drop='drop' @dragend.prevent='dragEnd' :data-name="i.name">{{i.name}}</span>
         <span v-if="isdelete(i.name)" @click="removeItem(i)" style="color:red">删除</span>
        <!--  <span v-if="!isdelete(i.name)">+</span> -->
          <a></a>
         <span v-if="open[m]">
           <treeNode :tree="i" :searchname="childrentitle"></treeNode> 
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
             list:["张三","李四","王五","赵六",4,5],
             searchopen:[]
           
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
               for(let i=0;i<vm.tree.children.length;i++){
                //this.$set(this.open,i,false) 
                 vm.$set(this.searchopen,i,false) 
                
            }
              return
            }
            
            for(let i=0;i<vm.tree.children.length;i++){
                //this.$set(this.open,i,false) 
                 vm.$set(this.searchopen,i,vm.seachenameul(vm.tree.children[i])) 
                  vm.$set(this.open,i,!vm.seachenameul(vm.tree.children[i])) 
            }
           
              
            
            
          }
        },
        methods:{
          seachenameul(item){
            let vm = this;
            console.log(item)
            if(item.children){
              for(let j=0;j<item.children.length;j++){
                if(item.children[j].name.indexOf(vm.searchname)>-1){
                     return false
                }
              }
              return true

            }else{
              
            }
           
              
             
            
          },
          wode(){
            console.log("model") 
          
          },
          toggle: function (m) {
              let vm = this
              this.$set(this.open,m,!this.open[m])
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
          isdelete(item){
            let isdelete = (item.indexOf("人员")>-1)
            return isdelete
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
                     /*  console.log("to",root.children[i].children[j]) */
                       /*  root.children[i].children.splice(j, 0, dataset);  */
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

</style>

