<script setup>
import useGoalsStore from '@/stores/goals'

const goalsStore = useGoalsStore()
</script>
<template>
  <v-navigation-drawer
    v-model="goalsStore.showGoalsSidebar"
    app
    temporary
    location="right"
    width="400"
    :class="$style.detailsDrawer"
  >
    <v-list-item nav class="custom-background">
      <template v-slot:append>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click.stop="goalsStore.toggleGoalsDrawer(false)"
        ></v-btn>
      </template>
    </v-list-item>

    <v-list class="scrollable-list">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Goal Focus:</strong> {{ goalsStore.selectedGoalRow.goalFocus }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Goal Type:</strong> {{ goalsStore.selectedGoalRow.goalType }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Current Performance:</strong>
            {{ goalsStore.selectedGoalRow.currentPerformance }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Duration:</strong> {{ goalsStore.selectedGoalRow.duration }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Implementer:</strong> {{ goalsStore.selectedGoalRow.implementer }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <strong>Benchmarks:</strong>
          </v-list-item-title>
          <v-list>
            <v-list-item
              v-for="(benchmark, index) in goalsStore.selectedGoalRow.benchmarks"
              :key="index"
            >
              <v-list-item-content>
                <v-list-item-title>{{ index + 1 }}. {{ benchmark }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<style module>
.detailsDrawer {
  top: 60px !important;
  height: calc(100vh - 60px);
}

.scrollable-list {
  overflow-y: auto;
  max-height: calc(100vh - 120px); /* Adjust height as needed */
}
</style>
