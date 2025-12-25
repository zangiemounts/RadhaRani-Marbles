// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'
import axios from "axios"
import Swal from 'sweetalert2'
// ** Reactstrap Imports
import { Row, Col, Form, Card, Input, Spinner, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
import { Check, X } from 'react-feather'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
const AddUsers = ({ data }) => {
  // ** Hooks
  const defaultValues = {
    lastName: '',
    firstName: data.fullName.split(' ')[0]
  }

  const initialFieldValues = {
        imageName: "",
        imageSrc: "",
        imageFile: null
  }
   const userAvatar = defaultAvatar
  const {
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({ defaultValues })

  // ** States
    const [values, setValues] = useState(initialFieldValues)
    const [show, Setshow] = useState(false)
    const [load, setload] = useState(false)
    const [country, setcountry] = useState("India")
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
   
 const [Data, setData] = useState([])
 const [formData, setFormData] = useState({
        OrgName : '',
        lastName : '',
        Orgtype : '',
        OrgemailId : '',
        OrgPhoneno : '',
        orgAddress : '',
        orgAddress2 : '',
        orgState : '',
        OrgPin : '',
        orgCountry : '',
        orgAltNumber : '',
        instructions : '',
        gstno : ''
 })
    const [usertype, setusertype] = useState(0)
    const [Defcountry, setDefcountry] = useState("India")
    //Update Org Details
    const countryOptions = [
        { value: 'select', label: 'Select' },
        { value: '16', label: 'Customer' },
        { value: '17', label: 'Sales Executive' }
    ]

    const submitForm = async () => {


        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            PhoneNo: formData.OrgPhoneno,
            LoginName: formData.OrgPhoneno,
            Apikey2: "Success",
            FirstName: formData.OrgName,
            LastName: formData.lastName,
            UserRoleId: Number(usertype),
            Email: formData.OrgemailId,
            Address1: formData.orgAddress,
            Address2: formData.orgAddress2,
            Answer2: formData.instructions,
            Pincode: formData.OrgPin,
            Password: "123456"
        }
        console.log(sendData)


        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/AddUsers`, {
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

                })


    }

    const onSubmitData = async () => {
       
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            WebHeader: "OrganizationDetails",
            MainDesc: formData.OrgName,
            ColumRemarks: formData.Orgtype,
            Oremarks: formData.OrgemailId,  
            Ocremarks: formData.OrgPhoneno,
            DomainDesc: formData.orgAddress,
            Remarks: formData.OrgPin,
            Urlimage1: formData.orgState,
            Urlimage2: formData.orgCountry,
            Urlimage6: formData.orgAltNumber,
            ApiKey1: formData.gstno   /*usedfor gst no*/
        
        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/OrgDetails`, {
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
                    Swal.fire({
                        icon: "success",
                        title: "Update",
                        text: "Data Updated Successfully",
                        focusConfirm: false
                    })

                })
    }

    //Retrive Org Detail include Image
    const getData = async () => {
        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            webHeader: "OrganizationDetails"

        }

        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getmultipledata`, {
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
                    console.log(data)
                    if (data.length > 0) {
                        setData(data[0])
                        setDefcountry(data[0].apikey1.toString())
                        //console.log(data[0].apikey1.toString())              
                    } else {
                        Setshow(false)
                    }
                })

    }
   
    //Image Upload
    const ImageUpload = async () => {
        Setshow(true)
        setload(true)
        const sendData = {
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            OrgId: Number(localStorage.getItem("orgId")),
            WebHeader: "OrganizationDetails",
            Data: values.imageFile
        }

        axios.post('https://mountsfileupload.azurewebsites.net/api/FileUpload/SendFiles', sendData, {

            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                //console.log(response.statusText)
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

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    useEffect(() => {
        getData()
    }, [])


  return (<>
      <Fragment>
      <Card>
        <CardHeader className='border-bottom'>
         <CardTitle tag='h4'>Add Users</CardTitle>
        </CardHeader>
        <CardBody className='py-2 my-25' >
          <div className='d-flex'>
            <div className='me-25'>
              <img className='rounded me-50' src={show ? values.imageSrc : (Data.length === 0 ? userAvatar : `https://mountsfileupload.azurewebsites.net/api/FileUpload/${Data.logoImage2}`)} alt='Generic placeholder image' height='100' width='100' ></img>
            </div>
            <div className='d-flex align-items-end mt-75 ms-1'>
              <div>
                <Button tag={Label} className='mb-75 me-75' size='sm' color='success'>
                  Select
                  <Input type='file' onChange={onChange} hidden accept="image/png, image/gif, image/jpeg" />
                </Button>
                  <Button tag={Label} onClick={() => ImageUpload()} className='mb-75 me-75' size='sm' color='primary'>
                      {load ? <Spinner size="sm" color="light" /> : "Upload"}
                   </Button>
               
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
                    <Input id='OrgName' name='OrgName' onChange={(e) => onInputChange(e)} placeholder='Please Enter First Name' />
                
                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='firstName'>
                  Last Name
                </Label>
                    <Input id='OrgName' name='lastName' onChange={(e) => onInputChange(e)} placeholder='Please Enter Last Name' />
                
                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='Orgtype'>
                  Type
                </Label>
                <Select
                  id='Orgtype'
                  isClearable={false}
                   onChange={(e) => setusertype(e.value)}
                  className='react-select'
                  classNamePrefix='select'
                  options={countryOptions}
                  theme={selectThemeColors}
                  defaultValue={countryOptions[0]}
                />
                    
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='emailInput'>
                  E-mail
                </Label>
                <Input id='OrgemailId' type='email' name='OrgemailId' onChange={(e) => onInputChange(e)} placeholder='Enter Email' />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='OrgPhoneno'>
                  Phone Number
                </Label>
               <Input id='OrgPhoneno' type='number' name='OrgPhoneno' onChange={(e) => onInputChange(e)} placeholder='Enter Phone Number' />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='address'>
                  Address 1
                </Label>
                 <Input id='orgAddress' type="text" name='orgAddress' onChange={(e) => onInputChange(e)} placeholder='Enter Address 1' />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='address'>
                  Address 2
                </Label>
                 <Input id='orgAddress2' type="text" name='orgAddress2' onChange={(e) => onInputChange(e)} placeholder='Enter Address 2' />
              </Col>
              <Col sm='6' className='mb-1'>
                <Label className='form-label' for='accountState'>
                  Pin Code
                </Label>
                 <Input id='OrgPin' type="number" name='OrgPin' onChange={(e) => onInputChange(e)} placeholder="Enter Pincode"/>
              </Col>
              <Col sm='6' className='mb-1'>
               <Label className='form-label' for='zipCode'>
                 Instructions
                </Label>
                <Input id='OrgPin' type="textarea" name='instructions' onChange={(e) => onInputChange(e)}  placeholder='Special Instructions'  />
             
              </Col>
                   <Col className='mt-2' sm='12'>
                     <Button type='submit' onClick={() => submitForm()} className='me-1' color='primary'>
                 Add User
                </Button>
                
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      </Fragment>
  </>
  )
}

export default AddUsers
