import actionCreatorFactory from 'typescript-fsa'
import { ChannelInterface } from '../../../shared/Domain/Model/ChannelInterface'
import { VideoInterface } from '../../../shared/Domain/Model/VideoInterface'
import { WordWeight } from './channel.interfaces'

const actionCreator = actionCreatorFactory()

export const fetchChannels = actionCreator<void>('CHANNELS_FETCH_CHANNELS')
export const setChannels = actionCreator<ChannelInterface[]>('CHANNELS_SET_CHANNELS')
export const fetchVideos = actionCreator<void>('CHANNELS_FETCH_VIDEOS')
export const setVideos = actionCreator<ChannelInterface[]>('CHANNELS_SET_VIDEOS')

export const setCurrentChannel = actionCreator<string>('CHANNELS_SET_CURRENT_CHANNEL')
export const fetchCurrentChannel = actionCreator<string>('CHANNELS_FETCH_CURRENT_CHANNEL')
export const setCurrentChannelResult = actionCreator<ChannelInterface>('CHANNELS_SET_CURRENT_CHANNEL_RESULT')

export const setCurrentVideo = actionCreator<string>('CHANNELS_SET_CURRENT_VIDEO')
export const fetchCurrentVideo = actionCreator<{ channelId: string, videoId: string }>('CHANNELS_FETCH_CURRENT_VIDEO')
export const setCurrentVideoResult = actionCreator<VideoInterface>('CHANNELS_SET_CURRENT_VIDEO_RESULT')

export const calculateCurrentWordWeights = actionCreator<void>('CHANNELS_CALCULATE_WORD_WEIGHTS')
export const setCurrentWordWeights = actionCreator<WordWeight[]>('CHANNEL_SET_WORD_WEIGHTS')
