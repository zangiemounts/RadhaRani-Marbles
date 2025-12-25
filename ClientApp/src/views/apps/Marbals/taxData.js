// ** React Imports
import { useEffect, useState } from 'react'

import { useForm } from 'react-hook-form'
import { PlusCircle } from "react-feather"
// ** Reactstrap Imports
import { Card, CardBody, Row, Col, Input, Button, Label, Modal, Form, Spinner, CardTitle, CardHeader, FormFeedback } from 'reactstrap'
import { selectThemeColors } from '@utils'
import Select from 'react-select'
// ** swal
import Swal from 'sweetalert2'


// ** Function to capitalize the first letter of string
const capitalize = string => string.charAt(0).toUpperCase() + string.slice(1)


const TaxData = ({ cost, productDetailsId }) => {
    const [usertype, setusertype] = useState(0)
    
    const getData = async () => {


        const sendData = {
            OrganizationProductDetailsId: Number(productDetailsId)
            
        }
        //console.log(sendData)


        await fetch(`${process.env.REACT_APP_API_LINK}api/Radharani/GetProductdetails`, {
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
                    //console.log(data)
                    setusertype(data)
                    
                })


    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            {cost ? <span className='fw-bold'>{usertype.salesCost}</span> : <span className='fw-bold'>{usertype.discountPercentage}%</span> }
            
        </>
    )
}

export default TaxData
