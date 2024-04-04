import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/pendaftaran',
    name: 'PendaftaranPage',
    component: () => import('../views/PendaftaranPage.vue')
  },
  {
    path: '/status/:phone',
    name: 'StatusPendaftaranPage',
    component: () => import('../views/StatusPendaftaranPage.vue')
  },
  {
    path: '/pengumpulan/tugas',
    name: 'PengumpulanTugasPage',
    component: () => import('../views/TugasPage.vue')
  },

  // auth

  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/auth/LoginPage.vue')
  },
  {
    path: '/registration',
    name: 'RegistrationPage',
    component: () => import('../views/auth/RegistrationPage.vue')
  },

  // admin
  {
    path: '/adm',
    name: 'AdmHomePage',
    component: () => import('../views/admin/AdmHomePage.vue')
  },
  {
    path: '/peserta/:phone',
    name: 'DataPesertaPage',
    component: () => import('../views/admin/DataPesertaPage.vue')
  },
  {
    path: '/tugas/deskripsi',
    name: 'DeskripsiTugasPage',
    component: () => import('../views/admin/DeskripsiTugasPage.vue')
  },
  {
    path: '/database',
    name: 'DatabaseManagement',
    component: () => import('../views/admin/DatabaseManagement.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the page is being reloaded
  window.scrollTo({ top: 0, behavior: 'smooth' })
  if (!from) {
    // Save the current path to localStorage
    localStorage.setItem('lastVisitedPage', to.fullPath)
  }
  next()
})

export default router
