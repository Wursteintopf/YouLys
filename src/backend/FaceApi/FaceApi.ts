import '@tensorflow/tfjs-node'
import * as canvas from 'canvas'
import * as faceapi from '@vladmandic/face-api'
import * as path from 'path'

const { Canvas, Image, ImageData } = canvas
// @ts-ignore
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

const inputSize = 480
const scoreThreshold = 0.5
const faceDetectionNet = faceapi.nets.tinyFaceDetector

export class FaceApi {
  private static instance: FaceApi
  private faceDetectorOptions: faceapi.TinyFaceDetectorOptions

  private constructor () {
    this.faceDetectorOptions = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
  }

  public static get Instance () {
    return async (): Promise<FaceApi> => {
      if (!this.instance) {
        this.instance = new this()
        await faceDetectionNet.loadFromDisk(path.join(__dirname, 'weights'))
        await faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, 'weights'))
        await faceapi.nets.faceExpressionNet.loadFromDisk(path.join(__dirname, 'weights'))
        await faceapi.nets.ageGenderNet.loadFromDisk(path.join(__dirname, 'weights'))
      }
      return this.instance
    }
  }

  public getFaceDetectorOptions (net: faceapi.NeuralNetwork<any>): faceapi.TinyFaceDetectorOptions {
    return this.faceDetectorOptions
  }

  public detectFaces = async (url: string) => {
    const img = await canvas.loadImage(url)

    // @ts-ignore
    const results = await faceapi.detectAllFaces(img, this.getFaceDetectorOptions(faceDetectionNet))
      .withFaceLandmarks()
      .withFaceExpressions()
      .withAgeAndGender()

    console.log(faceapi.tf.engine().memory().numTensors)

    return results
  }
}
