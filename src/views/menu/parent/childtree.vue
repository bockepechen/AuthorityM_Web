<template>

  <ul class="ul">
        <li :data-name="i.name" v-for="(i, m) in tree.children" :key="m" class="item">
          <span  @click="toggle(m)" draggable='true' @dragstart='dragStart' @dragover='dragOver' @dragenter='dragEnter' @dragleave='dragLeave' @drop='drop' @dragend.prevent='dragEnd' :data-name="i.name">{{i.name}}</span>
         <span v-if="isFolder">+</span>
          <a></a>
         <span v-if="open[m]">
           <treeNode :tree="i"></treeNode> 
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
          }
        },
        props:{
          tree:{}

        },
        computed:{
          isFolder: function () {
              return this.tree.children.children &&
                this.tree.children.children.length
            }
        },
        methods:{
          wode(){
            /*  console.log("model",this.model) */
          
          },
          toggle: function (m) {
              let vm = this
              this.$set(this.open,m,!this.open[m])
            
             
            
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
              console.log("root",root)
              let dataset;
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
              console.log("root",root)
              this.$store.commit("settree",root)
              console.log("after",root,dataset)
              
           

          }

        }
  }
</script>
<style scoped>

</style>

