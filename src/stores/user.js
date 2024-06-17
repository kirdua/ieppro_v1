import { defineStore } from 'pinia'
import { auth, db, doc, usersCollection } from '@/lib/firebaseClient'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { setDoc, getDoc } from 'firebase/firestore/lite'
import moment from 'moment'

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
}

export default defineStore('user', {
  state: () => ({
    initialState,
    userInfo: initialState.userInfo,
    userLoggedIn: initialState.userInfo !== null
  }),
  actions: {
    async register(values) {
      const { email, password, name } = values
      const userCred = await createUserWithEmailAndPassword(auth, email, password)
      const userDocRef = doc(usersCollection, userCred.user.uid)

      const formatDate = moment().format()

      await setDoc(userDocRef, {
        parentId: userCred.user.uid,
        name,
        email,
        createdAt: formatDate,
        updatedAt: formatDate
      })

      const currentUser = {
        name,
        uid: userCred.user.uid
      }

      localStorage.setItem('userInfo', JSON.stringify(currentUser))
      this.userLoggedIn = true
    },
    async login(values) {
      const { email, password } = values
      const userCred = await signInWithEmailAndPassword(auth, email, password)

      // Fetch user data from Firestore
      const userDocRef = doc(usersCollection, userCred.user.uid)
      const userDoc = await getDoc(userDocRef)

      if (userDoc.exists()) {
        const userData = userDoc.data()
        const currentUser = {
          name: userData.name,
          uid: userCred.user.uid
        }
        this.userLoggedIn = true
        localStorage.setItem('userInfo', JSON.stringify(currentUser))
      }
    },
    // async updateUserProfile(values) {
    //   const userDocRef = doc(usersCollection, userCred.user.uid)
    //   const userDoc = await getDoc(userDocRef)
    //   this.userInfo = data
    //   localStorage.setItem('userInfo', JSON.stringify(data))
    // },
    async logout() {
      await signOut(auth)
      localStorage.removeItem('userInfo')
      this.userLoggedIn = false
    }
  }
})
