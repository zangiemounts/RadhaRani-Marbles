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


const AddVechileContractorSidebar = props => {
    // ** Props
    const { open, handleTaskSidebar, setdataRefresh } = props
    const [formData, setFormData] = useState({
        contractorName: '',
        vechileNo: '',
        materialReport: '',
        billStatus: '',
        cost: ''
    })
    const [IsLoading, setIsLoading] = useState(false)
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
        setdataRefresh(false)
        setIsLoading(true)
        const sendData = {
            CatgId: Number(65),
            GroupOrderdata: Number(localStorage.getItem("orgId")),
            CatgType: formData.contractorName,
            CatgDesc: formData.contractorName
            
        }
       // console.log(sendData)


        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/AddTruck`, {
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
                    setFormData({ ...formData, vechileNo: "", contractorName: "", materialReport: "", cost: "", billStatus: "" })
                    if (data === "Done") {
                        Swal.fire({
                            icon: 'success',
                            title: 'Added',
                            text: 'Vehicle Added Successfully'
                        })
                    }
                    handleTaskSidebar(!open)
                    setdataRefresh(true)
                    setIsLoading(false)
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
                                   <b> Contractor Name. </b>
                                </Label>
                                <Input id='contractorName' name='contractorName' onChange={(e) => onInputChange(e)} placeholder="e.g: 'Varun Arora'" />

                                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>
                          
                           
                            <Col className='mt-2' sm='12'>
                                {!IsLoading ? <Button type='submit' onClick={() => submitForm()} className='me-1' color='success'>
                                    <PlusCircle size={20} /> Add Vechile
                                </Button> : <Button color='success' disabled>
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

export default AddVechileContractorSidebar
