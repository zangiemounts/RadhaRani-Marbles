// ** React Imports
import React, { Fragment, useState, useEffect } from 'react'
import "flatpickr/dist/themes/material_green.css"
// ** Custom Components
import Swal from 'sweetalert2'
// ** Third Party Components
import axios from 'axios'
import Flatpickr from 'react-flatpickr'
import { Plus, Hash, Trash2, ArrowLeft, Eye } from 'react-feather'
import { Row, Col, Card, Input, Spinner, Button, CardBody, CardText, InputGroup, InputGroupText, Table } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
// ** Styles
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import CheckBill from './CheckBill'

const AddCard = () => {
    const navigate = useNavigate()
  const [userdata, setuserdata] = useState([])
  const [itemdata, setitemdata] = useState([])
    const [toggle, settoggle] = useState(false)
    const [billloading, setbillloading] = useState(false)
    const [query, setquery] = useState(window.location.search)
    const date = new Date()
    const year = date.getFullYear()
    const dudate = new Date()
    const [dueDatepicker, setDueDatePicker] = useState(`${dudate.getFullYear()}-${dudate.getMonth() + 1}-${dudate.getDate()}`)
    const [header, setheader] = useState([])
    
  const [options, setOptions] = useState([
    {
      value: 'add-new',
      label: 'Add New Customer',
      type: 'button',
      color: 'flat-success'
    }
  ])
    const [load, setload] = useState(true)
    const [Data, setData] = useState([])
    const [BankData, setBankData] = useState([])
    const [data, setdata] = useState({
        Productname: "",
        unittype: "",
        price: 0,
        discount: 0,
        tax: 0,
        quantity: 1,
        totalamount:0,
        payableamount: 0,
        totaltaxamo: 0,
        billId:0
    })
  useEffect(() => {
    // ** Get Clients
    axios.get('/api/invoice/clients').then(response => {
      const arr = options
      response.data.map(item => arr.push({ value: item.name, label: item.name }))
      setOptions([...arr])
    })

    // ** Get Invoices & Set Invoice Number
    axios
      .get('/apps/invoice/invoices', {
        q: '',
        page: 1,
        status: '',
        sort: 'asc',
        perPage: 10,
        sortColumn: 'id'
      })
     
  }, [])
    const onInputChange2 = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
        //console.log(e.target.value)
    }

    const getData3 = async () => {
        setbillloading(true)
        const sendData = {
            OrgId: Number(userdata.orgId),
            UserId: Number(userdata.userId),
            ProductName: data.Productname,
            UnitType: data.unittype,
            MainCatId2: 7,
            SalesCost: Number(data.price),
            Apikey2: window.location.search,
            OrderQty: Number(data.quantity)
        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Additem`, {
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
                if (response === "Done") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Added',
                        text: 'Item Added Successfully'
                    })
                    getItem(userdata.orgId, userdata.userId)
                    getTotal(userdata.orgId, userdata.userId)
                    setbillloading(false)
                }
            })

    }
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

    const Discount = async () => {
        const sendData = {
            OrgId: Number(userdata.orgId),
            UserId: Number(userdata.userId),
            InstrumentRemarks: window.location.search,
            TaxcatPercentage: Number(data.tax),
            TotalDiscount: Number(data.discount)
        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Discount`, {
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
                //getItem(userdata.orgId, userdata.userId)
                getTotal(userdata.orgId, userdata.userId)
            })

    }

    const Delete = async (Id) => {
        const sendData = {
            OrgId: Number(userdata.orgId),
            MountsBillDetailsId: Id,
            Apikey2: window.location.search
        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Deleteitem`, {
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
                if (response === "Done") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete',
                        text: 'Item Removed Successfully'
                    })
                    getItem(userdata.orgId, userdata.userId)
                    getTotal(userdata.orgId, userdata.userId)
                }
            })

    }

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
                console.log(response)
                setuserdata(response)
                getItem(response.orgId, response.userId)
                getTotal(response.orgId, response.userId)
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
                    settoggle(true)
                } else {
                    setitemdata([])
                    settoggle(false)
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

    const OrgDetail = async () => {


        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
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
                    ////console.log(data)
                    if (data.length <= 0) {
                        setload(false)
                    } else {
                        setData(data[0])
                    }

                })


    }

    const BankDetail = async () => {


        localStorage.setItem('urlPath', window.location.pathname)
        const sendData2 = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
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
                        setload(false)
                    } else {
                        setBankData(data[0])
                    }

                })


    }
  
  /*const note =
    'It was a pleasure working with you and your team. We hope you will keep us in mind for future freelance projects. Thank You!'*/
    useEffect(() => {
        getData4()
        OrgDetail()
        BankDetail()
        const url = "/apps/invoice/ViewBill"
        setquery(url + window.location.search)
    }, [])
    useEffect(() => {
        if (data.discount > 0 || data.tax > 0) {
            Discount()
        }
    }, [data.discount, data.tax, userdata, itemdata.length])
    const userAvatar = defaultAvatar
  return (
      <Fragment>
          <Row className='invoice-add'>
              <Col xl={9} md={8} sm={12}>
                  
                  <Card className='invoice-preview-card'>
        {/* Header */}
        <CardBody className='invoice-padding pb-0'>
          <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
            <div>
              <div className='logo-wrapper'>
                      <img src={load ? `https://mountsfileupload.azurewebsites.net/api/FileUpload/${Data.logoImage2}` : userAvatar} alt="" height='100' width='150' />
                             {/*<h3 className='text-primary invoice-logo'>Mounts</h3>*/}
                  </div>
                 <h3 className='text-primary invoice-logo'>{Data.mainDesc}</h3>
                    <b><p className='card-text mb-25'>{Data.domainDesc} {Data.urlimage1} {Data.urlimage2}</p>
                                 <p className='card-text mb-0'>{`${Data.ocremarks}, ${Data.urlimage6}`}</p>
                                 <p className='card-text mb-0'>PAN NO:<span style={{ color: "blue" }}>{` ${BankData.domainDesc}`}</span>, GST NO:<span style={{ color: "blue" }}>{` ${Data.apikey1}`}</span></p>
                                 <p className='card-text mb-0'>HSN NO:<span style={{ color: "blue" }}>{` ${BankData.remarks}`}</span></p></b>
              </div>
            <div className='invoice-number-date mt-md-0 mt-2'>
              <div className='d-flex align-items-center justify-content-md-end mb-1'>
                <h4 className='invoice-title'>Invoice</h4>
                <InputGroup className='input-group-merge invoice-edit-input-group disabled'>
                  <InputGroupText>
                    <Hash size={15} />
                  </InputGroupText>
                  <Input
                    type='number'
                    className='invoice-edit-input'
                    placeholder={`${header.urlimage4 === null ? 0 : header.urlimage4}`}
                    disabled
                  />
                </InputGroup>
              </div>
              <div className='d-flex align-items-center mb-1'>
                <span className='title'>Date:</span>
                <Flatpickr
                  disabled
                  style={{color:"black"}}
                  value={header.createdOn}
                  className='form-control invoice-edit-input date-picker'
                />
              </div>
              <div className='d-flex align-items-center'>
                <span className='title'>Due Date:</span>
                <Flatpickr
                  options={{ minDate: header.createdOn, dateFormat: "Y-m-d" }}
                  value={dueDatepicker}
                  onChange={(selectedDates, dateStr, instance) => {
                   setDueDatePicker(dateStr)
                  }}
                  className='form-control invoice-edit-input due-date-picker'
                />
              </div>
            </div>
          </div>
        </CardBody>
        {/* /Header */}

        <hr className='invoice-spacing' />
          
        {/* Address and Contact */}
        <CardBody className='invoice-padding pt-0'>
          <Row className='row-bill-to invoice-spacing'>
            <Col className='col-bill-to ps-0' xl='8'>
              <h6 className='invoice-to-title text-primary'>Invoice To:</h6>
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
        {/* /Address and Contact */}
              {toggle ? <Table responsive>
                  <thead>
                      <tr>
                          <th className='py-1'>{header.columRemarks}</th>
                          <th className='py-1'>{header.urlimage1}</th>
                          <th className='py-1'>{header.urlimage2}</th>
                          <th className='py-1'>{header.urlimage3}</th>
                          <th className='py-1'>Total Cost</th>
                          <th className='py-1'>Remove</th>
                      </tr>
                  </thead>
                  <tbody>
                      {itemdata.length > 0 ? (itemdata.map(detail =>  <tr>
                          <td className='py-1'>
                              <p className='card-text fw-bold mb-25'>{detail.productName.productName}</p>

                          </td>
                          <td className='py-1'>
                              <span className='fw-bold'>{detail.productName.unitType}</span>
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
                          <td className='py-1'>
                              <Button color="danger" onClick={() => Delete(detail.mountsBillDetailsId)}><Trash2 size={14} className='me-25'></Trash2></Button>
                          </td>
                      </tr>)) : null}

                  </tbody>
              </Table> : null}
              <hr/>
        {/* Product Details */}
        <CardBody className='invoice-padding invoice-product-details'>

                  <Row>
                    <Col className='d-flex product-details-border position-relative pe-0' sm='12'>
                      <Row className='w-100 pe-lg-0 pe-1 py-2'>
                        <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg='3' sm='12'>
                          <CardText className='col-title mb-md-50 mb-0'>{header.columRemarks}</CardText>
                          <Input type='text' name="Productname"onChange={(e) => onInputChange2(e)} placeholder="Enter Activity Name" className='item-details'/>
                           
                        </Col>
                        <Col className='my-lg-0 my-2' lg='3' sm='12'>
                          <CardText className='col-title mb-md-2 mb-0'>{header.urlimage1}</CardText>
                           <Input type='text' name="unittype" onChange={(e) => onInputChange2(e)}  placeholder='Enter Activity Type' />
                             
                        </Col>
                        <Col className='my-lg-0 my-2' lg='2' sm='12'>
                          <CardText className='col-title mb-md-2 mb-0'>{header.urlimage2}</CardText>
                          <Input type='number' name="price" onChange={(e) => onInputChange2(e)} defaultValue='0' placeholder='Enter Cost of Product Value' />
                     
                              </Col>
                              <Col className='my-lg-0 my-2' lg='2' sm='12'>
                                  <CardText className='col-title mb-md-2 mb-0'>{header.urlimage3}</CardText>
                                  <Input type='number' name="quantity" onChange={(e) => onInputChange2(e)} defaultValue='1' placeholder='Enter Your Quantity' />

                              </Col>
                        <Col className='my-lg-0 mt-2' lg='2' sm='12'>
                          <CardText className='col-title mb-md-50 mb-0'>Price</CardText>
                          <CardText className='mb-0'>{(data.price * data.quantity).toFixed(2)}</CardText>
                         
                        </Col>
                      </Row>
                      
                    </Col>
                  </Row>
               
          <Row className='mt-1'>
            <Col sm='12' className='px-0'>
             {billloading ? <Spinner color="success"/> : <Button color='primary' size='sm' className='btn-add-new' onClick={() => getData3()}>
                <Plus size={14} className='me-25'></Plus> <span className='align-middle'>Add Item</span>
              </Button>}
            </Col>
                  </Row>
                  <Row className='w-100 pe-lg-0 pe-1 py-2'>
                      <Col className='mb-lg-0 mb-2 mt-lg-0 mt-2' lg='3' sm='12'>
                          <div className='mt-2'>
                              <span>Discount:</span>
                              <Input type='number' name="discount" value    ={data.discount} onChange={(e) => onInputChange2(e)} placeholder='24' />
                          </div>
                      </Col>
                      <Col className='my-lg-0 my-2' lg='3' sm='12'>
                          <div className='mt-2'>
                              <span>Tax:%</span>
                              <Input type='number' name="tax" value={data.tax} onChange={(e) => onInputChange2(e)} placeholder='Enter tax %' />
                          </div>
                      </Col>
                  
                  </Row>
        </CardBody>

        {/* /Product Details */}

        {/* Invoice Total */}
        <CardBody className='invoice-padding'>
          <Row className='invoice-sales-total-wrapper'>
            <Col className='mt-md-0 mt-3' md={{ size: '6', order: 1 }} xs={{ size: 12, order: 2 }}>
              {/*<div className='d-flex align-items-center mb-1'>
                <Label for='salesperson' className='form-label'>
                  Salesperson:
                </Label>
                <Input type='text' className='ms-50' id='salesperson' placeholder='Edward Crowley' />
              </div>*/}
            </Col>
            <Col className='d-flex justify-content-end' md={{ size: '6', order: 2 }} xs={{ size: 12, order: 1 }}>
              <div className='invoice-total-wrapper'>
                <div className='invoice-total-item'>
                  <p className='invoice-total-title'>Total:</p>
                  {/*<p className='invoice-total-amount'>{data.price * data.quantity}</p>*/}
                  <p className='invoice-total-amount'>{(data.totalamount).toFixed(2)}</p>
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
          
                          </Row>
            <hr/>
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
        {/* /Invoice Total */}

        <hr className='invoice-spacing mt-0' />

        {/* Invoice Note */}
      {/*  <CardBody className='invoice-padding py-0'>
          <Row>
            <Col>
              <div className='mb-2'>
                <Label for='note' className='form-label fw-bold'>
                  Note:
                </Label>
                <Input type='textarea' rows='2' id='note' defaultValue={note} />
              </div>
            </Col>
          </Row>
        </CardBody>*/}
        {/* /Invoice Note */}
                      </Card>
                 
              </Col>
              <Col xl={3} md={4} sm={12}>
                  <Card className='invoice-action-wrapper'>
                      <CardBody>
                          {/*<Button color='primary' block className='mb-75' disabled>
                              Send Invoice
                          </Button>*/}
                          <Button color='dark' block className='mb-75' onClick={() => navigate(-1)}>
                              <ArrowLeft size={20 } /> Go Back
                          </Button>

                          <Button tag={Link} to={query} color='primary' block outline className='mb-75'>
                              <Eye size={20 } />   Preview
                          </Button>
                         
                          <CheckBill dueDatepicker={dueDatepicker} />
                          
                      </CardBody>
                  </Card>
              </Col>
          </Row>
      
    </Fragment>
  )
}

export default AddCard
