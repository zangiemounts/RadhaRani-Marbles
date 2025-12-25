// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card, Input, Row, Col } from 'reactstrap'
import { Fragment, useEffect, useState } from 'react'

const ArchitechReport = () => {
    const [EmployeeData, setEmployeeData] = useState([])
    const [currentitem, setcurrentitem] = useState([])
    const [ArchitechId, setArchitechId] = useState(0)
    const [selectedArchitectName, setSelectedArchitectName] = useState(null)
    
    const ArchitechData = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            RoleCatId: Number(17)

        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/Getusers`, {
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
               // console.log(response)
            })

    }
    const getData = async () => {
        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId")),
                RefUserId: Number(ArchitechId)
            }
           // console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/ReportArchitect`, {
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
                        //console.log("Architech_TableData", data)
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
        const selectedArchitect = currentitem.find(item => item.userId === Number(e.target.value))
        setSelectedArchitectName(selectedArchitect ? `${selectedArchitect.userdata.firstName} ${selectedArchitect.userdata.lastName}` : null)
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
    return EmployeeData.length > 0 ? EmployeeData.map((col, index) => {

      return (
        <tr key={index}>
          <td>
            <div className='d-flex align-items-center'>
              <div className='avatar rounded'>
                <div className='avatar-content'>
                  {renderClient1(col)}
                </div>
              </div>
              <div>
                <div className='fw-bolder'>{col?.userdata?.firstName} {col?.userdata?.lastName}</div>
                <div className='font-small-2 text-muted'>{col?.userdata?.phoneNo}</div>
              </div>
            </div>
          </td>
          <td>
            <div className='d-flex align-items-center'>
              <span>{col?.measurment}</span>
            </div>
          </td>
        
        </tr>
        )
    }) : <tr>
        <td colSpan="2">
            {ArchitechId !== 0 && EmployeeData.length === 0 ? (
                <h2 className="p-1">No Data Found</h2>
            ) : (
                <h2 className="p-1">Please Select Architech</h2>
            )}
        </td>
    </tr>
  }

  return (
      <Card className='card-company-table'>
          <div className='invoice-list-table-header w-100 py-2 m-1'>
              <Row >
                  <Col lg='6' className='d-flex align-items-center px-0 px-lg-1'>
                      <div className='d-flex align-items-center me-2'>
                          <label htmlFor='rows-per-page'>Select Architect</label>
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
                                      <option value={data?.userId}>{data?.userdata?.firstName} {data?.userdata?.lastName}</option>
                              </Fragment>

                              ))}
                          </Input>
                      </div>
                  </Col>
              </Row>
                  </div>
      <Table responsive>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Mesurement</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default ArchitechReport
