import { ref } from 'vue'
import { defineStore } from 'pinia'
import { doc, childrenCollection } from '@/lib/firebaseClient'
import { setDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore'
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
    const childProfile = {
      ...data,
      createdOn: formatDate,
      updatedOn: formatDate
    }
    const childDocRef = doc(childrenCollection)
    await setDoc(childDocRef, childProfile)
    await getChildrenProfiles(parentId)
  }

  const getChildrenProfiles = async (parentId) => {
    try {
      const q = query(childrenCollection, where('parentId', '==', parentId))
      const querySnapshot = await getDocs(q)
      const childrenData = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        const id = data._id
        childrenData.push({ id, ...data })
      })
      children.value = childrenData
    } catch (error) {
      console.error('Error getting children profiles:', error)
    }
  }

  const updateChildProfile = async (data) => {
    try {
      const querySnapshot = await getDocs(query(childrenCollection, where('_id', '==', data._id)))

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id
        const childDocRef = doc(childrenCollection, docId)

        const profileData = {
          ...data,
          updatedOn: formatDate
        }

        await setDoc(childDocRef, profileData)

        await getChildrenProfiles(data.parentId)
      } else {
        console.error('Document with _id', data._id, 'not found.')
      }
    } catch (error) {
      console.error('Error updating child profile:', error)
    }
  }

  const deleteChildProfile = async ({ _id, parentId }) => {
    try {
      const q = query(
        childrenCollection,
        where('_id', '==', _id),
        where('parentId', '==', parentId)
      )
      const querySnapshot = await getDocs(q)

      // Check if any documents match the query
      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const childDocRef = doc(childrenCollection, docSnapshot.id)
          await deleteDoc(childDocRef)
        })

        // Refresh the profiles
        await getChildrenProfiles(parentId)
        console.log('Children profiles refreshed.')
      } else {
        console.error(`No document found with _id: ${_id} and parentId: ${parentId}`)
      }
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
    deleteChildProfile,
    editChildProfile
  }
})

export default useChildrenStore
