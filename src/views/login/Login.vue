<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import useUserStore from '@/stores/user'
import { useFormRules } from '../../utils/validation'
import { toast } from 'vue3-toastify'

const userStore = useUserStore()
const router = useRouter()
const { emailRules, passwordRules } = useFormRules()

const email = ref('')
const password = ref('')

const submitForm = async () => {
  // Handle form submission logic here
  const userCredentials = {
    email: email.value,
    password: password.value
  }

  try {
    await userStore.login(userCredentials)
    router.push('/')
  } catch (error) {
    toast.error(error?.response?.data?.message || 'Login failed')
  }
}
</script>
<template>
  <v-sheet class="h-screen">
    <v-row>
      <v-col cols="4" class="h-screen background-1 d-flex align-center justify-center">
        <v-icon
          color="white-1"
          icon="mdi-book-open-blank-variant-outline mr-2"
          class="text-h1"
        ></v-icon>
        <h1 class="header-color text-h1">IEP Pro</h1>
      </v-col>

      <v-col cols="8" class="h-screen background-2 d-flex align-center justify-center">
        <v-card width="90%">
          <v-card-title class="headline sign-up">Sign up</v-card-title>
          <v-form @submit.prevent="submitForm" class="px-3 mt-3">
            <v-text-field
              v-model="email"
              label="Email"
              type="email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>

            <!-- Use v-col to position the button on the right -->
            <v-col class="text-right" cols="12">
              Not already signed up?
              <router-link class="sign-up text-decoration-none" to="/register"
                >Register</router-link
              >
              <v-btn
                type="submit"
                color="blue-1"
                class="ml-2 text-decoration-none"
                :disabled="isRegisterButtonDisabled"
                >Login</v-btn
              >
            </v-col>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<style>
.header-color {
  color: #dddddd;
}
.sign-up {
  color: #125d98;
}
.background-1 {
  background-color: #3c8dad;
}
.background-2 {
  background-color: #125d98;
}
</style>
