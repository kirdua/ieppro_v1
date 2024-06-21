<script setup>
import { watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import useUserStore from '@/stores/user'

import AddChild from '@/components/children/AddChild.vue'
import AddScheduledServices from '@/components/scheduled-services/AddScheduledServices.vue'

const router = useRouter()
const userStore = useUserStore()

const { logout } = userStore

const currentTitle = ref('')

const goToProfile = () => {
  router.push('/profile')
}

const logoutHandler = async () => {
  await logout()
  router.push('/login')
}

const items = [
  { title: 'Profile', action: goToProfile, icon: 'mdi-account' },
  { title: 'Logout', action: logoutHandler, icon: 'mdi-logout' }
]

// Watch for route changes and update the page title accordingly
watch(
  () => router.currentRoute.value,
  (to, from) => {
    currentTitle.value = to.meta.header
  }
)
</script>
<template>
  <v-app-bar flat class="justify-end">
    <template v-slot:prepend>
      <h3>{{ currentTitle }}</h3>
    </template>

    <v-app-bar-title></v-app-bar-title>

    <v-spacer></v-spacer>
    <add-child v-if="currentTitle === 'Children Profiles'" class="align-center" />
    <add-scheduled-services v-if="currentTitle === 'Scheduled Services'" class="align-center" />
    <v-menu open-on-hover class="justify-end">
      <template v-slot:activator="{ props }">
        <v-btn icon color="primary" v-bind="props">
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item v-for="(item, index) in items" :key="index" @click="item.action">
          <v-list-item-content class="custom-list-item">
            <v-list-item-icon class="mr-2">
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>
.custom-list-item {
  display: inline-flex;
}
</style>
