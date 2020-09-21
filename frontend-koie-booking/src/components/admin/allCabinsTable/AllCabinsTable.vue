<template>
  <v-row justify="center">
    <v-col>
      <!-- Calendar selection -->
      <v-row justify="center">
        <v-col cols="2">
          <v-menu
            v-model="dateMenu"
            :close-on-content-click="false"
            :nudge-right="20"
            :nudgeTop="20"
            :first-day-of-week="1"
            transition="scale-transition"
            offset-y
            min-width="290px"
            no-title
            close-on-change
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="date"
                label="Select starting date"
                prepend-icon="event"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" @input="dateMenu = false"></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <!-- Date selction menu bar -->
      <v-row>
        <v-col cols="3">
          <v-row justify="space-around">
            <v-btn class="navBtn" small height="50px" width="23%">
              -1 year
            </v-btn>
            <v-btn class="navBtn" small height="50px" width="23%">
              -1 month
            </v-btn>
            <v-btn class="navBtn" small height="50px" width="23%">
              -1 week
            </v-btn>
            <v-btn class="navBtn" small height="50px" width="23%">
              -1 day
            </v-btn>
          </v-row>
        </v-col>
        <!-- Show dates and day of week here -->
        <v-col justify="center" cols="6">
          <v-card class="pa-3" outlined tile>Dates go here</v-card>
        </v-col>
        <!-- Buttons for forward in time -->
        <v-col cols="3">
          <v-row justify="space-around">
            <v-btn class="navBtn" small height="50px" width="23%">
              +1 day
            </v-btn>
            <v-btn class="navBtn" small height="50px" width="23%">
              +1 week
            </v-btn>
            <v-btn class="navBtn" small height="50px" width="23%">
              +1 month
            </v-btn>
            <v-btn class="navBtn" small height="50px" width="23%">
              +1 year
            </v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <!-- Buttons for back in time -->
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'AllCabinsTable'
});
</script>

<style lang="scss" scoped></style>
