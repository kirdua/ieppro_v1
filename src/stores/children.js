// Correct import statements
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { db, doc, childrenCollection } from '@/lib/firebaseClient'
import { setDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore'
import moment from 'moment'

const useChildrenStore = defineStore('children', () => {
  const modalIsVisible = ref(false)
  const children = ref([])
  const editProfile = ref(false)
  const selectedChildProfile = ref(null)
  const childNameGrade = ref([])

  const formatDate = moment().format()

  const toggleModal = () => {
    modalIsVisible.value = !modalIsVisible.value
    editProfile.value = false
  }

  const editChildProfile = (childInfo) => {
    editProfile.value = true
    selectedChildProfile.value = childInfo
  }

  const addChild = async (data) => {
    const { parentId } = data
    try {
      const childProfile = {
        ...data,
        createdOn: formatDate,
        updatedOn: formatDate
      }
      const childDocRef = doc(childrenCollection)
      await setDoc(childDocRef, childProfile)
      await getChildrenProfiles(parentId)
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
      // Query for the document based on the _id field
      const querySnapshot = await getDocs(query(childrenCollection, where('_id', '==', data._id)))

      // Check if the document exists
      if (!querySnapshot.empty) {
        // Get the Firestore document ID of the first matching document
        const docId = querySnapshot.docs[0].id

        // Reference the document using doc() with the collection reference and document ID
        const childDocRef = doc(childrenCollection, docId)

        // Prepare the data you want to update
        const profileData = {
          ...data,
          updatedOn: formatDate
        }

        // Use setDoc() to update the document with the new data
        await setDoc(childDocRef, profileData)

        // Refresh the children profiles
        await getChildrenProfiles(data.parentId)
      } else {
        console.error('Document with _id', data._id, 'not found.')
      }
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
