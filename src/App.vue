<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  watch: {
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      document.title = `${to.meta.title ? `${to.meta.title} - ` : ''}Github`;
    },
  },
};
</script>

<style lang="scss">
  /**
   *
   * Normalize from Tailwind
   * https://unpkg.com/tailwindcss@1.1.4/dist/base.css
   *
   */
  @import "@/assets/base/_normalize.scss";
  /**
   *
   * Base
   *
   */
  @import "@/assets/base/_container.scss";
  @import "@/assets/base/_fonts.scss";
  @import "@/assets/base/_transitions.scss";
  @import "@/assets/base/_modal.scss";
  /**
   *
   * Project
   *
   */
  @import "@/assets/project/_buttons.scss";
  @import "@/assets/project/_typography.scss";

  html {
    scroll-behavior: smooth;

    body {
      font-family: $font-sans;
      color: $black;
      font-weight: $font-regular;
      font-size: $text-base;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;

      #app {
        min-height: 100vh;
      }

      svg {
        max-width: 100%;
        height: auto;
      }
    }
  }
</style>
