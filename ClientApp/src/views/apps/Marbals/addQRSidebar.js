// ** React Imports
import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { PlusCircle } from "react-feather"
// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label, Modal, Form, Badge, FormFeedback } from 'reactstrap'
import Select from 'react-select'


const AddQRSidebar = props => {
    // ** Props
    const { open, handleTaskSidebar, QRData } = props

    const [selectedOption, setSelectedOption] = useState(null)
    const [selectedProducts, setSelectedProducts] = useState([])
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
    const options = QRData.map(({ productDetails, organizationProductDetailsId }) => ({
        
        value: organizationProductDetailsId,
        label: productDetails.productName
    }))

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption)
    }

    const handleAddProduct = () => {
        if (selectedOption) {
            setSelectedProducts([...selectedProducts, selectedOption])
            setSelectedOption(null)
        }
    }

    const handlePrint = () => {
        const selectedProductIds = selectedProducts.map((product) => product.value)
        //console.log(selectedProductIds)
        sessionStorage.setItem('SelectedProducts', JSON.stringify(selectedProductIds))
        window.location.pathname = '/marbelQRMultipleDownload'
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
                                   <b> Search Lot No. for QR </b>
                                </Label>
                                {/*<Input id='OrgName' name='lastName' value={formData.lastName} onChange={(e) => onInputChange(e)} placeholder="e.g: 'Singh'" />*/}

                                <Select
                                    value={selectedOption}
                                    onChange={handleChange}
                                    options={options}
                                    isSearchable
                                    placeholder="Search Lot No..."
                                />
                                {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                            </Col>
                            <Col>
                                <Button color="warning" onClick={handleAddProduct}>Add Product</Button>
                                <div className="mt-2">
                                    {selectedProducts.map((product, index) => (
                                        <div key={index} className="m-1">
                                            <Badge color="info">{product.label}</Badge>
                                            {/*<span> ({product.value})</span>*/}
                                        </div>
                                    ))}
                                </div>
                            </Col>
                            <Col className='mt-2' sm='12'>
                                {selectedProducts.length > 0 && (< Button type='submit' onClick={() => handlePrint()} className='me-1' color='success'>
                                    <PlusCircle size={20} /> Generate QR
                                </Button>)}

                            </Col>
                        </Row>
                    </Form>
                </CardBody>
            </Card>
        </Modal>
    )
}

export default AddQRSidebar
