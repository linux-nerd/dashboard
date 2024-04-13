import { Card, Row, Col, Select } from "antd"
import { Column } from "@ant-design/charts"
import { Order, useDashboard } from "../dashboard.context"
import { useEffect, useState } from "react"

type GrossSalesPerChannel = {
  channel: string
  grossSales: number
}

enum XAxisField {
  Channel = "channel",
  ChannelGroup = "channelGroup",
  CampaignName = "campaignName"
}

const getGrossSalesPerChannel = (filteredOrders: Order[], xAxisField: XAxisField): GrossSalesPerChannel[] => {
  const grossSalesMap: { [channel: string]: number } = {}

  // Iterate through filtered orders and calculate gross sales per channel
  filteredOrders.forEach(order => {
    const key = xAxisField === XAxisField.Channel ? order.channel : xAxisField === XAxisField.ChannelGroup ? order.channelGroup : order.campaignName
    if (!grossSalesMap[key]) {
      grossSalesMap[key] = 0
    }
    grossSalesMap[key] += order.orderValue
  })

  // Convert the map to an array of objects with channel and grossSales properties
  const grossSalesPerChannel: GrossSalesPerChannel[] = Object.keys(grossSalesMap).map(channel => ({
    channel,
    grossSales: grossSalesMap[channel],
  }))

  return grossSalesPerChannel
}

export const SalesPerChannel = () => {
  const { state } = useDashboard()
  const [xAxisField, setXAxisField] = useState<XAxisField>(XAxisField.Channel)
  const [chartData, setChartData] = useState<GrossSalesPerChannel[]>(getGrossSalesPerChannel(state.filteredOrders, xAxisField))

  useEffect(() => {
    setChartData(getGrossSalesPerChannel(state.filteredOrders, xAxisField))
  }, [xAxisField, state.filteredOrders])
  
  // Configuration for the column chart
  const config = {
    data: chartData,
    xField: "channel",
    yField: "grossSales",
    meta: {
      channel: { alias: xAxisField === XAxisField.Channel ? "Channel" : xAxisField === XAxisField.ChannelGroup ? "Channel Group" : "Campaign Name" },
      grossSales: { alias: "Gross Sales" },
    },
  }

  return (
    <Card
      title="Order Value per Channel"
      extra={
        <Select value={xAxisField} onChange={(value) => setXAxisField(value as XAxisField)} style={{ width: 200 }}>
          <Select.Option value={XAxisField.Channel}>Channel</Select.Option>
          <Select.Option value={XAxisField.ChannelGroup}>Channel Group</Select.Option>
          <Select.Option value={XAxisField.CampaignName}>Campaign Name</Select.Option>
        </Select>
      }
    >
      <Row justify="center" align="middle">
        <Col span={20}>
          <Column {...config} />
        </Col>
      </Row>
    </Card>
  )
}