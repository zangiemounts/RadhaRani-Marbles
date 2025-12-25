// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Input, CardBody, CardText, Table, Button } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import MesurementLess from './mesurementLess'
import { Plus, Trash2 } from 'react-feather'
import Swal from 'sweetalert2'
import MesurementSum from './mesurementSum'


const Mesurement = () => {
    const [datarefresh, setdatarefresh] = useState(false)
    const [userdata, setuserdata] = useState([])
    const [meurementSumRefresh, setmeurementSumRefresh] = useState(false)
    const [currentitem, setcurrentitem] = useState([])
    const [Data, setData] = useState([])
    const [size1, setsize1] = useState(0)
    const [size2, setsize2] = useState(0)
    const [slab, setslab] = useState("")
    const [groupedData, setGroupedData] = useState({})
    const date = new Date()

    const [truckdata, settruckdata] = useState(0)
    const reportTemplateRef = useRef(null)

    const addData = async () => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            WebHeader: "MeasurmentData",
            Value: Number(sessionStorage.getItem("Mesurement"))

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/MeasurmentData`, {
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
                    getData()
                })
    }

    const getData = async () => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            WebHeader: "MeasurmentData",
            Value: Number(sessionStorage.getItem("Mesurement"))

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/MeasurmentGet`, {
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
                    setData(data)
                })
    }

    const getuserData = async () => {

        const sendData = {
            CloudInterfactDisplaySectionId: Number(sessionStorage.getItem("Mesurement"))

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/ViewMData`, {
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
                    setuserdata(data)
                })
    }

    const getTruckData = async () => {
        try {
            const sendData = {
                CatgId: Number(63)

            }
            //console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetTruck`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)

            })
                .then((response) => response.json())
                .then(response => {
                    try {
                        //console.log("Vechile_Data", response)

                        setcurrentitem(response)
                    } catch (error) {
                        //console.log("eee")
                    }
                }).then(error => {
                })
        } catch (error) {
           // console.log("Error")
        }

    }

    const editData = async (data, data2, data3, data4, data5) => {
        setmeurementSumRefresh(true)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            CloudInterfactDisplaySectionId: Number(data),
            WorkFlowId: Number(data3),
            InsuranceId: Number(data4),
            WebHeader: "MeasurmentData",
            DomainDesc: data2,
            Urlimage1: data5

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/MeasurmentEdit`, {
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
                    
                    getData()
                    setmeurementSumRefresh(false)
                    
                })
    }

    const OnDelete = async (data, data2, data3, data4, data5) => {
        setmeurementSumRefresh(true)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "D",
            CloudInterfactDisplaySectionId: Number(data),
            WorkFlowId: Number(data3),
            InsuranceId: Number(data4),
            WebHeader: "MeasurmentData",
            DomainDesc: data2,
            Urlimage1: data5

        }
        //console.log("Delete", sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/MeasurmentEdit`, {
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
                    getData()
                    setmeurementSumRefresh(false)
                })
    }

    const CloseMesurement = async () => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "S",
            CloudInterfactDisplaySectionId: Number(sessionStorage.getItem("Mesurement")),
            CloudMcatId: truckdata !== 0 ? Number(truckdata) : null

        }
        console.log("SendData", sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/CloseMeasurment`, {
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
                    if (data === "Done") {
                        window.location.pathname = "/mesurementData"
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Vehicle detail not selected',
                            text: 'Please Select the vehicle detail'
                        })
                    }
                    
                })
    }

    useEffect(() => {
        getData()
    }, [datarefresh])

    useEffect(() => {
        getuserData()
        getTruckData()
    }, [])

    useEffect(() => {
        if (Data.length > 0) {
            const grouped = Data.reduce((acc, current) => {
                const productName = current?.urlimage1
                if (productName) {
                    const normalizedProductName = productName.trim().toLowerCase()
                    if (!acc[normalizedProductName]) {
                        acc[normalizedProductName] = { count: 0, sum: 0 }
                    }
                    acc[normalizedProductName].count += 1
                    acc[normalizedProductName].sum += current?.vat || 0
                }
                return acc
            }, {})

            setGroupedData(grouped)
        }
    }, [Data])  // This effect will run when Data changes
    
    return (
        <Fragment>
            <Row className='invoice-preview'>
                <Col xl={12} md={12} sm={12}>
                    <Card className='invoice-preview-card'>

                        <div id="capture" ref={reportTemplateRef}>
                            <CardBody className='invoice-padding pb-0'>
                                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                                    <div>
                                        {/*<div >
                                            <img src={img2} height='100' width='200' />
                                        </div>*/}
                                        <h1 className='text-primary invoice-logo mt-2'>Mesurement</h1>
                                       
                                    </div>
                                    <div className='invoice-number-date mt-md-0 mt-2'>
                                        <div className='d-flex align-items-center justify-content-md-end mb-1'>
                                            <h4 className='fw-bold text-end mb-1'>S.No #M{`${userdata.orderNo}`}</h4>
                                        </div>
                                        <div className='d-flex align-items-center mb-1'>
                                            <span className='title'>Date:</span>
                                            <span className='fw-bold'> {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</span>
                                        </div>
                                        <div className='d-flex align-items-center mb-1'>
                                            <span className='title'>Truck/TempoNo: </span>
                                            <Input type='select' name='select' onChange={(e) => settruckdata(e.target.value)} id='select-basic'>
                                                <option>Select</option>
                                                {currentitem.length > 0 && currentitem.map((data, index) => (
                                                    <Fragment key={index}>
                                                        <option value={data.catgTypeId}>{data.catgDesc}</option>
                                                    </Fragment>
                                                
                                                ))}
                                                
                                            </Input> 
                                        </div>

                                    </div>
                                </div>
                            </CardBody>

                            <hr className='invoice-spacing' />


                             <CardBody className='invoice-padding pt-0'>
                                <Row className='invoice-spacing'>
                                    <Col className='p-0' xl='8'>
                                        {/*<h6 className='mb-2 text-primary'><b>Quotation To:</b></h6>*/}
                                        <h6 className='mb-25'></h6>
                                        <b><CardText className='mb-25'>Name of the party: {`${userdata.userData?.firstName} ${userdata.userData?.lastName}`}</CardText>
                                            <CardText className='mb-0'>Address: {`${userdata.userData?.address1 || "Jankapuri"} ${userdata.userData?.address2 || "Delhi"} ${userdata.userData?.pincode || "11000"} `}</CardText>
                                            <CardText className='mb-0'>Lot No: {userdata?.bill?.lotNUmber.length > 0 && userdata.bill?.lotNUmber?.map((data, index) => (
                                                (index > 0 ? ` || ${data.product.productName}` : data.product.productName)
                                            ))}</CardText></b>
                                    </Col>
                                </Row>
                            </CardBody> 

                            <Table responsive>
                                <thead>
                                    <tr>
                                        {/*<th className='py-1' style={{ border: '1px solid black', width: 10, padding: 0 }}><div style={{ marginLeft: 10 }}> S.No. </div>  </th>*/}
                                        <th className='py-1' style={{ textAlign: 'center', border: '1px solid black', minWidth: 150, padding: 0 }}>Slab.</th>
                                        <th className='py-1' style={{ textAlign: 'center', border: '1px solid black', minWidth: 150, padding: 0 }}>Lot No.</th>
                                        <th className='py-1' colSpan="3" style={{ textAlign: 'center', border: '1px solid black', minWidth: 150, padding: 0 }}>Size</th>
                                        <th className='py-1' style={{ textAlign: 'center', border: '1px solid black', minWidth: 150, padding: 0 }}>Less</th>
                                        <th className='py-1' style={{ textAlign: 'center', border: '1px solid black', minWidth: 150, padding: 0 }}>Sft</th>
                                        <th className='py-1' style={{ textAlign: 'center', border: '1px solid black', minWidth: 150, padding: 0 }}>Delete</th>
                                    </tr>
                                </thead>
                               
                                <tbody>
                                    {Data.length > 0 ? Data.map((data, index) => (
                                        <tr key={index}>
                                           {/* <td className='py-1' style={{ textAlign: 'center', padding: 0, border: '1px solid black', padding: 0 }}>
                                                <div style={{ marginLeft: 10 }}>{index + 1}.</div>  
                                            </td>*/}
                                            <td className='py-1' style={{ textAlign: 'center', border: '1px solid black', padding: 0, minWidth: 150 }}>
                                                <Input id='amount' type="text" className="m-1" style={{ maxWidth: "90%" }} name='amount' onWheel={(e) => e.target.blur()} onChange={(e) => setslab(e.target.value)} onBlur={(e) => editData(data?.cloudInterfactDisplaySectionId, slab, data?.workFlowId, data?.insuranceId, data?.urlimage1)} defaultValue={data.domainDesc || "0"} placeholder='e.g: 1' />

                                            </td>
                                            <td className='py-1' style={{ textAlign: 'center', padding: 0, border: '1px solid black', padding: 0, minWidth: 200 }}>
                                                <div style={{ marginLeft: 10 }}>
                                                    <Input type='select' style={{ maxWidth: "90%" }} onChange={(e) => editData(data?.cloudInterfactDisplaySectionId, data?.domainDesc, data?.workFlowId, data?.insuranceId, e.target.value)} className="m-1" name='select' id='select-basic'>
                                                        <option >{data.urlimage1 !== null ? data.urlimage1 : "Select"}</option>
                                                        {userdata?.bill?.lotNUmber.length > 0 && userdata.bill?.lotNUmber?.map((dataa, index) => (
                                                            <Fragment key={index}>
                                                                <option value={dataa.product.productName} > {dataa.product.productName}</option>
                                                            </Fragment>
                                                        ))}
                                                    </Input>
                                                </div>  
                                            </td>

                                            <td className='py-1' style={{ textAlign: 'center', borderBottom: '1px solid black', minWidth: 150, padding: 0 }}>
                                                <Input id='amount' type="number" onBlur={(e) => console.log("I am Called")} className="m-1" style={{ maxWidth: "90%" }} name='amount' onWheel={(e) => e.target.blur()} onChange={(e) => setsize1(e.target.value)} onBlur={(e) => editData(data?.cloudInterfactDisplaySectionId, data?.domainDesc, size1, data?.insuranceId, data?.urlimage1)} defaultValue={data.workFlowId} placeholder='e.g: 1' />

                                            </td> <td className='py-1'  style={{ textAlign: 'center', borderBottom: '1px solid black', padding: 0 }}>
                                               X </td>
                                        
                                            <td className='py-1' style={{ textAlign: 'center', borderBottom: '1px solid black', borderRight: '1px solid black', minWidth: 150, padding: 0 }}>
                                                <Input id='amount' type="number" className="m-1" style={{ maxWidth: "90%" }} name='amount' onWheel={(e) => e.target.blur()} onChange={(e) => setsize2(e.target.value)} onBlur={(e) => editData(data?.cloudInterfactDisplaySectionId, data?.domainDesc, data?.workFlowId, size2, data?.urlimage1)} defaultValue={data.insuranceId} placeholder='e.g: 1' />
                                            </td>
                                            <td style={{ borderBottom: '1px solid black', padding: 0, minWidth: "350px" }}>
                                                <MesurementLess setdatarefresh={setdatarefresh} value={data.cloudInterfactDisplaySectionId} />
                                            </td>
                                            <td className='py-1' style={{ textAlign: 'center', border: '1px solid black', minWidth: 150, padding: 0 }}>
                                                {data.vat !== null ? (data?.vat).toFixed(2) : null}
                                        </td> 
                                            <td className='py-1' style={{ textAlign: 'center', border: '1px solid black', minWidth: 150, padding: 0 }}>
                                                <Button color="danger" onClick={() => OnDelete(data?.cloudInterfactDisplaySectionId, data?.domainDesc, data?.workFlowId, data?.insuranceId, data?.urlimage1) }><Trash2 size={35} /></Button>
                                        </td>
                                    </tr>)) : null}

                                   
                                </tbody>
                            </Table>
                            <hr />
                            <CardBody className='invoice-padding pb-0'>
                                <Row className='invoice-sales-total-wrapper'>
                                    <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
                                        <Button color="success" className="m-2" onClick={() => addData()}>Add Slab</Button>
                                    </Col>
                                    <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>

                                        <div className='invoice-total'>
                                            {userdata?.bill?.lotNUmber?.length > 0 ? (
                                                userdata.bill.lotNUmber.map((data, index) => {
                                                    const productName = data?.product?.productName

                                                    if (!productName) {
                                                        return null // Skip this item if productName is undefined
                                                    }

                                                    const normalizedProductName = productName.trim().toLowerCase()
                                                    const groupedDataForProduct = groupedData[normalizedProductName]

                                                    // Make sure groupedDataForProduct exists before proceeding
                                                    if (!groupedDataForProduct) {
                                                        return <p key={index}>No grouped data for {productName}</p>
                                                    }

                                                    const count = groupedDataForProduct?.count

                                                    return (
                                                        <div key={index}>
                                                            {count !== undefined ? (
                                                                <MesurementSum
                                                                    counttt={count}
                                                                    meurementSumRefresh={meurementSumRefresh} datarefresh={datarefresh} printvalue={sessionStorage.getItem("Mesurement")} UrlImage1={data.product.productName}
                                                                />
                                                            ) : (
                                                                <p>No data available for {productName}</p>
                                                            )}
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <p>No Lot Numbers Found</p>
                                            )}


                                            <div className='invoice-total-item'>
                                                <p className='invoice-total-title'> .</p>
                                                <p className='invoice-total-amount'> </p>
                                            </div>
                                           
                                        </div>


                                    </Col>
                                </Row>

                            </CardBody>
                            {/*<Button color="success" className="m-2" onClick={() => addData()}>Add Slab</Button>*/}

                           
                            <hr className='invoice-spacing' />
                            <CardBody className='invoice-padding pt-0'>
                                <Row>
                                    <Col sm='4'>

                                    </Col>
                                    <Col sm='4'>

                                    </Col>
                                    <Col sm='4'>
                                        <Button color='danger' size="lg" block onClick={() => CloseMesurement()} className='mb-75'>
                                            Close
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>
                        </div>
                    </Card>
                </Col>
            </Row>

        </Fragment>
    )
}

export default Mesurement
