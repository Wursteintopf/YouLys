import React from 'react'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
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
