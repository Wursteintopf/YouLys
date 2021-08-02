import {setUpChannelStatisticsTable, setUpChannelTable} from '../Database/ChannelQueries'
import {setUpVideoStatisticTable, setUpVideoTable} from '../Database/VideoQueries'

async function setUpTables () {
  await setUpChannelTable()
  await setUpVideoTable()
  await setUpChannelStatisticsTable()
  await setUpVideoStatisticTable()
}

export const setUpProject = async () => {
  setUpTables().then(() => console.log('Configured Database Tables'))
}
