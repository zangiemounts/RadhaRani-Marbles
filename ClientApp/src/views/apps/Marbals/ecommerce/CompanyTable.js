// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Table, Card } from 'reactstrap'

// ** Icons Imports
import { useEffect, useState } from 'react'
import toast from "react-hot-toast"
const CompanyTable = () => {
    const [EmployeeData, setEmployeeData] = useState([])

    
    const getData = async () => {
        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId"))
            }
           // console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/ReportEmployee`, {
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
                       // console.log("Employee_TableData", data)
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
    }, [])

  // ** vars

  
    const renderClient1 = row => {
        const stateNum = Math.floor(Math.random() * 6),
            states = ['light-success', 'light-danger', 'light-warning', 'light-info', 'light-primary', 'light-secondary'],
            color = states[stateNum]

        if (!row.length) {
            /*return <Avatar className='me-50' img={avtimg} width='32' height='32' />*/
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
          <td>
            <div className='d-flex align-items-center'>
              <span>{col?.estimate}</span>
            </div>
          </td>
        </tr>
      ) 
    }) : <tr><h2>No Data Found</h2></tr>
  }

  return (
      <Card className='card-company-table'>
         
              <h2 className="p-1">Employee Report</h2>
          
      <Table responsive>
        <thead>
          <tr>
            <th>Employee Name</th>
            <th>Mesurement</th>
            <th>Estimate</th>
           {/* <th>Views</th>
            <th>Revenue</th>
            <th>Sales</th>*/}
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default CompanyTable
