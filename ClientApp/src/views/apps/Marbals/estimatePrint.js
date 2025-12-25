// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Table } from 'reactstrap'
import { useNavigate } from 'react-router-dom'

// ** Style
import '@styles/base/pages/app-invoice-print.scss'
import img2 from '@src/assets/images/radharanilogo.jpg'
import TaxData from './taxData'

const EstimatePrint = () => {
    const [TotalTax, setTotalTax] = useState(0)
    const [itemdata, setitemdata] = useState([])
    const [userdata, setuserdata] = useState([])
    const date = new Date()
    const year = date.getFullYear()
    const [data, setdata] = useState({
        Productname: "",
        unittype: "",
        price: 0,
        discount: 0,
        tax: 0,
        quantity: 1,
        totalamount: 0,
        payableamount: 0,
        totaltaxamo: 0,
        billId: 0
    })
   
    const getCart = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            InstrumentRemarks: localStorage.getItem("createcart")

        }
        console.log(sendData)
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
                const filterData = response.reduce((sum, item) => {
                    return sum + (item.totalTax || 0)
                }, 0)
                setTotalTax(filterData)
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
        console.log(sendData)
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
      setTimeout(() => window.print(), 1000)
    }, [])

    return (
        <Fragment>
            <div className='invoice-print p-3' style={{ background: "white" }}>
                <div className='d-flex justify-content-between flex-md-row flex-column pb-2'>
                    <div>
                        <div className='d-flex mb-1'>
                            <img src={img2} height='80' width='80' />

                            
                            <h3 className='text-primary fw-bold ms-1 mt-2'>RADHARANI MARBLE GRANITE PRIVATE LIMITED</h3>
                        </div>
                        <b><p className='mb-25'>Village Kherki Daula, Tehsil Manesar NH-8, Near Haldirams Gurugram, Haryana.</p>
                            <p className='mb-25'>E-Mail :<span style={{ color: "blue" }}>{`info@radharanimarble.com`}</span></p>
                            <p className='card-text mb-0'>GST NO :<span style={{ color: "blue" }}>{` 06AAKCR1299R1ZH`}</span></p></b>
                        
                    </div>
                    <div className='mt-md-0 mt-2'>
                        <h4 className='fw-bold text-end mb-1'>Estimation #E{`${userdata?.orderNo || 0}`}</h4>
                        <div className='invoice-date-wrapper mb-50'>
                            <span className='invoice-date-title'>Date Issued:</span>
                            <span className='fw-bold'> {userdata?.bill?.createdOn !== null ? userdata?.bill?.createdOn.slice(0, 10) : null}</span>
                        </div>
                        {/*<div className='invoice-date-wrapper'>
                            <span className='invoice-date-title'>Due Date:</span>
                            <span className='fw-bold'>29/08/2020</span>
                        </div>*/}
                    </div>
                </div>

                <hr className='my-2' />

                <Row className='pb-2'>
                    <Col sm='6'>
                        {/*<h6 className='mb-1'>Invoice To:</h6>*/}
                       <b><p className='mb-25'>Name: {`${userdata.user?.firstName} ${userdata.user?.lastName}`}</p>
                        <p className='mb-25'>Phone No: {`${userdata.user?.phoneNo === undefined ? "9876543210" : userdata?.user?.phoneNo}`}</p>
                        <p className='mb-25'>Address: {`${userdata?.user?.address1} ${userdata?.user?.address2} ${userdata?.user?.pincode}`}</p></b>
                        
                    </Col>
                    <Col className='mt-sm-0 mt-2' sm='6'>
                        {/*<h6 className='mb-1'>Payment Details:</h6>
                        <table>
                            <tbody>
                                <tr>
                                    <td className='pe-1'>Total Due:</td>
                                    <td>
                                        <strong>$12,110.55</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td className='pe-1'>Bank name:</td>
                                    <td>American Bank</td>
                                </tr>
                                <tr>
                                    <td className='pe-1'>Country:</td>
                                    <td>United States</td>
                                </tr>
                                <tr>
                                    <td className='pe-1'>IBAN:</td>
                                    <td>ETD95476213874685</td>
                                </tr>
                                <tr>
                                    <td className='pe-1'>SWIFT code:</td>
                                    <td>BR91905</td>
                                </tr>
                            </tbody>
                        </table>*/}
                    </Col>
                </Row>

                <Table className='mt-2 mb-0' responsive>
                    <thead>
                        <tr>
                            <th className='py-1'>S.No.</th>
                            <th className='py-1 ps-4'>Particular</th>
                            <th className='py-1 ps-2'>Quantity</th>
                            <th className='py-1 ps-3'>Rate</th>
                            <th className='py-1 ps-5'>Tax</th>
                            <th className='py-1'>Amount</th>
                            <th className='py-1'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemdata.length >= 0 ? itemdata.map((detail, index) => <tr key={index}>
                            <td className='py-1'>
                                <strong>{index + 1}</strong>
                                
                            </td>
                            <td className='py-1 ps-4'>
                                <p className='fw-semibold mb-25'>{detail.product.productName}}</p>
                                <p className='text-muted text-nowrap'>
                                   <font size="4">Price -<span className='fw-bold' style={{ color: "#3dd23d" }}>  <TaxData cost="sales" productDetailsId={detail.productDetailsId} /></span></font>
                                </p>
                            </td>
                            <td className='py-1 ps-2'>
                                <strong>{detail.quantity}  {detail.product.unitType}</strong>
                            </td>
                            <td className='py-1 ps-3'>
                                <strong>{detail.totalDiscount}/ {detail.product.unitType}</strong>
                            </td>
                            <td className='py-1 ps-5'>
                                <strong> <TaxData productDetailsId={detail.productDetailsId} /></strong>
                            </td>
                            <td className='py-1'>
                                <strong>{detail?.payableAmount !== null ? detail?.payableAmount.toFixed(2) : null}</strong>
                            </td>
                            <td className='py-1'>
                                <strong>{}</strong>
                            </td>
                        </tr>) : <h2>No Data Found</h2>}
                       
                    </tbody>
                </Table>

                <Row className='invoice-sales-total-wrapper mt-3'>
                    <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
                        {/*<p className='mb-0'>
                            <span className='fw-bold'>Salesperson:</span> <span className='ms-75'>Alfie Solomons</span>
                        </p>*/}
                    </Col>
                    <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
                        <div className='invoice-total-wrapper'>
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Total Tax:</p>
                                <p className='invoice-total-amount'>{TotalTax.toFixed(2)}</p>
                            </div>
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Delivery & Lifting Charges:</p>
                                <p className='invoice-total-amount'>{userdata?.bill?.billLossCost || 0}</p>
                            </div>
                            <hr className='my-50' />
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Total:</p>
                                <p className='invoice-total-amount'>{userdata?.bill?.totalBalanceAmount !== null ? userdata?.bill?.totalBalanceAmount.toFixed(2) : (userdata?.bill?.payableAmount !== null ? userdata?.bill?.payableAmount.toFixed(2) : null)}</p>
                            </div>
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Discount:</p>
                                <p className='invoice-total-amount'>{userdata?.bill?.totalDiscount || 0}</p>
                            </div>
                            <hr className='my-50' />
                            <div className='invoice-total-item'>
                                <p className='invoice-total-title'>Subtotal:</p>
                                {/*<p className='invoice-total-amount'>{userdata?.bill?.payableAmount !== null ? userdata?.bill?.payableAmount.toFixed(2) : null}</p>*/}
                                <p className='invoice-total-amount'>{userdata?.bill?.payableAmount !== null ? Math.round(userdata?.bill?.payableAmount) : null}</p>
                            </div>
                        </div>
                    </Col>
                </Row>

                <hr className='my-2' />

                <Row >
                    <Col sm='12'>
                        <span className='fw-bold'>Remarks:</span>
                        <span>
                            {userdata?.bill?.overAllRemarks || "No remarks"}
                        </span>
                    </Col>
                </Row>
            </div>

        </Fragment>
    )
}

export default EstimatePrint
