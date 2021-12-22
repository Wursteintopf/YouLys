export interface ClickbaitObjectInterface {
  clickbait_object_id: number
  video_thumbnail_id: number
  type: string
  confidence: number
  cx: number
  cy: number
  cwidth: number
  cheight: number
}

export const EMPTY_CLICKBAIT_OBJECT: ClickbaitObjectInterface = {
  clickbait_object_id: 0,
  video_thumbnail_id: 0,
  type: '',
  confidence: 0,
  cx: 0,
  cy: 0,
  cwidth: 0,
  cheight: 0,
}
