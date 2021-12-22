import { ClickbaitObjectInterface } from '../../../shared/Domain/Model/ClickbaitObjectInterface'
import { connection } from '../../Helper/DatabaseHelper'

export class ClickbaitObject implements ClickbaitObjectInterface {
  clickbait_object_id: number
  video_thumbnail_id = 0
  type = ''
  confidence = 0
  cx = 0
  cy = 0
  cwidth = 0
  cheight = 0

  constructor (clickbait_object_id: number) {
    this.clickbait_object_id = clickbait_object_id
  }

  /**
   * Basics
   */

  public static setUpClickbaitObjectTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS clickbait_object(' +
      'clickbait_object_id INT NOT NULL AUTO_INCREMENT,' +
      'video_thumbnail_id INT,' +
      'type VARCHAR(6),' +
      'confidence FLOAT,' +
      'cx FLOAT,' +
      'cy FLOAT,' +
      'cwidth FLOAT,' +
      'cheight FLOAT,' +
      'PRIMARY KEY (clickbait_object_id),' +
      'FOREIGN KEY (video_thumbnail_id) REFERENCES video_thumbnail(video_thumbnail_id)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  public setAll = (props): ClickbaitObject => {
    this.video_thumbnail_id = props.video_thumbnail_id
    this.type = props.type
    this.confidence = props.confidence
    this.cx = props.cx
    this.cy = props.cy
    this.cwidth = props.cwidth
    this.cheight = props.cheight

    return this
  }

  public create = async (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      connection.query(
        'INSERT INTO clickbait_object(video_thumbnail_id, type, confidence, cx, cy, cwidth, cheight) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [this.video_thumbnail_id, this.type, this.confidence, this.cx, this.cy, this.cwidth, this.cheight],

        (err, rows) => {
          if (err) reject(err)
          if (!rows.insertId) reject(new Error("Unexpected Error. This shouldn't happen."))
          resolve(rows.insertId)
        },
      )
    })
  }
}
