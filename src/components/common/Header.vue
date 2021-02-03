<template>
  <nav class="header">
    <div class="container">
      <div class="header__container">
        <router-link :to="{ name: 'Home' }" class="header__logo">
          <img class="logo" src="@/assets/logo.png" alt="Logo">
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
};
</script>

<style lang="scss" scoped>
  .header {
    width: 100%;
    box-shadow: 0 2px 4px 0 rgba($black, 0.16);
    padding: 0.75rem 0;

    @include screen(phone-only) {
      padding: 0.5rem 0;
    }

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__logo {
      width: 25%;
      max-width: 250px;
      margin: auto;

      .logo {
        max-height: 50px;
        margin: auto;

        @include screen(phone-only) {
          max-height: 60px;
        }
      }
    }
  }
</style>
