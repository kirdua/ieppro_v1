export const servicesHeaders = [
  { title: 'Semester', align: 'center', key: 'semester' },
  { title: 'Year', align: 'center', key: 'year' },
  { title: 'Course/Curriculum', align: 'center', key: 'course' },
  { title: 'Location', align: 'center', key: 'location' },
  { title: 'Gen Ed Modified', align: 'center', key: 'genEdModified' },
  { title: 'Gen Ed Time', align: 'center', key: 'genEducationTime' },
  { title: 'Special Ed Time', align: 'center', key: 'specialEducationTime' },
  { title: 'Progress Graded by', align: 'center', key: 'gradedBy' },
  { title: 'Start Date', align: 'center', key: 'startDate' },
  { title: 'End Date', align: 'center', key: 'endDate' }
]

export const goalHeaders = [
  {
    title: 'Goal Focus',
    align: 'left',
    key: 'goalFocus'
  },
  {
    title: 'Goal Type',
    align: 'left',
    key: 'goalType'
  },
  {
    title: 'Current Performance',
    align: 'left',
    key: 'currentPerformance'
  },
  {
    title: 'Duration',
    align: 'left',
    key: 'duration'
  },
  {
    title: 'Benchmarks',
    align: 'left',
    key: 'benchmark'
  },
  {
    title: 'Implementer',
    align: 'left',
    key: 'implementer'
  }
]

export const formatTableData = (value, type) => {
  if (type === 'falsey') return !value ? '--' : 'Yes'
  if (type === 'time') return !value ? '' : `${value} mins`
  if (type === 'number') return !value ? '' : `${value.length} benchmarks`
}

export const semesterOptions = ['Full IEP Year', 'Fall', 'Spring', 'Summer']

export const locationOptions = [
  'General Education Classroom',
  'Special Education Classroom',
  'in-class supports General Eduction Classroom',
  'w/ support General Education Classroom',
  'in-class supports Special Education Classroom',
  'w/ support Special Education Classroom'
]

export const progressGradedByOptions = ['General Education', 'Special Education', 'Joint']

export const esyServicesDiscussedOptions = ['Yes', 'No', 'Not considered at this time']

export const esyConsiderationOptions = [
  'Recommended by parent',
  `Recommended by district personnel directly involved in the student's education`,
  'Not recommended by either parent or school'
]

export const esyRecommendedOptions = ['Yes', 'No']
