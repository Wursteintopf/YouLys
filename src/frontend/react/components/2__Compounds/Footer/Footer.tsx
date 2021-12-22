import React from 'react'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import { FooterContainer, FooterMenuItem, FooterStyled, FooterWrapper } from './FooterStyling'
import { useHistory } from 'react-router'

const Footer: React.FC = () => {
  const history = useHistory()

  return (
    <FooterStyled>
      <FooterWrapper>
        <ContentContainer>
          <FooterContainer>
            <FooterMenuItem
              onClick={() => history.push('/impressum')}
            >
              Impressum
            </FooterMenuItem>
            <FooterMenuItem
              onClick={() => history.push('/datenschutz')}
            >
              Datenschutz
            </FooterMenuItem>
            <FooterMenuItem
              onClick={() => history.push('/explanation')}
            >
              Erklärung
            </FooterMenuItem>
          </FooterContainer>
        </ContentContainer>
      </FooterWrapper>
    </FooterStyled>
  )
}

export default Footer
