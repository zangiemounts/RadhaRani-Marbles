// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import axios from "axios"
import Swal from 'sweetalert2'
// ** Reactstrap Imports
import { Card, CardImg, CardTitle, CardBody, CardImgOverlay, Spinner, CardHeader, CardText, Row, Col, Label, Button, Input } from 'reactstrap'
import { FilePlus, Upload, Folder, Loader } from "react-feather"
// ** Images
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import img1 from '@src/assets/images/slider/06.jpg'
import img2 from '@src/assets/images/slider/09.jpg'
import img3 from '@src/assets/images/slider/10.jpg'
import AddImages from './addImages'
import DynamicPagination from '../../DataCard/DynamicPagination'

const Images = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [perpage, setperpage] = useState(3)
    const [onSearchText, setSearchText] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [ImageData, setImageData] = useState([])
    const [show, Setshow] = useState(false)
    const [load, setload] = useState(false)
    const initialFieldValues = {
        imageName: "",
        imageSrc: "",
        imageFile: null
    }
    const [values, setValues] = useState(initialFieldValues)

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

    const ImageUpload = async () => {
        Setshow(true)
        setload(true)
        const sendData = {
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            OrgId: Number(localStorage.getItem("orgId")),
            Value: Number(sessionStorage.getItem("ProductImageId")),
            WebHeader: "ProductImage",
            Data: values.imageFile
        }
        console.log(sendData)

        axios.post('https://mountsimageapi.azurewebsites.net/api/Image/UploadImagesDB', sendData, {

            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                console.log(response)
                if (response.data === "Done") {
                    setload(false)
                    Swal.fire({
                        icon: "success",
                        title: "Added",
                        text: "Image Added Successfully",
                        focusConfirm: false
                    })
                    getData()
                } else {
                    alert('Failed To Upload')
                }
            })
    }


    const getData = async () => {

        const sendData = {
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            OrgId: Number(localStorage.getItem("orgId")),
            Value: Number(sessionStorage.getItem("ProductImageId")),
            WebHeader: "ProductImage",
            CloudInterfactDisplaySectionId: Number(2)

        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetImages`, {
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
                    setImageData(data)

                })
    }


    const paginatedData = ImageData.slice(
        (currentPage - 1) * perpage,
        currentPage * perpage
    )
    useEffect(() => {
        getData()
    }, [])

    return (
        <Fragment>
            <Card>
                <CardHeader className='border-bottom'>
                    <CardTitle tag='h4'>Upload Images</CardTitle>

                    {/*<Button className="content-right" size='md'>Back</Button>*/}
                </CardHeader>
                <CardBody className='py-2 my-25'>
                    <div className='d-flex'>
                        <div className='me-25'>
                            <img className='rounded me-50' src={show ? values.imageSrc : defaultAvatar} alt='Upload your Image' height='100' width='100' ></img>
                        </div>
                        <div className='d-flex align-items-end mt-75 ms-1'>
                            <div>
                                <Button tag={Label} className='mb-75 me-75' size='sm' color='success'>
                                    <Folder size={15} /> Select
                                    <Input type='file' onChange={onChange} accept="image/png, image/gif, image/jpeg" hidden />
                                </Button>
                                <Button tag={Label} onClick={() => ImageUpload()} className='mb-75 me-75' size='sm' color='primary'>
                                    <Upload size={15} /> {load ? <Spinner size="sm" color="light" /> : "Upload"}
                                </Button>
                               
                                <p className='mb-0'>Allowed JPG, GIF or PNG.</p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <h5 className='mt-3 mb-2'>Images</h5>
            <Card>
                <CardBody className='py-2 my-25'>
                    <Row>
                  {paginatedData.length > 0 ? paginatedData.map((data, index) => (
                <Col xl='4' md='6'>
                     <Card className='mb-3' key={index + 1}>
                        <CardImg top src={`https://mountsimageapi.azurewebsites.net/api/FileUpload/${data.urlimage1}`} height="250" width="100" alt='card-top' />
                        <CardBody>
                            {/*<CardText>
                               <Button tag={Label} onClick={() => ImageUpload()} className='mb-75 me-75' size='sm' color='danger'>
                                    <Upload size={15} /> Delete
                                </Button>
                            </CardText>*/}
                        </CardBody>
                    </Card>
                </Col>)) : <CardText><h1 className="m-2 p-2">No images found. Please Upload images</h1></CardText>}
              
                    </Row>
                </CardBody>
                {paginatedData.length !== 0 && (<DynamicPagination items={ImageData} itemsPerPage={perpage} currentPage={currentPage} setcurrentitem={setCurrentPage} />)}
            </Card>
            <AddImages
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen }
            />
        </Fragment>
    )
}

export default Images
