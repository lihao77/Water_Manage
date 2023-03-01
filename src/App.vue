<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>

    <!-- <testVue /> -->
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-left",
    };
  },
  components: {},
  watch: {
    $route(to, from) {
      const { index: toIndex } = to.meta;
      const { index: fromIndex } = from.meta;
      this.transitionName = toIndex < fromIndex ? "slide-right" : "slide-left";
      console.log("this.transitionName",this.transitionName ,toIndex,fromIndex)
    },
  },
};
</script>

<style>
#app {
  height: 100%;
  font-size: small;
}

.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  width: 100vw;
  will-change: transform;
  transition: all 500ms;
  position: absolute;
}

.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}

.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
</style>
