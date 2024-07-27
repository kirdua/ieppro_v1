<script setup>
import { ref } from 'vue'
const items = [
  {
    title: 'Item #1',
    value: 1
  },
  {
    title: 'Item #2',
    value: 2
  },
  {
    title: 'Item #3',
    value: 3
  }
]
</script>
<template>
  <v-card width="276px" class="mx-auto h-75 mt-10 ml-5" max-width="400">
    <v-list :items="items"></v-list>
  </v-card>
</template>
