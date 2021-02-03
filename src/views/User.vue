<template>
  <div class="user">
    <div v-if="helper.loading" class="loading">
      <Loading />
    </div>
    <msg v-if="helper.feedback.show" :type="helper.feedback.type">
      {{ helper.feedback.message }}
    </msg>
    <section v-if="!helper.loading && !this.helper.feedback.show"
      class="user__content">

      <div class="user-image">
        <img class="user-image__image"
          :src="user.avatar_url" :alt="user.name">
      </div>

      <div class="user-info">
        <p class="user-info__name text--color-primary text--weight-bold">
          {{ user.name }}
        </p>
        <div v-if="user.bio" class="user-info__desc">
          <p>
            {{ user.bio }}
          </p>
        </div>
        <p class="user-info__id">
          {{ 'ID: ' }}
          <span>{{ user.id }}</span>
        </p>
        <p v-if="user.location" class="user-info__location">
          {{ $t('user.location') }}
          <span>
            {{ user.location }}
          </span>
        </p>
        <p v-if="user.company" class="user-info__location">
          <span>
            {{ user.company }}
          </span>
        </p>
        <p v-if="user.blog" class="user-info__link">
          <a class="text text--color-primary" :href="user.blog">
            {{ user.blog }}
          </a>
        </p>
        <div class="user-info__options">
          <button class="btn btn--color-secondary" :class="{ 'btn--active' : showRepos }"
            @click.prevent="showRepos = !showRepos">
            {{ $t('user.repository') }}
          </button>
          <button class="btn btn--color-secondary" :class="{ 'btn--active' : showStarred }"
            @click.prevent="showStarred = !showStarred">
            {{ $t('user.starred') }}
          </button>
        </div>
      </div>
      <div class="user-lists">
        <div v-if="showRepos" class="repositories">
          <p class="text text--weight-bold">
            {{ $t('user.repository') }}
          </p>
          <div class="repositories__item" v-for="repo in repos" :key="repo.id">
            <a class="text text--color-primary text--weight-bold" :href="repo.html_url">
              {{ repo.name }}
            </a>
            <p class="text text--weight-light" v-if="repo.description">
              {{ repo.description }}
            </p>
          </div>
        </div>
        <div v-if="showStarred" class="starred">
          <p class="text text--weight-bold">
            {{ $t('user.starred') }}
          </p>
          <div class="starred__item" v-for="star in starred" :key="star.id">
            <a class="text text--color-primary text--weight-bold" :href="star.html_url">
              {{ star.name }}
            </a>
            <p class="text text--weight-bold">
              {{ star.owner.login }}
            </p>
            <p class="text text--weight-light" v-if="star.description">
              {{ star.description }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

const Loading = () => import('@/components/common/Loading');
const msg = () => import('@/components/common/Message');

export default {
  name: 'Usuario',

  props: {
    userId: {
      type: String,
      required: true,
    },
  },

  components: {
    Loading,
    msg,
  },

  data() {
    return {
      showRepos: false,
      showStarred: false,
      helper: {
        loading: true,
        feedback: {
          show: false,
          type: 'error',
          message: null,
        },
      },
    };
  },

  computed: {
    ...mapGetters({
      user: 'userGetData',
      repos: 'userGetRepos',
      starred: 'userGetStarred',
    }),
  },

  created() {
    this.getUser();
  },

  methods: {
    ...mapActions([
      'showUser',
      'showUserRepos',
      'showUserStarred',
    ]),

    async getUser() {
      try {
        await this.showUser(this.userId);
        await this.showUserRepos(this.userId);
        await this.showUserStarred(this.userId);
        this.helper.loading = false;
      } catch (e) {
        this.helper.loading = false;
        if (e && !e.request) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.request'),
          });
        } else if (e && e.response) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: e.response.data.message,
          });
        } else {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.generic'),
          });
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.user {
  padding: 2rem 0;

  &__content {
    display: flex;
    flex-wrap: wrap;

    .user-image {
      width: 100%;
      margin: auto;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }

      @include screen(phone-up) {
        width: 50%;
      }
    }

    .user-info {
      flex: 1;
      padding: 1rem 0;

      @include screen(phone-up) {
        padding: 1rem 2rem;
      }

      &__name {
        font-size: $text-3xl;
      }

      &__desc {
        margin-bottom: 1rem;
        color: $gray-500;
        font-size: $text-sm;
      }

      &__id {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          font-weight: $font-normal;
        }
      }

      &__location {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          font-weight: $font-normal;
        }
      }

      &__link {
        font-size: $text-2xl;
        font-weight: $font-bold;

        span {
          font-weight: $font-normal;
        }
      }

      &__options {
        margin-top: 2rem;
        display: flex;

        .btn {
          margin-right: 1rem;
          box-shadow: 0 2px 4px 0 rgba($black, 0.16);
        }
      }
    }

    .user-lists {
      margin-top: 2rem;
      display: flex;
      flex-wrap: wrap;
      width: 100%;

      .starred {
        flex: 1;
        margin-left: 2rem;

        @include screen(phone-only) {
          margin: 0;
        }

        &__item {
          box-shadow: 0 2px 4px 0 rgba($black, 0.16);
          padding: 1rem;
          margin: 1rem 0;
        }
      }

      .repositories {
        width: 50%;

        @include screen(phone-only) {
          flex: 1;
        }

        &__item {
          box-shadow: 0 2px 4px 0 rgba($black, 0.16);
          padding: 1rem;
          margin: 1rem 0;
        }
      }
    }

  }
}
</style>
