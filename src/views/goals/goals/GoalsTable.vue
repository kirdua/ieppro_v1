<script setup>
import { ref } from 'vue'
import { goalHeaders, formatTableData } from '@/constants'
import useGoalsStore from '@/stores/goals'

const props = defineProps({
  items: Array,
  isLoading: Boolean
})

const goalStore = useGoalsStore()

const handleRowClick = (item) => {
  goalStore.selectedGoalRow = item
  goalStore.toggleGoalsDrawer(true)
}
</script>

<template>
  <v-data-table :headers="goalHeaders" :items="props.items" :loading="props.isLoading">
    <template v-slot:loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
    <template v-slot:item="{ item }">
      <tr class="hoverable-row" @click="handleRowClick(item)">
        <td>{{ item.goalFocus }}</td>
        <td>{{ item.goalType }}</td>
        <td>{{ item.currentPerformance }}</td>
        <td>{{ item.duration }}</td>
        <td>{{ formatTableData(item.benchmarks, 'number') }}</td>
        <td>{{ item.implementer }}</td>
      </tr>
    </template>
    <template #bottom></template>
  </v-data-table>
</template>
