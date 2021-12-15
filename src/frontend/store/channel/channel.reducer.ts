import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { channelState } from './channel.interfaces'
import {
  setChannels,
  setCurrentChannel,
  setCurrentChannelResult,
  setCurrentVideo,
  setCurrentVideoResult,
  setVideos,
} from './channel.actions'

const INITIAL_STATE: channelState = {
  channels: {},
  currentChannel: '',
  currentVideo: '',
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
