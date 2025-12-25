import React from "react"
import ReactPaginate from "react-paginate"

function DynamicPagination({ ...props }) {
    const page = Math.ceil(props.items.length / props.itemsPerPage)
    const pageButtons = []

    for (let i = 1; i <= page; i++) {
        pageButtons.push(
            <button
                key={i}
                className={`btn-pagination ${props.currentPage === i ? "active" : ""}`}
                onClick={() => props.setcurrentitem(i)}
            >
                {i}
            </button>
        )
    }
    const handlePagination = page => {
        props.setcurrentitem(page.selected + 1)
    }

    return (
        <ReactPaginate
            previousLabel={''}
            nextLabel={''}
            pageCount={page || 1}
            activeClassName='active'
            forcePage={props.currentPage !== 0 ? props.currentPage - 1 : 0}
            onPageChange={page => handlePagination(page)}
            pageClassName={'page-item'}
            nextLinkClassName={'page-link'}
            nextClassName={'page-item next'}
            previousClassName={'page-item prev'}
            previousLinkClassName={'page-link'}
            pageLinkClassName={'page-link'}
            containerClassName={'pagination react-paginate justify-content-end my-2 pe-1'}
        />
    )
}

export default DynamicPagination
