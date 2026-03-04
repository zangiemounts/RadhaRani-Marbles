// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card, Input, Row, Col, CardBody, CardTitle, CardText } from 'reactstrap'
import { Fragment, useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

const ContactorReport = ({ success }) => {
    const [EmployeeData, setEmployeeData] = useState([])
    const [currentitem, setcurrentitem] = useState([])
    const [ArchitechId, setArchitechId] = useState(0)
    const [selectedArchitectName, setSelectedArchitectName] = useState(null)
    const ArchitechData = async () => {
        const sendData = {
            CatgId: Number(65),
            GroupOrderdata: Number(localStorage.getItem("orgId"))

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetTruck`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {

                setcurrentitem(response)
                //console.log(response)
            })

    }
    const getData = async () => {
        try {

            const sendData = {
                CatgId: Number(66),
                Value: Number(ArchitechId)
            }
           // console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetReportContractor`, {
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
                       // console.log("Architech_TableData", data)
                        setEmployeeData(data)

                    })
        } catch (error) {
            toast.error("Something Went Wrong", {
                position: "top-center"
            })
        }
    }

    useEffect(() => {
        getData()
        ArchitechData()
    }, [ArchitechId])

    const handleArchitectChange = (e) => {
        const selectedArchitect = currentitem.find(item => item.catgTypeId === Number(e.target.value))
        setSelectedArchitectName(selectedArchitect ? `${selectedArchitect.catgType}` : null)
        setArchitechId(e.target.value)
    }

    const renderClient1 = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        if (!row.length) {
            
            return <Avatar color={color} className='me-50' content={row?.userdata?.firstName ? `${row?.userdata?.firstName} ${row?.userdata?.lastName}` : 'Mounts'} initials />
        } else {
            return <Avatar color={color} className='me-50' content={row?.userdata?.firstName ? `${row?.userdata?.firstName} ${row?.userdata?.lastName}` : 'Mounts'} initials />
        }
   }
    const renderData = () => {
        return EmployeeData.count > 0 ? ( 
            <tr>
                <td>
                    <div className='d-flex align-items-center'>
                        <div>
                            <div className='fw-bolder'>{EmployeeData?.count} </div>
                        </div>
                    </div>
                </td>
                <td>
                    <div className='d-flex align-items-center'>
                        <span>{EmployeeData?.sum}</span>
                    </div>
                </td>

            </tr>) : (<tr>
                <td colSpan="2">
            {ArchitechId !== 0 && EmployeeData.length === 0 ? (
                <h2 className="p-1">No Data Found</h2>
            ) : (
                <h2 className="p-1">Please Select Contactor</h2>
            )}
        </td>
    </tr>)
    }
    const data1 = Number(EmployeeData?.count || 1)
    const data2 = Number(EmployeeData?.sum || 1)

    const options = {
        chart: {
            toolbar: {
                show: false
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: { show: false },
        comparedResult: [2, -3, 8],
        labels: ['Trip Count', 'Total Amount'],
        stroke: { width: 0 },
        colors: ['#28c76f66', success],
        grid: {
            padding: {
                right: -20,
                bottom: -8,
                left: -20
            }
        },
        plotOptions: {
            pie: {
                startAngle: -10,
                donut: {
                    labels: {
                        show: true,
                        name: {
                            offsetY: 15
                        },
                        value: {
                            offsetY: -15,
                            formatter(val) {
                                return `${parseInt(val)}`
                            }
                        },
                        total: {
                            show: true,
                            offsetY: 15,
                            label: 'Amount',
                            formatter() {
                                return `${Number(EmployeeData?.count || 0)}`
                            }
                        }
                    }
                }
            }
        },
        responsive: [
            {
                breakpoint: 1325,
                options: {
                    chart: {
                        height: 100
                    }
                }
            },
            {
                breakpoint: 1200,
                options: {
                    chart: {
                        height: 120
                    }
                }
            },
            {
                breakpoint: 1065,
                options: {
                    chart: {
                        height: 100
                    }
                }
            },
            {
                breakpoint: 992,
                options: {
                    chart: {
                        height: 120
                    }
                }
            }
        ]
    }
    
    return (
        <Fragment>
            <Card className='card-company-table'>
          <div className='invoice-list-table-header w-100 py-2 m-1'>
              <Row >
                  <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                      <div className='d-flex align-items-center me-2'>
                          <label htmlFor='rows-per-page'>Select Contactor</label>
                          <Input
                              type='select'
                              id='rows-per-page'
                              value={"0"}
                              onChange={(e) => handleArchitectChange(e)}
                              className='form-control ms-50 pe-3'
                          >
                              <option value='0' disabled >{selectedArchitectName === null ? "Select" : selectedArchitectName}</option>
                              {currentitem.map((data, index) => ( 
                              <Fragment key={index}>
                                      <option value={data?.catgTypeId}>{data?.catgType}</option>
                              </Fragment>

                              ))}
                          </Input>
                      </div>
                  </Col>
              </Row>
                </div>
                  <hr/>
                <Card className='earnings-card'>
                    <CardBody>
                        <Row>
                            <Col xs='6'>
                                <CardTitle className='mb-1'>{selectedArchitectName && (selectedArchitectName)}</CardTitle>
                                <div className='font-small-2'>Total Amount</div>
                                <h5 className='mb-1'>{EmployeeData?.sum || 0}</h5>
                                <CardText className='text-muted font-small-2'>
                                    <span className='fw-bolder'>{EmployeeData?.count || 0}</span>
                                    <span> Trip generated to this contractor.</span>
                                </CardText>
                            </Col>
                            <Col xs='6'>
                                <Chart options={options} series={[data1, data2]} type='donut' height={150} />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Card>

            
        </Fragment>
  )
}

export default ContactorReport
