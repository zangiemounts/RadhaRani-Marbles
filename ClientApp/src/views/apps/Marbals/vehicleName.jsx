/* eslint-disable no-confusing-arrow */
/* eslint-disable multiline-ternary */
/* eslint-disable implicit-arrow-linebreak */
// ** Custom Components
import { Fragment, useState, useEffect } from "react"
import { Row, Col, Button, Table, Input } from "reactstrap"
import { Plus, ArrowLeft } from "react-feather"
import AddVechileSidebar from "./addVechileSidebar"
// ** Third Party Components
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import AddVechileTripSidebar from "./addVechileTripSidebar"

const CustomHeader = ({
  perpage,
  setperpage,
  onSearchText,
  setSearchText,
  openTaskSidebar,
  openTaskSidebarTrip,
  setdataRefresh,
  handleTaskSidebar,
  handleTaskSidebarTrip
}) => {
  return (
    <div className="invoice-list-table-header w-100 py-2">
      <Row>
        <Col lg="4" className="d-flex align-items-center px-0 px-lg-1">
          <div className="d-flex align-items-center me-2">
            <label htmlFor="rows-per-page">Show</label>
            <Input
              type="select"
              id="rows-per-page"
              value={perpage}
              onChange={(e) => setperpage(e.target.value)}
              className="form-control ms-50 pe-3"
            >
              <option value="10" disabled hidden>
                10
              </option>
              <option value="20">20</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </Input>
          </div>
          <Button color="success" onClick={() => handleTaskSidebar()}>
            {" "}
            <Plus size={20} /> Add Vehicle
          </Button>
        </Col>
        <Col lg="2" className="d-flex align-items-center px-0 px-lg-1">
          <Button
            color="dark"
            onClick={() => (window.location.pathname = "/vehicle")}
          >
            {" "}
            <ArrowLeft size={20} /> Go Back
          </Button>
        </Col>
        <Col
          lg="6"
          className="actions-right d-flex align-items-center justify-content-lg-end flex-lg-nowrap flex-wrap mt-lg-0 mt-1 pe-lg-1 p-0"
        >
          <div className="d-flex align-items-center">
            <label htmlFor="search-invoice">Search</label>
            <Input
              id="search-invoice"
              className="ms-50 me-2 w-100"
              type="text"
              value={onSearchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Contractor name or Vehicle No."
            />
          </div>
          <Button
            color="warning"
            onClick={() => (window.location.pathname = "/vehicleContractor")}
          >
            {" "}
            <Plus size={20} /> Add Contractor
          </Button>
        </Col>
      </Row>
      <AddVechileSidebar
        open={openTaskSidebar}
        handleTaskSidebar={handleTaskSidebar}
        usertypes="sales"
        setdataRefresh={setdataRefresh}
      />
      <AddVechileTripSidebar
        open={openTaskSidebarTrip}
        handleTaskSidebar={handleTaskSidebarTrip}
        usertypes="sales"
        setdataRefresh={setdataRefresh}
      />
    </div>
  )
}

const VehicleName = () => {
  const [onSearchText, setSearchText] = useState("")
  const [currentitem, setcurrentitem] = useState([])
  const [perpage, setperpage] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
  const [openTaskSidebarTrip, setOpenTaskSidebarTrip] = useState(false)
  const [dataRefresh, setdataRefresh] = useState(false)

  const getData = async () => {
    try {
      const sendData = {
        CatgId: Number(63),
        GroupOrderdata: Number(localStorage.getItem("orgId"))
      }
      // console.log(sendData)
      await fetch(
        `${process.env.REACT_APP_API_LINK}api/Radharani/GetTruckNew`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify(sendData)
        }
      )
        .then((response) => response.json())
        .then((response) => {
          try {
            // console.log("Vechile_Data", response)

            setcurrentitem(response)
          } catch (error) {
            console.log("eee")
          }
        })
        .then((error) => {})
    } catch (error) {
      console.log("Error")
    }
    }
  
  const filteredData = currentitem.filter((item) =>
    item !== null
      ? item.catgType.toLowerCase().includes(onSearchText.toLowerCase()) ||
        item.catgDesc.toLowerCase().includes(onSearchText.toLowerCase()) ||
        item?.contractordata?.catgType.toLowerCase().includes(onSearchText.toLowerCase()) ||
        item?.contractordata?.catgDesc.toLowerCase().includes(onSearchText.toLowerCase()) 
      : null
  )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perpage,
    currentPage * perpage
  )

  useEffect(() => {
    getData()
  }, [dataRefresh])

  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)
  const handleTaskSidebarTrip = () => setOpenTaskSidebarTrip(!openTaskSidebarTrip)

  const CustomPagination = () => {
    const count = Math.ceil(filteredData.length / perpage)

    const pageButtons = []

      for (let i = 1; i <= count; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`btn-pagination ${currentPage === i ? "active" : ""}`}
          onClick={() => setcurrentitem(i)}
        >
          {i}
        </button>
      )
    }

    const handlePagination = (page) => {
      setCurrentPage(page.selected + 1)
    }
    return (
      <ReactPaginate
        nextLabel=""
        breakLabel="..."
        previousLabel=""
        pageCount={count || 1}
        activeClassName="active"
        breakClassName="page-item"
        pageClassName={"page-item"}
        breakLinkClassName="page-link"
        nextLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousLinkClassName={"page-link"}
        previousClassName={"page-item prev"}
        onPageChange={(page) => handlePagination(page)}
        forcePage={currentPage !== 0 ? currentPage - 1 : 0}
        containerClassName={"pagination react-paginate justify-content-end p-1"}
      />
    )
  }

  const data = [
    {
      name: "Contractor Name",
      sortable: true,
      sortField: "id",
      minWidth: "220px",
      cell: (row) => (
        <span>
          {row?.contractordata !== null ? row?.contractordata.catgType : "No Contractor Name enter"}
        </span>
      )
    },
    {
      name: "Vehicle No",
      sortable: true,
      minWidth: "350px",
      sortField: "client.name",
      cell: (row) => {
        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <small className="text-truncate mb-0">{row.catgDesc}</small>
            </div>
          </div>
        )
      }
    }
  ]

  return (
    <div className="invoice-list-dataTable react-dataTable">
      <DataTable
        noHeader
        pagination
        sortServer
        paginationServer
        subHeader={true}
        columns={data}
        responsive={true}
        data={paginatedData}
        className="react-dataTable"
        defaultSortField="invoiceId"
        paginationDefaultPage={currentPage}
        paginationComponent={CustomPagination}
        subHeaderComponent={
          <CustomHeader
            perpage={perpage}
            setperpage={setperpage}
            onSearchText={onSearchText}
            setSearchText={setSearchText}
            openTaskSidebar={openTaskSidebar}
            setOpenTaskSidebar={setOpenTaskSidebar}
            openTaskSidebarTrip={openTaskSidebarTrip}
            setOpenTaskSidebarTrip={setOpenTaskSidebarTrip}
            setdataRefresh={setdataRefresh}
            handleTaskSidebar={handleTaskSidebar}
            handleTaskSidebarTrip={handleTaskSidebarTrip}
          />
        }
      />
    </div>
  )
}

export default VehicleName
