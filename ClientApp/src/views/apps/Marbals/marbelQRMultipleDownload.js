// ** Custom Components
import { Fragment, useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap'

import DynamicPagination from '../DataCard/DynamicPagination'
import QRCode from 'react-qr-code'

const MarbelQRMultipleDownload = ({ qrId }) => {
    const navigate = useNavigate()
    const [onSearchText, setSearchText] = useState("")
    const [currentitem, setcurrentitem] = useState([])
    const [perpage, setperpage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)
    console.log(qrId)
    const getData = async () => {
            const sendData = {
                OrgId: Number(localStorage.getItem("orgId")),
                OrganizationProductDetailsId: Number(qrId)

            }
            console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetproductSingle`, {
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

    const filteredData = currentitem.filter(
        (item) => item.productDetails.productName.toLowerCase().includes(onSearchText.toLowerCase()) || item.unit.toLowerCase().includes(onSearchText.toLowerCase())
            || item.currentStock.toLowerCase().includes(onSearchText.toLowerCase()) || item.sku.toLowerCase().includes(onSearchText.toLowerCase())
    )

    const paginatedData = filteredData.slice(
        (currentPage - 1) * perpage,
        currentPage * perpage
    )
    
    useEffect(() => {
        getData()
        setTimeout(() => window.print(), 1000)
    }, [])


    return (
        <Fragment>
            <Row className='match-height'>
                {filteredData !== [] ? filteredData.map((details, index) => (
                    <div className='p-2' key={index}>
                        <Card>
                            <CardBody className='text-center'>
                                <CardText>
                                    {/*<CardTitle tag='h5'>{details.productDetails.productName}</CardTitle>*/}
                                    <QRCode
                                        size={128} // Adjust the size as needed to fit multiple QR codes per page
                                        style={{ height: 'auto', maxWidth: '100%' }}
                                        value={`${window.location.origin}/createCart?${details.organizationProductDetailsId}`}
                                        viewBox={`0 0 256 256`}
                                    />
                                    <CardTitle className="m-1" tag='h6'>{details.productDetails.productName}</CardTitle>
                                </CardText>
                            </CardBody>
                        </Card>
                    </div>)) : null}
            </Row>
         </Fragment>
        
    )
}

export default MarbelQRMultipleDownload
