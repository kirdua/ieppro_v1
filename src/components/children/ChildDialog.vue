<script setup>
import { ref, computed, watch } from 'vue'
import { gradeLevels, diagnosesList, accommodationsList } from '@/utils/child-options'
import { useFormRules } from '@/utils/validation'
import useChildrenStore from '@/stores/children'
import { toast } from 'vue3-toastify'
import { readableTimestamp } from '@/utils/date-format'
import { v7 as uuidv7 } from 'uuid'

const childrenStore = useChildrenStore()
const myuuid = uuidv7()

const props = defineProps(['parentId', 'disabled'])
const emit = defineEmits(['getChildData'])

const name = ref('')
const dateOfBirth = ref('')
const gradeLevel = ref('')
const diagnoses = ref()
const accommodations = ref()
const extendeSchoolYear = ref(true)
const specialTransportation = ref(false)
const _id = ref()

const { validateBirthDate } = useFormRules()

const dateOfBirthRules = computed(() => [
  (value) => validateBirthDate(value) || 'Date must be in the format M/D/YYYY'
])

const populateForm = () => {
  const selectedChild = childrenStore.selectedChildProfile
  const formattedDate = readableTimestamp(selectedChild.dateOfBirth)
  if (selectedChild) {
    name.value = selectedChild.name
    dateOfBirth.value = formattedDate
    gradeLevel.value = selectedChild.gradeLevel
    diagnoses.value = selectedChild.diagnoses
    accommodations.value = selectedChild.accommodations
    extendeSchoolYear.value = selectedChild.extendeSchoolYear
    specialTransportation.value = selectedChild.specialTransportation
    _id.value = selectedChild._id
  }
}

watch(
  () => childrenStore.editProfile,
  () => {
    if (childrenStore.editProfile) populateForm()
  }
)

const clearForm = () => {
  name.value = ''
  dateOfBirth.value = ''
  gradeLevel.value = ''
  diagnoses.value = null
  accommodations.value = null
  extendeSchoolYear.value = true
  specialTransportation.value = false
}

const submitChild = async () => {
  const childInfo = {
    parentId: props.parentId,
    name: name.value,
    dateOfBirth: dateOfBirth.value,
    gradeLevel: gradeLevel.value,
    diagnoses: diagnoses.value,
    accommodations: accommodations.value,
    extendeSchoolYear: extendeSchoolYear.value,
    specialTransportation: specialTransportation.value,
    _id: _id.value || myuuid
  }

  if (!childInfo.name || !childInfo.dateOfBirth || !childInfo.gradeLevel || !childInfo.diagnoses) {
    return toast.error('Add child information')
  }

  try {
    if (childrenStore.editProfile) {
      await childrenStore.updateChildProfile(childInfo)
      toast.success('Child updated')
    } else {
      await childrenStore.addChild(childInfo)

      toast.success('Child added')
    }

    childrenStore.toggleModal()
    emit('getChildData')
    clearForm()
  } catch (error) {
    const updateAdd = childrenStore.editProfile ? 'update' : 'registration'
    toast.error(error?.response?.data?.message || `Child ${updateAdd} failed`)
  }
  childrenStore.error = 'There is an error!'
}

const cancel = () => {
  clearForm()
  childrenStore.toggleModal()
}
</script>

<template>
  <v-dialog v-model="childrenStore.modalIsVisible" max-width="400">
    <v-card class="pa-4">
      <v-card-title>Child's Information</v-card-title>
      <v-text-field v-model="name" placeholder="Child's name" class="p-1"></v-text-field>
      <v-text-field
        v-model="dateOfBirth"
        :rules="dateOfBirthRules"
        placeholder="Date of birth: 1/1/2023"
      ></v-text-field>
      <v-select v-model="gradeLevel" :items="gradeLevels" label="Grade Level"></v-select>
      <v-select
        v-model="diagnoses"
        :items="diagnosesList"
        label="Qualifications"
        chips
        multiple
      ></v-select>
      <v-select
        v-model="accommodations"
        :items="accommodationsList"
        label="Accommodations"
        chips
        multiple
      ></v-select>
      <v-checkbox
        v-model="extendeSchoolYear"
        label="Extended School Year (ESY)"
        color="primary"
      ></v-checkbox>
      <v-checkbox
        v-model="specialTransportation"
        label="Special Transportation"
        color="primary"
      ></v-checkbox>
      <template v-slot:actions>
        <v-spacer></v-spacer>
        <v-btn @click="cancel"> Cancel </v-btn>
        <v-btn @click="submitChild" color="primary"> Submit </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
