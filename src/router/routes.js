const routes = [
  {
    path: '/',
    name: 'overview',
    component: () => import('@/views/overview/Dashboard.vue')
    // beforeEnter(to, from, next) {
    //   next()
    // }
    // meta: {
    //   requiresAuth: true,
    //   header: 'Overview'
    // }
  },
  {
    path: '/progress',
    name: 'Annual Progress Report',
    component: () => import('@/views/progress/ProgressReport.vue'),
    beforeEnter(to, from, next) {
      next()
    }
    // meta: {
    //   requiresAuth: true,
    //   header: 'Annual Progress Report'
    // }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/register/Register.vue')
  },
  {
    path: '/children',
    name: 'children',
    component: () => import('@/views/children/Children.vue')
    // beforeEnter(to, from, next) {
    //   next()
    // }
    // meta: {
    //   requiresAuth: true,
    //   header: 'Children Profiles'
    // }
  },
  {
    path: '/goals',
    name: 'goals',
    component: () => import('@/views/goals/Goals.vue')
    // beforeEnter(to, from, next) {
    //   next()
    // }
    // meta: {
    //   requiresAuth: true,
    //   header: 'Goals'
    // }
  },
  {
    path: '/scheduled-services',
    name: 'scheduled-services',
    component: () => import('@/views/services/scheduled/ScheduledServices.vue')
    // beforeEnter(to, from, next) {
    //   next()
    // }
    // meta: {
    //   requiresAuth: true,
    //   header: 'Scheduled Services'
    // }
  },
  {
    path: '/add-services',
    name: 'add-services',
    component: () => import('@/views/services/add/AddServices.vue')
    // beforeEnter(to, from, next) {
    //   next()
    // }
    // meta: {
    //   requiresAuth: true,
    //   header: 'Add Scheduled Services'
    // }
  },
  {
    path: '/other-services',
    name: 'other-services',
    component: () => import('@/views/other/OtherServices.vue')
    // beforeEnter(to, from, next) {
    //   next()
    // }
    // meta: {
    //   requiresAuth: true,
    //   header: 'Other Services'
    // }
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'overview' }
  }
]

export default routes
