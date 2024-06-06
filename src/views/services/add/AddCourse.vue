<script setup>
import { ref } from 'vue'
import { semesterOptions, locationOptions, progressGradedByOptions } from '@/constants'
import VueDatePicker from '@vuepic/vue-datepicker'

const semester = ref(null)
const year = ref('')
const course = ref('')
const location = ref('')
const genEdModified = ref(true)
const genEdTime = ref('')
const specialEdTime = ref('')
const progressGradedBy = ref('')
const startDate = ref('')
const endDate = ref('')

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
  return `End date will be ${month}/${day}/${year}`
}
</script>
<template></template>
