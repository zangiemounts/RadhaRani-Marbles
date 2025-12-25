import React, { useState, useEffect } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'
import { IconContext } from 'react-icons/lib'
import { Button } from '../globalStyles'
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavItemBtn,
  NavLinks,
  NavBtnLink
} from './Navbar.elements'

function Navbar() {
  const [click, setClick] = useState(false)
  const [button, setButton] = useState(true)

  const handleClick = () => setClick(!click)
  const closeMobileMenu = () => setClick(false)

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false)
    } else {
      setButton(true)
    }
  }

  useEffect(() => {
    showButton()
  }, [])

  window.addEventListener('resize', showButton)

  return (
    <>
          <IconContext.Provider value={{ color: '#fff' }}>
          <Nav >
          <NavbarContainer >
            <NavLogo to='/' onClick={closeMobileMenu}>
            <img style={{maxWidth:170, height:'auto'}} alt="" src="https://mountsfileserver.azurewebsites.net/Images/Org/1/Logo/MountsLogo.png" />
            </NavLogo>
            <MobileIcon onClick={handleClick}>
              {click ? <FaTimes color="#101522" /> : <FaBars color="#101522" />}
            </MobileIcon>
            <NavMenu onClick={handleClick} click={click}>
              <NavItem>
                <NavLinks to='/' onClick={closeMobileMenu}>
                  Home
                </NavLinks>
              </NavItem>
        
              <NavItem>
                <NavLinks to='/AboutUs'>
                  About Us
                </NavLinks>
              </NavItem>
              <NavItem  onClick={() => window.location.replace('http://a.mounts.in/Registration')} >
                <NavLinks to='/' onClick={closeMobileMenu}>
                 Cloud Registration
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks to='/products' onClick={closeMobileMenu}>
                  Products
                </NavLinks>
              </NavItem>  
              <NavItem onClick={() => window.location.replace('http://a.mounts.in/ContactUs')}>
                <NavLinks to='/' onClick={closeMobileMenu}>
                Contact Us
                </NavLinks>
              </NavItem>
              <NavItemBtn>
                {button ? (
                  <NavBtnLink onClick={() => window.location.replace('/login')} >
                    <Button primary>Login</Button>
                  </NavBtnLink>
                ) : (
                  <NavBtnLink onClick={() => window.location.replace('http://a.mounts.in/Options')}>
                    <Button onClick={closeMobileMenu} fontBig primary>
                    Login
                    </Button>
                  </NavBtnLink>
                )}
              </NavItemBtn>
            </NavMenu>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  )
}

export default Navbar
