<script setup>
import useChildrenStore from '@/stores/children'
const childrenStore = useChildrenStore()
</script>

<template>
  <div class="d-flex justify-end mr-5">
    <v-btn
      color="blue-1"
      variant="outlined"
      rippel
      @click="childrenStore.toggleModal"
      :disabled="disabled"
    >
      Add Child
    </v-btn>
  </div>
</template>
