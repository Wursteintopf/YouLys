const hostname = window.location.hostname

let baseUrlBuilder = ''
if (hostname === 'youlys.de') {
  baseUrlBuilder = baseUrlBuilder + 'https://' + hostname + ':3011'
} else {
  baseUrlBuilder = baseUrlBuilder + 'http://' + hostname + ':3001'
}

export const baseUrl = baseUrlBuilder
export const imagePath = baseUrl + '/images'
