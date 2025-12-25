// ** Custom Components
import { Fragment, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    Row,
    Col,
    Button,
    Table
} from 'reactstrap'
import { Plus } from "react-feather"
import Card from '@components/card-snippet'
import DynamicPagination from './DynamicPagination'
import AddUserSidebar from './AddUserSidebar'
import Avatar from '@components/avatar'
import AddMesurementSideBar from './AddMesurementSideBar'

const MesurementSheet = () => {
    const navigate = useNavigate()
    const [onSearchText, setSearchText] = useState("")
    const [currentitem, setcurrentitem] = useState([])
    const [perpage, setperpage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [openTaskSidebar, setOpenTaskSidebar] = useState(false)

    const getData = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserRoleId: Number(17)

        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getusersdataback`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {

                setcurrentitem(response)
                console.log(response)
            })

    }

    const createCart = async (data) => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            Value: Number(data),
            WebHeader: "Createcart"

        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/CreateCart`, {
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
                sessionStorage.setItem("createcart", response)
                if (Number(response) > 0) {
                    navigate("/showUsers")
                }
            })

    }

    const filteredData = currentitem.filter(
        (item) => (item.userdata !== null ? item.userdata.firstName.toLowerCase().includes(onSearchText.toLowerCase()) || item.phnumber.toLowerCase().includes(onSearchText.toLowerCase()) : null)
    )

    const paginatedData = filteredData.slice(
        (currentPage - 1) * perpage,
        currentPage * perpage
    )

    useEffect(() => {
        getData()
    }, [])

    const renderClient = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        if (row.userdata.firstName) {
            /*return <Avatar className='me-50' img={avtimg} width='32' height='32' />*/
            return <Avatar color={color} className='me-50' content={row.userdata.firstName && (`${row.userdata.firstName} ${row.userdata.lastName}`)} initials />
        } else {
            return <Avatar color={color} className='me-50' content={'RadhaRani'} initials />
        }
    }

    const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)
    return (
        <Fragment>
                <Card className='overflow-hidden'>
                    <div className='react-dataTable'>
                    <Row>
                        <Col>
                            <Button className='mb-2 mx-2' color="success" onClick={() => handleTaskSidebar()}> <Plus size={20} /> Add Mesurement Slip</Button>
                            {/*<AddUsers />*/}
                        </Col>
                    </Row>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th>NAME</th>
                                        <th>PHONE NO</th>
                                        <th>USER TYPE</th>
                                        <th>Email Id</th>
                                        <th>Address 1</th>
                                        <th>Address 2</th>
                                        <th>PinCode</th>
                                        <th>Instructions</th>
                                        <th>Create</th>

                                    </tr>
                                </thead>
                                <tbody>

                                    {paginatedData !== [] ? paginatedData.map((details, index) => <tr>

                                        <td style={{ display: "flex", alignItems: "center" }}> {renderClient(details)} {details.userdata.firstName} {" "} {details.userdata.lastName}{/*<Shifttimingdetails catgtypeid={details.cloudMcatId} />*/}</td>
                                        {/*  <td>  <UserDetails userId={details.value} /></td>*/}
                                        <td>
                                            {details.userdata.phoneNo}
                                        </td>
                                        <td>

                                            {/*{details.rolOrgSpicificShortName === null ? "User" : details.rolOrgSpicificShortName}*/}
                                            {details.userdata.userRoleId === 17 ? "Employee" : "Customer"}
                                        </td>
                                        <td >

                                            {details.userdata.emailId === null || details.userdata.emailId === "" ? "example@mounts.in" : details.userdata.emailId}
                                        </td>
                                        <td style={{ minWidth: "250px" }}>

                                            {details.userdata.address1 === null || details.userdata.address1 === "" ? " 1 Delhi" : details.userdata.address1}
                                        </td>
                                        <td style={{ minWidth: "250px" }}>

                                            {details.userdata.address2 === null || details.userdata.address2 === "" ? "2 Delhi" : details.userdata.address2}
                                        </td>
                                        <td>

                                            {details.userdata.pincode === null || details.userdata.pincode === "" ? "110051" : details.userdata.pincode}
                                        </td>
                                        <td style={{ minWidth: "350px" }}>

                                            {details.userdata.answer2 === null || details.userdata.answer2 === "" ? "Instruction check" : details.userdata.answer2}
                                        </td>
                                        <td style={{ minWidth: "250px" }}>
                                            <Button color="success" onClick={() => createCart(details.userdata.userId)}>Create New Cart</Button>
                                        </td>
                                    </tr>

                                    ) : null}

                                </tbody>

                            </Table>
                       
                    </div>
                    {paginatedData.length !== 0 ? <DynamicPagination items={filteredData} itemsPerPage={perpage} currentPage={currentPage} setcurrentitem={setCurrentPage} /> : null}
                </Card>

            <AddMesurementSideBar
                open={openTaskSidebar}
                handleTaskSidebar={handleTaskSidebar}
                usertypes="sales"
            />
        </Fragment>
    )
}

export default MesurementSheet
