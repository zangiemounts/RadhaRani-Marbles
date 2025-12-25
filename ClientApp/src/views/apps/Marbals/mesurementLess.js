// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Input, CardBody, CardText, Table, Button } from 'reactstrap'


// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'


const MesurementLess = ({  setdatarefresh, value }) => {
    
    const [userdata, setuserdata] = useState([])
    
    const [defData, setdefData] = useState("")
    const [less1, setless1] = useState(0)
    const [less2, setless2] = useState(0)
    
    const date = new Date()
    
    const [data, setdata] = useState({
        Productname: "",
        unittype: "",
        price: 0,
        discount: 0,
        tax: 0,
        quantity: 1,
        totalamount: 0,
        payableamount: 0,
        totaltaxamo: 0,
        billId: 0
    })
    

    const addData = async (id) => {
        setdatarefresh(false)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            WebHeader: "LessData",
            Value: Number(value)

        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/LessData`, {
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
                    console.log(data)
                    getData()
                    setdatarefresh(true)
                })
    }

    const getData = async (id) => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            WebHeader: "LessData",
            Value: Number(value)

        }
       // console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/LessGet`, {
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
                  //  console.log(data)
                    setuserdata(data)
                })
    }

    const editData = async (data, data2, data3, data4) => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            CloudInterfactDisplaySectionId: Number(data),
            WorkFlowId: Number(data3),
            InsuranceId: Number(data4),
            WebHeader: "LessData",
            DomainDesc: data2

        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/LessEdit`, {
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
                    console.log(data)
                    
                })
    }

    const editData2 = async (data, WorkFlowId, InsuranceId) => {
        setdatarefresh(false)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            CloudInterfactDisplaySectionId: Number(data),
            WorkFlowId: Number(WorkFlowId),
            InsuranceId: Number(InsuranceId),
            WebHeader: "LessData"

        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/LessEdit`, {
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
                    console.log(data)
                    setdefData(data)
                    setdatarefresh(true)
                    getData()
                })
    }

    
    useEffect(() => {
        getData()
    }, [])
   
    return (<>
                                    {userdata.length > 0 ? userdata.map((data, index) => (
                                        <div key={index} style={{ display: 'flex', borderBottom: '1px solid black' }}>
                                            <div className="py-2" style={{ flex: 1, textAlign: 'center', minWidth: 70, maxWidth:"15%", padding: 0 }}>
                                                Less {index + 1} -
                                            </div>
                                            <div style={{ flex: 1, textAlign: 'center', maxWidth: "30%", padding: 0 }}>
                                                <Input onWheel={(e) => e.target.blur()} id='amount' type="number" className="m-1" style={{ maxWidth: "90%" }} name='amount' onChange={(e) => setless1(e.target.value)} onBlur={(e) => editData2(data.cloudInterfactDisplaySectionId, less1, data.insuranceId)} defaultValue={data.workFlowId} placeholder='e.g: 1' />
                                            </div>
                                            <div className="py-2" style={{ flex: 1, textAlign: 'center', maxWidth:"5%", padding: 0 }}>
                                                X
                                            </div>
                                            <div style={{ flex: 1,  textAlign: 'center', maxWidth: "30%", padding: 0 }}>

                                                <Input onWheel={(e) => e.target.blur()} id='amount' type="number" className="m-1" style={{ maxWidth: "90%" }} name='amount' onChange={(e) => setless2(e.target.value)} onBlur={(e) => editData2(data.cloudInterfactDisplaySectionId, data.workFlowId, less2)} defaultValue={data.insuranceId} placeholder='e.g: 1' />
                                            </div>
                                        </div>   
                                    )) : null}
                        <div className='d-flex justify-content-end'><Button color="warning" style={{ textAlign: 'center', border: '1px solid black' }} onClick={() => addData()}>Add Less</Button>       </div> 
        
 
    </>                
    )
}

export default MesurementLess
