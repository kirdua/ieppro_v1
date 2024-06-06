<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ServiceSelect from './ServiceSelect.vue'
import useChildrenStore from '@/stores/children'

const route = useRoute()
const childStore = useChildrenStore()

const services = ref([])

onMounted(() => {
  console.log(route.query)
})

const handleServicesSelected = (selectedService) => {
  console.log(selectedService)
  services.value.push(selectedService)
}

const handleSubmitForm = () => {
  console.log('fired')
}
</script>
<template>
  <div class="mt-10">
    <v-sheet class="mx-auto" width="95%">
      <div>
        <service-select @service-selected="handleServicesSelected" />
      </div>
    </v-sheet>
  </div>
</template>
