import { Fragment, useEffect, useState } from 'react'

// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardImg,
    CardLink,
    CardBody,
    CardText,
    CardTitle,
    ListGroup,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ListGroupItem
} from 'reactstrap'
import QRCode from 'react-qr-code'

// ** Images
import img2 from '@src/assets/images/pages/Radharanip.png'
import DynamicPagination from './DynamicPagination'
import AddItem from '../user/list/AddItem'

const DataShowCard = () => {
    const [UniqueId, setUniqueId] = useState(0)
    const [formModal, setFormModal] = useState(false)
    const [Data, setData] = useState([])
    const [perpage, setperpage] = useState(2)
    const [currentPage, setCurrentPage] = useState(1)

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
                    setData(data)
                })
    }

    const tigger = (id) => {
        setFormModal(!formModal)
        setUniqueId(id)
    }

    const filteredData = Data.filter(
        (item) => item.mainDesc.toLowerCase()
    )

    const paginatedData = filteredData.slice(
        (currentPage - 1) * perpage,
        currentPage * perpage
    )

    useEffect(() => {
        getSubmitData()
    }, [])

    return (
        <Fragment>

            <AddItem />

            <Card className='overflow-hidden'>
                <div className='react-dataTable'>
            <Row>

                {paginatedData.length > 0 ? paginatedData.map((details) => (
                <Col md='6' lg='5' className="m-3">
                    <Card>
                        <CardImg top src={img2} style={{maxWidth:"70%"}} alt='Card cap' />
                        <CardBody>
                            <CardTitle tag='h4'>Lot No.- {details.mainDesc} </CardTitle>
                            <CardText>Size- {details.columRemarks} </CardText>
                        </CardBody>
                        <ListGroup flush>
                            <ListGroupItem>Thikness- {details.urlimage1} </ListGroupItem>
                            <ListGroupItem>Quantity- {details.urlimage2 === "" || details.urlimage2 === null ? 0 : details.urlimage2} </ListGroupItem>
                            <ListGroupItem>Price- {details.value} </ListGroupItem>
                            <ListGroupItem>GST- {details.urlimage4} </ListGroupItem>
                        </ListGroup>
                        <CardBody>
                            <CardLink style={{color:"#FFFFFF", backgroundColor:"#28C76F", borderRadius: "8px", padding:"6px"}} onClick={() => tigger(details.cloudInterfactDisplaySectionId)}>
                                Show QR
                            </CardLink>
                        </CardBody>
                    </Card>
                    </Col>)) : <h2 className="mt-2 m-1 p-5">No Data Found</h2>}
                    </Row>
                </div>
            {paginatedData.length !== 0 ? <DynamicPagination items={filteredData} itemsPerPage={perpage} currentPage={currentPage} setcurrentitem={setCurrentPage} /> : null}
            </Card>

            {/*QR Code Modal*/}

            <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setFormModal(!formModal)}>{""}</ModalHeader>
                <ModalBody>

                    {UniqueId && (
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={`${window.location.origin}/GetOneData?${UniqueId}`}
                            viewBox={`0 0 256 256`}
                        />
                    )}
                   {/* <p>{`${window.location.origin}/GetOneData?${UniqueId}`}</p>*/}
                    {/*  <p>{BarcodeData}</p>*/}
                </ModalBody>
                <ModalFooter>
                    {/* <Button target = "_blank" onClick={() => window.open(`${window.location.origin}/GetOneData?${UniqueId}`)}>Clirck</Button>*/}
                    {""}
                </ModalFooter>
            </Modal>
        </Fragment>
    )
}

export default DataShowCard