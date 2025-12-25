// ** Reactstrap Imports
import { Table, Card } from 'reactstrap'

// ** Icons Imports
import { useEffect, useState } from 'react'

const ItemTable = () => {
    const [ItemData, setItemData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [value, setValue] = useState('')

    const getData = async () => {
        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId"))
            }
            //console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/ReportItem`, {
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
                       // console.log("Item_TableData", data)
                        setItemData(data)

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

    const filteredData = ItemData.filter(
        (item) => item.productDetails?.productName.toLowerCase().includes(value.toLowerCase())
    )


    const paginatedData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    )

  const renderData = () => {
    return paginatedData.map((col, index) => {

      return (
        <tr key={index}>
          <td>
            <div className='d-flex align-items-center'>
              <div>
                <div className='fw-bolder'>{col?.productDetails?.productName}</div>
                
              </div>
            </div>
          </td>
           <td>
            <div className='d-flex align-items-center'>
              <span>{col?.estimateCount}</span>
            </div>
          </td>
        </tr>
      )
    })
  }

  return (
      <Card className='card-company-table'>
          <h2 className="p-1">Top Item</h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Item Name</th>
            <th>No. of Estimate</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </Table>
    </Card>
  )
}

export default ItemTable
