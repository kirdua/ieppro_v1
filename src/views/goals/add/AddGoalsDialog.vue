<script setup>
import { ref } from 'vue'
import useGoalsStore from '@/stores/goals'

const goalsStore = useGoalsStore()
const goalTypeItems = ['Academic', 'Functional', 'Related Services']

const goalFocus = ref('')
const goalType = ref('' || goalTypeItems[0])
const numberOfBenchmarks = ref(1)
</script>
<template>
  <v-dialog v-model="goalsStore.modalIsVisible" max-width="600">
    <v-card prepend-icon="mdi-check-circle" class="text-blue" title="Goals">
      <v-card-text>
        <v-row dense>
          <v-col cols="12" md="6" sm="6">
            <v-text-field
              label="Goal"
              required
              v-model="goal"
              placeholder="Math, Reading, etc..."
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6" sm="6">
            <v-autocomplete
              :items="goalTypeItems"
              label="Goal Type"
              auto-select-first
              v-model="goalType"
            ></v-autocomplete>
          </v-col>

          <v-col cols="12" md="12" sm="12">
            <v-text-field label="Current performance" required></v-text-field>
          </v-col>

          <v-col cols="12" md="12" sm="12">
            <v-text-field label="Duration"></v-text-field>
          </v-col>

          <v-col cols="12" md="12" sm="12" v-for="num in numberOfBenchmarks" :key="num">
            <v-text-field label="Benchmark" append-inner-icon="mdi-close-circle"></v-text-field>
          </v-col>

          <v-col cols="12" md="12" sm="12">
            <div class="d-flex justify-end">
              <v-btn @click="numberOfBenchmarks++">Add Benchmark</v-btn>
            </div>
          </v-col>

          <v-col cols="12" sm="6">
            <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
          </v-col>

          <v-col cols="12" sm="6">
            <v-autocomplete
              :items="[
                'Skiing',
                'Ice hockey',
                'Soccer',
                'Basketball',
                'Hockey',
                'Reading',
                'Writing',
                'Coding',
                'Basejump'
              ]"
              label="Interests"
              auto-select-first
              multiple
            ></v-autocomplete>
          </v-col>
        </v-row>

        <small class="text-caption text-medium-emphasis">*indicates required field</small>
        {{ goalType }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Close" variant="plain" @click="dialog = false"></v-btn>

        <v-btn color="primary" text="Save" variant="tonal" @click="dialog = false"></v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
