// ** React Imports
import { Fragment, useState, useEffect } from 'react'
import classnames from 'classnames'
// ** Reactstrap Imports
import {
    Row,
    Col,
    Card,
    CardImg,
    CardBody,
    CardText,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Button,
    UncontrolledButtonDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap'
import { Star, ShoppingCart, DollarSign, Heart, Share2, Facebook, Twitter, Youtube, Instagram } from 'react-feather'
/*import img2 from '@src/assets/images/slider/02.jpg'*/
import img2 from '@src/assets/images/pages/Radharanip.png'

const GetOneData = () => {

    const [Data, setData] = useState([])

    /*console.log(window.location.search.slice(1))*/
    const getSubmitData = async () => {

        const sendData = {
            CloudInterfactDisplaySectionId: Number(window.location.search.slice(1)),
            ActiveStatus: "A",
            webHeader: "Marbels"
        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getsingledata`, {
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
                    /*console.log(data)*/
                    setData(data)
                })
    }
    useEffect(() => {
        getSubmitData()
    }, [])
    return (
        <Fragment>{/*
                    <Row>
                        {Data.length > 0 ? Data.map((details) => (
                            <Col md='6' lg='5' className="m-5 p-4">
                                <Card>
                                    <CardImg top src={img2} style={{ maxWidth: "80%", margin:"18px 5px 5px 30px"}} alt='Card cap' />
                                    <CardBody>
                                        <CardTitle tag='h4'>Lot No.- {details.mainDesc} </CardTitle>
                                        <CardText>Size- {details.columRemarks} </CardText>
                                    </CardBody>
                                    <ListGroup flush>
                                        <ListGroupItem>Thikness- {details.urlimage1} </ListGroupItem>
                                        <ListGroupItem>Quantity- {details.urlimage3 === "" || details.urlimage3 === null ? 0 : details.urlimage3} </ListGroupItem>
                                    </ListGroup>
                                </Card>
                            </Col>)) : <h2 className="mt-2 m-1 p-5">No Data Found</h2>}
                    </Row>*/}
            <Card className="mt-4 p-3">
                <CardBody>
                {Data.length > 0 ? Data.map((details) => (
            <Row className='my-2'>
                <Col className='d-flex align-items-center justify-content-center mb-2 mb-md-0' md='5' xs='12'>
                    <div className='d-flex align-items-center justify-content-center'>
                        <img className='img-fluid product-img' src={img2} alt="Product Image" />
                    </div>
                </Col>
                <Col md='7' xs='12'>
                    <h4>Lot No.- {details.mainDesc}</h4>
                    <CardText tag='span' className='item-company'>
                        Size-
                        <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                          {details.columRemarks}
                        </a>
                    </CardText>
                    <div className='ecommerce-details-price d-flex flex-wrap mt-1'>
                        <h4 className='item-price me-1'>Rs. {details.value}</h4>
                        <ul className='unstyled-list list-inline'>
                        <li  className='ratings-list-item me-25'>
                        Quantity- {details.urlimage3 === "" || details.urlimage3 === null ? 0 : details.urlimage3}
                        </li>
                        </ul>
                    </div>
                    <CardText>
                        Available -<span className='text-success ms-25'>In stock</span>
                    </CardText>
                    <CardText>Thikness- {details.urlimage1}</CardText>
                    <ul className='product-features list-unstyled'>
                        {details.hasFreeShipping ? (
                            <li>
                                <ShoppingCart size={19} />
                                <span>Free Shipping</span>
                            </li>
                        ) : null}
                        <li>
                            <b>RS.</b> {details.value}
                            <span>EMI options available</span>
                        </li>
                    </ul>
                    <hr />
                    
                </Col>
                    </Row>)) : <h2 className="mt-2 m-1 p-5">No Data Found</h2>}
                </CardBody>
            </Card>
        </Fragment>
    )
}

export default GetOneData
