// ** React Imports
import { useEffect, useState, Fragment } from "react"

import { useForm } from "react-hook-form"
import { PlusCircle } from "react-feather"
// ** Reactstrap Imports
import {
  Card,
  CardBody,
  Row,
  Col,
  Input,
  Button,
  Label,
  Modal,
  Form,
  Spinner,
  FormFeedback
} from "reactstrap"
// ** swal
import Swal from "sweetalert2"

const AddVechileTripSidebar = (props) => {
  // ** Props
  const { open, handleTaskSidebar, setdataRefresh } = props
  const [formData, setFormData] = useState({
    contractorName: "",
    vechileNo: "",
    materialReport: "",
    billStatus: "",
    cost: "",
    mesuremnetName: ""
  })
  const [IsLoading, setIsLoading] = useState(false)
  const [Contractor, setContractor] = useState([])
  const [VehicleNo, setVehicleNo] = useState([])
  const [Mesurement, setMesurement] = useState([])
  const {
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: { title: "" }
  })

  const onSubmit = (data) => {
    if (Object.values(data).every((field) => field.length > 0)) {
      return null
    } else {
      for (const key in data) {
        if (data[key].length === 0) {
          setError(key, {
            type: "manual"
          })
        }
      }
    }
  }

  const onInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const submitForm = async () => {
    setdataRefresh(false)
    setIsLoading(true)
    const sendData = {
      CatgId: Number(66),
      CatgType: `${formData.vechileNo}-${formData.mesuremnetName}`,
      Value: Number(formData.contractorName),
      LangId: Number(formData.vechileNo),
      GroupOrderdata: Number(localStorage.getItem("orgId")),
      CatgDesc: formData.vechileNo,
      DomainDesc: formData.cost,
      OneTimeCost: Number(formData.cost),
      Remarks: formData.materialReport,
      SearchRemarks: formData.billStatus,
      WorkFlowId: Number(formData.mesuremnetName)
    }
    //console.log("Trip_SendData", sendData)

    await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/AddTripNew`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(sendData)
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data)
        setFormData({
          ...formData,
          vechileNo: "",
          contractorName: "",
          materialReport: "",
          cost: "",
          billStatus: ""
        })
        if (data === "Done") {
          Swal.fire({
            icon: "success",
            title: "Added",
            text: "Vehicle Added Successfully"
          })
        }
        handleTaskSidebar(!open)
        setdataRefresh(true)
        setIsLoading(false)
      })
  }

  const getContractorData = async () => {
    try {
      const sendData = {
          CatgId: Number(65),
        GroupOrderdata: Number(localStorage.getItem("orgId"))
      }
      // console.log(sendData)
      await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetTruck`, {
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
            /*console.log("Contractor_Data", response)*/

            setContractor(response)
          } catch (error) {
            //console.log("eee")
          }
        })
        .then((error) => {})
    } catch (error) {
      console.log("Error")
    }
  }

  const getVehicleData = async () => {
    try {
      const sendData = {
          CatgId: Number(63),
          GroupOrderdata: Number(localStorage.getItem("orgId"))
      }
      // console.log(sendData)
      await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetTruck`, {
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
            /* console.log("Contractor_Data", response)*/

            setVehicleNo(response)
          } catch (error) {
            console.log("eee")
          }
        })
        .then((error) => {})
    } catch (error) {
      console.log("Error")
    }
  }

  const apidata = localStorage.getItem("userIdA") ? "ViewEstimateS" : "ViewEstimateEmployee"
  const getMesuremetIDData = async () => {
    const sendData = {
      OrgId: Number(localStorage.getItem("orgId")),
      UserId: Number(
        localStorage.getItem("urole") === "7" ? localStorage.getItem("userIdA") : localStorage.getItem("userId")
      ),
      ActiveStatus: "C",
      WebHeader: "Newcart",
      Apikey2: "testdata"
    }
    //console.log(sendData)
    await fetch(
      `${process.env.REACT_APP_API_LINK}api/Radharani/ViewEstimateTrip`,
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
        //console.log(response)
        setMesurement(response)
      })
  }

  useEffect(() => {
    getContractorData()
    getVehicleData()
    getMesuremetIDData()
  }, [])

  return (
    <Modal
      isOpen={open}
      toggle={handleTaskSidebar}
      className="sidebar-lg"
      contentClassName="p-0"
      modalClassName="modal-slide-in sidebar-todo-modal"
    >
      <Card>
        <CardBody className="py-2 my-25">
          <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="Orgtype">
                  <b> Select Contractor Name.</b>
                </Label>
                <Input
                  type="select"
                  name="contractorName"
                  id="rows-per-page"
                  onChange={(e) => onInputChange(e)}
                  className="form-control "
                >
                  <option value="Select">Select</option>
                  {Contractor.length > 0 ? (
                    Contractor.map(({ catgType, catgTypeId }) => (
                      <Fragment key={catgTypeId}>
                        <option value={catgTypeId}>{catgType}</option>
                      </Fragment>
                    ))
                  ) : (
                    <option style={{ color: "red" }}>
                      Please Update Contractor Name
                    </option>
                  )}
                </Input>
              </Col>

              <Col sm="12" className="mb-1">
                <Label className="form-label" for="firstName">
                  <b> Vechile No. </b>
                </Label>
                <Input
                  type="select"
                  name="vechileNo"
                  id="rows-per-page"
                  onChange={(e) => onInputChange(e)}
                  className="form-control "
                >
                  <option value="Select">Select</option>
                  {VehicleNo.length > 0 ? (
                    VehicleNo.map(({ catgDesc, catgTypeId }) => (
                      <Fragment key={catgTypeId}>
                        <option value={catgTypeId}>{catgDesc}</option>
                      </Fragment>
                    ))
                  ) : (
                    <option style={{ color: "red" }}>
                      Please Update Contractor Name
                    </option>
                  )}
                </Input>
                {/*<Input id='vechileNo' name='vechileNo' onChange={(e) => onInputChange(e)} placeholder="e.g: 'DL12CXXXXX'" />*/}

                {errors && errors.firstName && (
                  <FormFeedback>Please enter a valid First Name</FormFeedback>
                )}
              </Col>

              <Col sm="12" className="mb-1">
                <Label className="form-label" for="firstName">
                  <b> Material Report </b>
                </Label>
                <Input
                  id="materialReport"
                  name="materialReport"
                  onChange={(e) => onInputChange(e)}
                  placeholder="e.g: 'Delivered'"
                />

                {errors && errors.firstName && (
                  <FormFeedback>Please enter a valid First Name</FormFeedback>
                )}
              </Col>

              <Col sm="12" className="mb-1">
                <Label className="form-label" for="firstName">
                  <b> Bill Status </b>
                </Label>
                <Input
                  id="billStatus"
                  name="billStatus"
                  onChange={(e) => onInputChange(e)}
                  placeholder="e.g: 'Complete'"
                />

                {errors && errors.firstName && (
                  <FormFeedback>Please enter a valid First Name</FormFeedback>
                )}
              </Col>

              <Col sm="12" className="mb-1">
                <Label className="form-label" for="emailInput">
                  <b> Rent </b>
                </Label>
                <Input
                  id="cost"
                  type="number"
                  name="cost"
                  onChange={(e) => onInputChange(e)}
                  placeholder="e.g: '1200'"
                />
              </Col>

              <Col sm="12" className="mb-1">
                <Label className="form-label" for="Orgtype">
                  <b> Select Mesuremnet</b>
                </Label>
                <Input
                  type="select"
                  name="mesuremnetName"
                  id="rows-per-page"
                  onChange={(e) => onInputChange(e)}
                  className="form-control "
                >
                  <option value="Select">Select</option>
                  {Mesurement.length > 0 ? (
                    Mesurement.map(
                      ({ orderNo, cloudInterfactDisplaySectionId }) => (
                        <Fragment key={cloudInterfactDisplaySectionId}>
                          <option value={cloudInterfactDisplaySectionId}>
                            E{orderNo}
                          </option>
                        </Fragment>
                      )
                    )
                  ) : (
                    <option disabled style={{ color: "red" }}>
                      Please Update Estimate Id
                    </option>
                  )}
                </Input>
              </Col>

              <Col className="mt-2" sm="12">
                {!IsLoading ? (
                  <Button
                    type="submit"
                    onClick={() => submitForm()}
                    className="me-1"
                    color="success"
                  >
                    <PlusCircle size={20} /> Add 
                  </Button>
                ) : (
                  <Button color="success" disabled>
                    <Spinner size="sm" type="grow" />
                    <span className="ms-50">Please wait...</span>
                  </Button>
                )}
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Modal>
  )
}

export default AddVechileTripSidebar
