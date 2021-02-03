<template>
  <div class="base">
    <Header/>
    <div class="container">
      <main class="main">
        <transition name="slide-fade" mode="out-in">
          <router-view/>
        </transition>
      </main>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/common/Header.vue';

export default {
  name: 'Base',

  components: {
    Header,
  },
};
</script>

<style lang="scss" scoped>

</style>
