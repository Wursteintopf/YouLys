import { FaceInterface } from '../../../shared/Domain/Model/FaceInterface'
import { connection } from '../../Helper/DatabaseHelper'

export class Face implements FaceInterface {
  face_id: number
  video_thumbnail_id: number
  gender: 'female' | 'male'
  gender_probability: number
  age: number
  expression: string
  x: number
  y: number
  width: number
  height: number

  constructor (props: FaceInterface) {
    this.face_id = props.face_id
    this.video_thumbnail_id = props.video_thumbnail_id
    this.gender = props.gender
    this.gender_probability = props.gender_probability
    this.age = props.age
    this.expression = props.expression
    this.x = props.x
    this.y = props.y
    this.width = props.width
    this.height = props.height
  }

  public static setUpFaceTable = () => {
    connection.query(
      'CREATE TABLE IF NOT EXISTS face(' +
      'face_id INT NOT NULL AUTO_INCREMENT,' +
      'video_thumbnail_id INT,' +
      'gender VARCHAR(6),' +
      'gender_probability FLOAT,' +
      'age FLOAT,' +
      'expression VARCHAR(20),' +
      'x FLOAT,' +
      'y FLOAT,' +
      'width FLOAT,' +
      'height FLOAT,' +
      'PRIMARY KEY (face_id),' +
      'FOREIGN KEY (video_thumbnail_id) REFERENCES video_thumbnail(video_thumbnail_id)' +
      ') DEFAULT CHARSET=utf8mb4 COLLATE utf8mb4_unicode_ci',

      err => {
        if (err) console.log(err)
      },
    )
  }

  public create = async (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
      connection.query(
        'INSERT INTO face(video_thumbnail_id, gender, gender_probability, age, expression, x, y, width, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [this.video_thumbnail_id, this.gender, this.gender_probability, this.age, this.expression, this.x, this.y, this.width, this.height],

        (err, rows) => {
          if (err) reject(err)
          if (!rows.insertId) reject(new Error("Unexpected Error. This shouldn't happen."))
          resolve(rows.insertId)
        },
      )
    })
  }
}
