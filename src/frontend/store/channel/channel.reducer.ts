import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { channelState } from './channel.interfaces'
import {
  calculateCurrentWordWeights,
  setChannels,
  setCurrentChannel,
  setCurrentChannelResult,
  setCurrentVideo,
  setCurrentVideoResult, setCurrentWordWeights,
  setVideos,
} from './channel.actions'
import { calculateWordWeights } from '../../util/CalculateWordWeights'

const INITIAL_STATE: channelState = {
  channels: {},
  currentChannel: '',
  currentVideo: '',
  wordWeights: [],
}

export const channelReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setChannels, (state, payload) => {
    const newState = { ...state }
    payload.forEach(c => {
      if (!newState.channels[c.channel_id]) newState.channels[c.channel_id] = c
    })
    return newState
  })
  .case(setVideos, (state, payload) => {
    const newState = { ...state }
    payload.forEach(c => {
      newState.channels[c.channel_id] = c
    })
    return newState
  })
  .case(setCurrentChannel, (state, payload) => {
    return {
      ...state,
      currentChannel: payload,
    }
  })
  .case(setCurrentChannelResult, (state, payload) => {
    const newState = { ...state }
    newState.channels[payload.channel_id] = payload
    if (state.channels[payload.channel_id]) {
      newState.channels[payload.channel_id].videos = { ...state.channels[payload.channel_id].videos, ...payload.videos }
    }
    newState.currentChannel = payload.channel_id
    return newState
  })
  .case(setCurrentVideo, (state, payload) => {
    return {
      ...state,
      currentVideo: payload,
    }
  })
  .case(setCurrentVideoResult, (state, payload) => {
    const newState = { ...state }
    newState.channels[payload.channel_id].videos[payload.video_id] = payload
    newState.currentVideo = payload.video_id
    newState.currentChannel = payload.channel_id
    return newState
  })
  .case(setCurrentWordWeights, (state, payload) => {
    return {
      ...state,
      wordWeights: payload,
    }
  })
