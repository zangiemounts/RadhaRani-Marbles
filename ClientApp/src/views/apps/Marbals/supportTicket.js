// ** Reactstrap Imports
import React, { useEffect } from "react"

import { Card, CardBody } from 'reactstrap'
import { useNavigate } from "react-router-dom"
import { toast } from 'react-hot-toast'
const SupportTicket = () => {
    const navigate = useNavigate()
    useEffect(() => {

            const onSubmit = async () => {
                try {
                    const sendData = {
                        UserId: Number(3601)
                    }
                    //console.log("SendData", sendData);
                    await fetch(
                        "https://zaingielatestapi.azurewebsites.net/api/Main/LoginDynamic",
                        {
                            method: "POST",
                            headers: {
                                Accept: "application/json",
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(sendData)
                        }
                    )
                        .then((response) => response.json())
                        .then((data) => {
                            // console.log("Data", data);
                            if (data !== "Error") {
                                window.open(
                                    `https://taskmnagermounts.azurewebsites.net/dynamic-login${data}`,
                                    '_blank'
                                )
                                 /*window.location.replace(
                                   `http://localhost:3000/dynamic-login${data}`
                                 )*/
                                navigate("/dashboard", { replace: false })
                            } else {
                                toast.error(
                                    "Oops!! Something went wrong. Please try after sometime",
                                    {
                                        position: "top-center"
                                    }
                                )
                                navigate("/ItemCard", { replace: false })
                                
                            }
                        })
                } catch (error) {
                    toast.error(
                        "Something went wrong. Please try agian after sometime.",
                        {
                            position: "top-center"
                        }
                    )
                }
            }
            onSubmit()

    }, [navigate])

    return (
            <Card>
                <CardBody className='py-2 my-25' >

                    <h2>Please wait....</h2>
                </CardBody>
            </Card>
        
    )
}

export default SupportTicket
