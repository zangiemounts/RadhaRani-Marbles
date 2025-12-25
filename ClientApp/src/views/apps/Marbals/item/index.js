// ** React Imports
import { Fragment, useState, useEffect } from "react"

// ** Store & Actions
import { useDispatch } from "react-redux"
import {
  addToCart,
  getProducts,
  getCartItems,
  addToWishlist,
  deleteCartItem,
  deleteWishlistItem
} from "../../store"

// ** Styles
import "@styles/react/apps/app-ecommerce.scss"
import Items from "./Items"

const Item = () => {
  // ** States
  const [activeView, setActiveView] = useState("grid")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [apiRefresh, setapiRefresh] = useState(false)
  // ** Vars
  const dispatch = useDispatch()
  const [Data, setData] = useState([])

  const getSubmitData = async () => {
    try {
      const OrgId = Number(localStorage.getItem("orgId"))
      if (!OrgId) {
        throw new Error("Invalid OrgId")
      }

      setIsLoading(true)

      const sendData = { OrgId }

      const response = await fetch(
        `${process.env.REACT_APP_API_LINK}api/Radharani/Getproduct`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(sendData)
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch data")
      }

      const data = await response.json()
      setData(data)
    } catch (error) {
      console.error("Error fetching data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getSubmitData()
  }, [apiRefresh])

  return (
    <Fragment>
      <Items
        store={Data}
        activeView={activeView}
        setActiveView={setActiveView}
        getProducts={getProducts}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        dispatch={dispatch}
        isLoading={isLoading}
        addToCart={addToCart}
        getCartItems={getCartItems}
        addToWishlist={addToWishlist}
        deleteCartItem={deleteCartItem}
        deleteWishlistItem={deleteWishlistItem}
        setapiRefresh={setapiRefresh}
        apiRefresh={apiRefresh}
      />
    </Fragment>
  )
}

export default Item
