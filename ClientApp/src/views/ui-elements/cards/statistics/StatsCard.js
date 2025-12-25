// ** Third Party Components
import classnames from 'classnames'
import { Hash, User, Users, UserCheck, DollarSign } from 'react-feather'

// ** Custom Components
import Avatar from '@components/avatar'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText, Row, Col } from 'reactstrap'
import { useEffect, useState } from 'react'

const StatsCard = ({ cols }) => {
    const [ArchCount, setArchCount] = useState(0)
    const [EmpCount, setEmpCount] = useState(0)
    const [CusCount, setCusCount] = useState(0)
    const [MesCount, setMesCount] = useState(0)

    const getArchData = async () => {
        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId")),
                RoleCatId: Number(17)

            }
            //console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetusersCount`, {
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
                        //console.log("Architech_Count", data)
                        setArchCount(data)

                    })
        } catch (error) {
            toast.error("Something Went Wrong", {
                position: "top-center"
            })
        }
    }

    const getCusData = async () => {
        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId")),
                RoleCatId: Number(16)

            }
            //console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetusersCount`, {
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
                        //console.log("Customer_Count", data)
                        setCusCount(data)

                    })
        } catch (error) {
            toast.error("Something Went Wrong", {
                position: "top-center"
            })
        }
    }

    const getEmpData = async () => {
        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId")),
                RoleCatId: Number(90)

            }
            //console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetusersCount`, {
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
                        //console.log("Employee_Count", data)
                        setEmpCount(data)

                    })
        } catch (error) {
            toast.error("Something Went Wrong", {
                position: "top-center"
            })
        }
    }

    const getMesData = async () => {
        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId")),
                UserId: Number(localStorage.getItem('urole') === "7" ? localStorage.getItem('userIdA') : localStorage.getItem('userId')),
                ActiveStatus: 'S',
                WebHeader: "Newcart",
                Apikey2: "testdata"

            }
            //console.log(sendData)
            await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/ViewEstimateCount`, {
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
                        //console.log("Mesurement_Count", data)
                        setMesCount(data)

                    })
        } catch (error) {
            toast.error("Something Went Wrong", {
                position: "top-center"
            })
        }
    }

    useEffect(() => {
        getArchData()
        getEmpData()
        getCusData()
        getMesData()
    }, [])
  const data = [
    {
      title: ArchCount,
      subtitle: 'Architech',
      color: 'light-primary',
      icon: <UserCheck size={24} />
    },
    {
      title: CusCount,
      subtitle: 'Customers',
      color: 'light-info',
      icon: <User size={24} />
    },
    {
      title: EmpCount,
      subtitle: 'Employee',
      color: 'light-danger',
      icon: <Users size={24} />
    },
    {
      title: MesCount,
      subtitle: 'Mesurement',
      color: 'light-success',
      icon: <Hash size={24} />
    }
  ]

  const renderData = () => {
    return data.map((item, index) => {
      const colMargin = Object.keys(cols)
      const margin = index === 2 ? 'sm' : colMargin[0]
      return (
        <Col
          key={index}
          {...cols}
          className={classnames({
            [`mb-2 mb-${margin}-0`]: index !== data.length - 1
          })}
        >
          <div className='d-flex align-items-center'>
            <Avatar color={item.color} icon={item.icon} className='me-2' />
            <div className='my-auto'>
              <h4 className='fw-bolder mb-0'>{item.title}</h4>
              <CardText className='font-small-3 mb-0'>{item.subtitle}</CardText>
            </div>
          </div>
        </Col>
      )
    })
  }

  return (
    <Card className='card-statistics'>
      <CardHeader>
        <CardTitle tag='h4'>Statistics</CardTitle>
        <CardText className='card-text font-small-2 me-25 mb-0'>Updated </CardText>
      </CardHeader>
      <CardBody className='statistics-body'>
        <Row>{renderData()}</Row>
      </CardBody>
    </Card>
  )
}

export default StatsCard
