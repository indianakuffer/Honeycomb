import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  background-color: ${props => props.bgColor ? props.bgColor : '#086788'};
  border: none;
  color: ${props => props.color ? props.color : 'white'};
  padding: 5px 20px;
  font-size: ${props => props.forceSize ? props.forceSize : '24px'};
  font-weight: 600;
  border-radius: 10px;
  font-family: 'Playfair Display', serif;
  width: fit-content;
  &:hover {
    filter: brightness(1.1);
  }
`

export default function Button(props) {
  return (
    <StyledButton onClick={props.onClick} bgColor={props.bgColor} color={props.color} forceSize={props.forceSize}>
      {props.children}
    </StyledButton>
  )
}
