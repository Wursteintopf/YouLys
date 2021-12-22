import actionCreatorFactory from 'typescript-fsa'
import { TimeRange } from '../../../shared/Enums/TimeRange'
import { ApiStatusCodes } from '../../../shared/Enums/ApiStatusCodes'

const actionCreator = actionCreatorFactory()

export const setRange = actionCreator<TimeRange>('UI_SET_RANGE')
export const setFrom = actionCreator<Date>('UI_SET_FROM')
export const setTo = actionCreator<Date>('UI_SET_TO')
export const setFetching = actionCreator<boolean>('UI_SET_FETCHING')
export const setFetchingChannelStats = actionCreator<boolean>('UI_SET_FETCHING_CHANNEL_STATS')
export const setChannelsFetched = actionCreator<void>('UI_SET_CHANNELS_FETCHED')
export const setVideosFetched = actionCreator<void>('UI_SET_VIDEOS_FETCHED')
export const addChannelStatsFetched = actionCreator<string>('UI_ADD_CHANNEL_STATS_FETCHED')
export const addVideoStatsFetched = actionCreator<string>('UI_ADD_VIDEO_STATS_FETCHED')
export const setError = actionCreator<ApiStatusCodes>('UI_SET_ERROR')
export const resetError = actionCreator<void>('UI_RESET_ERROR')
