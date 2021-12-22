import React from 'react'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'
import { ContentContainer } from '../../../styles/GlobalStyling'

const Datenschutz: React.FC = () => {
  return (
    <ContentContainer>
      <ContentBoxWrapper amountOfChildren={1}>
        <ContentBox title='Datenschutz'>
          Lorem Ipsum
        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default Datenschutz
