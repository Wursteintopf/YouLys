import React from 'react'
import {
  HeroTeaserContent,
  HeroTeaserDescription,
  HeroTeaserStyled,
} from './HeroTeaserStyling'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import image from '../../../../images/camera.jpg'
import { Title } from '../../../components/Title/Title'
import Button from '../../../components/Button/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useHistory } from 'react-router'
import themeVariables from '../../../../styles/themeVariables'

const HeroTeaser: React.FC = () => {
  const history = useHistory()

  return (
    <HeroTeaserStyled>
      <ContentContainer>
        <HeroTeaserContent
          image={image}
        >
          <Title>Erfolgsfaktoren auf Youtube</Title>
          <HeroTeaserDescription>
            YouLys ist eine Plattform, die aktuelle Erfolgstrends in deutschen YouTube Kanälen analysiert und auswertet.
            Der Klassiker zum Beispiel, bringt es wirklich etwas, ein schockiertes Gesicht auf das Thumbnail zu machen?
          </HeroTeaserDescription>
          <Button
            endIcon={<ArrowForwardIcon />}
            onClick={() => history.push('/success')}
          >
            Erfolgsfaktoren ansehen
          </Button>
        </HeroTeaserContent>
      </ContentContainer>
    </HeroTeaserStyled>
  )
}

export default HeroTeaser
