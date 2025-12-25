// ** React Imports
import { Fragment, useEffect, useState } from 'react'

import { Row, Col, Card, Button, CardBody, CardText, Table } from 'reactstrap'
// ** Styles
import '@styles/base/pages/app-invoice-print.scss'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'

const PrintBill = () => {
    const [BankData, setBankData] = useState([])
    const [userdata, setuserdata] = useState([])
    const [Invoicedate, setInvoicedate] = useState([])
    const [Data, setData] = useState([])
    const [avatar, Setavatar] = useState()
    const [DueData, setdueData] = useState([])
    const date = new Date()
    const year = date.getFullYear()
    const [itemdata, setitemdata] = useState([])
    const [header, setheader] = useState([])
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
    const getSubmitData = async (id) => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            WebHeader: "BillHeader",
            Apikey2: window.location.search

        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getheaderdata`, {
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
                    console.log(data[0])
                    setheader(data[0])
                })
    }
    const getData4 = async () => {
        const sendData = {
            Apikey2: window.location.search

        }
       
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
                
                setuserdata(response)
                setInvoicedate(response.createdOn.slice(0, 10))
                getItem(response.orgId, response.userId)
                getTotal(response.orgId, response.userId)
                OrgDetail(response.orgId, response.userId)
                BankDetail(response.orgId, response.userId)
                Duesate(response.orgId, response.userId)
                getSubmitData(response.cloudInterfactDisplaySectionId)

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
                    setData(data[0])
                    Setavatar(defaultAvatar)

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
   setTimeout(() => window.print(), 1000)
  }, [])

  return (
      <Fragment>
          <Row className='invoice-preview'>
             
              <Col xl={9} md={8} sm={12}>
                  <Card className='invoice-preview-card'>

                      <div id="capture" style={{ background: "white" }}>
                          <CardBody className='invoice-padding pb-0'>
                              <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                                  <div>
                                      <div>
                                          <img src={Data.length <= 0 ? avatar : `https://mountsfileupload.azurewebsites.net/api/FileUpload/${Data.logoImage2}`} height='100' width='200' />
                                      </div>
                                      <h3 className='text-primary invoice-logo'>{Data.mainDesc}</h3>
                                      <b><p className='card-text mb-25'>{Data.domainDesc} {Data.urlimage1} {Data.urlimage2}</p>
                                          <p className='card-text mb-0'>{`${Data.ocremarks}, ${Data.urlimage6}`}</p>
                                          <p className='card-text mb-0'>PAN NO:<span style={{ color: "blue" }}>{` ${BankData.domainDesc}`}</span>, GST NO:<span style={{ color: "blue" }}>{` ${Data.apikey1}`}</span></p>
                                          <p className='card-text mb-0'>HSN NO:<span style={{ color: "blue" }}>{` ${BankData.remarks}`}</span></p></b>
                                  </div>
                                  <div className='invoice-number-date mt-md-0 mt-2'>
                                      <div className='d-flex align-items-center justify-content-md-end mb-1'>
                                          <h4 className='fw-bold text-end mb-1'>INVOICE #{`${header.urlimage4 === null ? 0 : header.urlimage4}`}</h4>
                                      </div>
                                      <div className='d-flex align-items-center mb-1'>
                                          <span className='title'>Date:</span>
                                          <span className='fw-bold'> {String(header.createdOn).slice(0, 10)}</span>
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
                                      <b><CardText className='mb-25'>Name: {`${userdata.mainDesc} ${userdata.columRemarks}`}</CardText>
                                          {userdata.remarks === "individual" ? <CardText className='mb-25'>Phone No: {`${userdata.urlimage2}`}</CardText> : null}
                                          <CardText className='mb-25'>Email: {`${userdata.urlimage1}`}</CardText>
                                          <CardText className='mb-0'>Address: {`${userdata.urlimage3} ${userdata.ocremarks} ${userdata.urlimage4} ${userdata.urlimage5}`}</CardText></b>
                                  </Col>
                                  <Col className='p-0 mt-xl-0 mt-2' xl='4'>
                                      <h6 className='mb-2 text-primary'><b>Total Due:</b></h6>
                                      <table>
                                          <tbody>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>Total Due: <i style={{ color: "red" }}>{(data.payableamount).toFixed(2)}</i></td>
                                                  <td>
                                                      <span className='fw-bold'></span>
                                                  </td>
                                              </tr>
                                              {userdata.remarks === "Org" ? < tr >
                                                  <td className='pe-1 fw-bold'>GST No: <i style={{ color: "blue" }}>{userdata.urlimage6}</i></td>
                                                  <td></td>
                                              </tr> : null}
                                              <tr>
                                                  <td className='pe-1 fw-bold'>PAN No: <i style={{ color: "blue" }}>{userdata.logoImage2}</i></td>
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
                                      <th className='py-1' colSpan="4" style={{ maxWidth: 50 }}>{header.columRemarks}</th>
                                      <th className='py-1'>{header.urlimage2}</th>
                                      <th className='py-1'>{header.urlimage3}</th>
                                      <th className='py-1'>Price</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {itemdata.length >= 0 ? itemdata.map(detail => <tr>
                                      <td className='py-1' colSpan="4" style={{ maxWidth : 50 }}>
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
                                          <span className='fw-bold'>{(detail.payableAmount).toFixed(2)}</span>
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
                                              <p className='invoice-total-title'>Total:</p>
                                              {/*<p className='invoice-total-amount'>{data.price * data.quantity}</p>*/}
                                              <p className='invoice-total-amount'>{(data.totalamount).toFixed(2)}</p>
                                          </div>
                                          <div className='invoice-total-item'>
                                              <p className='invoice-total-title'>Discount:</p>
                                              {/*<p className='invoice-total-amount'>{data.discount * (data.price * data.quantity) / 100}</p>*/}
                                              <p className='invoice-total-amount'>{data.discount === null ? 0 : data.discount}</p>
                                          </div>
                                          <div className='invoice-total-item'>
                                              <p className='invoice-total-title'>Tax %:</p>
                                              {/*<p className='invoice-total-amount'>{((data.price * data.quantity) - (data.discount * (data.price * data.quantity) / 100)) * data.tax / 100}</p>*/}
                                              <p className='invoice-total-amount'>{data.tax === null ? 0 : data.tax}</p>
                                          </div>
                                          <div className='invoice-total-item'>
                                              <p className='invoice-total-title'>Total Tax:</p>
                                              {/*<p className='invoice-total-amount'>{((data.price * data.quantity) - (data.discount * (data.price * data.quantity) / 100)) * data.tax / 100}</p>*/}
                                              <p className='invoice-total-amount'>{data.totaltaxamo === null ? 0 : (data.totaltaxamo).toFixed(2)}</p>
                                          </div>
                                          <hr className='my-50' />
                                          <div className='invoice-total-item'>
                                              <p className='invoice-total-title'>Subtotal:</p>
                                              {/*<p className='invoice-total-amount'>{(data.price * data.quantity) - (data.discount * (data.price * data.quantity) / 100) + (((data.price * data.quantity) - (data.discount * (data.price * data.quantity) / 100)) * data.tax / 100)}</p>*/}
                                              <p className='invoice-total-amount'>{(data.payableamount).toFixed(2)}</p>
                                          </div>
                                      </div>
                                  </Col>
                                  <hr/>
                              </Row>
                              <Row className='invoice-spacing'>
                                  <Col className='p-0' xl='6'>
                                      <h3 className='mb-2 text-primary'><b>BANK PAYMENT DETAILS:</b></h3>
                                      <h6 className='mb-25'></h6>

                                  </Col>
                                  <Col className='p-0 mt-xl-0 mt-2' xl='6'>
                                      {/* <h6 className='mb-2 text-primary'><b>Total Due:</b></h6>*/}
                                      <table>
                                          <tbody>
                                              <tr>
                                                  <td className='pe-1 fw-bold'>Total Due: <i style={{ color: "red" }}>{(data.payableamount).toFixed(2)}</i></td>
                                                  <td>
                                                      <span className='fw-bold'></span>
                                                  </td>
                                              </tr>

                                              <tr>
                                                  <td className='pe-1 fw-bold'>Bank name: <i style={{ color: "blue" }}>{BankData.mainDesc}</i></td>
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
                                              <tr>
                                                  <td className='pe-1 fw-bold'>Bank Address: <i style={{ color: "blue" }}>{BankData.columRemarks} {BankData.oremarks} {BankData.ocremarks}</i></td>
                                                  <td></td>
                                              </tr>
                                          </tbody>
                                      </table>
                                  </Col>
                              </Row>
                          </CardBody>


                          <hr className='invoice-spacing' />
                          <CardBody className='invoice-padding pt-0'>
                              <Row>
                                  <Col sm='12'>
                                      <span className='fw-bold'> </span>
                                      <span>
                                          *Computer Generated Invoice Signature Not Required
                                      </span>
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

export default PrintBill
