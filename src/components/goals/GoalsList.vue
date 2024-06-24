<script setup>
import { ref } from 'vue'

const myEvents = [
  {
    title: 'Progress tracking',
    subtitle: 'New goal added for your child.',
    image: 'image-url-1'
  },
  {
    title: 'Progress tracking',
    subtitle: 'Goal completed by your child.',
    image: 'image-url-2'
  },
  {
    title: 'Service planning',
    subtitle: 'Goal completed by your child.',
    image: 'image-url-3'
  },
  {
    title: 'Visual aids for learning',
    subtitle: 'Goal put on hold by your child.',
    image: 'image-url-4'
  },
  {
    title: 'Yearly progress review',
    subtitle: 'Goal completed by your child.',
    image: 'image-url-5'
  }
]
const events = ref(myEvents)
</script>

<template>
  <v-card class="pa-3">
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title class="headline">Upcoming events</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>mdi-chevron-down</v-icon>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="(event, index) in events" :key="index">
        <v-list-item-action>
          <v-icon>mdi-checkbox-marked</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-html="event.title"></v-list-item-title>
          <v-list-item-subtitle>{{ event.subtitle }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-avatar>
          <v-avatar>
            <img :src="event.image" alt="Event Image" />
          </v-avatar>
        </v-list-item-avatar>
      </v-list-item>
      <v-divider v-if="index < events.length - 1"></v-divider>
    </v-list>
  </v-card>
</template>
<style>
.pa-3 {
  padding: 1rem;
}
.headline {
  font-weight: bold;
  font-size: 1.25rem;
}
</style>
