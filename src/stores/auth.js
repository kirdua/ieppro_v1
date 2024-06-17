import { defineStore } from 'pinia'
import { auth, db, doc, usersCollection } from '@/lib/firebaseClient'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, getDoc } from 'firebase/firestore/lite'
import moment from 'moment'

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    userLoggedIn: false
  }),
  actions: {
    async register(user) {
      const { email, password, name } = user
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const userDocRef = doc(usersCollection, userCred.user.uid)

      const formatDate = moment().format()

      await setDoc(userDocRef, {
        name,
        email,
        createdAt: formatDate,
        updatedAt: formatDate
      })

      this.user = {
        uid: userCred.user.uid,
        email: userCred.user.email,
        name
      }

      const currentUser = {
        name,
        pid: userCred.user.uid
      }

      localStorage.setItem('userInfo', JSON.stringify(currentUser))
      this.userLoggedIn = true
    },
    async login(email, password) {
      try {
        const userCred = await signInWithEmailAndPassword(auth, email, password)

        // Fetch user data from Firestore
        const userDocRef = doc(usersCollection, userCred.user.uid)
        const userDoc = await getDoc(userDocRef)
        if (userDoc.exists()) {
          this.user = {
            uid: userCred.user.uid,
            email: userCred.user.email,
            name: userDoc.data().name
          }
          this.userLoggedIn = true
        }
      } catch (error) {
        console.error('Error during login:', error)
        // Handle error (e.g., show a notification to the user)
      }
    },
    async logout() {
      try {
        await signOut(auth)
        this.user = null
        this.userLoggedIn = false
      } catch (error) {
        console.error('Error during logout:', error)
        // Handle error (e.g., show a notification to the user)
      }
    }
  }
})
