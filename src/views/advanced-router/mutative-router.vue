<template>
  <div>
    <ul>
      <li v-for="item in list" :key="item" @click="handleChange(item)">{{item}}</li>
    </ul>
  </div>
  
</template>
<script>
  export default{
    name:'mutative-router',
    data(){
      return{
        list:[0,1,2,3,4]
      }
    },
    methods:{
      handleChange(value){
        this.$router.push({
            name: 'order-info',
            params:{id:value}
        });

      }
    }
  }  
</script>
<style>

</style>

