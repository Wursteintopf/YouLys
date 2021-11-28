import { VideoMetaInterface } from '../../../shared/Domain/Model/VideoMetaInterface'
import { connection } from '../../Helper/DatabaseHelper'

export class VideoMeta implements VideoMetaInterface {
  video_meta_id: number
  title = ''
  description = ''
  tags = ''

  constructor (video_meta_id: number) {
    this.video_meta_id = video_meta_id
  }

  /**
   * Basics
   */

  public static setUpVideoMetaTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video_meta(' +
      'video_meta_id INT NOT NULL AUTO_INCREMENT,' +
      'title VARCHAR(255),' +
      'description VARCHAR(5000),' +
      'tags VARCHAR(1024),' +
      'PRIMARY KEY (video_meta_id),' +
      'INDEX (title)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  public setAll = (props): VideoMeta => {
    this.title = props.title
    this.description = props.description
    this.tags = props.tags

    return this
  }

  public save = async (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      connection.query(
        'INSERT INTO video_meta(title, description, tags) VALUES (?, ?, ?)',
        [this.title, this.description, this.tags],

        (err, rows) => {
          if (err) reject(err)
          if (!rows.insertId) reject(new Error("Unexpected Error. This shouldn't happen."))
          resolve(rows.insertId)
        },
      )
    })
  }

  public equals = (other: VideoMetaInterface): boolean => {
    if (
      this.title === other.title &&
      this.description === other.description &&
      this.tags === other.tags
    ) return true
    else return false
  }
}
