// ** Custom Components
import { Fragment, useState, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import {
    Row,
    Col,
    Card,
    CardBody,
    Spinner
} from 'reactstrap'
import QRCode from 'react-qr-code'
import { Container } from '../../DynamicWebsite/globalStyles'

const MarbelQRDownload = () => {
    const navigate = useNavigate()
    const [onSearchText, setSearchText] = useState("")
    const [currentitem, setcurrentitem] = useState([])
    const [perpage, setperpage] = useState(6)
    const [currentPage, setCurrentPage] = useState(1)

    const getData = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId"))

        }
        //console.log(sendData)
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

                setcurrentitem(response)
                //console.log(response)
            })

    }

    const createCart = async (data) => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            Value: Number(data),
            WebHeader: "Createcart"

        }
        //console.log(sendData)
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
                //console.log(response)
                sessionStorage.setItem("createcart", response)
                if (Number(response) > 0) {
                    navigate("/showUsers")
                }
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
    //console.log(paginatedData)
    useEffect(() => {
        getData()
    }, [])


    return (
        <Container>
         <Row className='match-height'>
                {filteredData !== [] ? filteredData.map((details, index) => (
                    <Col lg='2' md='3' xs='3' key={index}>
                        <Card style={{ minHeight: "300px" }}>
                            <CardBody className='text-center'>
                                <div>
                                    {/*<CardTitle tag='h5'>{details.productDetails.productName}</CardTitle>*/}
                                    <QRCode
                                        size={128} // Adjust the size as needed to fit multiple QR codes per page
                                        style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                                        value={`${window.location.origin}/createCart?${details.organizationProductDetailsId}`}
                                        viewBox={`0 0 256 256`}
                                    />
                                    <h6 className="m-1" tag='h6'>{details.productDetails.productName}</h6>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>)) : (
                        <div className="d-flex item-center justify-between mt-5 p-5">
                            <Spinner color="success" className="d-flex" />
                    <h2>Please wait.......</h2>
                </div>)}
                    
            </Row>
         </Container>
        
    )
}

export default MarbelQRDownload
