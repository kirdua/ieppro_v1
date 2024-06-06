<script setup>
import useChildrenStore from '@/stores/children'
const childrenStore = useChildrenStore()
</script>

<template>
  <div class="d-flex justify-end mt-5 mr-5">
    <v-btn color="primary" rippel @click="childrenStore.toggleModal" :disabled="disabled">
      Add Child
    </v-btn>
  </div>
</template>
