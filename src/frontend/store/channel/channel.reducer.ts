import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { channelState } from './channel.interfaces'
import { setChannels, setCurrentChannel } from './channel.actions'
import { EMPTY_CHANNEL } from '../../../shared/Domain/Model/ChannelInterface'

const INITIAL_STATE: channelState = {
  channels: [],
  currentChannel: EMPTY_CHANNEL,
}

export const channelReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setChannels, (state, payload) => {
    return {
      ...state,
      channels: payload,
    }
  })
  .case(setCurrentChannel, (state, payload) => {
    return {
      ...state,
      currentChannel: payload,
    }
  })
