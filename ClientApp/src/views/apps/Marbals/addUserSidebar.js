// ** React Imports
import { Fragment, useEffect, useState } from 'react'

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


const AddUserSidebar = props => {
    // ** Props
    const { open, handleTaskSidebar, usertypes, setDataRefresh } = props
    const [formData, setFormData] = useState({
        OrgName: '',
        lastName: '',
        Orgtype: '',
        firmName: '',
        OrgemailId: '',
        OrgPhoneno: '',
        orgAddress: '',
        orgAddress2: '',
        orgState: '',
        OrgPin: '0',
        orgCountry: '',
        orgAltNumber: '',
        instructions: '',
        gstno: ''
    })

    const [IsLoading, setIsLoading] = useState(false)
    const [Architect, setArchitect] = useState(false)
    const [ArchitectName, setArchitectName] = useState(null)
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
        setIsLoading(true)
        setDataRefresh(false)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            PhoneNo: `91${formData.OrgPhoneno}`,
            LoginName: formData.OrgPhoneno,
            Apikey2: "Success",
            FirstName: formData.OrgName,
            LastName: formData.lastName,
            UserRoleId: usertypes === "customer" ? Number(16) : (usertypes === "architect" ? Number(17) : Number(90)),
            EmailId: formData.OrgemailId,
            RefUserId: usertypes === "customer" ? (ArchitectName > 0 ? Number(ArchitectName) : null) : null,
            Address1: formData.orgAddress,
            Address2: formData.orgAddress2,
            Answer2: formData.instructions,
            Pincode: formData.OrgPin === "" ? 0 : formData.OrgPin,
            Password: "123456",
            PageName: formData.firmName
            
        }
       // console.log(sendData)


        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Addusers`, {
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
                    //console.log(data)
                    setFormData({ ...formData, OrgName: "", lastName: "", orgAddress: "", orgAddress2: "", instructions: "", OrgPin: "", OrgPhoneno: "", OrgemailId: "" })
                    if (data.apikey2 === "Done") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Added',
                            text: 'Data Added Successfully'
                        })
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'User Exist',
                            text: 'This User is already exist'
                        })
                    }
                    handleTaskSidebar(!open)
                    setIsLoading(false)
                    setDataRefresh(true)
                })


    }

    const getArch = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            RoleCatId: Number(17)

        }
        //.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Getusers`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
                //console.log(response)
                setArchitect(response)
            })

    }

    useEffect(() => {
        getArch()
    }, [])
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
                                    <b> First Name </b>
                                </Label>
                                <Input id='OrgName' name='OrgName' value={formData.OrgName} onChange={(e) => onInputChange(e)}

                                    placeholder="e.g: 'Varun'" />

                                {errors && errors.OrgName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='firstName'>
                                   <b> Last Name </b>
                                </Label>
                                <Input id='OrgName' name='lastName' value={formData.lastName} onChange={(e) => onInputChange(e)} placeholder="e.g: 'Singh'" />

                                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>
                            {usertypes === "architect" && (<Col sm='12' className='mb-1'>
                                <Label className='form-label' for='firstName'>
                                    <b> Firm Name </b>
                                </Label>
                                <Input id='firmName' name='firmName' value={formData.firmName} onChange={(e) => onInputChange(e)} placeholder="e.g: 'firm Name'" />

                                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>)}
                            {usertypes === "customer" && <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='Orgtype'>
                                    <b> Select Architect</b>
                                </Label>
                                <Input
                                    type='select'
                                    id='rows-per-page'
                                    onChange={(e) => setArchitectName(e.target.value)}
                                    className='form-control '
                                >
                                    <option value='Select'>Select</option>
                                    {Architect.length > 0 ? Architect.map(({ userdata, userId }) => (
                                        <Fragment key={userId}>
                                            <option value={userdata.userId }>{userdata.firstName} {userdata.lastName}</option>
                                        </Fragment>
                                    )) : <option style={{ color: "red" }}>Please Update Architect</option>}
                                </Input>

                            </Col>}
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='emailInput'>
                                  <b>  E-mail </b>
                                </Label>
                                <Input id='OrgemailId' type='email' value={formData.OrgemailId} name='OrgemailId' onChange={(e) => onInputChange(e)} placeholder="e.g: 'example@gmail.com'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='OrgPhoneno'>
                                    <b> Phone Number </b>
                                </Label>
                                <Input id='OrgPhoneno' type='number' value={formData.OrgPhoneno} name='OrgPhoneno' onChange={(e) => onInputChange(e)} placeholder="e.g: '98XXXXXXXXX'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    <b> Address 1 </b>
                                </Label>
                                <Input id='orgAddress' type="text" name='orgAddress' value={formData.orgAddress} onChange={(e) => onInputChange(e)} placeholder="e.g: 'B-16 Jankpuri Delhi'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    <b> Address 2 </b>
                                </Label>
                                <Input id='orgAddress2' type="text" name='orgAddress2' value={formData.orgAddress2} onChange={(e) => onInputChange(e)} placeholder="e.g: 'B-16 Jankpuri Delhi'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='accountState'>
                                    <b>  Pin Code </b>
                                </Label>
                                <Input id='OrgPin' type="number" name='OrgPin' value={formData.OrgPin} onChange={(e) => onInputChange(e)} placeholder="e.g: '110000'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='zipCode'>
                                    <b> Instructions </b>
                                </Label>
                                <Input id='OrgPin' type="textarea" name='instructions' value={formData.instructions} onChange={(e) => onInputChange(e)} placeholder="e.g: 'This marbals is good'" />

                            </Col>
                            <Col className='mt-2' sm='12'>
                                {!IsLoading ? < Button type='submit' onClick={() => submitForm()} className='me-1' color='success'>
                                    <PlusCircle size={20} /> {usertypes === "customer" ? "Add Customer" : usertypes === "architect" ? "Add Architect" : "Add Employee"}
                                </Button> : <Button color='success'  disabled>
                                        <Spinner size='sm' type='grow' />
                                        <span className='ms-50'>Please wait...</span>
                                    </Button>}

                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Modal>
    )
}

export default AddUserSidebar
