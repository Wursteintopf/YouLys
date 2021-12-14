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

  const connection = mysql.createConnection(config.databaseConfig)
  addDisconnectHandler(connection)

  connection.connect((err) => {
    if (err) {
      console.log('Error when connection to Database: ' + err)
      setTimeout(initializeConnection, 2000)
    }
  })

  return connection
}

export const connection = initializeConnection()
