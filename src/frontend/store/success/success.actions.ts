import actionCreatorFactory from 'typescript-fsa'
import { SuccessResultsInterface } from '../../../shared/Domain/Model/ChannelSuccessResultsInterface'

const actionCreator = actionCreatorFactory()

export const fetchSuccess = actionCreator<void>('SUCCESS_FETCH')
export const setSuccess = actionCreator<SuccessResultsInterface>('SUCCESS_SET')
