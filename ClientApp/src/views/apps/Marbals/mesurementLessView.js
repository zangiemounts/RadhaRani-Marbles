// ** React Imports
import { Fragment, useEffect, useRef, useState } from 'react'
import { Row, Col, Card, Input, CardBody, CardText, Table, Button } from 'reactstrap'
import { Link, useNavigate } from 'react-router-dom'

// ** Styles
import 'react-slidedown/lib/slidedown.css'
import '@styles/react/libs/react-select/_react-select.scss'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/base/pages/app-invoice.scss'
import defaultAvatar from '@src/assets/images/avatars/avatar-blank.png'
import img2 from '@src/assets/images/pages/Radharanip.png'
import { ArrowLeft, Printer } from 'react-feather'

const MesurementLessView = ({ setdatarefresh, value }) => {
    const navigate = useNavigate()
    const [BankData, setBankData] = useState([])
    const [itemdata, setitemdata] = useState([])
    const [userdata, setuserdata] = useState([])
    const [Invoicedate, setInvoicedate] = useState([])
    const [Data, setData] = useState([])
    const [DueData, setdueData] = useState([])
    const [avatar, Setavatar] = useState()
    const [header, setheader] = useState([])
    const date = new Date()
    const year = date.getFullYear()
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
    const reportTemplateRef = useRef(null)

    const addData = async (id) => {
        setdatarefresh(false)
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            WebHeader: "LessData",
            Value: Number(value)

        }
       // console.log(sendData)
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
                   // console.log(data)
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
                   // console.log(data)
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
                   // console.log(data)
                    setdatarefresh(true)
                    getData()
                })
    }

    
    useEffect(() => {
        getData()
    }, [])
   
    return (<>
                    
                                    {userdata.length > 0 ? userdata.map((data, index) => (
                                            <div style={{ display: 'flex' }} key={index}>
                                                <span style={{ flex: 1, border: "1px solid black", textAlign: "center" }} className='fw-bold p-1'> Less {index + 1} </span>

                                                <span style={{ flex: 1, border: "1px solid black", textAlign: "center" }} className='fw-bold p-1'>{data.workFlowId}</span>

                                                <span style={{ flex: 1, border: "1px solid black", textAlign: "center" }} className='fw-bold p-1'>X</span>

                                                <span style={{ flex: 1, border: "1px solid black", textAlign: "center" }} className='fw-bold p-1'>{data.insuranceId}</span>
                                            </div>
                                           
                                    )) : null}
        
 
    </>                
    )
}

export default MesurementLessView
