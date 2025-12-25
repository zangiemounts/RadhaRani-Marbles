// ** Custom Components
import { Fragment, useState, useEffect } from 'react'
import {
    Row,
    Col,
    Button,
    Table,
    Input
} from 'reactstrap'
import { Plus, ArrowLeft } from "react-feather"
import AddVechileSidebar from './addVechileSidebar'
// ** Third Party Components
import ReactPaginate from 'react-paginate'
import DataTable from 'react-data-table-component'
import AddVechileContractorSidebar from './addVechileContractorSidebar'

const CustomHeader = ({ perpage, setperpage, onSearchText, setSearchText, openTaskSidebar, setdataRefresh, handleTaskSidebar }) => {
 
    return (
        <div className='invoice-list-table-header w-100 py-2'>
            <Row>
                <Col lg='4' className='d-flex align-items-center px-0 px-lg-1'>
                    <div className='d-flex align-items-center me-2'>
                        <label htmlFor='rows-per-page'>Show</label>
                        <Input
                            type='select'
                            id='rows-per-page'
                            value={perpage}
                            onChange={(e) => setperpage(e.target.value)}
                            className='form-control ms-50 pe-3'
                        >
                            <option value='5' disabled hidden>5</option>
                            <option value='10'>10</option>
                            <option value='15'>15</option>
                            <option value='20'>20</option>
                        </Input>
                    </div>
                    <Button color="success" onClick={() => handleTaskSidebar()}> <Plus size={20} /> Add Contractor</Button>
                </Col>
                <Col lg='2' className='d-flex align-items-center px-0 px-lg-1'>

                    <Button color="dark" onClick={() => (window.location.pathname = "/vehicle")}> <ArrowLeft size={20} /> Go Back</Button>

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
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder='Search Contractor.'
                        />
                    </div>

                </Col>
            </Row>
            <AddVechileContractorSidebar
                open={openTaskSidebar}
                handleTaskSidebar={handleTaskSidebar}
                usertypes="sales"
                setdataRefresh={setdataRefresh}
            />
        </div>
    )
}


const VehicleContractor = () => {
    const [onSearchText, setSearchText] = useState("")
    const [currentitem, setcurrentitem] = useState([])
    const [perpage, setperpage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1)
    const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
    const [dataRefresh, setdataRefresh] = useState(false)

    const getData = async () => {
        try {
            const sendData = {
                CatgId: Number(65),
                GroupOrderdata: Number(localStorage.getItem("orgId"))

            }
           // console.log(sendData)
            await fetch(`${ process.env.REACT_APP_API_LINK }api/Radharani/GetTruck`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sendData)

            })
                .then((response) => response.json())
                .then(response => {
                    try {
                      //  console.log("Vechile_Data", response)

                       setcurrentitem(response)
                    } catch (error) {
                        console.log("eee")
                    }
                }).then(error => {
                })
        } catch (error) {
            console.log("Error")
        }

    }
    

    const filteredData = currentitem.filter(
        (item) => (item !== null ? item.catgType.toLowerCase().includes(onSearchText.toLowerCase()) || item.catgDesc.toLowerCase().includes(onSearchText.toLowerCase()) : null)
    )

    const paginatedData = filteredData.slice(
        (currentPage - 1) * perpage,
        currentPage * perpage
    )

    useEffect(() => {
        getData()
    }, [dataRefresh])

    const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)

    const CustomPagination = () => {
        const count = Math.ceil(filteredData.length / perpage)

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

    const data = [
        {
            name: 'Contractor Name',
            sortable: true,
            sortField: 'id',
            minWidth: '120px',
            cell: row => <span>{row.catgType}</span>
        }
    ]

    return (
        
                    <div className='invoice-list-dataTable react-dataTable'>
                        <DataTable
                            noHeader
                            pagination
                            sortServer
                            paginationServer
                            subHeader={true}
                            columns={data}
                            responsive={true}
                            data={paginatedData}
                            className='react-dataTable'
                            defaultSortField='invoiceId'
                            paginationDefaultPage={currentPage}
                            paginationComponent={CustomPagination}
                            subHeaderComponent={
                                <CustomHeader
                                    perpage={perpage}
                                    setperpage={setperpage}
                                    onSearchText={onSearchText}
                                    setSearchText={setSearchText}
                                    openTaskSidebar={openTaskSidebar}
                                    setOpenTaskSidebar={setOpenTaskSidebar}
                                    setdataRefresh={setdataRefresh}
                                    handleTaskSidebar={handleTaskSidebar}
                                />
                            }
                        />
                    </div>
               
    )
}

export default VehicleContractor
