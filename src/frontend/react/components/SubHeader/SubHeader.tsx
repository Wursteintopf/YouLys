import React from 'react'
import { SubHeaderContent, SubHeaderDropdownWrapper, SubHeaderStyled } from './SubHeaderStyling'
import { ContentContainer } from '../../../styles/GlobalStyling'
import TimePicker from '../TimePicker/TimePicker'

const SubHeader: React.FC = props => {
  return (
    <SubHeaderStyled>
      <ContentContainer>
        <SubHeaderContent>
          {props.children}
          <SubHeaderDropdownWrapper>
            <TimePicker />
          </SubHeaderDropdownWrapper>
        </SubHeaderContent>
      </ContentContainer>
    </SubHeaderStyled>
  )
}

export default SubHeader
