import React, { useRef, useState } from 'react'
import { Divider, MenuItem, Popover, TextField, Typography } from '@mui/material'
import { TimeRange } from '../../../../shared/Enums/TimeRange'
import { DatePicker, DatePickerWrapper, TimePickerStyled } from './TimePickerStyling'
import { useDispatch, useSelector } from 'react-redux'
import { getFrom, getRange, getTo } from '../../../store/ui/ui.selector'
import { setFrom, setRange, setTo } from '../../../store/ui/ui.actions'
import moment from 'moment'
import StaticDatePicker from '@mui/lab/StaticDatePicker'
import { LocalizationProvider } from '@mui/lab'
import AdapterDateFns from '@mui/lab/AdapterMoment'
import { Headline } from '../Headline/Headline'

const TimePicker: React.FC = () => {
  const range = useSelector(getRange)
  const from = useSelector(getFrom)
  const to = useSelector(getTo)

  const dispatch = useDispatch()

  const [popOverOpen, setPopOverOpen] = useState(false)

  const handleClose = () => {
    setPopOverOpen(false)
  }

  const getTimePicker = () => {
    return document.getElementById('time-picker') as Element
  }

  return (
    <>
      <TimePickerStyled
        id='time-picker'
        value={range}
        size='small'
        onChange={event => {
          // @ts-ignore
          dispatch(setRange(event.target.value))
        }}
        // @ts-ignore
        renderValue={selected => selected === TimeRange.CUSTOM ? (moment(from).format('DD.MM.YYYY') + ' - ' + moment(to).format('DD.MM.YYYY')) : selected}
      >
        <MenuItem value={TimeRange.LAST_7_DAYS}>letzte 7 Tage</MenuItem>
        <MenuItem value={TimeRange.LAST_28_DAYS}>letzte 28 Tage</MenuItem>
        <MenuItem value={TimeRange.LAST_90_DAYS}>letzte 90 Tage</MenuItem>
        <MenuItem value={TimeRange.LAST_365_DAYS}>letzte 365 Tage</MenuItem>
        <Divider />
        <MenuItem value={TimeRange.ALWAYS}>Seit Beobachtung</MenuItem>
        <Divider />
        <MenuItem
          value={TimeRange.CUSTOM}
          onClick={() => setPopOverOpen(true)}
        >
          Benutzerdefiniert
        </MenuItem>
      </TimePickerStyled>
      <Popover
        open={popOverOpen}
        anchorEl={getTimePicker()}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePickerWrapper>
            <DatePicker>
              <b>Von:</b>
              <StaticDatePicker
                displayStaticWrapperAs='desktop'
                openTo='day'
                value={from}
                maxDate={moment(to)}
                onChange={(newValue) => {
                  if (newValue) dispatch(setFrom(newValue.toDate()))
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </DatePicker>

            <DatePicker>
              <b>Bis:</b>
              <StaticDatePicker
                displayStaticWrapperAs='desktop'
                openTo='day'
                value={to}
                minDate={moment(from)}
                maxDate={moment(new Date())}
                onChange={(newValue) => {
                  if (newValue) dispatch(setTo(newValue.toDate()))
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </DatePicker>
          </DatePickerWrapper>
        </LocalizationProvider>
      </Popover>
    </>
  )
}

export default TimePicker
