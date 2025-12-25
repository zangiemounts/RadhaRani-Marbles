// ** React Imports
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { PlusCircle } from "react-feather"
// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label, Modal, Form, Spinner, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
// ** swal
import Swal from 'sweetalert2'


// ** Function to capitalize the first letter of string
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)


const AddEstimateSidebar = props => {
    // ** Props
    const { open, handleTaskSidebar, usertypes } = props
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
        setError,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: { title: '' }
    })

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

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitForm = async () => {


        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            PhoneNo: formData.OrgPhoneno,
            LoginName: formData.OrgPhoneno,
            Apikey2: "Success",
            FirstName: formData.OrgName,
            LastName: formData.lastName,
            UserRoleId: usertypes === "customer" ? Number(16) : Number(17),
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
                    handleTaskSidebar(!open)
                })


    }

    return (
        <Modal
            isOpen={open}
            toggle={handleTaskSidebar}
            className='sidebar-lg'
            contentClassName='p-0'
            modalClassName='modal-slide-in sidebar-todo-modal'
        >
            <Card>
                <CardBody className='py-2 my-25' >

                    <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='firstName'>
                                    <b> Name</b>
                                </Label>
                                <Input id='OrgName' name='OrgName' value={formData.OrgName} onChange={(e) => onInputChange(e)}

                                    placeholder='eg: Radharani' />

                                {errors && errors.OrgName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='firstName'>
                                    <b>Address</b>
                                </Label>
                                <Input id='OrgName' name='lastName' value={formData.lastName} onChange={(e) => onInputChange(e)} placeholder="eg: '45-B Block Sector'" />

                                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>
                           
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='emailInput'>
                                    <b> Particulars</b>
                                </Label>
                                <Input id='OrgemailId' type='email' value={formData.OrgemailId} name='OrgemailId' onChange={(e) => onInputChange(e)} placeholder="e.g- 'Black 2'0 * 2'0'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='OrgPhoneno'>
                                    <b>  Quantity</b>
                                </Label>
                                <Input id='OrgPhoneno' type='number' value={formData.OrgPhoneno} name='OrgPhoneno' onChange={(e) => onInputChange(e)} placeholder="e.g: '500'"/>
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='address'>
                                <b> Rate/Sqft</b>
                                </Label>
                                <Input id='orgAddress' type="text" name='orgAddress' value={formData.orgAddress} onChange={(e) => onInputChange(e)} placeholder="e.g: '1200'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    <b>  Amount</b>
                                </Label>
                                <Input id='orgAddress2' type="text" name='orgAddress2' value={formData.orgAddress2} onChange={(e) => onInputChange(e)} placeholder="e.g: 'Rs. 1700'" />
                            </Col>
                            
                            <Col className='mt-2' sm='12'>
                                <Button type='submit' onClick={() => submitForm()} className='me-1' color='success'>
                                    <PlusCircle size={20}/> Add Estimate
                                </Button>

                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Modal>
    )
}

export default AddEstimateSidebar
