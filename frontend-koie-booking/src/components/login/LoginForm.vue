<template>
  <div :class="$style.wrapper">
    <form style="display:flex; flex-direction: column;" @submit.prevent="login">
      <label :class="$style.label__description" for="username">
        {{ $t('ntnui.login.email') }}
        <form-input
          id="username"
          :class="$style.username__field"
          :input.sync="email"
          :valid="isValidEmail"
          autocomplete="username"
        />
      </label>
      <label :class="$style.label__description" for="password">
        {{ $t('ntnui.login.password') }}
        <form-input
          id="password"
          input-type="password"
          :input.sync="password"
          :valid="isValidPassword"
          autocomplete="current-password"
        />
      </label>
      <div v-show="error" :class="$style.error">
        <p>{{ error }}</p>
      </div>
      <v-btn type="submit" :color="this.$scssVars.globalColorPrimary" :loading="loading">
        {{ $t('ntnui.login.login') }}
      </v-btn>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Input from '@/components/login/Input.vue';
import { fetchToken } from '@/service/auth';
import { TokenPayload } from '@/types/tokenPayload';
import { loginFormData } from '@/types/login';

export default Vue.extend({
  name: 'LoginForm',
  components: {
    'form-input': Input,
  },
  data(): loginFormData {
    return {
      email: '',
      password: '',
      error: '',
      loading: false,
    };
  },
  computed: {
    isValidEmail(): boolean {
      return this.email.includes('@') && this.email.includes('.');
    },
    isValidPassword(): boolean {
      return this.password.length >= 8;
    },
  },
  methods: {
    async login() {
      if (!this.isValidEmail && !this.loading) {
        this.error = `${this.$t('ntnui.login.error.emailInvalid')}`;
        setTimeout(() => (this.error = ''), 5000);
      } else if (!this.isValidPassword && !this.loading) {
        this.error = `${this.$t('ntnui.login.error.length')}`;
      } else if (!this.loading) {
        const payload: TokenPayload = {
          email: this.email,
          password: this.password,
        };
        try {
          this.loading = true;
          await fetchToken(payload);
          this.$router.push(
            this.checkIfUserIsKeyManagerAndNotAdmin()
              ? '/key_management'
              : (this.$route.query.redirect as string) || '/'
          );
        } catch (error) {
          this.$notify({
            group: 'memberships_system',
            type: 'error',
            duration: 3000,
            text: `${this.$t('ntnui.login.error.noUser')}`,
          });
        } finally {
          this.loading = false;
        }
      }
    },
    checkIfUserIsKeyManagerAndNotAdmin(): boolean {
      return !this.$store.getters['auth/isAdmin'] && this.$store.getters['auth/isKeyManager'];
    },
  },
});
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  margin-top: 30px;
}
.horizontal__ruler {
  display: block;
  unicode-bidi: isolate;
  margin-block-start: 0.5em;
  margin-block-end: 0.5em;
  margin-inline-start: auto;
  margin-inline-end: auto;
  overflow: hidden;
  border-style: inset;
  border-width: 1px;
}
.label__description {
  font-weight: 400;
}
.info__circle {
  color: yellow;
  margin-right: 15px;
  font-size: 22px;
}
.username__field {
  margin-bottom: 10px;
  border-radius: 20px;
}
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
}
.submit__button {
  margin-top: 20px;
}
</style>
