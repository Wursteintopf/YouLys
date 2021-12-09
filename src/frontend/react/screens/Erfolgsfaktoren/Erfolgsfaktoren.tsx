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
  getSuccess, getTitleMaxAmount, getTitleMaxSuccess,
} from '../../../store/success/success.selector'
import FacesOnThumbnails from '../../components/FacesOnThumbnails/FacesOnThumbnails'
import TitleAnalysis from '../../components/TitleAnalysis/TitleAnalysis'

const Erfolgsfaktoren: React.FC = () => {
  const dispatch = useDispatch()
  const success = useSelector(getSuccess)
  const maxAmountFaces = useSelector(getFaceMaxAmount)
  const maxSuccessFaces = useSelector(getFaceMaxSuccess)
  const maxAmountTitles = useSelector(getTitleMaxAmount)
  const maxSuccessTitles = useSelector(getTitleMaxSuccess)

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
        <ContentBoxWrapper amountOfChildren={1}>
          <TitleAnalysis success={success} maxAmount={maxAmountTitles} maxSuccess={maxSuccessTitles} />
        </ContentBoxWrapper>

        <ContentBoxWrapper amountOfChildren={1}>
          <FacesOnThumbnails success={success} maxAmountFaces={maxAmountFaces} maxSuccessFaces={maxSuccessFaces} />
        </ContentBoxWrapper>
      </ContentContainer>
    </>

  )
}

export default Erfolgsfaktoren
