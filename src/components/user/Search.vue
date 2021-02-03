<template>
  <section class="search__container">
    <label for="search" class="search__title">
      {{ $t('home.search.title') }}
    </label>
    <input
      type="text"
      class="search__input"
      id="search"
      v-model="input"
      @keyup.enter="search()"
      :placeholder="$t('home.search.placeholder')">
  </section>
</template>

<script>
export default {
  name: 'Search',

  data() {
    return {
      input: null,
    };
  },

  methods: {
    search() {
      if (this.input) {
        this.$emit('sendSearch', this.input);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search {
  &__container {
    padding: 2rem 1rem;
  }

  &__title {
    font-size: $text-2xl;
    font-weight: $font-bold;
    text-align: center;
    display: block;
    color: $primary;
  }

  &__input {
    width: 100%;
    padding: 0.75rem 1.5rem;
    background-color: $transparent;
    font-size: $text-sm;
    line-height: 18px;
    color: $gray-500;
    background-color: $transparent;
    background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: 1.1rem 1.1rem;
    background-position: 95% center;
    border-radius: 50px;
    border: 1px solid $gray-500;
    transition: all 250ms ease-in-out;
    backface-visibility: hidden;
    transform-style: preserve-3d;

    &::placeholder {
      color: rgba($gray-500, 0.5);
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    &:hover,
    &:focus {
      padding: 0.75rem 0;
      outline: 0;
      border: 1px solid $transparent;
      border-bottom: 1px solid $gray-500;
      border-radius: 0;
      background-position: 100% center;
    }
  }
}
</style>
