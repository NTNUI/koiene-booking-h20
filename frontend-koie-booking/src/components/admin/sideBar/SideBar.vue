<template>
  <v-card>
    <v-navigation-drawer id="sideBarDrawer" v-model="drawer" :color="$scssVars.globalColorPrimary" permanent dark app>
      <v-list>
        <SideBarTop />
        <SideBarBottom />
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import SideBarTop from '@/components/admin/sideBar/SideBarTop.vue';
import SideBarBottom from '@/components/admin/sideBar/SideBarBottom.vue';

export default Vue.extend({
  name: 'SideBar',
  components: { SideBarBottom, SideBarTop },
  props: {
    currentView: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      drawer: this.currentView
    };
  },
  watch: {
    currentView(newVal: number) {
      this.drawer = newVal;
    }
  }
});
</script>

<style lang="scss">
#sideBarDrawer {
  border-top-left-radius: 0 !important;
  border-top-right-radius: 0 !important;
}
</style>
