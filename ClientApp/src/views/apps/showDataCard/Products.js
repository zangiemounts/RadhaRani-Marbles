// ** React Imports
import { Fragment, useState } from 'react'

// ** Product components
import ProductCards from './ProductCards'
import ProductsHeader from './ProductsHeader'
import ProductsSearchbar from './ProductsSearchbar'

// ** Third Party Components
import classnames from 'classnames'

// ** Reactstrap Imports
import ReactPaginate from "react-paginate"
const ProductsPage = props => {
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
    deleteWishlistItem
  } = props
    const [onSearchText, setSearchText] = useState("")
    const [perpage, setperpage] = useState(3)
    const [currentPage, setCurrentPage] = useState(1)
  // ** Handles pagination
  const filteredData = store.filter(
      (item) => item.mainDesc.toLowerCase().includes(onSearchText.toLowerCase()) || item.urlimage2.toLowerCase().includes(onSearchText.toLowerCase())
             || item.urlimage1.toLowerCase().includes(onSearchText.toLowerCase()) || item.columRemarks.toLowerCase().includes(onSearchText.toLowerCase())
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
                className={`btn-pagination ${currentPage === i ? "active" : ""}`}
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
    <div className='content-detached content-right'>
      <div className='content-body'>
        <ProductsHeader
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
        <ProductsSearchbar dispatch={dispatch} setSearchText={setSearchText} store={paginatedData} />
        {store.length ? (
          <Fragment>
            <ProductCards
              store={paginatedData}
              dispatch={dispatch}
              addToCart={addToCart}
              activeView={activeView}
              products={paginatedData}
              getProducts={getProducts}
              getCartItems={getCartItems}
              addToWishlist={addToWishlist}
              deleteCartItem={deleteCartItem}
              deleteWishlistItem={deleteWishlistItem}
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
            containerClassName={'d-flex justify-content-center ecommerce-shop-pagination mt-2'}
                      />
          </Fragment>
        ) : (
          <div className='d-flex justify-content-center mt-2'>
            <p>No Results</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductsPage
