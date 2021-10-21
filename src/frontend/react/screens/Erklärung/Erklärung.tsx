import React from 'react'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/ContentBox/ContentBox'
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
