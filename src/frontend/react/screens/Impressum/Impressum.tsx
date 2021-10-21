import React from 'react'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/ContentBox/ContentBox'
import { ContentContainer } from '../../../styles/GlobalStyling'

const Impressum: React.FC = () => {
  return (
    <ContentContainer>
      <ContentBoxWrapper amountOfChildren={1}>
        <ContentBox title='Impressum'>
          Lorem Ipsum
        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default Impressum
