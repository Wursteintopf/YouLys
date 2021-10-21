import Card from '@mui/material/Card'
import React from 'react'
import { Headline } from '../Headline/Headline'
import { CardContent } from '@mui/material'
import themeVariables from '../../../styles/themeVariables'
import { ContentBoxStyled } from './ContentBoxStyling'

interface ContentBoxProps {
  title: string
}

const ContentBox: React.FC<ContentBoxProps> = props => {
  return (
    <ContentBoxStyled>
      <Headline>{props.title}</Headline>
      <Card style={{ marginTop: themeVariables.spacingS, color: themeVariables.colorDarkGrey, overflow: 'visible' }}>
        <CardContent>
          {props.children}
        </CardContent>
      </Card>
    </ContentBoxStyled>
  )
}

ContentBox.propTypes = {

}

export default ContentBox
