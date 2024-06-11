import { defineStore } from 'pinia'
import { auth } from '@/lib/firebaseClient'
import { createUserWithEmailAndPassword, signOut } from 'firebase/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    userLoggedIn: false,
    user: null,
    error: null,
    loading: false
  }),
  actions: {
    async register(email, password) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        this.user = userCredential
        this.userLoggedIn = true
      } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(error)
        this.error = {
          errorCode,
          errorMessage
        }
      }
    },
    async login(email, password) {},
    async logout() {
      await signOut()
      this.user = null
      this.userLoggedIn = false
    }
  }
})
