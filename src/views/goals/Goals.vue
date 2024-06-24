<script setup>
import GoalsMenu from './GoalsMenu.vue'
import GoalsDetail from './GoalsDetails.vue'
import GoalsList from '@/components/goals/GoalsList.vue'
</script>

<template>
  <div class="goals-container">
    <GoalsList />
    <!-- <GoalsMenu class="goals-menu" /> -->
    <GoalsDetail class="goals-detail" />
  </div>
</template>

<style scoped>
.goals-container {
  display: flex;
  height: 100vh; /* Optional: adjust based on your needs */
}

.goals-menu {
  flex: 1; /* Takes up 1/3 of the space */
}

.goals-detail {
  flex: 3; /* Takes up 2/3 of the space */
}
</style>
