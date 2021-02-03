<template>
  <div class="home">
    <msg v-if="helper.feedback.show" :type="helper.feedback.type">
      {{ helper.feedback.message }}
    </msg>

    <div v-if="!this.helper.feedback.show"
      class="home__content">
      <Search @sendSearch="getUsers"/>

      <div class="users-cards">
        <Card class="desktop-cards" v-for="user in users"
          :key="user.id"
          :user="user" />

        <Hooper :settings="hooperSettings">
          <slide v-for="user in users"
            :key="user.id">
            <Card :user="user" />
          </slide>

          <hooper-navigation slot="hooper-addons"></hooper-navigation>
        </Hooper>

        <div v-if="helper.loading">
          <Loading />
        </div>

        <template v-if="helper.notfound">
          <p class="text text--color-primary text--weight-bold">
            {{ $t('home.not_found') }}
          </p>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// according to Vuex specifications,
// a state can only be modified in a component through Getters and Actions.
import { mapActions, mapGetters } from 'vuex';

import { Hooper, Slide, Navigation as HooperNavigation } from 'hooper';

import 'hooper/dist/hooper.css';

// Lazy load components
const Card = () => import('@/components/user/Card');
const Loading = () => import('@/components/common/Loading');
const msg = () => import('@/components/common/Message');
const Search = () => import('@/components/user/Search');

export default {
  name: 'Home',

  components: {
    Card,
    Hooper,
    HooperNavigation,
    Loading,
    msg,
    Search,
    Slide,
  },

  data() {
    return {
      helper: {
        loading: false,
        notfound: false,
        feedback: {
          show: false,
          type: 'error',
          message: null,
        },
      },
      hooperSettings: {
        itemsToShow: 3,
        centerMode: true,
      },
    };
  },

  computed: {
    ...mapGetters({
      users: 'usersGetSearch',
    }),
  },

  methods: {
    ...mapActions([
      'fetchSearchUsers',
    ]),

    // Promises and asynchronous used for request
    // which increases optimization and code quality in more robust systems
    async getUsers(input) {
      this.helper.loading = true;
      try {
        const response = await this.fetchSearchUsers(input);
        if (!response.data.items.length) {
          this.helper.notfound = true;
        } else {
          this.helper.notfound = false;
        }
        // if the request is done, inactive the loading component
        this.helper.loading = false;
      } catch (e) {
        this.helper.loading = false;
        // Possibility of error in the request is dealt with, such as COR's error.
        console.log(e.response);
        if (e && !e.request) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.request'),
          });
        // show error from API
        } else if (e && e.response) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: e.response.data.message,
          });
        } else if (e && e.response.status === 429) {
          this.helper.feedback = ({
            show: true,
            type: 'error',
            message: this.$t('messages.request'),
          });
        // others errors
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
.home {
  .hooper {
    height: auto;
    display: auto;

    @include screen(phone-up) {
      display: none;
    }
  }

  &__content {
    .users-cards {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;

      .desktop-cards {
        display: none;

        @include screen(phone-up) {
          display: flex;
        }
      }
    }
  }
}
</style>
