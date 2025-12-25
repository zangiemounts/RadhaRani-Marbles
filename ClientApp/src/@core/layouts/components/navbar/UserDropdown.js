// ** React Imports
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
/*import { isUserLoggedIn } from '@utils'*/

// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/authentication'

// ** Third Party Components
import { Settings, Power } from 'react-feather'

// ** Reactstrap Imports
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem } from 'reactstrap'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()

  // ** State
  /*const [userData, setUserData] = useState(null)*/
    const [data, setData] = useState('')
    const [image, setimage] = useState('')
    const [load, setload] = useState(false)

    const getData = async () => {

        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {

            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId'))
        }

        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetUserDetails`, {
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
                    //console.log("User_dropDown", data)
                    setData(data)
                })
    }

    //Image Data
    const ImageData = async () => {
        setload(true)
        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            webHeader: "Profileimage"
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
                        setload(false)
                    } else {
                        setimage(data[0])
                    }
                })


    }
  //** ComponentDidMount
  useEffect(() => {
    /*if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }*/
      getData()
      ImageData()
  }, [])

  //** Vars
  const userAvatar =  defaultAvatar

  return (
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <div className='user-nav d-sm-flex d-none'>
          <span className='user-name fw-bold'>{`${data.firstName} ${data.lastName}`}</span>
          <span className='user-status'>{data.userRoleId === 7 ? 'ADMIN' : 'User'}</span>
        </div>
              <Avatar img={load ? `https://mountsfileupload.azurewebsites.net/api/FileUpload/${image.logoImage2}` : userAvatar} imgHeight='40' imgWidth='40' status='online' />
      </DropdownToggle>
      <DropdownMenu end>
       
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={14} className='me-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>

        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='me-75' />
          <span className='align-middle'>Logout</span>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default UserDropdown
