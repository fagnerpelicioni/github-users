
<template>
  <div class="loading">
    <div class="loading__overlay" />
    <div class="loading__component">
      <!-- eslint-disable -->
      <svg viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" width="32" height="32" stroke="currentColor">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".25" cx="18" cy="18" r="18" />
            <path d="M36 18c0-9.94-8.06-18-18-18" transform="rotate(285.13 18 18)">
              <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.8s" repeatCount="indefinite">
              </animateTransform>
            </path>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
};
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  left: 0;
  right: 0;
  top: 15rem;
  bottom: 0;

  &__component {
    color: $primary;
    fill: $primary;

    svg {
      margin: auto auto;
    }
  }
}
</style>
