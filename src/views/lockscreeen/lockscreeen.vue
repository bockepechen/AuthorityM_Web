<template>
  <div>
    <button @click="show = !show">Toggle show</button>
    <transition name="bounce">
      <div v-if="show">
        <div>解锁</div>
        <div>已经锁定</div>
      </div>
    
    </transition>
  </div>
</template>
<script>
export default{
  data(){
    return{
      show: false
    }
  },
  mounted(){
    this.show = !this.show
  }

}
</script>
<style scoped>
.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}
</style>

