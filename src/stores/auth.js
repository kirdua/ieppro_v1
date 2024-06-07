import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    error: null,
    loading: false
  }),
  actions: {
    async signup(email, password) {
      // this.loading = true
      // this.error = null

      await supabase.auth.signUp({ email, password })
      // try {
      //   const { user, error } = await supabase.auth.signUp({ email, password })
      //   if (error) throw error
      //   this.user = user
      // } catch (error) {
      //   this.error = error.message
      // } finally {
      //   this.loading = false
      // }
    },
    async login(email, password) {
      this.loading = true
      this.error = null
      try {
        const { user, error } = await supabase.auth.signIn({ email, password })
        if (error) throw error
        this.user = user
      } catch (error) {
        this.error = error.message
      } finally {
        this.loading = false
      }
    },
    async logout() {
      await supabase.auth.signOut()
      this.user = null
    }
  }
})
