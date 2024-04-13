import { Dashboard } from "./dashboard"
import { DashboardProvider } from "./dashboard.context"

export const DashboardPage = () => {

  return (
    <DashboardProvider>
      <Dashboard />
    </DashboardProvider>
  )
}