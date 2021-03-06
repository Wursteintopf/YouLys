import mysql from 'mysql'
import config from '../Config'

function initializeConnection () {
  function addDisconnectHandler (connection) {
    connection.on('error', (error) => {
      if (error.code === 'PROTOCOL_CONNECTION_LOST') {
        console.error(error.stack)
        console.log('Lost connection. Reconnecting...')

        initializeConnection()
      } else if (error.fatal) {
        throw error
      }
    })
  }

  const connection = mysql.createPool(config.databaseConfig)
  addDisconnectHandler(connection)

  return connection
}

export let connection = initializeConnection()

export const reInitConnection = () => {
  connection = initializeConnection()
}
