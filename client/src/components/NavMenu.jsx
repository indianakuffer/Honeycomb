import React from 'react'
import styled from 'styled-components'
import { Link, useHistory } from 'react-router-dom'
import { useSpring, animated } from 'react-spring'
import { removeToken } from '../services/auth'

const NavMenuContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
`
const Menu = styled(animated.div)`
  display: flex;
  background-color: white;
  color: #086788;
  flex-flow: column;
  z-index: 11;
  width: fit-content;
  border-radius: 0 13px 13px 0;
  overflow: hidden;
  a {
    font-size: 24px;
    color: inherit;
    text-decoration: none;
    padding: 5px 10px;
    &:hover {
      background-color: #086788;
      color: #fbffe2;
    }
  }
`

export default function NavMenu(props) {
  const history = useHistory()

  const slideIn = useSpring({
    from: { transform: 'translate3d(-100%,0,0)' },
    to: { transform: 'translate3d(0%,0,0)' },
    config: { friction: 20, tension: 200 },
  })

  const handleLogout = async () => {
    props.setCurrentUser(null)
    removeToken()
    history.push('/')
  }

  return (
    <NavMenuContainer onClick={props.toggleMenu}>
      <Menu style={slideIn}>
        <Link to='/thoughts'>My Thoughts</Link>
        <Link to='/insights'>My Data</Link>
        <Link to='/sea'>The Sea</Link>
        <a onClick={handleLogout}>Logout</a>
      </Menu>
    </NavMenuContainer>
  )
}
