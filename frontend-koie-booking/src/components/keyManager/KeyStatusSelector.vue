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
    updateStatus(selectedStatus: String) {
      if (!this.items[String(selectedStatus)]) return;
      this.backgroundColor = this.items[String(selectedStatus)].color;
    },
  },
});
</script>

<style scoped></style>
