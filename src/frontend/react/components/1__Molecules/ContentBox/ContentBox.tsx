import Card from '@mui/material/Card'
import React from 'react'
import { Headline, SubLine } from '../../0__Atoms/Headline/Headline'
import { CardContent } from '@mui/material'
import themeVariables from '../../../../styles/themeVariables'
import { ContentBoxStyled } from './ContentBoxStyling'

interface ContentBoxProps {
  title: string
  subtitle?: string
}

const ContentBox: React.FC<ContentBoxProps> = props => {
  return (
    <ContentBoxStyled>
      <Headline>{props.title}</Headline>
      {props.subtitle ? <SubLine>{props.subtitle}</SubLine> : ''}
      <Card style={{ marginTop: themeVariables.spacingS, color: themeVariables.colorDarkGrey, overflow: 'visible' }}>
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </ContentBoxStyled>
  )
}

export default ContentBox
