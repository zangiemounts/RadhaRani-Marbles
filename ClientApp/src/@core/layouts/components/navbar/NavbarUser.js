// ** Dropdowns Imports
import IntlDropdown from './IntlDropdown'
import CartDropdown from './CartDropdown'
import UserDropdown from './UserDropdown'
import NavbarSearch from './NavbarSearch'
import NotificationDropdown from './NotificationDropdown'
import { BiWallet } from "react-icons/bi"
// ** Third Party Components
import { Sun, Moon } from 'react-feather'

// ** Reactstrap Imports
import { NavItem, NavLink, Button, Badge, Input, DropdownMenu, DropdownItem, DropdownToggle, UncontrolledDropdown } from 'reactstrap'
import { useEffect, useState } from 'react'

const NavbarUser = props => {
  // ** Props
    const { skin, setSkin } = props
    const [poins, setpoints] = useState(0)
    const getData = async () => {

        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId'))
        }
        //console.log(sendData2)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetUserDetailsmain`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData2)

        })
            .then(response => response.json())
            .then(
                data => {
                    setpoints(data.userPoints)
                    localStorage.setItem("points", data.userPoints)
                    //console.log(data)
                })


    }

    useEffect(() => {
        getData()
    }, [])
  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
          {/* <IntlDropdown />*/}
         
          {/*<UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25'>
              <DropdownToggle tag='a' className='nav-link' href='/' onClick={e => e.preventDefault()}>
                  <BiWallet size={21} />
                  {poins < 11 ? <Badge tag='div' color='light-danger' pill>
                      {poins === null ? 0 : poins}
                  </Badge> : <Badge tag='div' color='light-success' pill>
                      {poins}
                  </Badge>}
              </DropdownToggle>
              <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
                  <li className='dropdown-menu-header'>
                      <DropdownItem className='d-flex' tag='div' header>
                          <h4 className='notification-title mb-0 me-auto'>Point Left</h4>
                          {poins < 11 ? <Badge tag='div' color='light-danger' pill>
                              {poins === null ? 0 : poins}
                          </Badge> : <Badge tag='div' color='light-success' pill>
                              {poins}
                          </Badge>}
                      </DropdownItem>
                  </li>
              </DropdownMenu>
          </UncontrolledDropdown>*/}
     {/* <NavbarSearch />
      <CartDropdown />
      <NotificationDropdown />*/}
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
