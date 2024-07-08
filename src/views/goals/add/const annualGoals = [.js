const annualGoals = [
  {
    gradeLevel: 1,
    childId: '',
    measuarableAnnualGoals: [
      {
        goalNumber: 1,
        goalFocus: 'Reading',
        status: {
          draft: true,
          esy: false,
          acceptedByCommittee: false,
          transitionRealatedGoal: false
        },
        goalType: '',
        description: '',
        currentPerformance: '',
        duration: 'some date',
        languageOfDelivery: 'English',
        benchmarks: [
          {
            benchmarkGoal: ''
          },
          {
            benchmarkGoal: ''
          }
        ],
        implmenter: 'Special Education Teacher',
        evaluationMethods: ['Data Collection', 'Observations'],
        createdAt: 'Date',
        updatedAt: 'Date'
      },
      {
        goalNumber: 2,
        goalFocus: 'Math',
        status: {
          draft: true,
          esy: false,
          acceptedByCommittee: false,
          transitionRealatedGoal: false
        },
        goalType: {
          academic: true,
          functional: false,
          relatedServices: false
        },
        description: '',
        currentPerformance: '',
        duration: 'some date',
        languageOfDelivery: 'English',
        benchmarks: [
          {
            objectives: '',
            benchmarkGoal: ''
          },
          {
            objectives: '',
            benchmarkGoal: ''
          }
        ],
        implmenter: 'Special Education Teacher',
        evaluationMethods: ['Data Collection', 'Observations'],
        reportingFrequency: 'Concurrent with issuance of report card'
      }
    ],
    createdAt: 'Date',
    updatedAt: 'Date'
  },
  {
    gradeLevel: 2,
    childId: '',
    measuarableAnnualGoals: [
      {
        goalNumber: 1,
        goalFocus: 'Reading',
        status: {
          draft: true,
          esy: false,
          acceptedByCommittee: false,
          transitionRealatedGoal: false
        },
        goalType: {
          academic: true,
          functional: false,
          relatedServices: false
        },
        description: '',
        currentPerformance: '',
        duration: 'some date',
        languageOfDelivery: 'English',
        benchmarks: [
          {
            objectives: '',
            benchmarkGoal: ''
          },
          {
            objectives: '',
            benchmarkGoal: ''
          }
        ],
        implmenter: 'Special Education Teacher',
        evaluationMethods: ['Data Collection', 'Observations'],
        reportingFrequency: 'Concurrent with issuance of report card',
        createdAt: 'Date',
        updatedAt: 'Date'
      },
      {
        goalNumber: 2,
        goalFocus: 'Math',
        status: {
          draft: true,
          esy: false,
          acceptedByCommittee: false,
          transitionRealatedGoal: false
        },
        goalType: {
          academic: true,
          functional: false,
          relatedServices: false
        },
        description: '',
        currentPerformance: '',
        duration: 'some date',
        languageOfDelivery: 'English',
        benchmarks: [
          {
            objectives: '',
            benchmarkGoal: ''
          },
          {
            objectives: '',
            benchmarkGoal: ''
          }
        ],
        implmenter: 'Special Education Teacher',
        evaluationMethods: ['Data Collection', 'Observations'],
        reportingFrequency: 'Concurrent with issuance of report card'
      }
    ],
    createdAt: 'Date',
    updatedAt: 'Date'
  }
]

const closeGoalsModal = () => {
  goalsStore.modalIsVisible = false
  goalFocus.value = ''
  goalType.value = goalTypeItems[0]
  benchmarks.value = []
  currentImplementer.value = progressGradedByOptions[1]
}
