<script setup>
import { useRouter } from 'vue-router'
import useServicesStore from '@/stores/services'

const router = useRouter()
const servicesStore = useServicesStore()

const goToAddServices = (id, grade) => {
  router.push({ name: 'add-services', query: { id, grade } })
}
</script>
<template>
  <div class="d-flex justify-end mr-5">
    <v-btn
      color="blue-1"
      variant="outlined"
      rippel
      @click="
        goToAddServices(
          servicesStore.currentChildProfile.value.id,
          servicesStore.currentChildProfile.value.gradeLevel
        )
      "
    >
      Add Scheduled Services
    </v-btn>
  </div>
</template>
