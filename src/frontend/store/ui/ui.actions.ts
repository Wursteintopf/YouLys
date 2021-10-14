import actionCreatorFactory from 'typescript-fsa'
import { TimeRange } from '../../../shared/Enums/TimeRange'

const actionCreator = actionCreatorFactory()

export const setRange = actionCreator<TimeRange>('UI_SET_RANGE')
export const setFrom = actionCreator<Date>('UI_SET_FROM')
export const setTo = actionCreator<Date>('UI_SET_TO')
