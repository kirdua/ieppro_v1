<script setup>
import { computed } from 'vue'
import { readableTimestamp } from '@/utils/date-format'
import useChildrenStore from '@/stores/children'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'

const props = defineProps(['child'])
const emit = defineEmits(['getChildData'])

const router = useRouter()
const childrenStore = useChildrenStore()

const birthDate = computed(() => {
  return readableTimestamp(props.child.dateOfBirth)
})

const updateChildInfo = async () => {
  childrenStore.toggleModal()
  childrenStore.editChildProfile(props.child)
}

const deleteChildInfo = async () => {
  const { _id, parentId } = props.child
  console.log(props.child)
  try {
    childrenStore.deleteChildProfile({ _id, parentId })
    toast.success('Child removed')
    emit('getChildData')
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Delete child failed')
  }
}

const goToAddServices = (id, grade) => {
  router.push({ name: 'add-services', query: { id, grade } })
}
</script>
<template>
  <v-card width="596" height="200" elevation="16" color="#385F73" class="d-flex flex-column">
    <v-card-title class="d-flex align-center blue darken-1 text-h5">
      <v-icon color="white-1">mdi-account</v-icon>
      <span class="ml-2">{{ props.child.name }}</span>
      <v-spacer></v-spacer>
      <v-icon
        color="white-1"
        class="cursor-pointer text-h5"
        v-tooltip="'Delete Profile'"
        @click="deleteChildInfo"
        >mdi-close</v-icon
      >
    </v-card-title>
    <v-card-subtitle class="d-flex justify-space-between">
      <strong class="text-h5">Date of Birth: {{ birthDate }}</strong>
      <strong class="text-h5">Grade Level: {{ props.child.gradeLevel }}</strong>
    </v-card-subtitle>

    <v-card-actions class="d-flex justify-end mt-10">
      <div>
        <v-btn color="white-1" variant="outlined" @click="updateChildInfo">View/Edit</v-btn>
        <v-btn
          color="white-1"
          variant="outlined"
          @click="goToAddServices(props.child._id, props.child.gradeLevel)"
          >Add Special Services</v-btn
        >
      </div>
    </v-card-actions>
  </v-card>
</template>
<style>
.card-bg {
  background-color: '#152A38' !important;
}
</style>
