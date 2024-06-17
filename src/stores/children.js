// src/stores/childrenStore.js
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db, doc, childrenCollection, serverTimestamp } from '@/lib/firebaseClient'
import { setDoc, getDocs, updateDoc, deleteDoc } from 'firebase/firestore'

const useChildrenStore = defineStore('children', () => {
  const modalIsVisible = ref(false)
  const children = ref([])
  const editProfile = ref(false)
  const selectedChildProfile = ref(null)
  const childNameGrade = ref([])

  const toggleModal = () => {
    modalIsVisible.value = !modalIsVisible.value
    editProfile.value = false
  }

  const editChildProfile = (childInfo) => {
    editProfile.value = true
    selectedChildProfile.value = childInfo
  }

  const addChild = async (data) => {
    // replace serverTimestamp with tz timestamp with moment format
    try {
      const childProfile = {
        ...data,
        createdOn: serverTimestamp(),
        updatedOn: serverTimestamp()
      }
      const childDocRef = doc(childrenCollection)
      await setDoc(childDocRef, childProfile)
      await getChildrenProfiles()
    } catch (error) {
      console.error('Error adding child profile:', error)
    }
  }

  const getChildrenProfiles = async () => {
    try {
      const querySnapshot = await getDocs(childrenCollection)
      const childrenData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      children.value = childrenData
      childNameGrade.value = childrenData.map((item) => ({
        name: item.name,
        gradeLevel: item.gradeLevel,
        id: item.id
      }))
    } catch (error) {
      console.error('Error getting children profiles:', error)
    }
  }

  const updateChildProfile = async (data) => {
    try {
      const childDoc = doc(db, 'children', data.id)
      const profileData = {
        ...data,
        updatedOn: serverTimestamp()
      }
      await updateDoc(childDoc, profileData)
      await getChildrenProfiles() // Refresh the profiles
    } catch (error) {
      console.error('Error updating child profile:', error)
    }
  }

  const removeChildProfile = async (id) => {
    try {
      const childDoc = doc(db, 'children', id)
      await deleteDoc(childDoc)
      await getChildrenProfiles() // Refresh the profiles
    } catch (error) {
      console.error('Error removing child profile:', error)
    }
  }

  return {
    modalIsVisible,
    children,
    childNameGrade,
    editProfile,
    selectedChildProfile,
    toggleModal,
    addChild,
    getChildrenProfiles,
    updateChildProfile,
    removeChildProfile,
    editChildProfile
  }
})

export default useChildrenStore
