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

const extendedSchoolYear = computed(() => {
  const esy = props.child.extendedSchoolYear
  return esy ? 'Yes' : 'No'
})

const specialTransportation = computed(() => {
  const specialTransportation = props.child.specialTransportation
  return specialTransportation ? 'Yes' : 'No'
})

const updateChildInfo = async () => {
  childrenStore.toggleModal()
  childrenStore.editChildProfile(props.child)
}

const deleteChildInfo = async () => {
  const { id, parentId } = props.child

  try {
    childrenStore.removeChildProfile({ id, parentId })
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
  <v-card
    width="596"
    height="400"
    prepend-icon="mdi-account"
    color="flat"
    :title="props.child.name"
  >
    <v-card-text class="pa-2 card-bg">
      <div><strong>Date of Birth:</strong> {{ birthDate }}</div>
      <div><strong>Grade Level:</strong> {{ props.child.gradeLevel }}</div>
      <div>
        <strong>Diagnoses: </strong>
        <br />
        <span v-for="diagnosis in props.child.diagnoses" :key="diagnosis">
          {{ diagnosis }}
          <br />
        </span>
      </div>
      <div>
        <strong>Accommodations: </strong><br />
        <span v-for="accommodation in props.child.accommodations" :key="accommodation">
          {{ accommodation }}
          <br />
        </span>
      </div>
      <div>
        <strong>Extended School Year:</strong>
        {{ extendedSchoolYear }}
      </div>
      <div>
        <strong>Special Transportation:</strong>
        {{ specialTransportation }}
      </div>
    </v-card-text>
    <v-card-actions class="d-flex justify-end mt-10">
      <div>
        <v-btn color="error" variant="flat" @click="deleteChildInfo">Delete</v-btn>
        <v-btn color="primary" variant="flat" @click="updateChildInfo">Edit</v-btn>
        <v-btn
          color="primary"
          variant="flat"
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
