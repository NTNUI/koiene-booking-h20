<template>
  <tr>
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
      {{ keyDetail.endDate }}
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
});
</script>

<style scoped></style>
