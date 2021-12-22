import React, { useEffect, useMemo, useState } from 'react'
import { FilterGroup, ScatterPlotLegend, ScatterplotWrapper } from './VideoScatterplotStyling'
import { VideoInterface } from '../../../../../shared/Domain/Model/VideoInterface'
import { max, min } from 'd3-array'
import { useSelector } from 'react-redux'
import { getFetching } from '../../../../store/ui/ui.selector'
import Progress from '../../0__Atoms/Progress/Progress'
import Slider from '@material-ui/core/Slider'
import { StyledSelect } from '../../1__Molecules/TimePicker/TimePickerStyling'
import { Checkbox, FormControlLabel, FormGroup, MenuItem } from '@mui/material'
import { Bold } from '../../0__Atoms/Headline/Headline'
import Scatterplot from '../../1__Molecules/Scatterplot/Scatterplot'

interface ScatterplotProps {
  videos: VideoInterface[]
  filters: string[]
}

const LABELS = {
  amount: 'Anzahl der Gesichter',
  expression: 'Emotion',
  sex: 'Geschlecht',
  size: 'Größe des Gesichts',
  uppercase: 'Capslock im Titel',
  punctuation: 'Übermäßige Satzzeichen',
  emoji: 'Emoji im Titel',
  arrow: 'Pfeil auf Thumbnail',
  circle: 'Kreis auf Thumbnail',
  emojiThumb: 'Emoji auf Thumbnail',
  object: 'Nach Objekt filtern',
}

const ScatterplotWithFilters: React.FC<ScatterplotProps> = ({ videos, filters }) => {
  const fetching = useSelector(getFetching)

  const minValue = min(videos.map(v => v.statistics[0].success_factor))
  const maxValue = max(videos.map(v => v.statistics[0].success_factor))
  const [zoom, setZoom] = useState<[number, number]>([0.1, 0])
  const [scale, setScale] = useState('pow')
  const [filterGroup, setFilterGroup] = useState(filters[0])

  const [highlights, setHighlights] = useState<string[]>([])

  useEffect(() => {
    if (minValue || maxValue) setZoom([minValue, maxValue])
  }, [videos])

  const handleZoomChange = (event, newValue) => {
    setZoom(newValue)
  }

  const toggleHighlight = (el: string) => {
    if (highlights.includes(el)) setHighlights(highlights.filter(e => e !== el))
    else setHighlights([...highlights, el])
  }

  const amountFilter = (
    <FilterGroup>
      <Bold>Nach Gesichtsanzahl filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('none')} onChange={() => toggleHighlight('none')} />} label='Keine Gesichter' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('one')} onChange={() => toggleHighlight('one')} />} label='1 Gesicht' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('two')} onChange={() => toggleHighlight('two')} />} label='2 Gesichter' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('more')} onChange={() => toggleHighlight('more')} />} label='Mehr Gesichter' />
      </FormGroup>
    </FilterGroup>
  )

  const emotionFilter = (
    <FilterGroup>
      <Bold>Nach Emotion filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('angry')} onChange={() => toggleHighlight('angry')} />} label='Wütend' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('fearful')} onChange={() => toggleHighlight('fearful')} />} label='Ängstlich' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('sad')} onChange={() => toggleHighlight('sad')} />} label='Traurig' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('surprised')} onChange={() => toggleHighlight('surprised')} />} label='Erstaunt' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('happy')} onChange={() => toggleHighlight('happy')} />} label='Glücklich' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('disgusted')} onChange={() => toggleHighlight('disgusted')} />} label='Angeekelt' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('neutral')} onChange={() => toggleHighlight('neutral')} />} label='Neutral' />
      </FormGroup>
    </FilterGroup>
  )

  const sexFilter = (
    <FilterGroup>
      <Bold>Nach Geschlecht filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('female')} onChange={() => toggleHighlight('female')} />} label='Weiblich' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('male')} onChange={() => toggleHighlight('male')} />} label='Männlich' />
      </FormGroup>
    </FilterGroup>
  )

  const sizeFilter = (
    <FilterGroup>
      <Bold>Nach Gesichtsgröße filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('big')} onChange={() => toggleHighlight('big')} />} label='Großes Gesicht' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('small')} onChange={() => toggleHighlight('small')} />} label='Kleines Gesicht' />
      </FormGroup>
    </FilterGroup>
  )

  const uppercaseFilter = (
    <FilterGroup>
      <Bold>Nach Capslock im Titel filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('caps')} onChange={() => toggleHighlight('caps')} />} label='Mit Capslock' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('noCaps')} onChange={() => toggleHighlight('noCaps')} />} label='Ohne Capslock' />
      </FormGroup>
    </FilterGroup>
  )

  const punctuationFilter = (
    <FilterGroup>
      <Bold>Nach übermäßigen Satzzeichen filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('punc')} onChange={() => toggleHighlight('punc')} />} label='Mit übermäßigen' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('noPunc')} onChange={() => toggleHighlight('noPunc')} />} label='Ohne übermäßigen' />
      </FormGroup>
    </FilterGroup>
  )

  const emojiFilter = (
    <FilterGroup>
      <Bold>Nach Emoji filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('emoji')} onChange={() => toggleHighlight('emoji')} />} label='Mit Emoji' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('noEmoji')} onChange={() => toggleHighlight('noEmoji')} />} label='Ohne Emoji' />
      </FormGroup>
    </FilterGroup>
  )

  const circleFilter = (
    <FilterGroup>
      <Bold>Nach Emoji filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('circle')} onChange={() => toggleHighlight('circle')} />} label='Mit Kreis' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('noCircle')} onChange={() => toggleHighlight('noCircle')} />} label='Ohne Kreis' />
      </FormGroup>
    </FilterGroup>
  )

  const arrowFilter = (
    <FilterGroup>
      <Bold>Nach Emoji filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('arrow')} onChange={() => toggleHighlight('arrow')} />} label='Mit Pfeil' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('noArrow')} onChange={() => toggleHighlight('noArrow')} />} label='Ohne Pfeil' />
      </FormGroup>
    </FilterGroup>
  )

  const emojiThumbFilter = (
    <FilterGroup>
      <Bold>Nach Emoji filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('emojiThumb')} onChange={() => toggleHighlight('emojiThumb')} />} label='Mit Emoji' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('noEmojiThumb')} onChange={() => toggleHighlight('noEmojiThumb')} />} label='Ohne Emoji' />
      </FormGroup>
    </FilterGroup>
  )

  const objectFilter = (
    <FilterGroup>
      <Bold>Nach Clickbait Objekt filtern</Bold>
      <FormGroup>
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('circleObject')} onChange={() => toggleHighlight('circleObject')} />} label='Mit Kreis' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('arrowObject')} onChange={() => toggleHighlight('arrowObject')} />} label='Mit Pfeil' />
        <FormControlLabel style={{ marginBottom: -10 }} control={<Checkbox value={highlights.includes('emojiObject')} onChange={() => toggleHighlight('emojiObject')} />} label='Mit Emoji' />
      </FormGroup>
    </FilterGroup>
  )

  const renderSelectedFilterGroup = () => {
    switch (filterGroup) {
      case 'amount':
        return amountFilter
      case 'emotion':
        return emotionFilter
      case 'sex':
        return sexFilter
      case 'size':
        return sizeFilter
      case 'uppercase':
        return uppercaseFilter
      case 'punctuation':
        return punctuationFilter
      case 'emoji':
        return emojiFilter
      case 'circle':
        return circleFilter
      case 'arrow':
        return arrowFilter
      case 'emojiThumb':
        return emojiThumbFilter
      case 'object':
        return objectFilter
    }
  }

  if (fetching) return <Progress />

  return (
    <ScatterplotWrapper>
      <Scatterplot
        videos={videos}
        filterGroup={filterGroup}
        highlights={highlights}
        scale={scale}
        zoom={zoom}
      />
      <ScatterPlotLegend>
        <FilterGroup>
          <Bold>Darstellung der Y-Achse</Bold>
          <StyledSelect
            style={{ marginTop: 5 }}
            value={scale}
            size='small'
            // @ts-ignore
            onChange={(event) => setScale(event.target.value)}
          >
            <MenuItem value='linear'>Lineare Darstellung</MenuItem>
            <MenuItem value='pow'>Potenz Darstellung</MenuItem>
          </StyledSelect>
        </FilterGroup>

        <FilterGroup>
          <Bold>Y-Achse zoomen</Bold>
          <Slider
            value={zoom}
            min={0.1}
            max={maxValue}
            onChange={handleZoomChange}
            valueLabelDisplay='auto'
            style={{ width: 200 }}
          />
        </FilterGroup>

        <FilterGroup>
          <Bold>Filtergruppe</Bold><br />
          <StyledSelect
            style={{ marginTop: 5 }}
            value={filterGroup}
            size='small'
            onChange={(event) => {
              setHighlights([])
              // @ts-ignore
              setFilterGroup(event.target.value)
            }}
          >
            {
              filters.map(f => {
                return <MenuItem key={f} value={f}>{LABELS[f]}</MenuItem>
              })
            }
          </StyledSelect>
        </FilterGroup>

        {renderSelectedFilterGroup()}
      </ScatterPlotLegend>
    </ScatterplotWrapper>
  )
}

export default ScatterplotWithFilters
