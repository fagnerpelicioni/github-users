<template>
  <div class="message" :class="'message--' + type">
    <div class="message__text">
      <slot></slot>
    </div>
    <div class="message__details">
      <slot name="details"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    type: {
      required: true,
      validator(value) {
        return ['error', 'success'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    color() {
      switch (this.type) {
        case 'error':
          return 'text--color-red';
        case 'success':
          return 'text--color-green';
        default:
          return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  .message {
    width: 100%;
    border-radius: $radius-lg;
    padding: 1.5rem;
    margin: 1rem 0;
    text-align: center;
    font-weight: $font-medium;

    &--error {
      background: $red-100;
      color: $red-600;
    }
    &--success {
      background: $green-100;
      color: $green-600;
    }
  }
</style>
