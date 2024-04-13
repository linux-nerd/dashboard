export type Order = {
  channel: string
  channelGroup: string
  campaignName: string
  orderValue: number
}

export type Session = {
  channel: string
  channelGroup: string
  campaignName: string
}
export type FilterOption = {
  value: string
  label: string
}

export type FilterOptions = {
  channelOptions: FilterOption[]
  channelGroupOptions: FilterOption[]
  campaignOptions: FilterOption[]
}

export type Filter = {
  channel: string[]
  channelGroup: string[]
  campaign: string[]
}

export type State = {
  filter: Filter
  orders: Order[]
  sessions: Session[]
  filteredOrders: Order[]
  filteredSessions: Session[]
}

export const generateFilterOptions = (orders: Order[], sessions: Session[]): FilterOptions => {
  const allChannels = Array.from(new Set([...orders.map(order => order.channel), ...sessions.map(session => session.channel)]))
  const allChannelGroups = Array.from(new Set([...orders.map(order => order.channelGroup), ...sessions.map(session => session.channelGroup)]))
  const allCampaigns = Array.from(new Set([...orders.map(order => order.campaignName), ...sessions.map(session => session.campaignName)]))

  const channelOptions = allChannels.map(channel => ({
    value: channel,
    label: channel
  }))

  const channelGroupOptions = allChannelGroups.map(channelGroup => ({
    value: channelGroup,
    label: channelGroup
  }))

  const campaignOptions = allCampaigns.map(campaign => ({
    value: campaign,
    label: campaign
  }))

  return {
    channelOptions,
    channelGroupOptions,
    campaignOptions
  }
}

export const filterData = <T extends { channel: string; channelGroup: string; campaignName: string }>(
  data: T[],
  filter: Filter
): T[] => {
  if (filter.channel.length === 0 && filter.channelGroup.length === 0 && filter.campaign.length === 0) {
    return data // No filter, return all data
  }
  return data.filter(item =>
    (filter.channel.length === 0 || filter.channel.includes(item.channel)) &&
    (filter.channelGroup.length === 0 || filter.channelGroup.includes(item.channelGroup)) &&
    (filter.campaign.length === 0 || filter.campaign.includes(item.campaignName))
  )
}

export const filterOrdersAndSessions = (state: State, filter: Filter) => {
  const { orders, sessions } = state
  const updatedOrders = filterData<Order>(orders, filter)
  const updatedSessions = filterData<Session>(sessions, filter)

  return {filteredOrders: updatedOrders, filteredSessions: updatedSessions}
}
