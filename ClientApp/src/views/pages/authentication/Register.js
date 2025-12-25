// ** React Imports
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'

import { useForm, Controller } from 'react-hook-form'
import { Mail, User, Lock } from 'react-feather'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// ** Reactstrap Imports
import { Row, Col, CardTitle, CardText, Label, Button, Form, Input, FormFeedback, Spinner, InputGroupText, InputGroup } from 'reactstrap'
import Swal from "sweetalert2"
// ** Styles
import '@styles/react/pages/page-authentication.scss'
import firebase from './firebase'
const Register = () => {

    const { skin } = useSkin()
    const [otp, setOtp] = useState(true)
    const [Veryfi, setVerifi] = useState(false)
    const [trigger, settrigger] = useState(0)
    const [loading, setLoading] = useState(false)
    const [loading2, setLoading2] = useState(false)
    const [formerror, setformerror] = useState({})
    const [issubmit, setissubmit] = useState(false)
    const [agree, setAgree] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [isError, setisError] = useState('')
    const [formData, setFormData] = useState({
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            cpassword:"",
            profile: "self",
            terms: false
    })
    const styles = {
        width: "100%",

        fontSize: 18,
        height: "2em"
    }

    const {
    handleSubmit,
    formState: { errors }
    } = useForm({})

    const [formDatamain, setformDatamain] = useState({
        phnumber: ""
    })
 
    const [formDatamainn, setformDatamainn] = useState({
        otp:""
    })

    const onInputChange2 = (e) => {
        setformDatamain({ ...formDatamain, ["phnumber"]: e })
    }
    const onInputChange3 = (e) => {
        setformDatamainn({ ...formDatamainn, ["otp"]: e.target.value })
     
    }
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        setformerror({})
    }

    const handleSubmits = (e) => {
        e.preventDefault()
        setformerror(Validate(formData))
        setissubmit(true)
        if (Object.keys(Validate(formData)).length < 1) {
            handleFormSubmit()
        }
    }
    const Validate = (values) => {
        const errors = {}
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

        if (!values.firstname) {
            errors.firstname = "FirstName is required!"
        }
        if (!values.lastname) {
            errors.lastname = "LastName is required!"
        }
        if (!values.email) {
            errors.email = "Email is required!"
        } else if (!regex.test(values.email)) {
            errors.email = "Please Enter Valid Email"
        }
        if (!values.password) {
            errors.password = "Password is required!"
        } else if (values.password.length < 6) {
            errors.password = "Password must be more than 6 Characters"
        }
        return errors
    }
    const checkboxHandler = () => {
        
        setAgree(!agree)
        
    }
    
    const onCapthaVerify = (form) => {
      
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
             size: 'invisible',
            callback: (ev, response) => {
                console.log(ev, response)
                 // reCAPTCHA solved, allow signInWithPhoneNumber.
                 handleFormSubmit(form)
            },
            defaultCountry:"In"
        })

    }   
    const handleFormSubmit = async (form) => {
       
        const sendData = {
            OrgId: Number(239),
            DomainDesc: window.location.hostname,
            PhoneNo: `91${formDatamain.phnumber}`

        }
        await fetch(`${ process.env.REACT_APP_API_LINK }api/Main/Checknumber`, {
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
                                //console.log("OTP not send")
                             
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
        const code = formDatamainn.otp
        setLoading2(true)
        window.confirmationResult.confirm(code).then(async (result) => {
            // User signed in successfully.
            const user = result.user
            console.log(user)
            console.log("OTP Verified")
            const sendData = {
                OrgId: Number(239),
                DomainDesc: window.location.hostname,
                FirstName: formData.firstname,
                LastName: formData.lastname,
                PhoneNo: formDatamain.phnumber,
                Apikey2: "Success",
                Password: formData.password,
                CreatedBy: formData.profile,
                EmailId: formData.email

            }
            setInvalid(false)

            await fetch(`${process.env.REACT_APP_API_LINK}api/Main/Createusergoogleotp`, {
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
                        console.log(data)
                        if (data.apikey2 === "Done") {
                            localStorage.setItem("accessToken", "token")
                            sessionStorage.setItem("loginphone", formDatamain.phnumber)
                            sessionStorage.setItem("loginpass", formData.password)

                            setTimeout(() => {
                                window.history.pushState(
                                    `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/pages/account-settings"}`,
                                    "auth-login",
                                    `${process.env.PUBLIC_URL ? process.env.PUBLIC_URL : "/pages/account-settings"}`
                                )
                                window.location.reload()
                            }, 2000)
                        } else {
                            Swal.fire({
                                icon: "error",
                                title: "This Number Is Already Registered",
                                text: "Please Login",
                                focusConfirm: true

                            }).then(() => {
                                window.location.pathname = '/login'
                            })
                        }

                    })
        }).catch(() => {
            setInvalid(true)

            setLoading2(false)
        })
    }
   
    useEffect(() => {
        
        if (Object.keys(formerror).length === 0 && issubmit) {
            
        }
    }, [formerror])
    useEffect(() => {
        if ((formData.cpassword) !== (formData.password)) {
            setisError('Password and Confirm Password should be same')
        } else {
            setisError('')
        }
    }, [formData.password, formData.cpassword])


  const illustration = skin === 'dark' ? 'register-v2-dark.svg' : 'register-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

    return (
        <> <div id='sign-in-button'></div>
            {otp ? < div className='auth-wrapper auth-cover' >
                    <Row className='auth-inner m-0'>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <img src={"logomounts.png"} />
                            {/* <h2 className='brand-text text-primary ms-1'>Mounts</h2>*/}
                        </Link>
                        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                                <img className='img-fluid' src={source} alt='Login Cover' />
                            </div>
                        </Col>
                        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                        <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                            {Object.keys(formerror).length === 0 && issubmit ? <CardTitle tag='h2' className='fw-bold mb-1'>
                                Please Wait for OTP
                            </CardTitle> : <><CardTitle tag='h2' className='fw-bold mb-1'>
                                    Adventure starts here 🚀
                                </CardTitle>
                                    <CardText className='mb-2'>Make Your Business Easy and Fun!</CardText> </>}

                            <Form className='auth-register-form mt-2' onSubmit={handleSubmits}>
                                
                                <div className='mb-1'>
                                    <Label className='form-label' for='register-username'>
                                        First Name
                                    </Label>
                                    <InputGroup className='input-group-merge mb-1'>
                                    <InputGroupText>
                                        <User size={15} />
                                    </InputGroupText>

                                        <Input type="text" name="firstname" onChange={(e) => onInputChange(e)} value={formData.firstname} placeholder='Enter Your First Name' />
                                    </InputGroup>
                                        <p style={{color:"red"}}>{formerror.firstname}</p>
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='register-username'>
                                            Last Name
                                    </Label>
                                    <InputGroup className='input-group-merge mb-1'>
                                        <InputGroupText>
                                            <User size={15} />
                                        </InputGroupText>

                                        <Input type="text" name="lastname" onChange={(e) => onInputChange(e)} value={formData.lastname} placeholder='Enter Your Last Name' />
                                    
                                    </InputGroup>
                                    <p style={{ color: "red" }}>{formerror.lastname}</p>
                                    </div>
                                    <div className='mb-1'>
                                    <PhoneInput
                                        country={'in'}
                                        placeholder="Enter your PhoneNumber"
                                        onChange={e => onInputChange2(e)}
                                        enableSearch="false"
                                        value={formDatamain.phnumber}
                                        inputStyle={styles}
                                    />
                                    </div>
                                <div className='mb-1'>
                                    <Label className='form-label' for='register-username'>
                                        Email
                                    </Label>
                                    <InputGroup className='input-group-merge mb-1'>
                                        <InputGroupText>
                                            <Mail size={15} />
                                        </InputGroupText>

                                        <Input type='email' name="email" onChange={(e) => onInputChange(e)} value={formData.email} placeholder='Enter Your Email Address Name' />
                                    
                                    </InputGroup>
                                        <p style={{color:"red"}}>{formerror.email}</p>
                                    </div>
                                    <div className='mb-1'>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='password'>
                                            Password
                                        </Label>
                                        <InputGroup className='input-group-merge mb-1'>
                                            {/*<InputGroupText>
                                                <Lock size={15} />
                                            </InputGroupText>*/}
                                            <InputPasswordToggle name="password" id='cpassword' onChange={(e) => onInputChange(e)} value={formData.password} placeholder='Enter Your Password' />
                                           
                                           
                                        </InputGroup>
                                        <p style={{ color: "red" }}>{formerror.password}</p>
                                    </div>
                                    <div className='mb-1'>
                                        <Label className='form-label' for='password'>
                                            Confirm Password
                                        </Label>
                                        <InputGroup className='input-group-merge mb-1'>
                                            
                                            <InputPasswordToggle  name="cpassword" id='cpassword' onChange={(e) => onInputChange(e)} placeholder='Enter Your Confirm Password' />
                                                   
                                        </InputGroup>
                                        <p style={{ color: "red" }}>{isError}</p>
                                    </div>
                                    
                                    </div>
                                    <div className='form-check mb-1'>

                                    <Input id='terms' type='checkbox' onChange={checkboxHandler} value={formData.terms} />

                                    <Label className='form-check-label' style={agree ? null : { color: "red" }} for='terms'>
                                            I agree to
                                            <a className='ms-25' href='/' onClick={e => e.preventDefault()}>
                                                privacy policy & terms
                                            </a>
                                        </Label>
                                    </div>
                                {agree ? <Button disabled={!agree}  type='Submit' color='primary' >
                                    {loading ? <Spinner size="sm" color="light" /> : "Register"}
                                </Button> : <Button disabled={!agree} type='submit' color='danger' >
                                    Register
                                </Button>}
                                    {/*<Button type='submit' onClick={() => handleFormSubmit()} color='primary'>
                                    {loading ? <Spinner size="sm" color="light" /> : "Register"}
                                    </Button>*/}
                            </Form>


                                <p className='text-center mt-2'>
                                    <span className='me-25'>Already have an account?</span>
                                    <Link to='/login'>
                                        <span>Sign in instead</span>
                                    </Link>
                                </p>
                                
                            </Col>
                        </Col>
                    </Row>
            </div> : < div className='auth-wrapper auth-cover' >
                <Row className='auth-inner m-0'>
                        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
                            <img src={"logomounts.png"} />
                            {/* <h2 className='brand-text text-primary ms-1'>Mounts</h2>*/}
                        </Link>
                        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
                            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
                                <img className='img-fluid' src={source} alt='Login Cover' />
                            </div>
                        </Col>
                        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
                            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
                                <CardTitle tag='h2' className='fw-bold mb-1'>
                                    VERIFY OTP
                                </CardTitle>
                                <p>OTP is Sent to <b style={{ color: 'forestgreen' }}>{formDatamain.phnumber}</b> Please type that OTP to proceed Further </p>

                                <Form className='auth-register-form mt-2' onSubmit={handleSubmit(onSubmitOTP)}>
                                   
                                    <div className='mb-1'>
                                        <Label className='form-label' for='register-username'>
                                            Enter Your OTP
                                        </Label>
                                        {invalid ? <h5 style={{ color: "red" }} >Invalid OTP!!</h5> : null}
                                        <Input type="text" id="otp"
                                            name="otp" onChange={e => onInputChange3(e)} placeholder='Enter Your OTP' />
                                    </div>
                                    <Button type='submit' onClick={() => onSubmitOTP()} color='primary'>
                                        {loading2 ? <Spinner size="sm" color="light" type="grow" /> : "Verify"}
                                    </Button>
                                </Form>
                                    <Button type='submit' color='danger' onClick={() => window.location.reload()}>
                                        <strong>Cancel</strong>
                                    </Button>
                            </Col>
                        </Col>
                    </Row></div>}
  </>
  )
}

export default Register
