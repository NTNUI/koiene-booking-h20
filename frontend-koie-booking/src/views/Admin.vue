<template>
  <div>
    <SideBar :current-view="currentView" />
    <AdminContentView :admin-component="adminViews[currentView].component" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import AdminContentView from '@/components/admin/AdminContentView.vue';
import SideBar from '@/components/admin/sideBar/SideBar.vue';
import adminViews from '@/components/admin/AdminViews';

export default Vue.extend({
  name: 'Admin',
  components: { AdminContentView, SideBar },
  provide() {
    return {
      getCurrentView: () => this.currentView,
      setCurrentView: (index: number) => {
        this.updateView(index);
      },
    };
  },
  data() {
    return {
      adminViews: adminViews,
      currentView: 0,
    };
  },
  computed: {
    isAdmin(): boolean {
      return this.$store.getters['auth/isAdmin'];
    },
  },
  watch: {
    isAdmin: {
      handler: function(newVal: boolean) {
        if (!newVal) this.$router.push('/');
      },
      immediate: true,
    },
  },
  methods: {
    updateView(index: number): void {
      this.currentView = index;
    },
  },
});
</script>

<style scoped></style>
