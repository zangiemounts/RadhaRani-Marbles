// ** Custom Components
import { Fragment, useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import {
    Row,
    Col,
    Table,
    Card,
    Input,
    Button,
    Spinner
} from 'reactstrap'

import { Plus } from "react-feather"
import DynamicPagination from '../DataCard/DynamicPagination'
import QRCode from 'react-qr-code'
import AddUserSidebar from '../DataCard/AddUserSidebar'
import AddQRSidebar from './addQRSidebar'

const MarbelStore = () => {
    const navigate = useNavigate()
    const [onSearchText, setSearchText] = useState("")
    const [currentitem, setcurrentitem] = useState([])
    const [perpage, setperpage] = useState(20)
    const [currentPage, setCurrentPage] = useState(1)
    const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
    const [IsDataloading, setIsDataloading] = useState(true)

    const getData = async () => {
        setIsDataloading(true)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId"))

        }
       // console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Getproduct`, {
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
                setIsDataloading(false)
                setcurrentitem(response)
            })

    }

    const filteredData = currentitem.filter(
        (item) => item.productDetails.productName.toLowerCase().includes(onSearchText.toLowerCase()) || item.unit.toLowerCase().includes(onSearchText.toLowerCase())
            || String(item.currentStock).toLowerCase().includes(onSearchText.toLowerCase()) || item.sku.toLowerCase().includes(onSearchText.toLowerCase())
    )

    const paginatedData = filteredData.slice(
        (currentPage - 1) * perpage,
        currentPage * perpage
    )
    
    useEffect(() => {
        getData()
    }, [])

    const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)
    return (
        <Fragment>
            <Card className='invoice-list-dataTable react-dataTable p-2'>
                <div className="invoice-list-table-header w-100 py-2">
                    <Row >
                        <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                            <div className='d-flex align-items-center me-2'>
                                <label htmlFor='rows-per-page'>Show</label>
                                <Input
                                    type='select'
                                    id='rows-per-page'
                                    value={perpage}
                                    onChange={(e) => setperpage(e.target.value)}
                                    className='form-control ms-50 pe-3'
                                >
                                    <option value='20' disabled hidden>20</option>
                                    <option value='20'>20</option>
                                    <option value='30'>30</option>
                                    <option value='50'>50</option>
                                </Input>
                                <Button color="success d-flex item-center m-2" onClick={() => handleTaskSidebar()}> <Plus size={20} /> Print QR</Button>
                            </div>
                           
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
                                    placeholder='Search Product'
                                />
                            </div>

                        </Col>

                </Row>
                </div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>S.No</th>
                                <th>Lot No.</th>
                                <th>Quantity</th>
                                <th>Size</th>
                                <th>Thikness</th>
                                <th>Price</th>
                                <th>GST</th>
                                <th>QR</th>

                            </tr>
                        </thead>
                        <tbody>

                        {IsDataloading ? (
                            <td colSpan='10'>
                                <div className='d-flex align-items-center justify-content-center p-5'>
                                    <Spinner type="grow" color='success' />
                                    <h2 className='ms-1'>Please wait while data is loading...</h2>
                                </div>
                            </td>
                        ) : paginatedData.length > 0 ? paginatedData.map((details, index) => <tr key={index}>

                                <td> {index + 1} </td>
                                <td> {details.productDetails.productName} </td>
                                <td>
                                    {details.currentStock}
                                </td>
                                <td>
                                    {details.sku}
                                </td>
                                <td>
                                    {details.unit}
                                </td>
                                <td>
                                    {details.salesCost}
                                </td>
                                <td>
                                    {details.discountPercentage}
                                </td>
                                
                                <td style={{ minWidth: "150px" }}>
                                   {/* <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={`${window.location.origin}/GetOneData?${details.cloudInterfactDisplaySectionId}`}
                                        viewBox={`0 0 256 256`}
                                    />*/}
                                    <QRCode
                                        size={256}
                                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                        value={`${window.location.origin}/createCart?${details.organizationProductDetailsId}`}
                                        viewBox={`0 0 256 256`}
                                    />
                                    
                                </td>
                            </tr>

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
                {paginatedData.length !== 0 ? <DynamicPagination items={filteredData} itemsPerPage={perpage} currentPage={currentPage} setcurrentitem={setCurrentPage} /> : null}
            </Card>

            <AddQRSidebar
                open={openTaskSidebar}
                handleTaskSidebar={handleTaskSidebar}
                QRData={filteredData}
            />
        </Fragment>
    )
}

export default MarbelStore
