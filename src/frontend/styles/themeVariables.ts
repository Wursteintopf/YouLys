const mainColors = {
  colorBlue: '#010348',
  colorLightBlue: '#cccdda',
  colorOrange: '#FDBC4E',
  colorDarkGrey: '#444444',
  colorGrey: '#E1DEDC',
  colorLightGrey: '#F1F1F1',
  colorWhite: '#FFFFFF',

  colorBlack: '#000000',

  greyOpague: 'rgba(225, 225, 225, 0.98)',

  blueShades: ['#013a63', '#1a4e73', '#346182', '#4d7592', '#6789a1', '#809db1', '#99b0c1', '#b3c4d0'],
  colorShades: ['#003f5c', '#2f4b7c', '#665191', '#a05195', '#d45087', '#f95d6a', '#ff7c43', '#ffa600'],
}

const fontSizes = {
  fontSizeSmall: 12,
  fontSizeRegular: 16,
  fontSizeHeadings: 31,

  fontWeightRegular: 400,
  fontWeightBold: 600,
}

const spacings = {
  spacingXS: 5,
  spacingS: 10,
  spacingM: 20,
  spacingL: 40,
  spacingXL: 80,

  headerHeight: 70,
  pageWidth: 1200,
}

const breakPoints = {
  breakXL: '@media screen and (max-width: 1200px)',
  breakDesktop: '@media screen and (max-width: 1000px)',
  breakTablet: '@media screen and (max-width: 800px)',
  breakMobile: '@media screen and (max-width: 600px)',
  breakVerySmall: '@media screen and (max-width: 400px)',
}

const themeVariables = {
  ...mainColors,
  ...fontSizes,
  ...spacings,
  ...breakPoints,
}

export default themeVariables
