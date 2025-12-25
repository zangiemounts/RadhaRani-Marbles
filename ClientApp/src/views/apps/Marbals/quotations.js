// ** React Imports
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Avatar from '@components/avatar'
import avtimg from '../../../assets/images/avatars/avatar-blank.png'
// ** Table Columns
/*import { columns } from './columns'*/
import {
    Eye,
    Trash2,
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
    Spinner
} from 'reactstrap'
// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import Select from 'react-select'
import Swal from "sweetalert2"
import withReactContent from 'sweetalert2-react-content'
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
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetDetailsValueM`, {
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
                            <option value='20'>20</option>
                            <option value='30'>30</option>
                            <option value='50'>50</option>
                        </Input>
                    </div>
                 
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
                            placeholder='Search Estimate'
                        />
                    </div>
                </Col>
            </Row>
        </div>
    )
}


const Quotations = () => {
    const MySwal = withReactContent(Swal)
    // ** Store vars
    const [Isloading, setIsloading] = useState(false)
    const [IsDataloading, setIsDataloading] = useState(true)
    const dispatch = useDispatch()
    const store = useSelector(state => state.invoice)
    const [user, setuser] = useState([])
    //console.log(user)
    // ** States
    const [value, setValue] = useState('')
    const [sort, setSort] = useState('desc')
    const [sortColumn, setSortColumn] = useState('id')
    const [currentPage, setCurrentPage] = useState(1)
    const [statusValue, setStatusValue] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(20)

    useEffect(() => {
       
    }, [dispatch, store.data.length])
    const onFilterChange = (e) => { 
        setValue(e.target.value)
    }
    const filteredData = user.filter(
        (item) => item.userData.firstName.toLowerCase().includes(value.toLowerCase()) || item.userData.lastName.toLowerCase().includes(value.toLowerCase()) || String(item.orderNo).toLowerCase().includes(value.toLowerCase()) 
    )


    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

    const handlePerPage = e => {
        //console.log(parseInt(e.target.value))
        setRowsPerPage(parseInt(e.target.value))
    }

    const handleStatusValue = e => {
        setStatusValue(e.target.value)
        
    }

    const CustomPagination = () => {
        const count = Math.ceil(filteredData.length / rowsPerPage)
        const pageButtons = []

        for (let i = 1; i <= count; i++) {
            pageButtons.push(
                <button
                    key={i}
                    className={`btn-pagination ${currentPage === i ? "active" : ""}`}
                    onClick={() => setcurrentitem(i)}
                >
                    {i}
                </button>
            )
        }

        const handlePagination = page => {
            setCurrentPage(page.selected + 1)
        }
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
    const DelEstimation = (id) => {
        MySwal.fire({
            title: 'Do You Want to Delete the estimation ?',
            text: "",
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-outline-danger ms-1'
            },
            buttonsStyling: false,
            showClass: {
                popup: 'animate__animated animate__flipInX'
            }
        }).then(async (result) => {


            if (result.isConfirmed) {
                
                const sendData = {
                    CloudInterfactDisplaySectionId: Number(id)
                }
               // console.log("Delete_SendData", sendData)
                await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/DeleteEstimate`, {
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

                            //console.log("Delete_Estimation", data)
                            if (data === "Done") {
                                MySwal.fire({
                                    icon: "success",
                                    title: "Done",
                                    text: "Delete Successfully",
                                    focusConfirm: false
                                }).then(() => {
                                    getBill()
                                })


                            } else {
                                MySwal.fire({
                                    icon: "error",
                                    title: "Error",
                                    text: "Not Delete",
                                    focusConfirm: false
                                })

                            }
                        })
            } else if (result.isDenied) {

            }
        })
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

    const renderClient1 = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        if (!row.cloudInterfactDisplaySectionId.length) {
            /*return <Avatar className='me-50' img={avtimg} width='32' height='32' />*/
            return <Avatar color={color} className='me-50' content={row.userData.firstName ? `${row.userData.firstName} ${row.userData.lastName}` : 'Mounts'} initials />
        } else {
            return <Avatar color={color} className='me-50' content={row.userData.firstName ? `${row.userData.firstName} ${row.userData.lastName}` : 'Mounts'} initials />
        }
    }

    const renderClient = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        if (!row.cloudInterfactDisplaySectionId.length) {
            /*return <Avatar className='me-50' img={avtimg} width='32' height='32' />*/
            return <Avatar color={color} className='me-50' content={row.user.firstName ? `${row.user.firstName} ${row.user.lastName}` : 'Mounts'} initials />
        } else {
            return <Avatar color={color} className='me-50' content={row.user.firstName ? `${row.user.firstName} ${row.user.lastName}` : 'Mounts'} initials />
        }
    }

    const apidata = localStorage.getItem('userIdA') ? "ViewEstimateNew" : "ViewEstimateEmployeeNew"

    const getBill = async () => {
        setIsDataloading(true)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: 'C',
            WebHeader: "Newcart",
            Apikey2:"testdata"
        }
        //console.log("Quotaion_Estimation_Get_SendData", sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/${apidata}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
               //console.log("Quotation_Data", response)
                setIsDataloading(false)
                setuser(response)
            })

    }

    const rediresct2 = (data) => {
        localStorage.setItem("createcart", data)
        window.location.pathname = "/estimateView"

    }

    const redirect = async (id, id2, id3) => {
        setIsloading(true)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            InsuranceId: Number(id),
            WebHeader:"Mesurement",
            ActiveStatus: 'A',
            Value: Number(id2),
            WorkFlowId: Number(id3)
        }
      //  console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Measurment`, {
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
                sessionStorage.setItem("Mesurement", response)
                window.location.pathname = "/mesurement"
                setIsloading(false)
            })
        
        }

    const data = [
        {
            name: 'Estimation No',
            sortable: false,
            sortField: 'id',
            minWidth: '120px',
            /*cell: row => <Link to={`/apps/invoice/ViewBill/${row.apikey2}`}>{`#${year}${row.billData.billId}`}</Link>*/
            cell: row => <Link to="#" onClick={() => rediresct2(row.apikey2)}>{`#E${row.orderNo !== null ? row.orderNo : 0}`}</Link>
        },
        {
            name: 'Date',
            sortable: false,
            sortField: 'id',
            minWidth: '120px',
            cell: row => <span> {(row.bill.createdOn !== null ? row.bill.createdOn.slice(0, 10) : 0)}</span>
        },
        {
            name: 'Client',
            sortable: false,
            minWidth: '350px',
            sortField: 'client.name',
            cell: row => {
                const name = `${row.userData.firstName} ${row.userData.lastName}`,
                    email = row.userData.phoneNo
                return (
                    <div className='d-flex justify-content-left align-items-center'>
                        {renderClient1(row)}
                        <div className='d-flex flex-column'>
                            <h6 className='user-name text-truncate mb-0'>{name}</h6>
                            {localStorage.getItem("urole") === String(7) && (<small className='text-truncate text-muted mb-0'>{email}</small>)}
                        </div>
                    </div>
                )
            }
        },
        {
            name: 'Staff',
            sortable: false,
            minWidth: '350px',
            sortField: 'client.name',
            cell: row => {
                const name = `${row.user.firstName} ${row.user.lastName}`,
                    email = row.user.emailId
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
            name: 'Estimation Amount',
            sortable: false,
            minWidth: '150px',
            sortField: 'total',
            cell: row => <span>₹ {(row.bill.payableAmount !== null ? Math.round(row.bill.payableAmount) : 0)}</span>
        },
        {
            name: 'Action',
            minWidth: '210px',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    {!Isloading ? < Button onClick={() => redirect(row.cloudInterfactDisplaySectionId, row.bill.userId, row.bill.billId)} color="warning" size="sm">Generate Mesurement</Button> : <Button color='success' disabled>
                        <Spinner size='sm' type='grow' />
                        <span className='ms-50'>Please wait...</span>
                    </Button>}
                 
                </div>
            )

                /* OLD Code < Button onClick={() => redirect(row.cloudInterfactDisplaySectionId, row.user.userId, row.bill.billId)} color = "warning" size = "sm" > Generate Mesurement</Button >*/
        },
        {
            name: 'View Estimate',
            minWidth: '210px',
            cell: row => (
                <div className='column-action d-flex align-items-center'>
                    <Button onClick={() => rediresct2(row.apikey2)} color="success"><Eye size={15}  /> View</Button>
                 
                </div>
            )
        },
        {
            sortable: false,
            minWidth: '200px',
            name: 'Status',
            sortField: 'dueDate',

            cell: row => {
                return (
                    <div className='d-flex justify-content-left align-items-center'>

                        <div className='d-flex flex-column'>
                            {row.activeStatus === "A" ? <h6 className='user-name text-truncate mb-0'><Badge color="secondary" className='badge-glow'>Draft</Badge></h6> : <h6 className='user-name text-truncate mb-0'><Badge color="success" className='badge-glow '>Submit</Badge></h6>}

                        </div>
                    </div>
                )
            }
        },
        {
            sortable: false,
            minWidth: '200px',
            name: 'Trip',
            sortField: 'dueDate',

            cell: row => {
                return (
                    <div className='d-flex justify-content-left align-items-center'>
                        <div className='d-flex flex-column'>
                            {row?.oremarks === "Trip" ? (<h6 className='user-name text-truncate mb-0'><Badge color="info">Trip Assigned</Badge></h6>) : (
                                <h6 className='user-name text-truncate mb-0'><Badge color="warning">No Trip</Badge></h6>)}

                        </div>
                    </div>
                )
            }
        },
        {
            sortable: false,
            minWidth: '200px',
            name: 'Delete',
            sortField: 'dueDate',

            cell: row => {
                return (
                    <div className='d-flex justify-content-left align-items-center'>
                        <Button onClick={() => DelEstimation(row.cloudInterfactDisplaySectionId)} color="danger"><Trash2 size={15} /> Delete</Button>
                    </div>
                )
            }
        }

    ]

    useEffect(() => {
        getBill()
    }, [])

    if (IsDataloading) {
        return (
            <div className='d-flex align-items-center justify-content-center p-5'>
                <Spinner  type="grow" color='success' />
                <h2 className='ms-1'>Please wait while data is loading...</h2>
            </div>
        )
    }

    return (
        <div className='invoice-list-wrapper'>
            <Card>
                <div className='invoice-list-dataTable react-dataTable'>
                    {paginatedData.length < 0 ? (
                        <div className="d-flex item-center p-5">
                            <Spinner color="success" />
                            <p className="m-1">Please wait while data loading</p> </div>
                    ) : (
                        <DataTable
                            noHeader
                            pagination
                            sortServer
                            paginationServer
                            subHeader={true}
                            columns={data}
                            responsive={true}
                            onSort={handleSort}
                            data={paginatedData}
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
                        />)}
                </div>
            </Card>
        </div>
    )
}

export default Quotations
