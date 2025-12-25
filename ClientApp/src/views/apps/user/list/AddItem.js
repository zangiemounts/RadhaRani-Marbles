// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import 'cleave.js/dist/addons/cleave-phone.us'
import axios from "axios"
// ** Utils
import { useDropzone } from 'react-dropzone'
import { ChevronDown, FileText, X, DownloadCloud, Plus, Grid, Copy, MoreVertical, Archive, Trash2 } from 'react-feather'
// ** Reactstrap Imports
import { Row, Col, Collapse, Form, Card, Input, Spinner, Label, Button, CardBody, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
/*import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'*/
const AddItem = () => {

    const {
        handleSubmit,
        formState: { errors }
    } = useForm({})
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const [formData, setFormData] = useState({
        lotno: '',
        size: '',
        thikness: '',
        qunatity: '',
        price: '',
        gst: ''

    })

    const [formDataa, setFormDataa] = useState({
        phoneno: ''


    })

    const toggle = () => setIsOpen(!isOpen)
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData)
    }
    const onInputChange2 = (e) => {
        setFormDataa({ ...formDataa, ["phoneno"]: e })
    }
    const onSubmitData = async () => {


        const sendData = {
            WebHeader: "Marbels",
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            MainDesc: formData.lotno,
            ColumRemarks: formData.size,
            URLImage1: formData.thikness,
            URLImage2: formData.qunatity,
            Value: Number(formData.price),
            URLImage4: formData.gst
        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/AddMarbal`, {
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


    const styles = {
        width: "100%",

        fontSize: 18,
        height: "2em"
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
    const onDiscard = () => {
        setShow(false)
    }
    const onDiscard1 = () => {
        setShow1(false)
    }

    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
        }
    })

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    return (
        <>

            <Fragment>
                <Button className='mb-2 mx-2' color='success' onClick={toggle}>
                    Add Data
                </Button>
                <Collapse isOpen={isOpen}>

                    <Card>
                        <CardHeader className='border-bottom'>
                            <CardTitle tag='h4'>Data</CardTitle>
                        </CardHeader>
                        <CardBody className='py-2 my-25'>

                            <Form className=' pt-50' onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col sm='12' className='mb-1'>
                                        <Label className='form-label' for='firstName'>
                                            Lot No.
                                        </Label>
                                        <Input id='lotno' name='lotno' onChange={(e) => onInputChange(e)} defaultValue={formData.firstName} placeholder='Lot No' />

                                        {errors && errors.lotno && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                                    </Col>
                                    <Col sm='12' className='mb-1'>
                                        <Label className='form-label' for='lastName'>
                                            Size
                                        </Label>

                                        <Input id='size' name="size" placeholder='Size' onChange={(e) => onInputChange(e)} defaultValue={formData.lastName} />

                                        {errors.size && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                                    </Col>
                                    <Col sm='12' className='mb-1'>
                                        <Label className='form-label' for='emailInput'>
                                            Thikness
                                        </Label>
                                        <Input id='thikness' type='text' name='thikness' onChange={(e) => onInputChange(e)} placeholder='Thikness' defaultValue={formData.email} />
                                    </Col>

                                    <Col sm='12' className='mb-1'>
                                        <Label className='form-label' for='address'>
                                            Quantity
                                        </Label>
                                        <Input id='qunatity' name='qunatity' onChange={(e) => onInputChange(e)} defaultValue={formData.address} placeholder='Quantity' />
                                    </Col>
                                    <Col sm='12' className='mb-1'>
                                        <Label className='form-label' for='address'>
                                            Price
                                        </Label>
                                        <Input id='price' name='price' onChange={(e) => onInputChange(e)} defaultValue={formData.address} placeholder='Price' />
                                    </Col>
                                    <Col sm='12' className='mb-1'>
                                        <Label className='form-label' for='address'>
                                            GST
                                        </Label>
                                        <Input id='gst' name='gst' onChange={(e) => onInputChange(e)} defaultValue={formData.address} placeholder='GST' />
                                    </Col>

                                    <Col className='mt-2' sm='12'>
                                        <Button type='submit' onClick={() => onSubmitData()} className='me-1' color='success'>
                                            Save changes
                                        </Button>
                                        <Button color='danger' onClick={() => onDiscard()}>
                                            Cancel
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </CardBody>

                    </Card>

                </Collapse>
            </Fragment>
        </>
    )
}

export default AddItem
