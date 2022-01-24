import styled from '@emotion/styled'
import { css } from '@emotion/react'
import themeVariables from './themeVariables'

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    max-height: min-content;
    overflow: hidden;
  }

  .hamburger-menu-open {
    #root {
      height: 100vh;
      overflow: hidden;
    }
  }

  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    height: 100%;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: ${themeVariables.fontSizeRegular};
    background-color: ${themeVariables.colorLightGrey};
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
      outline: 0;
    }
  }
`

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const ContentContainer = styled.div<{ fullWidth?: boolean }>`
  margin: 0 auto;
  width: ${themeVariables.pageWidth}px;
  
  ${themeVariables.breakXL} {
    width: ${props => props.fullWidth ? '100' : '92'}vw;
  }
`
