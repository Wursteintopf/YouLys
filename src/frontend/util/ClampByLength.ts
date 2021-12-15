const clampByLength = (string?: string, length?: number): string => {
  if (!string) return ''
  const lengthToClip = length || 30
  if (string.length < lengthToClip) return string
  else return string.substring(0, lengthToClip) + '...'
}

export default clampByLength
