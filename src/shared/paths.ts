const hostname = window.location.hostname

let baseUrlBuilder = ''
if (hostname === 'youlys.de') {
  baseUrlBuilder = baseUrlBuilder + 'https://' + hostname + ':3012'
} else if (hostname === 'dev.youlys.de') {
  baseUrlBuilder = baseUrlBuilder + 'http://' + hostname + ':3011'
} else {
  baseUrlBuilder = baseUrlBuilder + 'http://' + hostname + ':3001'
}

export const baseUrl = baseUrlBuilder
export const imagePath = baseUrl + '/images'
