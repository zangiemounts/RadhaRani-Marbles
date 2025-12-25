// ** Reactstrap Imports
import { Card, CardBody, CardText, Button } from 'reactstrap'

// ** Images
import medal from '@src/assets/images/illustration/badge.svg'
import toast from "react-hot-toast"
import { useEffect, useState } from 'react'
const CardMedal = () => {
    const [EmpData, setEmpData] = useState([])

    const getData = async () => {
        try {

            const sendData = {
                OrgId: Number(localStorage.getItem("orgId"))

            }
            //console.log(sendData)
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
                       // console.log("Top Employee_CardMedal", data)
                        setEmpData(data[0])
                        
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
  return (
    <Card className='card-congratulations-medal'>
      <CardBody>
        <h5>Congratulations 🎉 {`${EmpData?.userdata?.firstName || "No"} ${EmpData?.userdata?.lastName || "Data"}`}!</h5>
        <CardText className='font-small-3'>You have attended maximum customer</CardText>
        <h3 className='mb-75 mt-2 pt-50'>
          <a href='/' onClick={e => e.preventDefault()}>
            {EmpData?.estimate + EmpData?.measurment || "No Data"}
          </a>
        </h3>
        
        <img className='congratulation-medal' src={medal} alt='Medal Pic' />
      </CardBody>
    </Card>
  )
}

export default CardMedal
