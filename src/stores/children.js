// Correct import statements
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db, doc, childrenCollection, serverTimestamp } from '@/lib/firebaseClient'
import { setDoc, getDocs, updateDoc, deleteDoc, query, where, collection } from 'firebase/firestore'
import moment from 'moment'

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
    const formatDate = moment().format()
    try {
      const childProfile = {
        ...data,
        createdOn: formatDate,
        updatedOn: formatDate
      }
      const childDocRef = doc(childrenCollection)
      await setDoc(childDocRef, childProfile)
      await getChildrenProfiles()
    } catch (error) {
      console.error('Error adding child profile:', error)
    }
  }

  const getChildrenProfiles = async (parentId) => {
    try {
      const q = query(childrenCollection, where('parentId', '==', parentId))
      const querySnapshot = await getDocs(q)
      const childrenData = []
      querySnapshot.forEach((doc) => {
        childrenData.push({ id: doc.id, ...doc.data() })
      })
      children.value = childrenData
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
