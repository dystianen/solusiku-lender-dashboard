import { useQuery } from '@tanstack/vue-query'
import dashboardServices from './dashboard-services'

const useDashboard = {
  getDashboard() {
    return useQuery({
      queryKey: ['DASHBOARD'],
      queryFn: dashboardServices.dashboard
    })
  }
}

export default useDashboard
