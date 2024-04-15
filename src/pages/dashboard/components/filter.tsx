import { Col, Row, Select } from "antd"
import { FilterOptions } from "../../../utils"
import { ActionType, useDashboard } from "../dashboard.context"
import { useNavigate } from "react-router-dom"

const FilterMap = {
  [ActionType.SetFilterChannel]: "channel",
  [ActionType.SetFilterChannelGroup]: "channelGroup",
  [ActionType.SetFilterCampaignName]: "campaign"
}

type FilterProps = {
  options: FilterOptions
}

type ActionTypeFilter = ActionType.SetFilterChannel | ActionType.SetFilterChannelGroup | ActionType.SetFilterCampaignName

export const Filter = ({options}: FilterProps) => {
  const {channelOptions, channelGroupOptions, campaignOptions} = options
  const { state, dispatch } = useDashboard()
  const navigate = useNavigate();

  const { filter: {channel, channelGroup, campaign} } = state

  const handleChange = (type: ActionTypeFilter) => (value: string[]) => {
    dispatch({type, payload: value})
    updateURL(type, value)
  }

  const updateURL = (type: ActionTypeFilter, value: string[]) => {
    const params = new URLSearchParams(window.location.search)
    params.delete(FilterMap[type])
    params.append(FilterMap[type], value.join(","))
    navigate(`?${params.toString()}`, { replace: true })
  };

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Filter on Channels"
          onChange={handleChange(ActionType.SetFilterChannel)}
          options={channelOptions}
          defaultValue={channel}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Filter on Channel groups"
          onChange={handleChange(ActionType.SetFilterChannelGroup)}
          options={channelGroupOptions}
          defaultValue={channelGroup}
        />
      </Col>
      <Col xs={24} sm={12} md={8} lg={8} xl={8}>
        <Select
          mode="multiple"
          style={{ width: '100%' }}
          placeholder="Filter on Campaign names"
          onChange={handleChange(ActionType.SetFilterCampaignName)}
          options={campaignOptions}
          defaultValue={campaign}
        />
      </Col>
    </Row>
  )
}