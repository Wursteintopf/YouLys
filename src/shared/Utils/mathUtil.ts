export const median = (values: number[]) => {
  if (values.length === 0) throw new Error('No inputs')

  const sorted = values.slice().sort((a, b) => a - b)

  const middle = Math.floor(sorted.length / 2)

  if (sorted.length % 2 === 0) {
    return (sorted[middle - 1] + sorted[middle]) / 2
  }

  return sorted[middle]
}

export const percentageLikes = (likes: number, dislikes: number) => {
  return likes / ((likes + dislikes) / 100)
}
