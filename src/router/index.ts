import { BaseLayout, DashboardLayout } from '@/layouts/layouts'
import accessTokenStore from '@/stores/accessToken.store'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  linkActiveClass: 'tw-bg-primary tw-text-white',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // BASE LAYOUT
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/register-type',
      name: 'register-type',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/registration/RegistrationType.vue')
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/registration/RegistrationLender.vue')
    },
    {
      path: '/register/otp',
      name: 'register-otp',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/OtpView.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/LoginView.vue')
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/password/ForgotPassword.vue')
    },
    {
      path: '/forgot-password/otp',
      name: 'forgot-password-otp',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/OtpView.vue')
    },
    {
      path: '/change-password',
      name: 'change-password',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/password/ChangePassword.vue')
    },
    {
      path: '/success-update-password',
      name: 'success-update-password',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/password/SuccessUpdatePassword.vue')
    },
    {
      path: '/register-borrower',
      name: 'register-borrower',
      meta: {
        layout: BaseLayout
      },
      component: () => import('@/views/registration/RegistrationBorrower.vue')
    },

    // DASHBOARD LAYOUT
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/funding-management',
      name: 'funding-management',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      children: [
        {
          path: 'funding-opportunities',
          name: 'funding-opportunities',
          component: () => import('@/views/funding-management/FundingOpportunities.vue')
        },
        {
          path: 'funding-history',
          name: 'funding-history',
          component: () => import('@/views/funding-management/FundingHistory.vue')
        },
        {
          path: 'payment-history',
          name: 'payment-history',
          component: () => import('@/views/funding-management/PaymentHistory.vue')
        },
        {
          path: 'restructuring',
          children: [
            {
              path: '',
              name: 'restructuring',
              component: () => import('@/views/funding-management/restructuring/Restructuring.vue')
            }
          ]
        },
        {
          path: 'delete-book-wo',
          name: 'delete-book-wo',
          component: () => import('@/views/funding-management/DeleteBookWO.vue')
        }
      ]
    },
    {
      path: '/profile-lender',
      name: 'profile-lender',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: () => import('@/views/ProfileLender.vue')
    },
    {
      path: '/account-setting',
      name: 'account-setting',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: () => import('@/views/AccountSetting.vue')
    },
    {
      path: '/notification',
      name: 'notification',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: () => import('@/views/Notification.vue')
    },
    {
      path: '/register-funding-individual',
      name: 'register-funding-individual',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: () => import('@/components/pages/registration/RegistrationFundingIndividual.vue')
    },
    {
      path: '/register-funding-institution',
      name: 'register-funding-institution',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: () => import('@/components/pages/registration/RegistrationFundingInstitution.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const { accessToken } = accessTokenStore()

  // Pages that cannot be accessed if logged in
  const restrictedAfterLogin = ['/login']

  // Check if route exists
  if (to.matched.length === 0) {
    // Route not found
    if (accessToken) {
      next('/dashboard') // If logged in, go to dashboard
    } else {
      next('/login') // If not logged in, go to login
    }
    return
  }

  if (accessToken) {
    if (restrictedAfterLogin.includes(to.path)) {
      next('/dashboard')
    } else {
      next()
    }
  } else {
    if (to.meta.requiresAuth) {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
