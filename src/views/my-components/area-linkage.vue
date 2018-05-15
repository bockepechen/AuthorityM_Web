<template>
  <div>
     <al-selector v-model="res_s" data-type="name"/>
    <al-cascader v-model="res_c" />
    <div @click="showTime()">showtime</div>
  </div>
</template>
<script>
  export default{
    name:'home',
     data () {
            return {
                res_s: [],
                res_c: []
            }
        },
    methods:{
      showTime(){
        console.log(this.res_s)
      }
    }
  }
  
</script>
<style>

</style>
