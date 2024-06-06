import { ref } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

const CHILDREN_URL = '/api/children' // Define CHILDREN_URL here

const useChildrenStore = defineStore('children', () => {
  const modalIsVisible = ref(false)
  const children = ref()
  const editProfile = ref(false)
  const selectedChildProfile = ref()
  const childNameGrade = ref()

  const toggleModal = () => {
    modalIsVisible.value = !modalIsVisible.value
    editProfile.value = false
  }

  const editChildProfile = (childInfo) => {
    editProfile.value = true
    selectedChildProfile.value = childInfo
  }

  const addChild = async (data) => {
    await axios.post(`${CHILDREN_URL}/register`, data)
  }

  const getChildrenProfiles = async (parentId) => {
    const { data } = await axios.get(`${CHILDREN_URL}`, parentId)
    children.value = data || []

    childNameGrade.value = data.map((item) => ({
      name: item.name,
      gradeLevel: item.gradeLevel,
      id: item._id
    }))
  }

  const updateChildProfile = async (data) => {
    await axios.put(`${CHILDREN_URL}/${data._id}`, data)
  }

  const removeChildProfile = async (id) => {
    await axios.delete(`${CHILDREN_URL}/${id}`)
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
