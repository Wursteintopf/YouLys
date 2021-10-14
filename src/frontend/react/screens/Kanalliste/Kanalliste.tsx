import React from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import ContentBox from '../../components/ContentBox/ContentBox'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'

const Kanalliste: React.FC = () => {
  return (
    <ContentContainer>
      <ContentBoxWrapper amountOfChildren={1}>
        <ContentBox title='Kanäle'>
          Lorem Ipsum
        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default Kanalliste
