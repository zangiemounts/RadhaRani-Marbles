// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Plus, Minus } from 'react-feather'
import InputNumber from 'rc-input-number'
import "../../../../@core/scss/base/pages/app-ecommerce.scss"
// Static Images
import img2 from '@src/assets/images/pages/Radharanip.png'
// ** Reactstrap Imports
import { Card, CardBody, Input, CardText, Button, Badge, Spinner } from 'reactstrap'
import Swal from 'sweetalert2'
import { useState } from 'react'

const ProductCards = props => {
  // ** Props
  const {
    store,
    products,
    dispatch,
    addToCart,
    activeView,
    getProducts,
    getCartItems,
    addToWishlist,
    deleteWishlistItem,
    setrefreshcount
  } = props

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getCartItems())
    dispatch(getProducts(store.params))
  }

    const [Inputval, setInputval] = useState("")
    const [IsLoading, setIsLoading] = useState(false)
  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getProducts(store.params))
  }
  

    const addCart = async (data, data2) => {
        setrefreshcount(false)
        setIsLoading(true)
        if (Inputval === String(0) || Inputval === "" || Inputval.length < 0) {
            Swal.fire({
                title: "Quantity cannot be Empty or 0",
                text: "Please Enter Quantity More than 0",
                icon: "warning"
            })
        }

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            ProductId: Number(data),
            OrganizationProductDetailsId: Number(data2),
            OrderQty: Inputval,
            Apikey2: localStorage.getItem("createcart"),
            UserId: Number(localStorage.getItem("createcartuserid"))

        }
       // console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/AddCartItems`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
              //  console.log(response)
                if (response === "Done") {
                    Swal.fire({
                        title: "Item Added",
                        text: "One Item added to card",
                        icon: "success"
                    })
                } else if (response === "Added") {
                    Swal.fire({
                        title: "Item Already Added",
                        text: "Item Qunatity already added",
                        icon: "error"
                    })
                } else {
                    Swal.fire({
                        title: "Something went wrong",
                        text: "Please try after sometime",
                        icon: "error"
                    })
                }
                setrefreshcount(true)
                setIsLoading(false)
                setInputval("")
            })

    }
   // console.log(products)
  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {
        const CartBtnTag = item.isInCart ? Link : 'button'

        return (
          <Card className='ecommerce-card' key={item.organizationProductDetailsId}>
            <div className='item-img text-center mx-auto'>
              <span onClick={() => tigger(item.cloudInterfactDisplaySectionId)}>
                <img className='img-fluid card-img-top' src={img2} alt={item.name} />
              </span>
            </div>
            <CardBody>
              <div className='item-wrapper'>
                <div className='item-rating'>
                  <ul className='unstyled-list list-inline'>
                        <li className='ratings-list-item me-25'>
                        <font size="4"><b>Lot No.</b>-  {item.productDetails.productName} </font>
                        </li>
                     
                  </ul>
                </div>
                
              </div>
              <h6 className='item-name mt-1'>
                <div className='item-cost'>
                  <h6 className='item-price'><font size="4">Price- ₹ <span style={{color:"rgb(240 51 51)"}}>{item.salesCost} </span></font></h6>
                </div>
                <span className='text-body mt-1'>
                <font size="4">  Thikness- {item.unit} </font>
                </span>
                <Link className='text-body mt-1' style={{PointerEvent:"none"}}>
                <font size="4"> Size- <span style={{color:"#7367f0"}}>{item.sku}</span> </font>
                </Link>
               {activeView !== "list" && (<font size="4"><span className='text-body mt-1'>
                <b> Quantity</b>-<span style={{color:"#7367f0"}}> {item.currentStock === "" || item.currentStock === null ? 0 : item.currentStock}</span>
                </span></font>)}
                <CardText tag='span' className='item-company mt-1'>
                 <b> Quantity</b>{' '}
                  <span style={{color:"#7367f0"}} className='company-name' >
                    {item.currentStock === "" || item.currentStock === null ? 0 : item.currentStock}
                  </span>
                </CardText>
              </h6>
                    <CardText className='item-description mt-1'><font size="4"> <b>GST-</b> {item.discountPercentage}</font></CardText>

                    <CardText className='quantity-title me-50' style={{ display: "flex", alignItem: "center", justifyContent: "center" }}><font size="4">Qty: </font>
                        <Input id='Qty' name='Qty'  onChange={(e) => setInputval(e.target.value)} placeholder='e.g: 1' />
                    </CardText>
            </CardBody>
                <div className='item-options text-center'>
                    <div className='item-wrapper' style={{  }}>
                        <div className='item-cost'>
                  <h4 className='item-price'>Rs.{item.salesCost}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}

                </div>
              </div>

                    {!IsLoading ? < Button
                        color='primary'
                        tag={CartBtnTag}
                        className='btn-cart move-cart'
                        onClick={() => addCart(item.productDetails.productId, item.organizationProductDetailsId)}
                    >
                        <ShoppingCart className='me-50' size={14} />
                        <span> Add To Cart</span> </Button> : <Button color='success' className='btn-cart move-cart' disabled>
                        <Spinner size='sm' type='grow' />
                        <span className='ms-50'>Please wait...</span>
                    </Button>}
                  
            </div>
          </Card>
        )
      })
    }
  }

  return (
      <div className={classnames({
          'grid-view': activeView === 'grid',
          'list-view': activeView === 'list'
      })}
    >
      {renderProducts()}
    </div>
  )
}

export default ProductCards
