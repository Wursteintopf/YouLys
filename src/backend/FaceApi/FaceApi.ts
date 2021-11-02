import '@tensorflow/tfjs-node'
import * as canvas from 'canvas'
import * as faceapi from '@vladmandic/face-api'
import * as path from 'path'

const { Canvas, Image, ImageData } = canvas
// @ts-ignore
faceapi.env.monkeyPatch({ Canvas, Image, ImageData })

export const faceDetectionNet = faceapi.nets.tinyFaceDetector

const inputSize = 480
const scoreThreshold = 0.5

function getFaceDetectorOptions (net: faceapi.NeuralNetwork<any>) {
  return new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}

export const detectFaces = async (url: string) => {
  faceapi.tf.engine().startScope()
  await faceDetectionNet.loadFromDisk(path.join(__dirname, 'weights'))
  await faceapi.nets.faceLandmark68Net.loadFromDisk(path.join(__dirname, 'weights'))
  await faceapi.nets.faceExpressionNet.loadFromDisk(path.join(__dirname, 'weights'))
  await faceapi.nets.ageGenderNet.loadFromDisk(path.join(__dirname, 'weights'))

  const img = await canvas.loadImage(url)

  // @ts-ignore
  const results = await faceapi.detectAllFaces(img, getFaceDetectorOptions(faceDetectionNet))
    .withFaceLandmarks()
    .withFaceExpressions()
    .withAgeAndGender()

  faceapi.tf.engine().endScope()
  return results
}
