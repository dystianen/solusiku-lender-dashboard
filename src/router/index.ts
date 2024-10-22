import { createRouter, createWebHistory } from 'vue-router'
import { BaseLayout, DashboardLayout } from '@/layouts/layouts'
import RegistrationType from '@/views/registration/RegistrationType.vue'
import RegistrationLender from '@/views/registration/RegistrationLender.vue'
import LoginView from '@/views/LoginView.vue'
import OtpView from '@/views/OtpView.vue'
import ChangePassword from '@/views/password/ChangePassword.vue'
import SuccessUpdatePassword from '@/views/password/SuccessUpdatePassword.vue'
import ForgotPassword from '@/views/password/ForgotPassword.vue'
import RegistrationFundingPersonal from '@/views/registration/RegistrationFundingPersonal.vue'
import WaitingView from '@/views/WaitingView.vue'
import DashboardView from '@/views/DashboardView.vue'
import FundingOpportunities from '@/views/management-pendanaan/FundingOpportunities.vue'
import ProfileLender from '@/views/ProfileLender.vue'
import AccountSetting from '@/views/AccountSetting.vue'
import Notification from '@/views/Notification.vue'
import FundingHistory from '@/views/management-pendanaan/FundingHistory.vue'
import PaymentHistory from '@/views/management-pendanaan/PaymentHistory.vue'
import Restructuring from '@/views/management-pendanaan/Restructuring.vue'
import DeleteBookWO from '@/views/management-pendanaan/DeleteBookWO.vue'
import RegistrationBorrower from '@/views/registration/RegistrationBorrower.vue'
import RegistrationFundingCompany from '@/views/registration/RegistrationFundingCompany.vue'
import { accessToken } from '@/cookies/accessToken'

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
        layout: DashboardLayout
      },
      component: DashboardView
    },
    {
      path: '/register-funding-personal',
      name: 'register-funding-personal',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: RegistrationFundingPersonal
    },
    {
      path: '/register-funding-company',
      name: 'register-funding-company',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: RegistrationFundingCompany
    },
    {
      path: '/waiting-approval',
      name: 'waiting-approval',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: WaitingView
    },
    {
      path: '/funding-opportunities',
      name: 'funding-opportunities',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: FundingOpportunities
    },
    {
      path: '/funding-history',
      name: 'funding-history',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: FundingHistory
    },
    {
      path: '/payment-history',
      name: 'payment-history',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: PaymentHistory
    },
    {
      path: '/restructuring',
      name: 'restructuring',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: Restructuring
    },
    {
      path: '/delete-book-wo',
      name: 'delete-book-wo',
      meta: {
        layout: DashboardLayout,
        requiresAuth: true
      },
      component: DeleteBookWO
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
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (accessToken.value) {
      // User is authenticated, proceed to the route
      next()
    } else {
      // User is not authenticated, redirect to login
      next('/login')
    }
  } else {
    // Non-protected route, allow access
    next()
  }
})

export default router
