import React, { createContext, useReducer, useContext, ReactNode } from "react"
import { Filter, filterOrdersAndSessions, State } from "../../utils"


export type Order = {
  channel: string
  channelGroup: string
  campaignName: string
  orderValue: number
}

export type Session = Pick<Order, "campaignName" | "channel" | "channelGroup">

export enum ActionType {
  SetFilter = "SET_FILTER",
  SetFilterChannel = "SET_FILTER_CHANNEL",
  SetFilterChannelGroup = "SET_FILTER_CHANNEL_GROUP",
  SetFilterCampaignName = "SET_FILTER_CAMPAIGN_NAME",
  SetOrders = "SET_ORDERS",
  SetSessions = "SET_SESSIONS"
}

type Action =
  | { type: ActionType.SetFilter; payload: Filter }
  | { type: ActionType.SetFilterChannel; payload: string[] }
  | { type: ActionType.SetFilterChannelGroup; payload: string[] }
  | { type: ActionType.SetFilterCampaignName; payload: string[] }
  | { type: ActionType.SetOrders; payload: Order[] }
  | { type: ActionType.SetSessions; payload: Session[] }

// Initial state
const initialState: State = {
  filter: {
    channel: [],
    channelGroup: [],
    campaign: []
  },
  orders: [],
  sessions: [],
  filteredOrders: [],
  filteredSessions: []
}

// Create context
const DashboardContext = createContext<{ state: State; dispatch: React.Dispatch<Action> }>({
  state: initialState,
  dispatch: () => null
})

// Reducer function
const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionType.SetFilter:
      const updatedFilter = {...action.payload}
      console.log(updatedFilter)
      return { ...state, filter: {...updatedFilter}, ...filterOrdersAndSessions(state, updatedFilter) }
    case ActionType.SetFilterChannel:
      const updatedChannelFilter = {...state.filter, channel: [...action.payload]}
      return { ...state, filter: {...updatedChannelFilter}, ...filterOrdersAndSessions(state, updatedChannelFilter) }
    case ActionType.SetFilterChannelGroup:
      const updatedChannelGroupFilter = {...state.filter, channelGroup: [...action.payload]}
      return { ...state, filter: {...updatedChannelGroupFilter}, ...filterOrdersAndSessions(state, updatedChannelGroupFilter) }
    case ActionType.SetFilterCampaignName:
      const updatedCampaignNameFilter = {...state.filter, campaign: [...action.payload]}
      return { ...state, filter: {...updatedCampaignNameFilter}, ...filterOrdersAndSessions(state, updatedCampaignNameFilter) }
    case ActionType.SetOrders:
      return { ...state, orders: action.payload, filteredOrders: action.payload }
    case ActionType.SetSessions:
      return { ...state, sessions: action.payload, filteredSessions: action.payload }
    default:
      return state
  }
}

// Context Provider component
export const DashboardProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  )
}

// Custom hook for accessing state and dispatch function
export const useDashboard = () => useContext(DashboardContext)