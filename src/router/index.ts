import { createRouter, createWebHistory } from 'vue-router'
import RegistrationView from '@/views/registration/RegistrationView.vue'
import RegistrationLender from '@/views/registration/RegistrationLender.vue'
import LoginView from '@/views/LoginView.vue'
import OtpView from '@/views/OtpView.vue'
import NewPassword from '@/views/NewPassword.vue'
import SuccessUpdatePassword from '@/views/SuccessUpdatePassword.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import RegistrationPendanaan from '@/views/registration/RegistrationPendanaan.vue'
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

const router = createRouter({
  linkActiveClass: 'tw-bg-primary tw-text-white',
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      component: () => import('@/components/templates/layouts/BaseLayout.vue'),
      redirect: '/login',
      children: [
        {
          path: '/registration',
          name: 'registration',
          component: RegistrationView
        },
        {
          path: '/registration-lender',
          name: 'registration-lender',
          component: RegistrationLender
        },
        {
          path: '/login',
          name: 'login',
          component: LoginView
        },
        {
          path: '/forgot-password',
          name: 'forgot-password',
          component: ForgotPassword
        },
        {
          path: '/otp',
          name: 'otp',
          component: OtpView
        },
        {
          path: '/new-password',
          name: 'new-password',
          component: NewPassword
        },
        {
          path: '/success-update-password',
          name: 'success-update-password',
          component: SuccessUpdatePassword
        }
      ]
    },
    {
      path: '',
      component: () => import('@/components/templates/layouts/LenderLayout.vue'),
      children: [
        {
          path: '/registration-pendanaan',
          name: 'registration-pendanaan',
          component: RegistrationPendanaan
        },
        {
          path: '/waiting',
          name: 'waiting',
          component: WaitingView
        }
      ]
    },
    {
      path: '',
      component: () => import('@/components/templates/layouts/DashboardLayout.vue'),
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: '/funding-opportunities',
          name: 'funding-opportunities',
          component: FundingOpportunities
        },
        {
          path: '/funding-history',
          name: 'funding-history',
          component: FundingHistory
        },
        {
          path: '/payment-history',
          name: 'payment-history',
          component: PaymentHistory
        },
        {
          path: '/restructuring',
          name: 'restructuring',
          component: Restructuring
        },
        {
          path: '/delete-book-wo',
          name: 'delete-book-wo',
          component: DeleteBookWO
        },
        {
          path: '/profile-lender',
          name: 'profile-lender',
          component: ProfileLender
        },
        {
          path: '/account-setting',
          name: 'account-setting',
          component: AccountSetting
        },
        {
          path: '/notification',
          name: 'notification',
          component: Notification
        }
      ]
    }
  ]
})

export default router
