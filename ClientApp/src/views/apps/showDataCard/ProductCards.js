// ** React Imports
import { Link } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { Star, ShoppingCart, Heart } from 'react-feather'
import "../../../@core/scss/base/pages/app-ecommerce.scss"
// Static Images
import img2 from '@src/assets/images/pages/Radharanip.png'
// ** Reactstrap Imports
import { Card, CardBody, CardText, Button, Badge } from 'reactstrap'
import Swal from 'sweetalert2'

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
    deleteWishlistItem
  } = props

  // ** Handle Move/Add to cart
  const handleCartBtn = (id, val) => {
    if (val === false) {
      dispatch(addToCart(id))
    }
    dispatch(getCartItems())
    dispatch(getProducts(store.params))
  }

  // ** Handle Wishlist item toggle
  const handleWishlistClick = (id, val) => {
    if (val) {
      dispatch(deleteWishlistItem(id))
    } else {
      dispatch(addToWishlist(id))
    }
    dispatch(getProducts(store.params))
  }

    const addCart = async (data) => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            Value: Number(sessionStorage.getItem("createcart")),
            OrderNo: Number(data),
            WebHeader: "Additem"

        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/AddCart`, {
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
                if (response > 0) {
                    Swal.fire({
                        title: "Item Added",
                        text: "One Item added to card",
                        icon: "success"
                    })
                }
            })

    }

  // ** Renders products
  const renderProducts = () => {
    if (products.length) {
      return products.map(item => {
        const CartBtnTag = item.isInCart ? Link : 'button'

        return (
          <Card className='ecommerce-card' key={item.cloudInterfactDisplaySectionId}>
            <div className='item-img text-center mx-auto'>
              <Link to={`/apps/ecommerce/product-detail/${item.slug}`}>
                <img className='img-fluid card-img-top' src={img2} alt={item.name} />
              </Link>
            </div>
            <CardBody>
              <div className='item-wrapper'>
                <div className='item-rating'>
                  <ul className='unstyled-list list-inline'>
                        <li className='ratings-list-item me-25'>
                        Lot No.-  {item.mainDesc}
                        </li>
                     
                  </ul>
                </div>
                <div className='item-cost'>
                  <h6 className='item-price'>Price- Rs.{item.value}</h6>
                </div>
              </div>
              <h6 className='item-name'>
                <Link className='text-body' to={`/apps/ecommerce/product-detail/${item.slug}`}>
                  Thikness- {item.urlimage1}
                </Link>
                <Link className='text-body' to={`/apps/ecommerce/product-detail/${item.slug}`}>
                 Size- {item.columRemarks}
                </Link>
                <Link className='text-body' to={`/apps/ecommerce/product-detail/${item.slug}`}>
                 Quantity- {item.urlimage2 === "" || item.urlimage2 === null ? 0 : item.urlimage2}
                </Link>
                <CardText tag='span' className='item-company'>
                  Quantity{' '}
                  <a className='company-name' href='/' onClick={e => e.preventDefault()}>
                    {item.urlimage2 === "" || item.urlimage2 === null ? 0 : item.urlimage2}
                  </a>
                </CardText>
              </h6>
              <CardText className='item-description'>{item.description}</CardText>
            </CardBody>
            <div className='item-options text-center'>
              <div className='item-wrapper'>
                <div className='item-cost'>
                  <h4 className='item-price'>Rs.{item.value}</h4>
                  {item.hasFreeShipping ? (
                    <CardText className='shipping'>
                      <Badge color='light-success'>Free Shipping</Badge>
                    </CardText>
                  ) : null}
                </div>
              </div>
              <Button
                color='primary'
                tag={CartBtnTag}
                className='btn-cart move-cart'
                onClick={() => addCart(item.cloudInterfactDisplaySectionId)}
              >
                <ShoppingCart className='me-50' size={14} />
                <span>{item.isInCart ? 'View In Cart' : 'Add To Cart'}</span>
              </Button>
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
