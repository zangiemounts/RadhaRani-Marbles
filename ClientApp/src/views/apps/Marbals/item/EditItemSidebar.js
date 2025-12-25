// ** React Imports
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { PlusCircle, X } from "react-feather"
// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label, Modal, Form, Spinner, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
// ** swal
import Swal from 'sweetalert2'


// ** Function to capitalize the first letter of string
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)


const EditItemSidebar = props => {
    // ** Props
    const { open, handleTaskSidebar, data, setapiRefresh,
        apiRefresh } = props
    
    const [formData, setFormData] = useState({
        lotno: data?.productDetails?.productName,
        size: data.sku,
        thikness: data?.unit,
        qunatity: data?.currentStock,
        price: data?.salesCost,
        gst: data?.discountPercentage

    })
    const [usertype, setusertype] = useState(data?.unitType)
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

    const countryOptions = [
        { value: 'select', label: 'Select' },
        { value: 'Box', label: 'Box' },
        { value: 'Pieces', label: 'Pieces' },
        { value: 'SQFT', label: 'SQFT' }
    ]

    const onSubmitData = async () => {


        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            OrganizationProductDetailsId: Number(data.organizationProductDetailsId),
            ProductName: formData.lotno,
            Sku: formData.size,
            Unit: formData.thikness,
            CurrentStock: Number(formData.qunatity),
            SalesCost: Number(formData.price),
            UnitType: usertype,
            DiscountPercentage: Number(formData.gst)
        }
        //console.log("SendData: ", sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Editproduct`, {
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
                   //console.log("RES: ", data)
                    if (data === "Done") {
                        setFormData({ ...formData, lotno: "", size: "", thikness: "", qunatity: "", price: "", gst: "" })
                        handleTaskSidebar(!open)
                        Swal.fire({
                            title: "Item Added",
                            text: "Item Updated Successfully",
                            icon: "success"
                        })
                        setapiRefresh(!apiRefresh)
                    } else {
                        setFormData({ ...formData, lotno: "", size: "", thikness: "", qunatity: "", price: "", gst: "" })
                        Swal.fire({
                            title: "Duplicate Lot No",
                            text: "Something went wrong",
                            icon: "error"
                        })
                    }
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
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Edit Items</CardTitle>
                </CardHeader>
                <CardBody className='py-2 my-25'>

                    <Form className=' pt-50' onSubmit={handleSubmit(onSubmit)}>
                        <Row>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='firstName'>
                                    <b>Lot No.</b>
                                </Label>
                                <Input id='lotno' name='lotno' disabled onChange={(e) => onInputChange(e)} defaultValue={data?.productDetails?.productName} placeholder="e.g: 'BLACK STONE- 2'0" />

                                {errors && errors.lotno && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='lastName'>
                                    <b>Size</b>
                                </Label>

                                <Input id='size' name="size" placeholder="e.g: '12*12'" onChange={(e) => onInputChange(e)} defaultValue={data?.sku} />

                                {errors.size && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='emailInput'>
                                    <b>Thikness</b>
                                </Label>
                                <Input id='thikness' type='text' name='thikness' onChange={(e) => onInputChange(e)} placeholder="e.g: '2*2'" defaultValue={data?.unit} />
                            </Col>

                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    <b>Quantity</b>
                                </Label>
                                <Input id='qunatity' name='qunatity' onChange={(e) => onInputChange(e)} defaultValue={data?.currentStock} placeholder="e.g: '2196.00 SQF'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    <b>Price</b>
                                </Label>
                                <Input id='price' name='price' onChange={(e) => onInputChange(e)} defaultValue={data?.salesCost} placeholder="e.g: 'Rs. 1520'" />
                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='Orgtype'>
                                    <b>Type</b>
                                </Label>
                                <Select
                                    id='Orgtype'
                                    isClearable={false}
                                    onChange={(e) => setusertype(e.value)}
                                    className='react-select'
                                    classNamePrefix='select'
                                    Value={data?.unitType}
                                    options={countryOptions}
                                    theme={selectThemeColors}
                                    defaultValue={countryOptions[0]}
                                />

                            </Col>
                            <Col sm='12' className='mb-1'>
                                <Label className='form-label' for='address'>
                                    <b>Tax (GST)</b>
                                </Label>
                                <Input id='gst' name='gst' onChange={(e) => onInputChange(e)} defaultValue={data?.discountPercentage} placeholder="e.g: '15%'" />
                            </Col>


                            <Col className='mt-2' sm='12'>
                                <Button type='submit' onClick={() => onSubmitData()} className='me-1' color='success'>
                                  <PlusCircle/>  Edit Item
                                </Button>
                                <Button color='danger' onClick={() => handleTaskSidebar(!open)}>
                                  <X/>  Cancel
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </CardBody>

            </Card>
        </Modal>
    )
}

export default EditItemSidebar
