import * as tf from '@tensorflow/tfjs-node'
import { Tensor3D } from '@tensorflow/tfjs-node'
import axios from 'axios'
import path from 'path'
import probe from 'probe-image-size'

interface Prediction {
  x: number
  y: number
  width: number
  height: number
  confidence: number
  type: 'arrow' | 'circle' | 'emoji'
}

interface ImageWithDimensions {
  image: Tensor3D
  width: number
  height: number
}

export const detectObjects = async (url: string): Promise<Prediction[]> => {
  tf.engine().startScope()
  const handler = tf.io.fileSystem(path.join(__dirname, 'model/model.json'))
  const model = await tf.loadGraphModel(handler)

  const TARGET_CLASSES = { 0: 'arrow', 1: 'circle', 2: 'emoji' }
  const ANCHORS = [0.573, 0.677, 1.87, 2.06, 3.34, 5.47, 7.88, 3.53, 9.77, 9.17]

  const _logistic = (x) => {
    if (x > 0) {
      return (1 / (1 + Math.exp(-x)))
    } else {
      const e = Math.exp(x)
      return e / (1 + e)
    }
  }

  const loadImage = async (url: string): Promise<ImageWithDimensions> => {
    const input_size = model.inputs[0].shape ? model.inputs[0].shape[1] : 256
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    // @ts-ignore
    const buffer = Buffer.from(response.data, 'utf-8')
    const data = probe.sync(buffer)
    let image = tf.node.decodeImage(buffer, 3) as Tensor3D
    // @ts-ignore
    image = tf.image.resizeBilinear(image.expandDims().toFloat(), [input_size, input_size])
    image = image.reverse(-1)
    return { image: image, width: data.width, height: data.height }
  }

  const postProcess = async (arrays, imageWidth: number, imageHeight: number): Promise<Prediction[]> => {
    const num_anchor = ANCHORS.length / 2
    const channels = arrays[0][0][0].length
    const height = arrays[0].length
    const width = arrays[0][0].length

    const num_class = channels / num_anchor - 5

    const boxes: number[][] = []
    const scores: number[] = []
    const classes: number[] = []

    for (let grid_y = 0; grid_y < height; grid_y++) {
      for (let grid_x = 0; grid_x < width; grid_x++) {
        let offset = 0

        for (let i = 0; i < num_anchor; i++) {
          const x = (_logistic(arrays[0][grid_y][grid_x][offset++]) + grid_x) / width
          const y = (_logistic(arrays[0][grid_y][grid_x][offset++]) + grid_y) / height
          const w = Math.exp(arrays[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2] / width
          const h = Math.exp(arrays[0][grid_y][grid_x][offset++]) * ANCHORS[i * 2 + 1] / height

          const objectness = tf.scalar(_logistic(arrays[0][grid_y][grid_x][offset++]))
          let class_probabilities = tf.tensor1d(arrays[0][grid_y][grid_x].slice(offset, offset + num_class)).softmax()
          offset += num_class

          class_probabilities = class_probabilities.mul(objectness)
          const max_index = class_probabilities.argMax()
          boxes.push([x - w / 2, y - h / 2, x + w / 2, y + h / 2])
          scores.push(class_probabilities.max().dataSync()[0])
          classes.push(max_index.dataSync()[0])
        }
      }
    }

    const boxTensor = tf.tensor2d(boxes)
    const scoreTensor = tf.tensor1d(scores)
    const classTensor = tf.tensor1d(classes)

    const selected_indices = await tf.image.nonMaxSuppressionAsync(boxTensor, scoreTensor, 10)
    const results = [await boxTensor.gather(selected_indices).array(), await scoreTensor.gather(selected_indices).array(), await classTensor.gather(selected_indices).array()]

    const predictions: Prediction[] = []

    for (let i = 0; i < results[2].length; i++) {
      const box = results[0][i]
      const score = results[1][i] as number
      const type = results[2][i] as number

      if (score > 0.2) {
        const x = box[0] * imageWidth
        const y = box[1] * imageHeight
        predictions.push({
          x: x,
          y: y,
          width: (box[2] * imageWidth) - x,
          height: (box[3] * imageHeight) - y,
          confidence: score,
          type: TARGET_CLASSES[type],
        })
      }
    }

    return predictions
  }

  const predict = async (image: ImageWithDimensions) => {
    const outputs = await model.execute(image.image)
    const arrays = !Array.isArray(outputs) ? await outputs.array() : await Promise.all(outputs.map(t => t.array()))
    return await postProcess(arrays, image.width, image.height)
  }

  let image
  try {
    image = await loadImage(url)
  } catch (e) {
    console.log(e)
    return []
  }

  const prediction = await predict(image)
  tf.engine().endScope()
  return prediction
}
