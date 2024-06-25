import { ref } from 'vue'
import { defineStore } from 'pinia'

const useGoalsStore = defineStore('goals', () => {
  const goals = ref()
  const modalIsVisible = ref(false)

  const toggleModal = () => {
    modalIsVisible.value = !modalIsVisible.value
  }

  const addGoalsToGradeLevel = () => {}

  const getGoalsByGradeLevel = () => {}
  const updateGoalsByGradeLevel = () => {}
  return {
    goals,
    modalIsVisible,
    toggleModal,
    addGoalsToGradeLevel,
    getGoalsByGradeLevel,
    updateGoalsByGradeLevel
  }
})

export default useGoalsStore
