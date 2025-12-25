// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Button, CardBody, CardText, Table } from 'reactstrap'
import { Link } from 'react-router-dom'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

const ViewBill = () => {
    const [BankData, setBankData] = useState([])
    const [itemdata, setitemdata] = useState([])
    const [userdata, setuserdata] = useState([])
    const [Invoicedate, setInvoicedate] = useState([])
    const [Data, setData] = useState([])
    const [DueData, setdueData] = useState([])
    const [avatar, Setavatar] = useState()
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
        billId:0
    })
    const reportTemplateRef = useRef(null)
    const getData4 = async () => {
        const sendData = {
            Apikey2: window.location.search

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getbillingdata`, {
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
                setInvoicedate(response.createdOn.slice(0, 10))
                setuserdata(response)
                getItem(response.orgId, response.userId)
                getTotal(response.orgId, response.userId)
                OrgDetail(response.orgId, response.userId)
                BankDetail(response.orgId, response.userId)
                Duesate(response.orgId, response.userId)
            })

    }
    const getItem = async (orgId, userId) => {
        const sendData = {
            OrgId: Number(orgId),
            UserId: Number(userId),
            InstrumentRemarks: window.location.search

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/GetItem`, {
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
                if (response.length > 0) {
                    setitemdata(response)
                } else {
                    setitemdata([])
                    
                }
            })

    }

     const OrgDetail = async (orgId, userId) => {


        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            OrgId: Number(orgId),
            UserId: Number(userId),
             ActiveStatus: "A",
            webHeader: "OrganizationDetails"

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
                    //console.log(data)
                    if (data.length <= 0) {
                        Setavatar(defaultAvatar)
                    } else {
                    setData(data[0])
                    }

                })


     }

    const Duesate = async (orgId, userId) => {


        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            Apikey2: window.location.search,
            webHeader: "Bill"

        }

        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getbillingcheck`, {
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
                    //console.log(data)
                    if (data.length <= 0) {
                        Setavatar(defaultAvatar)
                    } else {
                        setdueData(data)
                    }

                })


    }

    const BankDetail = async (orgId, userId) => {


        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            OrgId: Number(orgId),
            UserId: Number(userId),
            ActiveStatus: "A",
            webHeader: "OrganizationBankDetails"

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
                    //console.log(data)
                    if (data.length <= 0) {
                        Setavatar(defaultAvatar)
                    } else {
                        setBankData(data[0])
                    }

                })


    }

  
    const getTotal = async (orgId, userId) => {
        const sendData = {
            OrgId: Number(orgId),
            UserId: Number(userId),
            InstrumentRemarks: window.location.search

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Gettotal`, {
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
                if (response === "Nodata") {
                    setdata({ ...data, tax: 0, discount: 0, payableamount: 0, totalamount: 0 })

                } else {
                    setdata({ ...data, tax: response.taxcatPercentage, discount: response.totalDiscount, payableamount: response.payableAmount, totalamount: response.totalAmount, totaltaxamo: response.totalTax, billId: response.billId })
                }
            })

    }

    useEffect(() => {
        getData4()
    }, [])
  return (
      <Fragment>
          <Row className='invoice-preview'>
              <Col xl={9} md={8} sm={12}>
                  <Card className='invoice-preview-card'>
                      
          <div id="capture" style={{ background: "white"}} ref={reportTemplateRef}>
                      <CardBody className='invoice-padding pb-0'>
                          <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                              <div>
                                      <div className='logo-wrapper'>
                                          <img src={Data.length <= 0 ? avatar : `https://mountsfileupload.azurewebsites.net/api/FileUpload/${Data.logoImage2}`} height='100' width='150' />
                                  </div>
                                    <h3 className='text-primary invoice-logo'>{Data.mainDesc}</h3>
                                  <b><p className='card-text mb-25'>{Data.domainDesc}</p>
                                  <p className='card-text mb-25'>{Data.urlimage1} {Data.urlimage2}</p>
                                  <p className='card-text mb-0'>{Data.oremarks}</p>
                                 <p className='card-text mb-0'>{`${Data.ocremarks}, ${Data.urlimage6}`}</p></b>
                              </div>
                              <div  className='invoice-number-date mt-md-0 mt-2'>
                                  <div className='d-flex align-items-center justify-content-md-end mb-1'>
                                          <h4 className='fw-bold text-end mb-1'>INVOICE #{`${year}${data.billId}` }</h4>
                                  </div>
                                  <div className='d-flex align-items-center mb-1'>
                                      <span className='title'>Date:</span>
                                       <span className='fw-bold'> {Invoicedate}</span>
                                  </div>
                                  <div className='d-flex align-items-center'>
                                      <span className='title'>Due Date:</span>
                                      <span className='fw-bold'> {DueData.apikey1}</span>
                                  </div>
                              </div>
                          </div>
                      </CardBody>

              <hr className='invoice-spacing' />

              
              <CardBody className='invoice-padding pt-0'>
                  <Row className='invoice-spacing'>
                      <Col className='p-0' xl='8'>
                          <h6 className='mb-2 text-primary'><b>Invoice To:</b></h6>
                          <h6 className='mb-25'></h6>
                          <b><CardText className='mb-25'>{`${userdata.mainDesc} ${userdata.columRemarks}`}</CardText>
                          <CardText className='mb-25'>{`${userdata.urlimage2}`}</CardText>
                          <CardText className='mb-25'>{`${userdata.urlimage1}`}</CardText>
                          <CardText className='mb-0'>{`${userdata.urlimage3} ${userdata.ocremarks} ${userdata.urlimage4} ${userdata.urlimage5}`}</CardText></b>
                      </Col>
                                  <Col className='p-0 mt-xl-0 mt-2' xl='4'>
                                      <h6 className='mb-2 text-primary'><b>Payment Details:</b></h6>
                                      <table>
                                          <tbody>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>Total Due: <i style={{ color: "red" }}>{data.payableamount}</i></td>
                                                  <td>
                                                      <span className='fw-bold'></span>
                                                  </td>
                                              </tr>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>GST No: <i style={{ color: "blue" }}>{Data.apikey1}</i></td>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>Pan No: <i style={{ color: "blue" }}>{BankData.domainDesc}</i></td>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>Hsn No: <i style={{ color: "blue" }}>{BankData.remarks}</i></td>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>Bank name: <i style={{ color: "blue" }}>{BankData.mainDesc}</i></td>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>Bank Address: <i style={{ color: "blue" }}>{BankData.columRemarks} {BankData.oremarks} {BankData.ocremarks}</i></td>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>{BankData.apikey1 === "International" ? "IBAN" : "Account No"}: <i style={{ color: "blue" }}>{BankData.urlimage5}</i></td>
                                                  <td></td>
                                              </tr>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>{BankData.apikey1 === "International" ? "SWIFT code" : "IFSC Code"}: <i style={{ color: "blue" }}>{BankData.urlimage3}</i></td>
                                                  <td></td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </Col>
                  </Row>
              </CardBody>
       
              <Table responsive>
                  <thead>
                      <tr>
                          <th className='py-1'>Task description</th>
                          <th className='py-1'>Rate</th>
                          <th className='py-1'>QUANTITY</th>
                          <th className='py-1'>Total</th>
                      </tr>
                  </thead>
                  <tbody>
                     {itemdata.length >= 0 ? itemdata.map(detail => <tr>
                          <td className='py-1'>
                              <p className='card-text fw-bold mb-25'>{detail.productName.productName}</p>
                              <p className='card-text text-nowrap'>
                                 {detail.productName.unitType}
                              </p>
                          </td>
                          <td className='py-1'>
                              <span className='fw-bold'>{detail.totalAmount}</span>
                          </td>
                          <td className='py-1'>
                              <span className='fw-bold'>{detail.quantity}</span>
                          </td>
                          <td className='py-1'>
                              <span className='fw-bold'>{detail.payableAmount}</span>
                         </td>
                     </tr>) : null}
                      
                  </tbody>
              </Table>
                      <hr/>
              <CardBody className='invoice-padding pb-0'>
                  <Row className='invoice-sales-total-wrapper'>
                      <Col className='mt-md-0 mt-3' md='6' order={{ md: 1, lg: 2 }}>
                          
                      </Col>
                      <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
                          <div className='invoice-total-wrapper'>
                <div className='invoice-total-item'>
                  <p className='invoice-total-title'>Total:</p>
                  {/*<p className='invoice-total-amount'>{data.price * data.quantity}</p>*/}
                  <p className='invoice-total-amount'>{data.totalamount}</p>
                </div>
                <div className='invoice-total-item'>
                   <p className='invoice-total-title'>Discount:</p>
                   {/*<p className='invoice-total-amount'>{data.discount * (data.price * data.quantity) / 100}</p>*/}
                   <p className='invoice-total-amount'>{data.discount === null ? 0 : data.discount }</p>
                </div>
                <div className='invoice-total-item'>
                  <p className='invoice-total-title'>Tax %:</p>
                  {/*<p className='invoice-total-amount'>{((data.price * data.quantity) - (data.discount * (data.price * data.quantity) / 100)) * data.tax / 100}</p>*/}
                  <p className='invoice-total-amount'>{data.tax === null ? 0 : data.tax}</p>
                </div>
                <div className='invoice-total-item'>
                  <p className='invoice-total-title'>Total Tax:</p>
                  {/*<p className='invoice-total-amount'>{((data.price * data.quantity) - (data.discount * (data.price * data.quantity) / 100)) * data.tax / 100}</p>*/}
                  <p className='invoice-total-amount'>{data.totaltaxamo === null ? 0 : data.totaltaxamo}</p>
                </div>
                <hr className='my-50' />
                <div className='invoice-total-item'>
                  <p className='invoice-total-title'>Subtotal:</p>
                  {/*<p className='invoice-total-amount'>{(data.price * data.quantity) - (data.discount * (data.price * data.quantity) / 100) + (((data.price * data.quantity) - (data.discount * (data.price * data.quantity) / 100)) * data.tax / 100)}</p>*/}
                  <p className='invoice-total-amount'>{(data.payableamount)}</p>
                </div>
              </div>
                      </Col>
                  </Row>
              </CardBody>

              <hr className='invoice-spacing' />
              {/*<CardBody className='invoice-padding pt-0'>
                  <Row>
                      <Col sm='12'>
                          <span className='fw-bold'>Note: </span>
                          <span>
                              It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance
                              projects. Thank You!
                          </span>
                      </Col>
                  </Row>
              </CardBody>*/}
                      </div>
          </Card>
              </Col>
              <Col xl={3} md={4} sm={12}>
                  <Card className='invoice-action-wrapper'>
                      <CardBody>
                          <Button color='primary' block className='mb-75' onClick={() => setSendSidebarOpen(true)}>
                              Send Invoice
                          </Button>
                          
                          <Button color='secondary' tag={Link} to={`/apps/invoice/printBill${window.location.search}`} target='_blank' block outline className='mb-75'>
                              Print
                          </Button>
                       
                         {/* <Button color='success' block onClick={() => setAddPaymentOpen(true)}>
                              Add Payment
                          </Button>*/}
                      </CardBody>
                  </Card>
                  </Col>
              </Row>
         
    </Fragment>
  )
}

export default ViewBill
