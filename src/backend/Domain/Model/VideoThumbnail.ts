import { VideoThumbnailInterface } from '../../../shared/Domain/Model/VideoThumbnailInterface'
import { detectFaces } from '../../FaceApi/FaceApi'
import { Face } from './Face'

export class VideoThumbnail implements VideoThumbnailInterface {
  video_thumbnail_id: number
  thumbnail: string
  faces: Face[]

  constructor (props: VideoThumbnailInterface) {
    this.video_thumbnail_id = props.video_thumbnail_id
    this.thumbnail = props.thumbnail

    if (props.faces) this.faces = props.faces.map(face => new Face(face))
    else this.faces = []
  }

  public equals = (other: VideoThumbnailInterface): boolean => {
    if (this.thumbnail === other.thumbnail) return true
    else return false
  }

  public detectFaces = async () => {
    if (this.faces.length === 0) {
      const results = await detectFaces(this.thumbnail)
      results.forEach(result => {
        const face = new Face({
          face_id: 0,
          video_thumbnail_id: this.video_thumbnail_id,
          gender: result.gender,
          gender_probability: result.genderProbability,
          age: result.age,
          expression: Object.keys(result.expressions).reduce((a, b) => result.expressions[a] > result.expressions[b] ? a : b),
          x: result.detection.box.x,
          y: result.detection.box.y,
          width: result.detection.box.width,
          height: result.detection.box.height,
        })
        face.create()
      })
    }
    console.log('SUCCESS: Analysed thumbnail ' + this.thumbnail + ' for Faces')
  }
}
