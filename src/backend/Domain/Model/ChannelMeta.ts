import { ChannelMetaInterface } from '../../../shared/Domain/Model/ChannelMetaInterface'
import { connection } from '../../Helper/DatabaseHelper'

export class ChannelMeta implements ChannelMetaInterface {
  channel_meta_id: number
  username = ''
  profile_picture = ''
  description = ''
  keywords = ''

  constructor (channel_meta_id: number) {
    this.channel_meta_id = channel_meta_id
  }

  /**
   * Basics
   */

  public static setUpChannelMetaTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS channel_meta(' +
      'channel_meta_id INT NOT NULL AUTO_INCREMENT,' +
      'username VARCHAR(255),' +
      'profile_picture varchar(255),' +
      'description VARCHAR(5000),' +
      'keywords VARCHAR(1024),' +
      'PRIMARY KEY (channel_meta_id),' +
      'INDEX (username)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  public setAll = (props): ChannelMeta => {
    this.description = props.description
    this.keywords = props.keywords
    this.profile_picture = props.profile_picture
    this.username = props.username

    return this
  }

  public save = async (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      connection.query(
        'INSERT INTO channel_meta(username, profile_picture, description, keywords) VALUES (?, ?, ?, ?)',
        [this.username, this.profile_picture, this.description, this.keywords],

        (err, rows) => {
          if (err) reject(err)
          if (!rows.insertId) reject(new Error("Unexpected Error. This shouldn't happen."))
          resolve(rows.insertId)
        },
      )
    })
  }

  public equals = (other: ChannelMetaInterface): boolean => {
    if (
      this.username === other.username &&
      this.profile_picture === other.profile_picture &&
      this.description === other.description &&
      this.keywords === other.keywords
    ) return true
    else return false
  }
}
