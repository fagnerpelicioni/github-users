<template>
  <article class="card">
    <router-link class="card-image"
      :to="{ name: 'Usuario', params: { userId: user.login } }">
      <img class="card-image__image"
        :src="user.avatar_url" :alt="user.name">
    </router-link>

    <router-link class="card-name text--color-primary text--weight-bold"
      :to="{ name: 'Usuario', params: { userId: user.login } }">
      {{ user.login }}
    </router-link>

    <div class="card-info">
      <p class="card-info__id">
        {{ 'ID: ' }}
        <span>{{ user.id }}</span>
      </p>
    </div>
  </article>
</template>

<script>
export default {
  name: 'Card',

  props: {
    user: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  margin: 1rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  transition: $transition-1;
  border-radius: $radius-lg;
  background: $white;
  box-shadow: 0 2px 4px 0 rgba($black, 0.16);

  &:hover {
    transition: $transition-1;
    box-shadow: 1px 4px 10px 4px rgba($black, 0.16);
    transform: scale(1.2);
  }

  @include screen(phone-up) {
    flex: 0 0 calc(33.33% - 2rem);

  }
  @include screen(tablet-up) {
    flex: 0 0 calc(25% - 2rem);

  }
  @include screen(desktop-up) {
    flex: 0 0 calc(20% - 2rem);
  }

  .card-image {
    width: 100%;
    height: 100%;

    &__image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .card-name {
    padding: .5rem 0;

    &:hover {
      text-decoration: underline;
    }
  }

  .card-info {
    padding-bottom: 1rem;
    font-size: $text-sm;

    &__id {
      font-weight: $font-bold;

      span {
        font-weight: $font-normal;
      }
    }
  }
}
</style>
