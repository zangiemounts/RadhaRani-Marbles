// ** React Imports
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
//import logo from '../../../../../assets/images/logo/logomounts.jpg'
// ** Icons Imports
import { Disc, X, Circle } from 'react-feather'

// ** Config
/*import themeConfig from '@configs/themeConfig'*/

// ** Utils
import { getUserData, getHomeRouteForLoggedInUser } from '@utils'

const VerticalMenuHeader = props => {
  // ** Props
  const { menuCollapsed, setMenuCollapsed, setMenuVisibility, setGroupOpen, menuHover } = props
    const [Data, setData] = useState([])
    const [Show, setShow] = useState(false)
  // ** Vars
    const user = getUserData()
    const OrgDetail = async () => {


        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            OrgId: Number(localStorage.getItem("orgId")),
            ActiveStatus: "A",
            webHeader: "OrganizationDetails"

        }

        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Getmultipledata`, {
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
                    if (data.length <= 0) {
                        setShow(true)
                    } else {

                    setData(data[0])
                    }

                })


    }

    useEffect(() => {
        OrgDetail()
    }, [])
  // ** Reset open group
  useEffect(() => {
    if (!menuHover && menuCollapsed) setGroupOpen([])
  }, [menuHover, menuCollapsed])

  // ** Menu toggler component
  const Toggler = () => {
    if (!menuCollapsed) {
      return (
        <Disc
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(true)}
        />
      )
    } else {
      return (
        <Circle
          size={20}
          data-tour='toggle-icon'
          className='text-primary toggle-icon d-none d-xl-block'
          onClick={() => setMenuCollapsed(false)}
        />
      )
    }
  }

  return (
    <div className='navbar-header'>
      <ul className='nav navbar-nav flex-row'>
        <li className='nav-item me-auto'>
          <NavLink to={user ? getHomeRouteForLoggedInUser(user.role) : '/'} className='navbar-brand'>
            
            <h2 className='brand-text mb-0'>{Show ? "Radharani" : Data.mainDesc}</h2>
          </NavLink>
        </li>
        <li className='nav-item nav-toggle'>
          <div className='nav-link modern-nav-toggle cursor-pointer'>
            <Toggler />
            <X onClick={() => setMenuVisibility(false)} className='toggle-icon icon-x d-block d-xl-none' size={20} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default VerticalMenuHeader
