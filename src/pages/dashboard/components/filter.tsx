import { Col, Row, Select } from "antd"
import { FilterOptions } from "../../../utils"
import { ActionType, useDashboard } from "../dashboard.context"

type FilterProps = {
  options: FilterOptions
}

type ActionTypeFilter = ActionType.SetFilterChannel | ActionType.SetFilterChannelGroup | ActionType.SetFilterCampaignName

export const Filter = ({options}: FilterProps) => {
  const {channelOptions, channelGroupOptions, campaignOptions} = options
  const {dispatch} = useDashboard()

  const handleChange = (type: ActionTypeFilter) => (value: string[]) => dispatch({type, payload: value})

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Filter on Channels"
          onChange={handleChange(ActionType.SetFilterChannel)}
          options={channelOptions}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Filter on Channel groups"
          onChange={handleChange(ActionType.SetFilterChannelGroup)}
          options={channelGroupOptions}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Filter on Campaign names"
          onChange={handleChange(ActionType.SetFilterCampaignName)}
          options={campaignOptions}
        />
      </Col>
    </Row>
  )
}