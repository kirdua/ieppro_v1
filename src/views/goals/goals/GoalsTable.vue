<script setup>
import { goalHeaders, formatTableData } from '@/constants'

const props = defineProps(['items', 'isLoading'])
</script>
<template>
  <v-data-table :headers="goalHeaders" :items="props.items" :loading="isLoading">
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.goalFocus }}</td>
        <td>{{ item.goalType }}</td>
        <td>{{ item.currentPerformance }}</td>
        <td>{{ item.duration }}</td>
        <td class="text-center">{{ formatTableData(item.benchmarks, 'number') }}</td>
        <td>{{ item.implementer }}</td>
      </tr>
    </template>
    <template #bottom></template>
  </v-data-table>
</template>
