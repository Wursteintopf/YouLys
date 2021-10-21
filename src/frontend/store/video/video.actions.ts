import actionCreatorFactory from 'typescript-fsa'
import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'
import { VideoInterface } from '../../../shared/Domain/Model/VideoInterface'

const actionCreator = actionCreatorFactory()

export const fetchCurrentVideo = actionCreator<string>('VIDEOS_FETCH_CURRENT_CHANNEL')
export const setCurrentVideo = actionCreator<VideoInterface>('VIDEOS_SET_CURRENT_CHANNEL')
