// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'
import axios from "axios"
import Swal from 'sweetalert2'
// ** Reactstrap Imports
import InputPasswordToggle from '@components/input-password-toggle'
import { Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Form, Card, Input, Spinner, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import { FilePlus, Upload, Folder, Loader } from "react-feather"

const AccountTabs = ({ data }) => {
  // ** Hooks
  const defaultValues = {
    lastName: '',
    firstName: data.fullName.split(' ')[0]
  }
    const userAvatar = defaultAvatar
  const {
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })
    const initialFieldValues = {
        imageName: "",
        imageSrc: "",
        imageFile: null
    }
  // ** States
    const [isError, setisError] = useState('')
    const [formModal, setFormModal] = useState(false)
    const [show, Setshow] = useState(false)
    const [load, setload] = useState(false)
    const [values, setValues] = useState(initialFieldValues)
   // console.log(values)
    const [Data, setData] = useState([])
    const onChange = e => {
        Setshow(true)
        if (e.target.files && e.target.files[0]) {
            const imageFile = e.target.files[0]
            const reader = new FileReader()
            reader.onload = (x) => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }

            reader.readAsDataURL(imageFile)
        } else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: ""
            })
        }
    }
    

  const onSubmit = data => {
    if (Object.values(data).every(field => field.length > 0)) {
      return null
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
    const onFormCancel = () => {
        setFormModal(!formModal)
       
    }
 const [formData, setFormData] = useState({
        firstName : '',
        lastName : '',
        emailId : '',
        orgAddress : '',
        orgState : '',
        userPin : 0,
        orgCountry : '',
        userdata : [],
        userdata2 : []
 })
    const [formmain, setformmain] = useState({
        password: '',
        cpassword: ''
        })

    /*FormdataUpdate*/
    const onSubmitData = async () => {
       
        const sendData = {
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
       
            EmailId: formData.emailId,
            FirstName: formData.firstName,
            LastName: formData.lastName,
            OrgAddress: formData.orgAddress,
            OrgState: formData.orgState,
            OrgCountry: formData.orgCountry,
            UserPin: formData.userPin === undefined || formData.userPin === null ? 0 : Number(formData.userPin)

        }
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/UpdateUserDetails`, {
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
                    Swal.fire({
                        icon: "success",
                        title: "Update",
                        text: "Data Updated Successfully",
                        focusConfirm: false
                    })

                })
    }

    /*Passwordupdate*/
    const onFormSubmit = async (data) => {

        /*console.log(data)*/

        /*setLoading(true)*/


        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            Password: formmain.cpassword

        }
        console.log(sendData)

        await fetch('https://n4nairmatrimonyapi.azurewebsites.net/api/Data/Updatepass', {
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
                    console.log("Dtaa", data)
                    /*setLoading(false)*/
                    onFormCancel()
                    if (data === "Done") {
                        Swal.fire({
                            icon: "success",
                            title: "Done",
                            text: "Password Updated Successfully",
                            focusConfirm: false
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

    //UserData
    const getData = async () => {
        try {
            localStorage.setItem('urlPath', window.location.pathname)
            const sendData2 = {
                OrgId: Number(localStorage.getItem("orgId")),
                UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId'))
            }

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
                        setFormData(data)
                        //console.log(data)
                    })
        } catch (error) {
            Swal.fire("Error!", "Something went wrong. Please try again later", "error")
        }

    }

    //ImageUpload on Server
    const ImageUpload = async () => {
        Setshow(true)
        setload(true)
        const sendData = {
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            OrgId: Number(localStorage.getItem("orgId")),
            WebHeader:"Profileimage",
            Data: values.imageFile
        }
        console.log(sendData)

        axios.post('https://mountsfileupload.azurewebsites.net/api/FileUpload/SendFiles', sendData, {

            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                if (response.statusText === "OK") {
                    setload(false)
                    Swal.fire({
                        icon: "success",
                        title: "Update",
                        text: "Image Updated Successfully",
                        focusConfirm: false
                    })
                } else {
                    alert('Failed To Upload')
                }
            })
    }

    //Image Retrive
    const ImageData = async () => {
        try {
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
                        if (data.length > 0) {
                            setData(data[0])
                        } else {
                            Setshow(false)
                        }

                    })
        } catch (error) {
            Swal.fire("Error!", "Something went wrong. Please try again later", "error")
        }

    }

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onInputChange1 = (e) => {
        setformmain({ ...formmain, [e.target.name]: e.target.value })
       
    }
    useEffect(() => {
        if ((formmain.cpassword) !== (formmain.password)) {
            setisError('Password and Confirm Password should be same')
        } else {
            setisError('')
        }
    }, [formmain.password, formmain.cpassword])
    

    useEffect(() => {
        getData()
        ImageData()
    }, [])


return (
    <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
          <CardTitle tag='h4'>Profile Details</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25'>
          <div className='d-flex'>
                    <div className='me-25'>
                        <img className='rounded me-50' src={show ? values.imageSrc : (Data.length === 0 ? defaultAvatar : `https://mountsfileupload.azurewebsites.net/api/FileUpload/${Data.logoImage2}`)} alt='Upload your Image' height='100' width='100' ></img>
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='success'>
                 <Folder size={15}/> Select
                  <Input type='file' onChange={onChange} accept="image/png, image/gif, image/jpeg" hidden  />
                     </Button>
                  <Button tag={Label} onClick={() => ImageUpload()} className='mb-75 me-75' size='sm' color='primary'>
                  <Upload size={15}/> {load ? <Spinner size="sm" color="light" /> : "Upload"}
                </Button>
                {/*<Button className='mb-75' color='secondary' size='sm' outline onClick={handleImgReset}>
                  Reset
                </Button>*/}
                <p className='mb-0'>Allowed JPG, GIF or PNG.</p>
              </div>
            </div>
          </div>
          <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='firstName'>
                  First Name
                </Label>
                    <Input id='firstName' name='firstName' onChange={(e) => onInputChange(e)} defaultValue={formData.firstName} placeholder='First Name' />
                
                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='lastName'>
                  Last Name
                </Label>
                
                    <Input id='lastName' name="lastName" placeholder='lastName' onChange={(e) => onInputChange(e)} defaultValue={formData.lastName} />
                 
                {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='emailInput'>
                  E-mail
                </Label>
                <Input id='emailInput' type='email' name='emailId' onChange={(e) => onInputChange(e)} placeholder='Example@gmail.com' defaultValue={formData.emailId} />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='phNumber' style = {{marginTop:"10px"}}>
                  Phone Number
                </Label>
                <h4>{formData.phoneNo}</h4>
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='address'>
                  Address
                </Label>
                 <Input id='address' name='orgAddress' onChange={(e) => onInputChange(e)}  defaultValue={formData.address1} placeholder='12, Business Park' />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='accountState'>
                  State
                </Label>
                 <Input id='accountState' name='orgState' placeholder="EX- Delhi" onChange={(e) => onInputChange(e)}  defaultValue={formData.state}  />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='zipCode'>
                  Country
                </Label>
                 <Input id='accountState' name='orgCountry' placeholder="EX- Bharat" onChange={(e) => onInputChange(e)}  defaultValue={formData.country} />
              </Col>
              <Col sm='6' className='mb-1'>
               <Label className='form-label' for='zipCode'>
                  Zip Code
                </Label>
                <Input id='zipCode' name='userPin' onChange={(e) => onInputChange(e)}  defaultValue={formData.pincode} placeholder='EX- 110000' maxLength='6' />
             
              </Col>
             
              <Col className='mt-2' sm='12'>
                <Button type='submit' onClick={() => onSubmitData()} className='me-1' color='primary'>
                 <FilePlus /> Save changes
                </Button>
                  <Button type='submit' onClick={() => setFormModal(!formModal)} className='me-1' color='success'>
                   <Loader/>   Update Password
               </Button>
              </Col>
                       
            </Row>
          </Form>
        </CardBody>
        </Card>
        <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
            <ModalHeader toggle={() => setFormModal(!formModal)}>Update Password</ModalHeader>
            <ModalBody>
                <div className='mb-2'>
                    <Label className='form-label' for='password'>
                        Password:
                    </Label>
                    <InputPasswordToggle className='mb-2' name="password" onChange={(e) => onInputChange1(e)} label='Password' htmlFor='basic-default-password' />
                </div>
                <div className='mb-2'>
               
                    <Label className='form-label' for='password'>
                        Confirm Password:
                    </Label>

                   <Label className='form-label' style={{ position: 'absolute', top: 95, color: 'red' }} for='password'>{isError}</Label>

                    <InputPasswordToggle name="cpassword" id='cpassword' onChange={(e) => onInputChange1(e)} placeholder='Enter Your Confirm Password' />
                </div>
            </ModalBody>
            <ModalFooter>
                {isError === '' ? <Button color='primary' onClick={() => onFormSubmit()}>
                    <FilePlus /> Update
                </Button> : null}
            </ModalFooter>
        </Modal>
    </Fragment>
  )
}

export default AccountTabs
