<template>
  <div>
    <v-list-item
      v-for="(item, index) in views"
      :id="'sideBar' + item.id"
      :key="'sideBar' + item.id"
      link
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
  inject: ['updateView'],
  data() {
    return {
      views: adminViews,
      updateViewFn: (this as any).updateView as (index: string) => void // Little type hack.
    };
  }
});
</script>

<style scoped></style>
