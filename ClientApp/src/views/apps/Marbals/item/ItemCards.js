// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Edit, Codesandbox, Image } from 'react-feather'
import "../../../../@core/scss/base/pages/app-ecommerce.scss"
// ** Reactstrap Imports
import {
    Card, CardBody, CardText, Button, Modal,
    ModalHeader,
    ModalBody,
    ModalFooter } from 'reactstrap'
import { useState } from 'react'
import QRCode from 'react-qr-code'
import EditItemSidebar from './EditItemSidebar'
import { CrousalImage } from './crousalImage'

const ItemCards = props => {
  // ** Props
  const {
    products,
    activeView,
    setapiRefresh,
    apiRefresh
    } = props
    const [formModal, setFormModal] = useState(false)
    const [UniqueId, setUniqueId] = useState(0)
    const tigger = (id) => {
        setFormModal(!formModal)
        setUniqueId(id)
    }
    const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
    const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)

    const [selectedProductId, setSelectedProductId] = useState(null)

    const handleProductSelection = (productId) => {
        setSelectedProductId(productId)
        setOpenTaskSidebar(!openTaskSidebar)
    }

    // Filter the data based on the selected productId
    const filteredData = selectedProductId ? products.filter(item => item.organizationProductDetailsId === selectedProductId) : products

    const redirect = (id) => {
        sessionStorage.setItem("ProductImageId", id)
        window.location.pathname = "/images"
    }

    const SingleQr = (id) => {
        sessionStorage.setItem("SingleQR", id)
        window.location.pathname = "/marbelQRSingleDownload"
    }
    
  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {
        const CartBtnTag = item.isInCart ? Link : 'button'

        return (
          <Card className='ecommerce-card' key={item.productDetails.productName}>
            <div className='item-img text-center mx-auto'>
           <span> <CrousalImage ProductImageId={item.organizationProductDetailsId}/></span>
             {/* <span onClick={() => tigger(item.cloudInterfactDisplaySectionId)}>
                <img className='img-fluid card-img-top' src={img2} alt={item.name} />
              </span>*/}
            </div>
            <CardBody>
              <div className='item-wrapper'>
                <div className='item-rating'>
                  <ul className='unstyled-list list-inline'>
                        <li className='ratings-list-item me-25'>
                        <b>Lot No.</b>-  {item.productDetails.productName}
                        </li>
                     
                  </ul>
                </div>
                <div className='item-cost'>
                  <h6 className='item-price'>Price- Rs.{item.salesCost}</h6>
                </div>
              </div>
              <h6 className='item-name'>
                <span className='text-body'>
                  Thikness- {item.unit}
                </span>
                <Link className='text-body' style={{PointerEvent:"none"}}>
                 Size- <span style={{color:"#7367f0"}}>{item.sku}</span>
                </Link>
               {activeView === 'list' ? null : <span className='text-body'>
                 Quantity-<span style={{color:"#7367f0"}}> {item.currentStock === "" || item.currentStock === null ? 0 : item.currentStock} {item.unitType}</span>
                </span>}
                <CardText tag='span' className='item-company'>
                  Quantity{' '}
                  <span style={{color:"#7367f0"}} className='company-name' >
                    {item.currentStock === "" || item.currentStock === null ? 0 : item.currentStock} {item.unitType}
                  </span>
                </CardText>
              </h6>
              <CardText className='item-description'><font size="3">GST - {item.discountPercentage}%</font></CardText>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>Rs.{item.salesCost}</h4>
                </div>
              </div>
              <Button
                color='success'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => tigger(item.organizationProductDetailsId)}
              >
                <Codesandbox className='me-50' size={14} />
                <span>{item.isInCart ? 'View In Cart' : 'Show QR'}</span>
              </Button>
              <Button
                color='warning'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => handleProductSelection(item.organizationProductDetailsId)}
              >
                <Edit className='me-50' size={14} />
                <span>Edit Items</span>
                    </Button><br/>
              <Button
                color='info'
                Block
                tag={CartBtnTag}
                className='btn-cart move-cart mt-1 '
                onClick={() => redirect(item.organizationProductDetailsId)}
              >
                <Image className='me-50' size={14} />
                <span>Upload Images</span>
              </Button>
                </div>

                <EditItemSidebar
                    open={openTaskSidebar}
                    handleTaskSidebar={handleTaskSidebar}
                    data={filteredData[0]}
                    setapiRefresh={setapiRefresh}
                    apiRefresh={apiRefresh}
                />
            </Card>


        )
      })
    }
  }

  return (<>
      <div className={classnames({
          'grid-view': activeView === 'grid',
          'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
      </div>

    
    <Modal isOpen={formModal} toggle={() => setFormModal(!formModal)} className='modal-dialog-centered'>
                <ModalHeader toggle={() => setFormModal(!formModal)}>{""}</ModalHeader>
                <ModalBody>

                    {UniqueId && (
                        <QRCode
                            size={256}
                            style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                            value={`${window.location.origin}/createCart?${UniqueId}`}
                            viewBox={`0 0 256 256`}
                        />
                    )}
              {/*<p>{`${window.location.origin}/createCart?${UniqueId}`}</p>*/}
              <Button color="success" className="mt-2" onClick={() => SingleQr(UniqueId)}>Print QR</Button>
                </ModalBody>
                <ModalFooter>
                    {/* <Button target = "_blank" onClick={() => window.open(`${window.location.origin}/GetOneData?${UniqueId}`)}>Clirck</Button>*/}
                    {""}
                </ModalFooter>
      </Modal>
  </>
  )
}

export default ItemCards
