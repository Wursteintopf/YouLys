const numberFormatter = (num?: number, digits?: number) => {
  if (num === 0 || !num) return 0
  const lookup = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: ' Tsd.' },
    { value: 1e6, symbol: ' Mio.' },
    { value: 1e9, symbol: ' Mrd.' },
    { value: 1e12, symbol: ' Bio.' },
    { value: 1e15, symbol: ' Brd.' },
    { value: 1e18, symbol: ' Trio.' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  const item = lookup.slice().reverse().find(function (item) {
    return num >= item.value
  })
  return item ? (num / item.value).toFixed(digits).replace('.', ',').replace(rx, '$1') + item.symbol : '0'
}

export default numberFormatter
