import { ref } from 'vue'
import { defineStore } from 'pinia'
import { doc, goalsCollection } from '@/lib/firebaseClient'
import { setDoc, getDoc, getDocs, deleteDoc, query, where } from 'firebase/firestore'
import moment from 'moment'

const useGoalsStore = defineStore('goals', () => {
  const formatDate = moment().format()

  const goals = ref()
  const modalIsVisible = ref(false)
  const currentChildProfile = ref({})

  const toggleModal = () => {
    modalIsVisible.value = !modalIsVisible.value
  }

  const addGoalsToGradeLevel = async (data) => {
    const goalsData = {
      ...data,
      createdOn: formatDate,
      updatedOn: formatDate
    }

    const goalDocRef = doc(goalsCollection)
    await setDoc(goalDocRef, goalsData)
  }

  const getGoalsByGradeLevel = () => {}
  const updateGoalsByGradeLevel = () => {}
  return {
    goals,
    modalIsVisible,
    toggleModal,
    addGoalsToGradeLevel,
    getGoalsByGradeLevel,
    updateGoalsByGradeLevel,
    currentChildProfile
  }
})

export default useGoalsStore
