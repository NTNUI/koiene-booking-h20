<template>
  <v-layout :class="$style.container">
    <v-layout :class="$style.separator">
      <h3 class="py-4" :class="$style.guestRegistration">{{ $t('booking.guest_registration') }}</h3>
      <v-form v-model="validForm" :class="$style.form">
        <v-layout v-for="i in Number(bedsChosen)" :key="i">
          <div :class="$style.fieldWrapper">
            <v-text-field
              v-if="i === 1"
              v-model="guests[i - 1].name"
              :label="$t('booking.full_name')"
              placeholder="Ola Nordmann"
              :rules="nameRules"
              :class="$style.nameField"
              required
              @blur="setGuests"
            />
            <v-text-field
              v-if="i !== 1"
              v-model="guests[i - 1].name"
              :label="$t('booking.full_name')"
              placeholder="Ola Nordmann"
              :rules="nameRules"
              :class="$style.nameField"
              required
              @blur="setGuests"
            />
            <v-text-field
              v-model="guests[i - 1].number"
              :label="$t('booking.number')"
              placeholder="95898788"
              number
              :rules="numberRules"
              :class="$style.numberField"
              required
              @blur="setGuests"
            />
            <div :class="$style.emailFieldWrapper">
              <v-text-field
                v-if="i === 1"
                v-model="guests[i - 1].email"
                :label="$vuetify.breakpoint.xs ? $t('booking.emailGeneric') : $t('booking.emailMain')"
                placeholder="ola.n@hotmail.com"
                :rules="emailStrictRules"
                required
              />
              <v-text-field
                v-if="i !== 1"
                v-model="guests[i - 1].email"
                :label="$vuetify.breakpoint.xs ? $t('booking.emailGeneric') : $t('booking.emailOptional')"
                placeholder="ola.n@hotmail.com"
                :rules="emailLooseRules"
              />
            </div>
            <v-checkbox
              v-model="guests[i - 1].isMember"
              class="mx-2"
              :label="$t('booking.member')"
              @change="setGuests"
            ></v-checkbox>
            <v-btn
              :disabled="i === 1"
              :color="$scssVars.globalColorBackgroundLight"
              :class="$style.rmvBtn"
              @click="removeGuestField(i)"
              >x</v-btn
            >
          </div>
        </v-layout>
        <v-btn :class="$style.addBtn" :color="$scssVars.globalColorPrimary" raised="true" @click="addGuestField"
          >+</v-btn
        >
      </v-form>
    </v-layout>
    <h3 :class="$style.price">Total price: {{ price }}kr</h3>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { Guest, BookingSecondStepData } from '../types/booking';
export default Vue.extend({
  data(): BookingSecondStepData {
    return {
      bedsChosen: 1,
      bookingStep: 1,
      guests: [{ name: '', number: '', email: '', isMember: true, isMainBooker: true }],
      numberRules: [
        (e: any) => !!e || 'Number is required',
        (e: any) => e.length >= 8 || 'Number must be 8 characters'
      ],
      nameRules: [(e: any) => !!e || 'Name is required'],
      emailStrictRules: [
        (v: any) => !!v || 'E-mail is required',
        (v: any) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      emailLooseRules: [(v: any) => v === '' || /.+@.+/.test(v) || 'E-mail must be valid'],

      edited: false,
      validForm: true,
      memberPrice: 0,
      nonMemberPrice: 0
    };
  },
  computed: {
    step(): number {
      return this.$store.state.booking.step;
    },
    guestField(): Array<Guest> {
      return this.guests;
    },
    beds(): number {
      return this.$store.state.booking.beds;
    },
    price(): number {
      let member = 0;
      let nonMember = 0;
      this.guests.forEach((i) => {
        if (i.isMember) {
          member++;
        } else {
          nonMember++;
        }
      });
      return this.memberPrice * member + this.nonMemberPrice * nonMember;
    }
  },
  watch: {
    validForm: function() {
      this.$store.dispatch('booking/SET_VALID_FORM', this.validForm);
    }
  },

  mounted() {
    this.edited = this.$store.state.booking.edited;
    this.bedsChosen = Number(this.$store.state.booking.beds);
    if (this.edited === true) {
      this.guests = this.$store.state.booking.guests;
    } else {
      this.addGuests();
    }
    this.bookingStep = Number(this.$store.state.booking.step);
    this.$store.dispatch('booking/SET_VALID_FORM', this.validForm);
    this.memberPrice = this.$store.state.koie.koieData.price_member;
    this.nonMemberPrice = this.$store.state.koie.koieData.price_not_member;
  },
  methods: {
    setGuests() {
      this.$store.dispatch('booking/SET_GUESTS', this.guests);
      this.$store.dispatch('booking/SET_EDITED', true);
    },
    addGuests() {
      for (let i = 0; i < this.bedsChosen - 1; i++) {
        this.guests.push({ name: '', number: '', isMember: true, isMainBooker: false });
      }
    },
    addGuestField() {
      if (this.bedsChosen < this.$store.state.booking.availableBeds) {
        this.guests.push({ name: '', number: '', isMember: true, isMainBooker: false });
        this.bedsChosen += 1;
        this.$store.dispatch('booking/SET_BEDS', this.bedsChosen);
      }
    },
    removeGuestField(index: number) {
      if (this.guests.length > 1) {
        this.guests.splice(index - 1, 1);
        this.bedsChosen -= 1;
        this.$store.dispatch('booking/SET_GUESTS', this.guests);
        this.$store.dispatch('booking/SET_BEDS', this.bedsChosen);
      }
    }
  }
});
</script>

<style lang="scss" module>
.separator {
  border-left: solid 4px;
  border-color: #2f3a50;
  display: flex;
  flex-direction: column;
  margin-top: 24px;
}
.container {
  display: flex;
  flex-direction: column;
}

.form,
.guestRegistration {
  padding-left: 16px;
  padding-right: 16px;
  @media only screen and (max-width: 600px) {
    padding-left: 8px;
    padding-right: 8px;
  }
}

.fieldWrapper {
  display: flex;
  width: 100%;
  align-items: center;
}

.emailFieldWrapper {
  width: 50%;
}

.nameField {
  width: 40%;
  padding-right: 10px;
}

.numberField {
  padding-right: 10px;
}
.rmvBtn {
  margin-left: 20px;
  @media only screen and (max-width: 600px) {
    margin-left: 8px;
    padding-left: 0px !important;
    padding-right: 0px !important;
    min-width: 30px !important;
  }
}
.price {
  text-align: center;
  margin-top: 30px;
}

.addBtn {
  margin-top: 16px;
}
</style>
