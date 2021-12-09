import React, { useEffect } from 'react'
import { ContentContainer } from '../../../styles/GlobalStyling'
import { ContentBoxWrapper } from '../../components/ContentBox/ContentBoxWrapper'
import SubHeader from '../../components/SubHeader/SubHeader'
import { Headline } from '../../components/Headline/Headline'
import ContentBox from '../../components/ContentBox/ContentBox'
import { useDispatch, useSelector } from 'react-redux'
import { setFetching } from '../../../store/ui/ui.actions'
import { fetchSuccess } from '../../../store/success/success.actions'
import {
  getFaceMaxAmount,
  getFaceMaxSuccess,
  getFaceSuccess,
  getSuccess,
} from '../../../store/success/success.selector'
import FacesOnThumbnails from '../../components/FacesOnThumbnails/FacesOnThumbnails'

const Erfolgsfaktoren: React.FC = () => {
  const dispatch = useDispatch()
  const success = useSelector(getSuccess)
  const maxAmountFaces = useSelector(getFaceMaxAmount)
  const maxSuccessFaces = useSelector(getFaceMaxSuccess)

  useEffect(() => {
    dispatch(setFetching(true))
    dispatch(fetchSuccess())
  }, [])

  return (
    <>
      <SubHeader>
        <Headline>
          Aktuelle Trends
        </Headline>
      </SubHeader>

      <ContentContainer>
        <FacesOnThumbnails success={success} maxAmountFaces={maxAmountFaces} maxSuccessFaces={maxSuccessFaces} />

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
