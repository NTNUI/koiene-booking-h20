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
import KeyStatusOption from '@/types/keyManager/KeyStatusOption';

export default {
  name: 'KeyStatusSelector',
  props: {
    items: {
      type: Object,
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
    updateStatus(selectedStatus: KeyStatusOption) {
      if (!this.items[selectedStatus]) return;
      this.backgroundColor = this.items[selectedStatus].color;
    },
  },
};
</script>

<style scoped></style>
