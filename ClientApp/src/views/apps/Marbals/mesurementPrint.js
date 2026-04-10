// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Input, CardBody, Spinner, Table, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import MesurementLessViewPrint from './mesurementLessViewPrint'
import MesurementSum from './mesurementSum'
const MesurementPrint = () => {
    const navigate = useNavigate()
    const [datarefresh, setdatarefresh] = useState(false)
    const [meurementSumRefresh, setmeurementSumRefresh] = useState(false)
    const [userdata, setuserdata] = useState([])
    const [DataLoad, setDataLoad] = useState(false)
    const [Dataview, setDataview] = useState(false)
    const [UserDataLoad, setUserDataLoad] = useState(false)
    const [Data, setData] = useState([])
    const [groupedData, setGroupedData] = useState({})


    const getData = async (id) => {
        
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "S",
            WebHeader: "MeasurmentData",
            Value: Number(localStorage.getItem("printmesuremnet"))

        }
       // console.log(sendData)
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
                   // console.log("Mesurement Data", data)
                    setData(data)
                    setDataLoad(true)
                })
    }

    const getuserData = async (id) => {
        
        const sendData = {
            CloudInterfactDisplaySectionId: Number(localStorage.getItem("printmesuremnet"))

        }
       // console.log(sendData)
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
                    //console.log(data)
                    setuserdata(data)
                    setUserDataLoad(true)
                })
    }

    
    useEffect(() => {
        const fetchData = async () => {
            await getData()
            await getuserData()
        }

        fetchData()
    }, [])

    useEffect(() => {
        if (DataLoad && UserDataLoad) {
            
            const printTimeout = setTimeout(() => {
                window.print()
            }, 2500)

            
            return () => clearTimeout(printTimeout)
        }
    }, [DataLoad, UserDataLoad])

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
    }, [Data])

    const { createdOn } = userdata
    const displayDate = createdOn ? new Date(createdOn) : new Date()
    const formattedDate = `${displayDate.getDate()}-${displayDate.getMonth() + 1}-${displayDate.getFullYear()}`
    
    return (
        <Fragment>
            {DataLoad && UserDataLoad ? < div className='invoice-print p-3' style={{ background: "white" }}>

                <div className='d-flex justify-content-between flex-md-row flex-column pb-2'>
                    {/* Centered Om Symbol + Title at the very top */}
                    <div className='d-flex flex-column align-items-center mb-3'>
                        <svg width="70" height="70" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#8B2500">
                                {Array.from({ length: 12 }).map((_, i) => {
                                    const angle = ((i * 30) * Math.PI) / 180
                                    const cx = 50 + (38 * Math.cos(angle))
                                    const cy = 50 + (38 * Math.sin(angle))
                                    return (
                                        <ellipse
                                            key={i}
                                            cx={cx}
                                            cy={cy}
                                            rx="8"
                                            ry="5"
                                            transform={`rotate(${i * 30}, ${cx}, ${cy})`}
                                        />
                                    )
                                })}
                                <circle cx="50" cy="50" r="26" fill="white" stroke="#8B2500" strokeWidth="2" />
                                <text
                                    x="50"
                                    y="62"
                                    textAnchor="middle"
                                    fontSize="28"
                                    fontFamily="serif"
                                    fill="#8B2500"
                                    fontWeight="bold"
                                >
                                    ॐ
                                </text>
                            </g>
                        </svg>
                        <h1 className='text-primary fw-bold mt-1'>Measurement</h1>
                    </div>

                    {/* Measurement No. on the right */}
                    <div className='d-flex justify-content-end mb-2'>
                        <div>
                            <h4 className='fw-bold text-end mb-1'>Measurement No. #M{`${userdata?.orderNo}`}</h4>
                            <div className='invoice-date-wrapper mb-50'>
                                <span className='invoice-date-title'>Date Issued:</span>
                                <span className='fw-bold'> {formattedDate}</span>
                            </div>
                            {userdata.truckNumber?.catgDes && (
                            <div className='d-flex align-items-center'>
                                <span className='invoice-date-title'>Truck/TempoNo:</span>
                                <span className='fw-bold'>{userdata.truckNumber?.catgDesc}</span>
                            </div>
                            )}
                        </div>
                    </div>
                </div>

                <hr className='my-2' />

                <Row className='pb-2'>
                    <Col sm='6'>
                         <b><p className='mb-25'>Name of the party: {`${userdata.userData?.firstName} ${userdata.userData?.lastName}`}</p>
                            <p className='mb-25'>Address: {`${userdata.userData?.address1 || "Jankapuri"} ${userdata.userData?.address2 || "Delhi"} ${userdata.userData?.pincode || "11000"} `}</p>
                            <p className='mb-25'>Lot No: {userdata?.bill?.lotNUmber.length > 0 && userdata.bill?.lotNUmber?.map((data, index) => (
                                (index > 0 ? ` || ${data.product.productName}` : data.product.productName)
                            ))}</p></b>

                    </Col>
                    <Col className='mt-sm-0 mt-2' sm='6'>
                       
                    </Col>
                </Row>

                <Table className='mt-2 mb-0' responsive>
                    <thead>
                        <tr>
                            <th className='py-1 ps-4' style={{ border: '1px solid black', textAlign: "center", maxWidth: "70px" }}>Slab</th>
                            <th className='py-1 ps-4' style={{ border: '1px solid black', textAlign: "center", maxWidth: "50px" }}>Lot No.</th>
                            <th className='py-1 ps-4 text-center' style={{ border: '1px solid black', textAlign: "center" }}>Size</th>
                            <th className='py-1 ps-4' style={{ border: '1px solid black', textAlign: "center", minWidth: "550px" }}>Less</th>
                            <th className='py-1 ps-4' style={{ border: '1px solid black', textAlign: "center" }}>Sft</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Data.length > 0 ? Data.map((data, index) => (
                            <tr key={index}>
                                <td className='py-1 ps-4' style={{ border: '1px solid black', textAlign: "center", maxWidth: "70px" }}>
                                    <p className='fw-semibold mb-25 text-wrap' >{data.domainDesc}</p>
                                </td>
                                <td className='py-1 ps-4' style={{ border: '1px solid black', textAlign: "center", maxWidth: "50px" }}>
                                    <p className='mb-25 text-muted text-wrap' >{data?.urlimage1 || "No Lot"}</p>
                                </td>
                                <td className='py-1 ps-4' style={{ border: '1px solid black', textAlign: "center", maxWidth: "20px" }}>
                                    <span className='fw-bold p-1'>{data.workFlowId}</span>
                                    <span className='fw-bold p-1'>X</span>
                                    <span className='fw-bold p-1'>{data.insuranceId}</span>
                                </td>
                                <td className='py-1 ps-4' style={{ border: '1px solid black' }}>
                                    <MesurementLessViewPrint setdatarefresh={setdatarefresh} value={data.cloudInterfactDisplaySectionId} />
                                </td>
                                <td className='py-1 ps-4' style={{ border: '1px solid black', textAlign: "center" }}>
                                    <strong>{data?.vat !== null ? data.vat.toFixed(2) : null}</strong>
                                </td>
                            </tr>)) : <h2>No Data Found</h2>}

                    </tbody>
                </Table>
                <hr />
                <CardBody className='invoice-padding pb-0'>
                    <Row className='invoice-sales-total-wrapper'>
                        <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>

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
                                            <Fragment key={index}>
                                                {count !== undefined ? (
                                                    <MesurementSum
                                                        printvalue={localStorage.getItem("printmesuremnet")}
                                                        meurementSumRefresh={meurementSumRefresh}
                                                        datarefresh={datarefresh}
                                                        UrlImage1={productName}
                                                        counttt={count}
                                                        sumtt={groupedDataForProduct?.sum}
                                                    />
                                                ) : (
                                                    <p>No data available for {productName}</p>
                                                )}
                                            </Fragment>
                                        )
                                    })
                                ) : (
                                    <p>No Lot Numbers Found</p>
                                )}


                            </div>


                        </Col>
                    </Row>

                </CardBody>
            </div> : <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner color="success" />
                <h1 className="m-1">Please Wait....</h1>
            </div>}

        </Fragment>
    )
}

export default MesurementPrint
