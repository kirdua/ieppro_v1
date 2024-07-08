<script setup>
import { ref } from 'vue'
import { goalHeaders } from '@/constants'
import useChildrenStore from '@/stores/children'
import useGoalsStore from '@/stores/goals'
import AddGoalsDialog from './AddGoalsDialog.vue'

const childStore = useChildrenStore()
const goalsStore = useGoalsStore()

const currentGoals = ref([])

const handleSaveGoal = (data) => {
  currentGoals.value.push(data)
}

const submitGoals = () => {
  goalsStore.addGoalsToGradeLevel(currentGoals)
}
</script>
<template>
  <div>
    <div class="d-flex justify-end pa-2">
      <v-btn text="Add Goal" color="primary" ripple @click="goalsStore.toggleModal"></v-btn>
      <v-btn
        text="Submit Goals"
        color="primary"
        class="ml-2"
        ripple
        :disabled="!currentGoals.length"
        @click="submitGoals"
      ></v-btn>
    </div>
    <v-row class="pa-2">
      <v-col cols="12">
        <v-data-table :headers="goalHeaders" :items="currentGoals" :no-data-text="'Add Goals'">
          <template #bottom></template>
        </v-data-table>
      </v-col>
    </v-row>
    <div>
      <AddGoalsDialog @save-goal="handleSaveGoal" />
    </div>
  </div>
</template>
