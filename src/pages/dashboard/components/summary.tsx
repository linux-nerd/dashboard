import { Statistic, Row, Col, Card } from "antd"
import { useDashboard } from "../dashboard.context"


export const Summary = () => {
  const { state } = useDashboard()
  const totalSales = state.filteredOrders.reduce((total, order) => total + order.orderValue, 0)
  const totalOrders = state.filteredOrders.length
  const totalVisits = state.filteredSessions.length
  return (
    <Row gutter={[16, 16]} justify="center">
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <Card title="Total Gross Sales" bordered={false}>
          <Statistic value={totalSales} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <Card title="Total Number of Orders" bordered={false}>
          <Statistic value={totalOrders} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={12} lg={8} xl={8}>
        <Card title="Total Number of Visits" bordered={false}>
          <Statistic value={totalVisits} />
        </Card>
      </Col>
    </Row>
  )
}