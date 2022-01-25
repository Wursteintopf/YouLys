import React, { useState } from 'react'
import {
  DesktopMenu,
  HeaderStyled,
  LogoContainer,
  MenuContainer,
  MenuItem, MobileMenu, MobileMenuItem, MobileMenuOpen, MobileMenuSubItem,
  SubMenu, SubMenuContent, SubMenuItem,
} from './HeaderStyling'
import { ContentContainer } from '../../../../styles/GlobalStyling'
import { useHistory } from 'react-router'
import { Turn as Hamburger } from 'hamburger-react'

const Header: React.FC = () => {
  const history = useHistory()

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    document.body.classList.toggle('hamburger-menu-open')
  }

  return (
    <HeaderStyled>
      <ContentContainer>
        <MenuContainer>
          <LogoContainer
            onClick={() => history.push('/')}
          >
            YouLys
          </LogoContainer>
          <DesktopMenu>
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
          </DesktopMenu>
          <MobileMenu>
            <Hamburger toggled={mobileMenuOpen} toggle={toggleMenu} />
            <MobileMenuOpen open={mobileMenuOpen}>
              <MobileMenuItem onClick={() => {
                history.push('/success')
                toggleMenu()
              }}>
                Erfolgsfaktoren
              </MobileMenuItem>
              <MobileMenuSubItem onClick={() => {
                history.push('/success/titles')
                toggleMenu()
              }}>
                Titelanalyse
              </MobileMenuSubItem>
              <MobileMenuSubItem onClick={() => {
                history.push('/success/faces')
                toggleMenu()
              }}>
                Gesichter auf Thumbnails
              </MobileMenuSubItem>
              <MobileMenuSubItem onClick={() => {
                history.push('/success/objects')
                toggleMenu()
              }}>
                Objekte auf Thumbnails
              </MobileMenuSubItem>
              <MobileMenuItem onClick={() => {
                history.push('/channels')
                toggleMenu()
              }}>
                Kanalliste
              </MobileMenuItem>
            </MobileMenuOpen>
          </MobileMenu>
        </MenuContainer>
      </ContentContainer>
    </HeaderStyled>
  )
}

export default Header
