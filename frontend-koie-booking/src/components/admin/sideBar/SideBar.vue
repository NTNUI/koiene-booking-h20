<template>
  <v-card>
    <v-navigation-drawer id="sideBarDrawer" :color="$scssVars.globalColorBackground" :src="chosenPicture" permanent app>
      <v-list
        style="background: linear-gradient(rgba(70,70,70,0.5) 0%, rgba(70,70,70,0.5) 40%, rgba(73,64,228,0) 80%); height: 100vh"
      >
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
      default: 0,
    },
    testing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      allPictures: ['fosenkoia1.jpg', 'kamtjønnkoia1.jpg', 'lyngli1.jpg', 'stabburet1.jpg'],
      chosenPicture: 'navbar_pictures/fosenkoia1.jpg',
    };
  },
  mounted() {
    if (!this.testing)
      this.chosenPicture = 'navbar_pictures/' + this.allPictures[Math.floor(Math.random() * this.allPictures.length)];
  },
});
</script>

<style lang="scss">
#sideBarDrawer {
  border-radius: 0 !important;
}
</style>
