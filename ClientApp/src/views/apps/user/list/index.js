/* eslint-disable no-return-assign */
// ** User List Component
import Table from './Table'

// ** Reactstrap Imports
import { Row, Col } from 'reactstrap'
import { CiMoneyBill } from "react-icons/ci"
// ** Custom Components
import StatsHorizontal from '@components/widgets/stats/StatsHorizontal'
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom"
// ** Icons Imports
import { User, UserPlus, UserCheck, UserX } from 'react-feather'

// ** Styles
import '@styles/react/apps/app-users.scss'
import { useEffect, useState } from 'react'
import Amount from './Amount'

const UsersList = () => {
    const [totallen, settotallen] = useState({
        total: 0,
        individual: 0,
        org: 0
    })
    const [Amounttotal, setAmounttotal] = useState([])
    const [billgenrate, setbillgenerate] = useState(0)
    const getSubmitData = async () => {

        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
            ActiveStatus: "A",
            webHeader: "client"
        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/Getmultipledata`, {
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
                    /*console.log(data.filter(i => i.remarks === "individual").length)*/
                    settotallen({ ...totallen, total: data.length, individual: data.filter(i => i.remarks === "individual").length, org: data.filter(i => i.remarks === "Org").length })
                })
    }
    const getBill = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId'))
        }
        console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/GetBilldataCount`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
              //  console.log(response)
                setbillgenerate(response)
            })

    }
   

    const AllBill = async () => {
        const sendData = {
            OrgId: Number(localStorage.getItem("orgId")),
            UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId'))
        }
        //console.log(sendData)
        await fetch(`${process.env.REACT_APP_API_LINK}api/Bill/GetBilldata`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sendData)

        })
            .then((response) => response.json())
            .then(response => {
                console.log(response.filter(t => t.billData.activeStatus = "B"))
                /*const total = (response.reduce((total, currentItem) => {
                    total = total + currentItem.totalAmount
                }, 0))
                console.log(total)*/
                setAmounttotal(response)
            })

    }

   /* const total = (Amounttotal.reduce((total, currentItem) => {
         total = total + Amounttotal.billData.totalAmount
    }, 0))*/
    useEffect(() => {
        getSubmitData()
        getBill()
        AllBill()
    }, [])
  return (
    <div className='app-user-list'>
      {/*<Row>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='primary'
            statTitle='Total Users'
            icon={<User size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{totallen.total}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='danger'
            statTitle='Organization Users'
            icon={<UserPlus size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{totallen.org}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
          <StatsHorizontal
            color='success'
            statTitle='Individual Users'
            icon={<UserCheck size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{totallen.individual}</h3>}
          />
        </Col>
        <Col lg='3' sm='6'>
       <NavLink to="/apps/invoice/list">
          <StatsHorizontal
            color='warning'
            statTitle='Bill Generated'
            icon={<CiMoneyBill size={20} />}
            renderStats={<h3 className='fw-bolder mb-75'>{billgenrate}</h3>}
          /></NavLink>
        </Col>
      </Row>*/}
      <Table />
    </div>
  )
}

export default UsersList
