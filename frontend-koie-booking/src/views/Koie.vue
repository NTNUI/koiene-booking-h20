<template>
  <ErrorCard v-if="error" />
  <LoadingSpinner v-else-if="isLoading" />
  <v-container v-else :class="$style.container" class="global-max-width">
    <v-row>
      <v-col height="100%" cols="12" sm="8" class="pb-0 mb-0">
        <v-card :tile="true" :class="$style.imageCard" outlined class="global-card-outlined">
          <v-img height="100%" :src="imgUrl" />
        </v-card>
      </v-col>
      <v-col cols="12" xs="4" class="pt-0 d-xs-block d-sm-none">
        <v-card :class="$style.titleCard" :tile="true" outlined class="global-card-outlined-border-bottom">
          <v-card-title id="koieTitle" class="headline">{{ koieTitle }}</v-card-title>
        </v-card>
      </v-col>
      <v-col :class="$vuetify.breakpoint.xs ? 'mb-3' : 'mb-0'" class="pb-0">
        <v-card :tile="true" :class="$style.infoCard" outlined class="global-card-outlined">
          <v-card-title>{{ $t('koie.information') }}</v-card-title>
          <v-list flat dense inactive class="global-card-outlined px-4 pt-0 pb-4">
            <v-list-item-group color="primary">
              <v-list-item v-for="(item, i) in keyInfoItems" :key="i" :href="item.url" target="_blank" class="pa-0">
                <v-list-item-icon :class="$style.listItemIcon">
                  <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content v-if="!item.isLink" :class="$style.listItemContent">
                  <p style="margin-bottom: 0">
                    {{ item.title }}: <span :class="$style.infoValue"> {{ item.text }}</span>
                  </p>
                </v-list-item-content>
                <v-list-item-content v-else :class="$style.listItemContent">
                  <p style="margin-bottom: 0">
                    {{ item.title }}:
                    <span :class="$style.infoValue">
                      <a :href="item.url" target="_blank">{{ item.text }}</a>
                    </span>
                  </p>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
    <!-- Hide the row below only on mobile -->
    <v-row class="d-none d-sm-flex">
      <v-col class="pt-0">
        <v-card :class="$style.titleCard" :tile="true" outlined class="global-card-outlined-border-bottom">
          <v-card-title id="koieTitle" class="display-1">{{ koieTitle }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="4" order-sm="last">
        <v-card :tile="true" :class="$style.calendarCard" outlined class="global-card-outlined mb-6">
          <v-card-title>{{ $t('koie.booking') }}</v-card-title>
          <Calendar :allkoier="false" :row="false" class="px-4" />
          <v-btn
            :disabled="disableBooking"
            :color="this.$scssVars.globalColorPrimary"
            :class="[$style.bookBtn]"
            class="mx-auto"
            raised="true"
            data-test="bookBtn"
            @click="goToBooking"
            >{{ $t('koie.bookingBtn') }}</v-btn
          >
          <v-alert
            v-if="disableBooking"
            v-model="disableBooking"
            transition="expand-transition"
            :class="$style.errorMsg"
            type="info"
            @click="error = false"
          >
            {{ noDatesAvailable ? $t('calendar.error_fullbooked') : $t('avalanche.error_msg') }}
          </v-alert>
        </v-card>
        <v-card
          v-if="this.$store.state.avalanche.koierToCheck.includes(koieTitle)"
          :tile="true"
          outlined
          class="global-card-outlined pb-4"
        >
          <v-card-title>{{ $t('koie.avalanche') }}</v-card-title>
          <v-card-subtitle
            ><a href="https://varsom.no/"> {{ $t('avalanche.reference') }} </a></v-card-subtitle
          >
          <AvalancheWarning :latitude="latitude" :longitude="longitude" class="px-4" />
        </v-card>
      </v-col>
      <v-col cols="12" sm="8" class="py-0" order-sm="first">
        <v-row>
          <v-col>
            <v-card :tile="true" outlined class="global-card-outlined">
              <v-card-title>{{ $t('koie.description') }}</v-card-title>
              <!-- eslint-disable-next-line -->
            <v-card-text v-html="koieDescription"></v-card-text>
              <v-btn
                :class="[$style.expandBtn]"
                class="mx-auto"
                :color="this.$scssVars.globalColorPrimary"
                @click="expandCard"
                >{{ expandDescriptionCard ? 'less' : 'more' }}</v-btn
              >
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card :tile="true" outlined class="global-card-outlined">
              <v-card-title>{{ $t('koie.parking') }}</v-card-title>
              <!-- eslint-disable-next-line -->
              <v-card-text v-html="parking"></v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Calendar from '../components/Calendar.vue';
import ErrorCard from '../components/ErrorCard.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import AvalancheWarning from '../components/AvalancheWarning.vue';
import Vue from 'vue';
import { KoieData, KeyInfoItems } from '../types/koie';

export default Vue.extend({
  name: 'Koie',
  components: {
    Calendar,
    ErrorCard,
    LoadingSpinner,
    AvalancheWarning
  },
  data(): KoieData {
    return {
      koieDescription: '',
      expandDescriptionCard: false
    };
  },
  computed: {
    error(): boolean {
      return this.$store.state.koie.error;
    },
    dateFrom(): string {
      return this.$store.state.booking.dateFrom;
    },
    disableBooking(): boolean {
      return this.$store.state.avalanche.disableBooking;
    },
    noDatesAvailable(): boolean {
      return this.$store.state.booking.noDatesAvailable;
    },
    isLoading(): boolean {
      return this.$store.state.koie.isLoading;
    },
    koieTitle(): string {
      return this.$store.state.koie.koieData.name || this.$route.params.id.toLowerCase();
    },
    latitude(): string {
      return this.$store.state.koie.koieData.location.latitude;
    },
    longitude(): string {
      return this.$store.state.koie.koieData.location.longitude;
    },
    parking(): string {
      return this.$store.getters['koie/parking'];
    },
    imgUrl(): string {
      return '/koie_pictures/' + this.koieTitle.toLowerCase() + '1.jpg';
    },
    keyInfoItems(): Array<KeyInfoItems> {
      return [
        {
          title: this.$t('koie.keyInfo.beds'),
          text: this.$store.state.koie.koieData.number_of_beds,
          isLink: false,
          icon: 'mdi-bed'
        },
        {
          title: this.$t('koie.keyInfo.terrain'),
          text: this.$store.getters['koie/koieTerrain'],
          isLink: false,
          icon: 'mdi-terrain'
        },
        {
          title: this.$t('koie.keyInfo.altitude'),
          text: this.$store.state.koie.koieData.location.altitude + 'm',
          isLink: false,
          icon: 'mdi-pine-tree'
        },
        {
          title: this.$t('koie.keyInfo.position'),
          text: 'Google Maps',
          url: this.$store.getters['koie/position'],
          isLink: true,
          icon: 'mdi-crosshairs-gps'
        },
        {
          title: this.$t('koie.keyInfo.pdfMap'),
          text: 'See pdf',
          url: this.$store.state.koie.koieData.location.map_pdf,
          isLink: true,
          icon: 'mdi-map'
        },
        {
          title: this.$t('koie.keyInfo.physicalMap'),
          text: this.$store.state.koie.koieData.location.kartblad,
          url: 'http://org.ntnu.no/koiene/tips.php?p=3#1',
          isLink: true,
          icon: 'mdi-map'
        },
        {
          title: this.$t('koie.keyInfo.weather'),
          text: 'yr.no',
          url: this.$store.getters['koie/koieWeatherLink'],
          isLink: true,
          icon: 'mdi-weather-partly-cloudy'
        }
      ];
    }
  },
  created() {
    this.getKoieData(this.$route.params.id);
    window.addEventListener('resize', this.updateTextLength);
  },
  destroyed() {
    window.removeEventListener('resize', this.updateTextLength);
  },
  methods: {
    goToBooking() {
      this.$router.push(`/booking/${this.$route.params.id}`);
    },
    async getKoieData(koieName: string) {
      if (this.$store.state.koie.koieData.name.length === 0) {
        await this.$store.dispatch('koie/FETCH_DATA', koieName.toLowerCase());
      }
      this.setKoieDescription();
      this.updateTextLength();
    },
    //this method checks if the window is smaller than 600, and makes the text amount smaller if it is.
    updateTextLength() {
      if (window.innerWidth < 600) {
        this.koieDescription = this.koieDescription.slice(0, 300) + ' ...';
      } else {
        //if it is bigger then 600 it will set the text to inital length
        this.setKoieDescription();
      }
    },
    expandCard() {
      this.expandDescriptionCard = !this.expandDescriptionCard;
      this.expandDescriptionCard && this.setKoieDescription();
      !this.expandDescriptionCard && (this.koieDescription = this.koieDescription.slice(0, 300) + ' ...');
    },
    setKoieDescription() {
      let str = this.$store.getters['koie/koieDescription'];

      // Inserts an </b> after sentences that starts with a <b>-tag.
      str = str.replace(/<b>([^\.]+)\./g, function(x: string) {
        return x + '</b>';
      });
      this.koieDescription = str;
    }
  }
});
</script>

<style lang="scss" module>
.imageCard {
  border-radius: 4px 4px 4px 0px;
  height: 372px;
  @media only screen and (max-width: 960px) {
    height: 100%;
  }
}

.infoCard {
  height: 100%;
}

.calendarCard {
  display: flex;
  flex-direction: column;
}

.titleCard {
  border-radius: 0px 0px 4px 4px;
  width: 25%;
  min-width: 350px;
  @media only screen and (max-width: 600px) {
    min-width: 0;
    width: auto;
    max-width: 80%;
  }
}

.expandBtn {
  display: none;
  @media only screen and (max-width: 600px) {
    display: block;
    margin-bottom: 16px;
  }
}

.listItemIcon {
  margin: 6px 8px 4px 0 !important;
}

.listItemContent {
  padding: 4px 0 8px 0 !important;
}
.bookBtn {
  margin-top: 24px;
  margin-bottom: 16px;
}

.infoValue {
  display: inline;
  font-weight: 100;
}
.errorMsg {
  margin: 10px 16px 10px 16px;
}
</style>
