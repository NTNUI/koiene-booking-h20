<template>
  <div :style="'cursor:' + (clickable ? 'pointer' : 'inherit')" @click="clickHandler">
    <div style="text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 150px">
      {{ text }}
    </div>
    <ReportDetailModal v-if="clickable" :title="title" :close-modal="closeModal" :show-modal="showModal">
      <template slot="modalContext">
        <p>{{ text }}</p>
      </template>
    </ReportDetailModal>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import ReportDetailModal from '@/components/admin/allReportsView/ReportDetailModal.vue';

export default Vue.extend({
  name: 'StringDisplayer',
  components: { ReportDetailModal },
  props: {
    text: {
      type: String,
      default: '',
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    closeModal() {
      this.showModal = false;
    },
    clickHandler() {
      if (this.clickable) this.showModal = true;
    },
  },
});
</script>
