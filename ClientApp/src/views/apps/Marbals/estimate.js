// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Button, CardBody, Input, CardText, Table, CardHeader, CardTitle } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import img2 from '@src/assets/images/radharanilogo.jpg'
import { Plus, Trash2, EyeOff } from 'react-feather'
import TaxData from './taxData'
import Swal from 'sweetalert2'

const Estimate = () => {
    const navigate = useNavigate()
    const [itemdata, setitemdata] = useState([])
    const [TotalTax, setTotalTax] = useState(0)
    const [userdata, setuserdata] = useState([])
    const [deliverycharge, setdeliverycharge] = useState(userdata?.bill?.billLossCost || "0")
    const [discount, setdiscount] = useState(userdata?.bill?.totalDiscount || "0")
    const [BillId, setBillId] = useState(0)
    const date = new Date()
    const [formdata, setformdata] = useState({
       
        quantity: 0,
        amount: 0
    })
    const reportTemplateRef = useRef(null)
    console.log("Discount", discount)
    console.log("deliverycharge", deliverycharge)
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
                //  console.log(response)
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

    const onDelivery = async () => {

        const sendData = {
            BillId: Number(BillId),
            TotalAmount: Number(deliverycharge),
            TotalDiscount: Number(discount),
            ActiveStatus: "A"
        }

        console.log("Deleivery senddta", sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/EditCartItemsD`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then(response => response.json())
            .then(
                maindata => {
                    //console.log(maindata)
                    if (maindata === "Done") {
                         toast.success("Delivery Updated", {
                                    position: "top-center"
                            })
                        getCart()
                        EditData()
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Not Updated',
                            text: 'Oops! Delivery Not Updated'
                        })
                    }

                })
    }

    const onDelete = async (e, id, id2, t) => {
        const sendData = {
            BillId: Number(id),
            MountsBillDetailsId: Number(id2),
            ProductId: Number(55),
            Product: Number([]),
            Quantity: Number(e),
            TotalAmount: Number(0),
            ActiveStatus: "D"
        }

        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/EditCartItems`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then(response => response.json())
            .then(
                maindata => {
                    if (maindata === "Done") {
                        onDelivery()
                       
                    } else {
                        window.location.reload()
                    }

                })
    }

    const onInputChange = async (e, id, id2, t) => {
       
        const sendData = {
            BillId: Number(id),
            MountsBillDetailsId: Number(id2),
            ProductId: Number(55),
            Product: Number([]),
            Quantity: Number(e),
            TotalAmount: Number(t),
            ActiveStatus: "A"
        }

        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/EditCartItems`, {
            method: 'POST',
            headers: {
                 Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then(response => response.json())
            .then(
                maindata => {
                    console.log(maindata)
                    getCart()
                    EditData()
                   
                })
    }

    const onInputChange2 = async (e, id, id2, t) => {
        console.log(formdata)

        const sendData = {
            BillId: Number(id),
            MountsBillDetailsId: Number(id2),
            ProductId: Number(55),
            Product: Number([]),
            Quantity: Number(t),
            TotalAmount: Number(e),
            ActiveStatus: "A"
        }

        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/EditCartItems`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then(response => response.json())
            .then(
                maindata => {
                    console.log(maindata)
                    getCart()
                    EditData()

                })
    }

     const EditData = async (data) => {
         const sendData = {
             OrgId: Number(localStorage.getItem("orgId")),
             ApiKey2: localStorage.getItem("createcart"),
             WebHeader: "Newcart",
             ActiveStatus:"A"

        }
      //  console.log(sendData)
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
              //  console.log(response)
                setBillId(response.bill.billId)
                setuserdata(response)
                setdeliverycharge(response?.bill?.billLossCost)
                setdiscount(response?.bill?.totalDiscount)
            })

    }

    const RecData = async (data, data2, data3, data4) => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            InstrumentRemarks: localStorage.getItem("createcart"),
            EmployeeId: Number(data),
            OverAllRemarks: data2,
            BillLossCost: Number(data3),
            BillProfitCost: Number(data4),
            ActiveStatus:"A"

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/CloseCart`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
               // console.log(response)
                EditData()
            })

    }
    
    const generate = async (data, data2, data3, data4) => {
         onDelivery()

        const sendData2 = {
            InstrumentRemarks: localStorage.getItem("createcart"),
            EmployeeId: Number(data),
            OverAllRemarks: data2,
            BillLossCost: data3,
            ActiveStatus: "C"
        }
        console.log("SendData", sendData2)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/CloseCart`, {
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
                    if (data === "Done") {
                        window.location.pathname = "/estimateView"
                    }
                   

                })


    }


    useEffect(() => {
        getCart()
        EditData()
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
                                            
                                            <p className='card-text mb-0'>E-Mail :<span style={{ color: "blue" }}>{` info@radharanimarble.com`}</span></p>
                                            <p className='card-text mb-0'>GST NO :<span style={{ color: "blue" }}>{` 06AAKCR1299R1ZH`}</span></p></b>
                                    </div>
                                    <div className='invoice-number-date mt-md-0 mt-2'>
                                        <div className='d-flex align-items-center justify-content-md-end mb-1'>
                                            <h4 className='fw-bold text-end mb-1'>Estimation #{`${userdata?.orderNo || 0}`}</h4>
                                        </div>
                                        <div className='d-flex align-items-center mb-1'>
                                            <span className='title'>Date:</span>
                                            <span className='fw-bold'> {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}</span>
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
                                        <Button color='success'  className='mb-75' size="lg" onClick={() => navigate(-1)}>
                                            <Plus size={20} />  Add items
                                        </Button>
                                    </Col>
                                   
                                </Row>
                            </CardBody>

                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th className='py-1'>S.No.</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Particular</th>
                                        <th className='py-1' style={{ minWidth:"200px" }}>Quantity | BOX</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Rate/Sqft | Rate/Box</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Amount</th>
                                        <th className='py-1'>Tax</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Delivery</th>
                                        <th className='py-1' style={{ minWidth: "200px" }}>Total Amount</th>
                                        <th className='py-1'>Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemdata.length >= 0 ? itemdata.map((detail, index) => (
                                      <tr key={index}>
                                        <td className='py-1'>
                                            <p className='card-text fw-bold mb-25'>{index + 1}</p>
                                        </td> 
                                        <td className='py-1'>
                                            <p className='card-text fw-bold mb-25'>{detail.product.productName}</p>
                                            <font size="4">Price -<span className='fw-bold' style={{ color: "#3dd23d" }}>  <TaxData cost="sales" productDetailsId={detail.productDetailsId} /></span></font><br/>
                                            <font size="4">Unit -<span className='fw-bold' style={{ color: "rgb(229 37 37 / 59%)" }}> {detail.product.unitType}</span></font>
                                         </td>
                                        <td className='py-1'>
                                            <Input id='quantity' className="m-1" name='quantity' onChange={(e) => onInputChange(e.target.value, detail.billId, detail.mountsBillDetailsId, detail.totalDiscount)} defaultValue={`${detail.quantity}`} placeholder='e.g: 1' /> 
                                        </td>
                                        <td className='py-1'>
                                            <Input id='amount' className="m-1"  name='amount' onChange={(e) => onInputChange2(e.target.value, detail.billId, detail.mountsBillDetailsId, detail.quantity)} defaultValue={detail.totalDiscount} placeholder='e.g: 1' />
                                        </td>                                        
                                        <td className='py-1'>
                                             <span className='fw-bold'>{detail.totalAmount !== null ? detail.totalAmount.toFixed(2) : null}</span>
                                        </td>
                                        <td className='py'>
                                            <TaxData productDetailsId={detail.productDetailsId} />
                                        </td>
                                        <td className='py-1'>
                                           {/* <span className='fw-bold'>{(userdata?.bill?.billLossCost / totalAmountSum) * detail.totalAmount}</span>*/}
                                            <span className='fw-bold'>{detail?.purchaseCost !== null ? detail?.purchaseCost.toFixed(2) : null}</span>
                                        </td>
                                        <td className='py-1'>
                                            <span className='fw-bold'>{detail?.payableAmount !== null ? detail?.payableAmount.toFixed(2) : null}</span>
                                        </td>
                                        <td className='py-1'>
                                                <span className='fw-bold'><Button color="danger" size="md" onClick={() => onDelete(detail.quantity, detail.billId, detail.mountsBillDetailsId, detail.totalDiscount) }><Trash2 size={35} /></Button></span>
                                        </td>
                                        
                                    </tr>)) : null}

                                </tbody>
                            </Table>
                            <hr />
                            <CardBody className='invoice-padding pb-0'>
                                <Row className='invoice-sales-total-wrapper'>
                                    <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
                                         
                                        
                                    </Col>
                                    <Col className='d-flex justify-content-end mt-2' md='6' order={{ md: 2, lg: 1 }}>
                                        <div className='invoice-total-wrapper'>

                                            <div className='invoice-total-item'>
                                                <font size="3">  <p className='invoice-total-title'>Total Tax:</p></font>

                                                <p className='invoice-total-amount'>{TotalTax.toFixed(2)}</p>
                                            </div>
                                            <div className='invoice-total-item'>
                                                <font size="3">  <p className='invoice-total-title'>Delivery Charges:</p></font>

                                                <p className='invoice-total-amount'><Input id='amount' type="number" className="m-1" style={{ maxWidth: "600%" }} name='amount' onChange={(e) => setdeliverycharge(e.target.value)} defaultValue={userdata?.bill?.billLossCost} placeholder='e.g: 1' /></p>
                                            </div>
                                            {/*<div className='invoice-total-item' >
                                                <font size="3">  <p className='invoice-total-title' style={{ alignItems: "center" }}><Button color="success" onClick={() => onDelivery() }>Update</Button></p></font>
                                            </div>*/}
                                            <div className='invoice-total-item'>
                                                <font size="3">  <p className='invoice-total-title'>Delivery & Lifting Charges:</p></font>

                                                <p className='invoice-total-amount'>{userdata?.bill?.billLossCost}</p>
                                            </div>
                                            <font size="3"> <hr className='my-50' /></font>
                                            <div className='invoice-total-item'>
                                                <font size="3"> <p className='invoice-total-title'>Amount Incl. all tax:</p> </font>
                                                <font size="4"> <p className='invoice-total-amount' style={{ color: "#36b436" }}>{userdata?.bill?.totalBalanceAmount !== null ? userdata?.bill?.totalBalanceAmount.toFixed(2) : null}</p></font>
                                            </div>
                                            <div className='invoice-total-item'>
                                                <font size="3">  <p className='invoice-total-title'>Discount:</p></font>

                                                <p className='invoice-total-amount'><Input id='discount' type="number" className="m-1" style={{ maxWidth: "600%" }} name='discount' onChange={(e) => setdiscount(e.target.value)} defaultValue={userdata?.bill?.totalDiscount} placeholder='e.g: 1' /></p>
                                            </div>
                                            
                                            <div className='invoice-total-item'>
                                                <font size="3">  <p className='invoice-total-title'>Discount:</p></font>

                                                <p className='invoice-total-amount'>{userdata?.bill?.totalDiscount}</p>
                                            </div>
                                            <div className='invoice-total-item' >
                                                <font size="3">  <p className='invoice-total-title' style={{ alignItems: "center" }}><Button color="success" onClick={() => onDelivery()}>Update</Button></p></font>
                                            </div>
                                            <font size="3"> <hr className='my-50' /></font>
                                            <div className='invoice-total-item'>
                                                <font size="3"> <p className='invoice-total-title'>Final Amount Incl. all tax & Discount:</p> </font>
                                                <font size="4"> <p className='invoice-total-amount' style={{ color: "#36b436" }}>{userdata?.bill?.payableAmount !== null ? Math.round(userdata?.bill?.payableAmount) : null}</p></font>
                                            </div>
                                        </div>
                                    </Col>
                                    
                                </Row>
                            
                            </CardBody>
                            <hr className='invoice-spacing' />

                            <CardBody className='invoice-padding pb-0'>
                                <Row className='invoice-sales-total-wrapper'>
                                    <Col className='mt-md-0 mt-3' md='12' order={{ md: 1, lg: 2 }}>
                                                <Card>
                                                    <CardHeader>
                                                        <CardTitle tag='h4'>Remarks</CardTitle>
                                                    </CardHeader>

                                            <Input type='textarea' id='exampleText' rows='5' className="m-1" name='amount' onChange={(e) => RecData(userdata?.cloudInterfactDisplaySectionId, e.target.value, userdata?.bill?.billLossCost, userdata?.bill?.billProfitCost)} defaultValue={userdata?.bill?.overAllRemarks} placeholder="e.g: 'Reamarks'" />
                                                    
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
                                        <Button color='danger' size="lg" block onClick={() => generate(userdata?.cloudInterfactDisplaySectionId, userdata?.bill?.overAllRemarks, userdata?.bill?.billLossCost, userdata?.bill?.billProfitCost)} className='mb-75'>
                                            <EyeOff size={20} />  Close Cart and Generate Estimate
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

export default Estimate
