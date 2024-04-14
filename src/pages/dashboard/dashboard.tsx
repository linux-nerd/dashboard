import { Space, Spin } from "antd"
import { useEffect, useState } from "react"
import { useFetch } from "../../hooks/use-fetch"
import { FilterOptions, generateFilterOptions } from "../../utils"
import { Filter } from "./components/filter"
import { SalesPerChannel } from "./components/sales-chart"
import { Summary } from "./components/summary"
import { TabularSummary } from "./components/tabular-summary"
import { ActionType, Order, Session, useDashboard } from "./dashboard.context"


export const Dashboard = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions | null>(null)

  const {get: getOrders, data: ordersData, isLoading: ordersIsLoading} = useFetch<Order[] | null>()
  const {get: getSessions, data: sessionsData, isLoading: sessionsIsLoading} = useFetch<Session[] | null>()
  const { state, dispatch } = useDashboard()

  const {orders, sessions} = state
  const isLoading = ordersIsLoading || sessionsIsLoading

  useEffect(() => {
    getOrders("orders")
    getSessions("sessions")
  }, [])

  useEffect(() => {
    dispatch({type: ActionType.SetOrders, payload: ordersData ?? []})
  }, [ordersData])
  useEffect(() => {
    dispatch({type: ActionType.SetSessions, payload: sessionsData ?? []})
  }, [sessionsData])

  useEffect(() => {
    if(orders.length && sessions.length) {
      setFilterOptions(generateFilterOptions(orders, sessions))
    }
  }, [orders, sessions])

  return (
    (isLoading || !filterOptions) ? <Spin tip="Loading" size="large"/> : (
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <h2>Dashboard</h2>
        <Filter options={filterOptions} />
        <Summary />
        <TabularSummary />
        <SalesPerChannel />
      </Space>
    )
    
  )
}