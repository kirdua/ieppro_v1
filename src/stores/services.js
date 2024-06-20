import { defineStore } from 'pinia'
import { ref } from 'vue'
import { db, doc, servicesCollection } from '@/lib/firebaseClient'
import { addDoc, setDoc, getDocs, updateDoc, deleteDoc, query, where } from 'firebase/firestore'

const useServicesStore = defineStore('services', () => {
  const currentServices = ref([])

  const getServicesByGradeLevel = async (params) => {
    // currentServices.value = []
    // const { id, gradeLevel } = params
    // const { data } = await axios.get(`${SERVICES_URL}?id=${id}&gradeLevel=${gradeLevel}`)
    // currentServices.value = data || []
  }

  const addScheduledServices = async (params) => {
    const { id, grade, services } = params

    console.log({ params })
    try {
      await addDoc(servicesCollection, {
        childId: id,
        gradeLevel: grade,
        services
      })
    } catch (error) {
      console.error(error)
    }
  }

  return {
    currentServices,
    getServicesByGradeLevel,
    addScheduledServices
  }
})

export default useServicesStore
