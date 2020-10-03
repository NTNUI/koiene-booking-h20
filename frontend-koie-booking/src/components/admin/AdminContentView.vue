<template>
  <div id="adminContentView">
    <component :is="adminComponent" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AdminContentView',
  props: {
    adminComponent: {
      type: Function,
      default: Vue.component('defaultView', { template: '<h1>An error occurred while loading the admin page</h1>' }),
    },
  },
});
</script>

<style lang="scss">
@import 'src/styles/variables';

#adminContentView {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px;
  width: 100%;
  background-color: $global-color-background;
}
</style>
