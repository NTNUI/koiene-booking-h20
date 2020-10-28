<template>
  <tr style="background-color: #222222;">
    <td>
      {{ keyDetail.email }}
    </td>
    <td>
      {{ keyDetail.koieName }}
    </td>
    <td>
      {{ keyDetail.startDate }}
    </td>
    <td>
      <span :style="getColorForPickUp(keyDetail.startDate)">{{ keyDetail.endDate }} </span>
    </td>
    <td>
      {{ keyDetail.status }}
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import keyTableHeaders from '@/components/keyManager/keyTableHeaders';
import KeyDetail from '../../types/keyManager/KeyDetail';
import dayjs from 'dayjs';
import scssVars from '@/styles/variables.scss';
import { addToDate } from '@/utils/dates';

export default Vue.extend({
  name: 'KeyPickUpRow',
  props: {
    keyDetail: {
      type: Object as () => KeyDetail,
      default() {
        return null;
      },
    },
  },
  data() {
    return {
      headers: keyTableHeaders,
    };
  },
  methods: {
    getColorForPickUp(endDate: string): { color: string } {
      const limit = addToDate(endDate, 7, 'day');
      const today = dayjs().format('YYYY-MM-DD');
      if (today.localeCompare(limit) > 0) return { color: scssVars.globalColorRedWeak };
      return { color: 'white' };
    },
  },
});
</script>

<style scoped></style>
