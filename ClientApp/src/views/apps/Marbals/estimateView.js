// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Button, CardBody, CardText, Table, CardHeader, CardTitle } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import img2 from '@src/assets/images/radharanilogo.jpg'
import { ArrowLeft, Printer } from 'react-feather'
import TaxData from './taxData'

// ** Constants
const ORG_ID_KEY = 'orgId'
const CART_KEY = 'createcart'
const API_BASE = process.env.REACT_APP_API_LINK

// ** Helper
const fetchJson = async (endpoint, body) => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

const safeFixed = (val, digits = 2) => (val !== null ? Number(val).toFixed(digits) : null)

const EstimateView = () => {
    const navigate = useNavigate()
    const reportTemplateRef = useRef(null)

    const [itemdata, setItemdata] = useState([])
    const [TotalTax, setTotalTax] = useState(0)
    const [userdata, setUserdata] = useState({})
    const [orgData, setOrgData] = useState({})

    const orgId = Number(localStorage.getItem(ORG_ID_KEY))
    const cartKey = localStorage.getItem(CART_KEY)

    useEffect(() => {
        const loadData = async () => {
            try {
                const [cartRes, viewRes] = await Promise.all([
                    fetchJson('api/Radharani/GetCartItems', { OrgId: orgId, InstrumentRemarks: cartKey }),
                    fetchJson('api/Radharani/ViewCart', { OrgId: orgId, ApiKey2: cartKey, WebHeader: 'Newcart', ActiveStatus: 'A' })
                ])

                setTotalTax(cartRes.reduce((sum, item) => sum + (item.totalTax ?? 0), 0))
                setItemdata(cartRes.length > 0 ? cartRes : [])
                setUserdata(viewRes)
            } catch (err) {
                console.error('Failed to load estimate data:', err)
            }

            // Fetch org address separately so failure doesn't block invoice
            fetchJson('api/Radharani/Getorgid', { ActualWebsite: window.location.hostname, OrgName: 'test' })
                .then(setOrgData)
                .catch(err => console.warn('Getorgid failed:', err))
        }

        loadData()
    }, [])

    const orgAddress = [orgData?.orgAddress, orgData?.orgCity, orgData?.orgState, orgData?.orgCountry]
        .filter(Boolean).join(', ')

    return (
        <Fragment>
            <Row className='invoice-preview'>
                <Col xl={12} md={12} sm={12}>
                    <Card className='invoice-preview-card'>
                        <div id='capture' ref={reportTemplateRef}>

                            {/* Header */}
                            <CardBody className='invoice-padding pb-0'>
                                <div className='d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0'>
                                    <div>
                                        <div><img src={img2} height='100' width='200' alt='Logo' /></div>
                                        <h3 className='text-primary invoice-logo'>RADHARANI MARBLE GRANITE PRIVATE LIMITED</h3>
                                        <b>
                                            {orgAddress && <p className='card-text mb-25'>{orgAddress}</p>}
                                            <p className='card-text mb-0'>E-Mail: <span style={{ color: 'blue' }}>{orgData?.orgEmail}</span></p>
                                            <p className='card-text mb-0'>GST NO: <span style={{ color: 'blue' }}>{orgData?.orgFax1}</span></p>
                                        </b>
                                    </div>
                                    <div className='invoice-number-date mt-md-0 mt-2'>
                                        <h4 className='fw-bold text-end mb-1'>Estimation #E{userdata?.orderNo ?? 0}</h4>
                                        <div className='d-flex align-items-center mb-1'>
                                            <span className='title'>Date:</span>
                                            <span className='fw-bold'> {userdata?.bill?.createdOn?.slice(0, 10)}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>

                            <hr className='invoice-spacing' />

                            {/* Customer Info */}
                            <CardBody className='invoice-padding pt-0'>
                                <Row className='invoice-spacing'>
                                    <Col className='p-0' xl='8'>
                                        <font size='4'><b>
                                            <CardText className='mb-25'>Name: {userdata.user?.firstName} {userdata.user?.lastName}</CardText>
                                            <CardText className='mb-25'>Phone No: {userdata.user?.phoneNo ?? '9876543210'}</CardText>
                                            <CardText className='mb-0'>Address: {[userdata?.user?.address1, userdata?.user?.address2, userdata?.user?.pincode].filter(Boolean).join(' ')}</CardText>
                                        </b></font>
                                    </Col>
                                </Row>
                            </CardBody>

                            {/* Back Button */}
                            <CardBody className='invoice-padding pt-0'>
                                <Row className='invoice-spacing'>
                                    <Col className='p-0' xl='3'>
                                        <Button color='danger' block outline className='mb-75' size='lg' onClick={() => navigate('/quotations')}>
                                            <ArrowLeft size={20} /> Go Back
                                        </Button>
                                    </Col>
                                </Row>
                            </CardBody>

                            {/* Items Table */}
                            <Table responsive>
                                <thead>
                                    <tr>
                                        {['S.No.', 'Particular', 'Quantity', 'Rate', 'Amount', 'Tax', 'Tax Amount', 'Delivery', 'Total Amount'].map(h => (
                                            <th key={h} className='py-1' style={['Particular', 'Quantity', 'Rate', 'Delivery', 'Total Amount'].includes(h) ? { minWidth: '200px' } : {}}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemdata.map((detail, index) => (
                                        <tr key={detail.productDetailsId ?? index}>
                                            <td className='py-1'><p className='card-text fw-bold mb-25'>{index + 1}</p></td>
                                            <td className='py-1'>
                                                <p className='card-text fw-bold mb-25'>{detail.product.productName}</p>
                                                {/*<font size='4'>Price - <span className='fw-bold' style={{ color: '#3dd23d' }}><TaxData cost='sales' productDetailsId={detail.productDetailsId} /></span></font>*/}
                                            </td>
                                            <td className='py-1'><p className='card-text fw-bold mb-25'>{detail.quantity} {detail.product.unitType}</p></td>
                                            <td className='py-1'><p className='card-text fw-bold mb-25'>{detail.totalDiscount}/ {detail.product.unitType}</p></td>
                                            <td className='py-1'><span className='fw-bold'>{safeFixed(detail.totalAmount)}</span></td>
                                            <td className='py'><TaxData productDetailsId={detail.productDetailsId} /></td>
                                            <td className='py'><span className='fw-bold'>{safeFixed(detail.totalTax)}</span></td>
                                            <td className='py-1'><span className='fw-bold'>{safeFixed(detail.purchaseCost)}</span></td>
                                            <td className='py-1'><span className='fw-bold'>{safeFixed(detail.payableAmount)}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>

                            <hr />

                            {/* Totals */}
                            <CardBody className='invoice-padding pb-0'>
                                <Row className='invoice-sales-total-wrapper'>
                                    <Col md='6' order={{ md: 1, lg: 2 }} />
                                    <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
                                        <div className='invoice-total-wrapper'>
                                            <div className='invoice-total-item'>
                                                <font size='3'><p className='invoice-total-title'>Total Tax:</p></font>
                                                <p className='invoice-total-amount'>{TotalTax.toFixed(2)}</p>
                                            </div>
                                            <div className='invoice-total-item'>
                                                <font size='3'><p className='invoice-total-title'>Delivery & Lifting Charges:</p></font>
                                                <p className='invoice-total-amount'>{userdata?.bill?.billLossCost}</p>
                                            </div>
                                            <hr className='my-50' />
                                            <div className='invoice-total-item'>
                                                <font size='3'><p className='invoice-total-title'>Total:</p></font>
                                                <font size='4'><p className='invoice-total-amount' style={{ color: '#e45b18' }}>
                                                    {safeFixed(userdata?.bill?.totalBalanceAmount ?? userdata?.bill?.payableAmount)}
                                                </p></font>
                                            </div>
                                            <div className='invoice-total-item'>
                                                <font size='3'><p className='invoice-total-title'>Discount:</p></font>
                                                <p className='invoice-total-amount'>{userdata?.bill?.totalDiscount ?? 0}</p>
                                            </div>
                                            <hr className='my-50' />
                                            <div className='invoice-total-item'>
                                                <font size='3'><p className='invoice-total-title'>Subtotal:</p></font>
                                                <font size='4'><p className='invoice-total-amount' style={{ color: '#36b436' }}>
                                                    {userdata?.bill?.payableAmount !== null ? Math.round(userdata?.bill?.payableAmount) : null}
                                                </p></font>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </CardBody>

                            <hr className='invoice-spacing' />

                            {/* Remarks */}
                            <CardBody className='invoice-padding pt-0'>
                                <Row>
                                    <Col md='12' order={{ md: 1, lg: 2 }}>
                                        <Card>
                                            <CardHeader><CardTitle tag='h4'>Remarks</CardTitle></CardHeader>
                                            {userdata?.bill?.overAllRemarks || 'No remarks'}
                                        </Card>
                                    </Col>
                                </Row>
                            </CardBody>

                            <hr className='invoice-spacing' />

                            {/* Print Button */}
                            <CardBody className='invoice-padding pt-0'>
                                <Row>
                                    <Col sm='4' /><Col sm='4' />
                                    <Col sm='4'>
                                        <Button color='warning' size='lg' tag={Link} to='/estimatePrint' target='_blank' block className='mb-75'>
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