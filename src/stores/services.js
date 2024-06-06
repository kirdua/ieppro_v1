import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

const SERVICES_URL = '/api/scheduled-services'

const useServicesStore = defineStore('services', () => {
  const currentServices = ref([])

  const getServicesByGradeLevel = async (params) => {
    currentServices.value = []
    const { id, gradeLevel } = params
    const { data } = await axios.get(`${SERVICES_URL}?id=${id}&gradeLevel=${gradeLevel}`)
    currentServices.value = data || []
  }

  const addScheduledServices = async (params) => {
    const { id, grade, services } = params
    await axios.post(`${SERVICES_URL}?childId=${id}&gradeLevel=${grade}`, services)
  }

  return {
    currentServices,
    getServicesByGradeLevel,
    addScheduledServices
  }
})

export default useServicesStore
