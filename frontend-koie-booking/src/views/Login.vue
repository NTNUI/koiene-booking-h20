<template>
  <div :class="$style.wrapper">
    <img src="/ntnui_sprint/ntnui.svg" :class="$style.img" alt="ntnui-logo" />
    <h2 :class="$style.title">
      {{ $t('ntnui.login.title') }}
    </h2>

    <div key="login-form" :class="$style.formWrapper">
      <LoginForm />
    </div>
    <p class="mt-12">
      {{ $t('ntnui.login.pleaseVisit') }} <a href="https://medlem.ntnui.no" target="_blank">medlem.ntnui.no</a>
      {{ $t('ntnui.login.activateUserOrForgottenPassword') }}
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import LoginForm from '@/components/login/LoginForm.vue';
export default Vue.extend({
  name: 'Login',
  components: {
    LoginForm,
  },
});
</script>

<style lang="scss" module>
.wrapper {
  margin: 20px auto 20px auto;
  padding: 8vh;
  max-width: 80vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 600px) {
    max-width: 100vw;
    padding: 8vh 4vh;
  }
}
.title {
  display: flex;
  justify-content: center;
  margin: 5px 0 5px 0;
}
.formWrapper {
  width: 100%;
  max-width: 300px;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
}
.img {
  height: 60px;
  width: 100%;
}
.actionsWrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
}
.action {
  width: 100%;
  margin-top: 15px;
}
.back_button {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
</style>
