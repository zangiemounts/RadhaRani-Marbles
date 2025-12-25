// ** React Imports
import { Fragment, useState, useEffect } from 'react'

// ** Shop Components
import Sidebar from './Sidebar'
import Products from './Products'

// ** Custom Components
import Breadcrumbs from '@components/breadcrumbs'

// ** Store & Actions
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, getProducts, getCartItems, addToWishlist, deleteCartItem, deleteWishlistItem } from '../../store'

// ** Styles
import '@styles/react/apps/app-ecommerce.scss'

const Shop = () => {
  // ** States
  const [activeView, setActiveView] = useState('grid')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [refreshcount, setrefreshcount] = useState(false)
  const [onSearchText, setSearchText] = useState("")


  // ** Vars
  const dispatch = useDispatch()
  const store = useSelector(state => state.ecommerce)
    const [Data, setData] = useState([])

    const getSubmitData = async () => {
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
            .then(response => response.json())
            .then(
                data => {
                   // console.log(data)
                    if (window.location.search.substring(1) > 1) {
                        const setdata = data.filter(item => item.organizationProductDetailsId === Number(window.location.search.substring(1)))                        
                        setData(setdata)

                    } else {
                        setData(data)
                    }
                    
                   
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
        setrefreshcount={setrefreshcount}
        refreshcount={refreshcount}
        setSidebarOpen = {setSidebarOpen}
        setSearchText={setSearchText}
        onSearchText={onSearchText}
        dispatch = {dispatch}
        addToCart = {addToCart}
        getCartItems = {getCartItems}
        addToWishlist = {addToWishlist}
        deleteCartItem = {deleteCartItem}
        deleteWishlistItem = {deleteWishlistItem}
      />
      {/*<Sidebar sidebarOpen={sidebarOpen} />*/}
      </Fragment>

     /* */
  )
}
export default Shop
