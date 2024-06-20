import { defineStore } from 'pinia'
import { ref } from 'vue'
import { servicesCollection } from '@/lib/firebaseClient'
import { addDoc, getDocs, query, where } from 'firebase/firestore'

const useServicesStore = defineStore('services', () => {
  const currentServices = ref([])

  const getServicesByGradeLevel = async ({ id, gradeLevel }) => {
    try {
      const q = query(
        servicesCollection,
        where('childId', '==', id),
        where('gradeLevel', '==', gradeLevel) // Query by childId only
      )

      const querySnapshot = await getDocs(q)

      const services = []
      querySnapshot.forEach((doc) => {
        const data = doc.data()

        if (data.services && Array.isArray(data.services)) {
          // Merge nested services arrays into the services array
          services.push(...data.services)
        } else {
          console.warn('Services array not found or not an array in document:', doc.id)
        }
      })
      currentServices.value = services
    } catch (error) {
      console.error('Error fetching services:', error)
    }
  }

  const addScheduledServices = async (params) => {
    const { id, grade, services } = params
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
