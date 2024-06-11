<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFormRules } from '../../utils/validation'
import { toast } from 'vue3-toastify'

const router = useRouter()
const authStore = useAuthStore()
const { nameRules, emailRules, passwordRules, getConfirmPasswordRules } = useFormRules()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')

// Computed property for confirm password rules
const confirmPasswordRules = ref(getConfirmPasswordRules(password.value))

// Watch for changes in the password field and update confirm password rules accordingly
watch(password, (newPassword) => {
  confirmPasswordRules.value = getConfirmPasswordRules(newPassword)
})

// Computed property to check if passwords match
const passwordsMatch = computed(() => {
  return password.value === confirmPassword.value
})

// Computed property to disable or enable the register button based on password match
const isRegisterButtonDisabled = computed(() => {
  return !passwordsMatch.value
})

const submitForm = async () => {
  // Handle form submission logic here
  await authStore.register(email.value, password.value, name.value)
  // try {
  //   //await userStore.register(newUser)
  //   await authStore.signup(email.value, password.value, name.value)
  //   toast.success('Registration successful')
  //   setTimeout(router.push('/login'), 10000)
  // } catch (error) {
  //   toast.error(error?.response?.data?.message || 'User registration failed')
  // }
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
        <div v-if="registrationError" class="error-message">
          {{ registrationError }}
        </div>

        <v-card width="90%">
          <v-card-title class="headline sign-up">Sign up</v-card-title>
          <v-form @submit.prevent="submitForm" class="px-3 mt-3">
            <v-text-field v-model="name" label="Name" :rules="nameRules" required> </v-text-field>
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
            <v-text-field
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              :rules="confirmPasswordRules"
              required
            ></v-text-field>

            <!-- Use v-col to position the button on the right -->
            <v-col class="text-right" cols="12">
              Already signed up?
              <router-link class="sign-up text-decoration-none" to="/login">Login</router-link>
              <v-btn
                type="submit"
                color="blue-1"
                class="ml-2 text-decoration-none"
                :disabled="isRegisterButtonDisabled"
                >Register</v-btn
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
