import { Table, Card, TableColumnsType } from "antd"
import { Order, Session, useDashboard } from "../dashboard.context"

type AggregatedDataItem = {
  key: string
  channel: string
  channelGroup: string
  campaignName: string
  grossSales: number
  numberOfOrders: number
  numberOfVisits: number
}


const aggregateData = (filteredOrders: Order[], filteredSessions: Session[]): AggregatedDataItem[] => {
  const aggregatedData: { [key: string]: AggregatedDataItem } = {}

  // Aggregate data from filtered orders
  filteredOrders.forEach(order => {
    const key = `${order.channel}-${order.channelGroup}-${order.campaignName}`
    if (!aggregatedData[key]) {
      aggregatedData[key] = {
        key,
        channel: order.channel,
        channelGroup: order.channelGroup,
        campaignName: order.campaignName,
        grossSales: 0,
        numberOfOrders: 0,
        numberOfVisits: 0,
      }
    }
    aggregatedData[key].grossSales += order.orderValue
    aggregatedData[key].numberOfOrders++
  })

  // Aggregate data from filtered sessions
  filteredSessions.forEach(session => {
    const key = `${session.channel}-${session.channelGroup}-${session.campaignName}`
    if (!aggregatedData[key]) {
      aggregatedData[key] = {
        key,
        channel: session.channel,
        channelGroup: session.channelGroup,
        campaignName: session.campaignName,
        grossSales: 0,
        numberOfOrders: 0,
        numberOfVisits: 0,
      }
    }
    aggregatedData[key].numberOfVisits++
  })

  return Object.values(aggregatedData)
}

const columns: TableColumnsType<AggregatedDataItem> = [
  {
    title: "Channel",
    dataIndex: "channel",
    key: "channel"
  },
  {
    title: "Channel Group",
    dataIndex: "channelGroup",
    key: "channelGroup",
  },
  {
    title: "Campaign",
    dataIndex: "campaignName",
    key: "campaignName",
  },
  {
    title: "Gross Sales",
    dataIndex: "grossSales",
    key: "grossSales",
    render: (value: number) => `$${value.toFixed(2)}`,
    sorter: {
      compare: (a, b) => a.grossSales - b.grossSales
    }
  },
  {
    title: "Number of Orders",
    dataIndex: "numberOfOrders",
    key: "numberOfOrders",
    sorter: {
      compare: (a, b) => a.numberOfOrders - b.numberOfOrders
    }
  },
  {
    title: "Number of Visits",
    dataIndex: "numberOfVisits",
    key: "numberOfVisits",
    sorter: {
      compare: (a, b) => a.numberOfVisits - b.numberOfVisits
    }
  },
]

export const TabularSummary = () => {
  const { state } = useDashboard()
  const data = aggregateData(state.filteredOrders, state.filteredSessions)

  return (
    <Card title="Tabular Summary">
      <Table dataSource={data} 
        columns={columns} 
        size="large"
        scroll={{ x: 'calc(700px + 50%)', y: 240 }}
        bordered 
      />
    </Card>
  )
}