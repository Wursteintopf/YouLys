import React from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import HeroTeaser from './HeroTeaser/HeroTeaser'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/ContentBox/ContentBox'

const Start: React.FC = () => {
  return (
    <>
      <HeroTeaser />

      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Aktuelle Trends'>
            Lorem Ipsum
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>
  )
}

export default Start
