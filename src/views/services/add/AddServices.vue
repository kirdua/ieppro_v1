<script setup>
import { ref } from 'vue'
import ServiceSelect from './ServiceSelect.vue'

const services = ref([])

const handleServicesSelected = (selectedService) => {
  services.value.push(selectedService)
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
