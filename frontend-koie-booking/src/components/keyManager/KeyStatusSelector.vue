<template>
  <v-select
    v-model="selected"
    :items="options"
    class="py-1"
    solo
    :hide-details="true"
    :background-color="backgroundColor"
    color="white"
    @change="updateStatus"
  >
    <template v-slot:selection="data">
      <div>{{ data.item.label }}</div>
    </template>
    <template v-slot:item="data">
      <div :style="'color: ' + data.item.color">{{ data.item.label }}</div>
    </template>
  </v-select>
</template>

<script lang="ts">
import KeyStatusOption, { KeyStatusOptions } from '@/types/keyManager/KeyStatusOption';
import Vue, { PropType } from 'vue';
import request from '@/service/request';

export default Vue.extend({
  name: 'KeyStatusSelector',
  props: {
    items: {
      type: Object as PropType<KeyStatusOptions>,
      default() {
        return {};
      },
    },
    status: {
      type: String,
      default: '',
    },
    uuid: {
      type: String,
      default: '',
    },
    koieSlug: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      backgroundColor: '',
      options: Object.values(this.items),
      selected: '',
    };
  },
  mounted() {
    this.selected = this.status;
    const selectedItem = this.items[this.selected];
    this.backgroundColor = selectedItem && selectedItem.color ? selectedItem.color : '';
  },
  methods: {
    async updateStatus(selectedStatus: String) {
      if (!this.items[String(selectedStatus)]) return;
      this.backgroundColor = this.items[String(selectedStatus)].color;
      // Consider doing this update through the store
      // At the moment the old value is kept in the store until the table content is updated
      const options = {
        method: 'PATCH',
        url: '/koie/sit/{' + this.uuid + '}',
        data: { koie: this.koieSlug, key_status: selectedStatus.toLowerCase() },
      };
      const res = await request(options);
    },
  },
});
</script>

<style scoped></style>
