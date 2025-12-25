// ** React Imports
import { Fragment, useState } from 'react'

// ** Item components
import ItemCards from './ItemCards'
import ItemsHeader from './ItemsHeader'
import ItemsSearchbar from './ItemsSearchbar'

import ReactPaginate from 'react-paginate'
// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import { Spinner } from 'reactstrap'

const Items = props => {
  // ** Props
  const {
    store,
    dispatch,
    addToCart,
    activeView,
    sidebarOpen,
    getProducts,
    getCartItems,
    addToWishlist,
    setActiveView,
    deleteCartItem,
    setSidebarOpen,
    isLoading,
    deleteWishlistItem,
    setapiRefresh,
    apiRefresh
  } = props
  const [onSearchText, setSearchText] = useState('')
  const [perpage, setperpage] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)

  // ** Handles pagination
  const filteredData = store.filter(
    item => item.productDetails.productName
        .toLowerCase()
        .includes(onSearchText.toLowerCase()) ||
      String(item.unit).toLowerCase().includes(onSearchText.toLowerCase()) ||
      String(item.currentStock)
        .toLowerCase()
        .includes(onSearchText.toLowerCase()) ||
      String(item.sku).toLowerCase().includes(onSearchText.toLowerCase())
  )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perpage,
    currentPage * perpage
  )

  // ** Render pages
  const page = Math.ceil(filteredData.length / perpage)

  const pageButtons = []

  for (let i = 1; i <= page; i++) {
    pageButtons.push(
      <button
        key={i}
        className={`btn-pagination ${currentPage === i ? 'active' : ''}`}
        onClick={() => setCurrentPage(i)}
      >
        {i}
      </button>
    )
  }

  // ** handle next page click
  const handlePagination = page => {
    setCurrentPage(page.selected + 1)
  }

  return (
    <div className='content-detached'>
      <div className='content-body'>
        <ItemsHeader
          store={paginatedData}
          dispatch={dispatch}
          activeView={activeView}
          getProducts={getProducts}
          setActiveView={setActiveView}
          setSidebarOpen={setSidebarOpen}
        />
        <div
          className={classnames('body-content-overlay', {
            show: sidebarOpen
          })}
          onClick={() => setSidebarOpen(false)}
        ></div>
        <ItemsSearchbar
          dispatch={dispatch}
          setSearchText={setSearchText}
          store={paginatedData}
        />
        {isLoading ? (
          <div className='d-flex align-items-center justify-content-center p-5'>
            <Spinner  type="grow" color='success' />
            <h2 className='ms-1'>Please wait while data is loading...</h2>
          </div>
        ) : paginatedData.length > 0 ? (
          <Fragment>
            <ItemCards
              store={paginatedData}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={paginatedData}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              setSidebarOpen={setSidebarOpen}
              deleteWishlistItem={deleteWishlistItem}
              setapiRefresh={setapiRefresh}
              apiRefresh={apiRefresh}
            />

            <ReactPaginate
              previousLabel={''}
              nextLabel={''}
              pageCount={page || 1}
              activeClassName='active'
              forcePage={currentPage !== 0 ? currentPage - 1 : 0}
              onPageChange={page => handlePagination(page)}
              pageClassName={'page-item'}
              nextLinkClassName={'page-link'}
              nextClassName={'page-item next'}
              previousClassName={'page-item prev'}
              previousLinkClassName={'page-link'}
              pageLinkClassName={'page-link'}
              containerClassName={
                'd-flex justify-content-center ecommerce-shop-pagination mt-2'
              }
            />
          </Fragment>
        ) : (
          <div className='d-flex align-items-center justify-content-center p-5'>
            <h2>No data found.</h2>
          </div>
        )}
      </div>
    </div>
  )
}

export default Items
