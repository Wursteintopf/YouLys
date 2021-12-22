import React from 'react'
import { Bold } from '../../0__Atoms/Headline/Headline'
import ContentBox from '../ContentBox/ContentBox'
import Yes from '../../0__Atoms/Icons/Yes'
import No from '../../0__Atoms/Icons/No'
import { TitleChecklist, TitleChecklistItem } from './SingleTitleAnalysisStyling'
import { checkStringForEmoji, checkStringForPunctuation, checkStringForUppercase } from '../../../../../shared/Utils/checkStrings'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'

interface TitleAnalysisProps {
  title: string
}

const SingleTitleAnalysis: React.FC<TitleAnalysisProps> = ({ title }) => {
  const containsUppercase = checkStringForUppercase(title)
  const containsPunctuation = checkStringForPunctuation(title)
  const containsEmoji = checkStringForEmoji(title)

  const fetching = useSelector(getFetching)

  const Content = (
    <>
      <Bold>{title}</Bold>
      <TitleChecklist>
        <TitleChecklistItem>
          {containsUppercase ? <><Yes /> Beinhaltet Wörter in Capslock</> : <><No /> Beinhaltet keine Wörter in Capslock</>}
        </TitleChecklistItem>

        <TitleChecklistItem>
          {containsPunctuation ? <><Yes /> Beinhaltet 3 oder mehr Satzzeichen in Folge</> : <><No /> Beinhaltet nicht 3 oder mehr Satzzeichen in Folge</>}
        </TitleChecklistItem>

        <TitleChecklistItem>
          {containsEmoji ? <><Yes /> Beinhaltet Emoji</> : <><No /> Beinhaltet keinen Emoji</>}
        </TitleChecklistItem>
      </TitleChecklist>
    </>
  )

  if (fetching) return <Progress />

  return (
    <ContentBox title='Titelanalyse'>
      {fetching ? <Progress /> : Content}
    </ContentBox>
  )
}

export default SingleTitleAnalysis
