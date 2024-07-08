<script setup>
import { ref, onMounted, watch } from 'vue'
import { gradeLevels } from '@/utils/child-options'
import useUserStore from '@/stores/user'
import useChildrenStore from '@/stores/children'
import useGoalsStore from '@/stores/goals'

import GoalsDetail from './GoalsDetails.vue'
import GoalsSidebar from './GoalsSidebar.vue'
import AddGoals from './add/AddGoalsDialog.vue'

const userStore = useUserStore()
const childStore = useChildrenStore()
const goalsStore = useGoalsStore()

const { uid } = userStore.userInfo

const currentGrade = ref('')
const selectedChildId = ref(null)
const childOptions = ref([])
const currentSelectedChild = ref({})
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  await childStore.getChildrenProfiles(uid)
  if (childStore.children.length > 0) {
    childOptions.value = childStore.children.map((child) => ({
      name: child.name,
      id: child.id,
      gradeLevel: child.gradeLevel
    }))
    selectedChildId.value = childOptions.value[0].id
    currentGrade.value = childOptions.value[0].gradeLevel
  }

  updateCurrentChildProfile()
  isLoading.value = false
})

const updateCurrentChildProfile = () => {
  goalsStore.currentChildProfile = {
    id: selectedChildId.value,
    gradeLevel: currentGrade.value
  }
}

watch([selectedChildId, currentGrade], () => {
  updateCurrentChildProfile()
})

const saveGoals = (data) => {
  console.log(data)
}
</script>

<template>
  <div class="pa-4">
    <div class="d-flex w-100 flex-inline">
      <v-select
        label="Child"
        v-model="selectedChildId"
        :items="childOptions"
        item-value="id"
        item-title="name"
        variant="outlined"
        class="w-35 mr-5"
        :disabled="isLoading"
      ></v-select>
      <v-select
        label="Grade Level"
        v-model="currentGrade"
        :items="gradeLevels"
        variant="outlined"
        class="w-35"
        :disabled="isLoading"
      ></v-select>
    </div>
  </div>
  <div>
    <!-- <GoalsSidebar />
    <GoalsDetail class="goals-detail" /> -->
    <add-goals @save-goals="saveGoals" :currentSelectedChild="currentSelectedChild" />
  </div>
</template>
