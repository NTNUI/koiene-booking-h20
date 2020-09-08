<template>
  <v-layout v-model="dateFrom" width="100%" :class="$style.avalanche">
    <div :class="$style.warning">
      <v-avatar :class="$style.avatar" :tile="true" :color="colors[levelFirstDay]">
        <span class="white--text headline">{{ levelFirstDay }}</span>
      </v-avatar>
      <div :v-model="heading1" :class="$style.day">
        <h4>{{ heading1 }}</h4>
        <p class="mb-0">{{ warningTypes[levelFirstDay] }}</p>
      </div>
    </div>
    <div :class="$style.warning">
      <v-avatar :class="$style.avatar" :tile="true" :color="colors[levelSecondDay]">
        <span class="white--text headline">{{ levelSecondDay }}</span>
      </v-avatar>
      <div :class="$style.day">
        <h4>{{ heading2 }}</h4>
        <p class="mb-0">{{ warningTypes[levelSecondDay] }}</p>
      </div>
    </div>
    <div :class="$style.warning">
      <v-avatar :class="$style.avatar" :tile="true" :color="colors[levelThirdDay]">
        <span class="white--text headline">{{ levelThirdDay }}</span>
      </v-avatar>
      <div :class="$style.day">
        <h4>{{ heading3 }}</h4>
        <p class="mb-0">{{ warningTypes[levelThirdDay] }}</p>
      </div>
    </div>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { AvalancheData } from '../types/avalanche';
import { getDateString, getDate } from '@/utils/dates';

export default Vue.extend({
  name: 'AvalancheWarning',
  props: {
    latitude: {
      type: String,
      default: ''
    },
    longitude: {
      type: String,
      default: ''
    }
  },

  data(): AvalancheData {
    return {
      result: '',
      levelFirstDay: '',
      levelSecondDay: '',
      levelThirdDay: '',
      firstDay: '',
      secondDay: '',
      thirdDay: '',
      fromDate: getDateString(),
      nextDate: getDateString(),
      lastDate: getDateString(),
      warningTypes: [
        this.$i18n.t('avalanche.warningTypes.low'),
        this.$i18n.t('avalanche.warningTypes.moderate'),
        this.$i18n.t('avalanche.warningTypes.considerable'),
        this.$i18n.t('avalanche.warningTypes.high'),
        this.$i18n.t('avalanche.warningTypes.very_high'),
        this.$i18n.t('avalanche.warningTypes.avalanche_expected')
      ],
      colors: [
        this.$scssVars.globalColorWarningLow,
        this.$scssVars.globalColorWarningModerate,
        this.$scssVars.globalColorWarningConsiderable,
        this.$scssVars.globalColorWarningHigh,
        this.$scssVars.globalColorWarningVeryHigh,
        this.$scssVars.globalColorBlack
      ]
    };
  },
  computed: {
    dateFrom(): string {
      this.findAllDates();
      return this.$store.state.booking.dateFrom;
    },
    dateTo(): string {
      //if you have only chosen one night, the warning will still show for two next days
      if (this.findAllDates().length < 3) {
        return this.lastShownWarningDate;
      } else {
        return this.$store.state.booking.dateTo;
      }
    },

    heading1(): string {
      return this.firstDay + ' - ' + this.fromDate.slice(0, 2) + '.' + this.fromDate.slice(3, 5);
    },
    heading2(): string {
      return this.secondDay + ' - ' + this.nextDate.slice(0, 2) + '.' + this.nextDate.slice(3, 5);
    },
    heading3(): string {
      return this.thirdDay + ' - ' + this.lastDate.slice(0, 2) + '.' + this.lastDate.slice(3, 5);
    },
    lastShownWarningDate(): string {
      const fromDateTime = this.$store.state.booking.dateFrom
        ? new Date(this.$store.state.booking.dateFrom).getTime()
        : new Date().getTime();
      return new Date(fromDateTime + 2 * 24 * 60 * 60 * 1000).toISOString().substr(0, 10);
    }
  },
  watch: {
    dateFrom: function() {
      this.setAvalancheWarning();
    },
    dateTo: function() {
      this.setAvalancheWarning();
    }
  },

  mounted() {
    this.setAvalancheWarning();
  },
  methods: {
    findAllDates(): Array<string> {
      const bookingDays = [];
      const fromDate = getDate(this.$store.state.booking.dateFrom);
      const toDate = getDate(this.$store.state.booking.dateTo);
      let bookingDaysInTime = toDate.getTime() - fromDate.getTime();
      let numberOfBookingDays = bookingDaysInTime / (1000 * 3600 * 24);
      for (let i = 0; i <= numberOfBookingDays; i++) {
        bookingDays.push(new Date(fromDate.getTime() + i * 24 * 60 * 60 * 1000).toISOString().substr(0, 10));
      }
      return bookingDays;
    },
    async setAvalancheWarning() {
      const language = 2;
      const values = {
        latitude: this.$store.state.koie.koieData.location.latitude,
        longitude: this.$store.state.koie.koieData.location.longitude,
        language: language,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      };
      //returns avalance warning from varsom.no
      try {
        await this.$store.dispatch('avalanche/FETCH_AVALANCHE_LEVELS', values);
        const warningData = this.$store.state.avalanche.warningData;

        this.levelFirstDay = warningData[0].warningLevel;
        this.levelSecondDay = warningData[1].warningLevel;
        this.levelThirdDay = warningData[2].warningLevel;
        const dates = this.findAllDates();
        this.setAvalancheStore(warningData, dates);
        this.firstDay = getDateString(warningData[0].validTo);
        this.setDateDay(warningData);
        this.getFormattedDate(warningData);
      } catch (error) {
        throw error;
      }
    },
    setAvalancheStore(res: any, dates: Array<string>) {
      const warningLevels = [];
      for (let date in dates) {
        let warningObject = { day: '', level: 0 };
        warningObject.day = dates[date];
        warningObject.level = res[date].warningLevel;
        warningLevels.push(warningObject);
      }
      this.$store.dispatch('avalanche/SET_WARNING_LEVELS', warningLevels);
      for (let e in warningLevels) {
        if (warningLevels[e].level > 2) {
          this.$store.dispatch('avalanche/DISABLE_BOOKING', true);
          return;
        } else {
          this.$store.dispatch('avalanche/DISABLE_BOOKING', false);
        }
      }
    },
    //this method will set the weekday of the date
    setDateDay(res: any) {
      const weekdays = [
        this.$i18n.t('avalanche.weekdays.sunday'),
        this.$i18n.t('avalanche.weekdays.monday'),
        this.$i18n.t('avalanche.weekdays.tuesday'),
        this.$i18n.t('avalanche.weekdays.wednesday'),
        this.$i18n.t('avalanche.weekdays.thursday'),
        this.$i18n.t('avalanche.weekdays.friday'),
        this.$i18n.t('avalanche.weekdays.saturday')
      ];
      this.firstDay = getDateString(res[0].validTo);
      const todayDayInWeek = new Date(this.firstDay).getDay();
      this.firstDay = weekdays[todayDayInWeek].toString();
      //checks if today is friday or later, in that case list needs to start over
      if (todayDayInWeek === 5) {
        this.secondDay = weekdays[todayDayInWeek + 1].toString();
        this.thirdDay = weekdays[0].toString();
      } else if (todayDayInWeek === 6) {
        this.secondDay = weekdays[0].toString();
        this.thirdDay = weekdays[1].toString();
      } else {
        this.secondDay = weekdays[todayDayInWeek + 1].toString();
        this.thirdDay = weekdays[todayDayInWeek + 2].toString();
      }
    },
    //this method will format dates into "13.02" for display in avalanche warning
    getFormattedDate(res: any) {
      this.fromDate = getDateString(res[0].validTo);
      this.nextDate = getDateString(res[1].validTo);
      this.lastDate = getDateString(res[2].validTo);
      this.fromDate = this.fromDate
        .split('-')
        .reverse()
        .toString();
      this.nextDate = this.nextDate
        .split('-')
        .reverse()
        .toString();
      this.lastDate = this.lastDate
        .split('-')
        .reverse()
        .toString();
    }
  }
});
</script>

<style lang="scss" module>
.avalanche {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.avatar {
  border-radius: 4px;
  margin: 5px;
}
.warning {
  border-top: solid;
  border-width: 1px;
  border-color: lightgrey;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 5px;
}

.day {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 10px;
}
</style>
