// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Button, CardBody, CardText, Table, CardHeader, CardTitle } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
//import img2 from '@src/assets/images/pages/Radharanip.png'
import img2 from '@src/assets/images/radharanilogo.jpg'
import { ArrowLeft, Printer } from 'react-feather'
import TaxData from './taxData'

const EstimateView = () => {
    const navigate = useNavigate()
    const [itemdata, setitemdata] = useState([])
    const [TotalTax, setTotalTax] = useState(0)
    const [userdata, setuserdata] = useState([])
    const reportTemplateRef = useRef(null)
   
    const getCart = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            InstrumentRemarks: localStorage.getItem("createcart")

        }
       // console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetCartItems`, {
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
                const filterData = response.reduce((sum, item) => {
                    return sum + (item.totalTax || 0)
                }, 0)
                setTotalTax(filterData)
               // console.log("Tax", filterData)
                if (response.length > 0) {
                    setitemdata(response)
                } else {
                    setitemdata([])

                }
            })

    }

     const EditData = async (data) => {
         const sendData = {
             OrgId: Number(localStorage.getItem("orgId")),
             ApiKey2: localStorage.getItem("createcart"),
             WebHeader: "Newcart",
             ActiveStatus:"A"

        }
        console.log("View_Edit_sendData", sendData)
         await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/ViewCart`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                setuserdata(response)
            })

    }
    useEffect(() => {
        getCart()
        EditData()
        /*getcartDetail()*/
    }, [])
    return (
        <Fragment>
            <Row className='invoice-preview'>
                <Col xl={12} md={12} sm={12}>
                    <Card className='invoice-preview-card'>

                        <div id="capture" ref={reportTemplateRef}>
                            <CardBody className='invoice-padding pb-0'>
                                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                                    <div>
                                        <div >
                                            <img src={img2} height='100' width='200' />
                                        </div>
                                        <h3 className='text-primary invoice-logo'>RADHARANI MARBLE GRANITE PRIVATE LIMITED</h3>
                                        <b><p className='card-text mb-25'>Village Kherki Daula, Tehsil Manesar NH-8, Near Haldirams Gurugram, Haryana.</p>
                                            
                                            <p className='card-text mb-0'>E-Mail :<span style={{ color: "blue" }}>{`info@radharanimarble.com`}</span></p>
                                            <p className='card-text mb-0'>GST NO :<span style={{ color: "blue" }}>{` 06AAKCR1299R1ZH`}</span></p></b>
                                    </div>
                                    <div className='invoice-number-date mt-md-0 mt-2'>
                                        <div className='d-flex align-items-center justify-content-md-end mb-1'>
                                            <h4 className='fw-bold text-end mb-1'>Estimation #E{`${userdata?.orderNo || 0}`}</h4>
                                        </div>
                                        <div className='d-flex align-items-center mb-1'>
                                            <span className='title'>Date:</span>
                                            <span className='fw-bold'> {userdata?.bill?.createdOn !== null ? userdata?.bill?.createdOn.slice(0, 10) : null}</span>
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
                                        <font size="4"><b><CardText className='mb-25'>Name: {`${userdata.user?.firstName} ${userdata.user?.lastName}`}</CardText>
                                            <CardText className='mb-25'>Phone No: {`${userdata.user?.phoneNo === undefined ? "9876543210" : userdata?.user?.phoneNo}`}</CardText>
                                            <CardText className='mb-0'>Address: {`${userdata?.user?.address1} ${userdata?.user?.address2} ${userdata?.user?.pincode}`}</CardText></b></font>
                                    </Col>

                                </Row>
                            </CardBody>
                            <CardBody className='invoice-padding pt-0'>
                                <Row className='invoice-spacing'>
                                    <Col className='p-0' xl='3'>
                                        <Button color='danger' block outline className='mb-75' size="lg" onClick={() => navigate("/quotations")}>
                                            <ArrowLeft size={20} />  Go Back
                                        </Button>
                                    </Col>

                                </Row>
                            </CardBody>


                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className='py-1'>S.No.</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Particular</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Quantity</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Rate</th>
                                        <th className='py-1'>Amount</th>
                                        <th className='py-1'>Tax</th>
                                        <th className='py-1'>Tax Amount</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Delivery</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Total Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemdata.length >= 0 ? itemdata.map((detail, index) => <tr key={index}>
                                        <td className='py-1'>
                                            <p className='card-text fw-bold mb-25'>{index + 1}</p>

                                        </td> <td className='py-1'>
                                            <p className='card-text fw-bold mb-25'>{detail.product.productName}</p>
                                            <font size="4">Price -<span className='fw-bold' style={{ color: "#3dd23d" }}>  <TaxData cost="sales" productDetailsId={detail.productDetailsId} /></span></font>
                                            

                                        </td>
                                        <td className='py-1'>
                                            <p className='card-text fw-bold mb-25'>{detail.quantity} {detail.product.unitType}</p>
                                        </td>
                                        <td className='py-1'>
                                            <p className='card-text fw-bold mb-25'>{detail.totalDiscount}/ {detail.product.unitType}</p>
                                        </td>
                                        <td className='py-1'>
                                            <span className='fw-bold'>{detail.totalAmount !== null ? detail?.totalAmount.toFixed(2) : null}</span>
                                        </td>
                                        <td className='py'>
                                            <TaxData productDetailsId={detail.productDetailsId} />
                                        </td>
                                        <td className='py'>
                                            <span className='fw-bold'>{detail.totalTax !== null ? detail?.totalTax.toFixed(2) : null}</span>
                                        </td>
                                        <td className='py-1'>
                                            <span className='fw-bold'>{detail?.purchaseCost !== null ? detail?.purchaseCost.toFixed(2) : null}</span>
                                        </td>
                                        <td className='py-1'>
                                            <span className='fw-bold'>{detail?.payableAmount !== null ? detail?.payableAmount.toFixed(2) : null}</span>
                                        </td>
                                        
                                    </tr>) : null}

                                </tbody>
                            </Table>
                            <hr />
                            <CardBody className='invoice-padding pb-0'>
                                <Row className='invoice-sales-total-wrapper'>
                                    <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>

                                    </Col>
                                    <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>

                                        <div className='invoice-total-wrapper'>

                                            <div className='invoice-total-item'>
                                                <p className='invoice-total-title'> .</p>
                                                <p className='invoice-total-amount'> </p>
                                            </div>
                                            <div className='invoice-total-item'>
                                                <font size="3">  <p className='invoice-total-title'>Total Tax:</p></font>

                                                <p className='invoice-total-amount'>{TotalTax.toFixed(2)}</p>
                                            </div>
                                            <div className='invoice-total-item'>
                                                <font size="3">  <p className='invoice-total-title'>Delivery & Lifting Charges:</p></font>

                                                <p className='invoice-total-amount'>{userdata?.bill?.billLossCost}</p>
                                            </div>
                                            
                                            
                                            <font size="3"> <hr className='my-50' /></font>
                                            <div className='invoice-total-item'>
                                                <font size="3"> <p className='invoice-total-title'>Total:</p> </font>
                                                <font size="4"> <p className='invoice-total-amount' style={{ color: "#e45b18" }}>{userdata?.bill?.totalBalanceAmount !== null ? userdata?.bill?.totalBalanceAmount.toFixed(2) : (userdata?.bill?.payableAmount !== null ? userdata?.bill?.payableAmount.toFixed(2) : null)}</p></font>
                                            </div>

                                            <div className='invoice-total-item'>
                                                <font size="3">  <p className='invoice-total-title'>Discount:</p></font>

                                                <p className='invoice-total-amount'>{userdata?.bill?.totalDiscount || 0}</p>
                                            </div>

                                            <font size="3"> <hr className='my-50' /></font>
                                            <div className='invoice-total-item'>
                                                <font size="3"> <p className='invoice-total-title'>Subtotal:</p> </font>
                                                <font size="4"> <p className='invoice-total-amount' style={{ color: "#36b436" }}>{userdata?.bill?.payableAmount !== null ? Math.round(userdata?.bill?.payableAmount) : null}</p></font>
                                            </div>

                                        </div>

                                       
                                    </Col>
                                </Row>
                              
                            </CardBody>


                            <hr className='invoice-spacing' />
                            <CardBody className='invoice-padding pt-0'>
                                <Row>

                                    <Col className='mt-md-0 mt-3' md='12' order={{ md: 1, lg: 2 }}>
                                        <Card>
                                            <CardHeader>
                                                <CardTitle tag='h4'>Remarks</CardTitle>
                                            </CardHeader>

                                            {userdata?.bill?.overAllRemarks || "No remarks"}

                                        </Card>


                                    </Col>
                                </Row>
                            </CardBody>
                            <hr className='invoice-spacing' />
                            <CardBody className='invoice-padding pt-0'>
                                <Row>
                                    <Col sm='4'>

                                    </Col>
                                    <Col sm='4'>

                                    </Col>
                                    <Col sm='4'>
                                        <Button color='warning' size="lg" tag={Link} to={`/estimatePrint`} target='_blank' block  className='mb-75'>
                                            <Printer size={20} /> Print
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

export default EstimateView
