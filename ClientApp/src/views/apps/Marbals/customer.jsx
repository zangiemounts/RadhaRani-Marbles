/* eslint-disable multiline-ternary */
// ** Custom Components
import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Row,
  Col,
  Button,
  Table,
  Input,
  Card,
  Spinner,
  Modal,
  CardBody,
  Form,
  Label
} from 'reactstrap'
import { useForm } from 'react-hook-form'
import Avatar from '@components/avatar'
import { Plus, ShoppingCart, Edit3, Trash2, PlusCircle } from 'react-feather'
import DynamicPagination from '../DataCard/DynamicPagination'
import AddUserSidebar from './addUserSidebar'
import { toast } from 'react-hot-toast'
import Swal from 'sweetalert2'

const Customer = () => {
  const navigate = useNavigate()
  const [onSearchText, setSearchText] = useState('')
  const [currentitem, setcurrentitem] = useState([])
  const [perpage, setperpage] = useState(20)
  const [DataRefresh, setDataRefresh] = useState(false)
  const [IsLoading, setIsLoading] = useState(false)
  const [IsDataLoading, setIsDataLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
  const [openTaskSidebar1, setOpenTaskSidebar1] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState(null)
  const [Architect, setArchitect] = useState(false)
  const [ArchitectName, setArchitectName] = useState(null)
  const [formData, setFormData] = useState({
    OrgName: '',
    lastName: '',
    Orgtype: '',
    OrgemailId: '',
    OrgPhoneno: '',
    orgAddress: '',
    orgAddress2: '',
    orgState: '',
    OrgPin: '0',
    orgCountry: '',
    orgAltNumber: '',
    instructions: '',
    gstno: '',
    archiuserId: 0
  })
  const {
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { title: '' }
  })

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

  const getData = async () => {
    setIsDataLoading(true)
    const sendData = {
      OrgId: Number(localStorage.getItem('orgId')),
      RoleCatId: Number(16)
    }
    // console.log(sendData)
    await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Getusers`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
      .then(response => response.json())
      .then(response => {
        //console.log(response)
        setIsDataLoading(false)
        setcurrentitem(response)
      })
  }

  const createCart = async data => {
    setIsLoading(true)
    const sendData = {
      OrgId: Number(localStorage.getItem('orgId')),
      UserId: Number(
        localStorage.getItem('urole') === '7'
          ? localStorage.getItem('userIdA')
          : localStorage.getItem('userId')
      ),
      Value: Number(data),
      WebHeader: 'Newcart'
    }
    //console.log(sendData)
    await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/CreateCart`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
      .then(response => response.json())
      .then(response => {
        //console.log(response)
        localStorage.setItem('createcart', response)
        localStorage.setItem('createcartuserid', data)
        if (response.length > 0 && localStorage.getItem('createcart')) {
          navigate(`/createCart`)
        }
        setIsLoading(false)
      })
  }

  const selectedUser = userId => {
    setSelectedUserId(userId)
    setOpenTaskSidebar1(!openTaskSidebar1)
    const filteredData1 = currentitem.filter(item => item.userId === userId)
    /*console.log(filteredData1)*/
    if (filteredData1 && filteredData1[0].userdata) {
      setFormData({
        ...formData,
        OrgName: filteredData1[0]?.userdata?.firstName,
        lastName: filteredData1[0]?.userdata?.lastName,
        OrgemailId: filteredData1[0]?.userdata?.emailId,
        OrgPhoneno: filteredData1[0]?.userdata?.phoneNo,
        orgAddress: filteredData1[0]?.userdata?.address1,
        orgAddress2: filteredData1[0]?.userdata?.address2,
        OrgPin: filteredData1[0]?.userdata?.pincode,
        instructions: filteredData1[0]?.userdata?.answer2,
        archiuserId: filteredData1[0]?.refUserId
      })
    }
  }

  const onInputChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  const editUser = async () => {
    try {
      setIsLoading(true)
      const sendData = {
        OrgId: Number(localStorage.getItem('orgId')),
        UserId: Number(selectedUserId),
        Apikey2: 'Success',
        FirstName: formData.OrgName,
        LastName: formData.lastName,
        UserRoleId: Number(16),
        EmailId: formData.OrgemailId,
        RefUserId: Number(ArchitectName),
        ActiveStatus: 'A',
        Address1: formData.orgAddress,
        Address2: formData.orgAddress2,
        Answer2: formData.instructions,
        Pincode: formData.OrgPin === '' ? 0 : formData.OrgPin,
        Password: '123456'
      }
      //  console.log(sendData)
      await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Editusers`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sendData)
      })
        .then(response => response.json())
        .then(response => {
          // console.log(`Single_employee`, response)
          if (response.apikey2 === 'Done') {
            toast.success('Data Updated successfull', {
              position: 'top-center'
            })
            setIsLoading(false)
            handleTaskSidebar1()
          } else {
            toast.error('Something went wrong', {
              position: 'top-center'
            })
            setIsLoading(false)
            handleTaskSidebar1()
          }
          getData()
        })
    } catch (error) {
      toast.error('Something went wrong', {
        position: 'top-center'
      })
      setIsLoading(false)
      handleTaskSidebar1()
      getData()
    }
  }

  const OnDelete = async userId => {
    setIsLoading(true)
    setSelectedUserId(userId)
    const filteredData1 = currentitem.filter(item => item.userId === userId)

    if (filteredData1 && filteredData1[0]?.userdata) {
      const userData = filteredData1[0].userdata

      // Show confirmation dialog
      Swal.fire({
        title: 'Do you want to deactivate the user?',
        showDenyButton: false,
        confirmButtonColor: 'red',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        customClass: {
          confirmButton: 'btn btn-danger m-2',
          cancelButton: 'btn btn-secondary'
        }
      }).then(async result => {
        if (result.isConfirmed) {
          // Proceed with deletion
          const sendData = {
            OrgId: Number(localStorage.getItem('orgId')),
            UserId: Number(userData.userId),
            Apikey2: 'Success',
            FirstName: userData.firstName,
            LastName: userData.lastName,
            UserRoleId: Number(90),
            EmailId: userData.emailId,
            RefUserId: filteredData1[0]?.refUserId,
            ActiveStatus: 'D',
            Address1: userData.address1,
            Address2: userData.address2,
            Answer2: userData.answer2,
            Pincode: userData.pincode === '' ? 0 : userData.pincode,
            Password: '123456'
          }
          // console.log(sendData)
          try {
            const response = await fetch(
              `${process.env.REACT_APP_API_LINK}api/Radharani/Editusers`,
              {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)
              }
            )
            const responseData = await response.json()
            //console.log(responseData)
            if (responseData.apikey2 === 'Done') {
              Swal.fire('Success!', 'Data deleted successfully', 'success')
            } else {
              Swal.fire(
                'Error!',
                'Something went wrong. Please try again later',
                'error'
              )
            }
            setIsLoading(false)
            getData() // Refresh data after deletion
          } catch (error) {
            //console.error('Error deleting user:', error)
            Swal.fire(
              'Error!',
              'Something went wrong. Please try again later',
              'error'
            )
            setIsLoading(false)
          }
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
        setIsLoading(false)
      })
    }
  }

    const filteredData = currentitem.filter(
        (item) => (item.userdata !== null ? item.userdata.firstName.toLowerCase().includes(onSearchText.toLowerCase()) || String(item.phnumber).toLowerCase().includes(onSearchText.toLowerCase()) : null)
    )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perpage,
    currentPage * perpage
  )

  const getArch = async () => {
    const sendData = {
      OrgId: Number(localStorage.getItem('orgId')),
      RoleCatId: Number(17)
    }
    //.log(sendData)
    await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Getusers`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(sendData)
    })
      .then(response => response.json())
      .then(response => {
        //console.log(response)
        setArchitect(response)
      })
  }

  useEffect(() => {
    getData()
    getArch()
  }, [DataRefresh])

  const renderClient = row => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        'light-success',
        'light-danger',
        'light-warning',
        'light-info',
        'light-primary',
        'light-secondary'
      ],
      color = states[stateNum]

    if (!row.userdata.firstName) {
      /*return <Avatar className='me-50' img={avtimg} width='32' height='32' />*/
      return (
        <Avatar
          color={color}
          className='me-50'
          content={
            row.userdata.firstName &&
            `${row.userdata.firstName} ${row.userdata.lastName}`
          }
          initials
        />
      )
    } else {
      return (
        <Avatar
          color={color}
          className='me-50'
          content={
            row.userdata.firstName ? `${row.userdata.firstName} ${row.userdata.lastName}` : 'Mounts'
          }
          initials
        />
      )
    }
  }

  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)
  const handleTaskSidebar1 = () => setOpenTaskSidebar1(!openTaskSidebar1)
  return (
    <Fragment>
      <Card className='invoice-list-dataTable react-dataTable p-1'>
        <div className='invoice-list-table-header w-100 py-2'>
          <Row>
            <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
              <div className='d-flex align-items-center me-2'>
                <label htmlFor='rows-per-page'>Show</label>
                <Input
                  type='select'
                  id='rows-per-page'
                  value={perpage}
                  onChange={e => setperpage(e.target.value)}
                  className='form-control ms-50 pe-3'
                >
                  <option value='5' disabled hidden>
                    5
                  </option>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='50'>50</option>
                </Input>
              </div>
              <Button color='success' onClick={() => handleTaskSidebar()}>
                {' '}
                <Plus size={20} />
                Add Customer
              </Button>
            </Col>
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
                  value={onSearchText}
                  onChange={e => setSearchText(e.target.value)}
                  placeholder='Search Customer'
                />
              </div>
            </Col>
          </Row>
        </div>
        <Table responsive>
          <thead>
            <tr>
              <th className='p-2'>NAME</th>
              <th className='p-2'>Create</th>
              <th className='p-2'>PHONE NO</th>
              <th className='p-2'>Architect</th>
              <th className='p-2'>USER TYPE</th>
              <th className='p-2'>Email Id</th>
              <th className='p-2'>Address 1</th>
              <th className='p-2'>Address 2</th>
              <th className='p-2'>PinCode</th>
              <th className='p-2'>Instructions</th>
              {localStorage.getItem('urole') === String(7) && (
                <>
                  <th>Edit</th>
                  <th>Deactivate</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {IsDataLoading ? (
              <td colSpan='10'>
                <div className='d-flex align-items-center justify-content-center p-5'>
                  <Spinner  type="grow" color='success' />
                  <h2 className='ms-1'>Please wait while data is loading...</h2>
                </div>
              </td>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((details, index) => (
                <tr key={index}>
                  <td
                    className='p-2'
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    {' '}
                    {renderClient(details)}
                    {details.userdata.firstName} {details.userdata.lastName}
                    {/*<Shifttimingdetails catgtypeid={details.cloudMcatId} />*/}
                  </td>

                  <td className='p-2' style={{ minWidth: '250px' }}>
                    {!IsLoading ? (
                      <Button
                        color='warning'
                        onClick={() => createCart(details.userId)}
                      >
                        <ShoppingCart size={17} /> Create New Cart
                      </Button>
                    ) : (
                      <Button color='success' disabled>
                        <Spinner size='sm' type='grow' />
                        <span className='ms-50'>Please wait...</span>
                      </Button>
                    )}
                  </td>
                  <td className='p-2'>{details.userdata.phoneNo}</td>
                  <td className='p-2'>
                    {details.architectdata !== null
                      ? `${details.architectdata.firstName} ${details.architectdata.lastName}`
                      : 'No Architect Selected'}
                  </td>
                  <td className='p-2'>
                    {/*{details.rolOrgSpicificShortName === null ? "User" : details.rolOrgSpicificShortName}*/}
                    {details.roleCatId === 16 ? 'Customer' : 'Employee'}
                  </td>
                  <td className='p-2'>
                    {details.userdata.emailId === null ||
                    details.userdata.emailId === ''
                      ? '--'
                      : details.userdata.emailId}
                  </td>
                  <td className='p-2' style={{ minWidth: '250px' }}>
                    {details.userdata.address1 === null ||
                    details.userdata.address1 === ''
                      ? '--'
                      : details.userdata.address1}
                  </td>
                  <td className='p-2' style={{ minWidth: '250px' }}>
                    {details.userdata.address2 === null ||
                    details.userdata.address2 === ''
                      ? '--'
                      : details.userdata.address2}
                  </td>
                  <td className='p-2'>
                    {details.userdata.pincode === null ||
                    details.userdata.pincode === ''
                      ? '--'
                      : details.userdata.pincode}
                  </td>
                  <td className='p-2' style={{ minWidth: '350px' }}>
                    {details.userdata.answer2 === null ||
                    details.userdata.answer2 === ''
                      ? '--'
                      : details.userdata.answer2}
                  </td>
                  {localStorage.getItem('urole') === String(7) && (
                    <>
                      {' '}
                      <td className=''>
                        <Button
                          color='success'
                          className='d-flex '
                          onClick={() => selectedUser(details.userId)}
                        >
                          <Edit3 size={20} />
                          Edit
                        </Button>
                      </td>
                      <td className=''>
                        <Button
                          color='danger'
                          className='d-flex '
                          onClick={() => OnDelete(details.userId)}
                        >
                          <Trash2 size={20} />
                        </Button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan='10'>
                  <div className='d-flex item-center p-5'>
                    <h2 className='ms-1'>No data found.</h2>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
        {paginatedData.length !== 0 ? (
          <DynamicPagination
            items={filteredData}
            itemsPerPage={perpage}
            currentPage={currentPage}
            setcurrentitem={setCurrentPage}
          />
        ) : null}
      </Card>

      <AddUserSidebar
        open={openTaskSidebar}
        handleTaskSidebar={handleTaskSidebar}
        usertypes='customer'
        setDataRefresh={setDataRefresh}
      />

      <Modal
        isOpen={openTaskSidebar1}
        toggle={handleTaskSidebar1}
        className='sidebar-lg'
        contentClassName='p-0'
        modalClassName='modal-slide-in sidebar-todo-modal'
      >
        <Card>
          <CardBody className='py-2 my-25'>
            <Form className='mt-2 pt-50' onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='firstName'>
                    <b> First Name </b>
                  </Label>
                  <Input
                    id='OrgName'
                    name='OrgName'
                    defaultValue={formData.OrgName}
                    onChange={e => onInputChange(e)}
                    placeholder="e.g: 'Varun'"
                  />

                  {errors && errors.OrgName && (
                    <FormFeedback>Please enter a valid First Name</FormFeedback>
                  )}
                </Col>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='firstName'>
                    <b> Last Name </b>
                  </Label>
                  <Input
                    id='OrgName'
                    name='lastName'
                    defaultValue={formData.lastName}
                    onChange={e => onInputChange(e)}
                    placeholder="e.g: 'Singh'"
                  />

                  {errors && errors.firstName && (
                    <FormFeedback>Please enter a valid First Name</FormFeedback>
                  )}
                </Col>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='Orgtype'>
                    <b> Select Architect</b>
                  </Label>
                  <Input
                    type='select'
                    id='rows-per-page'
                    onChange={e => setArchitectName(e.target.value)}
                    className='form-control'
                    defaultValue={formData.archiuserId}
                  >
                    <option value='Select'>Select</option>
                    {Architect.length > 0 ? (
                      Architect.map(({ userdata, userId }) => (
                        <Fragment key={userId}>
                          <option value={userdata.userId}>
                            {userdata.firstName} {userdata.lastName}
                          </option>
                        </Fragment>
                      ))
                    ) : (
                      <option style={{ color: 'red' }}>
                        Please Update Architect
                      </option>
                    )}
                  </Input>
                </Col>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='emailInput'>
                    <b> E-mail </b>
                  </Label>
                  <Input
                    id='OrgemailId'
                    type='email'
                    defaultValue={formData.OrgemailId}
                    name='OrgemailId'
                    onChange={e => onInputChange(e)}
                    placeholder="e.g: 'example@gmail.com'"
                  />
                </Col>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='OrgPhoneno'>
                    <b> Phone Number </b>
                  </Label>
                  <Input
                    id='OrgPhoneno'
                    disabled
                    type='number'
                    defaultValue={formData.OrgPhoneno}
                    name='OrgPhoneno'
                    onChange={e => onInputChange(e)}
                    placeholder="e.g: '98XXXXXXXXX'"
                  />
                </Col>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='address'>
                    <b> Address 1 </b>
                  </Label>
                  <Input
                    id='orgAddress'
                    type='text'
                    name='orgAddress'
                    defaultValue={formData.orgAddress}
                    onChange={e => onInputChange(e)}
                    placeholder="e.g: 'B-16 Jankpuri Delhi'"
                  />
                </Col>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='address'>
                    <b> Address 2 </b>
                  </Label>
                  <Input
                    id='orgAddress2'
                    type='text'
                    name='orgAddress2'
                    defaultValue={formData.orgAddress2}
                    onChange={e => onInputChange(e)}
                    placeholder="e.g: 'B-16 Jankpuri Delhi'"
                  />
                </Col>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='accountState'>
                    <b> Pin Code </b>
                  </Label>
                  <Input
                    id='OrgPin'
                    type='number'
                    name='OrgPin'
                    defaultValue={formData.OrgPin}
                    onChange={e => onInputChange(e)}
                    placeholder="e.g: '110000'"
                  />
                </Col>
                <Col sm='12' className='mb-1'>
                  <Label className='form-label' for='zipCode'>
                    <b> Instructions </b>
                  </Label>
                  <Input
                    id='OrgPin'
                    type='textarea'
                    name='instructions'
                    defaultValue={formData.instructions}
                    onChange={e => onInputChange(e)}
                    placeholder="e.g: 'This marbals is good'"
                  />
                </Col>
                <Col className='mt-2' sm='12'>
                  {!IsLoading ? (
                    <Button
                      type='submit'
                      onClick={() => editUser()}
                      className='me-1'
                      color='success'
                    >
                      <PlusCircle size={20} /> Update Customer
                    </Button>
                  ) : (
                    <Button color='success' disabled>
                      <Spinner size='sm' type='grow' />
                      <span className='ms-50'>Please wait...</span>
                    </Button>
                  )}
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Modal>
    </Fragment>
  )
}

export default Customer
