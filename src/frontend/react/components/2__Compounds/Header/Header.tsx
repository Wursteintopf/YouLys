import React from 'react'
import {
  HeaderStyled,
  LogoContainer,
  MenuContainer,
  MenuItem,
  SearchContainer,
  SearchTextField,
  SubMenu, SubMenuContent, SubMenuItem,
} from './HeaderStyling'
import { ContentContainer } from '../../../../styles/GlobalStyling'
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
          <MenuItem>
            <span onClick={() => history.push('/success')}>Erfolgsfaktoren</span>
            <SubMenu>
              <SubMenuContent>
                <SubMenuItem onClick={() => history.push('/success/titles')}>
                  Titelanalyse
                </SubMenuItem>
                <SubMenuItem onClick={() => history.push('/success/faces')}>
                  Gesichter auf Thumbnails
                </SubMenuItem>
                <SubMenuItem onClick={() => history.push('/success/objects')}>
                  Objekte auf Thumbnails
                </SubMenuItem>
              </SubMenuContent>
            </SubMenu>
          </MenuItem>
          <MenuItem>
            <span onClick={() => history.push('/channels')}>Kanalliste</span>
          </MenuItem>
        </MenuContainer>
      </ContentContainer>
    </HeaderStyled>
  )
}

export default Header
