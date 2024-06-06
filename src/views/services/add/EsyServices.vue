<script setup>
import { ref } from 'vue'
import {
  esyServicesDiscussedOptions,
  esyConsiderationOptions,
  esyRecommendedOptions
} from '@/constants'

import VueDatePicker from '@vuepic/vue-datepicker'

const servicesStartDate = ref('')
const servicesEndDate = ref('')
const minsPeriodsPerDay = ref('')
const nextYearPeriodsPerDay = ref('')
const esyServicesDiscussed = ref('')
const esyConsideration = ref('')
const esyRecommended = ref('')
const esyDiscussion = ref('')

const formatStartDate = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = `${month}/${day}/${year}`
  servicesStartDate.value = currentDate
  return `Start date will be ${month}/${day}/${year}`
}

const formatEndDate = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = `${month}/${day}/${year}`
  servicesEndDate.value = currentDate
  return `End date will be ${month}/${day}/${year}`
}
</script>

<template>
  <v-expansion-panels>
    <v-expansion-panel title="Duration of Services">
      <v-row>
        <v-col cols="12"> <h5>Duration of Special Education Services:</h5> </v-col>
      </v-row>
      <v-row>
        <v-col cols="6">
          <VueDatePicker
            v-model="servicesStartDate"
            placeholder="Start Date"
            :auto-position="false"
            :format="formatStartDate"
          />
        </v-col>
        <v-col cols="6">
          <VueDatePicker
            v-model="servicesEndDate"
            placeholder="End Date"
            :auto-position="false"
            :format="formatEndDate"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <div class="d-flex align-center">
            <h5>Instructional Day:</h5>
          </div>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="minsPeriodsPerDay"
            label="Minutes or Periods per day"
            placeholder="357"
          ></v-text-field>
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="nextYearPeriodsPerDay"
            label="Next Year Minutes or Periods per day"
            placeholder="357"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h5>Extended School Year (ESY) Services:</h5>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="4">
          <v-select
            v-model="esyServicesDiscussed"
            :items="esyServicesDiscussedOptions"
            label="ESY Services were discussed"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="esyConsideration"
            :items="esyConsiderationOptions"
            label="ESY consideration is"
          ></v-select>
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="esyRecommended"
            :items="esyRecommendedOptions"
            label="ESY is recommended"
          ></v-select>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <h5>Disucussion:</h5>
          <v-text-field v-model="esyDiscussion"></v-text-field>
        </v-col>
      </v-row>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
