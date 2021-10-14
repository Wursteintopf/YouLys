import React from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import { FooterContainer, FooterMenuItem, FooterStyled } from './FooterStyling'
import { useHistory } from 'react-router'

const Footer: React.FC = () => {
  const history = useHistory()

  return (
    <FooterStyled>
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
    </FooterStyled>
  )
}

export default Footer
