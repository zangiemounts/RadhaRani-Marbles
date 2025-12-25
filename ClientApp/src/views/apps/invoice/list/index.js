// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Avatar from '@components/avatar'
import avtimg from '../../../../assets/images/avatars/avatar-blank.png'
// ** Table Columns
/*import { columns } from './columns'*/
import {
    Eye,
    Send,
    Edit,
    ChevronDown
} from 'react-feather'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import axios from 'axios'
// ** Reactstrap Imports
import {
    Card,
    Button,
    Label,
    Modal,
    ModalBody,
    ModalHeader,
    Input,
    Row,
    Col,
    Badge,
    UncontrolledTooltip
} from 'reactstrap'
// ** Store & Actions
import { getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import { selectThemeColors } from '@utils'
// ** Styles
import '@styles/react/apps/app-invoice.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'

const CustomHeader = ({ onFilterChange, value, handleStatusValue, statusValue, handlePerPage, rowsPerPage }) => {
    const [show, setShow] = useState(false)
    const [options, setOptions] = useState([
        {
            value: 'add-new',
            label: 'Add New Customer',
            type: 'button',
            color: 'flat-success'
        }
    ])
    const [valuee, setValue] = useState({})
    const [selected, setSelected] = useState(null)
    const [dropdata, setDropdata] = useState([
        {
            value: 'add-new',
            label: 'Add New Customer',
            type: 'button',
            color: 'flat-success'
        }
    ])
    const [clients, setClients] = useState(null)
    useEffect(() => {
        // ** Get Clients
        axios.get('/api/invoice/clients').then(response => {
            const arr = options
            response.data.map(item => arr.push({ valuee: item.name, label: item.name }))
            setOptions([...arr])
        })
    }, [])

    const handleInvoiceToChange = data => {
        setValue(data)
        setSelected((clients.filter(i => i.value === data.label)[0]))
    }
    const getData2 = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            RoleCatId: 16
        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Payment/GetDetailsValueM`, {
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
                const arr = dropdata
                response.map(item => arr.push({ value: item.label, label: item.label }))
                setDropdata([...arr])
                setClients(response)
            })

    }


    const onDiscard = () => {
        setShow(false)
    }
    useEffect(() => {
        getData2()
    }, [])
    return (
        <div className='invoice-list-table-header w-100 py-2'>
            <Row>
                <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                    <div className='d-flex align-items-center me-2'>
                        <label htmlFor='rows-per-page'>Show</label>
                        <Input
                            type='select'
                            id='rows-per-page'
                            value={rowsPerPage}
                            onChange={handlePerPage}
                            className='form-control ms-50 pe-3'
                        >
                            <option value='10'>10</option>
                            <option value='25'>25</option>
                            <option value='50'>50</option>
                        </Input>
                    </div>
                    <Button tag={Link} to='/apps/user/list' color='primary'>
                        Add Record
                    </Button>
                </Col>
                <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                    <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                    <ModalBody className='px-sm-5 mx-50 pb-4'>
                        <h1 className='text-center mb-1'></h1>
                        <p className='text-center'></p>
                        <Label for='addMemberSelect' className='form-label fw-bolder font-size font-small-4 mb-50'>
                            Add Members
                        </Label>
                        <Select
                            className='react-select'
                            classNamePrefix='select'
                            id='label'
                            value={valuee}
                            options={dropdata}
                            theme={selectThemeColors}

                            onChange={handleInvoiceToChange}
                        />
                        {selected !== null ? (
                            <div className='customer-details mt-1'>
                                <p className='mb-25'>{selected.id}</p>
                                <p className='mb-25'>{selected.label}</p>
                                <p className='mb-25'>{selected.value}</p>
                                <p className='mb-25'>{selected.color}</p>
                            </div>
                        ) : null}
                        <Col className='text-center' xs={12}>
                            <Button className='me-1 mt-2' color='primary' tag={Link} to='/apps/invoice/add'>
                                Submit
                            </Button>
                            <Button type='reset' className='mt-2' color='secondary' outline onClick={onDiscard}>
                                Discard
                            </Button>
                        </Col>
                    </ModalBody>
                </Modal>
                <Col
                    lg='6'
                    className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
                >
                    <div className='d-flex align-items-center'>
                        <label htmlFor='search-invoice'>Search</label>
                        <Input
                            id='search-invoice'
                            className='ms-50 me-2 w-100'
                            type='text'
                            value={value}
                            onChange={(e) => onFilterChange(e)}
                            placeholder='Search Invoice'
                        />
                    </div>
                    <Input className='w-auto ' type='select' value={statusValue} onChange={handleStatusValue}>
                        <option value=''>Select Status</option>
                        <option value='downloaded'>Downloaded</option>
                        <option value='draft'>Draft</option>
                        <option value='paid'>Paid</option>
                        <option value='partial payment'>Partial Payment</option>
                        <option value='past due'>Past Due</option>
                        <option value='sent'>Sent</option>
                    </Input>
                </Col>
            </Row>
        </div>
    )
}


const InvoiceList = () => {
    // ** Store vars
    const date = new Date()
    const year = date.getFullYear()
    const dispatch = useDispatch()
    const store = useSelector(state => state.invoice)
    const [user, setuser] = useState([])
    // ** States
    const [value, setValue] = useState('')
    const [sort, setSort] = useState('desc')
    const [sortColumn, setSortColumn] = useState('id')
    const [currentPage, setCurrentPage] = useState(1)
    const [statusValue, setStatusValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(10)

    useEffect(() => {
        dispatch(
            getData({
                sort,
                q: value,
                sortColumn,
                page: currentPage,
                perPage: rowsPerPage,
                status: statusValue
            })
        )
    }, [dispatch, store.data.length])
    const onFilterChange = (e) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if (value !== "" || value !== null) {
            const filteredObject = user.filter((item) => {

                return item.userData.mainDesc.toLowerCase().includes(value.toLowerCase())
            })
            setuser([...filteredObject])
        } else {
            setuser([...user])
        }

    }, [value])
    const handlePerPage = e => {
        console.log(parseInt(e.target.value))
        setRowsPerPage(parseInt(e.target.value))
    }

    const handleStatusValue = e => {
        setStatusValue(e.target.value)
        dispatch(
            getData({
                sort,
                q: value,
                sortColumn,
                page: currentPage,
                perPage: rowsPerPage,
                status: e.target.value
            })
        )
    }

    const handlePagination = page => {
        dispatch(
            getData({
                sort,
                q: value,
                sortColumn,
                status: statusValue,
                perPage: rowsPerPage,
                page: page.selected + 1
            })
        )
        setCurrentPage(page.selected + 1)
    }

    const CustomPagination = () => {
        const count = Number((user.length / rowsPerPage).toFixed(0))

        return (
            <ReactPaginate
                nextLabel=''
                breakLabel='...'
                previousLabel=''
                pageCount={count || 1}
                activeClassName='active'
                breakClassName='page-item'
                pageClassName={'page-item'}
                breakLinkClassName='page-link'
                nextLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousLinkClassName={'page-link'}
                previousClassName={'page-item prev'}
                onPageChange={page => handlePagination(page)}
                forcePage={currentPage !== 0 ? currentPage - 1 : 0}
                containerClassName={'pagination react-paginate justify-content-end p-1'}
            />
        )
    }

    const handleSort = (column, sortDirection) => {
        setSort(sortDirection)
        setSortColumn(column.sortField)
        dispatch(
            getData({
                q: value,
                page: currentPage,
                sort: sortDirection,
                status: statusValue,
                perPage: rowsPerPage,
                sortColumn: column.sortField
            })
        )
    }
    const renderClient = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        if (!row.oremarks.length) {
            return <Avatar className='me-50' img={avtimg} width='32' height='32' />
        } else {
            return <Avatar color={color} className='me-50' content={row.userData.mainDesc ? `${row.userData.mainDesc} ${row.userData.columRemarks}` : 'Mounts'} initials />
        }
    }
    const getBill = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId'))
        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/GetBilldata`, {
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
                setuser(response)
            })

    }

    const data = [
        {
            name: 'Bill No',
            sortable: true,
            sortField: 'id',
            minWidth: '120px',
            /*cell: row => <Link to={`/apps/invoice/ViewBill/${row.apikey2}`}>{`#${year}${row.billData.billId}`}</Link>*/
            cell: row => <Link to={`/apps/invoice/ViewBill/${row.apikey2}`}>{`#${row.userbill !== null ? (row.userbill.urlimage4 !== null ? row.userbill.urlimage4 : 0) : 0}`}</Link>
        },
        {
            name: 'Client',
            sortable: true,
            minWidth: '350px',
            sortField: 'client.name',
            cell: row => {
                const name = `${row.userData.mainDesc} ${row.userData.columRemarks}`,
                    email = row.userData.urlimage1
                return (
                    <div className='d-flex justify-content-left align-items-center'>
                        {renderClient(row)}
                        <div className='d-flex flex-column'>
                            <h6 className='user-name text-truncate mb-0'>{name}</h6>
                            <small className='text-truncate text-muted mb-0'>{email}</small>
                        </div>
                    </div>
                )
            }
        },
        {
            name: 'Total',
            sortable: true,
            minWidth: '150px',
            sortField: 'total',
            cell: row => <span>₹{(row.billData.payableAmount).toFixed(2) || 0}</span>
        },
        {
            sortable: true,
            minWidth: '200px',
            name: 'Issued Date',
            sortField: 'dueDate',
            cell: row => row.dateofcreation
        },
        {
            name: 'Action',
            minWidth: '110px',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Send className='cursor-pointer' size={17} id={`send-tooltip-${row.billData.billId}`} />
                    <UncontrolledTooltip placement='top' target={`send-tooltip-${row.billData.billId}`}>
                        Send Mail
                    </UncontrolledTooltip>

                    <Link to={`/apps/invoice/ViewBill/${row.apikey2}`} id={`pw-tooltip-${row.billData.billId}`}>
                        <Eye size={17} className='mx-1' />
                    </Link>
                    <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.billData.billId}`}>
                        Preview Invoice
                    </UncontrolledTooltip>

                    {row.activeStatus === "S" ? <Edit size={14} className='me-50' />   : <Link to={`/apps/invoice/edit/${row.apikey2}`} id={`pw-tooltip-${row.billData.billId}`}>
                        <Edit size={14} className='me-50' />
                    </Link>}
                    {row.activeStatus === "S" ? <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.billData.billId}`}>
                        Preview Invoice
                    </UncontrolledTooltip> : <UncontrolledTooltip placement='top' target={`pw-tooltip-${row.billData.billId}`}>
                        Edit Invoice
                    </UncontrolledTooltip>}
                </div>
            )
        },
         {
            sortable: true,
            minWidth: '200px',
            name: 'Status',
            sortField: 'dueDate',
             
             cell: row => {
                 return (
                     <div className='d-flex justify-content-left align-items-center'>
                     
                         <div className='d-flex flex-column'>
                             {row.activeStatus === "A" ? <h6 className='user-name text-truncate mb-0'><Badge color="secondary">Draft</Badge></h6> : <h6 className='user-name text-truncate mb-0'><Badge color="success">Submit</Badge></h6> } 
                           
                         </div>
                     </div>
                 )
             }
        }

    ]
    useEffect(() => {
        getBill()
    }, [])
    return (
        <div className='invoice-list-wrapper'>
            <Card>
                <div className='invoice-list-dataTable react-dataTable'>
                    <DataTable
                        noHeader
                        pagination
                        sortServer
                        paginationServer
                        subHeader={true}
                        columns={data}
                        responsive={true}
                        onSort={handleSort}
                        data={user}
                        sortIcon={<ChevronDown />}
                        className='react-dataTable'
                        defaultSortField='invoiceId'
                        paginationDefaultPage={currentPage}
                        paginationComponent={CustomPagination}
                        subHeaderComponent={
                            <CustomHeader
                                value={value}
                                statusValue={statusValue}
                                rowsPerPage={rowsPerPage}
                                onFilterChange={onFilterChange}
                                handlePerPage={handlePerPage}
                                handleStatusValue={handleStatusValue}
                            />
                        }
                    />
                </div>
            </Card>
        </div>
    )
}

export default InvoiceList
