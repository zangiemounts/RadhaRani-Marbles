// ** React Imports
import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import img2 from '@src/assets/images/radharanilogo.jpg'
// ** Third Party Components
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Coffee, X } from 'react-feather'
import Swal from "sweetalert2"
// ** Actions
import { handleLogin } from '@store/authentication'

// ** Context
import { AbilityContext } from '@src/utility/context/Can'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// ** Custom Components
import Avatar from '@components/avatar'
import InputPasswordToggle from '@components/input-password-toggle'

// ** Utils
import { getHomeRouteForLoggedInUser } from '@utils'

// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Button, CardText, CardTitle } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'

const ToastContent = ({ t, name, role }) => {
  return (
    <div className='d-flex'>
      <div className='me-1'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
      </div>
      <div className='d-flex flex-column'>
        <div className='d-flex justify-content-between'>
          <h6>{name}</h6>
          <X size={12} className='cursor-pointer' onClick={() => toast.dismiss(t.id)} />
        </div>
        <span>You have successfully logged in as an {role} user to Mounts. Now you can start to explore. Enjoy!</span>
      </div>
    </div>
  )
}

const defaultValues = {
  password: 'admin',
  loginEmail: 'admin@demo.com'
}

const Login = () => {
  // ** Hooks
  const { skin } = useSkin()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const ability = useContext(AbilityContext)
 const [formData, setFormData] = useState({
        password: ''
 })
    const [formDataa, setFormDataa] = useState({
        phoneno: ''
    })

    const [orgidmain, setorgidmain] = useState(407)
    const [orgname, setorgname] = useState("Radharani Marbles")
    const onInputChange2 = (e) => {
        setFormDataa({ ...formDataa, ["phoneno"]: e })
    }
  const {
    setError,
    handleSubmit
  } = useForm({ defaultValues })
    const illustration = skin === 'dark' ? 'Radharanip.svg' : 'Radharanip.png',
      source = require(`@src/assets/images/pages/${illustration}`).default

    const onSubmit = () => {
        const data = {
            password: 'admin',
            loginEmail: 'admin@demo.com'
        }
        if (Object.values(data).every(field => field.length > 0)) {
            useJwt
                .login({ email: data.loginEmail, password: data.password })
                .then(res => {
                    const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
                    dispatch(handleLogin(data))
                    ability.update(res.data.userData.ability)
                    window.location.pathname = getHomeRouteForLoggedInUser(data.role)
                    
                    
                })
                .catch(err => console.log(err))
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }

    /*Radharani ORGId = 407*/
    /*CHeck OrgId = 422*/


    useEffect(() => {
        getOrgId()

    }, [])

    const getOrgId = async () => {
        try {
            const payload = {
                ActualWebsite: window.location.hostname,
                //ActualWebsite: "radharanimarvel.azurewebsites.net",
                OrgName: "test"
            }

            const response = await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Getorgid`,
                {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            )

            if (response.ok) {
                const data = await response.json()
                //console.log(data)
                setorgidmain(data.orgId)
                setorgname(data.orgName)

            }

        } catch (error) {
            console.error("GetOrgId API error:", error)
            
        }
    }

    const onFormSubmit = async () => {
        try {
            const sendData = {
                OrgId: Number(orgidmain),
                PhoneNo: `${formDataa.phoneno}`,
                Password: formData.password,
                VURL: window.location.href,
                WebHeader: 'MyProfileFile',
                Server: window.location.origin
            }
            // console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/UserVerify`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)
            })
                .then(response => response.json())
                .then(
                    data => {
                        // console.log(data)
                        if (data.firstName !== null) {
                            localStorage.setItem("accessToken", "token")
                            localStorage.setItem('orgId', orgidmain)
                            if (data.urole === 7) {
                                localStorage.setItem('userIdA', data.userId)
                            } else {
                                localStorage.setItem('userId', data.userId)
                            }
                            localStorage.setItem('Maincatid', data.mainCatID)
                            localStorage.setItem('urole', data.urole)
                            localStorage.setItem('OrderNo', data.orderNo)
                            localStorage.setItem('Orgname', orgname)
                            onSubmit()
                            toast(t => (
                                <ToastContent t={t} name={`${data.firstName} ${data.lastName}`} />
                            ))
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "Login Failed",
                                text: "Please Enter Correct credentials",
                                focusConfirm: false
                            })
                            // console.log("Error")
                        }
                    })
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Please Enter Correct credentials",
                focusConfirm: false
            })
        }
    }
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        
    }
    const styles = {
        width: "100%",

        fontSize: 18,
        height: "2em"
    }
  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          {/*<img src={"Radharani.png"}/>*/}
          <img src={img2} alt="Radharani" width="150" height="100"/>
          {/*<h2 className='brand-text text-primary ms-1 mt-2'>RADHARANI MARBLE GRANITE PRIVATE LIMITED</h2>*/}
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                      <CardTitle tag='h2' className='fw-bold mb-1'>
                          Welcome to {orgname}! 👋
            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
            
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onFormSubmit)}>
             {/* <div className='mb-1'>
                <Label className='form-label' for='login-email'>
                  Phone Number
                </Label>
                    <Input
                      autoFocus
                      onChange={(e) => onInputChange(e)}
                      type='number'
                      name="phoneno"
                      placeholder='Please Enter Your Phone Number'
                    />
              </div>*/}
               <PhoneInput
                 country={'in'}
                 placeholder="Enter your PhoneNumber"
                 onChange={e => onInputChange2(e)}
                 enableSearch="false"
                 defaultValue={formData.phoneno}
                 inputStyle={styles}
                          />
              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                    <InputPasswordToggle  id='password'
                  name='password' className='input-group-merge' onChange={(e) => onInputChange(e)} />
                
                
              </div>
              {/*<div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>*/}
              <Button type='submit' color='primary' block>
                Sign in
              </Button>
            </Form>
            {/*<p className='text-center mt-2'>
              <span className='me-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>*/}
            {/*<div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>*/}
            <div className='auth-footer-btn d-flex justify-content-center'>
         
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
