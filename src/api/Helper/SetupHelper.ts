import {setUpChannelStatisticsTable, setUpChannelTable} from '../Database/ChannelQueries'

const setUpTables = () => {
  setUpChannelTable()
    .then(() => setUpChannelStatisticsTable())
}

export const setUpProject = () => {
  setUpTables()
}