// ** React Imports
import { Link, Navigate } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Form, Label, Input, Button, Spinner, FormFeedback } from 'reactstrap'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Utils
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'
import { useForm, Controller } from 'react-hook-form'
// ** Icons Imports
import { ChevronLeft } from 'react-feather'
import Swal from "sweetalert2"  
// ** Styles
import '@styles/react/pages/page-authentication.scss'
import {  useEffect, useState } from 'react'
import firebase from './firebase'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
const ForgotPassword = () => {
  // ** Hooks
    const { skin } = useSkin()
    const [trigger, settrigger] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [formData, setFormData] = useState({
        password: '',
        cpassword: ''
    })
    const [isError, setisError] = useState('')
    const [formDatamain, setformDatamain] = useState({
        phnumber: ""
    })
    const [formotp, setformotp] = useState({
        otp: ""
    })
    const [otp, setOtp] = useState(true)
    const [Veryfi, setVerifi] = useState(false)
    const onInputChange2 = (e) => {
        setformDatamain({ ...formDatamain, ["phnumber"]: e })
    }
        //console.log(formDatamain)
    const onInputChange3 = (e) => {
        setformotp({ ...formotp, ["otp"]: e.target.value })

    }
    const SignupSchema = yup.object().shape({
        password: yup.string().min(6).required(),
        confirmPwd: yup.string().required('Password is mendatory')
            .oneOf([yup.ref('password')], 'Passwords does not match')
    })
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
        //console.log(formData)
    //console.log(formData)
    useEffect(() => {
        if ((formData.cpassword) !== (formData.password)) {
            setisError('Password and Confirm Password should be same')
        } else {
            setisError('')
        }
    }, [formData.password, formData.cpassword])
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: 'onChange', resolver: yupResolver(SignupSchema) })
    const onCapthaVerify = (form) => {

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
            size: 'invisible',
            callback: (ev, response) => {
                //console.log(ev, response)
                // reCAPTCHA solved, allow signInWithPhoneNumber.
                handleFormSubmit(form)
            },
            defaultCountry: "In"
        })

    }
    const handleFormSubmit = async (form) => {
        const sendData = {
            OrgId: Number(407),
            DomainDesc: window.location.hostname,
            PhoneNo: `91${formDatamain.phnumber}`

        }
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Checknumber`, {
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
                    if (data === 'Yes') {
                        settrigger(trigger + 1)

                        setLoading(true)


                        const phoneNumber = `+${formDatamain.phnumber}`
                        onCapthaVerify(form)
                        const appVerifier = window.recaptchaVerifier

                        firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
                            .then((confirmationResult) => {
                                window.confirmationResult = confirmationResult
                                //console.log("OTP is Send")
                                setOtp(false)
                            }).catch((error) => {
                                console.log(error.message)
                               // console.log("OTP not send")
                            })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "This Number Is Already Registered",
                            text: "Please Login",
                            focusConfirm: true

                        }).then(() => {
                            window.location.reload()
                        })
                    }

                })
    }
    const onSubmitOTP = () => {
        setLoading2(true)
        const code = formotp.otp

        window.confirmationResult.confirm(code).then(async (result) => {
            console.log(result)
            // User signed in successfully.
            const user = result.user
            console.log(user)
            setVerifi(true)

            setInvalid(false)

        }).catch((error) => {
            console.log(error)
            setInvalid(true)
            setLoading2(false)
            setLoading(false)
        })
    }


    const onFormSubmit = async () => {
        const sendData = {
            OrgId: Number(407),
            PhoneNo: formDatamain.phnumber,
            Password: formData.password

        }
       // console.log(sendData)


        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Updatepasswithph`, {
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

                    if (data === "Done") {
                        Swal.fire({
                            icon: "success",
                            title: "Done",
                            text: "Password Updated Successfully",
                            showDenyButton: false,
                            showCancelButton: false,
                            confirmButtonText: 'Ok'


                        }).then((result) => {

                            if (result.isConfirmed) {
                                window.location.pathname = "/login"
                            } else {
                                window.location.reload()
                            }
                        })

                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Password updated Error",
                            focusConfirm: false
                        })

                    }
                })
    }

  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

 {
      return (
          <><div id='sign-in-button'></div>
              { Veryfi ? <div className='auth-wrapper auth-cover'>
                      <Row className='auth-inner m-0'>
                          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                              <img src={"logomounts.png"} />
                              {/*<h2 className='brand-text text-primary ms-1'>Mounts</h2>*/}
                          </Link>
                          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                              <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                                  <img className='img-fluid' src={source} alt='Login Cover' />
                              </div>
                          </Col>
                          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                              <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                                  <CardTitle tag='h2' className='fw-bold mb-1'>
                                      Forgot Password? 🔒
                                  </CardTitle>
                                  <CardText className='mb-2'>
                                      Enter your New Password 
                                  </CardText>
                                  <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onFormSubmit)}>
                                  <div className='mb-1'>
                                      <Label className='form-label' for='password'>
                                          Password:
                                      </Label>
                                      <InputPasswordToggle className='mb-2' name="password" onChange={(e) => onInputChange(e)} label='Password' htmlFor='basic-default-password' />
                                  </div>
                                  <div className='mb-1'>
                                      <Label className='form-label' for='password'>
                                          Confirm Password:
                                      </Label>

                                    {/*  <Label className='form-label' style={{ position: 'absolute', top: 95, color: 'red' }} for='password'>{isError}</Label>*/}

                                      <InputPasswordToggle name="cpassword" id='cpassword' onChange={(e) => onInputChange(e)} placeholder='Enter Your Confirm Password' />
                                      <p style={{ color: 'red' }}>{isError}</p>
                                  </div>
                                      <Button color='primary' onClick={() => onFormSubmit()} block>
                                          Update
                                      </Button> 
                                  </Form>
                                  <p className='text-center mt-2'>
                                      <Link to='/login'>
                                          <ChevronLeft className='rotate-rtl me-25' size={14} />
                                          <span className='align-middle'>Back to login</span>
                                      </Link>
                                  </p>
                              </Col>
                          </Col>
                      </Row>
                  </div> :   <div className='auth-wrapper auth-cover'>
                      <Row className='auth-inner m-0'>
                          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                              <img src={"logomounts.png"} />
                              {/*<h2 className='brand-text text-primary ms-1'>Mounts</h2>*/}
                          </Link>
                          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                              <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                                  <img className='img-fluid' src={source} alt='Login Cover' />
                              </div>
                          </Col>
                          {otp ?  <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                                  <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                                      <CardTitle tag='h2' className='fw-bold mb-1'>
                                          Forgot Password? 🔒
                                      </CardTitle>
                                      <CardText className='mb-2'>
                                          Enter your Phone No and we'll send you OTP to reset your password
                                      </CardText>
                                      <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(handleFormSubmit)}>
                                          
                                      <div className='mb-1'>
                                         {/* <Input name="phnumber" type="number" onChange={e => onInputChange2(e)} />  */}
                                          <PhoneInput
                                              country={'in'}
                                              placeholder="Enter your PhoneNumber"
                                              onChange={e => onInputChange2(e)}
                                              enableSearch="false"
                                              value={formDatamain.phnumber}
                                          />
                                      </div>
                                      <Button type='submit' color='primary' onClick={() => handleFormSubmit()}>
                                          {loading ? <Spinner size="sm" color="light" /> : "Send OTP"}
                                      </Button>
                                      </Form>
                                      <p className='text-center mt-2'>
                                          <Link to='/login'>
                                              <ChevronLeft className='rotate-rtl me-25' size={14} />
                                              <span className='align-middle'>Back to login</span>
                                          </Link>
                                      </p>
                                  </Col>
                              </Col> :  <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                                  <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                                      <CardTitle tag='h2' className='fw-bold mb-1'>
                                          VERIFY OTP
                                      </CardTitle>
                                      <CardText className='mb-2'>
                                          <p>OTP is Sent to <b style={{ color: 'forestgreen' }}>{formDatamain.phnumber}</b> Please type that OTP to proceed Furthur </p>
                                      </CardText>
                                      <Form className='auth-forgot-password-form mt-2' onSubmit={handleSubmit(onSubmitOTP)}>
                                         
                                          <div className='mb-1'>
                                              <Label className='form-label' for='login-email'>
                                                  Enter Your OTP
                                              </Label>
                                              {invalid ? <h5 style={{ color: "red" }} >Invalid OTP!!</h5> : null}
                                              <input
                                                  type="text"
                                                  className="form-control form-control-lg"
                                                  id="otp"
                                                  name="otp"
                                                  onChange={(e) => onInputChange3(e) }
                                                  placeholder="Enter your OTP"
                                              />
                                          </div>
                                          <Button type='submit' color='primary' onClick={() => onSubmitOTP()}>
                                              {loading2 ? <Spinner size="sm" color="light" /> : "Verify OTP"}
                                          </Button>
                                      </Form>
                                      <p className='text-center mt-2'>
                                          <Link to='/login'>
                                              <ChevronLeft className='rotate-rtl me-25' size={14} />
                                              <span className='align-middle'>Back to login</span>
                                          </Link>
                                      </p>
                                  </Col>
                              </Col>}
                      </Row>
                  </div>}
         </>
    )
  } 
}

export default ForgotPassword
