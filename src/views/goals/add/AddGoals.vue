<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { goalHeaders } from '@/constants'
import useGoalsStore from '@/stores/goals'
import AddGoalsDialog from './AddGoalsDialog.vue'
import { toast } from 'vue3-toastify'

const goalsStore = useGoalsStore()

const route = useRoute()
const router = useRouter()
const id = route.query.id
const grade = route.query.grade

const currentGoals = ref([])

const handleSaveGoal = (data) => {
  currentGoals.value.push(data)
}

const submitGoals = async () => {
  if (!currentGoals.value.length) return

  const goalsData = {
    goals: currentGoals.value,
    id,
    grade
  }

  try {
    await goalsStore.addGoalsToGradeLevel(goalsData)
    toast.success('Goals added')
    setTimeout(() => {
      router.push('/goals')
    }, 5000)
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Add goals failed')
  }
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
