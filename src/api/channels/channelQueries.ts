import {Channel} from './channelInterfaces'
import {connection} from '../utils/dataBaseutils'

export const getChannelList = (): Promise<Channel[]> => {
  return new Promise<Channel[]>((resolve, reject) => {
    connection.query('SELECT * FROM channels', (err, rows) => {
      if (err) reject(err)

      resolve(rows)
    })
  })
}

export const updateChannel = (id: string, channelName: string, subCount: number): Promise<boolean> => {
  return new Promise<boolean>((resolve, reject) => {
    connection.query('UPDATE channels SET channel_name = ?, sub_count = ? WHERE id = ?', [channelName, subCount, id], err => {
      if (err) reject(err)

      resolve(true)
    })
  })
}