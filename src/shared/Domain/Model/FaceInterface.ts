export interface FaceInterface {
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
}

export const EMPTY_FACE: FaceInterface = {
  face_id: 0,
  video_thumbnail_id: 0,
  gender: 'female',
  gender_probability: 0,
  age: 0,
  expression: 'neutral',
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}
