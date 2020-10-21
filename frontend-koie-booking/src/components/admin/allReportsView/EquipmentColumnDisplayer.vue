<template>
  <div>
    <v-row justify="center">
      <v-chip class="mx-1" :color="$scssVars.globalColorGreenStrong" @click="showDialog = true">
        {{ ok.length }}
      </v-chip>
      <v-chip class="mx-1" :color="$scssVars.globalColorGrey" @click="showDialog = true"> {{ notSure.length }} </v-chip>
      <v-chip class="mx-1" :color="$scssVars.globalColorRedStrong" @click="showDialog = true">
        {{ notOk.length }}
      </v-chip>
    </v-row>
    <ReportDetailModal title="Utstyr" :show-modal="showDialog" :close-modal="closeDialog">
      <template v-slot:modalContext>
        <v-row justify="center">
          <v-col cols="4" :style="'color:' + $scssVars.globalColorGreenStrong">
            <h3>OK</h3>
            <ul>
              <li v-for="(okItem, index) in ok" :key="'ok' + index">{{ $t('report.equipment.' + okItem) }}</li>
            </ul>
          </v-col>
          <v-col cols="4" :style="'color:' + $scssVars.globalColorGrey">
            <h3>Ikke sikker</h3>
            <ul>
              <li v-for="(notSureItem, index) in notSure" :key="'notSure' + index">
                {{ $t('report.equipment.' + notSureItem) }}
              </li>
            </ul>
          </v-col>
          <v-col cols="4" :style="'color:' + $scssVars.globalColorRedStrong">
            <h3>Ikke OK</h3>
            <ul>
              <li v-for="(notOkItem, index) in notOk" :key="'notOkItem' + index">
                {{ $t('report.equipment.' + notOkItem) }}
              </li>
            </ul>
          </v-col>
        </v-row>
      </template>
    </ReportDetailModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportDetailModal from '@/components/admin/allReportsView/ReportDetailModal.vue';

export default Vue.extend({
  name: 'EquipmentColumnDisplayer',
  components: { ReportDetailModal },
  props: {
    notOk: {
      type: Array,
      default() {
        return [];
      },
    },
    notSure: {
      type: Array,
      default() {
        return [];
      },
    },
    ok: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      showDialog: false,
    };
  },
  methods: {
    closeDialog() {
      this.showDialog = false;
    },
  },
});
</script>

<style scoped></style>
