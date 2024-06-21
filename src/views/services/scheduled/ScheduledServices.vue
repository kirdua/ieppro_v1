<script setup>
import { onMounted, ref, watch } from 'vue'
import useUserStore from '@/stores/user'
import useServicesStore from '@/stores/services'
import useChildrenStore from '@/stores/children'
import { gradeLevels } from '@/utils/child-options'

import ServicesTable from './ServicesTable.vue'

const userStore = useUserStore()
const childStore = useChildrenStore()
const servicesStore = useServicesStore()

const { uid } = userStore.userInfo

const currentGrade = ref('')
const selectedChildId = ref(null)
const childOptions = ref([])
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
  await getServices()
  isLoading.value = false
})

watch(
  () => childStore.childNameGrade,
  (newValue) => {
    if (newValue) {
      childOptions.value = newValue.map((child) => ({
        name: child.name,
        id: child._id,
        gradeLevel: child.gradeLevel
      }))
      if (childOptions.value.length > 0) {
        selectedChildId.value = childOptions.value[0]._id
        currentGrade.value = childOptions.value[0].gradeLevel
      }
    }
  },
  { immediate: true }
)

watch(
  () => [selectedChildId.value, currentGrade.value],
  () => {
    getServices()
  }
)

const getServices = async () => {
  isLoading.value = true
  const params = {
    id: selectedChildId.value,
    gradeLevel: currentGrade.value
  }
  servicesStore.currentChildProfile.value = params

  console.log(servicesStore.currentChildProfile)
  try {
    await servicesStore.getServicesByGradeLevel(params)
  } catch (error) {
    console.error(error?.response?.data?.message)
  }
  isLoading.value = false
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
    <ServicesTable :isLoading="isLoading" :items="servicesStore.currentServices" />
  </div>
</template>
