// ** React Imports
import { Fragment, useState, useEffect } from 'react'

import { Table } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'

const ItemTable = (...props) => {
    const [toggle, settoggle] = useState(false)
  const [itemdata, setitemdata] = useState([])
 
  /*  const Delete = async (Id) => {
        const sendData = {
            OrgId: Number(userdata.orgId),
            MountsBillDetailsId: Id,
            Apikey2: window.location.search
        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Deleteitem`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                if (response === "Done") {
                    Swal.fire({
                        icon: 'success',
                        title: 'Delete',
                        text: 'Item Removed Successfully'
                    })
                    getItem(userdata.orgId, userdata.userId)
                    getTotal(userdata.orgId, userdata.userId)
                }
            })

    }*/
    

    const getItem = async () => {
        const sendData = {
            OrgId: Number(props.orgId),
            UserId: Number(props.userId),
            InstrumentRemarks: window.location.search
          
        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/GetItem`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
                console.log(response)
                if (response.length > 0) {
                    setitemdata(response)
                    settoggle(true)
                } else {
                    setitemdata([])
                   settoggle(false)
                }
            })

    }

    useEffect(() => {
        getItem()
    }, [])

  return (
      <Fragment>
           <>

          {toggle ? <Table responsive>
              <thead>
                  <tr>
                      <th className='py-1'>Item</th>
                      <th className='py-1'>Unit</th>
                      <th className='py-1'>Cost</th>
                      <th className='py-1'>Quantity</th>
                      <th className='py-1'>Total Cost</th>
                  </tr>
              </thead>
              <tbody>
                  {itemdata.length > 0 ? (itemdata.map(detail => <tr>
                      <td className='py-1'>
                          <p className='card-text fw-bold mb-25'>{detail.productName.productName}</p>

                      </td>
                      <td className='py-1'>
                          <span className='fw-bold'>{detail.productName.unitType}</span>
                      </td>
                      <td className='py-1'>
                          <span className='fw-bold'>{detail.totalAmount}</span>
                      </td>
                      <td className='py-1'>
                          <span className='fw-bold'>{detail.quantity}</span>
                      </td>
                      <td className='py-1'>
                          <span className='fw-bold'>{detail.payableAmount}</span>
                      </td>
                      {/*<td className='py-1'>
                          <Trash2 size={14} className='me-25'></Trash2> <span className='fw-bold' onClick={() => Delete(detail.)}></span>
                      </td>*/}
                  </tr>)) : null}

              </tbody>
          </Table> : null}
          </>
       
    </Fragment>
  )
}

export default ItemTable
