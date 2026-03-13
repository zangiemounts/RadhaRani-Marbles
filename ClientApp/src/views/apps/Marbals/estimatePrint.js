// ** React Imports
import { Fragment, useEffect, useState } from 'react'
import { Row, Col, Table } from 'reactstrap'

// ** Style
import '@styles/base/pages/app-invoice-print.scss'
import img2 from '@src/assets/images/radharanilogo.jpg'
import TaxData from './taxData'

// ** Constants
const ORG_ID_KEY = 'orgId'
const CART_KEY = 'createcart'
const COMPANY_NAME = 'RADHARANI MARBLE GRANITE PRIVATE LIMITED'

const API_BASE = process.env.REACT_APP_API_LINK

// ** Helpers
const formatDate = (dateStr) => dateStr?.slice(0, 10) ?? ''
const safeFixed = (val, digits = 2) => (val !== null ? Number(val).toFixed(digits) : '—')

const fetchJson = async (endpoint, body) => {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return res.json()
}

// ** Sub-components
const CompanyHeader = ({ orderNo, createdOn, orgData }) => {
    const address = [orgData?.orgAddress, orgData?.orgCity, orgData?.orgState, orgData?.orgCountry]
        .filter(Boolean).join(', ')

    return (
        <div className='d-flex justify-content-between flex-md-row flex-column pb-2'>
            <div>
                <div className='d-flex mb-1'>
                    <img src={img2} height='80' width='80' alt='Company Logo' />
                    <h3 className='text-primary fw-bold ms-1 mt-2'>{COMPANY_NAME}</h3>
                </div>
                <b>
                    {address && <p className='mb-25'>{address}</p>}
                    <p className='mb-25'>E-Mail: <span style={{ color: 'blue' }}>{orgData?.orgEmail}</span></p>
                    <p className='card-text mb-0'>GST NO: <span style={{ color: 'blue' }}>{orgData?.orgFax1}</span></p>
                </b>
            </div>
            <div className='mt-md-0 mt-2'>
                <h4 className='fw-bold text-end mb-1'>Estimation #E{orderNo ?? 0}</h4>
                <div className='invoice-date-wrapper mb-50'>
                    <span className='invoice-date-title'>Date Issued:</span>
                    <span className='fw-bold'> {formatDate(createdOn)}</span>
                </div>
            </div>
        </div>
    )
}

const CustomerInfo = ({ user }) => (
    <Row className='pb-2'>
        <Col sm='6'>
            <b>
                <p className='mb-25'>Name: {user?.firstName} {user?.lastName}</p>
                <p className='mb-25'>Phone No: {user?.phoneNo ?? '9876543210'}</p>
                <p className='mb-25'>Address: {[user?.address1, user?.address2, user?.pincode].filter(Boolean).join(' ')}</p>
            </b>
        </Col>
    </Row>
)

const ItemRow = ({ detail, index }) => (
    <tr>
        <td className='py-1'><strong>{index + 1}</strong></td>
        <td className='py-1 ps-4'>
            <p className='fw-semibold mb-25'>{detail.product?.productName}</p>
        </td>
        <td className='py-1 ps-2'>
            <strong>{detail.quantity} {detail.product?.unitType}</strong>
        </td>
        <td className='py-1 ps-3'>
            <strong>{detail.totalDiscount}/ {detail.product?.unitType}</strong>
        </td>
        <td className='py-1 ps-5'>
            <strong><TaxData productDetailsId={detail.productDetailsId} /></strong>
        </td>
        <td className='py-1'>
            <strong>{safeFixed(detail.payableAmount)}</strong>
        </td>
        <td className='py-1' />
    </tr>
)

const TotalsPanel = ({ totalTax, bill }) => (
    <Row className='invoice-sales-total-wrapper mt-3'>
        <Col md='6' order={{ md: 1, lg: 2 }} />
        <Col className='d-flex justify-content-end' md='6' order={{ md: 2, lg: 1 }}>
            <div className='invoice-total-wrapper'>
                {[
                    { label: 'Total Tax:', value: safeFixed(totalTax) },
                    { label: 'Delivery & Lifting Charges:', value: bill?.billLossCost ?? 0 }
                ].map(({ label, value }) => (
                    <div className='invoice-total-item' key={label}>
                        <p className='invoice-total-title'>{label}</p>
                        <p className='invoice-total-amount'>{value}</p>
                    </div>
                ))}

                <hr className='my-50' />

                <div className='invoice-total-item'>
                    <p className='invoice-total-title'>Total:</p>
                    <p className='invoice-total-amount'>
                        {safeFixed(bill?.totalBalanceAmount ?? bill?.payableAmount)}
                    </p>
                </div>

                <div className='invoice-total-item'>
                    <p className='invoice-total-title'>Discount:</p>
                    <p className='invoice-total-amount'>{bill?.totalDiscount ?? 0}</p>
                </div>

                <hr className='my-50' />

                <div className='invoice-total-item'>
                    <p className='invoice-total-title'>Subtotal:</p>
                    <p className='invoice-total-amount'>
                        {bill?.payableAmount !== null ? Math.round(bill.payableAmount) : '—'}
                    </p>
                </div>
            </div>
        </Col>
    </Row>
)

// ** Main Component
const EstimatePrint = () => {
    const [totalTax, setTotalTax] = useState(0)
    const [itemData, setItemData] = useState([])
    const [userData, setUserData] = useState({})
    const [orgData, setOrgData] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const orgId = Number(localStorage.getItem(ORG_ID_KEY))
    const cartKey = localStorage.getItem(CART_KEY)
    //ActualWebsite: "radharanimarblekolkata.mounts.in"
    useEffect(() => {
        const loadData = async () => {
            try {
                const [cartRes, viewRes, orgRes] = await Promise.all([
                    fetchJson('api/Radharani/GetCartItems', { OrgId: orgId, InstrumentRemarks: cartKey }),
                    fetchJson('api/Radharani/ViewCart', { OrgId: orgId, ApiKey2: cartKey, WebHeader: 'Newcart', ActiveStatus: 'A' }),
                    fetchJson('api/Radharani/Getorgid', { ActualWebsite: window.location.hostname, OrgName: 'test' })
                ])

                const tax = cartRes.reduce((sum, item) => sum + (item.totalTax ?? 0), 0)
                setTotalTax(tax)
                setItemData(cartRes)
                setUserData(viewRes)
                //console.log("orgRes: ", orgRes)
                setOrgData(orgRes)
                setTimeout(() => window.print(), 800)
            } catch (err) {
                console.error('Failed to load estimate data:', err)
                setError('Failed to load estimate. Please try again.')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    if (loading) return <div className='p-4 text-center'>Loading estimate...</div>
    if (error) return <div className='p-4 text-center text-danger'>{error}</div>

    return (
        <Fragment>
            <div className='invoice-print p-3' style={{ background: 'white' }}>
                <CompanyHeader orderNo={userData?.orderNo} createdOn={userData?.bill?.createdOn} orgData={orgData} />

                <hr className='my-2' />

                <CustomerInfo user={userData?.user} />

                <Table className='mt-2 mb-0' responsive>
                    <thead>
                        <tr>
                            {['S.No.', 'Particular', 'Quantity', 'Rate', 'Tax', 'Amount', ''].map((h, i) => (
                                <th key={i} className='py-1'>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {itemData.length > 0 ? itemData.map((detail, index) => <ItemRow key={detail.productDetailsId ?? index} detail={detail} index={index} />) : <tr><td colSpan={7}><h2 className='text-center py-3'>No Data Found</h2></td></tr>
                        }
                    </tbody>
                </Table>

                <TotalsPanel totalTax={totalTax} bill={userData?.bill} />

                <hr className='my-2' />

                <Row>
                    <Col sm='12'>
                        <span className='fw-bold'>Remarks: </span>
                        <span>{userData?.bill?.overAllRemarks || 'No remarks'}</span>
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
}

export default EstimatePrint