import React from 'react'
import {
  HeroTeaserContent,
  HeroTeaserDescription,
  HeroTeaserStyled,
} from './HeroTeaserStyling'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import image from '../../../../images/camera.jpg'
import { Title } from '../../../components/0__Atoms/Title/Title'
import Button from '../../../components/0__Atoms/Button/Button'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useHistory } from 'react-router'

const HeroTeaser: React.FC = () => {
  const history = useHistory()

  return (
    <HeroTeaserStyled>
      <ContentContainer fullWidth>
        <HeroTeaserContent
          image={image}
        >
          <Title>Erfolgsfaktoren auf Youtube</Title>
          <HeroTeaserDescription>
            YouLys ist eine Plattform, die aktuelle Erfolgstrends in deutschen YouTube Kanälen analysiert und auswertet.
            Der Klassiker zum Beispiel, bringt es wirklich etwas, ein erstauntes Gesicht auf das Thumbnail zu machen?
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
