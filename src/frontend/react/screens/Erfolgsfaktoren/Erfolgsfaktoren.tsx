import React from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import SubHeader from '../../components/SubHeader/SubHeader'
import { Headline } from '../../components/Headline/Headline'
import ContentBox from '../../components/ContentBox/ContentBox'

const Erfolgsfaktoren: React.FC = () => {
  return (
    <>
      <SubHeader>
        <Headline>
          Aktuelle Trends
        </Headline>
      </SubHeader>

      <ContentContainer>
        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Aktuell besonders erfolgreiche Kanäle'>
            Lorem Ipsum
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={2}>
          <ContentBox title='Aktuelle Themen'>
            Lorem Ipsum
          </ContentBox>

          <ContentBox title='Thumbnailfarben'>
            Lorem Ipsum
          </ContentBox>
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <ContentBox title='Erfolgsfaktoren'>
            Lorem Ipsum
          </ContentBox>
        </ContentBoxWrapper>
      </ContentContainer>
    </>

  )
}

export default Erfolgsfaktoren
