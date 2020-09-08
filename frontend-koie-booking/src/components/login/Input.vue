<template>
  <input
    v-if="shape === 'memberInvite'"
    v-model="value"
    :class="$style.membersInput"
    :type="inputType"
    :autocomplete="autocomplete"
    @input="$emit('update:input', value)"
    @change="validate"
  />
  <div v-else>
    <div>
      <slot />
    </div>
    <div>
      <input
        v-model="value"
        :class="$style.input"
        :type="inputType"
        :autocomplete="autocomplete"
        @input="$emit('update:input', value)"
        @change="validate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { inputData } from '@/types/login';
export default Vue.extend({
  name: 'FormInput',
  props: {
    input: {
      type: String,
      default: ''
    },
    inputType: {
      type: String,
      default: 'text'
    },
    validate: {
      type: Function,
      default: () => {}
    },
    valid: {
      type: Boolean,
      default: false
    },
    shape: {
      type: String,
      default: 'default'
    },
    autocomplete: {
      type: String,
      default: ''
    }
  },
  data(): inputData {
    return {
      value: ''
    };
  }
});
</script>

<style lang="scss" module>
@import '../../styles/variables.scss';
.input {
  height: 35px;
  padding: 0 10px;
  color: $global-color-white;
  font-size: 14px;
  border: 1px solid $global-color-white;
  background-color: $global-color-background;
  border-radius: 5px 5px 0px 5px;
  width: 100%;
  margin-top: 5px;
  margin-bottom: 16px;
}
.membersInput {
  height: 100%;
  padding: 0;
  border: 0;
  border-radius: 5px 5px 0px 5px;
  background-color: $global-color-background;
  padding-left: 10px;
  color: $global-color-white;
  font-size: 16px;
  width: 100%;
}
.autocomplete {
  background-color: transparent;
}
</style>
