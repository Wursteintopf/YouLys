const mainColors = {
  colorBlue: '#010348',
  colorOrange: '#FDBC4E',
  colorDarkGrey: '#444444',
  colorLightGrey: '#F1F1F1',
  colorWhite: '#FFFFFF',

  colorBlack: '#000000',

  blueShades: ['#1a1c5a', '#4d4f7f', '#8081a4', '#b3b3c8', '#e6e6ed']
}

const fontSizes = {
  fontSizeSmall: 12,
  fontSizeRegular: 16,
  fontSizeHeadings: 31,

  fontWeightRegular: 400,
  fontWeightBold: 600,
}

const spacings = {
  spacingS: 10,
  spacingM: 20,
  spacingL: 40,
  spacingXL: 80,

  headerHeight: 70,
  heroTeaserHeight: 500,
  pageWidth: 1200,
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
