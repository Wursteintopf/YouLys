import React from 'react'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { ContentContainer } from '../../../styles/GlobalStyling'

const Erklärung: React.FC = () => {
  return (
    <ContentContainer>
      <ContentBoxWrapper amountOfChildren={1}>
        <ContentBox title='Erklärung'>
          Lorem Ipsum
        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default Erklärung
