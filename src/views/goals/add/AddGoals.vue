<script setup>
import { ref } from 'vue'
import useChildrenStore from '@/stores/children'
import useGoalsStore from '@/stores/goals'
import AddGoalsDialog from './AddGoalsDialog.vue'

const childStore = useChildrenStore()
const goalsStore = useGoalsStore()

const defineProps = ['currentSelectedChild']
</script>
<template>
  <div>
    {{ currentSelectedChild }}
    <div class="d-flex justify-end pa-2">
      <v-btn text="Add Goal" color="primary" ripple @click="goalsStore.toggleModal"></v-btn>
      <v-btn
        text="Submit Goals"
        color="primary"
        class="ml-2"
        ripple
        :disabled="!servicesScheduled"
        @click="submitScheduledServices"
      ></v-btn>
    </div>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="servicesHeaders"
          :items="servicesScheduled"
          :no-data-text="'Add Scheduled Services'"
        >
          <template #bottom></template>
        </v-data-table>
      </v-col>
    </v-row>
    <div>
      <AddGoalsDialog />
    </div>
  </div>
</template>
