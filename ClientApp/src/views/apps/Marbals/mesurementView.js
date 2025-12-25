// ** React Imports
import { Fragment, useEffect, useState } from "react"
import { Row, Col, Card, CardBody, CardText, Table, Button } from "reactstrap"
import { Link, useNavigate } from "react-router-dom"

// ** Styles
import "react-slidedown/lib/slidedown.css"
import "@styles/react/libs/react-select/_react-select.scss"
import "@styles/react/libs/flatpickr/flatpickr.scss"
import "@styles/base/pages/app-invoice.scss"
import MesurementLessView from "./mesurementLessView"
import { Printer } from "react-feather"
import { toast } from "react-hot-toast"
import MesurementSum from "./mesurementSum"
const MesurementView = () => {
  const navigate = useNavigate()
  const [datarefresh, setdatarefresh] = useState(false)
  const [meurementSumRefresh, setmeurementSumRefresh] = useState(false)
  const [userdata, setuserdata] = useState([])
  const [Data, setData] = useState([])
  const [groupedData, setGroupedData] = useState({})

  const getData = async (id) => {
  const sendData = {
    OrgId: Number(localStorage.getItem("orgId")),
    UserId: Number(localStorage.getItem("urole") === "7" ? localStorage.getItem("userIdA") : localStorage.getItem("userId")),
    ActiveStatus: "S",
    WebHeader: "MeasurmentData",
    Value: Number(sessionStorage.getItem("MesurementView"))
  }
  
  await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/MeasurmentGet`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(sendData)
  })
    .then((response) => response.json())
    .then((data) => {
      /*console.log("Mesurement Data", data)*/
      if (data.length === 0) {
        setData([])
      } else {
        setData(data)
      }
    })
}


  const getuserData = async (id) => {
    try {
      const sendData = {
        CloudInterfactDisplaySectionId: Number(
          sessionStorage.getItem("MesurementView")
        )
      }
      //console.log(sendData)
      await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/ViewMData`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(sendData)
      })
        .then((response) => response.json())
        .then((data) => {
          /*console.log("Mes: ", data)*/
          setuserdata(data)
        })
    } catch (error) {
      console.log("Error", error)
      toast.error("Oops!! Something went worng. Please try after sometime", {
        position: "top-center"
      })
      setTimeout(() => {
        navigate("/mesurementData")
      }, 1800)
    }
  }

  useEffect(() => {
    getData()
  }, [datarefresh])

  useEffect(() => {
    localStorage.setItem(
      "printmesuremnet",
      sessionStorage.getItem("MesurementView")
    )
    getuserData()
  }, [])

  useEffect(() => {
  if (Data.length > 0) {
    const grouped = Data.reduce((acc, current) => {
      const productName = current?.urlimage1
      if (productName) {
        const normalizedProductName = productName.trim().toLowerCase()
        if (!acc[normalizedProductName]) {
          acc[normalizedProductName] = { count: 0, sum: 0 }
        }
        acc[normalizedProductName].count += 1
        acc[normalizedProductName].sum += current?.vat || 0
      }
      return acc
    }, {})
    
    setGroupedData(grouped)
  }
}, [Data])  // This effect will run when Data changes


  const { createdOn } = userdata
  const displayDate = createdOn ? new Date(createdOn) : new Date()
  const formattedDate = `${displayDate.getDate()}-${
    displayDate.getMonth() + 1
  }-${displayDate.getFullYear()}`


  return (
    <Fragment>
      <Card className="invoice-preview-card">
        <CardBody className="invoice-padding pb-0">
          {/* Header */}
          <div className="d-flex justify-content-between flex-md-row flex-column invoice-spacing mt-0">
            <div>
              <div className="logo-wrapper">
                <h2 className="text-primary invoice-logo mt-2">Measurement</h2>
              </div>
            </div>
            <div className="mt-md-0 mt-2">
              <h4 className="invoice-title">
                Measurement Id:{" "}
                <span className="invoice-number">
                  #M{`${userdata?.orderNo}`}
                </span>
              </h4>
              <div className="invoice-date-wrapper d-flex mt-1">
                <p className="invoice-date-title">Date Issued:</p>
                <p
                  className="invoice-date fw-bold"
                  style={{ marginLeft: "10px" }}
                >
                  {formattedDate}
                </p>
              </div>
              <div className="invoice-date-wrapper d-flex">
                <p className="invoice-date-title p-0">Truck No:</p>
                <p
                  className="invoice-date fw-bold"
                  style={{ marginLeft: "10px" }}
                >
                  {userdata.truckNumber?.catgDesc || "Not selected"}
                </p>
              </div>
            </div>
          </div>
          {/* /Header */}
        </CardBody>

        <hr className="invoice-spacing" />

        {/* Address and Contact */}
        <CardBody className="invoice-padding pt-0">
          <Row className="invoice-spacing">
            <Col className="p-0" xl="8" style={{ marginLeft: "10px" }}>
              <h6 className="mb-25"></h6>
              <b>
                {" "}
                <CardText className="mb-25">
                  Name of the party:{" "}
                  {`${userdata.userData?.firstName} ${userdata.userData?.lastName}`}
                </CardText>
                <CardText className="mb-25">
                  Address:{" "}
                  {`${userdata.userData?.address1 || "Jankapuri"} ${
                    userdata.userData?.address2 || "Delhi"
                  } ${userdata.userData?.pincode || "11000"} `}
                </CardText>
                <CardText className="mb-0">
                  Lot No:{" "}
                                  {userdata?.bill?.lotNUmber?.length > 0 &&
                                      userdata.bill.lotNUmber.map((data, index) => (
                                          <span key={index}>
                                              {index > 0 && ', '}
                                              {data.product.productName}
                                          </span>
                                      ))
                                  }
                </CardText>
              </b>
            </Col>
            <Col className="p-0 mt-xl-0 mt-2" xl="4"></Col>
          </Row>
        </CardBody>

        <Table responsive>
          <thead>
            <tr>
              <th
                className="py-1"
                style={{ border: "1px solid black", textAlign: "center" }}
              >
                Slab
              </th>
              <th
                className="py-1 ps-0"
                style={{ border: "1px solid black", textAlign: "center" }}
              >
                Lot No.
              </th>
              <th
                className="py-1"
                style={{ border: "1px solid black", textAlign: "center" }}
              >
                Size
              </th>
              <th
                className="py-1"
                style={{ border: "1px solid black", textAlign: "center" }}
              >
                Less
              </th>
              <th
                className="py-1"
                style={{ border: "1px solid black", textAlign: "center" }}
              >
                Sqft
              </th>
            </tr>
          </thead>
          <tbody>
            {Data.length > 0 ? (
              Data.map((data, index) => (
                <tr key={index}>
                  <td
                    className="py-1"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <p className="card-text fw-bold mb-25">
                      {data?.domainDesc}
                    </p>
                  </td>
                  <td
                    className="py-1 ps-0"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <span className="fw-bold">
                      {data.urlimage1 || "No lot No"}
                    </span>
                  </td>
                  <td
                    className="py-1"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <span className="fw-bold p-1">{data.workFlowId}</span>
                    <span className="fw-bold p-1">X</span>
                    <span className="fw-bold p-1">{data.insuranceId}</span>
                  </td>
                  <td className="py-1" style={{ border: "1px solid black" }}>
                    <MesurementLessView
                      setdatarefresh={setdatarefresh}
                      value={data.cloudInterfactDisplaySectionId}
                    />
                    {/*<span className='fw-bold'>$1,800.00</span>*/}
                  </td>
                  <td
                    className="py-1"
                    style={{ border: "1px solid black", textAlign: "center" }}
                  >
                    <span className="fw-bold">
                      {data.vat !== null ? (data?.vat).toFixed(2) : null}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <h2>No Data Found</h2>
            )}
          </tbody>
        </Table>

        <CardBody className="invoice-padding pb-0">
          <Row className="invoice-sales-total-wrapper">
            <Col className="mt-md-0 mt-3" md="6" order={{ md: 1, lg: 2 }}></Col>
            <Col
              className="d-flex justify-content-end"
              md="6"
              order={{ md: 2, lg: 1 }}
            >
              <div className="invoice-total">
                              {userdata?.bill?.lotNUmber?.length > 0 ? (
                                  userdata.bill.lotNUmber.map((data, index) => {
                                      const productName = data?.product?.productName

                                      if (!productName) {
                                          return null // Skip this item if productName is undefined
                                      }

                                      const normalizedProductName = productName.trim().toLowerCase()
                                      const groupedDataForProduct = groupedData[normalizedProductName]

                                      // Make sure groupedDataForProduct exists before proceeding
                                      if (!groupedDataForProduct) {
                                          return <p key={index}>No grouped data for {productName}</p>
                                      }

                                      const count = groupedDataForProduct?.count

                                      return (
                                          <Fragment key={index}>
                                              {count !== undefined ? (
                                                  <MesurementSum
                                                      meurementSumRefresh={meurementSumRefresh}
                                                      datarefresh={datarefresh}
                                                      UrlImage1={productName}
                                                      counttt={count}
                                                      sumtt={groupedDataForProduct?.sum}
                                                  />
                                              ) : (
                                                  <p>No data available for {productName}</p>
                                              )}
                                          </Fragment>
                                      )
                                  })
                              ) : (
                                  <p>No Lot Numbers Found</p>
                              )}

              </div>
            </Col>
          </Row>
        </CardBody>
        <hr className="invoice-spacing" />
        {/* Invoice Note */}
        <CardBody className="invoice-padding pt-0">
          <Row>
            <Col sm="4"></Col>
            <Col sm="4"></Col>
            <Col sm="4">
              <Button
                color="secondary"
                tag={Link}
                to={`/mesurementPrint`}
                target="_blank"
                block
                className="mb-75"
              >
                <Printer size={20} /> Print
              </Button>
            </Col>
          </Row>
        </CardBody>
        {/* /Invoice Note */}
      </Card>
    </Fragment>
  )
}

export default MesurementView
