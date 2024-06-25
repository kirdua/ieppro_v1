<script setup>
import GoalsDetail from './GoalsDetails.vue'
import GoalsSidebar from './GoalsSidebar.vue'
import AddGoals from './add/AddGoalsDialog.vue'
</script>

<template>
  <div class="goals-container">
    <GoalsSidebar />
    <GoalsDetail class="goals-detail" />
    <add-goals />
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
