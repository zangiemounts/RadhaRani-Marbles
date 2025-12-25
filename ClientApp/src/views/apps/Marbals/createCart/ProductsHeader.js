// ** Third Party Components
import classnames from 'classnames'
import { Menu, Grid, List, Plus } from 'react-feather'
//import QrReader from "react-web-qr-reader"
import { QrScanner } from '@yudiel/react-qr-scanner'

// ** Reactstrap Imports
import {
  Row,
  Col,
  Button,
  ButtonGroup,
  Modal,
  Input,
  CardBody,
    ModalFooter,
    Spinner
} from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

const ProductsHeader = props => {
  // ** Props
    const { activeView, setActiveView, dispatch, getProducts, store, refreshcount } = props
    const navigate = useNavigate()
    const [open, setopen] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)
    const qrRef = useRef(null)
  // ** Sorting obj
  const sortToggleText = {
    'price-desc': 'Highest',
    'price-asc': 'Lowest',
    featured: 'Featured'
    }
    const [totalcart, settotalcart] = useState(0)
    const getCount = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            InstrumentRemarks: localStorage.getItem("createcart")

        }
       // console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetCartItemsNO`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
                //console.log("count", response)
                settotalcart(response)
            })

    }
    const delay = 500

    const previewStyle = {
        height: 240,
        width: 320
    }

    const [result, setResult] = useState("No result")

    const handleScan = (result) => {
        if (result) {
            setResult(result)
        }
    }

    const handleError = (error) => {
        console.log(error)
    }
    const onScanFile = () => {
        setopen(!open)
    }

    useEffect(() => {
        getCount()
    }, [refreshcount])

    const redirect = () => {
        setIsLoading(true)
        navigate("/estimate")
        setIsLoading(false)
    }
    return (<>

        <div className='invoice-list-table-header w-100 py-2'>
            <Row >
                <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                    <div className='d-flex align-items-center me-2'>
                        {!IsLoading ? < Button color='success' className={'btn-icon view-btn grid-view-btn ml-0 '} onClick={() => redirect()}>
                            <b> CheckOut - {totalcart}</b>
                        </Button> : <Button color='success' disabled>
                            <Spinner size='sm' type='grow' />
                            <span className='ms-50'>Please wait...</span>
                        </Button>}
                    </div>
                    <Button color='success' className={'btn-icon view-btn grid-view-btn'} onClick={() => onScanFile()} style={{ marginLeft: "30%" }}>
                        Qrscanner
                    </Button>
                </Col>
                <Col
                    lg='6'
                    className='actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0'
                >
                    <div className='d-flex align-items-center'>
                        <div className='result-toggler'>
                            <span className='search-results'>{store.length} Results Found {" ."}</span>
                        </div>
                    </div>
                    <div className='view-options d-flex'>

                        <ButtonGroup>
                            <Button
                                tag='label'
                                className={classnames('btn-icon view-btn grid-view-btn', {
                                    active: activeView === 'grid'
                                })}
                                color='primary'
                                outline
                                onClick={() => setActiveView('grid')}
                            >
                                <Grid size={18} />
                            </Button>
                            <Button
                                tag='label'
                                className={classnames('btn-icon view-btn list-view-btn', {
                                    active: activeView === 'list'
                                })}
                                color='primary'
                                outline
                                onClick={() => setActiveView('list')}
                            >
                                <List size={18} />
                            </Button>
                        </ButtonGroup>

                    </div>
                </Col>

            </Row>
        </div>
    <div className='ecommerce-header'>
      

          <Modal
              isOpen={open}
              className='sidebar-lg'
              contentClassName='p-6'
          >  
          <div style={{ width: '140%', height: '190%', padding: 0, marginLeft: -70 }}>
              <div
                  style={{
                      position: 'relative',
                      overflow: 'hidden'
                  }}
              >
                  <QrScanner
                      onDecode={(result) => { window.location.href = result }}
                      onError={(error) => console.log(error?.message)}
                      style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          top: 0,
                          left: 0
                      }}
                  />
              </div>
          </div>
                 
                  <ModalFooter className="mt-5">
                      <Button color="danger" onClick={() => setopen(!open)}>Close</Button>{' '}
                  </ModalFooter>
          
          </Modal>
      </div>
    </>
  )
}

export default ProductsHeader
