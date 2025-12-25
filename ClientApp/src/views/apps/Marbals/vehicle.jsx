/* eslint-disable no-confusing-arrow */
/* eslint-disable multiline-ternary */
/* eslint-disable implicit-arrow-linebreak */

// ** Custom Components
import { useState, useEffect } from "react"
import { Row, Col, Button, Input, Spinner } from "reactstrap"
import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"
import { Plus, Check } from "react-feather"
import AddVechileSidebar from "./addVechileSidebar"
// ** Third Party Components
import ReactPaginate from "react-paginate"
import DataTable from "react-data-table-component"
import AddVechileTripSidebar from "./addVechileTripSidebar"
import Avatar from "@components/avatar"
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
              <option value="20" disabled hidden>
                20
              </option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
            </Input>
          </div>
          <Button color="success" onClick={() => handleTaskSidebarTrip()}>
            {" "}
            <Plus size={20} /> Add Trip
          </Button>
        </Col>
        <Col lg="2" className="d-flex align-items-center px-0 px-lg-1">
          <Button
            color="warning"
            onClick={() => (window.location.pathname = "/vehicleName")}
          >
            {" "}
            <Plus size={20} /> Add Vehicle
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
            color="success"
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

const Vehicle = () => {
  const [onSearchText, setSearchText] = useState("")
  const [currentitem, setcurrentitem] = useState([])
  const [perpage, setperpage] = useState(20)
  const [currentPage, setCurrentPage] = useState(1)
  const [IsDataloading, setIsDataloading] = useState(true)
  const [openTaskSidebar, setOpenTaskSidebar] = useState(false)
  const [openTaskSidebarTrip, setOpenTaskSidebarTrip] = useState(false)
  const [dataRefresh, setdataRefresh] = useState(false)
  const MySwal = withReactContent(Swal)
  const getData = async () => {
    setIsDataloading(true)
    try {
      const sendData = {
        CatgId: Number(66),
        GroupOrderdata: Number(localStorage.getItem("orgId"))
      }
      // console.log(sendData)
      await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetTrip`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      })
        .then((response) => response.json())
        .then((response) => {
          try {
            //console.log("Vechile_Data", response)
            setIsDataloading(false)
            setcurrentitem(response)
          } catch (error) {
            //console.log("eee")
            setIsDataloading(false)
          }
        })
        .then((error) => {})
    } catch (error) {
      console.log("Error", error)
      setIsDataloading(false)
    }
  }

  /*Paid Trip*/
  const PaidTrip = (catgid) => {
    MySwal.fire({
      title: "Are You Sure You Want To Mark Paid Trip ?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-danger ms-1"
      },
      buttonsStyling: false,
      showClass: {
        popup: "animate__animated animate__flipInX"
      }
    }).then(async function (result) {
      if (result.value) {
        const sendData = {
          CatgTypeId: Number(catgid)
        }
        //console.log("sendData", sendData)
        await fetch(
          `${process.env.REACT_APP_API_LINK}api/Radharani/DeleteTruck`,
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
          .then((data) => {
            //console.log("Vehicle_delete", data)
            if (data === "Done") {
              Swal.fire({
                title: "Trip Paid.",
                text: "Trip Paid successfull",
                icon: "success"
              })
            } else {
              Swal.fire({
                title: "Something went wrong.",
                text: "Oops!!! Trip paid Not assigned.",
                icon: "error"
              })
            }
            getData()
          })
      }
    })
  }

  /*Bill Trip*/
  const BillRecived = (catgid) => {
    MySwal.fire({
      title: "Are You Sure You Want To Mark Bill Recived ?",
      text: "",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-outline-danger ms-1"
      },
      buttonsStyling: false,
      showClass: {
        popup: "animate__animated animate__flipInX"
      }
    }).then(async function (result) {
      if (result.value) {
        const sendData = {
          CatgTypeId: Number(catgid),
          NavFont: "Yes",
          Catg:{
              CatgDesc:"Dummy",
              CatgType:"Dummy",
              CatgName:"Dummy"
           },
          CatgDesc:"Dummy",
          CatgType:"Dummy"
        }
        //console.log("sendData", sendData)
        await fetch(
          `${process.env.REACT_APP_API_LINK}api/Radharani/BillRecieved`,
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
          .then((data) => {
            //console.log("Vehicle_delete", data)
            if (data === "Done") {
              Swal.fire({
                title: "Bill Recevied.",
                text: "Bill Recevied successfull",
                icon: "success"
              })
            } else {
              Swal.fire({
                title: "Something went wrong.",
                text: "Oops!!! Bill Recevied Not assigned.",
                icon: "error"
              })
            }
            getData()
          })
      }
    })
  }

  const filteredData = currentitem.filter((item) =>
    item !== null
      ? item?.vehicleName?.catgType
          .toLowerCase()
          .includes(onSearchText.toLowerCase()) ||
        item?.vehicleName?.catgDesc
          .toLowerCase()
          .includes(onSearchText.toLowerCase()) ||
        item?.contractordata?.catgType
          .toLowerCase()
          .includes(onSearchText.toLowerCase()) ||
        item?.contractordata?.catgDesc
          .toLowerCase()
          .includes(onSearchText.toLowerCase())
      : null
  )

  const paginatedData = filteredData.slice(
    (currentPage - 1) * perpage,
    currentPage * perpage
  )

  useEffect(() => {
    getData()
  }, [dataRefresh])

  if (IsDataloading) {
    return (
      <div className="d-flex align-items-center justify-content-center p-5">
        <Spinner type="grow" color="success" />
        <h2 className="ms-1">Please wait while data is loading...</h2>
      </div>
    )
  }

  const handleTaskSidebar = () => setOpenTaskSidebar(!openTaskSidebar)
  const handleTaskSidebarTrip = () =>
    setOpenTaskSidebarTrip(!openTaskSidebarTrip)

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

  const renderContactor = (row) => {
    const stateNum = Math.floor(Math.random() * 6),
      states = [
        "light-success",
        "light-danger",
        "light-warning",
        "light-info",
        "light-primary",
        "light-secondary"
      ],
      color = states[stateNum]

    // Check if contractor description is available, fallback to "User"
    const contractorName = row?.catgDesc?.trim() || "User"

    return (
      <Avatar
        color={color}
        className="me-50"
        content={contractorName}
        initials
      />
    )
  }

  const data = [
    {
      name: "Contractor Name",
      sortable: false,
      sortField: "id",
      minWidth: "220px",
      cell: (row) => (
        <span>
          {renderContactor(row.contractordata)}
          {row?.contractordata && row?.contractordata.catgType
            ? row?.contractordata.catgType
            : "No Contractor Name entered"}
        </span>
      )
    },
    {
      name: "Vehicle No",
      sortable: false,
      minWidth: "180px",
      sortField: "client.name",
      cell: (row) => {
        const vehicleDesc = row?.vehicleName?.catgDesc
        const hasVehicle = vehicleDesc && vehicleDesc.trim() !== ""

        return (
          <div className="d-flex justify-content-left align-items-center">
            <div className="d-flex flex-column">
              <small
                className={`text-truncate mb-0 ${
                  hasVehicle ? "text-dark" : "text-danger"
                }`}
              >
                {hasVehicle ? vehicleDesc : "No Vehicle No. selected"}
              </small>
            </div>
          </div>
        )
      }
    },
    {
      name: "Trip Completed",
      minWidth: "210px",
      cell: (row) => (
        <Button
          color="warning"
          size="sm"
          onClick={() => PaidTrip(row.catgTypeId)}
        >
          <Check size={20} />
          Trip Completed
        </Button>
      )
    },
    {
      name: "Bill Received",
      minWidth: "210px",
      cell: (row) =>
        row.bill_Received === "Yes" ? (
          <Check size={20} color="green" />
        ) : (
          <Button
            color="info"
            size="sm"
            onClick={() => BillRecived(row.catgTypeId)}
          >
            <Check size={20} />
            Bill Received
          </Button>
        )
    },
    {
      name: "Material Report",
      sortable: false,
      minWidth: "350px",
      sortField: "client.name",
      cell: (row) => (
        <span className="text-truncate mb-0">
          {row?.remarks || "No Material report"}
        </span>
      )
    },
    {
      name: "Bill Status",
      sortable: false,
      minWidth: "50px",
      sortField: "total",
      cell: (row) => <span>{row?.searchRemarks || "No Bill status"}</span>
    },
    {
      name: "Rent",
      minWidth: "50px",
      cell: (row) => <span>{row?.domainDesc || "No Amount"}</span>
    },
    {
      name: "Estimate Id",
      minWidth: "210px",
      cell: (row) => (
        <span>#E{row?.measurmentNO?.orderNo || "No Mesurement"}</span>
      )
    }
  ]

  return (
    <div className="invoice-list-dataTable react-dataTable">
      {paginatedData.length < 0 ? (
        <div className="d-flex item-center p-5">
          <Spinner color="success" type="grow" />
          <h1 className="ms-1">Please wait while data loading...</h1>{" "}
        </div>
      ) : (
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
      )}
    </div>
  )
}

export default Vehicle
