// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from '../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
    const [Data, setData] = useState([])

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
  // ** Get products
    useEffect(() => {
        getSubmitData()
    dispatch(
      getProducts({
        q: '',
        sortBy: 'featured',
        perPage: 9,
        page: 1
      })
    )
     
  }, [dispatch, window.location.search.substring(1)])
  

  return (
    <Fragment>
      {/*<Breadcrumbs title='Shop' data={[{ title: 'eCommerce' }, { title: 'Shop' }]} />*/}
      <Products
        store={Data}
        activeView = { activeView }
        setActiveView = { setActiveView }
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        setSidebarOpen = {setSidebarOpen}
        dispatch = {dispatch}
        addToCart = {addToCart}
        getCartItems = {getCartItems}
        addToWishlist = {addToWishlist}
        deleteCartItem = {deleteCartItem}
        deleteWishlistItem = {deleteWishlistItem}
      />
      <Sidebar sidebarOpen={sidebarOpen} />
      </Fragment>

     /* */
  )
}
export default Shop
