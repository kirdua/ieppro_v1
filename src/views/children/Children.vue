<script setup>
import { ref, onMounted } from 'vue'
import AddChild from '@/components/children/AddChild.vue'
import ChildCard from '@/components/children/ChildCard.vue'
import ChildDialog from '@/components/children/ChildDialog.vue'
import { gradeLevels, diagnosesList, accommodationsList } from '@/utils/child-options'
import useUserStore from '@/stores/user'
import useChildrenStore from '@/stores/children'

const userStore = useUserStore()
const childStore = useChildrenStore()

const { userInfo } = userStore

const isLoading = ref(false)

onMounted(() => {
  isLoading.value = true
  if (!userInfo._id) return
  getChildrenInfo()
})

const getChildrenInfo = async () => {
  try {
    await childStore.getChildrenProfiles()

    if (childStore.children) {
      isLoading.value = false
    }
  } catch (error) {
    console.error(error)
  }
}
</script>
<template>
  <div>
    <add-child :parentId="userInfo._id" @get-child-data="getChildrenInfo" :disabled="isLoading" />
    <v-progress-linear v-if="isLoading" color="cyan" indeterminate></v-progress-linear>

    <v-row class="pa-3">
      <v-col v-for="child in childStore.children" :key="child._id" cols="12" lg="4" md="4" sm="12">
        <child-card :child="child" @get-child-data="getChildrenInfo" />
      </v-col>
    </v-row>
    <child-dialog
      :parentId="userInfo._id"
      @get-child-data="getChildrenInfo"
      :disabled="isLoading"
    />
  </div>
</template>
