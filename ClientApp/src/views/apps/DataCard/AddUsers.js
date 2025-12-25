import { Fragment, useState } from "react"
import { Row, Col, Collapse, Form, Card, Input, Spinner, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
import { useForm } from 'react-hook-form'
import { selectThemeColors } from '@utils'
import Select from 'react-select'

const AddUsers = () => {
    const defaultValues = {
        lastName: '',
        firstName: "Mounts"
    }

    const [isOpen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState({
        OrgName: '',
        lastName: '',
        Orgtype: '',
        OrgemailId: '',
        OrgPhoneno: '',
        orgAddress: '',
        orgAddress2: '',
        orgState: '',
        OrgPin: '',
        orgCountry: '',
        orgAltNumber: '',
        instructions: '',
        gstno: ''
    })
    const [usertype, setusertype] = useState(0)
    const countryOptions = [
        { value: 'select', label: 'Select' },
        { value: '16', label: 'Customer' },
        { value: '17', label: 'Sales Executive' }
    ]
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm()

    const onSubmit = (data) => {
            console.log(data)
    }

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitForm2 = () => {
        setFormData({ ...formData, OrgName: "", lastName: "", orgAddress: "", orgAddress2: "", instructions: "", OrgPin: "", OrgPhoneno: "", OrgemailId:"" })
    }

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
                    setFormData({ ...formData, OrgName: "", lastName: "", orgAddress: "", orgAddress2: "", instructions: "", OrgPin: "", OrgPhoneno: "", OrgemailId: "" })
                    setIsOpen(!open)
                })


    }

    return (
        <Fragment>
           <Button className='mb-2 mx-2' color='success' onClick={() => setIsOpen(!isOpen)}>
                Add Data
            </Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody className='py-2 my-25' >
                        
                        <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
                            <Row>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='firstName'>
                                        First Name
                                    </Label>
                                    <Input id='OrgName' name='OrgName' value={formData.OrgName} onChange={(e) => onInputChange(e)}
                                       
                                        placeholder='Please Enter First Name' />

                                    {errors && errors.OrgName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                                </Col>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='firstName'>
                                        Last Name
                                    </Label>
                                    <Input id='OrgName' name='lastName' value={formData.lastName} onChange={(e) => onInputChange(e)} placeholder='Please Enter Last Name' />

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
                                    <Input id='OrgemailId' type='email' value={formData.OrgemailId} name='OrgemailId' onChange={(e) => onInputChange(e)} placeholder='Enter Email' />
                                </Col>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='OrgPhoneno'>
                                        Phone Number
                                    </Label>
                                    <Input id='OrgPhoneno' type='number' value={formData.OrgPhoneno} name='OrgPhoneno' onChange={(e) => onInputChange(e)} placeholder='Enter Phone Number' />
                                </Col>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='address'>
                                        Address 1
                                    </Label>
                                    <Input id='orgAddress' type="text" name='orgAddress' value={formData.orgAddress} onChange={(e) => onInputChange(e)} placeholder='Enter Address 1' />
                                </Col>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='address'>
                                        Address 2
                                    </Label>
                                    <Input id='orgAddress2' type="text" name='orgAddress2' value={formData.orgAddress2} onChange={(e) => onInputChange(e)} placeholder='Enter Address 2' />
                                </Col>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='accountState'>
                                        Pin Code
                                    </Label>
                                    <Input id='OrgPin' type="number" name='OrgPin' value={formData.OrgPin} onChange={(e) => onInputChange(e)} placeholder="Enter Pincode" />
                                </Col>
                                <Col sm='6' className='mb-1'>
                                    <Label className='form-label' for='zipCode'>
                                        Instructions
                                    </Label>
                                    <Input id='OrgPin' type="textarea" name='instructions' value={formData.instructions} onChange={(e) => onInputChange(e)} placeholder='Special Instructions' />

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
            </Collapse>
        </Fragment>
    )
}
export default AddUsers