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

const BankDetails = ({ data }) => {
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
        orgIFSCcode: '',
        orgBankName: '',
        orgAccountNo: '',
        orgAltNumber: '',
        gstno: '',
        pannumber: '',
        hsnno: '',
        bankaddress: '',
        bankstate: '',
        bankcountry: ''
    })
    const [Defcountry, setDefcountry] = useState("India")
    //Update Org Details
    const onSubmitData = async () => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            WebHeader: "OrganizationBankDetails",
            MainDesc: formData.orgBankName,
            ColumRemarks: formData.bankaddress, /*usedfor bank address*/
            Oremarks: formData.bankstate,
            Ocremarks: formData.bankcountry,
            DomainDesc: formData.pannumber,  /*usedfor pancard no*/
            Remarks: formData.hsnno,  /*usedfor hsn no*/
            Urlimage3: formData.orgIFSCcode,
            Urlimage5: formData.orgAccountNo,
            Apikey1: country
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
            webHeader: "OrganizationBankDetails"

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
    const getdata1 = async () => {
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
    /*   console.log(Defcountry)*/
    const onChangecon = e => {
        if (e.target.checked) {
            setcountry('International')
        } else {
            setcountry('India')
        }
    }

    const CustomLabel = ({ htmlFor }) => {

        return (
            <Label className='form-check-label' htmlFor={htmlFor}>
                <span className='switch-icon-left'>
                    <Check size={14} />
                </span>
                <span className='switch-icon-right'>
                    <X size={14} />
                </span>
            </Label>
        )
    }
    return (<>
        <Fragment>
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Organization Bank Details</CardTitle>
                   
                </CardHeader>
                <CardBody className='py-2 my-25' >
                    <div className='d-flex flex-column'>
                        <Label for='icon-primary' className='form-check-label mb-50'>
                            USD
                        </Label>
                        <div className='form-switch form-check-primary'>
                            <Input type='switch' id='icon-primary' onChange={(e) => onChangecon(e)} name='icon-primary' />
                            <CustomLabel htmlFor='icon-primary' />
                        </div>
                    </div>
                    <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='firstName'>
                                    Bank Name
                                </Label>
                                <Input id='orgBankName' name='orgBankName' onChange={(e) => onInputChange(e)} defaultValue={Data.mainDesc} placeholder='EX- HDFC BANK' />

                                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    Bank Address
                                </Label>
                                <Input id='bankaddress' type="text" name='bankaddress' onChange={(e) => onInputChange(e)} defaultValue={Data.columRemarks} placeholder='EX- 79A, New Delhi' />
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    Bank State
                                </Label>
                                <Input id='bankstate' type="text" name='bankstate' onChange={(e) => onInputChange(e)} defaultValue={Data.oremarks} placeholder='EX- Delhi' />
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    Bank Country
                                </Label>
                                <Input id='bankcountry' type="text" name='bankcountry' onChange={(e) => onInputChange(e)} defaultValue={Data.ocremarks} placeholder='EX- Bharat' />
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='accountState'>
                                    PAN No
                                </Label>
                                <Input id='pannumber' type="text" name='pannumber' onChange={(e) => onInputChange(e)} defaultValue={Data.domainDesc} placeholder="EX- ASPXXXXXX" />
                            </Col>
                            <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='zipCode'>
                                    HSN Code
                                </Label>
                                <Input id='hsnno' type="text" name='hsnno' onChange={(e) => onInputChange(e)} placeholder="EX- HSNXXXXXX" defaultValue={Data.remarks} />
                            </Col>
                         
                            {Data.apikey1 === 'International' ? <>  <Col sm='6' className='mb-1'>
                                <Label className='form-label' for='zipCode'>
                                    Organization Swift Code
                                </Label>
                                <Input id='orgIFSCcode' type="text" name='orgIFSCcode' onChange={(e) => onInputChange(e)} defaultValue={Data.urlimage3} placeholder="Organization Swift Code" />

                            </Col>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='zipCode'>
                                        Organization IBAN Number
                                    </Label>
                                    <Input id='orgAccountNo' type="number" name='orgAccountNo' onChange={(e) => onInputChange(e)} defaultValue={Data.urlimage5} placeholder="Organization IBAN Number" maxLength='13' />

                                </Col> </> : <><Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='zipCode'>
                                        {country === 'International' ? "Organization Swift Code" : "Organization IFSC Code"}
                                    </Label>
                                    <Input id='orgIFSCcode' type="text" name='orgIFSCcode' onChange={(e) => onInputChange(e)} defaultValue={Data.urlimage3} placeholder={country === 'International' ? "EX- HDFC00000" : "EX- HDFC00000"} />

                                </Col>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='zipCode'>
                                        {country === 'International' ? "Organization IBAN Number" : "Organization Account Number"}
                                    </Label>
                                    <Input id='orgAccountNo' type="number" name='orgAccountNo' onChange={(e) => onInputChange(e)} defaultValue={Data.urlimage5} placeholder={country === 'International' ? "EX- 00000000000" : "EX- 00000000000"} maxLength='13' />

                                </Col></>}
                           

                            <Col className='mt-2' sm='12'>
                                <Button type='submit' onClick={() => onSubmitData()} className='me-1' color='primary'>
                                    Save changes
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

export default BankDetails
