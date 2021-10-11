const mainColors = {
  colorBlue: '#010348',
  colorOrange: '#FDBC4E',
  colorDarkGrey: '#444444',
  colorLightGrey: '#F1F1F1',
  colorWhite: '#e29578',
}

const fontSizes = {
  fontSizeRegular: 16,
  fontSizeHeadings: 31,
}

const spacings = {
  spacingS: 5,
  spacingM: 20,
  spacingL: 40,
  spacingXL: 80,

  headerHeight: 70,
}

const breakPoints = {
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
