// ** React Imports
import { Fragment, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
// ** Invoice List Sidebar
import Sidebar from './Sidebar'
import Avatar from '@components/avatar'
// ** Table Columns
/*import { columns } from './columns'*/
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
// ** Store & Actions
import { getAllData, getData } from '../store'
import { useDispatch, useSelector } from 'react-redux'
import Select from "./Select"
import axios from "axios"
// ** Utils
import { useDropzone } from 'react-dropzone'
// ** Third Party Components
import avtimg from '../../../../assets/images/avatars/avatar-blank.png'
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import { ChevronDown, FileText, X, DownloadCloud, Plus, Grid, Copy, MoreVertical, Archive, Trash2 } from 'react-feather'
import QRCode from 'react-qr-code'

import Swal from "sweetalert2"
// ** Utils
/*import { selectThemeColors } from '@utils'*/

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  FormFeedback,
  Card,
  Input,
  Label,
  Button,
    ListGroupItem,
    ListGroup,
  DropdownToggle,
  UncontrolledDropdown,
    Modal,
    ModalBody,
    ModalHeader,
    ModalFooter,
    Spinner
} from 'reactstrap'

// ** Styles
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/tables/react-dataTable-component.scss'
import { useForm } from 'react-hook-form'
import AddItem from './AddItem'
import DataShowCard from '../../DataCard/DataShowCard'
// ** Table Header
const CustomHeader = ({ onFilterChange, value, handlePerPage, rowsPerPage }) => {
    // ** Converts table to CSV
    const {
        handleSubmit,
        formState: { errors }
    } = useForm({})
    const [show, setShow] = useState(false)
    const [show1, setShow1] = useState(false)
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        country: '',
        zip: '',
        gst: '',
        orgState:'',
        org_individual: '',
        cpan:''
        
    })
    
    const [formDataa, setFormDataa] = useState({
        phoneno: ''
       
        
    })
    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
        console.log(formData)
    }
    const onInputChange2 = (e) => {
        setFormDataa({ ...formDataa, ["phoneno"]: e })
    }
    const onSubmitData = async () => {


        const sendData = {
            WebHeader: "Marbels",
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            MainDesc: formData.firstName,
            ColumRemarks: formData.lastName,
            URLImage1: formData.email,
            URLImage2: formData.firstName,
            URLImage3: formData.address,
            URLImage4: formData.country,
            URLImage5: formData.zip === undefined || formData.zip === null ? 0 : formData.zip,
            URLImage6: formData.gst,
            Remarks: show1 === true ? "Org" : "individual",
            OCRemarks: formData.orgState,
            LogoImage2: formData.cpan,
            Data: files[0]
        }
        console.log(sendData)
        await axios.post("https://mountsimageapi.azurewebsites.net/api/FileUpload/UploadMarbales", sendData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
           .then((response) => {
               console.log(response)
                /*if (response.statusText === "OK") {
                    window.location.reload()
                }
                else {
                    alert('Failed To Upload')
                }*/
            })
    
            
    }

    
    const styles = {
        width: "100%",

        fontSize: 18,
        height: "2em"
    }
    const onSubmit = data => {
        if (Object.values(data).every(field => field.length > 0)) {
            return null
        } else {
            for (const key in data) {
                if (data[key].length === 0) {
                    setError(key, {
                        type: 'manual'
                    })
                }
            }
        }
    }
    const onDiscard = () => {
        setShow(false)
    }
    const onDiscard1 = () => {
        setShow1(false)
    }

    const [files, setFiles] = useState([])

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        onDrop: acceptedFiles => {
            setFiles([...files, ...acceptedFiles.map(file => Object.assign(file))])
        }
    })
    console.log(files[0])

    const renderFilePreview = file => {
        if (file.type.startsWith('image')) {
            return <img className='rounded' alt={file.name} src={URL.createObjectURL(file)} height='28' width='28' />
        } else {
            return <FileText size='28' />
        }
    }

    const handleRemoveFile = file => {
        const uploadedFiles = files
        const filtered = uploadedFiles.filter(i => i.name !== file.name)
        setFiles([...filtered])
    }

    const renderFileSize = size => {
        if (Math.round(size / 100) / 10 > 1000) {
            return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`
        } else {
            return `${(Math.round(size / 100) / 10).toFixed(1)} kb`
        }
    }

    const fileList = files.map((file, index) => (
        <ListGroupItem key={`${file.name}-${index}`} className='d-flex align-items-center justify-content-between'>
            <div className='file-details d-flex align-items-center'>
                <div className='file-preview me-1'>{renderFilePreview(file)}</div>
                <div>
                    <p className='file-name mb-0'>{file.name}</p>
                    <p className='file-size mb-0'>{renderFileSize(file.size)}</p>
                </div>
            </div>
            <Button color='danger' outline size='sm' className='btn-icon' onClick={() => handleRemoveFile(file)}>
                <X size={14} />
            </Button>
        </ListGroupItem>
    ))

    const handleRemoveAllFiles = () => {
        setFiles([])
    }
    
  return (
    <div className='invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75'>
      <Row>
        <Col xl='6' className='d-flex align-items-center p-0'>
          <div className='d-flex align-items-center w-100'>
            <label htmlFor='rows-per-page'>Show</label>
            <Input
              className='mx-50'
              type='select'
              id='rows-per-page'
              value={rowsPerPage}
              onChange={handlePerPage}
              style={{ width: '5rem' }}
            >
              <option value='10'>10</option>
              <option value='25'>25</option>
              <option value='50'>50</option>
            </Input>
            <label htmlFor='rows-per-page'>Entries</label>
          </div>
        </Col>
        <Col
          xl='6'
          className='d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1'
        >
          <div className='d-flex align-items-center mb-sm-0 mb-1 me-1'>
            <label className='mb-0' htmlFor='search-invoice'>
              Search:
            </label>
            <Input
              id='search-invoice'
              placeholder='search-User'
              className='ms-50 w-100'
              type='text'
              value={value}
              onChange={e => onFilterChange(e)}
            />
          </div>

          <div className='d-flex align-items-center table-header-actions'>
           
                      <UncontrolledDropdown className='me-1'>
                          <DropdownToggle color='warning' caret outline onClick={() => setShow(true)}>
                              <Plus className='font-small-4 me-50' />
                              <span className='align-middle'>Add Data</span>
                          </DropdownToggle>
                      </UncontrolledDropdown>
          </div>
                  <Modal isOpen={show} toggle={() => setShow(!show)} className='modal-dialog-centered modal-lg'>
                      <ModalHeader className='bg-transparent' toggle={() => setShow(!show)}></ModalHeader>
                      <ModalBody className='px-sm-5 mx-50 pb-4'>
                          <h1 className='text-center mb-1'>Marbal Data</h1>
                          <p className='text-center'></p>
                          <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
                              <Row>
                                  <div {...getRootProps({ className: 'dropzone' })}>
                                      <input {...getInputProps()} />
                                      <div className='d-flex align-items-center justify-content-center flex-column'>
                                          <DownloadCloud size={64} />
                                          <h5>Drop Files here or click to upload</h5>
                                          <p className='text-secondary'>
                                              Drop files here or click{' '}
                                              <a href='/' onClick={e => e.preventDefault()}>
                                                  browse
                                              </a>{' '}
                                              thorough your machine
                                          </p>
                                      </div>
                                  </div>
                                  {files.length ? (
                                      <Fragment>
                                          <ListGroup className='my-2'>{fileList}</ListGroup>
                                          
                                      </Fragment>
                                  ) : null}
                                  <Col sm='12' className='mb-1'>
                                      <Label className='form-label' for='firstName'>
                                          Lot No.
                                      </Label>
                                      <Input id='firstName' name='firstName' onChange={(e) => onInputChange(e)} defaultValue={formData.firstName} placeholder='Lot No' />

                                      {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                                  </Col>
                                  <Col sm='12' className='mb-1'>
                                      <Label className='form-label' for='lastName'>
                                         Size
                                      </Label>

                                      <Input id='lastName' name="lastName" placeholder='Size' onChange={(e) => onInputChange(e)} defaultValue={formData.lastName} />

                                      {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                                  </Col>
                                  <Col sm='12' className='mb-1'>
                                      <Label className='form-label' for='emailInput'>
                                         Thikness
                                      </Label>
                                      <Input id='emailInput' type='text' name='email' onChange={(e) => onInputChange(e)} placeholder='Thikness' defaultValue={formData.email} />
                                  </Col>
                                
                                  <Col sm='12' className='mb-1'>
                                      <Label className='form-label' for='address'>
                                          Quantity
                                      </Label>
                                      <Input id='address' name='address' onChange={(e) => onInputChange(e)} defaultValue={formData.address} placeholder='Quantity' />
                                  </Col>
                                
                                  <Col className='mt-2' sm='12'>
                                      <Button type='submit' onClick={() => onSubmitData()} className='me-1' color='success'>
                                          Save changes
                                      </Button>
                                      <Button color='danger' onClick={() => onDiscard() }>
                                          Cancel
                                      </Button>
                                  </Col>
                              </Row>
                          </Form>
                         
                      </ModalBody>
                  </Modal>

                  <Modal isOpen={show1} toggle={() => setShow1(!show1)} className='modal-dialog-centered modal-lg'>
                      <ModalHeader className='bg-transparent' toggle={() => setShow1(!show1)}></ModalHeader>
                      <ModalBody className='px-sm-5 mx-50 pb-4'>
                          <h1 className='text-center mb-1'>Organization Detail</h1>
                          <p className='text-center'></p>
                          <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
                              <Row>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='firstName'>
                                          <b> Organization Name</b>
                                      </Label>
                                      <Input id='firstName' required name='firstName' onChange={(e) => onInputChange(e)} defaultValue={formData.firstName} placeholder='Organization Name' />

                                      {errors && errors.firstName && <FormFeedback>Please enter a valid First Name</FormFeedback>}
                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='lastName'>
                                          <b> Type of Organization</b>
                                      </Label>

                                      <Input id='lastName' name="lastName" placeholder='Type of Organization' onChange={(e) => onInputChange(e)} defaultValue={formData.lastName} />

                                      {errors.lastName && <FormFeedback>Please enter a valid Last Name</FormFeedback>}
                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='emailInput'>
                                          <b> Organization E-mail</b>
                                      </Label>
                                      <Input id='emailInput' type='email' name='email' onChange={(e) => onInputChange(e)} placeholder='Organization Email' defaultValue={formData.emailId} />
                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='emailInput'>
                                          <b> Organization Contact No</b>
                                      </Label>
                                      <PhoneInput
                                          country={'in'}
                                          placeholder="Enter your PhoneNumber"
                                          onChange={e => onInputChange2(e)}
                                          enableSearch="false"
                                          defaultValue={formData.phoneno}
                                          inputStyle={styles}
                                      />

                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='address' >
                                          <b> Organization Address</b>
                                      </Label>
                                      <Input id='address' name='address' onChange={(e) => onInputChange(e)} defaultValue={formData.address1} placeholder='12, Business Park' />
                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='accountState'>
                                          <b> Organization State</b>
                                      </Label>
                                      <Input id='accountState' name='orgState' placeholder="Organization State" onChange={(e) => onInputChange(e)} defaultValue={formData.state} />
                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='zipCode'>
                                          <b>  Organization Country</b>
                                      </Label>
                                      <Input id='country' name='country' placeholder="Organization Country" onChange={(e) => onInputChange(e)} defaultValue={formData.country} />
                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='zipCode'>
                                          <b> Organization Zip Code</b>
                                      </Label>
                                      <Input id='zip' name='zip' type="number" onChange={(e) => onInputChange(e)} defaultValue={formData.pincode} placeholder='Pin Code' maxLength='6' />

                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='zipCode'>
                                          <b> Organization GST Number</b>
                                      </Label>
                                      <Input id='gst' name='gst' onChange={(e) => onInputChange(e)} defaultValue={formData.gst} placeholder='GST No' maxLength='16' />

                                  </Col>
                                  <Col sm='6' className='mb-1'>
                                      <Label className='form-label' for='zipCode'>
                                          Organization PAN Number
                                      </Label>
                                      <Input id='pan' name='cpan' onChange={(e) => onInputChange(e)} defaultValue={formData.cpan} placeholder='PAN No' maxLength='16' />

                                  </Col>
                                  <Col className='mt-2' sm='12'>
                                      <Button type='submit' onClick={() => onSubmitData()} className='me-1' color='primary'>
                                          Save changes
                                      </Button>
                                      <Button color='danger' onClick={() => onDiscard1()} >
                                          Cancel
                                      </Button>
                                  </Col>
                              </Row>
                          </Form>

                      </ModalBody>
                  </Modal>

                
        </Col>
      </Row>
    </div>
  )
}

const UsersList = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.users)
    const [user, setuser] = useState([])
  // ** States
   const [value, setValue] = useState('')
  const [sort, setSort] = useState('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [sortColumn, setSortColumn] = useState('id')
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formModal, setFormModal] = useState(false)
  const [BarcodeData, setBarcodeData] = useState("Hello")
  const [UniqueId, setUniqueId] = useState(0)
  const [gloading, setgloading] = useState(false)
  const [invoice, setinvoice] = useState("")
  // ** Function to toggle sidebar
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  // ** Get data on mount
  useEffect(() => {
    dispatch(getAllData())
    dispatch(
      getData({
        sort,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage/*,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value*/
      })
    )
  }, [dispatch, store.data.length, sort, sortColumn, currentPage])

    const getSubmitData = async () => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            webHeader: "Marbels"
        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getmultipledata`, {
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
                    console.log(data)
                    setuser(data)
                })
    }


  // ** Function in get data on page change
  const handlePagination = page => {
    dispatch(
      getData({
        sort,
        sortColumn,
        perPage: rowsPerPage,
        page: page.selected + 1/*,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value*/
      })
    )
    setCurrentPage(page.selected + 1)
  }

  // ** Function in get data on rows per page
  const handlePerPage = e => {
    const value = parseInt(e.currentTarget.value)
    dispatch(
      getData({
        sort,
        sortColumn,
        perPage: value,
        page: currentPage/*,
        role: currentRole.value,
        currentPlan: currentPlan.value,
        status: currentStatus.value*/
      })
    )
    setRowsPerPage(value)
  }

  // ** Function in get data on search query change
    const onFilterChange = (e) => {
        setValue(e.target.value)
    }
    useEffect(() => {
        if (value !== "" || value !== null) {
            const filteredObject = user.filter((item) => {
                if (item.mainDesc !== null) {
                    return item.mainDesc.toLowerCase().includes(value.toLowerCase())
                }
            })
            setuser([...filteredObject])
        } else {
            setuser([...user])
        }

    }, [value])

    useEffect(() => {
        getSubmitData()
    }, [])

  // ** Custom Pagination
    const CustomPagination = () => {
        const count = Number(Math.ceil(user.total / rowsPerPage))

    return (
      <ReactPaginate
        previousLabel={''}
        nextLabel={''}
        pageCount={count || 1}
        activeClassName='active'
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        onPageChange={page => handlePagination(page)}
        pageClassName={'page-item'}
        nextLinkClassName={'page-link'}
        nextClassName={'page-item next'}
        previousClassName={'page-item prev'}
        previousLinkClassName={'page-link'}
        pageLinkClassName={'page-link'}
        containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
      />
    )
  }
    const renderClient = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        if (!row.mainDesc.length) {
            return <Avatar className='me-50' img={avtimg} width='32' height='32' />
        } else {
            return <Avatar color={color} className='me-50' content={row.mainDesc ? `${row.mainDesc} ${row.columRemarks}` : 'John Doe'} initials />
        }
    }

    const tigger = (id) => {
        setFormModal(!formModal)
        setUniqueId(id)
    }
    const data = [
        {
            name: 'Lot No.',
            sortable: true,
            minWidth: '300px',
            sortField: 'fullName',
            selector: row => row.mainDesc + row.columRemarks,
            cell: row => (
                <div className='d-flex justify-content-left align-items-center'>
                    {/*{renderClient(row)}*/}
                    <div className='d-flex flex-column'>
                        
                          <span className='fw-bolder'>{`${row.mainDesc}`}</span>
                    </div>
                </div>
            )
        },
{
    name: 'Size',
    sortable: true,
    minWidth: '172px',
    sortField: 'role',
    selector: row => row.columRemarks,
    cell: row => <span className='text-capitalize'>{row.columRemarks}</span>
},
{
    name: 'Thikness',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.urlimage2,
    cell: row => <span className='text-capitalize'>{row.urlimage1}</span>
 },
 {
    name: 'Quantity',
    minWidth: '138px',
    sortable: true,
    sortField: 'currentPlan',
    selector: row => row.logoImage2,
     cell: row => <span className='text-capitalize'>{row.urlimage3}</span>
 },
    
{
    name: 'Actions',
    minWidth: '200px',
    cell: row => (
        <div className='column-action'>
            {/*<Button color="success" onClick={() => getData3(row.cloudInterfactDisplaySectionId)}>Generate Bill</Button>*/}
           <Button color="success" onClick={() => tigger(row.cloudInterfactDisplaySectionId)}>Generate QR</Button>
      </div>
    )
  }
    ]

  const handleSort = (column, sortDirection) => {
    setSort(sortDirection)
    setSortColumn(column.sortField)
    dispatch(
      getData({
        sort,
        sortColumn,
        page: currentPage,
        perPage: rowsPerPage,
        role: currentRole.value,
        status: currentStatus.value,
        currentPlan: currentPlan.value
      })
    )
    }

    const [form, setForm] = useState({
        header1: null,
        header2: null,
        header3: null,
        header4: null,
        billtype: null
    })

    const onValidate = (value, name) => {
        setError((prev) => ({
            ...prev,
            [name]: { ...prev[name], errorMsg: value }
        }))
    }

    const [error, setError] = useState({
        header1: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onValidate
        },
        header2: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onValidate
        },
        header3: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onValidate
        },
        header4: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onValidate
        },
        billtype: {
            isReq: true,
            errorMsg: '',
            onValidateFunc: onValidate
        }
    })
    

    const validateForm = () => {
        let isInvalid = false
        Object.keys(error).forEach((x) => {
            const errObj = error[x]
            if (errObj.errorMsg) {
                isInvalid = true
            } else if (errObj.isReq && !form[x]) {
                isInvalid = true
                onValidate(true, x)
            }
        })
        return !isInvalid
    }

    const handleSubmit = async () => {
        const isValid = validateForm()
        if (!isValid) {
            console.error('Invalid Form!')
            return false
        } else {
            setgloading(true)

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId")),
                UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
                ProductDetId: UniqueId,
                DomainDesc: window.location.origin,
                PageName: "/apps/invoice/add",
                WebHeader: "BillHeader",
                MainDesc: form.billtype,
                ColumRemarks: form.header1,
                URLImage1: form.header2,
                URLImage2: form.header3,
                URLImage3: form.header4,
                Value: UniqueId,
                URLImage4: invoice

            }
            console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Createbill`, {
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
                    setgloading(false)
                    if (response === "Not enough Points") {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Your Points is less. Please Upgrade Your Plan'
                        }).then(() => {
                            window.location.pathname = "/price"
                        })
                    } else {
                        window.location.href = response

                    }
                   
                })

             
        }
    }
   // console.log(`${window.location.origin}/GetOneData?${UniqueId}`)
  return (
      <Fragment>
          <AddItem/>
      <Card className='overflow-hidden'>
        <div className='react-dataTable'>
          <DataTable
            noHeader
            subHeader
            sortServer
            pagination
            responsive
            paginationServer
            columns={data}
            onSort={handleSort}
            sortIcon={<ChevronDown />}
            className='react-dataTable'
            paginationComponent={CustomPagination}
            data={user}
          />
              </div>

      </Card>

          <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
              <ModalHeader toggle={() => setFormModal(!formModal)}>{ ""}</ModalHeader>
              <ModalBody>

                  {BarcodeData && (
                      <QRCode
                          size={256}
                          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                          value={`${window.location.origin}/GetOneData?${UniqueId}`}
                          viewBox={`0 0 256 256`}
                      />
                  )}
                {/*  <p>{BarcodeData}</p>*/}
              </ModalBody>
              <ModalFooter>
             {/* <Button target = "_blank" onClick={() => window.open(`${window.location.origin}/GetOneData?${UniqueId}`)}>Clirck</Button>*/}
                  {"" }
              </ModalFooter>
          </Modal>

          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
          {/*
            subHeaderComponent={
              <CustomHeader
                store={store}
                rowsPerPage={rowsPerPage}
                onFilterChange={onFilterChange}
                handlePerPage={handlePerPage}
                toggleSidebar={toggleSidebar}
              />
            }*/}

          <DataShowCard/>
    </Fragment>
  )
}

export default UsersList
