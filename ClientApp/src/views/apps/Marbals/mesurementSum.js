// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Input, CardBody, CardText, Table, Button } from 'reactstrap'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import Swal from 'sweetalert2'

const MesurementSum = ({ printvalue, meurementSumRefresh, datarefresh, UrlImage1, counttt }) => {
    const [Data, setData] = useState([])
    const MsuremnetSumData = async () => {

        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId")),
                UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
                Value: printvalue ? Number(printvalue) : Number(sessionStorage.getItem("MesurementView")),
                UrlImage1: UrlImage1,
                WebHeader: "MeasurmentData"

            }
            //console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/MeasurmentGetSum`, {
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
                       /*console.log(`Mesurement_Sum`, data)*/
                        setData(data)

                    })
        } catch (error) {
            /*console.log(`Mesuremenet_Sum`, error)*/
            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                text: 'Please try after sometime'
            })
        }
    }
    

    useEffect(() => {
        MsuremnetSumData()
        
    }, [meurementSumRefresh, datarefresh])
    
    return (
        <Fragment>
            <div className="invoice-total-item d-flex">
                <p className="invoice-total-title" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    {UrlImage1} ({counttt} Slab) : 
                </p>
                <p className="invoice-total-amount" style={{ color: "#36b436", fontSize: '16px', marginLeft:'5px' }}>
                    {/* Displaying count and sum */}
                    {counttt !== undefined ? (
                        <>
                           
                            <span style={{ fontSize: '16px' }}>
                                <span style={{ fontWeight: 'bold', fontSize: '18px' }}>
                                    {Array.isArray(Data) ? Data.reduce((acc, val) => acc + (val?.vat || 0), 0).toFixed(2) : (typeof Data === 'number' ? Data.toFixed(2) : '0.00')}
                                     sq.ft
                                </span>
                            </span>
                        </>
                    ) : (
                        <span style={{ fontStyle: 'italic', color: '#999' }}>No data available</span>
                    )}

                </p>
            </div>
            {/*<div className="invoice-total-item d-flex">*/}
            {/*    <p className="invoice-total-title" style={{ fontWeight: 'bold', fontSize: '16px' }}>*/}
            {/*        {UrlImage1} <p style={{ color: "#36b436", fontSize: '16px' }}>{counttt} Pices </p>*/}
            {/*    </p>*/}
               
            {/*</div>*/}
            <hr style={{ borderTop: '1px solid #e5e5e5' }} />

        </Fragment>
    )
}

export default MesurementSum
