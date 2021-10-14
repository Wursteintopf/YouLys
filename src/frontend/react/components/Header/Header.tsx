import React from 'react'
import { HeaderStyled, LogoContainer, MenuContainer, MenuItem, SearchContainer, SearchTextField } from './HeaderStyling'
import { ContentContainer } from '../../../styles/GlobalStyling'
import { InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useHistory } from 'react-router'

const Header: React.FC = () => {
  const history = useHistory()

  return (
    <HeaderStyled>
      <ContentContainer>
        <MenuContainer>
          <LogoContainer
            onClick={() => history.push('/')}
          >
            YouLys
          </LogoContainer>
          <MenuItem
            onClick={() => history.push('/success')}
          >
            Erfolgsfaktoren
          </MenuItem>
          <MenuItem
            onClick={() => history.push('/channels')}
          >
            Kanalübersicht
          </MenuItem>
          <SearchContainer>
            <SearchTextField
              size='small'
              placeholder='Suche...'
              InputProps={{
                startAdornment: <InputAdornment position='start'><SearchIcon /></InputAdornment>,
              }}
            />
          </SearchContainer>
        </MenuContainer>
      </ContentContainer>
    </HeaderStyled>
  )
}

export default Header
