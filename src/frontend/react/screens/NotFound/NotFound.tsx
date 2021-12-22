import React from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import { ContentBoxWrapper } from '../../components/1__Molecules/ContentBox/ContentBoxWrapper'
import ContentBox from '../../components/1__Molecules/ContentBox/ContentBox'

const NotFound: React.FC = () => {
  return (
    <ContentContainer>
      <ContentBoxWrapper amountOfChildren={1}>
        <ContentBox title='Nicht gefunden'>
          Es tut uns Leid, hier scheint irgendetwas schief gelaufen zu sein, aber was du suchst, konnte nicht gefunden werden.
        </ContentBox>
      </ContentBoxWrapper>
    </ContentContainer>
  )
}

export default NotFound
