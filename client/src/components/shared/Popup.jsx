import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useSpring, animated } from 'react-spring'

const PopContainer = styled.div`
  position: absolute;
  width: 100vw;
  top: 0;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  user-select: none;
`
const Message = styled(animated.div)`
  display: flex;
  flex-flow: column;
  align-items: center;
  font-family: 'Playfair Display', serif;
  font-size: 30px;
  max-width: 400px;
  text-align: center;
  background-color: white;
  color: #086788;
  border-radius: 15px;
  padding: 20px;
  font-weight: bold;
  a {
    margin-top: 40px;
  }
`
const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  * {
    margin: 0 10px;
  }
`
const ButtonBuffer = styled.div`
  width: 20px;
`

export default function Popup(props) {
  const flyIn = useSpring({
    from: { opacity: 0, transform: 'translateY(-200%)' },
    to: { opacity: 1, transform: 'translateY(0%)' },
    config: { friction: 30, mass: 2, tension: 170 }
  })

  return (
    <PopContainer onClick={props.closeFunction} style={props.style}>
      <Message style={flyIn} onClick={e => e.stopPropagation()}>
        {props.content}
        <ButtonContainer>
          {props.buttonText && props.link &&
            <Link to={props.link}>
              <Button onClick={props.buttonOnClick} bgColor={props.buttonColor} color='white' forceSize={props.buttonSize}>{props.buttonText}</Button>
            </Link>
          }
          {props.button2Text && props.link2 &&
            <>
              <ButtonBuffer />
              <Link to={props.link2}>
                <Button onClick={props.button2OnClick} bgColor={props.button2Color} color='white' forceSize={props.button2Size}>{props.button2Text}</Button>
              </Link>
            </>
          }
          {props.buttonText && !props.link &&
            <Button onClick={props.buttonOnClick} bgColor={props.buttonColor} color='white' forceSize={props.buttonSize}>{props.buttonText}</Button>
          }
          {props.button2Text && !props.link2 &&
            <>
              <ButtonBuffer />
              <Button onClick={props.button2OnClick} bgColor={props.button2Color} color='white' forceSize={props.button2Size}>{props.button2Text}</Button>
            </>
          }
        </ButtonContainer>
      </Message>
    </PopContainer>
  )
}
