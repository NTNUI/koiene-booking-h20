<template>
  <tr v-if="keyDetail" style="background-color: #222222;">
    <td>
      {{ keyDetail.email }}
    </td>
    <td>
      {{ keyDetail.koieName }}
    </td>
    <td>
      <span v-if="isPickup" ref="pickUpStartDate" :style="getColorFn(keyDetail.startDate)"
        >{{ keyDetail.startDate }}
      </span>
      <span v-else> {{ keyDetail.startDate }} </span>
    </td>
    <td>
      <span v-if="!isPickup" :style="getColorFn(keyDetail.endDate)">{{ keyDetail.endDate }} </span>
      <span v-else> {{ keyDetail.endDate }} </span>
    </td>
    <td style="width: 200px">
      <slot name="keyStatusSelector" />
    </td>
  </tr>
  <tr v-else>
    <td>
      Det skjedde en feil.
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue';
import keyTableHeaders from '@/components/keyManager/keyTableHeaders';
import KeyDetail from '../../types/keyManager/KeyDetail';
import dayjs from 'dayjs';
import scssVars from '@/styles/variables.scss';

export default Vue.extend({
  name: 'KeyPickUpRow',
  props: {
    keyDetail: {
      type: Object as () => KeyDetail,
      default() {
        return null;
      },
    },
    getColorFn: {
      type: Function,
      default: (startDate: string) => {
        return {
          color: 'white',
        };
      },
    },
    isPickup: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      headers: keyTableHeaders,
    };
  },
});
</script>

<style scoped></style>
