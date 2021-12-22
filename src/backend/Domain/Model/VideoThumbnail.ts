import { VideoThumbnailInterface } from '../../../shared/Domain/Model/VideoThumbnailInterface'
import { FaceApi } from '../../FaceApi/FaceApi'
import { Face } from './Face'
import { connection } from '../../Helper/DatabaseHelper'
import { ClickbaitObject } from './ClickbaitObject'
import { detectObjects } from '../../ObjectAnalysis/ObjectAnalysis'

export class VideoThumbnail implements VideoThumbnailInterface {
  video_thumbnail_id: number
  thumbnail = ''
  faces: Face[] = []
  clickbait_objects: ClickbaitObject[] = []

  constructor (video_thumbnail_id: number) {
    this.video_thumbnail_id = video_thumbnail_id
  }

  /**
   * Basics
   */

  public static setUpVideoThumbnailTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS video_thumbnail(' +
      'video_thumbnail_id INT NOT NULL AUTO_INCREMENT,' +
      'thumbnail VARCHAR(255),' +
      'PRIMARY KEY (video_thumbnail_id)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  public setAll = (props): VideoThumbnail => {
    this.thumbnail = props.thumbnail
    return this
  }

  public save = async (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      connection.query(
        'INSERT INTO video_thumbnail(thumbnail) VALUES (?)',
        [this.thumbnail],

        (err, rows) => {
          if (err) reject(err)
          if (!rows.insertId) reject(new Error("Unexpected Error. This shouldn't happen."))
          resolve(rows.insertId)
        },
      )
    })
  }

  public equals = (other: VideoThumbnailInterface): boolean => {
    if (this.thumbnail === other.thumbnail) return true
    else return false
  }

  /**
   * Load Data from Database
   */

  public loadFaces = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'SELECT * FROM face WHERE video_thumbnail_id = ?',
        [this.video_thumbnail_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            rows.forEach(row => {
              const face = new Face(row.face_id)
              face.setAll(row)
              this.faces = [...this.faces, face]
            })
            resolve(true)
          } else {
            resolve(false)
          }
        },
      )
    })
  }

  public loadClickbaitObjects = async (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      connection.query(
        'SELECT * FROM clickbait_object WHERE video_thumbnail_id = ? AND confidence > 0.3',
        [this.video_thumbnail_id],

        (err, rows) => {
          if (err) reject(err)
          if (rows && rows.length > 0) {
            rows.forEach(row => {
              const clickbaitObject = new ClickbaitObject(row.clickbait_object_id)
              clickbaitObject.setAll(row)
              this.clickbait_objects = [...this.clickbait_objects, clickbaitObject]
            })
            resolve(true)
          } else {
            resolve(false)
          }
        },
      )
    })
  }

  /**
   * Calculate stuff
   */

  public detectFaces = async () => {
    if (this.faces.length === 0) {
      const api = await FaceApi.Instance()
      const results = await api.detectFaces(this.thumbnail)
      results.forEach(result => {
        const face = new Face(0)
        face.video_thumbnail_id = this.video_thumbnail_id
        face.gender = result.gender
        face.gender_probability = result.genderProbability
        face.age = result.age
        face.expression = Object.keys(result.expressions).reduce((a, b) => result.expressions[a] > result.expressions[b] ? a : b)
        face.x = result.detection.box.x
        face.y = result.detection.box.y
        face.width = result.detection.box.width
        face.height = result.detection.box.height
        face.create()
      })
    }
    console.log('SUCCESS: Analysed thumbnail ' + this.thumbnail + ' for Faces')
  }

  public detectClickbaitObjects = async () => {
    if (this.clickbait_objects.length === 0) {
      const results = await detectObjects(this.thumbnail)
      results.forEach(result => {
        const clickbaitObject = new ClickbaitObject(0)
        clickbaitObject.video_thumbnail_id = this.video_thumbnail_id
        clickbaitObject.type = result.type
        clickbaitObject.confidence = result.confidence
        clickbaitObject.cx = result.x
        clickbaitObject.cy = result.y
        clickbaitObject.cwidth = result.width
        clickbaitObject.cheight = result.height
        clickbaitObject.create()
      })
    }
    console.log('SUCCESS: Analysed thumbnail ' + this.thumbnail + ' for Clickbait Objects')
  }
}
