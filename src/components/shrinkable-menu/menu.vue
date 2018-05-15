<template>
    <div  class="ivu-shrinkable-menu">
        <slot name="top"></slot>
        <div>我是标题</div>
        <sidebar-menu 
            
            
            :menu-list="menuList" 
            :open-names="openNames"
            @on-change="handleChange"
           @father="xxxx"
        ></sidebar-menu>
      
    </div>
</template>

<script>
 import sidebarMenu from '@/components/shrinkable-menu/sidebarMenu.vue'; 

export default {
    name: 'menus',
    components: {
        sidebarMenu,
        
    },
    props:{
         menuList: {
            type: Array,
            required: true
        },
        beforePush: {
            type: Function
        },
        openNames: {
            type: Array
        }
    },
    methods:{
        xxxx(){
           /*  console.log("linkto") */
        },
        handleChange(name){
           
            this.$emit('on-change', name);
        }
    }
    
};
</script>
<style scoped>
.ivu-shrinkable-menu{
    height: 100%;
    width: 100%;
}
</style>

