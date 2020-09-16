<template>
  <div>
    <v-list-item
      v-for="(item, index) in views"
      :id="'sideBar' + item.id"
      :key="'sideBar' + item.id"
      :style="'background-color: ' + (index === currentView() ? $scssVars.globalColorBackgroundLighter : '')"
      class="v-list-item"
      @click="updateViewFn(index)"
    >
      <v-list-item-icon>
        <v-icon :v-text="item.icon"></v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import adminViews from '@/components/admin/AdminViews';

export default Vue.extend({
  name: 'SideBarBottom',
  inject: ['setCurrentView', 'getCurrentView'],
  data() {
    return {
      currentView: (this as any).getCurrentView as () => number,
      views: adminViews,
      updateViewFn: (this as any).setCurrentView as (index: number) => void // Little type hack.
    };
  }
});
</script>

<style scoped lang="scss">
.v-list-item {
  margin: 10px;
  border-radius: 10px;
}
</style>
