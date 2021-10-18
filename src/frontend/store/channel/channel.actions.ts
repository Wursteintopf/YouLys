import actionCreatorFactory from 'typescript-fsa'
import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'

const actionCreator = actionCreatorFactory()

export const fetchChannels = actionCreator<void>('CHANNELS_FETCH_CHANNELS')
export const setChannels = actionCreator<ChannelInterface[]>('CHANNELS_SET_CHANNELS')
export const fetchCurrentChannel = actionCreator<string>('CHANNELS_FETCH_CURRENT_CHANNEL')
export const setCurrentChannel = actionCreator<ChannelInterface>('CHANNELS_SET_CURRENT_CHANNEL')
