import RegistrationFundingIndividual from '@/components/pages/registration/RegistrationFundingIndividual.vue'
import RegistrationFundingInstitution from '@/components/pages/registration/RegistrationFundingInstitution.vue'
import { BaseLayout, DashboardLayout } from '@/layouts/layouts'
import accessTokenStore from '@/stores/accessToken.store'
import AccountSetting from '@/views/AccountSetting.vue'
import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'
import Notification from '@/views/Notification.vue'
import OtpView from '@/views/OtpView.vue'
import ProfileLender from '@/views/ProfileLender.vue'
import DeleteBookWO from '@/views/funding-management/DeleteBookWO.vue'
import FundingHistory from '@/views/funding-management/FundingHistory.vue'
import FundingOpportunities from '@/views/funding-management/FundingOpportunities.vue'
import PaymentHistory from '@/views/funding-management/PaymentHistory.vue'
import Restructuring from '@/views/funding-management/restructuring/Restructuring.vue'
// import RestructuringDetail from '@/views/funding-management/restructuring/RestructuringDetail.vue'
import ChangePassword from '@/views/password/ChangePassword.vue'
import ForgotPassword from '@/views/password/ForgotPassword.vue'
import SuccessUpdatePassword from '@/views/password/SuccessUpdatePassword.vue'
import RegistrationBorrower from '@/views/registration/RegistrationBorrower.vue'
import RegistrationLender from '@/views/registration/RegistrationLender.vue'
import RegistrationType from '@/views/registration/RegistrationType.vue'
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
      component: RegistrationType
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        layout: BaseLayout
      },
      component: RegistrationLender
    },
    {
      path: '/register/otp',
      name: 'register-otp',
      meta: {
        layout: BaseLayout
      },
      component: OtpView
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        layout: BaseLayout
      },
      component: LoginView
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      meta: {
        layout: BaseLayout
      },
      component: ForgotPassword
    },
    {
      path: '/forgot-password/otp',
      name: 'forgot-password-otp',
      meta: {
        layout: BaseLayout
      },
      component: OtpView
    },
    {
      path: '/change-password',
      name: 'change-password',
      meta: {
        layout: BaseLayout
      },
      component: ChangePassword
    },
    {
      path: '/success-update-password',
      name: 'success-update-password',
      meta: {
        layout: BaseLayout
      },
      component: SuccessUpdatePassword
    },
    {
      path: '/register-borrower',
      name: 'register-borrower',
      meta: {
        layout: BaseLayout
      },
      component: RegistrationBorrower
    },

    // DASHBOARD LAYOUT
    {
      path: '/dashboard',
      name: 'dashboard',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: DashboardView
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
          component: FundingOpportunities
        },
        {
          path: 'funding-history',
          name: 'funding-history',
          component: FundingHistory
        },
        {
          path: 'payment-history',
          name: 'payment-history',
          component: PaymentHistory
        },
        {
          path: 'restructuring',
          children: [
            {
              path: '',
              name: 'restructuring',
              component: Restructuring
            }
            // {
            //   path: ':id',
            //   name: 'restructuring-detail',
            //   component: RestructuringDetail
            // }
          ]
        },
        {
          path: 'delete-book-wo',
          name: 'delete-book-wo',
          component: DeleteBookWO
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
      component: ProfileLender
    },
    {
      path: '/account-setting',
      name: 'account-setting',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: AccountSetting
    },
    {
      path: '/notification',
      name: 'notification',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: Notification
    },
    {
      path: '/register-funding-individual',
      name: 'register-funding-individual',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: RegistrationFundingIndividual
    },
    {
      path: '/register-funding-institution',
      name: 'register-funding-institution',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: RegistrationFundingInstitution
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
