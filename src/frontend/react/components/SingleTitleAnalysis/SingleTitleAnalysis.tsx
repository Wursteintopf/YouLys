import React from 'react'
import { Bold } from '../Headline/Headline'
import ContentBox from '../ContentBox/ContentBox'
import Yes from '../Icons/Yes'
import No from '../Icons/No'
import { TitleChecklist, TitleChecklistItem } from './SingleTitleAnalysisStyling'
import { checkStringForEmoji, checkStringForPunctuation, checkStringForUppercase } from '../../../../shared/Utils/checkStrings'

interface TitleAnalysisProps {
  title: string
}

const SingleTitleAnalysis: React.FC<TitleAnalysisProps> = ({ title }) => {
  const containsUppercase = checkStringForUppercase(title)
  const containsPunctuation = checkStringForPunctuation(title)
  const containsEmoji = checkStringForEmoji(title)

  return (
    <ContentBox title='Titelanalyse'>
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
    </ContentBox>
  )
}

export default SingleTitleAnalysis
