/* eslint-disable no-confusing-arrow */
/* eslint-disable object-property-newline */
/* eslint-disable multiline-ternary */
import { Fragment, useState, useEffect, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Row, Col, Button, Table, Input, Card, Spinner,
    Modal, CardBody, Form, Label, FormFeedback
} from 'reactstrap'
import Avatar from '@components/avatar'
import { Plus, ShoppingCart, Edit3, Trash2, PlusCircle } from 'react-feather'
import DynamicPagination from '../DataCard/DynamicPagination'
import AddUserSidebar from './addUserSidebar'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

const AVATAR_STATES = [
    'light-success', 'light-danger', 'light-warning',
    'light-info', 'light-primary', 'light-secondary'
]

// Stable color from userId — no flicker on re-render
const getAvatarColor = (userId) => AVATAR_STATES[userId % AVATAR_STATES.length]

const EMPTY_FORM = {
    OrgName: '', lastName: '', OrgemailId: '', OrgPhoneno: '',
    orgAddress: '', orgAddress2: '', OrgPin: '', instructions: '', firmName: ''
}

const isRole7 = () => localStorage.getItem('urole') === '7'

const Architect = () => {
    const navigate = useNavigate()

    const [onSearchText, setSearchText] = useState('')
    const [architects, setArchitects] = useState([])
    const [perPage, setPerPage] = useState(20)
    const [isLoading, setIsLoading] = useState(false)
    const [isDataLoading, setIsDataLoading] = useState(true)
    const [dataRefresh, setDataRefresh] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [addSidebarOpen, setAddSidebarOpen] = useState(false)
    const [editModalOpen, setEditModalOpen] = useState(false)
    const [selectedUserId, setSelectedUserId] = useState(null)
    const [formData, setFormData] = useState(EMPTY_FORM)
    const [formErrors, setFormErrors] = useState({})

    // ── Data fetching ──────────────────────────────────────────────────────────

    const getData = useCallback(async () => {
        setIsDataLoading(true)
        try {
            const res = await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Getusers`, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({ OrgId: Number(localStorage.getItem('orgId')), RoleCatId: 17 })
            })
            const data = await res.json()
            setArchitects(Array.isArray(data) ? data : [])
        } catch {
            toast.error('Failed to load architects', { position: 'top-center' })
        } finally {
            setIsDataLoading(false)
        }
    }, [])

    useEffect(() => {
        getData()
    }, [dataRefresh, getData])

    // ── Filtering & pagination (memoised) ──────────────────────────────────────

    const filteredData = useMemo(() => {
        const q = onSearchText.toLowerCase().trim()
        if (!q) return architects.filter(item => item.userdata)
        return architects.filter(item => {
            if (!item.userdata) return false
            const fullName = `${item.userdata.firstName ?? ''} ${item.userdata.lastName ?? ''}`.toLowerCase()
            const phone = String(item.userdata.phoneNo ?? '').toLowerCase()
            const firm = String(item.deptOrgSpicificShortName ?? '').toLowerCase()
            return fullName.includes(q) || phone.includes(q) || firm.includes(q)
        })
    }, [architects, onSearchText])

    const paginatedData = useMemo(() => filteredData.slice((currentPage - 1) * perPage, currentPage * perPage),
        [filteredData, currentPage, perPage]
    )

    // Reset to page 1 when search or perPage changes
    useEffect(() => { setCurrentPage(1) }, [onSearchText, perPage])

    // ── Handlers ───────────────────────────────────────────────────────────────

    const createCart = async (userId) => {
        setIsLoading(true)
        try {
            const sendData = {
                OrgId: Number(localStorage.getItem('orgId')),
                UserId: Number(isRole7() ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
                Value: Number(userId),
                WebHeader: 'Newcart'
            }
            const res = await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/CreateCart`, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(sendData)
            })
            const data = await res.json()
            localStorage.setItem('createcart', data)
            localStorage.setItem('createcartuserid', userId)
            if (data?.length > 0) navigate('/createCart')
        } catch {
            toast.error('Failed to create cart', { position: 'top-center' })
        } finally {
            setIsLoading(false)
        }
    }

    const openEditModal = (userId) => {
        const match = architects.find(item => item.userId === userId)
        if (!match?.userdata) return
        const ud = match.userdata
        setSelectedUserId(userId)
        setFormData({
            OrgName: ud.firstName ?? '',
            lastName: ud.lastName ?? '',
            OrgemailId: ud.emailId ?? '',
            OrgPhoneno: ud.phoneNo ?? '',
            orgAddress: ud.address1 ?? '',
            orgAddress2: ud.address2 ?? '',
            OrgPin: ud.pincode ?? '',
            instructions: ud.answer2 ?? '',
            firmName: match.deptOrgSpicificShortName ?? ''
        })
        setFormErrors({})
        setEditModalOpen(true)
    }

    const onInputChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))

    const validateForm = () => {
        const errs = {}
        if (!formData.OrgName.trim()) errs.OrgName = 'First name is required'
        if (!formData.lastName.trim()) errs.lastName = 'Last name is required'
        setFormErrors(errs)
        return Object.keys(errs).length === 0
    }

    const editUser = async () => {
        if (!validateForm()) return
        setIsLoading(true)
        try {
            const sendData = {
                OrgId: Number(localStorage.getItem('orgId')),
                UserId: Number(selectedUserId),
                Apikey2: 'Success',
                FirstName: formData.OrgName,
                LastName: formData.lastName,
                UserRoleId: 17,
                EmailId: formData.OrgemailId,
                RefUserId: null,
                ActiveStatus: 'A',
                Address1: formData.orgAddress,
                Address2: formData.orgAddress2,
                Answer2: formData.instructions,
                Pincode: formData.OrgPin === '' ? 0 : Number(formData.OrgPin),
                Password: '123456',
                DeptOrgSpicificShortName: formData.firmName
            }
            const res = await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Editusers`, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(sendData)
            })
            const data = await res.json()
            if (data.apikey2 === 'Done') {
                toast.success('Architect updated successfully', { position: 'top-center' })
                setEditModalOpen(false)
                getData()
            } else {
                toast.error('Something went wrong', { position: 'top-center' })
            }
        } catch {
            toast.error('Something went wrong', { position: 'top-center' })
        } finally {
            setIsLoading(false)
        }
    }

    const onDelete = async (userId) => {
        const match = architects.find(item => item.userId === userId)
        if (!match?.userdata) return

        const result = await Swal.fire({
            title: 'Deactivate this architect?',
            text: 'This action will mark the user as inactive.',
            showCancelButton: true,
            confirmButtonText: 'Deactivate',
            confirmButtonColor: '#dc3545',
            customClass: {
                confirmButton: 'btn btn-danger m-2',
                cancelButton: 'btn btn-secondary'
            }
        })

        if (!result.isConfirmed) return

        setIsLoading(true)
        const ud = match.userdata
        try {
            const sendData = {
                OrgId: Number(localStorage.getItem('orgId')),
                UserId: Number(ud.userId),
                Apikey2: 'Success',
                FirstName: ud.firstName,
                LastName: ud.lastName,
                UserRoleId: 90,
                EmailId: ud.emailId,
                RefUserId: null,
                ActiveStatus: 'D',
                Address1: ud.address1,
                Address2: ud.address2,
                Answer2: ud.answer2,
                Pincode: ud.pincode === '' ? 0 : ud.pincode,
                Password: '123456'
            }
            const res = await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Editusers`, {
                method: 'POST',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify(sendData)
            })
            const data = await res.json()
            if (data.apikey2 === 'Done') {
                Swal.fire('Deactivated!', 'Architect has been deactivated.', 'success')
                getData()
            } else {
                Swal.fire('Error!', 'Something went wrong. Please try again.', 'error')
            }
        } catch {
            Swal.fire('Error!', 'Something went wrong. Please try again.', 'error')
        } finally {
            setIsLoading(false)
        }
    }

    // ── Render helpers ─────────────────────────────────────────────────────────

    const renderClient = (row) => (
        <Avatar
            color={getAvatarColor(row.userId)}
            className='me-50'
            content={`${row.userdata?.firstName ?? '?'} ${row.userdata?.lastName ?? ''}`}
            initials
        />
    )

    const displayVal = (val) => val === null || val === undefined || val === '' ? '—' : val

    // ── JSX ────────────────────────────────────────────────────────────────────

    return (
        <Fragment>
            <Card className='invoice-list-dataTable react-dataTable p-2'>

                {/* ── Header bar ── */}
                <div className='invoice-list-table-header w-100 py-2'>
                    <Row>
                        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                            <div className='d-flex align-items-center me-2'>
                                <label htmlFor='rows-per-page'>Show</label>
                                <Input
                                    type='select'
                                    id='rows-per-page'
                                    value={perPage}
                                    onChange={e => setPerPage(Number(e.target.value))}
                                    className='form-control ms-50 pe-3'
                                >
                                    <option value={20}>20</option>
                                    <option value={30}>30</option>
                                    <option value={50}>50</option>
                                </Input>
                            </div>
                            <Button color='success' onClick={() => setAddSidebarOpen(true)}>
                                <Plus size={20} /> Add Architect
                            </Button>
                        </Col>
                        <Col lg='6' className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'>
                            <div className='d-flex align-items-center'>
                                <label htmlFor='search-invoice'>Search</label>
                                <Input
                                    id='search-invoice'
                                    className='ms-50 me-2 w-100'
                                    type='text'
                                    value={onSearchText}
                                    onChange={e => setSearchText(e.target.value)}
                                    placeholder='Search by name, phone or firm…'
                                />
                            </div>
                        </Col>
                    </Row>
                </div>

                {/* ── Table ── */}
                <Table responsive>
                    <thead>
                        <tr>
                            <th style={{ minWidth: '250px' }}>NAME</th>
                            <th>CREATE CART</th>
                            <th>PHONE NO</th>
                            <th>USER TYPE</th>
                            <th>FIRM NAME</th>
                            <th>EMAIL</th>
                            <th>ADDRESS 1</th>
                            <th>ADDRESS 2</th>
                            <th>PINCODE</th>
                            <th>INSTRUCTIONS</th>
                            {isRole7() && <><th>EDIT</th><th>DEACTIVATE</th></>}
                        </tr>
                    </thead>
                    <tbody>
                        {isDataLoading ? (
                            <tr>
                                <td colSpan='12'>
                                    <div className='d-flex align-items-center justify-content-center p-5'>
                                        <Spinner type='grow' color='success' />
                                        <h2 className='ms-1'>Loading architects…</h2>
                                    </div>
                                </td>
                            </tr>
                        ) : paginatedData.length === 0 ? (
                            <tr>
                                <td colSpan='12'>
                                    <div className='d-flex justify-content-center p-5'>
                                        <h2>No architects found.</h2>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            paginatedData.map((details, index) => (
                                <tr key={details.userId ?? index}>
                                    <td style={{ display: 'flex', alignItems: 'center', minWidth: '250px' }}>
                                        {renderClient(details)}
                                        {details.userdata.firstName} {details.userdata.lastName}
                                    </td>
                                    <td style={{ minWidth: '200px' }}>
                                        <Button
                                            color='warning'
                                            disabled={isLoading}
                                            onClick={() => createCart(details.userId)}
                                        >
                                            {isLoading
                                                ? <><Spinner size='sm' type='grow' /><span className='ms-50'>Please wait…</span></>
                                                : <><ShoppingCart size={17} /> Create New Cart</>
                                            }
                                        </Button>
                                    </td>
                                    <td>{displayVal(details.userdata.phoneNo)}</td>
                                    <td>{details.userdata.userRoleId === 17 ? 'Architect' : 'Customer'}</td>
                                    <td>{displayVal(details.deptOrgSpicificShortName)}</td>
                                    <td>{displayVal(details.userdata.emailId)}</td>
                                    <td style={{ minWidth: '250px' }}>{displayVal(details.userdata.address1)}</td>
                                    <td style={{ minWidth: '250px' }}>{displayVal(details.userdata.address2)}</td>
                                    <td>{displayVal(details.userdata.pincode)}</td>
                                    <td style={{ minWidth: '300px' }}>{displayVal(details.userdata.answer2)}</td>
                                    {isRole7() && (
                                        <>
                                            <td>
                                                <Button color='success' className='d-flex' onClick={() => openEditModal(details.userId)}>
                                                    <Edit3 size={20} /> Edit
                                                </Button>
                                            </td>
                                            <td>
                                                <Button color='danger' className='d-flex' onClick={() => onDelete(details.userId)}>
                                                    <Trash2 size={20} />
                                                </Button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                {paginatedData.length > 0 && (
                    <DynamicPagination
                        items={filteredData}
                        itemsPerPage={perPage}
                        currentPage={currentPage}
                        setcurrentitem={setCurrentPage}
                    />
                )}
            </Card>

            {/* ── Add sidebar ── */}
            <AddUserSidebar
                open={addSidebarOpen}
                handleTaskSidebar={() => setAddSidebarOpen(o => !o)}
                usertypes='architect'
                setDataRefresh={setDataRefresh}
            />

            {/* ── Edit modal ── */}
            <Modal
                isOpen={editModalOpen}
                toggle={() => setEditModalOpen(o => !o)}
                className='sidebar-lg'
                contentClassName='p-0'
                modalClassName='modal-slide-in sidebar-todo-modal'
            >
                <Card>
                    <CardBody className='py-2 my-25'>
                        <Form className='mt-2 pt-50'>
                            <Row>
                                {/* First Name */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>First Name</b></Label>
                                    <Input
                                        name='OrgName'
                                        value={formData.OrgName}
                                        onChange={onInputChange}
                                        placeholder="e.g. Varun"
                                        invalid={!!formErrors.OrgName}
                                    />
                                    {formErrors.OrgName && <FormFeedback>{formErrors.OrgName}</FormFeedback>}
                                </Col>

                                {/* Last Name */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>Last Name</b></Label>
                                    <Input
                                        name='lastName'
                                        value={formData.lastName}
                                        onChange={onInputChange}
                                        placeholder="e.g. Singh"
                                        invalid={!!formErrors.lastName}
                                    />
                                    {formErrors.lastName && <FormFeedback>{formErrors.lastName}</FormFeedback>}
                                </Col>

                                {/* Email */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>Email</b></Label>
                                    <Input
                                        type='email'
                                        name='OrgemailId'
                                        value={formData.OrgemailId}
                                        onChange={onInputChange}
                                        placeholder="e.g. example@gmail.com"
                                    />
                                </Col>

                                {/* Firm Name */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>Firm Name</b></Label>
                                    <Input
                                        type='text'
                                        name='firmName'
                                        value={formData.firmName}
                                        onChange={onInputChange}
                                        placeholder="e.g. ABC Architects"
                                    />
                                </Col>

                                {/* Phone (read-only) */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>Phone Number</b></Label>
                                    <Input
                                        type='number'
                                        name='OrgPhoneno'
                                        value={formData.OrgPhoneno}
                                        disabled
                                    />
                                </Col>

                                {/* Address 1 */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>Address 1</b></Label>
                                    <Input
                                        name='orgAddress'
                                        value={formData.orgAddress}
                                        onChange={onInputChange}
                                        placeholder="e.g. B-16 Janakpuri, Delhi"
                                    />
                                </Col>

                                {/* Address 2 */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>Address 2</b></Label>
                                    <Input
                                        name='orgAddress2'
                                        value={formData.orgAddress2}
                                        onChange={onInputChange}
                                        placeholder="e.g. Near Metro Station"
                                    />
                                </Col>

                                {/* Pin Code */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>Pin Code</b></Label>
                                    <Input
                                        type='number'
                                        name='OrgPin'
                                        value={formData.OrgPin}
                                        onChange={onInputChange}
                                        placeholder="e.g. 110058"
                                    />
                                </Col>

                                {/* Instructions */}
                                <Col sm='12' className='mb-1'>
                                    <Label className='form-label'><b>Instructions</b></Label>
                                    <Input
                                        type='textarea'
                                        name='instructions'
                                        value={formData.instructions}
                                        onChange={onInputChange}
                                        placeholder="e.g. Handle with care"
                                        rows={3}
                                    />
                                </Col>

                                {/* Submit */}
                                <Col sm='12' className='mt-2'>
                                    <Button
                                        color='success'
                                        disabled={isLoading}
                                        onClick={editUser}
                                    >
                                        {isLoading
                                            ? <><Spinner size='sm' type='grow' /><span className='ms-50'>Please wait…</span></>
                                            : <><PlusCircle size={20} /> Update Architect</>
                                        }
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </CardBody>
                </Card>
            </Modal>
        </Fragment>
    )
}

export default Architect