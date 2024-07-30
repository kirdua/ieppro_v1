<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import useServicesStore from '@/stores/services'
import {
  servicesHeaders,
  semesterOptions,
  locationOptions,
  progressGradedByOptions
} from '@/constants'
import { toast } from 'vue3-toastify'
import VueDatePicker from '@vuepic/vue-datepicker'

const route = useRoute()
const servicesStore = useServicesStore()

const sheet = ref(false)

const selectedSemester = ref(null)
const year = ref('')
const course = ref('')
const location = ref('')
const genEdModified = ref(true)
const genEdTime = ref('')
const specialEdTime = ref('')
const progressGradedBy = ref('')
const startDate = ref('')
const endDate = ref('')

const servicesScheduled = ref()

onMounted(() => {
  const { id, grade } = route.query
  if (id && grade) {
    sheet.value = true
  }
})

const submitScheduledServices = async () => {
  const { id, grade } = route.query
  const obj = {
    id,
    grade,
    services: servicesScheduled.value
  }

  try {
    await servicesStore.addScheduledServices(obj)
    toast.success('Scheduled Services added')
  } catch (error) {
    console.error('error: ', error)
    toast.error(error?.response?.data?.message || 'Failed to save scheduled services')
  }
}

const clearServicesForms = () => {
  selectedSemester.value = null
  year.value = ''
  course.value = ''
  location.value = ''
  genEdModified.value = true
  genEdTime.value = ''
  specialEdTime.value = ''
  progressGradedBy.value = ''
  startDate.value = ''
  endDate.value = ''
}

const addCourse = () => {
  const obj = {
    semester: selectedSemester.value,
    year: year.value,
    course: course.value,
    location: location.value,
    genEdModified: genEdModified.value,
    genEducationTime: genEdTime.value,
    specialEducationTime: specialEdTime.value,
    gradedBy: progressGradedBy.value,
    startDate: startDate.value,
    endDate: endDate.value
  }

  if (Array.isArray(servicesScheduled.value)) {
    servicesScheduled.value.push(obj) // Push new object to the array
  } else {
    servicesScheduled.value = [obj]
  }
}

const formatStartDate = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = `${month}/${day}/${year}`
  startDate.value = currentDate
  return `Start date will be ${month}/${day}/${year}`
}

const formatEndDate = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  const currentDate = `${month}/${day}/${year}`
  endDate.value = currentDate
  return `End date will be ${currentDate}`
}
</script>

<template>
  <div>
    <div class="d-flex justify-end pa-2">
      <v-btn text="Add Schedule" color="primary" ripple @click="sheet = !sheet"></v-btn>
      <v-btn
        text="Submit Schedule"
        color="primary"
        class="ml-2"
        ripple
        :disabled="!servicesScheduled"
        @click="submitScheduledServices"
      ></v-btn>
    </div>
    <v-row class="pa-2">
      <v-col cols="12">
        <v-data-table
          :headers="servicesHeaders"
          :items="servicesScheduled"
          :no-data-text="'Add Goals'"
        >
          <template #bottom></template>
        </v-data-table>
      </v-col>
    </v-row>
    <div class="text-center">
      <v-bottom-sheet v-model="sheet" inset>
        <v-card height="450">
          <v-card-text>
            <div class="d-flex justify-end pb-1">
              <v-btn variant="outline" color="error" @click="sheet = !sheet"> Close </v-btn>
            </div>

            <div>
              <v-row>
                <v-col cols="12"><h5>Add a Course:</h5></v-col>
              </v-row>
              <v-row>
                <v-col cols="3">
                  <v-select
                    v-model="selectedSemester"
                    :items="semesterOptions"
                    label="Select a Semester"
                  ></v-select>
                </v-col>
                <v-col cols="3">
                  <v-text-field v-model="year" label="Year" placeholder="2023-2024"></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-text-field
                    v-model="course"
                    label="Course/Cirriculum"
                    placeholder="Math, Language Arts, etc..."
                  ></v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="location"
                    :items="locationOptions"
                    label="Select a Location"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col col="3">
                  <v-checkbox
                    v-model="genEdModified"
                    label="Gen Ed Modified"
                    color="primary"
                  ></v-checkbox>
                </v-col>
                <v-col col="3">
                  <v-text-field
                    v-model="genEdTime"
                    label="General Education Time"
                    placeholder="20"
                  ></v-text-field>
                </v-col>
                <v-col col="3">
                  <v-text-field
                    v-model="specialEdTime"
                    label="Special Education Time"
                    placeholder="20"
                  ></v-text-field>
                </v-col>
                <v-col col="3">
                  <v-select
                    v-model="progressGradedBy"
                    label="Progress/Graded determined by"
                    :items="progressGradedByOptions"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <VueDatePicker
                    v-model="startDate"
                    placeholder="Start Date"
                    :format="formatStartDate"
                  >
                    <template #time-picker> </template>
                    <template #action-buttons> </template>
                  </VueDatePicker>
                </v-col>
                <v-col cols="6">
                  <VueDatePicker v-model="endDate" placeholder="End Date" :format="formatEndDate">
                    <template #time-picker> </template>
                    <template #action-buttons> </template>
                  </VueDatePicker>
                </v-col>
              </v-row>
            </div>
          </v-card-text>
          <v-card-actions class="d-flex justify-end pr-5">
            <v-btn text="Clear" ripple @click="clearServicesForms"></v-btn>
            <v-btn text="Add Course" color="primary" ripple @click="addCourse"></v-btn>
          </v-card-actions>
        </v-card>
      </v-bottom-sheet>
    </div>
  </div>
</template>
