// ** Reactstrap Imports
import React, { useState, Fragment, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardBody, Row, Col, Input, Form, Button, Label, ListGroup, ListGroupItem, Spinner } from 'reactstrap'
import { useDropzone } from 'react-dropzone'
import { FileText, X, DownloadCloud } from 'react-feather'
import { selectThemeColors } from '@utils'
import AsyncSelect from 'react-select/async'
import '@styles/react/libs/file-uploader/file-uploader.scss'

import axios from "axios"
import InfoSection from './InfoSection/InfoSection'

export const homeObjThree = {
    primary: false,
    lightBg: true,
    lightTopLine: false,
    lightText: false,
    lightTextDesc: false,
    topLine: '',
    headline:
        'About Us',
    descriptions: 'We are supported by IITians in all sectors of specialized members, especially the technical field. We believe in business success with the support of smart technology and the massive changes it can make in peoples lives all across the world. We want to place a system that helps different business or organization owners take actual benefit of the latest technology.',
    description1: 'Smart technology will play a big role in building predictive capability for every section of our society. Together our mission is to place smart and decision making systems that will help evolve our society , then we have our job done.',
    description2: 'We strongly believe in building PREDICTIVE capability with smart applications for different types of organizations and business units that helps real growth. Well planned; smart process driven systems supported by INTELLIGENT and powerful applications that are simple to manage can MAKE massive changes in peoples lives all across the world. Compilation, stress, long working hours, under performance or failure are due to the gap in the system.',
    description3: 'With predictive capability we are better prepared. Having information or alert at the right time is a big advantage rather than putting effort after things have gone out of hand. Individuals or organizations should work towards having a smart approach and system that helps in making quality decisions at the right time.  ',
    buttonLabel: 'View Case Study',
    imgStart: 'start',
    img: 'images/profile.png',
    alt: 'Vault',
    start: 'true',
    infostate: true
}

const WebsiteForm = () => {
    const [load, setload] = useState(true)
    const [files, setFiles] = useState([])
    const [Data, setData] = useState([])
    const [ImageData, setImageData] = useState("")

    const [Data1, setData1] = useState([])
    const [ImageData1, setImageData1] = useState("")

    const [Data2, setData2] = useState([])
    const [ImageData2, setImageData2] = useState("")

    const [Data3, setData3] = useState([])
    const [ImageData3, setImageData3] = useState("")

    const [Data4, setData4] = useState([])
    const [ImageData4, setImageData4] = useState("")

    const [Data5, setData5] = useState([])
    const [ImageData5, setImageData5] = useState("")

    const [Data6, setData6] = useState([])
    const [ImageData6, setImageData6] = useState("")

    const [Data7, setData7] = useState([])
    const [ImageData7, setImageData7] = useState("")

    const [Data8, setData8] = useState([])
    const [ImageData8, setImageData8] = useState("")

    //console.log(files[0])
    const [ImageOrientation, setImageOrientation] = useState("")
    const [Primary, setPrimary] = useState("")
    const [lightBg, setlightBg] = useState("")
    const [lightTopLine, setlightTopLine] = useState("")
    const [lightText, setlightText] = useState("")
    const [lightTextDesc, setlightTextDesc] = useState("")
    const [Start, setStart] = useState("")
    const [buttonstate, setbuttonstate] = useState("")
    const [formData, setFormData] = useState({
        Topline: "",
        Header: "",
        Description: "",
        buttonlabel: "",
        margin: "",
        alt:""
    })
    const OnInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  
    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxFiles: 1,
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

    const handleRemoveAllFiles = () => {
        setFiles([])
    }

    const AligmentOption = [
       /* { value: 'LTR', label: 'LTR' },
        { value: 'RTL', label: 'RTL' },*/
        { value: 'Start', label: 'Start' }

       
    ]

    const filterColors2 = inputValue => {
        return AligmentOption.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))
    }

    const promiseOptions = inputValue => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(filterColors2(inputValue))
            }, 2000)
        })
    }

    const TruefalseOption = [
        { value: 'true', label: 'true' },
        { value: 'false', label: 'false' }

    ]

    const filterColors3 = inputValue => {
        return TruefalseOption.filter(i => i.label.toLowerCase().includes(inputValue.toLowerCase()))
    }

    const promiseOptions1 = inputValue => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(filterColors3(inputValue))
            }, 2000)
        })
    }

    /*const AddData = async () => {
        const sendData2 = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            Type: "MountsHomepage",
            DomainDesc: formData.Topline,
            Header: formData.Header,
            Description: formData.Description,
            ImageOrientation: ImageOrientation,
            AddtionalInfo1: Primary,
            BackgroundColor: lightBg,
            HeadColor: lightTopLine,
            TextColor: lightText,
            Extenderdescription: lightTextDesc,
            ButtonText: formData.buttonlabel,
            AddtionalInfo2: formData.alt,
            AddtionalInfo3: Start,
            AddtionalInfo4: formData.margin,
            AddtionalInfo5: buttonstate,
            UrlImage1: files[0]
        }
        console.log(sendData2)

        await fetch("https://mountsfileupload.azurewebsites.net/api/FileUpload/SendFiles2", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData2)

        })
            .then(response => console.log(response))


        }*/

    const AddData = async () => {
        setload(false)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            Type: "MountsHomepage",
            DomainDesc: formData.Topline,
            Header: formData.Header,
            Description: formData.Description,
            ImageOrientation: ImageOrientation,
            AddtionalInfo1: Primary,
            BackgroundColor: lightBg,
            HeadColor: lightTopLine,
            TextColor: lightText,
            Extenderdescription: lightTextDesc,
            ButtonText: formData.buttonlabel,
            AddtionalInfo2: formData.alt,
            AddtionalInfo3: Start,
            AddtionalInfo4: formData.margin,
            AddtionalInfo5: buttonstate,
            Data: files[0]
        }
        console.log(sendData)

        axios.post('https://mountsfileupload.azurewebsites.net/api/FileUpload/UploadDataandimage', sendData, {

            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                console.log(response)
                if (response.statusText === "OK") {
                    setload(true)
                    window.location.reload()
                } else {
                    alert('Failed To Upload')
                }
            })
    }

    //ImageUpload on Server
    const ImageUpload = async () => {
       
        const sendData = {
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            OrgId: Number(localStorage.getItem("orgId")),
            WebHeader: "About",
            Data: files[0]
        }
        console.log(sendData)

        axios.post('https://mountsfileupload.azurewebsites.net/api/FileUpload/SendFiles', sendData, {

            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                console.log(response)
                if (response.statusText === "OK") {
                    setload(false)
                } else {
                    alert('Failed To Upload')
                }
            })
    }


    const GetwebData = async () => {
        const sendData2 = {
            OrgId: Number(239),
            UserId: Number(2123),
            Type: "MountsHomepage"
        }
        console.log(sendData2)

        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getwebsitedata`, {
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
                    setData(data)
                })


    }

    const GetImageData = async () => {
        const sendData2 = {
            OrgId: Number(239),
            UserId: Number(2123),
            ActiveStatus: "A",
            webHeader: "MounHomepage"
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
                    // console.log(data[0])
                    setImageData(data[0])


                })
    }


    useEffect(() => {
        GetwebData()
        GetImageData()
       
      
    }, [])

    return (
        <>
        <Card>
            <CardHeader>
                <CardTitle tag='h4'>Dynamic Website</CardTitle>
            </CardHeader>

            <CardBody>
                <Form>
                    <Row>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='nameMulti'>
                                TopLine Name
                            </Label>
                            <Input type='text' name='Topline' onChange={(e) => OnInputChange(e) } id='nameMulti' placeholder='Ex-> Mounts' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='nameMulti'>
                                Header Name
                            </Label>
                            <Input type='text' name='Header' id='Header' onChange={(e) => OnInputChange(e)} placeholder='Ex -> Create Your Own Cloud Platform Within Seconds' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label' for='lastNameMulti'>
                                Description
                            </Label>
                            <Input type='textarea' name='Description' rows='5' onChange={(e) => OnInputChange(e)} id='Description' placeholder='Ex -> Cortex Solution Design is a simple application platform engineered using the.......' />
                        </Col>
                        <Col md='6' sm='12' className='mb-1'>
                            <Label className='form-label'>ImageOrientation</Label>
                            <AsyncSelect
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                loadOptions={promiseOptions}
                                onChange={(e) => setImageOrientation(e.value)}
                                cacheOptions
                                defaultOptions
                            />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>Primary</Label>
                                <AsyncSelect
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    loadOptions={promiseOptions1}
                                    onChange={(e) => setPrimary(e.value)}
                                    cacheOptions
                                    defaultOptions
                                />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>Light Background</Label>
                                <AsyncSelect
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    loadOptions={promiseOptions1}
                                    onChange={(e) => setlightBg(e.value)}
                                    cacheOptions
                                    defaultOptions
                                />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>LightTextColor</Label>
                                <AsyncSelect
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    loadOptions={promiseOptions1}
                                    onChange={(e) => setlightText(e.value)}
                                    cacheOptions
                                    defaultOptions
                                />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>LightDescColor</Label>
                                <AsyncSelect
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    loadOptions={promiseOptions1}
                                    onChange={(e) => setlightTextDesc(e.value)}
                                    cacheOptions
                                    defaultOptions
                                />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>LightToplineColor</Label>
                                <AsyncSelect
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    loadOptions={promiseOptions1}
                                    onChange={(e) => setlightTopLine(e.value)}
                                    cacheOptions
                                    defaultOptions
                                />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>Button State</Label>
                                <AsyncSelect
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    loadOptions={promiseOptions1}
                                    onChange={(e) => setbuttonstate(e.value)}
                                    cacheOptions
                                    defaultOptions
                                />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label'>Start</Label>
                                <AsyncSelect
                                    isClearable={false}
                                    className='react-select'
                                    classNamePrefix='select'
                                    loadOptions={promiseOptions1}
                                    onChange={(e) => setStart(e.value)}
                                    cacheOptions
                                    defaultOptions
                                />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label' for='nameMulti'>
                                    Button label
                                </Label>
                                <Input type='text' name='buttonlabel' onChange={(e) => OnInputChange(e)} id='buttonlabel' placeholder='Ex-> Get Started' />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label' for='nameMulti'>
                                    Margin
                                </Label>
                                <Input type='text' name='margin' onChange={(e) => OnInputChange(e)} id='margin' placeholder='Ex-> 145' />
                            </Col>
                            <Col md='6' sm='12' className='mb-1'>
                                <Label className='form-label' for='nameMulti'>
                                    Image Alt
                                </Label>
                                <Input type='text' name='alt' onChange={(e) => OnInputChange(e)} id='alt' placeholder='Ex-> Home Image' />
                            </Col>
                        <Col sm='12'>
                        <Card>
                            <CardHeader>
                                <CardTitle tag='h4'>Upload Your Website Image</CardTitle>
                            </CardHeader>
                            <CardBody>
                            
                                <div {...getRootProps({ className: 'dropzone' })}>
                                    <input {...getInputProps()}  />
                                    <div className='d-flex align-items-center justify-content-center flex-column'>
                                        <DownloadCloud size={64} />
                                        <h5>Drop Files here or click to upload</h5>
                                        <p className='text-secondary'>
                                            Drop files here or click{' '}
                                            <a href='/' onClick={e => e.preventDefault()}>
                                                browse
                                            </a>{' '}
                                            thorough your machine
                                        </p>
                                    </div>
                                </div>
                                {files.length ? (
                                    <Fragment>
                                        <ListGroup className='my-2'>{fileList}</ListGroup>
                                        <div className='d-flex justify-content-end'>
                                            <Button className='me-1' color='danger' outline onClick={handleRemoveAllFiles}>
                                                Remove All
                                            </Button>
                                          
                                        </div>
                                    </Fragment>
                                ) : null}
                            </CardBody>
                            </Card>
                        </Col>
                        <Col sm='12'>
                            <div className='d-flex'>
                                {load === true ? <Button className='me-1' color='primary' onClick={() => AddData()}>
                                    Submit
                                    </Button> : <Spinner color='primary' />}
                                   <Button outline color='secondary' type='reset'> 
                                    Reset
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </CardBody>
        </Card>

            {Data.length > 0 ? Data.map((datamain, index) => (

                <InfoSection Data={datamain}  />

            )) : null}
        </>
    )
}
export default WebsiteForm
